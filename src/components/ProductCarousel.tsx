"use client";

import { useRef, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  headingId?: string;
  showDiscount?: boolean;
  viewAllHref?: string;
}

export function ProductCarousel({
  products,
  title,
  headingId,
  showDiscount,
  viewAllHref,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 4);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, [products.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-carousel-card]")?.getBoundingClientRect().width ?? 0;
    const gap = 24;
    const step = (cardWidth + gap) * 4;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
    setTimeout(updateScrollState, 300);
  };

  return (
    <section
      className="pt-2 md:pt-4 pb-20 md:pb-32 animate-fade-in-up"
      aria-labelledby={headingId}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0" aria-hidden />
          <h2
            id={headingId}
            className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-tight text-center flex-shrink-0 px-4"
          >
            {title}
          </h2>
          <div className="flex-1 flex items-center justify-end min-w-0">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-3 text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                aria-label={`Previous ${title} products`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-3 text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-200 border-l border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                aria-label={`Next ${title} products`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-carousel-card
              className="flex-shrink-0 w-[calc(100%-1rem)] xs:w-[calc(50%-0.75rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] min-w-0"
            >
              <ProductCard product={product} showDiscount={showDiscount} />
            </div>
          ))}
        </div>
        {viewAllHref && (
          <div className="mt-8 flex justify-center">
            <a
              href={viewAllHref}
              className="text-sm font-medium text-black bg-white border border-gray-300 py-2.5 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 min-w-[180px] text-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              View All
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
