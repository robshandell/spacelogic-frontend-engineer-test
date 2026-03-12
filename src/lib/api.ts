import type { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; ShopCo/1.0)",
};

async function fetchWithRetry<T>(url: string): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: DEFAULT_HEADERS,
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt === 0) await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw lastError ?? new Error("Failed to fetch");
}

export async function fetchProductList(): Promise<Product[]> {
  try {
    return await fetchWithRetry<Product[]>(`${BASE_URL}/products`);
  } catch {
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  try {
    return await fetchWithRetry<Product>(`${BASE_URL}/products/${id}`);
  } catch {
    throw new Error("Failed to fetch product");
  }
}
