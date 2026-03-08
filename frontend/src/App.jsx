
import './index.css'; // <- FIRST LINE
import './App.css';
import { useState } from 'react';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import Achievers    from './pages/Achievers';
import Entrepreneurs from './pages/Entrepreneurs';
import Sos          from './pages/Sos';
import KnowYourRights from './pages/KnowYourRights';
import Login        from './pages/Login';
import Register     from './pages/Register';
import { logoutUser } from './services/api';

function App() {
  // ── Auth state ──────────────────────────────────
  // view: "login" | "register"
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);   // { id, name, email, role }

  const handleLogin    = (u) => setUser(u);
  const handleRegister = (u) => setUser(u);
  const handleLogout   = () => { logoutUser(); setUser(null); setView("login"); };

  // ── Page routing (only when logged in) ──────────
  const [page, setPage] = useState('home');

  // ── No user → show auth screens ─────────────────
  if (!user) {
    if (view === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onGoLogin={() => setView("login")}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onGoRegister={() => setView("register")}
      />
    );
  }

  // ── Logged in → show main app ────────────────────
  return (
    <div className="app-root">
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      <main className="main-content">
        {page === 'home'          && <Home onNavigate={setPage} />}
        {page === 'achievers'     && <Achievers />}
        {page === 'entrepreneurs' && <Entrepreneurs />}
        {page === 'sos'           && <Sos />}
        {page === 'rights'        && <KnowYourRights />}
      </main>
      <footer className="footer">
        <span style={{ color: 'var(--pink)', fontWeight: 700 }}>🌸 ShaktiNet</span>
        <span style={{ marginLeft: '1rem' }}>Built with ❤️ for Women's Day Hackathon 2026 · FastAPI + React.js</span>
      </footer>
    </div>
  );
}

export default App;

