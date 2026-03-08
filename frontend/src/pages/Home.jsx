

import { useState, useEffect, useRef } from "react";
import QuoteCarousel from "../components/QuoteCarousel";
import ThreeBackground from "../components/ThreeBackground";
import "../styles/Home.css";

const STATS = [
  { num: "3.9B", suffix: "+", label: "Women in the World",       target: 3900 },
  { num: "140",  suffix: "+", label: "Countries with Gender Gaps", target: 140  },
  { num: "8",    suffix: "",  label: "March – Women's Day",        target: 8    },
  { num: "∞",    suffix: "",  label: "Stories Yet to Be Told",     target: null },
];

const FEATURES = [
  { icon: "🏆", title: "Women Achievers Wall",     desc: "Discover extraordinary women who changed the world across science, sports, arts, and activism.", page: "achievers",     color: "#e91e8c", accentBg: "rgba(233,30,140,0.08)"  },
  { icon: "💼", title: "Entrepreneur Directory",   desc: "Find and support women-led businesses. List your own venture and reach more customers globally.", page: "entrepreneurs", color: "#60a5fa", accentBg: "rgba(59,130,246,0.08)"   },
  { icon: "🆘", title: "SOS Safety Tool",          desc: "One-tap alert sends your location to trusted contacts. Stay safe, anywhere, anytime.",           page: "sos",           color: "#ff5252", accentBg: "rgba(255,82,82,0.08)"   },
];

// Animate a number from 0 to target
function CountUp({ target, suffix, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null) { setVal("∞"); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
        else setVal(target);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home({ onNavigate }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on hero title
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    setMousePos({ x, y });
  };

  return (
    <div className="home-container" onMouseMove={handleMouseMove}>
      <ThreeBackground />

      {/* Top radial glow */}
      <div className="hero-glow" />

      <div className="home-scroll">

        {/* ─── HERO ─── */}
        <section className="hero">
          <div className="hero-inner" style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.3}px)` }}>
            <span className="hero-eyebrow">
              <span className="hero-eyebrow__dot" /> Happy Women's Day 2026
            </span>

            <h1 className="hero-title" style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.4}px)` }}>
              <span className="ht-she">She</span><span className="ht-rises"> Rises.</span>
              <br />
              <span className="ht-leads">She Leads.</span>
              <br />
              <span className="ht-inspires">She Inspires.</span>
            </h1>

            <p className="hero-sub">
              A platform celebrating women's achievements, empowering entrepreneurs,<br className="hero-sub__br" /> and keeping every woman safe.
            </p>

            <QuoteCarousel interval={4500} />

            <div className="hero-cta-row">
              <button className="cta-btn cta-btn--primary" onClick={() => onNavigate("achievers")}>
                🏆 <span>Meet Achievers</span>
              </button>
              <button className="cta-btn cta-btn--outline" onClick={() => onNavigate("entrepreneurs")}>
                💼 <span>Entrepreneur Directory</span>
              </button>
              <button className="cta-btn cta-btn--danger" onClick={() => onNavigate("sos")}>
                🆘 <span>Safety SOS</span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-hint">
            <span>scroll</span>
            <div className="scroll-hint__line" />
          </div>
        </section>

        {/* ─── STATS STRIP ─── */}
        <div className="stats-strip">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-num">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ─── FEATURE CARDS ─── */}
        <section className="features-section">
          <div className="features-header">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="features-title">Everything a Woman Needs,<br/>In One Place</h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-card${hoveredFeature === i ? " feature-card--hovered" : ""}`}
                style={{
                  background:   hoveredFeature === i ? f.accentBg : "var(--bg-surface)",
                  borderColor:  hoveredFeature === i ? f.color     : "var(--border-default)",
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => onNavigate(f.page)}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="feature-card__icon-wrap">
                  <span className="feature-card__icon">{f.icon}</span>
                </div>
                <h3 className="feature-card__title" style={{ color: hoveredFeature === i ? f.color : "var(--text)" }}>
                  {f.title}
                </h3>
                <p className="feature-card__desc">{f.desc}</p>
                <div className="feature-card__arrow" style={{ color: f.color }}>
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FOOTER STRIP ─── */}
        <div className="home-footer-strip">
          <span className="home-footer-strip__brand">🌸 ShaktiNet</span>
          <span className="home-footer-strip__copy">Built with ❤ for Women's Day Hackathon 2026</span>
        </div>

      </div>
    </div>
  );
}
