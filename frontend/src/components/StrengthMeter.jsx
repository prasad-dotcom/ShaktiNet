/**
 * StrengthMeter — password strength indicator
 * Props: password (string)
 */
export default function StrengthMeter({ password }) {
  if (!password) return null;

  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]
    .filter(r => r.test(password)).length;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ff5252", "#ff9800", "#ffeb3b", "#4caf50"];

  return (
    <div className="strength">
      <div className="strength__bars">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className="strength__bar"
            style={{ background: n <= score ? colors[score] : "#2e1a20" }}
          />
        ))}
      </div>
      <span className="strength__label" style={{ color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  );
}
