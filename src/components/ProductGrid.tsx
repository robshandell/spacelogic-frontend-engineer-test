import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  title: string;
  headingId?: string;
  showDiscount?: boolean;
  viewAllHref?: string;
}

export function ProductGrid({ products, title, headingId, showDiscount, viewAllHref }: ProductGridProps) {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 id={headingId} className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight">
            {title}
          </h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm font-semibold text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors w-fit"
            >
              View All
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount={showDiscount} />
          ))}
        </div>
      </div>
    </section>
  );
}
