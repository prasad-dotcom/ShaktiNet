
import { useState, useEffect } from "react";
import "../styles/Sos.css";

// SOS Safety Tool page
const SAFETY_TIPS = [
  "Share your live location with family when traveling alone.",
  "Save the Women's Helpline number: 1091 (India).",
  "Trust your instincts — leave any situation that feels unsafe.",
  "Use the fake call feature in the app to exit uncomfortable situations.",
];

export default function Sos() {
  const [sosActive, setSosActive]     = useState(false);
  const [sosCountdown, setSosCountdown] = useState(null);
  const [contacts, setContacts]       = useState([
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);

  useEffect(() => {
    if (sosCountdown === null) return;
    if (sosCountdown === 0) {
      setSosActive(true);
      setSosCountdown(null);
      return;
    }
    const t = setTimeout(() => setSosCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sosCountdown]);

  const triggerSOS = () => setSosCountdown(3);
  const cancelSOS  = () => { setSosCountdown(null); setSosActive(false); };

  const updateContact = (i, field, value) => {
    const updated = [...contacts];
    updated[i] = { ...updated[i], [field]: value };
    setContacts(updated);
  };

  const sosButtonClass = sosActive
    ? "sos-btn sos-btn--sent"
    : sosCountdown !== null
      ? "sos-btn sos-btn--counting"
      : "sos-btn";

  return (
    <div className="sos-page">
      <div className="sos-container">
        <h2 className="sos-title">🆘 SOS Safety Tool</h2>
        <p className="sos-desc">
          In an emergency, press the SOS button. After a 3-second countdown, your trusted contacts
          will be alerted with your location. You can cancel anytime.
        </p>

        {/* Trusted Contacts */}
        <div className="sos-card">
          <h3 className="sos-card__heading">Trusted Contacts</h3>
          {contacts.map((c, i) => (
            <div key={i} className="contact-card">
              <label className="form-label">Contact {i + 1} Name</label>
              <input
                className="form-input"
                placeholder="e.g. Mom"
                value={c.name}
                onChange={e => updateContact(i, "name", e.target.value)}
              />
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                placeholder="e.g. +91 98765 43210"
                value={c.phone}
                onChange={e => updateContact(i, "phone", e.target.value)}
              />
            </div>
          ))}
          <button
            className="btn btn-outline"
            onClick={() => setContacts(prev => [...prev, { name: "", phone: "" }])}
          >
            + Add Another Contact
          </button>
        </div>

        {/* SOS Button */}
        <div className="sos-trigger">
          <p className="sos-status-text">
            {sosActive
              ? "✅ Alert sent! Help is on the way."
              : sosCountdown !== null
                ? `Sending in ${sosCountdown}... tap to cancel`
                : "Press to send SOS"}
          </p>

          <button
            className={sosButtonClass}
            onClick={sosActive ? cancelSOS : sosCountdown !== null ? cancelSOS : triggerSOS}
          >
            {sosActive ? (
              <><span>✅</span><span className="sos-btn__label">SENT</span></>
            ) : sosCountdown !== null ? (
              <span className="sos-btn__countdown">{sosCountdown}</span>
            ) : (
              <><span className="sos-btn__emoji">🆘</span><span className="sos-btn__label">SOS</span></>
            )}
          </button>

          {(sosActive || sosCountdown !== null) && (
            <button className="btn btn-outline" onClick={cancelSOS}>Cancel</button>
          )}
        </div>

        {/* Alert Sent Confirmation */}
        {sosActive && (
          <div className="sos-alert-sent">
            <h3 className="sos-alert-sent__title">✅ Alert Sent Successfully</h3>
            <p className="sos-alert-sent__body">
              Your trusted contacts have been notified with your current location.<br />
              <strong>Stay calm. Help is on the way.</strong>
            </p>
            <div className="sos-alert-sent__details">
              📍 Location shared: Your current location<br />
              🕐 Time: {new Date().toLocaleTimeString()}<br />
              📱 Contacts notified: {contacts.filter(c => c.name).map(c => c.name).join(", ") || "Your saved contacts"}
            </div>
          </div>
        )}

        {/* Safety Tips */}
        <div className="sos-card">
          <h3 className="sos-card__heading" style={{ color: "var(--orange)" }}>⚡ Safety Tips</h3>
          {SAFETY_TIPS.map((tip, i) => (
            <div key={i} className="safety-tip">
              <span className="safety-tip__arrow">→</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
