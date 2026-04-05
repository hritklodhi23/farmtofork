import { useState, useEffect } from "react";
import { getProducts, createProduct, type Product } from "./api";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: unknown) => {
        console.error("Failed to load products:", err);
        setError("Could not connect to backend. Is it running on localhost:3000?");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !category || !price) return;
    setSubmitting(true);
    try {
      const created = await createProduct({
        name,
        category,
        price: parseFloat(price),
      });
      setProducts((prev) => [...prev, created]);
      setName("");
      setCategory("");
      setPrice("");
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>🌾 FarmToFork — Products</h1>

      <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <input
            placeholder="Name (e.g. Tomato)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            placeholder="Category (e.g. Vegetables)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            placeholder="Price (e.g. 50)"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" disabled={submitting} style={buttonStyle}>
            {submitting ? "Adding…" : "Add Product"}
          </button>
        </form>
      </section>

      <section>
        <h2>Product List</h2>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p style={{ color: "#888" }}>No products yet. Add one above!</p>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((p) => (
            <li key={p.id} style={cardStyle}>
              <strong>{p.name}</strong>{" "}
              <span style={{ color: "#666" }}>({p.category})</span>
              <br />
              <span>₹{p.price}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: 4,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  background: "#2d8a4e",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const cardStyle: React.CSSProperties = {
  padding: "0.75rem",
  marginBottom: "0.5rem",
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  background: "#f9f9f9",
};
