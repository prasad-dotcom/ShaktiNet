import { useState } from "react";
import FloatInput      from "../components/FloatInput";
import PetalField      from "../components/PetalField";
import StrengthMeter   from "../components/StrengthMeter";
import { registerUser } from "../services/api";
import "../styles/Auth.css";

const ROLES = [
  { id: "user",         icon: "👩",  label: "User",         desc: "Browse & connect" },
  { id: "entrepreneur", icon: "💼",  label: "Entrepreneur", desc: "List my business" },
  { id: "volunteer",    icon: "🤝",  label: "Volunteer",    desc: "Mentor & support" },
];

const REG_FEATURES = [
  { icon: "🏆", label: "Women Achievers Wall",  desc: "Discover & nominate extraordinary women" },
  { icon: "💼", label: "Entrepreneur Directory", desc: "Find and list women-led businesses" },
  { icon: "🆘", label: "SOS Safety Button",      desc: "Instant emergency alert to your contacts" },
];

/**
 * RegisterPage
 * Props:
 *   onRegister(user) — called with user object on success
 *   onGoLogin()      — switch back to login view
 */
export default function RegisterPage({ onRegister, onGoLogin }) {
  const [step,    setStep]    = useState(1); // 1 = details | 2 = role | 3 = success
  const [form,    setForm]    = useState({ name: "", email: "", password: "", confirm: "" });
  const [role,    setRole]    = useState("");
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError,setApiError]= useState("");

  const upd = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors({});
    setApiError("");
  };

  const validateStep1 = () => {
    const e = {};
    if (form.name.trim().length < 2)    e.name     = "Enter your full name";
    if (!form.email.includes("@"))      e.email    = "Enter a valid email";
    if (form.password.length < 8)       e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm  = "Passwords do not match";
    return e;
  };

  const handleStep1 = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
  };

  const handleStep2 = async () => {
    if (!role) { setErrors({ role: "Please select your role" }); return; }

    setLoading(true);
    setApiError("");

    const { data, error } = await registerUser({
      name:     form.name,
      email:    form.email,
      password: form.password,
      role,
    });

    setLoading(false);

    if (error) { setApiError(error); return; }

    setStep(3);
    // Store resolved user for the "Enter ShaktiNet" button
    if (data?.user) setResolvedUser(data.user);
  };

  // Resolved user after API success
  const [resolvedUser, setResolvedUser] = useState(null);

  const handleDone = () => {
    onRegister(resolvedUser ?? { name: form.name, email: form.email, role });
  };

  const progressW = step >= 2 ? "100%" : "50%";

  return (
    <div className="auth-page auth-page--reg">
      <PetalField count={14} />

      {/* ── LEFT ── */}
      <div className="auth-left auth-left--reg">
        <div className="auth-left__inner">
          <span className="auth-brand">🌸 ShaktiNet</span>
          <h2 className="auth-left__headline">
            Join <span className="hl-gold">3,000+</span><br />women today.
          </h2>
          <p className="auth-left__sub">
            Access achievers, entrepreneur directory, and a 24/7 safety network.
          </p>
          <div className="reg-features">
            {REG_FEATURES.map(f => (
              <div key={f.label} className="reg-feature">
                <span className="reg-feature__icon">{f.icon}</span>
                <div>
                  <div className="reg-feature__label">{f.label}</div>
                  <div className="reg-feature__desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-left__circle c1" />
        <div className="auth-left__circle c2" />
      </div>

      {/* ── RIGHT ── */}
      <div className="auth-right">
        <div className="auth-card auth-card--tall">

          {/* Progress bar */}
          {step < 3 && (
            <div className="reg-progress">
              <div className="reg-progress__bar" style={{ width: progressW }} />
              <div className="reg-progress__steps">
                <span className={`rps${step >= 1 ? " rps--done" : ""}`}>1 · Your Details</span>
                <span className={`rps${step >= 2 ? " rps--done" : ""}`}>2 · Your Role</span>
              </div>
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div className="auth-card__top">
                <span className="auth-card__avatar">✨</span>
                <h1 className="auth-card__title">Create account</h1>
                <p className="auth-card__sub">You're joining a community of strong women</p>
              </div>
              <div className="auth-form">
                <FloatInput label="Full name"        icon="👤" value={form.name}     onChange={upd("name")}     error={errors.name} />
                <FloatInput label="Email address"    type="email" icon="✉️" value={form.email}    onChange={upd("email")}    error={errors.email} />
                <FloatInput label="Password"         type="password" icon="🔒" value={form.password} onChange={upd("password")} error={errors.password} />
                <StrengthMeter password={form.password} />
                <FloatInput label="Confirm password" type="password" icon="🔑" value={form.confirm}  onChange={upd("confirm")}  error={errors.confirm} />
                <button className="auth-submit" onClick={handleStep1}>
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div className="auth-card__top">
                <span className="auth-card__avatar">🌺</span>
                <h1 className="auth-card__title">Who are you?</h1>
                <p className="auth-card__sub">Choose the role that fits you best</p>
              </div>
              <div className="role-picker">
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    className={`role-card${role === r.id ? " role-card--active" : ""}`}
                    onClick={() => { setRole(r.id); setErrors({}); }}
                  >
                    <span className="role-card__icon">{r.icon}</span>
                    <div>
                      <div className="role-card__label">{r.label}</div>
                      <div className="role-card__desc">{r.desc}</div>
                    </div>
                    {role === r.id && <div className="role-card__check">✓</div>}
                  </button>
                ))}
                {errors.role && <p className="role-error">{errors.role}</p>}
              </div>

              {apiError && (
                <p style={{ color: "#ff5252", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.75rem" }}>
                  {apiError}
                </p>
              )}

              <div className="reg-step-btns">
                <button className="auth-back" onClick={() => setStep(1)}>← Back</button>
                <button
                  className={`auth-submit auth-submit--half${loading ? " auth-submit--loading" : ""}`}
                  onClick={handleStep2}
                >
                  {loading
                    ? <><span className="spinner" /> Creating…</>
                    : "Create Account →"
                  }
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3 — Success ── */}
          {step === 3 && (
            <div className="reg-success">
              <span className="reg-success__bloom">🌸</span>
              <h2 className="reg-success__title">Welcome to ShaktiNet!</h2>
              <p className="reg-success__sub">
                Your account has been created. You're now part of a movement.
              </p>
              <div className="reg-success__role">
                Joined as <strong>{ROLES.find(r => r.id === role)?.label}</strong>
              </div>
              <button className="auth-submit" onClick={handleDone}>
                Enter ShaktiNet 🌸
              </button>
            </div>
          )}

          {step < 3 && (
            <p className="auth-switch">
              Already have an account?{" "}
              <button className="link-btn link-btn--pink" onClick={onGoLogin}>
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
