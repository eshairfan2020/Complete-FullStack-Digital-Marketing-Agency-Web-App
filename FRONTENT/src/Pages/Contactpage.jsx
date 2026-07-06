// src/pages/ContactPage.jsx
import { useState } from "react";
import { SERVICES } from "../data/content";
import { AnimatedSection } from "../components/AnimatedSection";
import { AskAIWidget } from "../components/AskAIWidget";

const CONTACT_API_URL = "http://localhost:5000/api/contact";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill out all required fields (Name, Email, and Message).");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Your email is incorrect! Please enter a valid email address (e.g., name@company.com).");
      return;
    }

    if (!form.company.trim()) {
      setError("Please enter your Company name.");
      return;
    }

    if (!form.service) {
      setError("Please select a Service you are interested in.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send your message.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.1),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Ready to <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Elevate</span> Your Brand?
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto" }}>Book a free strategy call. No obligations — just actionable insights for your business.</p>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" }} className="contact-grid">
        <AnimatedSection>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "#fafafa", marginBottom: 24 }}>Let's talk results</h2>
            {[{ icon: "✉️", label: "hello@elevatedigital.com" }, { icon: "📞", label: "+1 (555) 123-4567" }, { icon: "📍", label: "New York, NY" }].map((d) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 20 }}>{d.icon}</span>
                <span style={{ color: "#fafafa", fontSize: 15 }}>{d.label}</span>
              </div>
            ))}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontWeight: 700, color: "#fafafa", marginBottom: 20 }}>Why clients choose us</div>
              {["No long-term lock-in contracts", "Dedicated senior account manager", "Weekly check-ins and Slack access", "30-day money-back guarantee"].map((v) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "#a1a1aa" }}>
                  <span style={{ color: "#22d3ee", fontWeight: 700 }}>✓</span> {v}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div style={{ padding: 40, background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34,211,238,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", color: "#fafafa", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "#a1a1aa" }}>We will reach out within 24 hours with your free audit findings.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", padding: "14px", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.3)", fontSize: "14px", fontWeight: 500 }}>
                    ⚠️ {error}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["name", "Full Name", "text", "John Doe"], ["email", "Email Address", "text", "john@company.com"]].map(([n, l, t, p]) => (
                    <div key={n}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 8 }}>{l}</label>
                      <input name={n} type={t} placeholder={p} value={form[n]} onChange={handle}
                        style={{ width: "100%", padding: "12px 16px", background: "#08080e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fafafa", fontSize: 15, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = "#6366f1"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 8 }}>Company</label>
                  <input name="company" type="text" placeholder="Your Company" value={form.company} onChange={handle}
                    style={{ width: "100%", padding: "12px 16px", background: "#08080e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fafafa", fontSize: 15, outline: "none", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 8 }}>Service Interested In</label>
                  <select name="service" value={form.service} onChange={handle}
                    style={{ width: "100%", padding: "12px 16px", background: "#08080e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: form.service ? "#fafafa" : "#666", fontSize: 15, outline: "none", fontFamily: "inherit", appearance: "none" }}>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.icon} {s.title}</option>)}
                    <option value="full">🚀 Full-Service Package</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 8 }}>Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your project..." value={form.message} onChange={handle}
                    style={{ width: "100%", padding: "12px 16px", background: "#08080e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fafafa", fontSize: 15, outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 110 }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>

                <button type="submit" disabled={submitting}
                  style={{ padding: "16px", background: submitting ? "#2a2a3a" : "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", transition: "transform 0.2s,box-shadow 0.2s", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(99,102,241,0.3)" }}
                  onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(99,102,241,0.45)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.3)"; }}>
                  {submitting ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <AskAIWidget />
    </main>
  );
}
