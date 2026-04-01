import { ProductCarousel } from "./ProductCarousel";
import { ErrorMessage } from "./ErrorMessage";
import { fetchProductList } from "@/lib/api";

export async function ProductListSection() {
  let products;
  try {
    products = await fetchProductList(20);
  } catch (e) {
    return (
      <ErrorMessage
        message={e instanceof Error ? e.message : "Failed to load products"}
      />
    );
  }

  const newArrivals = products.slice(0, 12);
  const topSelling = products.slice(12, 20);

  return (
    <>
      <section
        id="new-arrivals"
        aria-labelledby="new-arrivals-heading"
        className="mt-1 md:mt-3"
      >
        <ProductCarousel
          products={newArrivals}
          title="New Arrivals"
          headingId="new-arrivals-heading"
          showDiscount
          viewAllHref="/#new-arrivals"
          imagePriorityCount={4}
        />
      </section>
      <section
        id="on-sale"
        aria-labelledby="top-selling-heading"
        className="-mt-16 md:-mt-24"
      >
        <ProductCarousel
          products={topSelling.length > 0 ? topSelling : products.slice(0, 8)}
          title="Top Selling"
          headingId="top-selling-heading"
          showDiscount
          viewAllHref="/#on-sale"
        />
      </section>
    </>
  );
}
