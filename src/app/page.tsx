import { Suspense } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrowseByStyle } from "@/components/BrowseByStyle";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { ProductListSection } from "@/components/ProductListSection";

function ProductListFallback() {
  return (
    <div className="mt-1 md:mt-3">
      <section className="pt-2 md:pt-4 pb-28 md:pb-40" aria-hidden>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 md:h-14 max-w-xs mx-auto bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="flex gap-6 overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(100%-1rem)] xs:w-[calc(50%-0.75rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="-mt-16 md:-mt-24 pb-8" aria-hidden>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 md:h-14 max-w-xs mx-auto bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="flex gap-6 overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(100%-1rem)] xs:w-[calc(50%-0.75rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 w-full min-h-0">
        <Hero />
        <Suspense fallback={<ProductListFallback />}>
          <ProductListSection />
        </Suspense>
        <BrowseByStyle />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
