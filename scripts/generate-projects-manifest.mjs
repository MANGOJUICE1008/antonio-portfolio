#!/usr/bin/env node
// scripts/generate-projects-manifest.mjs
//
// Reads data/projects.csv (edit it in Excel, Numbers, or Google Sheets)
// and rebuilds src/app/projects/manifest.json — the same way
// generate-manifest.mjs turns /public/gallery into gallery/manifest.json.
//
// To add or remove a project: edit the CSV, save it, then re-run this
// script (it already runs automatically via "predev"/"prebuild").
//
// CSV COLUMNS (header row, any order, case-insensitive):
//   Status        past | present | future
//   Start Date    MM/YYYY  (optional, e.g. 05/2024)
//   End Date      MM/YYYY  (optional — leave blank if ongoing)
//   Title         Project title
//   Description   Short paragraph description
//   Highlights    Bullet points, separated by semicolons ( ; )
//   Tags          Tools/technologies, separated by semicolons ( ; )
//   Featured      yes | no  — shows on the home page if yes
//   PDF Filename  Just the filename, e.g. report.pdf (optional).
//                 Put the actual PDF in public/project-files/
//
// Rows that are missing a Title are skipped with a warning. Everything
// else is best-effort: bad dates or an unrecognized status fall back to
// sensible defaults rather than breaking the build.
//
// Usage:
//   node scripts/generate-projects-manifest.mjs

import fs from "node:fs/promises";
import path from "node:path";

const CSV_PATH = path.resolve("data/projects.csv");
const MANIFEST_PATH = path.resolve("src/app/projects/manifest.json");
const PROJECT_FILES_DIR = path.resolve("public/project-files");

const TAG_PALETTE = ["blue", "green", "purple", "orange", "yellow", "red"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ── Minimal RFC4180-ish CSV parser ──────────────────────────────
// Handles quoted fields, embedded commas/newlines, and "" escaped quotes,
// which is what Excel/Sheets produce when a field contains a comma.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  // Normalize line endings so \r\n inside/outside quotes behaves the same.
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];

    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }

  // Flush the last field/row if the file doesn't end with a newline.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function humanize(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Deterministic color per project so it doesn't shift when other rows
// are added/removed/reordered in the CSV.
function colorForTitle(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return TAG_PALETTE[hash % TAG_PALETTE.length];
}

function normalizeStatus(raw, rowNum) {
  const v = (raw || "").trim().toLowerCase();
  if (["present", "current", "now", "active"].includes(v)) return "current";
  if (["past", "previous", "done", "complete", "completed"].includes(v)) return "previous";
  if (["future", "planned", "upcoming"].includes(v)) return "future";
  console.warn(`Row ${rowNum}: unrecognized status "${raw}" — defaulting to "previous".`);
  return "previous";
}

// Accepts "MM/YYYY", "MM-YYYY", or "MM YYYY". Returns { month, year } or null.
function parseMonthYear(raw, rowNum, label) {
  const v = (raw || "").trim();
  if (!v) return null;

  const match = v.match(/^(\d{1,2})[\/\-\s](\d{4})$/);
  if (!match) {
    console.warn(`Row ${rowNum}: could not parse ${label} "${raw}" (expected MM/YYYY) — leaving blank.`);
    return null;
  }

  const month = Number(match[1]);
  const year = Number(match[2]);
  if (month < 1 || month > 12) {
    console.warn(`Row ${rowNum}: ${label} "${raw}" has an invalid month — leaving blank.`);
    return null;
  }

  return { month, year };
}

function formatMonthYear({ month, year }) {
  return `${MONTHS[month - 1]} ${year}`;
}

function sortKey({ month, year }) {
  return year * 12 + month;
}

function computeDateLabel(status, start, end) {
  if (status === "current") {
    return start ? `${formatMonthYear(start)} – Present` : "In Progress";
  }
  if (status === "previous") {
    if (start && end) return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
    if (start) return `${formatMonthYear(start)} – Completed`;
    if (end) return `Completed ${formatMonthYear(end)}`;
    return "Completed";
  }
  // future
  return start ? `Planned: ${formatMonthYear(start)}` : "Planned";
}

