# FarmToFork 🌾

A full-stack farm-to-fork marketplace connecting farmers directly with consumers. Built with **React (Vite)** on the frontend, **Express/Node.js** on the backend, and **MongoDB** as the database.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Opening in VS Code](#opening-in-vs-code)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Environment Variables](#environment-variables)
- [VS Code Workspace Recommendations](#vs-code-workspace-recommendations)

---

## Project Structure

```
farmtofork/
├── frontend/          # React + Vite app
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express + Node.js API
│   ├── src/
│   └── package.json
├── farmtofork.code-workspace   # VS Code multi-root workspace
└── README.md
```

---

## Prerequisites

Make sure you have the following installed before you start:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18 LTS or later | https://nodejs.org |
| npm | comes with Node.js | – |
| MongoDB | 7.x (local) **or** use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud) | https://www.mongodb.com/try/download/community |
| Git | any recent version | https://git-scm.com |
| VS Code | any recent version | https://code.visualstudio.com |

---

## Opening in VS Code

### Option A – Workspace file (recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/hritklodhi23/farmtofork.git
   cd farmtofork
   ```
2. Open the multi-root workspace in VS Code:
   ```bash
   code farmtofork.code-workspace
   ```
   VS Code will open both the `frontend` and `backend` folders as separate roots and prompt you to install the recommended extensions.

### Option B – Open the folder directly

```bash
code .
```

---

## Running the Backend

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create your local environment file (see Environment Variables below)
cp .env.example .env

# 4. Start the development server (auto-restarts on file changes)
npm run dev
```

The API will be available at **http://localhost:5000**.

---

## Running the Frontend

Open a **new terminal** (keep the backend running):

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

> **Tip:** In VS Code, open the integrated terminal (`Ctrl+`` ` ``), then split it (`Ctrl+Shift+5`) so you can run frontend and backend side-by-side.

---

## Environment Variables

Create a `.env` file inside the `backend/` folder (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/farmtofork
# For MongoDB Atlas replace the URI above with your Atlas connection string

# WhatsApp (Twilio / other provider)
WHATSAPP_ACCOUNT_SID=your_account_sid
WHATSAPP_AUTH_TOKEN=your_auth_token
WHATSAPP_FROM=whatsapp:+14155238886
```

> **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## VS Code Workspace Recommendations

The `farmtofork.code-workspace` file (at the root of this repo) configures:

- **Multi-root workspaces** – frontend and backend are shown as separate roots in the Explorer.
- **Recommended extensions** – VS Code will prompt you to install these when you open the workspace:
  - `dbaeumer.vscode-eslint` – ESLint integration
  - `esbenp.prettier-vscode` – Prettier formatter
  - `PKief.material-icon-theme` – cleaner file icons
  - `mongodb.mongodb-vscode` – browse your MongoDB collections inside VS Code
  - `humao.rest-client` – test API endpoints from `.http` files without leaving VS Code
  - `bradlc.vscode-tailwindcss` – Tailwind CSS IntelliSense (if you add Tailwind later)
- **Editor settings** – format on save, 2-space indentation, ESLint auto-fix on save.

To install all recommended extensions at once, open the Command Palette (`Ctrl+Shift+P`) and run:
```
Extensions: Show Recommended Extensions
```
Then click **Install Workspace Recommendations**.

