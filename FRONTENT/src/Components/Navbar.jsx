// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/content";
import { useScrollProgress } from "../hooks/useScrollProgress";

export function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, height: "3px", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#22d3ee)", zIndex: 2000, transition: "width 0.1s" }} />

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "72px", background: scrolled ? "rgba(8,8,14,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent", transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", letterSpacing: "0.05em", color: "#fafafa" }}>
            <span style={{ width: 38, height: 38, background: "linear-gradient(135deg,#6366f1,#22d3ee)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 900 }}>E</span>
            Elevate <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Digital</span>
          </button>

          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.page} onClick={() => navigate(l.page)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: page === l.page ? "#fafafa" : "#a1a1aa", transition: "color 0.2s", fontFamily: "inherit", position: "relative", padding: "4px 0" }}>
                {l.label}
                {page === l.page && (<span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#6366f1,#22d3ee)", borderRadius: 2 }} />)}
              </button>
            ))}
            <button onClick={() => navigate("contact")}
              style={{ padding: "10px 22px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(99,102,241,0.4)", transition: "transform 0.2s,box-shadow 0.2s", fontFamily: "inherit" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Free Audit
            </button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4 }}
            className="mobile-toggle">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 24, height: 2, background: "#fafafa", borderRadius: 2, transition: "transform 0.3s, opacity 0.3s", transform: menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </header>

      <div style={{ position: "fixed", inset: "72px 0 0 0", background: "rgba(8,8,14,0.98)", backdropFilter: "blur(20px)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s ease" }}>
        {NAV_LINKS.map((l) => (
          <button key={l.page} onClick={() => navigate(l.page)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "2rem", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "0.1em", color: page === l.page ? "#fafafa" : "#666", transition: "color 0.2s" }}>
            {l.label}
          </button>
        ))}
        <button onClick={() => navigate("contact")}
          style={{ padding: "14px 40px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer" }}>
          Free Audit
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap');
        @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-toggle { display: flex !important; } }
      `}</style>
    </>
  );
}
