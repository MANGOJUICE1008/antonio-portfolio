#!/usr/bin/env node
// scripts/generate-manifest.mjs
//
// Scans /public/gallery and rebuilds src/app/gallery/manifest.json.
//
// NAMING CONVENTION for automatic chronological sorting + categorization:
//   mm,dd,yy,Category, Image Description.ext
//   e.g. "02,14,26,Vacation, Snow day at the shop.jpg"
//     -> sorts as Feb 14, 2026, category "Vacation",
//        caption "Snow Day At The Shop"
//
// Files that don't match that exact pattern are still included in the
// gallery (nothing gets dropped) — they're just pushed to the very
// bottom, after every correctly-named photo, sorted by file-modified
// time as a tiebreaker, and filed under the "Uncategorized" category,
// so they're easy to spot and rename.
//
// Usage:
//   node scripts/generate-manifest.mjs
//
// Requires the "sharp" package (dev dependency):
//   npm install --save-dev sharp
//
// Recommended: chain this after your existing HEIC conversion step,
// e.g. in package.json:
//   "prebuild": "node scripts/convert-heic.mjs && node scripts/generate-manifest.mjs"

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const GALLERY_DIR = path.resolve("public/gallery");
const MANIFEST_PATH = path.resolve("src/app/gallery/manifest.json");

// .heic is intentionally excluded — convert it to .jpg/.png first
// (see scripts/convert-heic.mjs) so both the browser and sharp can read it.
const VALID_EXT = new Set([".jpg", ".jpeg", ".png"]);

const UNCATEGORIZED = "Uncategorized";

// mm,dd,yy,Category, Description
const DATE_PATTERN = /^(\d{2}),(\d{2}),(\d{2}),\s*([^,]+),\s*(.+)$/;

function humanize(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseFilename(baseName) {
  const match = baseName.match(DATE_PATTERN);
  if (!match) {
    return { matched: false, category: UNCATEGORIZED, caption: humanize(baseName) };
  }

  const [, mm, dd, yy, category, description] = match;
  const month = Number(mm);
  const day = Number(dd);
  const year = 2000 + Number(yy);

  const parsedDate = new Date(year, month - 1, day);
  const isValidCalendarDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  if (!isValidCalendarDate) {
    // Looks like the pattern but isn't a real date (e.g. "13,40,25,...") —
    // treat it as unmatched rather than silently mis-sorting it.
    return { matched: false, category: UNCATEGORIZED, caption: humanize(baseName) };
  }

  return {
    matched: true,
    parsedDate,
    category: humanize(category),
    caption: humanize(description),
  };
}

async function buildBlurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .resize(16, 16, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  const dirents = await fs.readdir(GALLERY_DIR, { withFileTypes: true });
  const files = dirents
    .filter((d) => d.isFile() && VALID_EXT.has(path.extname(d.name).toLowerCase()))
    .map((d) => d.name);

  const entries = [];

  for (const filename of files) {
    const filePath = path.join(GALLERY_DIR, filename);
    const stat = await fs.stat(filePath);
    const ext = path.extname(filename);
    const baseName = filename.slice(0, -ext.length);

    const { matched, parsedDate, category, caption } = parseFilename(baseName);

    let width = 1200;
    let height = 800;
    try {
      const metadata = await sharp(filePath).metadata();
      width = metadata.width ?? width;
      height = metadata.height ?? height;
    } catch (err) {
      console.warn(`Could not read dimensions for ${filename}: ${err.message}`);
    }

    let blurDataURL = null;
    try {
      blurDataURL = await buildBlurDataURL(filePath);
    } catch (err) {
      console.warn(`Could not build blur placeholder for ${filename}: ${err.message}`);
    }

    entries.push({
      id: filename,
      src: `/gallery/${filename}`,
      alt: caption,
      caption,
      category,
      date: matched
        ? parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : String(new Date(stat.mtimeMs).getFullYear()),
      mtimeMs: stat.mtimeMs,
      width,
      height,
      blurDataURL,
      // `sorted` tells the page this file matched the naming convention and
      // has a real parsed date — the page uses this to make sure an
      // improperly-named file always sinks to the bottom, no matter which
      // sort direction is selected. `sortTimestamp` is exposed (not just
      // used internally) so the page can defensively re-sort client-side.
      sorted: matched,
      sortTimestamp: matched ? parsedDate.getTime() : null,
    });
  }

  entries.sort((a, b) => {
    if (a.sorted && b.sorted) return a.sortTimestamp - b.sortTimestamp;
    if (a.sorted && !b.sorted) return -1;
    if (!a.sorted && b.sorted) return 1;
    return a.mtimeMs - b.mtimeMs; // both unmatched: fall back to file time
  });

  const manifest = entries;

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const unmatchedCount = entries.filter((e) => !e.sorted).length;
  console.log(`Wrote ${manifest.length} entries to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  if (unmatchedCount > 0) {
    console.log(
      `${unmatchedCount} file(s) don't match "mm,dd,yy,Category,Description" and were filed under "${UNCATEGORIZED}" at the bottom of the gallery.`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
