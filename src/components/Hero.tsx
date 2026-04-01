 "use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const brands: { name: string; weight: "thin" | "medium" | "bold"; logo?: string }[] = [
  { name: "VERSACE", weight: "thin", logo: "/assets/logo/versace-logo.svg" },
  { name: "ZARA", weight: "medium", logo: "/assets/logo/zara-logo-1%201.svg" },
  { name: "GUCCI", weight: "thin", logo: "/assets/logo/gucci-logo-1%201.svg" },
  { name: "PRADA", weight: "bold", logo: "/assets/logo/prada-logo-1%201.svg" },
  { name: "Calvin Klein", weight: "thin", logo: "/assets/logo/calvin-klein-logo.svg" },
];
const heroImage = "/images/hero-model-img.png";
const starburstIcon = "/assets/logo/starbusts-icon.svg";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function StatCount({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const durationMs = 1400;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return (
    <p ref={ref} className="text-2xl md:text-3xl font-bold text-black">
      {formatCount(value)}+
    </p>
  );
}

export function Hero() {
  return (
    <section
      className="py-8 md:py-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black uppercase tracking-tight leading-tight max-w-xl animate-text-rise-up"
            >
              Find clothes that matches your style
            </h1>
            <p className="mt-4 text-black text-base md:text-lg max-w-lg animate-text-rise-up animate-fade-in-up-delay-3">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link
              href="/#new-arrivals"
              className="inline-block mt-6 bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors animate-text-rise-up animate-fade-in-up-delay-4"
            >
              Shop Now
            </Link>
            <div className="mt-10 grid grid-cols-3 gap-6 md:gap-8">
              <div className="animate-text-rise-up animate-fade-in-up-delay-5">
                <StatCount target={200} />
                <p className="text-sm text-gray-600 mt-1">International Brands</p>
              </div>
              <div className="animate-text-rise-up animate-fade-in-up-delay-6">
                <StatCount target={2000} />
                <p className="text-sm text-gray-600 mt-1">High-Quality Products</p>
              </div>
              <div className="animate-text-rise-up animate-fade-in-up-delay-7">
                <StatCount target={30000} />
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative w-full animate-fade-in-up animate-fade-in-up-delay-2">
            <div className="aspect-[4/5] max-h-[400px] md:max-h-[500px] lg:max-h-[600px] w-full max-w-full rounded-2xl overflow-hidden relative">
              <Image
                src={heroImage}
                alt="Fashion models showcasing style and clothing"
                width={1200}
                height={1500}
                quality={100}
                unoptimized
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <span
              className="absolute top-3 right-2 md:top-4 md:right-4 w-[60px] h-[60px] md:w-[70px] md:h-[70px] inline-flex items-center justify-center text-black animate-starburst-circular"
              aria-hidden
            >
              <Image
                src={starburstIcon}
                alt=""
                width={70}
                height={70}
                className="w-full h-full"
              />
            </span>
            <span
              className="absolute left-2 bottom-[38%] md:left-4 md:bottom-[40%] w-8 h-8 md:w-[34px] md:h-[34px] inline-flex items-center justify-center text-black animate-starburst-circular-reverse"
              aria-hidden
            >
              <Image
                src={starburstIcon}
                alt=""
                width={35}
                height={35}
                className="w-full h-full"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-black animate-fade-in-up animate-fade-in-up-delay-4"
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around md:justify-between items-center gap-4 px-4 md:px-8">
          {brands.map((brand) =>
            brand.logo ? (
              <Image
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={40}
                className={`object-contain brightness-0 invert h-6 w-auto md:h-8 ${brand.name === "PRADA" ? "scale-x-75 origin-center" : ""}`}
              />
            ) : (
              <span
                key={brand.name}
                className={`text-white uppercase tracking-wide text-sm md:text-base whitespace-nowrap ${
                  brand.weight === "thin"
                    ? "font-light"
                    : brand.weight === "medium"
                      ? "font-medium"
                      : "font-bold"
                }`}
                style={brand.name === "Calvin Klein" ? { textTransform: "none" } : undefined}
              >
                {brand.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
