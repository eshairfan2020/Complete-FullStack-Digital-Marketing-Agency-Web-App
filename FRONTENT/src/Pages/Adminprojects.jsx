
// / // src/pages/AdminProjects.jsx
import { useState, useEffect, useCallback, useMemo} from "react";

const PROJECT_URL = "http://localhost:5000/api/projects";

const SERVICES = [
  "SEO & Content", "Social Media", "PPC Advertising",
  "Brand Strategy", "Web Design", "Analytics & Reporting", "Full-Service Package",
];

const PROJECT_STATUSES = ["planning","active","review","completed","on-hold"];
const STATUS_META = { planning:{color:"#818cf8",bg:"rgba(129,140,248,0.12)",label:"Planning"}, active:{color:"#34d399",bg:"rgba(52,211,153,0.12)",label:"Active"}, review:{color:"#f59e0b",bg:"rgba(245,158,11,0.12)",label:"In Review"}, completed:{color:"#22d3ee",bg:"rgba(34,211,238,0.12)",label:"Completed"}, "on-hold":{color:"#ef4444",bg:"rgba(239,68,68,0.12)",label:"On Hold"} };
const EMPTY_FORM = { project_name:"", client_name:"", client_email:"", service:"", status:"planning", progress:0, deadline:"", notes:"" };
const IS = { width:"100%", padding:"11px 14px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fafafa", fontSize:14, outline:"none", fontFamily:"inherit" };

