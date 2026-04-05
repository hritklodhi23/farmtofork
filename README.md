# FarmToFork

A farm-to-fork marketplace MVP connecting farmers and consumers.

## Project structure

```
farmtofork/
├── backend/   Express + TypeScript API (port 3000)
└── frontend/  Vite + React + TypeScript (port 5173)
```

## Getting started

### 1. Install dependencies

```bash
npm run install:all
```

Or install individually:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure the frontend environment

Copy the example env file and edit if needed:

```bash
cp frontend/.env.example frontend/.env
```

`frontend/.env`:

```env
VITE_API_BASE=http://localhost:3000
```

> **Note:** Vite automatically tries port 5173 but will use the next available port
> (e.g. 5174) if 5173 is already in use. The backend CORS config already allows
> **both** `http://localhost:5173` and `http://localhost:5174`. If you use a
> different port, add it to the `origin` array in `backend/src/index.ts` and
> restart the backend.

### 3. Run both servers

From the repo root:

```bash
npm run dev
```

Or start them separately:

```bash
# Terminal 1
cd backend && npm run dev   # http://localhost:3000

# Terminal 2
cd frontend && npm run dev  # http://localhost:5173 (or 5174)
```

### 4. Verify

- Backend health: `http://localhost:3000/health`
- Products API: `http://localhost:3000/api/products`
- Frontend: `http://localhost:5173` (or the port shown in the Vite output)

## API

| Method | Path              | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /health           | Health check        |
| GET    | /api/products     | List all products   |
| POST   | /api/products     | Create a product    |

### POST /api/products

```json
{
  "name": "Tomato",
  "category": "Vegetables",
  "price": 50
}
```
