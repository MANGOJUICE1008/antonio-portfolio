import fs from "fs";
import path from "path";

// ============================================================
// GALLERY — fully automatic
// Just drop .png, .jpg, or .heic files into /public/gallery/.
// The filename (minus the extension) becomes the caption.
//   e.g. oscilloscope-diagnostics-session.jpg -> "Oscilloscope Diagnostics Session"
// HEIC files are auto-converted to JPG by scripts/convert-heic.mjs,
// which runs automatically before `npm run dev` / `npm run build`.
// ============================================================

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".heic"];

function toTitleCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function getGalleryItems() {
  let files;
  try {
    files = fs.readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .map((file) => {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const stats = fs.statSync(path.join(GALLERY_DIR, file));
      return {
        id: file,
        src: `/gallery/${file}`,
        alt: toTitleCase(base),
        caption: toTitleCase(base),
        date: stats.mtime.getFullYear().toString(),
        mtimeMs: stats.mtime.getTime(),
      };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs); // newest first
}

export default function GalleryPage() {
  const GALLERY_ITEMS = getGalleryItems();
  const hasPhotos = GALLERY_ITEMS.length > 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Gallery</h1>
        <p className="text-sm text-slate-500 mt-1">
          Engineering snapshots, team moments, and project milestones
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      {/* How-to banner — shown until photos are added */}
      {!hasPhotos && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs font-mono text-blue-700 space-y-1">
          <p className="font-bold text-blue-700">{"// HOW TO ADD PHOTOS"}</p>
          <p>1. Drop image files into <span className="font-bold">/public/gallery/</span>.</p>
          <p>2. Supported formats: <span className="font-bold">.png</span>, <span className="font-bold">.jpg</span>, <span className="font-bold">.heic</span>.</p>
          <p>3. The filename becomes the caption automatically — e.g. <span className="font-bold">oscilloscope-debugging.jpg</span> → &quot;Oscilloscope Debugging&quot;.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Caption */}
            <div className="p-3 border-t border-slate-100">
              <p className="text-sm text-slate-700 font-medium">{item.caption}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