export function ProjectForm({ onSubmit, label, form, setField, error, success, saving, onCancel }) {
  return (
    <form onSubmit={onSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
      {error  &&<div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"12px 16px", color:"#fca5a5", fontSize:14 }}>⚠️ {error}</div>}
      {success&&<div style={{ background:"rgba(52,211,153,0.12)", border:"1px solid rgba(52,211,153,0.3)", borderRadius:10, padding:"12px 16px", color:"#6ee7b7", fontSize:14 }}>{success}</div>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {[ ["project_name","Project Name","text","e.g. SEO Campaign Q3"], ["client_name","Client Name","text","e.g. John Smith"], ["client_email","Client Email","email","e.g. john@company.com"], ["deadline","Deadline","date",""] ].map(([key,label,type,ph])=>(
          <div key={key}>
            <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:6 }}>{label}</label>
            <input type={type} placeholder={ph} value={form[key]} onChange={e=>setField(key,e.target.value)} style={IS} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div>
          <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:6 }}>Service</label>
          <select value={form.service} onChange={e=>setField("service",e.target.value)} style={{ ...IS, cursor:"pointer" }}>
            <option value="">Select service</option>
            {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:6 }}>Status</label>
          <select value={form.status} onChange={e=>setField("status",e.target.value)} style={{ ...IS, cursor:"pointer" }}>
            {PROJECT_STATUSES.map(s=><option key={s} value={s}>{STATUS_META[s].label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:10 }}><span>Progress</span><span style={{ color:"#6366f1" }}>{form.progress}%</span></label>
        <input type="range" min="0" max="100" value={form.progress} onChange={e=>setField("progress",e.target.value)} style={{ width:"100%", accentColor:"#6366f1", cursor:"pointer" }}/>
      </div>
      <div style={{ height:8, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${form.progress}%`, background:"linear-gradient(90deg,#6366f1,#22d3ee)", borderRadius:99, transition:"width 0.3s ease" }}/>
      </div>
      <div>
        <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:6 }}>Notes (optional)</label>
        <textarea rows={3} placeholder="Project details..." value={form.notes} onChange={e=>setField("notes",e.target.value)} style={{ ...IS, resize:"vertical" }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <button type="submit" disabled={saving} style={{ flex:1, padding:"13px", background:saving?"#2a2a3a":"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:700, cursor:saving?"not-allowed":"pointer", fontFamily:"inherit" }}>{saving?"Saving…":label}</button>
        <button type="button" onClick={onCancel} style={{ padding:"13px 24px", background:"#1a1a2a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#a1a1aa", fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
      </div>
    </form>
  );
}

export function AdminProjects({ token }) {
  const [projects, setProjects] = useState([]);
  const [stats,    setStats]    = useState({ total:0, active:0, completed:0, overdue:0 });
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [view,     setView]     = useState("list");
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

const headers = useMemo(() => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
}), [token]);

  const setField = (k,v) => setForm(f=>({...f,[k]:v}));

  const fetchProjects = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params=new URLSearchParams();
      if(search) params.append("search",search);
      if(filter!=="all") params.append("status",filter);
      const res=await fetch(`${PROJECT_URL}?${params}`,{headers});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setProjects(data.projects); setStats(data.stats);
    } catch(e){ setError(e.message||"Failed to load."); }
    finally{ setLoading(false); }
  },[search,filter,headers]);

  useEffect(() => {
    const timeoutId = setTimeout(() => { fetchProjects(); }, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchProjects]);

  const handleCreate = async e => {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try {
      const res=await fetch(PROJECT_URL,{method:"POST",headers,body:JSON.stringify({...form,progress:parseInt(form.progress)})});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setSuccess("Project created!"); setForm(EMPTY_FORM); setView("list"); fetchProjects();
    } catch(err){ setError(err.message||"Failed to create."); }
    finally{ setSaving(false); }
  };

  const openEdit = p => { setEditing(p.id); setForm({ project_name:p.project_name, client_name:p.client_name, client_email:p.client_email, service:p.service, status:p.status, progress:p.progress, deadline:p.deadline?.split("T")[0]||"", notes:p.notes||"" }); setView("edit"); setError(""); setSuccess(""); };

  const handleEdit = async e => {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try {
      const res=await fetch(`${PROJECT_URL}/${editing}`,{method:"PUT",headers,body:JSON.stringify({...form,progress:parseInt(form.progress)})});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setSuccess("Project updated!"); setView("list"); setEditing(null); fetchProjects();
    } catch(err){ setError(err.message||"Failed to update."); }
    finally{ setSaving(false); }
  };

  const handleDelete = async id => {
    if(!window.confirm("Delete this project?")) return; setDeleting(id);
    try {
      const res=await fetch(`${PROJECT_URL}/${id}`,{method:"DELETE",headers});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setProjects(p=>p.filter(x=>x.id!==id)); setStats(s=>({...s,total:s.total-1}));
    } catch(err){ alert("Could not delete: "+err.message); }
    finally{ setDeleting(null); }
  };

  const formatDate = d => d?new Date(d).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"—";
  const isOverdue  = (d,s) => s!=="completed"&&new Date(d)<new Date();


  return (
    <main style={{ padding:"32px 24px", maxWidth:1200, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 style={{ color:"#fafafa", fontFamily:"'Playfair Display',serif", fontSize:"2rem", margin:0 }}>Project Dashboard</h1>
          <p style={{ color:"#a1a1aa", marginTop:8, fontSize:14 }}>Manage all client projects in one place</p>
        </div>
        {view==="list"&&<button onClick={()=>{setView("create");setForm(EMPTY_FORM);setError("");setSuccess("");}} style={{ padding:"11px 24px", background:"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:12, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>＋ New Project</button>}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:32 }}>
        {[{label:"Total",value:stats.total,icon:"📁",color:"#6366f1"},{label:"Active",value:stats.active,icon:"🚀",color:"#34d399"},{label:"Completed",value:stats.completed,icon:"✅",color:"#22d3ee"},{label:"Overdue",value:stats.overdue,icon:"⚠️",color:"#ef4444"}].map(s=>(
          <div key={s.label} style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px 22px", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{s.icon}</div>
            <div><div style={{ fontSize:26, fontWeight:700, color:"#fafafa", lineHeight:1 }}>{s.value}</div><div style={{ fontSize:12, color:"#a1a1aa", marginTop:4 }}>{s.label}</div></div>
          </div>
        ))}
      </div>
      {view==="create"&&<div style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:32, marginBottom:32 }}><h2 style={{ color:"#fafafa", fontSize:"1.2rem", fontWeight:700, marginBottom:24 }}>Create New Project</h2><ProjectForm onSubmit={handleCreate} label="Create Project →" form={form} setField={setField} error={error} success={success} saving={saving} onCancel={()=>{setView("list");setError("");setSuccess("");setEditing(null);setForm(EMPTY_FORM);}}/></div>}
      {view==="edit"&&<div style={{ background:"#12121c", border:"1px solid rgba(99,102,241,0.3)", borderRadius:20, padding:32, marginBottom:32 }}><h2 style={{ color:"#fafafa", fontSize:"1.2rem", fontWeight:700, marginBottom:24 }}>Edit Project</h2><ProjectForm onSubmit={handleEdit} label="Save Changes →" form={form} setField={setField} error={error} success={success} saving={saving} onCancel={()=>{setView("list");setError("");setSuccess("");setEditing(null);setForm(EMPTY_FORM);}}/></div>}
      {view==="list"&&(
        <>
          <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap", background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:16 }}>
            <input type="text" placeholder="🔍  Search projects..." value={search} onChange={e=>setSearch(e.target.value)} style={{ ...IS, flex:1, minWidth:200 }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            <select value={filter} onChange={e=>setFilter(e.target.value)} style={{ ...IS, width:"auto", cursor:"pointer" }}>
              <option value="all">All Statuses</option>
              {PROJECT_STATUSES.map(s=><option key={s} value={s}>{STATUS_META[s].label}</option>)}
            </select>
            <button onClick={fetchProjects} style={{ padding:"11px 20px", background:"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Refresh</button>
          </div>
          <div style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            {loading?(<div style={{ textAlign:"center", padding:60, color:"#a1a1aa" }}>Loading projects...</div>):projects.length===0?(<div style={{ textAlign:"center", padding:60 }}><div style={{ fontSize:48, marginBottom:16 }}>📁</div><div style={{ color:"#fafafa", fontSize:16, fontWeight:600, marginBottom:8 }}>No projects yet</div><button onClick={()=>setView("create")} style={{ padding:"10px 24px", background:"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>＋ Create Project</button></div>):(
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead><tr style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>{["Project","Client","Service","Status","Progress","Deadline","Actions"].map(h=><th key={h} style={{ padding:"14px 18px", textAlign:"left", fontSize:12, fontWeight:700, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {projects.map(p=>{
                      const sm=STATUS_META[p.status]||STATUS_META.planning, overdue=isOverdue(p.deadline,p.status);
                      return(
                        <tr key={p.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,0.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <td style={{ padding:"16px 18px", maxWidth:200 }}><div style={{ color:"#fafafa", fontWeight:600, fontSize:14 }}>{p.project_name}</div>{p.notes&&<div style={{ color:"#666", fontSize:12, marginTop:3 }}>{p.notes.slice(0,40)}{p.notes.length>40?"…":""}</div>}</td>
                          <td style={{ padding:"16px 18px" }}><div style={{ color:"#fafafa", fontSize:13, fontWeight:500 }}>{p.client_name}</div><div style={{ color:"#818cf8", fontSize:12, marginTop:2 }}>{p.client_email}</div></td>
                          <td style={{ padding:"16px 18px", color:"#a1a1aa", fontSize:13, whiteSpace:"nowrap" }}>{p.service}</td>
                          <td style={{ padding:"16px 18px" }}><span style={{ padding:"4px 10px", borderRadius:6, fontSize:12, fontWeight:600, color:sm.color, background:sm.bg }}>{sm.label}</span></td>
                          <td style={{ padding:"16px 18px", minWidth:140 }}><div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}><div style={{ height:"100%", width:`${p.progress}%`, background:p.progress===100?"#34d399":"linear-gradient(90deg,#6366f1,#22d3ee)", borderRadius:99 }}/></div><span style={{ fontSize:12, color:"#a1a1aa" }}>{p.progress}%</span></div></td>
                          <td style={{ padding:"16px 18px", whiteSpace:"nowrap" }}><span style={{ fontSize:13, color:overdue?"#ef4444":"#a1a1aa", fontWeight:overdue?600:400 }}>{overdue&&"⚠️ "}{formatDate(p.deadline)}</span></td>
                          <td style={{ padding:"16px 18px" }}><div style={{ display:"flex", gap:8 }}><button onClick={()=>openEdit(p)} style={{ padding:"6px 14px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:8, color:"#818cf8", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Edit</button><button onClick={()=>handleDelete(p.id)} disabled={deleting===p.id} style={{ padding:"6px 14px", background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, color:"#fca5a5", fontSize:12, fontWeight:600, cursor:deleting===p.id?"not-allowed":"pointer", fontFamily:"inherit" }}>{deleting===p.id?"…":"Delete"}</button></div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
