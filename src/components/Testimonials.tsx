"use client";

import { useRef, useState, useEffect } from "react";

const reviews = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    verified: true,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
  },
  {
    name: "Moona K.",
    text: "Best online fashion store I've used. The variety is amazing and the prices are very reasonable. Already placed my second order!",
    verified: true,
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-review-card]");
    const cardWidth = card?.getBoundingClientRect().width ?? 0;
    const gap = 24;
    el.scrollBy({ left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
    setTimeout(updateScrollState, 300);
  };

  return (
    <section
      className="py-10 md:py-16 bg-[#F0F0F0] animate-fade-in-up animate-fade-in-up-delay-2"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2
            id="testimonials-heading"
            className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight"
          >
            Our happy customers
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous reviews"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next reviews"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {reviews.map((review) => (
            <article
              key={review.name}
              data-review-card
              className="flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-[380px] bg-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col min-h-0 hover:shadow-lg hover:border border-transparent border-gray-200 transition-all duration-300 ease-out"
            >
              <div className="flex gap-1 text-amber-400 mb-3" aria-hidden>
                ★★★★★
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-black">{review.name}</span>
                {review.verified && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white flex-shrink-0" aria-label="Verified purchase">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
