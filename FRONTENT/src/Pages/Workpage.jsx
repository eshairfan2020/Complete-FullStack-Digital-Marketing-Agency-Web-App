// src/pages/WorkPage.jsx
import { useState } from "react";
import { PROJECTS } from "../data/content";
import { AnimatedSection } from "../components/AnimatedSection";
import { Card3D } from "../components/Card3D";

export function WorkPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      {selected !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", animation: "fadeIn 0.3s ease" }}
          onClick={() => setSelected(null)}>
          <div style={{ maxWidth: 700, width: "100%", background: "#12121c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, overflow: "hidden", maxHeight: "90vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ height: 220, background: `linear-gradient(135deg,${PROJECTS[selected].color}40,${PROJECTS[selected].color}15)`, position: "relative", overflow: "hidden" }}>
              <img src={PROJECTS[selected].image} alt={PROJECTS[selected].title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, mixBlendMode: "luminosity" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "28px 32px" }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PROJECTS[selected].color, background: `${PROJECTS[selected].color}20`, padding: "4px 12px", borderRadius: 50, marginBottom: 12, display: "inline-block" }}>{PROJECTS[selected].category}</span>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa" }}>{PROJECTS[selected].title}</h2>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fafafa", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ padding: 32 }}>
              <p style={{ color: "#a1a1aa", lineHeight: 1.75, marginBottom: 28, fontSize: "1.05rem" }}>{PROJECTS[selected].description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
                <div style={{ padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>The Challenge</div>
                  <p style={{ fontSize: 14, color: "#c4c4cc", lineHeight: 1.7 }}>{PROJECTS[selected].challenge}</p>
                </div>
                <div style={{ padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Our Solution</div>
                  <p style={{ fontSize: 14, color: "#c4c4cc", lineHeight: 1.7 }}>{PROJECTS[selected].solution}</p>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Results</div>
                {PROJECTS[selected].results.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#fafafa", marginBottom: 8 }}>
                    <span style={{ color: PROJECTS[selected].color, fontWeight: 700 }}>✓</span> {r}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {PROJECTS[selected].services.map((s) => (
                  <span key={s} style={{ padding: "6px 14px", background: `${PROJECTS[selected].color}15`, border: `1px solid ${PROJECTS[selected].color}40`, borderRadius: 50, fontSize: 13, color: PROJECTS[selected].color, fontWeight: 600 }}>{s}</span>
                ))}
                <span style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, fontSize: 13, color: "#a1a1aa" }}>⏱ {PROJECTS[selected].duration}</span>
              </div>
              <button onClick={() => { setSelected(null); setPage("contact"); }}
                style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg,${PROJECTS[selected].color},#22d3ee)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Start a Similar Project →
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(34,211,238,0.08),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>Our Work</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Results That <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Speak for Themselves</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Click any project to see the full case study.</p>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))", gap: 32 }}>
          {PROJECTS.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}>
              <Card3D>
                <div style={{ background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setSelected(i)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.color + "60"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,rgba(0,0,0,0.8),transparent 50%)` }} />
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%,${p.color}30,transparent 60%)` }} />
                    <div style={{ position: "absolute", top: 20, left: 20 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 50, border: `1px solid ${p.color}60` }}>{p.category}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#fafafa" }}>{p.title}</h3>
                      <span style={{ fontSize: 14, fontWeight: 700, color: p.color, background: `${p.color}20`, padding: "6px 14px", borderRadius: 50, whiteSpace: "nowrap" }}>{p.result}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 14, color: "#a1a1aa" }}>{p.description}</p>
                    <span style={{ color: p.color, fontSize: 20, flexShrink: 0, marginLeft: 16 }}>→</span>
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`}</style>
    </main>
  );
}
