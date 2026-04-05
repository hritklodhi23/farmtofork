# 🌾 AgriConnect – FarmToFork

A beginner-friendly full-stack app built with **Express + TypeScript** (backend) and **Vite + React + TypeScript** (frontend).

---

## Project Structure

```
farmtofork/
├── backend/        Express + TypeScript API
│   ├── src/
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/       Vite + React + TypeScript UI
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .env.example    (root – optional)
├── .gitignore
└── package.json    (root convenience scripts)
```

---

## Prerequisites

- [Node.js 18+](https://nodejs.org/) (includes `npm`)
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

---

## Getting Started (VS Code, step-by-step)

### 1 – Clone the repo

Open **View → Terminal** in VS Code and run:

```bash
git clone https://github.com/hritklodhi23/farmtofork.git
cd farmtofork
code .
```

---

### 2 – Set up the Backend

```bash
cd backend
npm install
```

#### Configure environment variables

```bash
cp .env.example .env
```

Open `backend/.env` and check (or edit) the value:

```env
PORT=3000
```

#### Run the backend dev server

```bash
npm run dev
```

You should see:

```
API listening on http://localhost:3000
```

#### Verify the health endpoint

Open your browser (or [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)) and visit:

```
http://localhost:3000/health
```

Expected response:

```json
{ "ok": true, "message": "Backend is running" }
```

---

### 3 – Set up the Frontend

Open a **second terminal** in VS Code (**`+`** button in the Terminal panel), then:

```bash
cd frontend
npm install
```

#### Configure environment variables

```bash
cp .env.example .env
```

Open `frontend/.env` and check:

```env
VITE_API_URL=http://localhost:3000
```

#### Run the frontend dev server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

### 4 – Run both servers at once (optional)

From the **repo root** (`farmtofork/`):

```bash
npm install          # installs concurrently
npm run dev          # starts backend + frontend together
```

---

## Available Scripts

| Location   | Command         | What it does                                |
|------------|-----------------|---------------------------------------------|
| `backend/` | `npm run dev`   | Start backend with hot-reload (ts-node-dev) |
| `backend/` | `npm run build` | Compile TypeScript → `dist/`                |
| `frontend/`| `npm run dev`   | Start Vite dev server                       |
| `frontend/`| `npm run build` | Production build → `dist/`                  |
| root       | `npm run dev`   | Start both servers concurrently             |

---

## Environment Variables

### `backend/.env`

| Variable | Default | Description          |
|----------|---------|----------------------|
| `PORT`   | `3000`  | Port for the API server |

### `frontend/.env`

| Variable        | Default                   | Description            |
|-----------------|---------------------------|------------------------|
| `VITE_API_URL`  | `http://localhost:3000`   | Base URL of the API    |

> **Never commit `.env` files.** They are listed in `.gitignore`.
> Copy `.env.example` → `.env` and fill in real values locally.

---

## Coming Next

- MongoDB integration (database)
- Twilio / SMS notifications
- Authentication
