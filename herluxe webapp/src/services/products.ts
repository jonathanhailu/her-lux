import { api } from "@/api/client";
import { PRODUCTS, type Product } from "@/data/mockProducts";

const USE_MOCK = true; // flip to false when backend is live

export async function fetchProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400));
    return PRODUCTS;
  }
  const { data } = await api.get<Product[]>("/api/products/");
  return data;
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 250));
    return PRODUCTS.find((p) => p.id === id);
  }
  const { data } = await api.get<Product>(`/api/products/${id}/`);
  return data;
}

export async function fetchCategories() {
  if (USE_MOCK) return [];
  const { data } = await api.get("/api/categories/");
  return data;
}