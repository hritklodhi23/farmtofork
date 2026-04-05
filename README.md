# 🌾 AgriConnect — Farm to Fork

A full-stack web application that connects local farmers directly with consumers, supports organic-waste reward points, and sends WhatsApp notifications.

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React 18 + Vite + TypeScript          |
| Backend  | Node.js + Express + TypeScript        |
| Database | MongoDB + Mongoose                    |
| Comms    | WhatsApp (Twilio / Meta Cloud API)    |

---

## Project Structure

```
farmtofork/
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── config/   # DB connection (Mongoose)
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   └── package.json
├── frontend/         # Vite + React + TypeScript SPA
│   ├── src/
│   ├── .env.example
│   └── package.json
├── .gitignore
└── package.json      # Root — runs both with `npm run dev`
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/hritklodhi23/farmtofork.git
cd farmtofork
```

### 2. Install all dependencies

```bash
# Root dev tools (concurrently)
npm install

# Backend
npm install --prefix backend

# Frontend
npm install --prefix frontend
```

### 3. Configure environment variables

**Backend**

```bash
cp backend/.env.example backend/.env
# Then open backend/.env and set MONGO_URI to your MongoDB connection string
```

**Frontend**

```bash
cp frontend/.env.example frontend/.env
# VITE_API_URL defaults to http://localhost:5000 — no change needed for local dev
```

### 4. Start both servers

```bash
npm run dev
```

This starts:
- **Backend** at `http://localhost:5000`  (ts-node-dev with hot reload)
- **Frontend** at `http://localhost:5173` (Vite HMR)

Or run them individually:

```bash
npm run dev:backend   # backend only
npm run dev:frontend  # frontend only
```

### 5. Verify

- Open `http://localhost:5173` — you should see the AgriConnect home page with "API Status: AgriConnect API is running"
- Visit `http://localhost:5000/api/health` — should return `{"status":"ok","message":"AgriConnect API is running"}`

---

## Available Scripts (root)

| Command               | Description                        |
|-----------------------|------------------------------------|
| `npm run dev`         | Start backend + frontend together  |
| `npm run dev:backend` | Start backend only                 |
| `npm run dev:frontend`| Start frontend only                |
| `npm run build`       | Production build (both)            |

---

## Roadmap

- [x] Step 0 — Project scaffold (this PR)
- [ ] Step 1 — Data models: Farmer, Product, Consumer
- [ ] Step 2 — CRUD API routes + Zod validation
- [ ] Step 3 — Frontend pages: Marketplace, Add Product
- [ ] Step 4 — Auth (JWT)
- [ ] Step 5 — Organic waste points system
- [ ] Step 6 — WhatsApp notifications (Twilio)
- [ ] Step 7 — Deployment (Render + MongoDB Atlas)

---

## License

MIT
