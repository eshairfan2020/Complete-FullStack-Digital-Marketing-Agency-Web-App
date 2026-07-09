// src/pages/AdminLogin.jsx
import { useState } from "react";

const ADMIN_API = "http://localhost:5000/api/admin";

export function AdminLogin({ onLogin }) {
  const [form, setForm]       = useState({ username: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${ADMIN_API}/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // Save token to localStorage
      localStorage.setItem("adminToken", data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#08080e",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans',system-ui,sans-serif", padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
          }}>🔐</div>
          <h1 style={{ color: "#fafafa", fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", margin: 0 }}>
            Admin Panel
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: 14, marginTop: 8 }}>
            Elevate Digital — Internal Access Only
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: "#12121c", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, padding: 36,
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "12px 16px", color: "#fca5a5", fontSize: 14 }}>
                ⚠️ {error}
              </div>
            )}

            {[
              ["username", "Username", "text",     "admin"],
              ["password", "Password", "password", "••••••••"],
            ].map(([name, label, type, placeholder]) => (
              <div key={name}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 8 }}>
                  {label}
                </label>
                <input
                  name={name} type={type} placeholder={placeholder}
                  value={form[name]} onChange={handle}
                  style={{
                    width: "100%", padding: "12px 16px", background: "#08080e",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                    color: "#fafafa", fontSize: 15, outline: "none", fontFamily: "inherit",
                  }}
                  onFocus={e => e.target.style.borderColor = "#6366f1"}
                  onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
            ))}

            <button
              type="submit" disabled={loading}
              style={{
                padding: "13px", marginTop: 4,
                background: loading ? "#2a2a3a" : "linear-gradient(135deg,#6366f1,#22d3ee)",
                border: "none", borderRadius: 12, color: "#fff",
                fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Logging in…" : "Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
