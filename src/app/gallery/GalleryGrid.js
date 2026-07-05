"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const PAGE_SIZE_OPTIONS = [10, 25, 50];
const UNCATEGORIZED = "Uncategorized";

export default function GalleryGrid({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // Unique categories present in the manifest, alphabetized, with "All" pinned first.
  const categories = useMemo(() => {
    const unique = new Set(items.map((item) => item.category || UNCATEGORIZED));
    return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => (item.category || UNCATEGORIZED) === selectedCategory);
  }, [items, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Whenever the filter or page size changes, the current page number may no
  // longer make sense — snap back to page 1 rather than showing a blank page.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  // Close the lightbox whenever the visible set of photos changes underneath
  // it (new page, new filter) so it never shows a stale index into a
  // different array.
  useEffect(() => {
    setSelectedIndex(null);
  }, [currentPage, selectedCategory, itemsPerPage]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const selected = selectedIndex !== null ? pageItems[selectedIndex] : null;

  const showPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + pageItems.length) % pageItems.length));
  }, [pageItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % pageItems.length));
  }, [pageItems.length]);

  // Close on Escape, jump photos on ←/→, and stop the page from scrolling behind the overlay.
  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, showPrev, showNext]);

  function goToPage(page) {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (items.length === 0) {
    return null;
  }

  const rangeStart = filteredItems.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, filteredItems.length);

  return (
    <>
      {/* Toolbar — category filter + page size */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="gallery-category"
              className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-semibold"
            >
              Category
            </label>
            <select
              id="gallery-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="gallery-per-page"
              className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-semibold"
            >
              Per Page
            </label>
            <select
              id="gallery-per-page"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="text-sm p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-400">
          {filteredItems.length === 0
            ? "No photos in this category"
            : `Showing ${rangeStart}–${rangeEnd} of ${filteredItems.length}`}
        </p>
      </div>

      {/* Masonry grid */}
      {pageItems.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {pageItems.map((item, index) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(index);
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
                placeholder={item.blurDataURL ? "blur" : "empty"}
                blurDataURL={item.blurDataURL || undefined}
              />
              <div className="p-3 border-t border-slate-100">
                <p className="text-sm text-slate-700 font-medium">{item.caption}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-slate-400 font-mono">{item.date}</p>
                  {item.category && (
                    <p className="text-[10px] text-blue-500 font-mono uppercase tracking-wider">
                      {item.category}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="text-sm font-mono px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            ← Prev
          </button>
          <span className="text-xs font-mono text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="text-sm font-mono px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {/* Back to top */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={scrollToTop}
          className="text-xs font-mono px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all"
        >
          ↑ Back to top
        </button>
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
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

          {/* Prev / next arrows — only worth showing if there's more than one photo */}
          {pageItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Stop propagation so clicking the photo/caption doesn't close it — only the backdrop does */}
          <div
            className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={selected.id}
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              placeholder={selected.blurDataURL ? "blur" : "empty"}
              blurDataURL={selected.blurDataURL || undefined}
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
