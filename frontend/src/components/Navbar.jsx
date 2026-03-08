
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home',          label: 'Home' },
  { id: 'achievers',     label: '🏆 Achievers' },
  { id: 'entrepreneurs', label: '💼 Directory' },
  { id: 'sos',           label: '🆘 Safety' },
  { id: 'rights',        label: '⚖️ Rights' },
];

export default function Navbar({ page, setPage, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => setPage('home')}>🌸 ShaktiNet</div>

      <div className="navbar__links">
        {NAV_LINKS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-btn${page === id ? ' nav-btn--active' : ''}`}
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {user && (
        <div className="navbar__user">
          <span className="navbar__user-avatar">👩</span>
          <span className="navbar__user-name">{user.name}</span>
          <button className="navbar__logout" onClick={onLogout}>Sign out</button>
        </div>
      )}
    </nav>
  );
}

