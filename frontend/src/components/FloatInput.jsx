import { useState } from "react";

/**
 * FloatInput — animated floating label input
 * Props: label, type, value, onChange, icon, error
 */
export default function FloatInput({ label, type = "text", value, onChange, icon, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className={`fi-wrap${error ? " fi-wrap--error" : ""}`}>
      <span className="fi-icon">{icon}</span>
      <input
        className="fi-input"
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
      <label className={`fi-label${active ? " fi-label--active" : ""}`}>{label}</label>
      <div className={`fi-line${focused ? " fi-line--active" : ""}`} />
      {error && <span className="fi-error">{error}</span>}
    </div>
  );
}
