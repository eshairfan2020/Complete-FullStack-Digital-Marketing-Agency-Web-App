// src/components/AskAIWidget.jsx
import { useState } from "react";
import { askAssistant } from "../lib/assistant.function";
import { AnimatedSection } from "./AnimatedSection";

export function AskAIWidget() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await askAssistant({ question: question.trim() });
      if (!res.success) throw new Error(res.error || "Something went wrong.");
      setResult(res);
    } catch (e) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto 100px", padding: "0 24px" }}>
      <AnimatedSection>
        <div style={{ padding: 40, background: "linear-gradient(160deg,#12121c,#0c0c14)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>🤖</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#fafafa", margin: 0 }}>
              Ask Our <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Assistant</span>
            </h2>
          </div>
          <p style={{ color: "#a1a1aa", marginBottom: 24, fontSize: 14 }}>
            Ask anything about our services.
          </p>

          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='e.g. "How can you help me rank on Google?"'
            style={{ width: "100%", padding: "14px 16px", background: "#08080e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fafafa", fontSize: 15, outline: "none", fontFamily: "inherit", resize: "vertical", marginBottom: 16 }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <button
              onClick={ask}
              disabled={loading || !question.trim()}
              style={{
                padding: "12px 28px",
                background: loading || !question.trim() ? "#2a2a3a" : "linear-gradient(135deg,#6366f1,#22d3ee)",
                border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: loading || !question.trim() ? "not-allowed" : "pointer",
                fontFamily: "inherit", boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
              }}
            >
              {loading ? "Thinking…" : "Ask AI →"}
            </button>
          </div>

          {error && (
            <div style={{ padding: 16, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, color: "#fca5a5", fontSize: 14 }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{ padding: 20, background: "#08080e", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 10 }}>
                AI Response
              </div>
              <div style={{ color: "#fafafa", fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {result.answer}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
