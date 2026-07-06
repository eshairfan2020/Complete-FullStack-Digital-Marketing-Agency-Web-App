// src/components/Card3D.jsx
import { useState, useRef } from "react";

export function Card3D({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: cy * -12, y: cx * 12 });
  };

  return (
    <div ref={ref} className={className} style={{
      ...style,
      transform: hov
        ? `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.04,1.04,1.04)`
        : "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)",
      transition: hov ? "transform 0.1s ease" : "transform 0.5s ease",
      willChange: "transform",
      transformStyle: "preserve-3d",
    }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}>
      {children}
    </div>
  );
}
