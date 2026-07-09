

import { useState, useEffect, useCallback, useMemo,} from "react";

const ADMIN_API = "http://localhost:5000/api/admin";

const SERVICES = [
  "all",
  "SEO & Content",
  "Social Media",
  "PPC Advertising",
  "Brand Strategy",
  "Web Design",
  "Analytics & Reporting",
];

export function AdminDashboard({ token, onLogout }) {
  const [contacts, setContacts]   = useState([]);
  const [stats, setStats]         = useState({ total: 0, today: 0, this_week: 0 });
  const [search, setSearch]       = useState("");
  const [service, setService]     = useState("all");
  const [loading, setLoading]     = useState(true); // Already defaults to true
  const [deleting, setDeleting]   = useState(null);
  const [error, setError]         = useState("");

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Fetch contacts from backend
  const fetchContacts = useCallback(async (isInitialMount = false) => {
    // FIX: Only call setState if it's not the initial mount to prevent synchronous cascading renders
    if (!isInitialMount) {
      setLoading(true);
    }
    setError("");
    try {
      const params = new URLSearchParams();
      if (search)              params.append("search",  search);
      if (service !== "all")   params.append("service", service);

      const res  = await fetch(`${ADMIN_API}/contacts?${params}`, { headers });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Request failed");
      setContacts(data.contacts || []);
      setStats(data.stats || { total: 0, today: 0, this_week: 0 });
    } catch (err) {
      const errMsg = err?.message || "";
      if (errMsg.includes("token") || errMsg.includes("log in")) {
        onLogout();
      }
      setError(errMsg || "Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }, [search, service, onLogout, headers]);

  // FIXED: Completely decouples the synchronous execution loop 
  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (isMounted) {
        // Pass true to indicate this is the mount fetch
        await fetchContacts(true);
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, service]); 

  // Delete a contact
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact permanently?")) return;
    setDeleting(id);
    try {
      const res  = await fetch(`${ADMIN_API}/contacts/${id}`, { method: "DELETE", headers });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setContacts(prev => prev.filter(c => c.id !== id));
      setStats(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      alert("Could not delete contact: " + (err.message || "Unknown error"));
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dt) => {
    if (!dt) return "—";
    const date = new Date(dt);
    return isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-US", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08080e", fontFamily: "'DM Sans',system-ui,sans-serif" }}>

      {/* Top navbar */}
      <header style={{
        background: "rgba(18,18,28,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 32px", height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>⚡</div>
          <span style={{ color: "#fafafa", fontWeight: 700, fontSize: 16 }}>
            Elevate Digital <span style={{ color: "#6366f1" }}>Admin</span>
          </span>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: "8px 20px", background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10,
            color: "#fca5a5", fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Logout
        </button>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ color: "#fafafa", fontFamily: "'Playfair Display',serif", fontSize: "2rem", margin: 0 }}>
            Contact Submissions
          </h1>
          <p style={{ color: "#a1a1aa", marginTop: 8, fontSize: 14 }}>
            All contact form submissions from your website
          </p>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
          {[
            { label: "Total Contacts", value: stats?.total || 0,     icon: "👥", color: "#6366f1" },
            { label: "Today",          value: stats?.today || 0,     icon: "📅", color: "#22d3ee" },
            { label: "This Week",      value: stats?.this_week || 0, icon: "📈", color: "#34d399" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#12121c", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, padding: "24px 28px",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${s.color}20`, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and filter bar */}
        <div style={{
          display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap",
          background: "#12121c", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: 16,
        }}>
          <input
            type="text"
            placeholder="🔍  Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 200, padding: "10px 16px",
              background: "#08080e", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#fafafa", fontSize: 14,
              outline: "none", fontFamily: "inherit",
            }}
            onFocus={e => e.target.style.borderColor = "#6366f1"}
            onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <select
            value={service}
            onChange={e => setService(e.target.value)}
            style={{
              padding: "10px 16px", background: "#08080e",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
              color: "#fafafa", fontSize: 14, outline: "none",
              fontFamily: "inherit", cursor: "pointer",
            }}
          >
            {SERVICES.map(s => (
              <option key={s} value={s}>{s === "all" ? "All Services" : s}</option>
            ))}
          </select>
          <button
            onClick={() => fetchContacts(false)}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg,#6366f1,#22d3ee)",
              border: "none", borderRadius: 10, color: "#fff",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "14px 18px", color: "#fca5a5", fontSize: 14, marginBottom: 20 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Contacts table */}
        <div style={{
          background: "#12121c", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#a1a1aa" }}>
              Loading contacts...
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ color: "#a1a1aa", fontSize: 15 }}>No contacts found</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["#", "Name", "Email", "Company", "Service", "Message", "Date", "Action"].map(h => (
                      <th key={h} style={{
                        padding: "14px 20px", textAlign: "left",
                        fontSize: 12, fontWeight: 700, color: "#a1a1aa",
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={c.id || i} style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.05)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "16px 20px", color: "#666", fontSize: 13 }}>{c.id || i + 1}</td>
                      <td style={{ padding: "16px 20px", color: "#fafafa", fontWeight: 600, fontSize: 14 }}>{c.name || "—"}</td>
                      <td style={{ padding: "16px 20px", color: "#818cf8", fontSize: 13 }}>{c.email || "—"}</td>
                      <td style={{ padding: "16px 20px", color: "#a1a1aa", fontSize: 13 }}>{c.company || "—"}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                          background: "rgba(99,102,241,0.15)", color: "#818cf8",
                        }}>
                          {c.service || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#a1a1aa", fontSize: 13, maxWidth: 200 }}>
                        <span title={c.message || ""}>
                          {(c.message || "").length > 60 ? (c.message || "").slice(0, 60) + "…" : (c.message || "—")}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#666", fontSize: 12, whiteSpace: "nowrap" }}>
                        {formatDate(c.created_at)}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deleting === c.id}
                          style={{
                            padding: "6px 14px",
                            background: "rgba(239,68,68,0.12)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: 8, color: "#fca5a5",
                            fontSize: 12, fontWeight: 600,
                            cursor: deleting === c.id ? "not-allowed" : "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          {deleting === c.id ? "…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer count */}
        {!loading && contacts.length > 0 && (
          <div style={{ marginTop: 16, textAlign: "right", color: "#666", fontSize: 13 }}>
            Showing {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
          </div>
        )}
      </main>
    </div>
  );
}
