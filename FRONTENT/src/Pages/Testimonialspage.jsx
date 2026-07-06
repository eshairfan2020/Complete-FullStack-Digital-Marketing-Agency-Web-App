// src/pages/TestimonialsPage.jsx
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data/content";
import { AnimatedSection } from "../components/AnimatedSection";
import { Card3D } from "../components/Card3D";

export function TestimonialsPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.1),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>Testimonials</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            What Our <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Clients Say</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" }}>
        <AnimatedSection>
          <div style={{ padding: "48px", background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, marginBottom: 40, position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${TESTIMONIALS[active].color},#22d3ee)`, transition: "all 0.5s" }} />
            <div style={{ fontSize: 60, color: TESTIMONIALS[active].color, opacity: 0.3, fontFamily: "Georgia,serif", lineHeight: 0.8, marginBottom: 24 }}>"</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "#fafafa", lineHeight: 1.7, marginBottom: 36, transition: "all 0.4s" }}>
              {TESTIMONIALS[active].quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${TESTIMONIALS[active].color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{TESTIMONIALS[active].initials}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "#fafafa" }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontSize: 13, color: "#a1a1aa" }}>{TESTIMONIALS[active].role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5, background: i === active ? TESTIMONIALS[active].color : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <Card3D>
                <div style={{ padding: 24, background: "#12121c", border: `1px solid ${i === active ? t.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setActive(i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fafafa", fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#a1a1aa" }}>{t.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65, fontStyle: "italic" }}>"{t.quote.slice(0, 100)}..."</p>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}
