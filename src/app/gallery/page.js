import manifest from "./manifest.json";
import GalleryGrid from "./GalleryGrid";

// ============================================================
// GALLERY — fully automatic, masonry layout, click-to-enlarge
//
// Drop .jpg, .png, or .heic files into /public/gallery/, then run:
//   node scripts/generate-manifest.mjs
// (HEIC files should be converted first via scripts/convert-heic.mjs.)
//
// NAMING CONVENTION (controls sort order + caption):
//   mm-dd-yy,Image Description.jpg
//   e.g. "02-14-26,Snow day at the shop.jpg" -> sorts as Feb 14, 2026
//        and captions as "Snow Day At The Shop"
//
// Files that don't follow this pattern still show up — they're just
// pushed to the bottom of the gallery until renamed.
//
// This page stays a plain server component (no "use client", no runtime
// fs access) — it just imports the pre-built manifest.json and hands the
// data to <GalleryGrid>, which is where all the click/lightbox
// interactivity lives.
// ============================================================

export default function GalleryPage() {
  const GALLERY_ITEMS = manifest;
  const hasPhotos = GALLERY_ITEMS.length > 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Gallery</h1>
        <p className="text-sm text-slate-500 mt-1">
          Engineering snapshots, team moments, project milestones, and other highlights
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      {/* How-to banner — shown until photos are added */}
      {!hasPhotos && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs font-mono text-blue-700 space-y-1">
          <p className="font-bold text-blue-700">{"// HOW TO ADD PHOTOS"}</p>
          <p>1. Drop image files into <span className="font-bold">/public/gallery/</span>.</p>
          <p>2. Supported formats: <span className="font-bold">.png</span>, <span className="font-bold">.jpg</span>, <span className="font-bold">.heic</span>.</p>
          <p>
            3. Name files <span className="font-bold">mm-dd-yy,Image Description.jpg</span> to control
            sort order — e.g. <span className="font-bold">02-14-26,Snow day at the shop.jpg</span>.
            Files that don&apos;t match this pattern still appear, just pushed to the bottom until renamed.
          </p>
          <p>4. Run <span className="font-bold">node scripts/generate-manifest.mjs</span> to rebuild the gallery.</p>
        </div>
      )}

      <GalleryGrid items={GALLERY_ITEMS} />
    </div>
  );
}
