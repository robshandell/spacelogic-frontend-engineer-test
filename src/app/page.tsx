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
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
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
