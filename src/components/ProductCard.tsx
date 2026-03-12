import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

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

export function ProductCard({ product, showDiscount }: ProductCardProps) {
  const hasDiscount = showDiscount && product.price > 50;
  const discountPrice = hasDiscount ? product.price * 0.8 : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      aria-label={`View product: ${product.title}`}
    >
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.title} – $${product.price.toFixed(2)}`}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -20%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-black text-sm md:text-base line-clamp-2 group-hover:underline decoration-2 underline-offset-2 transition-all duration-200">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <StarRating rate={product.rating.rate} />
          <span className="text-gray-500 text-xs ml-1">{product.rating.rate.toFixed(1)}/5</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-black">${product.price.toFixed(2)}</span>
          {discountPrice != null && (
            <>
              <span className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</span>
              <span className="text-red-600 text-sm font-medium">${discountPrice.toFixed(2)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
