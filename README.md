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
- **Node.js 18+** — [nodejs.org](https://nodejs.org/)
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

## 🌐 API Endpoints (key routes)

| Method | Route                  | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/auth/register`       | Register new user            |
| POST   | `/auth/login`          | Login (returns JWT token)    |
| GET    | `/auth/me`             | Get current user info        |
| GET    | `/achievers/`          | List approved achievers      |
| POST   | `/achievers/nominate`  | Nominate an achiever         |
| GET    | `/businesses/`         | List women-led businesses    |
| GET    | `/jobs/`               | List approved jobs           |
| POST   | `/jobs/`               | Post a job (employer)        |
| POST   | `/sos/trigger`         | Trigger SOS alert            |
| POST   | `/report`              | File an incident report      |
| GET    | `/resources/helplines` | National helpline numbers    |
| GET    | `/resources/rights`    | Women's legal rights         |
| GET    | `/admin/stats`         | Platform statistics (admin)  |

---

## 🧰 Tech Stack

| Layer      | Technology |
|------------|------------|
| Backend    | FastAPI 0.110 · Python 3.11 · Uvicorn |
| Auth       | PyJWT · bcrypt · OAuth2PasswordBearer |
| Validation | Pydantic v2 · email-validator |
| Frontend   | React 19 · Vite 7 · Three.js |
| Styling    | Pure CSS (scoped per page, no framework) |
| State      | React `useState` / `useEffect` (no Redux) |
| HTTP       | Fetch API (`services/api.js` wrapper) |

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

This separation means the service layer is fully testable without spinning up an HTTP server.

#### `db/` — In-Memory Store
- `seed_data.json` holds all initial data (4 users, 4 jobs, 4 businesses, 6 achievers, helplines, rights)
- `store.py` loads the JSON at startup into typed Python dicts/lists
- All features read/write the same in-memory objects — no ORM, no migrations, instant startup

#### `core/` — Security Layer
- `security.py`: `hash_password()` / `verify_password()` using **bcrypt**
- `auth.py`: `create_token()` (HS256 JWT), `get_current_user()` FastAPI dependency, `require_role(*roles)` factory that returns a dependency for role-based access control

#### Feature Modules

| Feature | Routes | Description |
|---------|--------|-------------|
| **authentication** | `/auth/register` `/auth/login` `/auth/me` | JWT-based register + login; OAuth2PasswordRequestForm (form-urlencoded) |
| **jobs** | `/jobs/` `/jobs/my` `/jobs/{id}` | Employers post jobs; users browse; admin approves |
| **safety** | `/sos/trigger` `/sos/{id}/resolve` `/report` `/report/my` | SOS alerts with contact list; incident report filing |
| **adminpanel** | `/admin/*` | Full CRUD on users, jobs, reports, nominations, businesses; platform stats |
| **achievers** | `/achievers/` `/achievers/nominate` | Browse approved women achievers; any user can nominate |
| **business** | `/businesses/` | Women-led business directory; searchable by category/city |
| **mentorship** | `/mentors/` `/mentors/register` `/mentors/request` | Mentor registry; send connection requests |
| **health** | `/health/checkin` `/health/history` | Daily wellness check-in with stress/mood tips |
| **resources** | `/resources/helplines` `/resources/rights` | Static national helpline numbers and legal rights reference |

---

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

#### Auth Flow
1. `App.jsx` renders `<Login />` or `<Register />` if `user === null`
2. On success, the API returns `{ access_token, name, role }`
3. Token is stored in `localStorage` under key `shakti_token`
4. Every subsequent API call in `api.js` reads it and sends `Authorization: Bearer <token>`
5. Logout clears the token and resets state

#### Pages

| Page | Key Features |
|------|-------------|
| **Home** | Hero section, feature cards, CTA navigation |
| **Login / Register** | Animated FloatInput fields, password strength meter, quote rotator |
| **Achievers** | Grid of women achievers fetched from `/achievers/`; nomination form |
| **Entrepreneurs** | Women-led business directory with category + city filters |
| **Safety (SOS)** | One-tap SOS trigger; incident report form |
| **Know Your Rights** | 10 legal rights, 6 languages (EN/HI/TA/TE/MR/BN), search, category filter, helplines panel, offline save to `localStorage` |

#### ThreeBackground — 3D Petal System
- Built with **Three.js** using a custom `buildPetalGeometry()` that constructs a teardrop-shaped `BufferGeometry`
- 220 petals distributed across a `42×25` world-space grid, depth `±10`
- **Additive blending** + high emissive value for a glowing neon effect
- An orbiting `PointLight` (pink `#ff2d9b`) animates in a circle over the scene
- Container is `position: fixed; 100vw × 100vh` so it fills every page

#### `services/api.js` — Unified API Layer
- Single `request(path, options)` helper handles base URL, auth header injection, and JSON parsing
- `isForm: true` flag switches body to `URLSearchParams` for the OAuth2 login endpoint
- All feature calls (`loginUser`, `getAchievers`, `getJobs`, `sendSos`, etc.) are thin wrappers around `request()`

---

## 📝 Notes

- The backend uses an **in-memory store** — data resets on server restart. Swap `store.py` with SQLAlchemy models to persist.
- Seed data is in `backend/db/seed_data.json` — edit it to change initial content.
- CORS is configured for `localhost:5173` and `localhost:3000`.
- Built for the **Women's Day Hackathon 2026** 🌸