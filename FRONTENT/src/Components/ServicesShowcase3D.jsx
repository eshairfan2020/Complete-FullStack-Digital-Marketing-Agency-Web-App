// src/components/ServicesShowcase3D.jsx
import { useState, useEffect, useRef } from "react";
import { SERVICES } from "../data/content";
import { ArrowBtn } from "./ArrowBtn";

export function ServicesShowcase3D({ setPage }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wheelLock = useRef(0);
  const touchStart = useRef(null);

  const go = (dir) =>
    setActive((a) => (a + dir + SERVICES.length) % SERVICES.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelLock.current < 450) return;
    if (Math.abs(e.deltaX) < 8 && Math.abs(e.deltaY) < 8) return;
    wheelLock.current = now;
    go(e.deltaY + e.deltaX > 0 ? 1 : -1);
  };
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const current = SERVICES[active];
  const accent = current.color;
  const accent2 = "#22d3ee";

  const keyframes = `
    @keyframes ssBgFloat { 0%,100%{transform:translate3d(0,0,0) scale(1);} 50%{transform:translate3d(2%,-3%,0) scale(1.08);} }
    @keyframes ssBgFloat2 { 0%,100%{transform:translate3d(0,0,0) scale(1);} 50%{transform:translate3d(-3%,2%,0) scale(1.1);} }
    @keyframes ssShimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
    @keyframes ssPulseGlow { 0%,100%{opacity:.55;} 50%{opacity:1;} }
    @keyframes ssFadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
  `;

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 72,
        overflow: "hidden",
        background:
          "radial-gradient(1200px 800px at 80% -10%, #1a0b3d 0%, transparent 60%)," +
          "radial-gradient(1000px 700px at -10% 110%, #0b3d3a 0%, transparent 55%)," +
          "linear-gradient(180deg,#05060b 0%,#07080f 100%)",
        color: "#f5f6fb",
        fontFamily: "'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{keyframes}</style>

      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          `radial-gradient(600px 600px at 20% 30%, ${accent}33, transparent 60%),` +
          `radial-gradient(700px 700px at 80% 70%, ${accent2}33, transparent 60%)`,
        transition: "background 800ms ease",
        animation: "ssBgFloat 14s ease-in-out infinite",
        filter: "blur(20px)",
      }}/>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "radial-gradient(2px 2px at 20% 30%,rgba(255,255,255,.15),transparent 50%)," +
          "radial-gradient(1px 1px at 70% 60%,rgba(255,255,255,.12),transparent 50%)," +
          "radial-gradient(1.5px 1.5px at 40% 80%,rgba(255,255,255,.1),transparent 50%)",
        animation: "ssBgFloat2 22s ease-in-out infinite",
      }}/>

      <header style={{
        position: "relative", zIndex: 2, padding: "40px 24px 0",
        maxWidth: 1280, margin: "0 auto", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 999, fontSize: 12, letterSpacing: ".18em",
          textTransform: "uppercase", color: "rgba(255,255,255,.75)",
          background: "rgba(255,255,255,.03)", backdropFilter: "blur(8px)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, background: accent,
            boxShadow: `0 0 12px ${accent}`,
            animation: "ssPulseGlow 2s ease-in-out infinite",
          }}/>
          Our Services
        </div>
        <h1 style={{
          margin: "20px auto 10px",
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(34px,5.2vw,64px)",
          lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700,
          maxWidth: 900,
          background: "linear-gradient(180deg,#fff 0%,rgba(255,255,255,.7) 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>
          Crafted services for brands that refuse the ordinary.
        </h1>
        <p style={{
          margin: "0 auto", maxWidth: 620,
          color: "rgba(229,231,235,.65)", fontSize: 16, lineHeight: 1.6,
        }}>
          Scroll, swipe, or use your arrow keys to drift through our practice.
        </p>
      </header>

      <section style={{
        position: "relative", zIndex: 2,
        height: "min(72vh, 640px)", marginTop: 32, perspective: 2000,
      }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {SERVICES.map((s, i) => {
            let offset = i - active;
            if (offset > SERVICES.length / 2) offset -= SERVICES.length;
            if (offset < -SERVICES.length / 2) offset += SERVICES.length;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const visible = abs <= 3;

            const translateX = offset * 220;
            const translateZ = -abs * 220 + (isActive && hovering ? 40 : 0);
            const rotateY = offset * -22;
            const scale = isActive ? (hovering ? 1.04 : 1) : 1 - abs * 0.08;
            const blur = isActive ? 0 : Math.min(abs * 2.2, 8);
            const opacity = visible ? (isActive ? 1 : 1 - abs * 0.22) : 0;

            return (
              <div
                key={s.title}
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                onMouseEnter={() => isActive && setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                aria-label={s.title}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "min(420px,78vw)", height: "min(540px,68vh)",
                  marginLeft: "calc(min(420px,78vw) / -2)",
                  marginTop: "calc(min(540px,68vh) / -2)",
                  transform: `translate3d(${translateX}px,0,${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transition: "transform 700ms cubic-bezier(.22,1,.36,1), filter 700ms cubic-bezier(.22,1,.36,1), opacity 600ms ease",
                  filter: `blur(${blur}px)`, opacity,
                  zIndex: 100 - abs,
                  pointerEvents: visible ? "auto" : "none",
                  padding: 0, border: "none", background: "transparent",
                  cursor: isActive ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                  outline: "none"
                }}
              >
                <div style={{
                  position: "relative", height: "100%", width: "100%",
                  borderRadius: 28, padding: 28, textAlign: "left", color: "#f5f6fb",
                  background:
                    "linear-gradient(160deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 60%)," +
                    "linear-gradient(180deg,rgba(10,12,22,.85),rgba(10,12,22,.95))",
                  border: "1px solid rgba(255,255,255,.08)",
                  boxShadow: isActive
                    ? `0 40px 120px -20px ${accent}55, 0 10px 40px -10px ${accent2}40, inset 0 1px 0 rgba(255,255,255,.08)`
                    : "0 20px 60px -20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)",
                  overflow: "hidden", backdropFilter: "blur(12px)",
                  display: "flex", flexDirection: "column",
                }}>
                  <div aria-hidden style={{
                    position: "absolute", top: -120, right: -120,
                    width: 320, height: 320, borderRadius: "50%",
                    background: `radial-gradient(closest-side, ${s.color}55, transparent 70%)`,
                    filter: "blur(20px)", animation: "ssPulseGlow 4s ease-in-out infinite",
                    pointerEvents: "none",
                  }}/>
                  <div aria-hidden style={{
                    position: "absolute", bottom: -140, left: -100,
                    width: 320, height: 320, borderRadius: "50%",
                    background: `radial-gradient(closest-side, ${accent2}44, transparent 70%)`,
                    filter: "blur(24px)", pointerEvents: "none",
                  }}/>

                  <div style={{
                    position: "relative", width: 64, height: 64, borderRadius: 18,
                    display: "grid", placeItems: "center", fontSize: 30,
                    background: `linear-gradient(135deg, ${s.color}, ${accent2})`,
                    boxShadow: `0 10px 30px -10px ${s.color}aa`,
                  }}>
                    {s.icon}
                  </div>

                  <div style={{
                    position: "absolute", top: 28, right: 28,
                    display: "inline-flex", alignItems: "baseline", gap: 8,
                    padding: "8px 14px", borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.04)", backdropFilter: "blur(10px)",
                    fontSize: 12, color: "rgba(255,255,255,.8)",
                  }}>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 14, letterSpacing: "-0.01em" }}>
                      {s.stats[0]}
                    </span>
                    <span style={{ opacity: .7 }}>{s.stats[1]}</span>
                  </div>

                  <div style={{ marginTop: "auto", position: "relative" }}>
                    <div style={{
                      fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase",
                      color: "rgba(255,255,255,.55)", marginBottom: 10,
                    }}>
                      {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                    </div>
                    <h3 style={{
                      margin: 0, fontFamily: "'Playfair Display',serif",
                      fontSize: 30, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700,
                    }}>{s.title}</h3>
                    <p style={{ margin: "12px 0 0", color: "rgba(229,231,235,.7)", fontSize: 15, lineHeight: 1.6 }}>
                      {s.description}
                    </p>

                    <div style={{
                      display: "grid",
                      gridTemplateRows: isActive && hovering ? "1fr" : "0fr",
                      transition: "grid-template-rows 500ms ease",
                    }}>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{
                          margin: "14px 0 0", fontSize: 13, lineHeight: 1.7,
                          color: "rgba(229,231,235,.6)",
                          animation: isActive && hovering ? "ssFadeUp 500ms ease both" : undefined,
                        }}>
                          {s.detail}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginTop: 22 }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPage && setPage("contact"); }}
                        style={{
                          position: "relative", display: "inline-flex", alignItems: "center", gap: 10,
                          padding: "12px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700,
                          color: "#0b0c14", border: "none", cursor: "pointer",
                          background: `linear-gradient(135deg, ${s.color}, ${accent2})`,
                          boxShadow: `0 12px 30px -12px ${s.color}cc`,
                          overflow: "hidden", fontFamily: "inherit",
                        }}
                      >
                        Explore Service ›
                        <span aria-hidden style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)",
                          backgroundSize: "200% 100%", animation: "ssShimmer 2.6s linear infinite",
                          mixBlendMode: "overlay", pointerEvents: "none",
                        }}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ArrowBtn side="left" onClick={() => go(-1)} />
        <ArrowBtn side="right" onClick={() => go(1)} />
      </section>

      <div style={{
        position: "relative", zIndex: 3, display: "flex", gap: 10,
        justifyContent: "center", padding: "32px 0 80px",
      }}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.title}`}
              style={{
                width: isActive ? 32 : 10, height: 10, borderRadius: 999,
                border: "1px solid rgba(255,255,255,.15)",
                background: isActive
                  ? `linear-gradient(90deg, ${s.color}, ${accent2})`
                  : "rgba(255,255,255,.08)",
                cursor: "pointer", transition: "all 400ms ease",
                boxShadow: isActive ? `0 0 18px ${s.color}88` : "none",
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
