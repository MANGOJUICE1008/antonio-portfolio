// Converts any .heic files sitting in public/gallery/ into .jpg files.
// Runs automatically before `next dev` and `next build` (see package.json).
//
// Why this exists: most browsers (Chrome, Firefox, Edge, Android) cannot
// display raw .heic images in an <img> tag. Safari/iOS can, but nothing
// else reliably can. So any .heic dropped into the gallery folder gets
// converted to .jpg once, then the original .heic is removed so you don't
// end up with duplicate captions for the same photo.

import { readdir, readFile, writeFile, unlink } from "fs/promises";
import path from "path";
import convert from "heic-convert";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

async function run() {
  let files;
  try {
    files = await readdir(GALLERY_DIR);
  } catch {
    // Folder doesn't exist yet — nothing to do.
    console.log("[gallery] public/gallery not found yet, skipping HEIC conversion.");
    return;
  }

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

run();
