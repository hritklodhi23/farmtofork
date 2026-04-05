# FarmToFork 🌾

A beginner-friendly full-stack app: **React + TypeScript** frontend, **Express + TypeScript** backend, **MongoDB** (with in-memory fallback).

---

## What's inside

```
farmtofork/
├── backend/          Express + TypeScript API
│   ├── src/
│   │   ├── index.ts          Entry point, CORS, DB connection
│   │   ├── models/Product.ts Mongoose model
│   │   └── routes/products.ts GET /api/products, POST /api/products
│   ├── .env.example
│   └── tsconfig.json
├── frontend/         Vite + React + TypeScript UI
│   ├── src/
│   │   ├── App.tsx   Product list + add-product form
│   │   └── App.css
│   └── .env.example
└── package.json      Root: concurrently runs both servers
```

---

## Step 1 — Clone & install dependencies

```bash
git clone https://github.com/hritklodhi23/farmtofork.git
cd farmtofork

# Install all dependencies (backend + frontend)
npm run install:all

# Also install the root concurrently package
npm install
```

---

## Step 2 — Configure environment files

### Backend — create `backend/.env`
In VS Code: right-click the `backend` folder → **New File** → type `.env`

```env
PORT=5000
# Optional: add your MongoDB connection string
# MONGO_URI=mongodb://localhost:27017/farmtofork
```

> **No MongoDB?** Leave `MONGO_URI` out. The backend uses **in-memory storage** automatically.

### Frontend — create `frontend/.env` *(optional)*
```env
VITE_API_URL=http://localhost:5000
```

If you skip this file the frontend defaults to `http://localhost:5000`.

---

## Step 3 — Run both servers

### Option A — single command (recommended)
```bash
npm run dev
```
This starts both servers at once using `concurrently`.

### Option B — two separate terminals
**Terminal 1 (backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (frontend):**
```bash
cd frontend
npm run dev
```

Open these URLs:
- Backend health: <http://localhost:5000/health>
- Products API:   <http://localhost:5000/api/products>
- Frontend UI:    <http://localhost:5173>

---

## Step 4 — Try the API

### Get all products
```bash
curl http://localhost:5000/api/products
```

### Add a product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Spinach","price":30,"description":"Fresh organic spinach","category":"Vegetables"}'
```

### From the browser UI
Open <http://localhost:5173>, fill in the **Add Product** form, and click **Add Product**. The list updates instantly.

---

## Step 5 — Connect MongoDB (optional upgrade)

1. Install [MongoDB Community](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier).
2. Add the connection string to `backend/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/farmtofork
   ```
3. Restart the backend. The server will print `✅ Connected to MongoDB`.

---

## Next milestone ideas

- [ ] Add a `farmers` collection and link products to farmers
- [ ] Add user authentication (JWT)
- [ ] Add product image upload (Multer / Cloudinary)
- [ ] Deploy backend to Render / Railway, frontend to Vercel

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `TS5011 rootDir` error | Make sure `backend/tsconfig.json` has `"rootDir": "./src"` |
| `Cannot find module` | Run `npm install` inside `backend/` and `frontend/` |
| CORS error in browser | Check backend is running on port 5000 and `VITE_API_URL` matches |
| Port already in use | Change `PORT` in `backend/.env` and `VITE_API_URL` in `frontend/.env` |

