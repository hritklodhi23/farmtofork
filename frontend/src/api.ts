const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
}

export interface NewProduct {
  name: string;
  category: string;
  price: number;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<Product[]>;
}

export async function createProduct(data: NewProduct): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json() as Promise<Product>;
}
