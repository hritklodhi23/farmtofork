import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState<number>(50);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setError(null);
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error("Failed to load products");
    const data = (await res.json()) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    loadProducts().catch((e: unknown) =>
      setError(e instanceof Error ? e.message : "Unknown error")
    );
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, price }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to add product");
      }
      setName("");
      await loadProducts();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "system-ui", padding: "0 16px" }}>
      <h1>🌾 AgriConnect — Farm to Fork</h1>

      <form onSubmit={addProduct} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
          style={{ padding: "6px 10px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "6px 10px" }}
        >
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Dairy</option>
          <option>Other</option>
        </select>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          step="0.01"
          required
          style={{ padding: "6px 10px", width: 80 }}
        />
        <button type="submit" disabled={loading} style={{ padding: "6px 16px" }}>
          {loading ? "Adding…" : "Add product"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>⚠ {error}</p>}

      <h2 style={{ marginTop: 24 }}>Products</h2>
      {products.length === 0 ? (
        <p>No products yet — add one above.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.category} — ₹{p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
