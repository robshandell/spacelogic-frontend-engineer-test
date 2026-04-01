 "use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const styles = [
  { name: "Casual", image: "/images/casual-img.png", width: "short" },
  { name: "Formal", image: "/images/formal-img.png", width: "long" },
  { name: "Party", image: "/images/party-img.png", width: "long" },
  { name: "Gym", image: "/images/gym-img.png", width: "short" },
] as const;

export function BrowseByStyle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-browse-reveal]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="-mt-10 md:-mt-16 py-10 md:py-16"
      aria-labelledby="browse-by-style-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#eaeaea] rounded-2xl md:rounded-3xl p-5 md:p-10 pb-8 md:pb-12">
          <h2
            id="browse-by-style-heading"
            data-browse-reveal
            className="rise-on-scroll text-[2.6rem] md:text-[3.4rem] leading-[0.95] font-extrabold text-black uppercase tracking-tight text-center mb-6 md:mb-10"
          >
            Browse by dress style
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-5">
            {styles.map(({ name, image, width }) => {
              const sectionId = name.toLowerCase();
              return (
                <a
                  key={name}
                  href={`/shop#${sectionId}`}
                  className={`group relative rounded-[20px] bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-out h-[220px] md:h-[289px] flex flex-[0_0_100%] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                    width === "short"
                      ? "sm:flex-[0_0_calc(37.3%-0.375rem)] md:flex-[0_0_calc(37.3%-0.625rem)]"
                      : "sm:flex-[0_0_calc(60.5%-0.375rem)] md:flex-[0_0_calc(60.5%-0.625rem)]"
                  } rise-on-scroll`}
                  data-browse-reveal
                  aria-label={`Browse ${name} dress style`}
                >
                  <span className="absolute top-4 left-4 md:top-5 md:left-6 z-10 inline-flex font-bold text-black text-2xl md:text-4xl bg-white/85 px-3 py-1 rounded-md">
                    {name}
                  </span>
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`${name} style card`}
                      fill
                      quality={100}
                      unoptimized
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 63vw, 41vw"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
