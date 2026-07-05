#!/usr/bin/env node
// scripts/generate-newsletters-manifest.mjs
//
// Scans /public/newsletters and rebuilds src/app/newsletter/manifest.json.
//
// NAMING CONVENTION for automatic chronological sorting:
//   mm,dd,yy, Newsletter Description.pdf
//   e.g. "03,15,26, Spring Controls Update.pdf"  ->  sorts as March 15, 2026
//
// Newsletters are sorted NEWEST FIRST. Files that don't match this exact
// pattern are still included (nothing gets dropped) — they're just pushed
// to the very bottom, after every correctly-named issue, sorted by file
// modified time as a tiebreaker, so they're easy to spot and rename.
//
// Usage:
//   node scripts/generate-newsletters-manifest.mjs

import fs from "node:fs/promises";
import path from "node:path";

const NEWSLETTERS_DIR = path.resolve("public/newsletters");
const MANIFEST_PATH = path.resolve("src/app/newsletter/manifest.json");

const DATE_PATTERN = /^(\d{2}),\s*(\d{2}),\s*(\d{2}),\s*(.+)$/;

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
    return { matched: false, title: humanize(baseName) };
  }

  const [, mm, dd, yy, description] = match;
  const month = Number(mm);
  const day = Number(dd);
  const year = 2000 + Number(yy);

  const parsedDate = new Date(year, month - 1, day);
  const isValidCalendarDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  if (!isValidCalendarDate) {
    // Matches the shape but isn't a real date — treat as unmatched rather
    // than silently mis-sorting it.
    return { matched: false, title: humanize(baseName) };
  }

  return {
    matched: true,
    parsedDate,
    title: humanize(description),
  };
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  let dirents;
  try {
    dirents = await fs.readdir(NEWSLETTERS_DIR, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(`${NEWSLETTERS_DIR} doesn't exist yet — writing an empty manifest.`);
      await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
      await fs.writeFile(MANIFEST_PATH, "[]\n");
      return;
    }
    throw err;
  }

  const files = dirents
    .filter((d) => d.isFile() && path.extname(d.name).toLowerCase() === ".pdf")
    .map((d) => d.name);

  const entries = [];

  for (const filename of files) {
    const filePath = path.join(NEWSLETTERS_DIR, filename);
    const stat = await fs.stat(filePath);
    const baseName = filename.slice(0, -".pdf".length);

    const { matched, parsedDate, title } = parseFilename(baseName);

    entries.push({
      id: filename,
      title,
      pdfPath: `/newsletters/${filename}`,
      date: matched
        ? parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "Unsorted — rename to mm,dd,yy, Description",
      sizeLabel: formatSize(stat.size),
      mtimeMs: stat.mtimeMs,
      // `sorted` tells the page this file matched the naming convention and
      // has a real parsed date — the page uses this to make sure an
      // improperly-named file can never be picked as the default "latest" issue.
      // `sortTimestamp` is exposed (not just used internally) so the page can
      // defensively re-sort client-side and guarantee newest-to-oldest order.
      sorted: matched,
      sortTimestamp: matched ? parsedDate.getTime() : null,
    });
  }

  entries.sort((a, b) => {
    if (a.sorted && b.sorted) return b.sortTimestamp - a.sortTimestamp; // newest first
    if (a.sorted && !b.sorted) return -1;
    if (!a.sorted && b.sorted) return 1;
    return b.mtimeMs - a.mtimeMs; // both unmatched: most recently added first
  });

  const manifest = entries;

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const unmatchedCount = entries.filter((e) => !e.sorted).length;
  console.log(`Wrote ${manifest.length} entries to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  if (unmatchedCount > 0) {
    console.log(
      `${unmatchedCount} file(s) don't match "mm,dd,yy, Description" and were pushed to the bottom.`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
