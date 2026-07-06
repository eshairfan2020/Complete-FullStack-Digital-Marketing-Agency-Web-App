// src/components/Footer.jsx
import { useState } from "react";

export function Footer({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const [legalOpen, setLegalOpen] = useState(null);

  const legalContent = {
    "Privacy Policy": { icon: "🔒", body: "We collect only the information you provide directly to us (name, email, company) when you fill out our contact form. We never sell your data to third parties. Your information is used solely to respond to your inquiry and provide our marketing services. You may request deletion of your data at any time by emailing hello@elevatedigital.com." },
    "Terms of Service": { icon: "📄", body: "By using this website and engaging our services, you agree that all work produced by Elevate Digital remains our intellectual property until final payment is received. Project timelines are estimates and may vary. We require a 50% deposit before work begins. Either party may terminate a project with 14 days written notice." },
    "Cookie Policy": { icon: "🍪", body: "This website uses cookies to improve your browsing experience. We use essential cookies (required for the site to function), analytics cookies (to understand how visitors use our site via Google Analytics), and preference cookies (to remember your settings). You can disable non-essential cookies in your browser settings at any time." },
  };

  const footerSections = [
    { title: "Services", links: [
      { label: "SEO & Content", action: () => navigate("services") },
      { label: "Social Media", action: () => navigate("services") },
      { label: "PPC Advertising", action: () => navigate("services") },
      { label: "Web Design", action: () => navigate("services") },
      { label: "Analytics & Reporting", action: () => navigate("services") },
      { label: "Brand Strategy", action: () => navigate("services") },
    ]},
    { title: "Company", links: [
      { label: "About Us", action: () => navigate("about") },
      { label: "Our Work", action: () => navigate("work") },
      { label: "Testimonials", action: () => navigate("testimonials") },
      { label: "Contact Us", action: () => navigate("contact") },
    ]},
    { title: "Legal", links: [
      { label: "Privacy Policy", action: () => setLegalOpen("Privacy Policy") },
      { label: "Terms of Service", action: () => setLegalOpen("Terms of Service") },
      { label: "Cookie Policy", action: () => setLegalOpen("Cookie Policy") },
    ]},
  ];

  const socials = [
    { icon: "𝕏", url: "https://twitter.com", label: "Twitter" },
    { icon: "in", url: "https://linkedin.com", label: "LinkedIn" },
    { icon: "📷", url: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <>
      {legalOpen && (
        <div onClick={() => setLegalOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 16px", animation: "fadeIn 0.25s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 680, background: "#12121c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px 24px 0 0", padding: "36px 36px 48px", animation: "slideUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94)", maxHeight: "75vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>{legalContent[legalOpen].icon}</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 800, color: "#fafafa", margin: 0 }}>{legalOpen}</h2>
              </div>
              <button onClick={() => setLegalOpen(null)} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fafafa", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ height: 2, background: "linear-gradient(90deg,#6366f1,#22d3ee)", borderRadius: 2, marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: "#c4c4cc", lineHeight: 1.85, margin: 0 }}>{legalContent[legalOpen].body}</p>
            <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
              Questions? Email us at{" "}
              <span style={{ color: "#818cf8", cursor: "pointer" }} onClick={() => { setLegalOpen(null); navigate("contact"); }}>hello@elevatedigital.com</span>
            </p>
          </div>
        </div>
      )}

      <footer style={{ background: "#06060d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
            <div>
              <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#fafafa", marginBottom: 16 }}>
                <span style={{ width: 32, height: 32, background: "linear-gradient(135deg,#6366f1,#22d3ee)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>E</span>
                Elevate <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Digital</span>
              </button>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>Full-service digital marketing agency helping brands grow online since 2016.</p>
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s) => (
                  <button key={s.label} onClick={() => window.open(s.url, "_blank")} title={s.label}
                    style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", cursor: "pointer", fontSize: 14, background: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fafafa"; e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "transparent"; }}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fafafa", marginBottom: 16 }}>{section.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <button onClick={link.action} style={{ fontSize: 14, color: "#666", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", padding: 0, textAlign: "left", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#fafafa"}
                        onMouseLeave={e => e.currentTarget.style.color = "#666"}>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#444" }}>© {new Date().getFullYear()} Elevate Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
