# FarmToFork 🌾

A hackathon project connecting farmers directly to consumers.

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Backend  | Node.js · Express · TypeScript |
| Frontend | React · Vite · TypeScript      |

---

## Getting Started

### 1. Prerequisites

- [Node.js 18+](https://nodejs.org/)
- npm 9+

### 2. Install dependencies

```bash
# From the repo root — installs both backend and frontend deps
npm run install:all

# Or install individually:
cd backend && npm install
cd frontend && npm install
```

### 3. Configure the frontend environment (optional)

```bash
cp frontend/.env.example frontend/.env
# Edit frontend/.env if your backend runs on a different port
```

### 4. Run both services together

```bash
# From repo root (starts backend on :3000 and frontend on :5173)
npm run dev
```

Or run them separately in two terminals:

**Terminal A — Backend**

```bash
cd backend
npm run dev
```

**Terminal B — Frontend**

```bash
cd frontend
npm run dev
```

### 5. Open in your browser

| Service  | URL                                     |
| -------- | --------------------------------------- |
| Backend  | <http://localhost:3000/health>          |
| Products | <http://localhost:3000/api/products>    |
| Frontend | <http://localhost:5173>                 |

---

## API Reference

### `GET /api/products`

Returns the list of all products (JSON array).

### `POST /api/products`

Create a new product.

**Request body (JSON):**

```json
{
  "name": "Tomato",
  "category": "Vegetables",
  "price": 50
}
```

**Response:** `201 Created` with the new product object.

---

## Project Structure

```
farmtofork/
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   └── products.ts   # Products router
│   ├── package.json
│   └── tsconfig.json
├── frontend/         # React + Vite + TypeScript UI
│   ├── src/
│   │   ├── api.ts        # API client (fetch wrapper)
│   │   ├── App.tsx       # Main UI: product list + add form
│   │   └── main.tsx      # React entry point
│   ├── .env.example      # Copy to .env to configure API URL
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── package.json      # Root — runs both services with concurrently
```
