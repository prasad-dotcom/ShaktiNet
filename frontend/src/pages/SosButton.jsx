// SosButton.jsx
// SOS button component for emergencies.

export default function SosButton({ onClick, active }) {
  return (
    <button className={active ? "sos-active" : "sos"} onClick={onClick}>
      {active ? "SOS Active" : "Activate SOS"}
    </button>
  );
}
