// src/pages/ServicesPage.jsx
import { useState } from "react";
import { SERVICES } from "../data/content";
import { AnimatedSection } from "../components/AnimatedSection";
import { Card3D } from "../components/Card3D";

export function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", background: "linear-gradient(180deg,#0d0d20,#08080e)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <AnimatedSection>
          <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", marginBottom: 16 }}>Our Services</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Everything You Need to <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Win Online</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Click any service to explore our full approach, methodology, and results.</p>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.07}>
              <Card3D>
                <div style={{ background: "#12121c", border: `1px solid ${active === i ? s.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 24, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setActive(active === i ? null : i)}>
                  <div style={{ padding: "32px 32px 0" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{s.icon}</div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>{s.description}</p>
                  </div>
                  <div style={{ margin: "24px 32px 0", padding: "16px 20px", background: `${s.color}12`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: s.color, letterSpacing: "0.05em" }}>{s.stats[0]}</span>
                    <span style={{ fontSize: 13, color: "#a1a1aa" }}>{s.stats[1]}</span>
                  </div>
                  <div style={{ maxHeight: active === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
                    <div style={{ padding: "24px 32px 32px" }}>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "#c4c4cc" }}>{s.detail}</p>
                      <button onClick={(e) => { e.stopPropagation(); setPage("contact"); }}
                        style={{ marginTop: 20, padding: "10px 24px", background: `linear-gradient(135deg,${s.color},#22d3ee)`, border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: "16px 32px 24px", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: s.color, fontWeight: 600 }}>
                    {active === i ? "▲ Less" : "▼ See full approach"}
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}
