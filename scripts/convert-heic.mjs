// 1. Converts any .heic files in public/gallery/ to .jpg (most browsers can't
//    display raw HEIC).
// 2. Downscales any image wider than MAX_WIDTH and re-compresses it — phone
//    photos are often 3000-4000px wide; the gallery grid only ever displays
//    them at a few hundred px, so shipping the full original just adds load
//    time for no visible benefit.
// 3. Writes a JSON manifest of every image + its derived caption to
//    src/app/gallery/manifest.json.
//
// Runs automatically before `next dev` and `next build` (see package.json).
//
// NOTE: step 2 overwrites the file in public/gallery in place. This is a
// lossy, permanent resize — keep a backup of your originals elsewhere if you
// want to preserve full resolution copies.

import { readdir, readFile, writeFile, unlink, stat, mkdir } from "fs/promises";
import path from "path";
import convert from "heic-convert";
import sharp from "sharp";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const MANIFEST_PATH = path.join(process.cwd(), "src", "app", "gallery", "manifest.json");
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const MAX_WIDTH = 1600; // px — generous for a grid cell, even on retina displays

function toTitleCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

async function convertHeicFiles(files) {
  const heicFiles = files.filter((f) => /\.heic$/i.test(f));

  if (heicFiles.length === 0) {
    console.log("[gallery] No HEIC files to convert.");
    return;
  }

  for (const file of heicFiles) {
    const inputPath = path.join(GALLERY_DIR, file);
    const outputPath = path.join(GALLERY_DIR, file.replace(/\.heic$/i, ".jpg"));

    try {
      const inputBuffer = await readFile(inputPath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.9,
      });
      await writeFile(outputPath, outputBuffer);
      await unlink(inputPath);
      console.log(`[gallery] Converted ${file} -> ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`[gallery] Failed to convert ${file}:`, err.message);
    }
  }
}

async function optimizeImages(files) {
  const targets = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of targets) {
    const filePath = path.join(GALLERY_DIR, file);
    const ext = path.extname(file).toLowerCase();

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      if (!metadata.width || metadata.width <= MAX_WIDTH) {
        continue; // already small enough, leave it alone
      }

      let pipeline = image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      pipeline = ext === ".png" ? pipeline.png({ quality: 82 }) : pipeline.jpeg({ quality: 82 });

      const buffer = await pipeline.toBuffer();
      await writeFile(filePath, buffer);
      console.log(`[gallery] Resized ${file} (was ${metadata.width}px wide -> ${MAX_WIDTH}px)`);
    } catch (err) {
      console.error(`[gallery] Failed to optimize ${file}:`, err.message);
    }
  }
}

async function buildManifest() {
  let files = [];
  try {
    files = await readdir(GALLERY_DIR);
  } catch {
    // Folder doesn't exist yet — manifest will just be empty.
  }

  const items = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) continue;

    const base = path.basename(file, path.extname(file));
    const stats = await stat(path.join(GALLERY_DIR, file));

    items.push({
      id: file,
      src: `/gallery/${file}`,
      alt: toTitleCase(base),
      caption: toTitleCase(base),
      date: stats.mtime.getFullYear().toString(),
      mtimeMs: stats.mtime.getTime(),
    });
  }

  items.sort((a, b) => b.mtimeMs - a.mtimeMs); // newest first

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(items, null, 2));
  console.log(`[gallery] Wrote manifest with ${items.length} photo(s).`);
}

async function run() {
  let files = [];
  try {
    files = await readdir(GALLERY_DIR);
  } catch {
    console.log("[gallery] public/gallery not found yet.");
    await buildManifest();
    return;
  }

  await convertHeicFiles(files);

  // Re-read the folder — filenames changed (.heic -> .jpg) during conversion.
  const updatedFiles = await readdir(GALLERY_DIR);
  await optimizeImages(updatedFiles);
  await buildManifest();
}

run();
