"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// react-pdf renders PDFs as actual canvas/images via PDF.js, instead of
// relying on the browser's native PDF plugin. This is what makes it show
// up the same way on mobile Safari/Chrome as it does on desktop — those
// browsers don't reliably render PDFs embedded in an <iframe>.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// Renders one page at a time (with Prev/Next controls) rather than stacking
// every page as its own canvas. Mobile browsers — iOS Safari especially —
// cap total canvas memory/pixels; stacking several full-resolution pages at
// once silently truncates later canvases instead of erroring, which is what
// caused pages to crop on longer PDFs. One canvas at a time avoids that.
//
// className controls the overall size of the viewer (e.g. "w-full h-[70vh]")
// the same way it controlled the old iframe's size.
export default function PdfViewer({ pdfPath, title, className = "" }) {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset to page 1 whenever a different PDF is loaded into this viewer.
  useEffect(() => {
    setPageNumber(1);
    setNumPages(null);
    setFailed(false);
  }, [pdfPath]);

  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 p-12 text-center ${className}`}>
        <p className="text-slate-500 text-sm font-mono">Couldn&apos;t load the preview.</p>
        <a href={pdfPath} target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-mono underline">
          Open the PDF directly
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`flex flex-col ${className}`}>
      {/* min-h-0 lets this flex child actually shrink to the space available
          instead of growing to fit its content and getting clipped by a
          parent's overflow-hidden (the bug behind the desktop Inspect crop). */}
      <div className="flex-grow min-h-0 overflow-auto flex items-start justify-center bg-slate-50">
        <Document
          file={pdfPath}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setFailed(true)}
          loading={
            <div className="p-12 text-center text-sm text-slate-400 font-mono">Loading preview…</div>
          }
        >
          {containerSize && (
            <Page
              pageNumber={pageNumber}
              width={Math.min(containerSize.width, 900)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              aria-label={`${title} — page ${pageNumber}`}
            />
          )}
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-100 bg-white flex-shrink-0">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="text-sm font-mono px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            ← Prev
          </button>
          <span className="text-xs font-mono text-slate-500">
            Page {pageNumber} of {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="text-sm font-mono px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
