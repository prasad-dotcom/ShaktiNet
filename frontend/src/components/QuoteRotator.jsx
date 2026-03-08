import { useState, useEffect } from "react";

const QUOTES = [
  { text: "She believed she could, so she did.", author: "R.S. Grey" },
  { text: "A woman with a voice is a strong woman.", author: "Melinda Gates" },
  { text: "Well-behaved women seldom make history.", author: "Laurel Thatcher Ulrich" },
  { text: "The most courageous act is to think for yourself.", author: "Coco Chanel" },
  { text: "I am no bird; no net ensnares me.", author: "Charlotte Brontë" },
];

/**
 * QuoteRotator — auto-rotating inspirational quotes for auth pages
 * (Distinct from QuoteCarousel used on the home page)
 */
export default function QuoteRotator() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % QUOTES.length);
        setShow(true);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const q = QUOTES[idx];

  return (
    <div
      className="qr"
      style={{
        opacity:    show ? 1 : 0,
        transform:  show ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.5s ease",
      }}
    >
      <span className="qr__mark">"</span>
      <p className="qr__text">{q.text}</p>
      <span className="qr__author">— {q.author}</span>
    </div>
  );
}
