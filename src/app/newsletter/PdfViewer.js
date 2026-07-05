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

// className is applied to the outer scroll container, so callers can control
// height the same way they controlled the old iframe's height.
export default function PdfViewer({ pdfPath, title, className = "" }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 p-12 text-center ${className}`}>
        <p className="text-slate-500 text-sm font-mono">Couldn&apos;t load the preview.</p>
        <a
          href={pdfPath}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-sm font-mono underline"
        >
          Open the PDF directly
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-y-auto ${className}`}>
      <Document
        file={pdfPath}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={() => setFailed(true)}
        loading={
          <div className="p-12 text-center text-sm text-slate-400 font-mono">Loading preview…</div>
        }
      >
        {containerWidth &&
          Array.from({ length: numPages || 0 }, (_, i) => (
            <Page
              key={`${title}-page-${i + 1}`}
              pageNumber={i + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="[&>canvas]:mx-auto [&>canvas]:!h-auto border-b border-slate-100 last:border-b-0"
            />
          ))}
      </Document>
    </div>
  );
}
