// src/pages/HomePage.jsx
import { useState, useEffect, useRef } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ServicesShowcase3D } from "../components/ServicesShowcase3D";

export function HomePage({ setPage }) {
  const [count, setCount] = useState({ a: 0, b: 0, c: 0 });
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, () => ({
      width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      animationDuration: 4 + Math.random() * 6, animationDelay: Math.random() * 4,
      background: Math.random() > 0.5 ? "#6366f1" : "#22d3ee",
    }))
  );

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.5 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { a: 250, b: 98, c: 32 };
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount({ a: Math.floor(ease * targets.a), b: Math.floor(ease * targets.b), c: Math.floor(ease * targets.c) });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVisible]);

  return (
    <main>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#08080e" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.25),transparent 70%)", top: -200, right: -200, animation: "float1 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.15),transparent 70%)", bottom: -100, left: -100, animation: "float2 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at 50% 50%,black 30%,transparent 80%)" }} />
          {particles.map((p, i) => (
            <div key={i} style={{ position: "absolute", width: p.width, height: p.height, borderRadius: "50%", background: p.background, opacity: 0.4, left: p.left, top: p.top, animation: `particle ${p.animationDuration}s ease-in-out infinite`, animationDelay: `${p.animationDelay}s` }} />
          ))}
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", position: "relative", textAlign: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease forwards", opacity: 0, marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 50, fontSize: 13, fontWeight: 600, color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, background: "#22d3ee", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Award-Winning Digital Agency
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, color: "#fafafa", lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.02em", animation: "fadeUp 0.8s 0.15s ease forwards", opacity: 0, textAlign: "center" }}>
            We Grow Brands That{" "}
            <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dominate Online</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75, maxWidth: 580, marginBottom: 44, color: "#a1a1aa", animation: "fadeUp 0.8s 0.3s ease forwards", opacity: 0, margin: "0 auto 44px auto", textAlign: "center" }}>
            Strategy, creativity, and data-driven campaigns that turn clicks into customers. Partner with Elevate Digital and watch your business scale beyond expectations.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, animation: "fadeUp 0.8s 0.45s ease forwards", opacity: 0, justifyContent: "center" }}>
            <button onClick={() => setPage("contact")}
              style={{ padding: "16px 36px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)", transition: "transform 0.2s,box-shadow 0.2s", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Start Your Project →
            </button>
            <button onClick={() => setPage("work")}
              style={{ padding: "16px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, color: "#fafafa", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s,background 0.2s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "transparent"; }}>
              View Our Work
            </button>
          </div>

          <div ref={statsRef} style={{ display: "flex", flexWrap: "wrap", gap: 48, marginTop: 72, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)", animation: "fadeUp 0.8s 0.6s ease forwards", opacity: 0, justifyContent: "center" }}>
            {[
              { val: `${count.a}+`, label: "Clients Served" },
              { val: "3.2x", label: "Avg. ROI Increase" },
              { val: `${count.b}%`, label: "Client Retention" },
              { val: `${count.c}+`, label: "Campaigns Launched" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: "#fafafa", lineHeight: 1, marginBottom: 6, letterSpacing: "0.05em" }}>{s.val}</div>
                <div style={{ fontSize: 14, color: "#a1a1aa" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesShowcase3D setPage={setPage} />

      {/* CTA BAND */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.08))", borderTop: "1px solid rgba(99,102,241,0.2)", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
        <AnimatedSection style={{ textAlign: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20, textAlign: "center" }}>
              Ready to see what's possible?
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 36px auto", lineHeight: 1.7, textAlign: "center" }}>
              Book a free 30-minute strategy call. No pitch decks, just honest insights about your growth potential.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => setPage("contact")}
                style={{ padding: "18px 48px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 40px rgba(99,102,241,0.4)", transition: "transform 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}>
                Book Free Strategy Call
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
        @keyframes float2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes particle{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
      `}</style>
    </main>
  );
}
