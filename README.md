# 🌸 ShaktiNet — Women's Day Hackathon 2026

A full-stack platform celebrating and empowering women — built with **FastAPI** (Python) + **React + Vite** (JS).

---

## 📁 Project Structure

```
Women's Day/
├── backend/          # FastAPI backend (Python 3.11)
│   ├── features/     # Auth, Jobs, Safety, Admin, Achievers, Business, Mentorship, Health, Resources
│   ├── core/         # JWT auth, bcrypt security
│   ├── db/           # In-memory store + seed JSON data
│   ├── config/       # Settings (secret key, CORS origins)
│   ├── main.py       # FastAPI app entry point
│   └── requirements.txt
├── frontend/         # React 19 + Vite 7
│   ├── src/
│   │   ├── pages/    # Home, Achievers, Entrepreneurs, Sos, KnowYourRights, Login, Register
│   │   ├── components/  # Navbar, ThreeBackground (3D petals)
│   │   └── services/ # api.js (all backend calls)
│   └── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Python 3.11+** — [python.org/downloads](https://www.python.org/downloads/)
- 
- **Git**

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Women's Day"
```

---

### 2. Backend setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

Backend will be live at: **http://localhost:8000**  
Swagger API docs: **http://localhost:8000/docs**

---

### 3. Frontend setup (React + Vite)

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend will be live at: **http://localhost:5173**

---

## 🔑 Default Login Credentials

| Role     | Email                    | Password    |
|----------|--------------------------|-------------|
| Admin    | admin@shaktinet.in       | admin123    |
| Employer | priya@techcorp.in        | shakti123   |
| User     | ananya@gmail.com         | shakti123   |
| User     | kavitha@ngo.org          | shakti123   |

---



## 🏗️ Implementation — Detailed Breakdown

### Backend Architecture

The backend follows a **feature-slice** architecture. Every feature lives in its own folder under `features/` and contains exactly three files:

```
features/<feature>/
├── schemas.py   # Pydantic input/output models
├── service.py   # Pure business logic (no FastAPI imports)
└── router.py    # FastAPI APIRouter — wires HTTP to service
```



### Frontend Architecture

The frontend is a **single-page app** without a router library — navigation is handled by a `page` state string in `App.jsx`, keeping the bundle lean.

```
src/
├── pages/           # One component per "screen"
├── components/      # Shared UI (Navbar, ThreeBackground)
├── services/
│   └── api.js       # Central fetch wrapper — all API calls live here
├── styles/          # Global CSS variables & resets
└── App.jsx          # Auth gate + page switcher
```





---

## 📝 Notes

- The backend uses an **in-memory store** — data resets on server restart. Swap `store.py` with SQLAlchemy models to persist.
- Seed data is in `backend/db/seed_data.json` — edit it to change initial content.
- CORS is configured for `localhost:5173` and `localhost:3000`.
- Built for the **Women's Day Hackathon 2026** 🌸
