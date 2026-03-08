// Achievers.jsx — Women Achievers Wall with filterable cards and nominate modal
import { useState } from "react";
import "../styles/Achievers.css";

const ACHIEVERS = [
  { name: "Kalpana Chawla",   field: "Space & Science",          year: "1962–2003",    desc: "First woman of Indian origin in space. Her courage broke the sky's limit.",       emoji: "🚀", color: "#c2185b" },
  { name: "Malala Yousafzai", field: "Education & Peace",         year: "1997–present", desc: "Youngest Nobel Prize laureate. Fought for every girl's right to education.",      emoji: "📚", color: "#e64a19" },
  { name: "Indra Nooyi",      field: "Business & Leadership",     year: "1955–present", desc: "Former CEO of PepsiCo. Redefined global corporate leadership.",                   emoji: "💼", color: "#7b1fa2" },
  { name: "Serena Williams",  field: "Sports",                    year: "1981–present", desc: "23 Grand Slam titles. Proved that motherhood and greatness coexist.",             emoji: "🎾", color: "#00796b" },
  { name: "Marie Curie",      field: "Science",                   year: "1867–1934",    desc: "First person to win Nobel Prizes in two sciences. Pioneer of radioactivity.",      emoji: "⚗️", color: "#1565c0" },
  { name: "Savitribai Phule", field: "Education & Reform",        year: "1831–1897",    desc: "India's first female teacher. Fought caste and gender discrimination fearlessly.", emoji: "✊", color: "#558b2f" },
  { name: "Ada Lovelace",     field: "Technology",                year: "1815–1852",    desc: "World's first computer programmer — a century before computers existed.",          emoji: "💻", color: "#6a1b9a" },
  { name: "Arundhati Roy",    field: "Literature & Activism",     year: "1961–present", desc: "Booker Prize winner and fearless voice for social justice.",                       emoji: "✍️", color: "#bf360c" },
];

const FIELDS = ["All", "Space & Science", "Education & Peace", "Business & Leadership", "Sports", "Science", "Technology", "Literature & Activism", "Education & Reform"];

export default function Achievers() {
  const [filter, setFilter]               = useState("All");
  const [nominateOpen, setNominateOpen]   = useState(false);
  const [form, setForm]                   = useState({ name: "", field: "", reason: "" });
  const [submitted, setSubmitted]         = useState(false);

  const filtered = ACHIEVERS.filter(a => filter === "All" || a.field === filter);

  const handleNominate = () => {
    setSubmitted(true);
    setTimeout(() => {
      setNominateOpen(false);
      setSubmitted(false);
      setForm({ name: "", field: "", reason: "" });
    }, 2000);
  };

  return (
    <div className="page-section">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">🏆 Women Achievers Wall</h2>
          <p className="page-sub">Extraordinary women who changed the course of history</p>
        </div>
        <button className="btn btn-primary" onClick={() => setNominateOpen(true)}>+ Nominate a Woman</button>
      </div>

      {/* Filter pills */}
      <div className="filter-row">
        {FIELDS.map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " filter-btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="cards-grid">
        {filtered.map(a => (
          <div
            key={a.name}
            className="achiever-card"
            style={{
              background: `linear-gradient(135deg, ${a.color}18, var(--bg))`,
              border: `1px solid ${a.color}40`,
              "--card-color": `${a.color}40`,
            }}
          >
            <span className="achiever-card__emoji">{a.emoji}</span>
            <div className="achiever-card__name">{a.name}</div>
            <div className="achiever-card__field">{a.field}</div>
            <div className="achiever-card__year">{a.year}</div>
            <p className="achiever-card__desc">{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Nominate Modal */}
      {nominateOpen && (
        <div className="modal-overlay" onClick={() => setNominateOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">✨ Nominate a Woman</h3>
            {submitted ? (
              <div className="modal-success">
                <div style={{ fontSize: "3rem" }}>🎉</div>
                <p>Thank you! Nomination submitted.</p>
              </div>
            ) : (
              <>
                <label className="form-label">Her Name *</label>
                <input className="form-input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <label className="form-label">Field of Achievement *</label>
                <input className="form-input" placeholder="e.g. Science, Sports, Arts..." value={form.field} onChange={e => setForm({ ...form, field: e.target.value })} />
                <label className="form-label">Why Does She Deserve Recognition? *</label>
                <textarea className="form-input form-textarea" placeholder="Tell her story..." value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
                <button className="btn btn-primary btn-full" onClick={handleNominate}>Submit Nomination</button>
                <button className="btn btn-outline btn-full" onClick={() => setNominateOpen(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

