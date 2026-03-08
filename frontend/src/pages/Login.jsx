import { useState } from "react";
import FloatInput    from "../components/FloatInput";
import PetalField    from "../components/PetalField";
import QuoteRotator  from "../components/QuoteRotator";
import { loginUser } from "../services/api";
import "../styles/Auth.css";

/**
 * LoginPage
 * Props:
 *   onLogin(user)   — called with user object on success
 *   onGoRegister()  — switch to register view
 */
export default function LoginPage({ onLogin, onGoRegister }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");
  const [shake,    setShake]    = useState(false);

  const validate = () => {
    const e = {};
    if (!email.includes("@"))  e.email    = "Enter a valid email address";
    if (password.length < 6)   e.password = "Password must be at least 6 characters";
    return e;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // ── Hardcoded demo credential hint (backend must be running) ──
  // Real account: admin@shaktinet.in / admin123   (seeded in db/seed_data.json)

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); triggerShake(); return; }

    setLoading(true);
    setApiError("");

    const { data, error } = await loginUser({ email, password });

    setLoading(false);

    if (error) {
      setApiError(error);
      triggerShake();
      return;
    }

    // FastAPI returns { access_token, token_type, role, name }
    onLogin({ email, name: data.name, role: data.role });
  };

  return (
    <div className="auth-page">
      <PetalField />

      {/* ── LEFT — decorative ── */}
      <div className="auth-left">
        <div className="auth-left__inner">
          <span className="auth-brand">🌸 ShaktiNet</span>
          <h2 className="auth-left__headline">
            Every woman's<br />
            <span className="hl-pink">story</span> matters.
          </h2>
          <p className="auth-left__sub">
            A safe space to celebrate achievements, find support, and build community.
          </p>
          <QuoteRotator />
          <div className="auth-left__stats">
            <div className="als"><span className="als__n">10K+</span><span className="als__l">Women</span></div>
            <div className="als"><span className="als__n">500+</span><span className="als__l">Achievers</span></div>
            <div className="als"><span className="als__n">24/7</span><span className="als__l">Safety</span></div>
          </div>
        </div>
        <div className="auth-left__circle c1" />
        <div className="auth-left__circle c2" />
        <div className="auth-left__circle c3" />
      </div>

      {/* ── RIGHT — form ── */}
      <div className="auth-right">
        <div className={`auth-card${shake ? " auth-card--shake" : ""}`}>
          <div className="auth-card__top">
            <span className="auth-card__avatar">🌸</span>
            <h1 className="auth-card__title">Welcome back</h1>
            <p className="auth-card__sub">Sign in to your ShaktiNet account</p>
          </div>

          <div className="auth-form">
            <FloatInput
              label="Email address" type="email" icon="✉️"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors({}); setApiError(""); }}
              error={errors.email}
            />
            <FloatInput
              label="Password" type="password" icon="🔒"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors({}); setApiError(""); }}
              error={errors.password}
            />

            <div className="auth-forgot">
              <button className="link-btn">Forgot password?</button>
            </div>

            {apiError && (
              <p style={{ color: "#ff5252", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.75rem" }}>
                {apiError}
              </p>
            )}

            <button
              className={`auth-submit${loading ? " auth-submit--loading" : ""}`}
              onClick={handleSubmit}
            >
              {loading
                ? <><span className="spinner" /> Signing you in…</>
                : <>Sign In →</>
              }
            </button>

            <div className="auth-divider"><span>or continue with</span></div>

            <div className="auth-social">
              <button className="social-btn">🔵 Google</button>
              <button className="social-btn">⚫ GitHub</button>
            </div>
          </div>

          <p className="auth-switch">
            New to ShaktiNet?{" "}
            <button className="link-btn link-btn--pink" onClick={onGoRegister}>
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
