// ============================================================
// GALLERY DATA
// To add a photo:
//   1. Drop the image into /public/gallery/
//   2. Set src to "/gallery/your-filename.jpg"
//   3. Fill in alt, caption, and date
// Leave src as null to show a placeholder slot.
// ============================================================
const GALLERY_ITEMS = [
  {
    id: 1,
    src: null,
    alt: "Oscilloscope diagnostics session",
    caption: "Oscilloscope Diagnostics / Embedded Debugging",
    date: "2024",
  },
  {
    id: 2,
    src: null,
    alt: "Formula SAE low voltage power assembly",
    caption: "Formula SAE Low Voltage Power Assembly",
    date: "2024",
  },
  {
    id: 3,
    src: null,
    alt: "PCB Altium design workspace",
    caption: "PCB Altium Design Routing Workspace",
    date: "2024",
  },
  {
    id: 4,
    src: null,
    alt: "Formula SAE electrical team",
    caption: "Formula SAE Electrical Team",
    date: "2024",
  },
  {
    id: 5,
    src: null,
    alt: "Autonomous AI navigation lab",
    caption: "Autonomous AI Navigation Lab",
    date: "2024",
  },
  {
    id: 6,
    src: null,
    alt: "Engineering workshop session",
    caption: "Engineering Workshop Session",
    date: "2024",
  },
  // ── ADD NEW PHOTOS BELOW ──────────────────────────────────
  // {
  //   id: 7,
  //   src: "/gallery/your-photo.jpg",
  //   alt: "Brief description for screen readers",
  //   caption: "Caption shown under the photo",
  //   date: "2025",
  // },
];

export default function GalleryPage() {
  const hasPhotos = GALLERY_ITEMS.some((item) => item.src !== null);

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
          <p>1. Create a <span className="font-bold">/public/gallery/</span> folder in your project root.</p>
          <p>2. Drop your images in (e.g. <span className="font-bold">team-photo.jpg</span>).</p>
          <p>3. Set <span className="font-bold">src</span> in the <span className="font-bold">GALLERY_ITEMS</span> array at the top of this file.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            {item.src ? (
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 text-xs font-mono">Photo Coming Soon</span>
              </div>
            )}

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
