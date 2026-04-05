import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => res.json())
      .then((data: { status: string; message: string }) =>
        setApiStatus(data.message)
      )
      .catch(() => setApiStatus('Backend offline — start the server'))
  }, [])

  return (
    <div className="container">
      <header>
        <h1>🌾 AgriConnect</h1>
        <p className="tagline">Farm to Fork — fresh, local, sustainable</p>
      </header>

      <main>
        <section className="card">
          <h2>Welcome</h2>
          <p>
            AgriConnect connects local farmers directly with consumers, making
            fresh produce more accessible while supporting sustainable
            agriculture.
          </p>
        </section>

        <section className="card status">
          <h2>API Status</h2>
          <p>{apiStatus}</p>
        </section>

        <section className="card">
          <h2>Coming Soon</h2>
          <ul>
            <li>🧑‍🌾 Farmer marketplace</li>
            <li>🛒 Consumer cart &amp; orders</li>
            <li>♻️ Organic waste points system</li>
            <li>📱 WhatsApp notifications</li>
            <li>🔐 Authentication (JWT)</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>Step 0 scaffold — edit <code>src/App.tsx</code> to start building</p>
      </footer>
    </div>
  )
}

export default App

