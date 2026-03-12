import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProduct, fetchProductList } from "@/lib/api";

export const dynamic = "force-dynamic";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailTabs } from "@/components/ProductDetailTabs";

function StarRating({ rate }: { rate: number }) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rate} out of 5`}>
      {Array.from({ length: full }, (_, i) => (
        <span key={`f-${i}`} className="text-amber-400">★</span>
      ))}
      {half ? <span className="text-amber-400">★</span> : null}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e-${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
}

const COLOR_SWATCHES = [
  { name: "Olive", value: "#6B7B3C", selected: true },
  { name: "Teal", value: "#2D5A5A", selected: false },
  { name: "Navy", value: "#1E2A4A", selected: false },
];

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;
  if (!id) notFound();
  let product;
  try {
    product = await fetchProduct(id);
  } catch {
    notFound();
  }

  const allProducts = await fetchProductList();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);
  const hasDiscount = product.price > 50;
  const discountPrice = hasDiscount ? product.price * 0.8 : null;
  const discountPercent = hasDiscount ? 20 : 0;

  const categoryLabel =
    product.category === "men's clothing"
      ? "Men"
      : product.category === "women's clothing"
        ? "Women"
        : product.category.replace(/\s+/g, " ").replace("'", "");
  const subCategory = product.category.includes("clothing") ? "T-shirts" : product.category;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <nav className="text-xs sm:text-sm mb-6 md:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/" className="text-gray-500 hover:text-black">Shop</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-500 capitalize">{categoryLabel}</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-black">{subCategory}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="hidden lg:flex flex-col gap-2 flex-shrink-0">
                {[product.image, product.image, product.image].slice(0, 3).map((img, i) => (
                  <div key={i} className="w-20 h-20 relative rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image src={img} alt="" fill className="object-contain p-1" sizes="80px" />
                  </div>
                ))}
              </div>
              <div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 md:p-6"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex lg:hidden gap-2">
                {[product.image, product.image, product.image].slice(0, 3).map((img, i) => (
                  <div key={i} className="w-full max-w-[100px] aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200 flex-1 min-w-0">
                    <Image src={img} alt="" fill className="object-contain p-1" sizes="100px" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight">
                {product.title}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <StarRating rate={product.rating.rate} />
                <span className="text-gray-600 text-sm">
                  {product.rating.rate.toFixed(1)}/5
                </span>
                <span className="text-gray-400 text-sm">({product.rating.count})</span>
              </div>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold text-black">
                  ${discountPrice != null ? discountPrice.toFixed(2) : product.price.toFixed(2)}
                </span>
                {discountPrice != null && (
                  <>
                    <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">-{discountPercent}%</span>
                  </>
                )}
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-black mb-2">Select Colors</p>
                <div className="flex gap-2">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                        c.selected ? "border-black" : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                      aria-label={c.name}
                    >
                      {c.selected && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-black mb-2">Choose Size</p>
                <div className="flex flex-wrap gap-2">
                  {["Small", "Medium", "Large", "X-Large"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        size === "Large"
                          ? "bg-black text-white border-black"
                          : "bg-gray-50 border-gray-200 text-black hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-row items-center gap-3">
                <div className="flex items-center h-11 border border-gray-200 rounded-lg bg-gray-50 flex-shrink-0">
                  <button type="button" className="w-10 h-full flex items-center justify-center text-black hover:bg-gray-100 rounded-l-lg">−</button>
                  <span className="w-10 text-center font-medium text-sm text-black">1</span>
                  <button type="button" className="w-10 h-full flex items-center justify-center text-black hover:bg-gray-100 rounded-r-lg">+</button>
                </div>
                <button
                  type="button"
                  className="flex-1 min-w-0 h-11 bg-black text-white font-semibold px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-8 text-black font-medium hover:underline text-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to list
              </Link>
            </div>
          </div>

          <ProductDetailTabs
            reviewCount={product.rating.count}
            productDetails={{
              title: product.title,
              description: product.description,
              category: product.category,
              price: product.price,
              rating: product.rating,
            }}
          />

          <section className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight text-center mb-6 md:mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} showDiscount />
              ))}
            </div>
          </section>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
