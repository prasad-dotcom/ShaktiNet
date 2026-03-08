// ================================================
// ShaktiNet — components/QuoteCarousel.jsx
// Auto-rotating inspirational quotes box
// ================================================

import { useState, useEffect } from "react";
import "./QuoteCarousel.css";

const QUOTES = [
  "Well-behaved women seldom make history. — Laurel Thatcher Ulrich",
  "A woman with a voice is by definition a strong woman. — Melinda Gates",
  "There is no limit to what we, as women, can accomplish. — Michelle Obama",
  "I am not afraid of storms, for I am learning how to sail my ship. — Louisa May Alcott",
  "The most courageous act is still to think for yourself. — Coco Chanel",
  "I am no bird; and no net ensnares me. — Charlotte Brontë",
];

export default function QuoteCarousel({ interval = 4500 }) {
  const [idx, setIdx]       = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 380);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <div className="quote-carousel">
      <span className="quote-carousel__mark">"</span>
      <p className={`quote-carousel__text ${visible ? "quote-carousel__text--visible" : ""}`}>
        {QUOTES[idx]}
      </p>
      <div className="quote-carousel__dots">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            className={`quote-dot ${i === idx ? "quote-dot--active" : ""}`}
            onClick={() => { setIdx(i); setVisible(true); }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
