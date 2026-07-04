"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryGrid({ items }) {
  const [selected, setSelected] = useState(null);

  // Close on Escape, and stop the page from scrolling behind the overlay.
  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") setSelected(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelected(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(item);
              }
            }}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              priority={index < 3}
            />
            <div className="p-3 border-t border-slate-100">
              <p className="text-sm text-slate-700 font-medium">{item.caption}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-7 h-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Stop propagation so clicking the photo/caption doesn't close it — only the backdrop does */}
          <div
            className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              priority
            />
            <p className="mt-3 text-sm text-white/80 font-mono text-center">
              {selected.caption} <span className="text-white/40">— {selected.date}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
