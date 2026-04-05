import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

interface Product {
  id?: string
  _id?: string
  name: string
  price: number
  description: string
  category: string
  imageUrl?: string
  createdAt?: string
}

function ProductCard({ product }: { product: Product }) {
  const id = product._id ?? product.id
  return (
    <div className="product-card">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="product-img" />
      )}
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <p className="product-id">ID: {id}</p>
      </div>
    </div>
  )
}

function AddProductForm({ onAdded }: { onAdded: (p: Product) => void }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.price || !form.description || !form.category) {
      setError('All fields except Image URL are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Failed to add product')
      }
      const newProduct = await res.json() as Product
      onAdded(newProduct)
      setForm({ name: '', price: '', description: '', category: '', imageUrl: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      {error && <p className="error">{error}</p>}
      <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="category" placeholder="Category (e.g. Vegetables)" value={form.category} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={handleChange} />
      <button type="submit" disabled={loading}>{loading ? 'Adding…' : 'Add Product'}</button>
    </form>
  )
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  async function loadProducts() {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch(`${API_BASE}/api/products`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as Product[]
      setProducts(data)
    } catch (err) {
      setFetchError(
        `Could not reach backend at ${API_BASE}. Is it running? (${err instanceof Error ? err.message : err})`
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  function handleProductAdded(p: Product) {
    setProducts((prev) => [p, ...prev])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌾 FarmToFork</h1>
        <p>Fresh from farm to your table</p>
      </header>

      <main className="app-main">
        <AddProductForm onAdded={handleProductAdded} />

        <section className="products-section">
          <h2>Products</h2>
          {loading && <p className="status">Loading products…</p>}
          {fetchError && <p className="error">{fetchError}</p>}
          {!loading && !fetchError && products.length === 0 && (
            <p className="status">No products yet. Add one above!</p>
          )}
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p._id ?? p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
