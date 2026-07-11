import { useState, useEffect, useRef } from "react";

const CHAT_URL   = "http://localhost:5000/api/chat";
const WHATSAPP   = "https://wa.me/15551234567"; // ← replace with your real WhatsApp number

// ── Suggested quick questions ──────────────────────────────────────────────────
const QUICK_QUESTIONS = [
  "How do I book a service?",
  "What services do you offer?",
  "How can I contact you?",
  "Do you offer a free audit?",
  "Tell me about SEO",
];

export function AuraWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "aura",
      text: "Hi! 👋 I'm AURA, your Eko Stack Digital AI assistant. Ask me anything about our services, pricing, or how to get started!",
    },
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [bounce,   setBounce]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Bounce animation every 8 seconds when closed
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 1000);
    }, 8000);
    return () => clearInterval(id);
  }, [open]);

  const sendMessage = async (text) => {
    const q = (text || input).trim();
    if (!q) return;

    setMessages(prev => [...prev, { from: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch(CHAT_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        from: "aura",
        text: data.success ? data.answer : "Sorry, I couldn't process that. Please try again! 😊",
      }]);
    } catch {
      setMessages(prev => [...prev, {
        from: "aura",
        text: "Hmm, I'm having trouble connecting right now. Please try again or message us on WhatsApp! 💬",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Global styles ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes aura-bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-14px)} 70%{transform:translateY(-6px)} }
        @keyframes aura-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes aura-pop    { from{transform:scale(0.7) translateY(20px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes aura-eye    { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.1)} }
        @keyframes aura-pulse  { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)} 70%{box-shadow:0 0 0 12px rgba(99,102,241,0)} }
        @keyframes aura-typing { 0%,80%,100%{transform:scale(0);opacity:0.5} 40%{transform:scale(1);opacity:1} }
        @keyframes wa-pop      { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .aura-msg-user  { background:linear-gradient(135deg,#6366f1,#22d3ee); color:#fff; border-radius:18px 18px 4px 18px; align-self:flex-end; }
        .aura-msg-aura  { background:rgba(255,255,255,0.08); color:#fafafa; border-radius:18px 18px 18px 4px; border:1px solid rgba(255,255,255,0.1); align-self:flex-start; }
        .aura-dot { width:7px;height:7px;border-radius:50%;background:#a1a1aa;display:inline-block; }
        .aura-dot:nth-child(1){animation:aura-typing 1.2s ease infinite .0s}
        .aura-dot:nth-child(2){animation:aura-typing 1.2s ease infinite .2s}
        .aura-dot:nth-child(3){animation:aura-typing 1.2s ease infinite .4s}
      `}</style>

      {/* ── WhatsApp button ─────────────────────────────────────────────────── */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 108, right: 24, zIndex: 9998,
          width: 52, height: 52, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          textDecoration: "none", animation: "wa-pop 0.4s 0.8s cubic-bezier(.34,1.56,.64,1) both",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(37,211,102,0.7)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";   e.currentTarget.style.boxShadow="0 4px 20px rgba(37,211,102,0.5)"; }}
        title="Message us on WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* WhatsApp tooltip */}
        <div style={{
          position: "absolute", right: 62, top: "50%", transform: "translateY(-50%)",
          background: "#25D366", color: "#fff", fontSize: 12, fontWeight: 600,
          padding: "5px 10px", borderRadius: 20, whiteSpace: "nowrap",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)", pointerEvents: "none",
          fontFamily: "'DM Sans',sans-serif",
        }}>
          Message us on WhatsApp
          <div style={{ position:"absolute", right:-5, top:"50%", transform:"translateY(-50%)", width:0, height:0, borderLeft:"6px solid #25D366", borderTop:"5px solid transparent", borderBottom:"5px solid transparent" }}/>
        </div>
      </a>

      {/* ── AURA robot button ───────────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          cursor: "pointer", userSelect: "none",
          animation: bounce ? "aura-bounce 1s ease" : "aura-float 3s ease-in-out infinite",
        }}
      >
        {/* Notification dot */}
        {!open && (
          <div style={{
            position: "absolute", top: -2, right: -2,
            width: 14, height: 14, borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            border: "2px solid #08080e",
            animation: "aura-pulse 2s infinite",
            zIndex: 1,
          }}/>
        )}

        {/* Robot SVG */}
        <svg width="72" height="80" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow behind robot */}
          <ellipse cx="36" cy="76" rx="22" ry="6" fill="rgba(99,102,241,0.3)"/>

          {/* Robot body */}
          <rect x="16" y="44" width="40" height="28" rx="12" fill="url(#bodyGrad)"/>

          {/* Body sheen */}
          <rect x="20" y="48" width="32" height="8" rx="6" fill="rgba(255,255,255,0.12)"/>

          {/* Chest light */}
          <rect x="29" y="56" width="14" height="8" rx="4" fill="rgba(34,211,238,0.25)" stroke="rgba(34,211,238,0.6)" strokeWidth="1"/>
          <rect x="31" y="58" width="10" height="4" rx="2" fill="#22d3ee" opacity="0.8"/>

          {/* Arms */}
          <rect x="4"  y="48" width="11" height="18" rx="5" fill="url(#armGrad)"/>
          <rect x="57" y="48" width="11" height="18" rx="5" fill="url(#armGrad)"/>

          {/* Head */}
          <rect x="10" y="6" width="52" height="42" rx="20" fill="url(#headGrad)"/>

          {/* Head sheen */}
          <ellipse cx="36" cy="14" rx="18" ry="8" fill="rgba(255,255,255,0.15)"/>

          {/* Ears / side panels */}
          <rect x="6"  y="16" width="8" height="20" rx="4" fill="url(#earGrad)"/>
          <rect x="58" y="16" width="8" height="20" rx="4" fill="url(#earGrad)"/>

          {/* Eyes */}
          <ellipse cx="26" cy="28" rx="7" ry="7" fill="white"/>
          <ellipse cx="46" cy="28" rx="7" ry="7" fill="white"/>
          <ellipse cx="27" cy="28" rx="4.5" ry="4.5" fill="#1e1b4b"/>
          <ellipse cx="47" cy="28" rx="4.5" ry="4.5" fill="#1e1b4b"/>
          {/* Eye shine */}
          <ellipse cx="28.5" cy="26.5" rx="1.5" ry="1.5" fill="white" opacity="0.9"/>
          <ellipse cx="48.5" cy="26.5" rx="1.5" ry="1.5" fill="white" opacity="0.9"/>
          {/* Iris color */}
          <ellipse cx="27" cy="28" rx="2.5" ry="2.5" fill="#22d3ee" opacity="0.7"/>
          <ellipse cx="47" cy="28" rx="2.5" ry="2.5" fill="#22d3ee" opacity="0.7"/>

          {/* Mouth — smile */}
          <path d="M28 37 Q36 43 44 37" stroke="rgba(99,102,241,0.8)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

          {/* Antenna */}
          <line x1="36" y1="6" x2="36" y2="0" stroke="rgba(99,102,241,0.6)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="36" cy="0" r="3" fill="#6366f1"/>

          <defs>
            <linearGradient id="headGrad" x1="10" y1="6" x2="62" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#e0e7ff"/>
              <stop offset="100%" stopColor="#c7d2fe"/>
            </linearGradient>
            <linearGradient id="bodyGrad" x1="16" y1="44" x2="56" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#f0f4ff"/>
              <stop offset="100%" stopColor="#dde5ff"/>
            </linearGradient>
            <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#c7d2fe"/>
              <stop offset="100%" stopColor="#a5b4fc"/>
            </linearGradient>
            <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
          </defs>
        </svg>

        {/* AURA label */}
        <div style={{
          position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg,#6366f1,#22d3ee)",
          color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "2px 8px", borderRadius: 10,
          fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}>AURA AI</div>
      </div>

      {/* ── Chat window ─────────────────────────────────────────────────────── */}
      {open && (
        <div style={{
          position: "fixed", bottom: 118, right: 24, zIndex: 9998,
          width: "min(380px, calc(100vw - 48px))",
          background: "linear-gradient(160deg,#12121c,#0c0c18)",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)",
          display: "flex", flexDirection: "column",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          animation: "aura-pop 0.35s cubic-bezier(.34,1.56,.64,1)",
          overflow: "hidden",
          maxHeight: "70vh",
        }}>

          {/* Header */}
          <div style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(34,211,238,0.1))",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            {/* Mini robot avatar */}
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}>🤖</div>
            <div>
              <div style={{ color: "#fafafa", fontWeight: 700, fontSize: 15 }}>AURA</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", animation: "aura-pulse 2s infinite" }}/>
                <span style={{ color: "#34d399", fontSize: 12 }}>Online — always here to help</span>
              </div>
            </div>
            {/* WhatsApp mini button in header */}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.4)", borderRadius: 20, textDecoration: "none", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span style={{ color: "#25D366", fontSize: 12, fontWeight: 600 }}>WhatsApp</span>
            </a>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: 10,
            scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}>
            {messages.map((m, i) => (
              <div key={i} className={`aura-msg-${m.from}`} style={{
                padding: "10px 14px", fontSize: 14, lineHeight: 1.55,
                maxWidth: "85%", wordBreak: "break-word",
              }}>
                {m.text}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="aura-msg-aura" style={{ padding: "10px 16px", display: "flex", gap: 5, alignItems: "center" }}>
                <div className="aura-dot"/>
                <div className="aura-dot"/>
                <div className="aura-dot"/>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div style={{ padding: "0 12px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {QUICK_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  padding: "6px 12px", fontSize: 12, fontWeight: 500,
                  background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: 20, color: "#818cf8", cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(99,102,241,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(99,102,241,0.12)"; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", gap: 8, alignItems: "flex-end",
          }}>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask AURA anything..."
              style={{
                flex: 1, padding: "10px 14px", resize: "none",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14, color: "#fafafa", fontSize: 14,
                outline: "none", fontFamily: "inherit",
                maxHeight: 80, lineHeight: 1.4,
              }}
              onFocus={e  => e.target.style.borderColor = "#6366f1"}
              onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: loading || !input.trim() ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#6366f1,#22d3ee)",
                border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: "8px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 11, color: "#444", fontFamily: "inherit" }}>
              Powered by AURA AI · Eko Stack Digital
            </span>
          </div>
        </div>
      )}
    </>
  );
}



export default AuraWidget;
