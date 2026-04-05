# 🌾 AgriConnect — Farm to Fork

A full-stack hackathon project connecting farmers directly with consumers.

**Stack:** Express + TypeScript (backend) · Vite + React + TypeScript (frontend)

---

## Project Structure

```
farmtofork/
├── backend/          Express API (port 5000)
│   ├── src/
│   │   ├── index.ts          Entry point
│   │   └── routes/
│   │       └── products.ts   Products CRUD
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/         Vite + React app (port 5173)
│   ├── src/
│   │   ├── main.tsx
│   │   └── App.tsx           Products UI (connected to backend)
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── package.json      Root — runs both with `concurrently`
└── README.md
```

---

## Quick Start (Windows PowerShell / VS Code Terminal)

> **Important:** Each `cd` command below assumes you start from the **repo root** (`farmtofork`).  
> If your terminal is already inside a sub-folder, navigate back first:
> ```powershell
> cd C:\Users\<your-name>\farmtofork
> ```

### 1 — Install dependencies

Open **three terminals** in VS Code (or run these one after another):

```powershell
# Terminal 1 — root (for concurrently)
npm install

# Terminal 2 — backend
cd backend
npm install

# Terminal 3 — frontend
cd frontend
npm install
```

> If you accidentally run `cd frontend` twice you will see:
> `Cannot find path '...\frontend\frontend'`  
> Just navigate back to the repo root first:  
> `cd C:\Users\<your-name>\farmtofork`

### 2 — Set up environment files

```powershell
# Backend
cd backend
copy .env.example .env

# Frontend — open a new terminal at repo root first
cd frontend
copy .env.example .env
```

You can leave the default values as-is for local development.

### 3 — Run both servers

**Option A — one command (from repo root)**

```powershell
cd C:\Users\<your-name>\farmtofork
npm run dev
```

**Option B — two separate terminals**

Terminal A (backend):
```powershell
cd backend
npm run dev
```

Terminal B (frontend):
```powershell
cd frontend
npm run dev
```

### 4 — Open in browser

| URL | What you see |
|-----|-------------|
| `http://localhost:5000/health` | `{ "status": "ok" }` |
| `http://localhost:5000/api/products` | Products JSON array |
| `http://localhost:5173` | React app (add & view products) |

---

## API Reference

### Health check
```
GET /health
```

### Products
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products |
| POST | `/api/products` | Add a product |

**POST body example:**
```json
{ "name": "Tomato", "category": "Vegetables", "price": 50 }
```

**Test with PowerShell:**
```powershell
Invoke-RestMethod -Method Post `
  -Uri http://localhost:5000/api/products `
  -ContentType "application/json" `
  -Body '{"name":"Tomato","category":"Vegetables","price":50}'
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `npm error ENOENT … package.json` | You are in the wrong folder. Run `cd C:\Users\<your-name>\farmtofork\frontend` (or `backend`) from the **repo root**. |
| `Cannot find path '…\frontend\frontend'` | You ran `cd frontend` twice. Navigate back to repo root first. |
| CORS error in browser | Ensure `FRONTEND_URL=http://localhost:5173` is set in `backend/.env` and restart the backend. |
| TypeScript `TS5011 rootDir` error | Ensure `backend/tsconfig.json` has `"rootDir": "./src"` and `"outDir": "./dist"`. |
