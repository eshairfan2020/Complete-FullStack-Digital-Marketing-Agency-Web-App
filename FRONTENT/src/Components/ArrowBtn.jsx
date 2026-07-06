// src/components/ArrowBtn.jsx
import { useState } from "react";

export function ArrowBtn({ side, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={side === "left" ? "Previous" : "Next"}
      style={{
        position: "absolute",
        top: "50%",
        left: side === "left" ? "max(16px,3vw)" : "auto",
        right: side === "right" ? "max(16px,3vw)" : "auto",
        transform: `translateY(-50%) scale(${hover ? 1.08 : 1})`,
        width: 56, height: 56, borderRadius: 999,
        display: "grid", placeItems: "center",
        border: "1px solid rgba(255,255,255,.18)",
        background: "rgba(20,20,30,.55)",
        color: "#fff", fontSize: 22, fontWeight: 700,
        cursor: "pointer", backdropFilter: "blur(10px)",
        boxShadow: hover
          ? "0 10px 40px -10px rgba(124,92,255,.55)"
          : "0 6px 24px -10px rgba(0,0,0,.6)",
        transition: "transform 300ms ease, box-shadow 300ms ease, background 300ms ease",
        zIndex: 999,
        pointerEvents: "auto",
        userSelect: "none",
        fontFamily: "inherit",
      }}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
