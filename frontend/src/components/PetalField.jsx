import { useMemo } from "react";

/**
 * PetalField — random falling petal particles (auth pages)
 * Props: count (default 18)
 */
export default function PetalField({ count = 18 }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      left:             `${Math.random() * 100}%`,
      animationDelay:   `${Math.random() * 8}s`,
      animationDuration:`${6 + Math.random() * 8}s`,
      width:            `${6 + Math.random() * 10}px`,
      height:           `${6 + Math.random() * 10}px`,
      opacity:          0.12 + Math.random() * 0.2,
    })),
  [count]);

  return (
    <div className="petal-field">
      {petals.map((style, i) => (
        <div key={i} className="petal" style={style} />
      ))}
    </div>
  );
}
