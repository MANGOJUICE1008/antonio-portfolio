"use client";
import { useEffect, useState } from "react";
import manifest from "./manifest.json";
import PdfViewer from "./PdfViewer";

// ============================================================
// NEWSLETTER ARCHIVE — fully automatic, sorted newest-first.
//
// Drop PDFs into /public/newsletters/, then run:
//   node scripts/generate-newsletters-manifest.mjs
//
// NAMING CONVENTION (controls sort order + title):
//   mm,dd,yy, Newsletter Description.pdf
//   e.g. "03,15,26, Spring Controls Update.pdf" -> sorts as March 15, 2026
//        and titles as "Spring Controls Update"
//
// Files that don't follow this pattern still show up in the archive so
// you can download/view them — they're just pushed to the bottom, and
// they can never be picked as the default "Latest Issue".
//
// PDFs are embedded with their native toolbar/print chrome hidden (via
// the #toolbar=0 fragment) and styled flush with the card around them,
// so they read as part of the page rather than a separate viewer. A
// small "Inspect" (expand) and "Download" icon sit in the bottom-right
// corner of the display, the same way a photo's controls would.
// ============================================================

const ICONS = {
  inspect: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4.5 h-4.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"
      />
    </svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4.5 h-4.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  ),
  openInNewTab: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4.5 h-4.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  ),
};

// PdfViewer renders each page as a canvas via PDF.js, so the preview looks
// the same on mobile Safari/Chrome as it does on desktop instead of relying
// on the browser's native (and mobile-unreliable) PDF plugin.

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [viewing, setViewing] = useState(null); // the issue currently open in the Inspect modal

  const hasNewsletters = manifest.length > 0;

  // Defensive re-sort on the client: newest properly-named issue first,
  // any improperly-named file always sinks to the very bottom. This holds
  // even if manifest.json somehow got out of order.
  const newsletters = [...manifest].sort((a, b) => {
    const aKey = a.sorted ? a.sortTimestamp : -Infinity;
    const bKey = b.sorted ? b.sortTimestamp : -Infinity;
    if (aKey !== bKey) return bKey - aKey;
    return b.mtimeMs - a.mtimeMs;
  });

  const properlyNamed = newsletters.filter((n) => n.sorted);
  const latest = properlyNamed[0] ?? null;
  const older = newsletters.filter((n) => n !== latest);

  // Close the modal on Escape, and stop the page from scrolling behind it.
  useEffect(() => {
    if (!viewing) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") setViewing(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [viewing]);

  async function handleSubmit() {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      // ── Replace this block with your actual form endpoint ──
      await new Promise((r) => setTimeout(r, 800));
      // ──────────────────────────────────────────────────────
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Newsletter</h1>
        <p className="text-sm text-slate-500 mt-1">
          Engineering insights, project updates, and highlights
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      {/* Latest issue — shown expanded by default (always a properly-named file, never "unsorted") */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Latest Issue</h2>
        </div>

        {!latest ? (
          <div className="border border-slate-200 rounded-2xl p-12 bg-white flex flex-col items-center text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="text-slate-600 font-semibold text-sm">
              {hasNewsletters ? "No properly named issue yet." : "First issue coming soon."}
            </p>
            <p className="text-slate-400 text-xs mt-1 font-mono">
              {hasNewsletters
                ? "Rename a file to mm,dd,yy, Description.pdf to feature it here."
                : "Subscribe below to be the first to know."}
            </p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-6 pb-4">
              <h3 className="font-bold text-lg text-slate-900">{latest.title}</h3>
            </div>

            <div className="relative bg-slate-50">
              <PdfViewer
                pdfPath={latest.pdfPath}
                title={latest.title}
                className="w-full h-[70vh] sm:h-[80vh]"
              />

              {/* Inspect / Download — top-right corner, clear of the Prev/Next bar below */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewing(latest)}
                  aria-label="Inspect newsletter"
                  title="Inspect"
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
                >
                  {ICONS.inspect}
                </button>
                <a
                  href={latest.pdfPath}
                  download
                  aria-label="Download newsletter"
                  title="Download"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all"
                >
                  {ICONS.download}
                </a>
                <a
                  href={latest.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open newsletter in a new tab"
                  title="Open in new tab"
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
                >
                  {ICONS.openInNewTab}
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Archive of everything else, newest to oldest */}
      {older.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Past Issues</h2>
            <p className="text-sm text-slate-500 mt-1">Browse the full archive, newest first</p>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white shadow-sm divide-y divide-slate-100 overflow-hidden">
            {older.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center gap-3 sm:gap-4 p-5 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-bold text-slate-900 truncate flex-grow min-w-0">{issue.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewing(issue)}
                    aria-label={`Inspect ${issue.title}`}
                    title="Inspect"
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center transition-all"
                  >
                    {ICONS.inspect}
                  </button>
                  <a
                    href={issue.pdfPath}
                    download
                    aria-label={`Download ${issue.title}`}
                    title="Download"
                    className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all"
                  >
                    {ICONS.download}
                  </a>
                  <a
                    href={issue.pdfPath}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${issue.title} in a new tab`}
                    title="Open in new tab"
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center transition-all"
                  >
                    {ICONS.openInNewTab}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Signup */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Stay in the Loop</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xl">
            Get notified when I publish new issues covering embedded systems, PCB design,
            engineering projects, and personal updates.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 max-w-md">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <p className="text-green-700 text-sm font-mono">You're subscribed. First issue incoming.</p>
          </div>
        ) : (
          <div className="space-y-2 max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                className="flex-grow p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-mono"
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm font-mono whitespace-nowrap shadow-sm"
              >
                {status === "loading" ? "SENDING..." : "SUBSCRIBE"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-600 text-xs font-mono">
                Something went wrong. Try again or email me directly.
              </p>
            )}
            <p className="text-[10px] text-slate-400 font-mono">No spam. Unsubscribe any time.</p>
          </div>
        )}
      </section>

      {/* Inspect modal */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
          onClick={() => setViewing(null)}
        >
          <button
            type="button"
            onClick={() => setViewing(null)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Stop propagation so clicking the viewer itself doesn't close it — only the backdrop does */}
          <div
            className="flex flex-col w-full max-w-6xl h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex-shrink-0">
              <h3 className="font-bold text-slate-900 truncate">{viewing.title}</h3>
            </div>

            <div className="relative flex-grow min-h-0 bg-slate-50">
              <PdfViewer
                pdfPath={viewing.pdfPath}
                title={viewing.title}
                className="w-full h-full"
              />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <a
                  href={viewing.pdfPath}
                  download
                  aria-label="Download newsletter"
                  title="Download"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all"
                >
                  {ICONS.download}
                </a>
                <a
                  href={viewing.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open newsletter in a new tab"
                  title="Open in new tab"
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
                >
                  {ICONS.openInNewTab}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
