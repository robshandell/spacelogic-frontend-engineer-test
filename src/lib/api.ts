import { cache } from "react";
import type { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";
const FALLBACK_PRODUCTS_COUNT = 20;
const REQUEST_TIMEOUT_MS = 4000;
/** Home carousels only need a bounded list; fail over to local data sooner if the API stalls. */
const HOME_PRODUCT_LIST_TIMEOUT_MS = 2800;
const RETRY_DELAY_MS = 300;

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; ShopCo/1.0)",
};

const FALLBACK_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&crop=center&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&crop=center&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&crop=center&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&crop=center&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&crop=center&w=1200&h=1200&q=80",
];

const FALLBACK_TEMPLATES: Pick<Product, "title" | "description" | "category">[] = [
  {
    title: "Relaxed Fit Cotton Tee",
    description: "Soft everyday essential with breathable cotton comfort.",
    category: "men's clothing",
  },
  {
    title: "Oversized Streetwear Hoodie",
    description: "Warm layered hoodie with a modern oversized silhouette.",
    category: "men's clothing",
  },
  {
    title: "Minimal Linen Blend Shirt",
    description: "Clean cut shirt with a light linen blend for all-day wear.",
    category: "women's clothing",
  },
  {
    title: "High-Waist Everyday Trousers",
    description: "Tailored look with stretch comfort for daily movement.",
    category: "women's clothing",
  },
  {
    title: "Classic Leather Crossbody Bag",
    description: "Compact silhouette with practical compartments and style.",
    category: "women's clothing",
  },
  {
    title: "Chronograph Sport Watch",
    description: "Sharp design with durable materials and timekeeping precision.",
    category: "men's clothing",
  },
  {
    title: "Layered Silver Chain Set",
    description: "Versatile jewelry set to elevate casual and formal outfits.",
    category: "jewelery",
  },
  {
    title: "Lightweight Puffer Jacket",
    description: "Insulated warmth without the bulk for cooler days.",
    category: "men's clothing",
  },
];

function getFallbackProducts(): Product[] {
  return Array.from({ length: FALLBACK_PRODUCTS_COUNT }, (_, i) => {
    const template = FALLBACK_TEMPLATES[i % FALLBACK_TEMPLATES.length];
    const basePrice = 24 + (i % 6) * 11;
    const rate = 3.8 + (i % 4) * 0.3;
    return {
      id: i + 1,
      title: `${template.title} ${i + 1}`,
      price: Number((basePrice + i * 0.75).toFixed(2)),
      description: template.description,
      category: template.category,
      image: FALLBACK_IMAGE_POOL[i % FALLBACK_IMAGE_POOL.length],
      rating: {
        rate: Number(Math.min(rate, 5).toFixed(1)),
        count: 80 + i * 13,
      },
    };
  });
}

async function fetchWithRetry<T>(
  url: string,
  options: { attempts?: number; timeoutMs?: number } = {}
): Promise<T> {
  const attempts = options.attempts ?? 2;
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS;
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: DEFAULT_HEADERS,
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt < attempts - 1) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
  throw lastError ?? new Error("Failed to fetch");
}

/** @param limit When set (e.g. 20 for home carousels), requests fewer rows for a smaller, faster response. */
export const fetchProductList = cache(async (limit?: number): Promise<Product[]> => {
  const qs = limit != null ? `?limit=${limit}` : "";
  const timeoutMs = limit != null ? HOME_PRODUCT_LIST_TIMEOUT_MS : REQUEST_TIMEOUT_MS;
  try {
    // Fail fast for homepage carousels so fallback appears quickly if API is down.
    return await fetchWithRetry<Product[]>(`${BASE_URL}/products${qs}`, {
      attempts: 1,
      timeoutMs,
    });
  } catch {
    return getFallbackProducts();
  }
});

export async function fetchProduct(id: string): Promise<Product> {
  try {
    // Product detail should open quickly; fall back fast when upstream API is unstable.
    return await fetchWithRetry<Product>(`${BASE_URL}/products/${id}`, { attempts: 1, timeoutMs: 3000 });
  } catch {
    const fallbackProduct = getFallbackProducts().find((item) => item.id === Number(id));
    if (fallbackProduct) return fallbackProduct;
    throw new Error("Failed to fetch product");
  }
}
