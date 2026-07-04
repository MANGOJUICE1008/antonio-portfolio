// 1. Converts any .heic files in public/gallery/ to .jpg (most browsers can't
//    display raw HEIC).
// 2. Writes a JSON manifest of every image + its derived caption to
//    src/app/gallery/manifest.json.
//
// Why a manifest instead of reading the folder from the page itself:
// if a Server Component calls fs.readdirSync on public/gallery directly,
// Vercel's build tracer bundles the ENTIRE folder (every photo, full size)
// into the serverless function, which can blow past Vercel's function size
// limit. Reading the folder here, at build time, and writing a tiny JSON
// file means the deployed page has zero runtime fs dependency — Vercel can
// serve it as a plain static page and the photos as normal static assets.
//
// Runs automatically before `next dev` and `next build` (see package.json).

import { readdir, readFile, writeFile, unlink, stat, mkdir } from "fs/promises";
import path from "path";
import convert from "heic-convert";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const MANIFEST_PATH = path.join(process.cwd(), "src", "app", "gallery", "manifest.json");
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

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
  }

  await convertHeicFiles(files);
  await buildManifest();
}

run();