function splitList(raw) {
  return (raw || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeFeatured(raw) {
  return ["yes", "y", "true"].includes((raw || "").trim().toLowerCase());
}

// Maps flexible header names -> canonical keys.
const HEADER_ALIASES = {
  status: "status",
  "active status": "status",
  "start date": "start",
  start: "start",
  "end date": "end",
  end: "end",
  title: "title",
  "project title": "title",
  description: "description",
  "project description": "description",
  highlights: "highlights",
  "bullet points": "highlights",
  "bullet pointed information": "highlights",
  tags: "tags",
  "technologies and tools tags": "tags",
  "technologies": "tags",
  featured: "featured",
  "featured project": "featured",
  "pdf filename": "pdf",
  "pdf name": "pdf",
  "pdf": "pdf",
  "link to project pdf": "pdf",
};

async function main() {
  let csvText;
  try {
    csvText = await fs.readFile(CSV_PATH, "utf-8");
  } catch (err) {
    console.warn(`Could not read ${path.relative(process.cwd(), CSV_PATH)}: ${err.message}`);
    console.warn("Writing an empty projects manifest so the build doesn't break.");
    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await fs.writeFile(MANIFEST_PATH, "[]\n");
    return;
  }

  const rows = parseCSV(csvText);
  if (rows.length === 0) {
    console.warn("data/projects.csv has no rows — writing an empty manifest.");
    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await fs.writeFile(MANIFEST_PATH, "[]\n");
    return;
  }

  const headerRow = rows[0];
  const dataRows = rows.slice(1);

  const columnIndex = {};
  headerRow.forEach((h, i) => {
    const key = HEADER_ALIASES[h.trim().toLowerCase()];
    if (key) columnIndex[key] = i;
  });

  const required = ["status", "title", "description"];
  const missingHeaders = required.filter((k) => !(k in columnIndex));
  if (missingHeaders.length > 0) {
    throw new Error(
      `data/projects.csv is missing required column(s): ${missingHeaders.join(", ")}. ` +
      `Check the header row against the column list at the top of scripts/generate-projects-manifest.mjs.`
    );
  }

  let pdfFiles = new Set();
  try {
    const entries = await fs.readdir(PROJECT_FILES_DIR);
    pdfFiles = new Set(entries);
  } catch {
    // public/project-files doesn't exist yet — that's fine, just means no PDFs.
  }

  const get = (row, key) => (columnIndex[key] !== undefined ? row[columnIndex[key]] ?? "" : "");

  const usedIds = new Set();
  const entries = [];

  dataRows.forEach((row, idx) => {
    const rowNum = idx + 2; // +1 for 0-index, +1 for header row
    const title = get(row, "title").trim();
    if (!title) {
      console.warn(`Row ${rowNum}: no title — skipping this row.`);
      return;
    }

    const status = normalizeStatus(get(row, "status"), rowNum);
    const start = parseMonthYear(get(row, "start"), rowNum, "start date");
    const end = parseMonthYear(get(row, "end"), rowNum, "end date");
    const description = get(row, "description").trim();
    const highlights = splitList(get(row, "highlights"));
    const tags = splitList(get(row, "tags"));
    const featured = normalizeFeatured(get(row, "featured"));

    let pdf = null;
    let pdfLabel = null;
    const pdfFilename = get(row, "pdf").trim();
    if (pdfFilename) {
      if (pdfFiles.has(pdfFilename)) {
        pdf = `/project-files/${pdfFilename}`;
        pdfLabel = humanize(pdfFilename.replace(/\.pdf$/i, ""));
      } else {
        console.warn(
          `Row ${rowNum} ("${title}"): PDF "${pdfFilename}" not found in public/project-files/ — ` +
          `link omitted. Add the file there and re-run this script.`
        );
      }
    }

    let id = slugify(title);
    if (usedIds.has(id)) {
      let n = 2;
      while (usedIds.has(`${id}-${n}`)) n++;
      id = `${id}-${n}`;
    }
    usedIds.add(id);

    entries.push({
      id,
      status,
      title,
      description,
      highlights,
      tags,
      tagColor: colorForTitle(title),
      featured,
      pdf,
      pdfLabel,
      date: computeDateLabel(status, start, end),
      _statusOrder: { current: 0, previous: 1, future: 2 }[status],
      _sortKey: start ? sortKey(start) : end ? sortKey(end) : null,
    });
  });

  // Group by status (current, then previous, then future); within a group,
  // most recent first for current/previous, soonest-first for future.
  // Rows with no date sink to the bottom of their group.
  entries.sort((a, b) => {
    if (a._statusOrder !== b._statusOrder) return a._statusOrder - b._statusOrder;
    if (a._sortKey === null && b._sortKey === null) return 0;
    if (a._sortKey === null) return 1;
    if (b._sortKey === null) return -1;
    return a.status === "future" ? a._sortKey - b._sortKey : b._sortKey - a._sortKey;
  });

  const manifest = entries.map(({ _statusOrder, _sortKey, ...rest }) => rest);

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`Wrote ${manifest.length} project(s) to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
