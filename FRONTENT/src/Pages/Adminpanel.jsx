// src/pages/AdminPanel.jsx
import { useState } from "react";
import { AdminLogin }      from "./AdminLogin";
import { AdminDashboard }  from "./AdminDashboard";
import { AdminPayments }   from "./AdminPayments";

export function AdminPanel() {
  const [token,   setToken]   = useState(() => localStorage.getItem("adminToken") || null);
  const [section, setSection] = useState("contacts"); // contacts | payments

  const handleLogin  = (t) => setToken(t);
  const handleLogout = () => { localStorage.removeItem("adminToken"); setToken(null); };

  if (!token) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div style={{ minHeight: "100vh", background: "#08080e", fontFamily: "'DM Sans',system-ui,sans-serif" }}>

      {/* Top navbar */}
      <header style={{
        background: "rgba(18,18,28,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 32px", height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        {/* Left — logo + nav tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#6366f1,#22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>⚡</div>
            <span style={{ color: "#fafafa", fontWeight: 700, fontSize: 16 }}>
              Elevate <span style={{ color: "#6366f1" }}>Admin</span>
            </span>
          </div>

          {/* Section tabs */}
          <nav style={{ display: "flex", gap: 4 }}>
            {[
              ["contacts", "👥 Contacts"],
              ["payments", "💰 Payments"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setSection(id)}
                style={{
                  padding: "6px 16px", borderRadius: 8, fontSize: 13,
                  fontWeight: 600, border: "none", cursor: "pointer",
                  fontFamily: "inherit",
                  background: section === id ? "rgba(99,102,241,0.2)" : "transparent",
                  color:      section === id ? "#818cf8" : "#666",
                }}>
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right — logout */}
        <button onClick={handleLogout}
          style={{
            padding: "7px 18px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10, color: "#fca5a5",
            fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>
          Logout
        </button>
      </header>

      {/* Section content */}
      {section === "contacts" && <AdminDashboard token={token} onLogout={handleLogout} embedded />}
      {section === "payments" && <AdminPayments  token={token} />}
    </div>
  );
}
