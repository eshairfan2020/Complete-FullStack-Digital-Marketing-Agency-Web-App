// src/pages/AboutPage.jsx
import { TEAM } from "../data/content";
import { AnimatedSection } from "../components/AnimatedSection";
import { Card3D } from "../components/Card3D";

export function AboutPage() {
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh", overflow: "hidden" }}>

      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 60%)", pointerEvents: "none" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>ABOUT US</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            A TEAM OBSESSED WITH <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>YOUR SUCCESS</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px", position: "relative", zIndex: 2 }}>

        <AnimatedSection>
          <div style={{ maxWidth: 1000, margin: "0 auto 100px", display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff", lineHeight: 1.3, marginBottom: 50, fontWeight: 800 }}>
                FOUNDED IN{" "}
                <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>2016</span>{" "}
                WITH ONE{" "}
                <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MISSION</span>{" "}
                MAKE{" "}
                <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MARKETING</span>{" "}
                HONEST.
              </h2>

              <p style={{ color: "#a1a1aa", lineHeight: 1.9, fontSize: 15, maxWidth: 800, margin: "0 auto 20px" }}>
                Elevate Digital was born from frustration. Too many agencies promised
                the moon, delivered mediocre reports, and charged clients for activity
                instead of results. We built something different.
                Today we are a 40-person team of strategists, designers, and data
                scientists serving 250+ brands worldwide.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {[
                ["2016", "Founded"],
                ["250+", "Clients"],
                ["40+", "Team Members"],
                ["$120M+", "Revenue Generated"],
              ].map(([value, label]) => (
                <div key={label} style={{ padding: 30, background: "linear-gradient(135deg,#1d1d2a,#171722)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 50px rgba(0,0,0,.55),0 0 30px rgba(99,102,241,.15)", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color: "#fff", marginBottom: 10 }}>{value}</div>
                  <div style={{ color: "#a1a1aa", fontSize: 14 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "", gridTemplateColumns: "3fr 1fr", alignItems: "start" }}>
              <div style={{ padding: 40, background: "linear-gradient(135deg,#1d1d2a,#171722)", borderRadius: 30, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 50px rgba(0,0,0,.5)" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#fff", lineHeight: 1.7, fontStyle: "italic", marginBottom: 25 }}>
                  "Marketing is no longer about the stuff you make, but the stories you tell."
                </div>
                <div style={{ color: "#818cf8", fontSize: 14, fontWeight: 700, letterSpacing: ".15em" }}>— SETH GODIN</div>
              </div>

              <div style={{
                width: 170, height: 170, padding: 20,
                backgroundColor: "#08080e",
                backgroundImage: "linear-gradient(135deg, rgba(120, 99, 241, 0.12), rgba(34,211,238,0.08))",
                display: "flex", gap: 18,
                boxShadow: "0 15px 30px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                borderRadius: 30,
                border: "1px solid rgba(255,255,255,.08)",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginTop: -40,
                marginInline: "auto",
                marginRight: '5px',
              }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "4rem", color: "#fff", lineHeight: 1 }}>8+</div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, textAlign: "center" }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", color: "#fafafa", marginBottom: 12, textAlign: "center", fontWeight: 800 }}>How We Work</h2>
          <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: 54, fontSize: "16px" }}>Our strategic framework engineered for sustainable performance metrics.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24, marginBottom: 100 }}>
            {[
              { icon: "📊", title: "Data-Driven", desc: "Every decision backed by analytics.", color: "#6366f1" },
              { icon: "🔍", title: "Transparent", desc: "Clear reporting and honest communication.", color: "#22d3ee" },
              { icon: "🎯", title: "Results-Focused", desc: "We measure success by your revenue, not vanity metrics.", color: "#ec4899" },
              { icon: "🤝", title: "Partnership Mindset", desc: "We act as an extension of your team.", color: "#f59e0b" },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <Card3D>
                  <div style={{
                    padding: "45px 38px", height: "100%", borderRadius: 28, position: "relative", overflow: "hidden",
                    background: "linear-gradient(135deg, rgba(18,18,28,.95), rgba(10,10,20,.9))",
                    border: `1px solid ${v.color}35`,
                    boxShadow: `0 0 0 1px ${v.color}20, 0 15px 40px ${v.color}15, 0 25px 60px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.05)`,
                    backdropFilter: "blur(18px)", textAlign: "left", minHeight: '320px'
                  }}>
                    <div style={{ width: 56, height: 56, borderRadius: 18, background: `${v.color}15`, border: `1px solid ${v.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 24, boxShadow: `0 0 20px ${v.color}30` }}>{v.icon}</div>
                    <h3 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.4, marginBottom: 14 }}>{v.title}</h3>
                    <p style={{ color: "#a1a1aa", fontSize: "14.5px", lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
                  </div>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", color: "#fafafa", marginBottom: 12, textAlign: "center", fontWeight: 800 }}>Meet the Team</h2>
          <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: 54, fontSize: "16px" }}>Senior strategists with real-world experience at the world's best companies.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 24 }}>
            {TEAM.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.1}>
                <Card3D>
                  <div style={{
                    padding: "36px 30px", background: "#12121c", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 24, textAlign: "left", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)"
                  }}>
                    <div style={{ width: 68, height: 68, borderRadius: "50%", background: `linear-gradient(135deg,${m.color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: 24, boxShadow: `0 8px 20px ${m.color}30` }}>{m.initials}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>{m.name}</div>
                      <div style={{ color: m.color, fontWeight: 600, fontSize: 14, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 4 }}>{m.role}</div>
                      <p style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "14px", margin: 0 }}>{m.bio}</p>
                    </div>
                  </div>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        .about-hero-grid { grid-template-columns: 1.2fr 0.8fr; }
        @media (max-width: 990px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  );
}
