// Entrepreneurs.jsx — Women Entrepreneur Directory with search, filter, and add business modal
import { useState } from "react";
import "../styles/Entrepreneurs.css";

const ENTREPRENEURS_DATA = [
  { name: "Riya Sharma",  business: "EcoWear",    category: "Sustainable Fashion", city: "Mumbai",    desc: "Handcrafted sustainable clothing using recycled fabrics. 50+ women artisans employed.",                     contact: "riya@ecowear.in",     verified: true  },
  { name: "Priya Menon",  business: "TechHer",    category: "EdTech",              city: "Bangalore", desc: "Coding bootcamps exclusively for rural women. 2000+ graduates placed in tech jobs.",                      contact: "priya@techher.io",    verified: true  },
  { name: "Ananya Gupta", business: "NourishBox", category: "Health & Food",       city: "Delhi",     desc: "Subscription meal kits with nutritionist-designed plans for women's health.",                            contact: "ananya@nourishbox.com", verified: false },
  { name: "Fatima Khan",  business: "SafeRide",   category: "Transport",           city: "Hyderabad", desc: "Women-only cab service with female drivers. Safety-first commuting solution.",                           contact: "fatima@saferide.in",  verified: true  },
  { name: "Deepa Iyer",   business: "LegalShe",   category: "Legal Services",      city: "Chennai",   desc: "Affordable legal consulting for women facing workplace or domestic issues.",                             contact: "deepa@legalshe.com",  verified: true  },
  { name: "Meena Rawat",  business: "CraftRoots", category: "Handicrafts",         city: "Jaipur",    desc: "Platform connecting tribal women artisans directly to global buyers.",                                   contact: "meena@craftroots.org",verified: false },
];

const CATEGORIES = ["All", "Sustainable Fashion", "EdTech", "Health & Food", "Transport", "Legal Services", "Handicrafts"];

export default function Entrepreneurs() {
  const [businesses, setBusinesses]       = useState(ENTREPRENEURS_DATA);
  const [searchQuery, setSearchQuery]     = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [addBizOpen, setAddBizOpen]       = useState(false);
  const [bizForm, setBizForm]             = useState({ name: "", business: "", category: "", city: "", desc: "", contact: "" });

  const filtered = businesses.filter(b => {
    const matchCat    = categoryFilter === "All" || b.category === categoryFilter;
    const q           = searchQuery.toLowerCase();
    const matchSearch = b.name.toLowerCase().includes(q) || b.business.toLowerCase().includes(q) || b.city.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleAddBiz = () => {
    if (bizForm.name && bizForm.business) {
      setBusinesses(prev => [...prev, { ...bizForm, verified: false }]);
      setAddBizOpen(false);
      setBizForm({ name: "", business: "", category: "", city: "", desc: "", contact: "" });
    }
  };

  return (
    <div className="page-section">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">💼 Entrepreneur Directory</h2>
          <p className="page-sub">Discover &amp; support women-led businesses across India</p>
        </div>
        <button className="btn btn-primary" onClick={() => setAddBizOpen(true)}>+ List Your Business</button>
      </div>

      {/* Search + filters */}
      <div className="dir-toolbar">
        <input
          className="form-input dir-search"
          placeholder="🔍 Search name, business, city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-row">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-btn${categoryFilter === c ? " filter-btn--active" : ""}`}
            onClick={() => setCategoryFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="cards-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">No results found. Try a different search.</div>
        ) : filtered.map((b, i) => (
          <div key={i} className="biz-card">
            <div className="biz-card__header">
              <div className="biz-card__name">{b.business}</div>
              {b.verified && <span className="verified-badge">✓ Verified</span>}
            </div>
            <div className="biz-card__owner">by {b.name} · {b.city}</div>
            <div className="biz-card__tags">
              <span className="tag">{b.category}</span>
            </div>
            <p className="biz-card__desc">{b.desc}</p>
            <div className="biz-card__contact">📧 {b.contact}</div>
          </div>
        ))}
      </div>

      {/* Add Business Modal */}
      {addBizOpen && (
        <div className="modal-overlay" onClick={() => setAddBizOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">💼 List Your Business</h3>
            <label className="form-label">Your Name *</label>
            <input className="form-input" placeholder="Your name" value={bizForm.name} onChange={e => setBizForm({ ...bizForm, name: e.target.value })} />
            <label className="form-label">Business Name *</label>
            <input className="form-input" placeholder="Business name" value={bizForm.business} onChange={e => setBizForm({ ...bizForm, business: e.target.value })} />
            <label className="form-label">Category</label>
            <input className="form-input" placeholder="e.g. EdTech, Fashion, Health..." value={bizForm.category} onChange={e => setBizForm({ ...bizForm, category: e.target.value })} />
            <label className="form-label">City</label>
            <input className="form-input" placeholder="Your city" value={bizForm.city} onChange={e => setBizForm({ ...bizForm, city: e.target.value })} />
            <label className="form-label">Description</label>
            <textarea className="form-input form-textarea" placeholder="What does your business do?" value={bizForm.desc} onChange={e => setBizForm({ ...bizForm, desc: e.target.value })} />
            <label className="form-label">Contact Email</label>
            <input className="form-input" placeholder="email@example.com" value={bizForm.contact} onChange={e => setBizForm({ ...bizForm, contact: e.target.value })} />
            <button className="btn btn-primary btn-full" onClick={handleAddBiz}>Add My Business</button>
            <button className="btn btn-outline btn-full" onClick={() => setAddBizOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

