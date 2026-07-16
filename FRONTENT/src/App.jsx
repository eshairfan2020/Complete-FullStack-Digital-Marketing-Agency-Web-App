
import { useState, useEffect, useRef, useCallback,useMemo } from "react";
import AuraWidget from "./components/AuraWidget";
/* ============================================================
   DATA
============================================================ */
const NAV_LINKS = [
  { label: "Home",         page: "home"         },
  { label: "Services",     page: "services"     },
  { label: "About",        page: "about"        },
  { label: "Work",         page: "work"         },
  { label: "Testimonials", page: "testimonials" },
  { label: "Contact",      page: "contact"      },
];
const SERVICES = [
  {
    icon: "🔍",
    title: "SEO & Content",
    description: "Rank higher on Google with keyword research, on-page optimization, and content that converts visitors into leads.",
    detail: "Our SEO team conducts deep technical audits, builds authoritative backlinks, and crafts long-form content strategies that compound over time. We target high-intent keywords, optimize Core Web Vitals, and deliver monthly transparency reports. Average clients see 3x organic growth in 6 months.",
    color: "#6366f1",
    stats: ["+312%", "Organic Traffic"],
    bg: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80",
  },
  {
    icon: "📱",
    title: "Social Media",
    description: "Build engaged communities and drive brand awareness across Instagram, LinkedIn, TikTok, and more.",
    detail: "We manage end-to-end social presence: content calendars, graphic design, copywriting, community moderation, and paid amplification.",
    color: "#ec4899",
    stats: ["+580%", "Engagement Rate"],
    bg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80",
  },
  {
    icon: "📈",
    title: "PPC Advertising",
    description: "Maximize ad spend with targeted Google Ads and Meta campaigns that deliver measurable ROI.",
    detail: "From keyword bidding strategies to creative testing and audience segmentation, our certified PPC specialists manage every dollar with precision.",
    color: "#f59e0b",
    stats: ["4.1x", "Average ROAS"],
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    icon: "🎨",
    title: "Brand Strategy",
    description: "Define your voice, visual identity, and positioning to stand out in a crowded marketplace.",
    detail: "Brand strategy starts with deep market research, competitor analysis, and customer interviews. We deliver a full brand bible.",
    color: "#8b5cf6",
    stats: ["+67%", "Perceived Value"],
    bg: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80",
  },
  {
    icon: "💻",
    title: "Web Design",
    description: "Stunning, fast-loading websites built to convert — from landing pages to full e-commerce stores.",
    detail: "We design and develop in Webflow, Next.js, and Shopify — always mobile-first with a 95+ PageSpeed score.",
    color: "#22d3ee",
    stats: ["2.8x", "Conversion Rate"],
    bg: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    description: "Real-time dashboards and monthly reports so you always know exactly what is working.",
    detail: "We build custom GA4 setups, Looker Studio dashboards, and attribution models that tie marketing spend directly to revenue.",
    color: "#34d399",
    stats: ["100%", "Data Transparency"],
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  },
];


const PROJECTS = [
  { category: "E-Commerce", title: "Luxe Fashion Co.",  result: "+187% Online Sales",        color: "#6366f1", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", description: "Complete brand overhaul and e-commerce growth strategy for a luxury fashion retailer.",        challenge: "Luxe Fashion Co. had a beautiful product but was invisible online.",                         solution: "We redesigned their Shopify store and rebuilt their Meta ad funnels with creative testing at scale.", results: ["+187% online sales in 9 months","3.4x ROAS on paid social","62% reduction in cart abandonment","Organic traffic grew from 800 to 14,000 monthly visitors"], duration: "9 months",  services: ["Web Design","SEO & Content","PPC Advertising"] },
  { category: "SaaS",       title: "CloudFlow App",     result: "+340% Lead Generation",     color: "#22d3ee", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", description: "Full-funnel demand generation and ABM strategy for a B2B SaaS project management tool.",     challenge: "CloudFlow was burning through VC cash on broad PPC with a 12% lead-to-close rate.",          solution: "We pivoted to an account-based marketing model with hyper-targeted LinkedIn campaigns.",           results: ["+340% qualified lead volume","Cost-per-acquisition down to $112","Lead-to-close rate improved to 34%","Series A secured at $8M"], duration: "12 months", services: ["PPC Advertising","Brand Strategy","Analytics"] },
  { category: "Healthcare", title: "VitalCare Clinic",  result: "+95% Appointment Bookings", color: "#a78bfa", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", description: "Local SEO and reputation management campaign for a multi-location healthcare provider.",       challenge: "VitalCare had 4 clinics but ranked on page 3 for nearly every local search term.",            solution: "We executed a hyper-local SEO strategy and optimized Google Business Profiles for all 4 locations.", results: ["+95% online appointment bookings","All 4 locations in Google Maps top 3","4.8-star average rating (up from 3.9)","New patient cost reduced by 41%"], duration: "6 months",  services: ["SEO & Content","PPC Advertising","Analytics"] },
  { category: "Real Estate", title: "Prime Properties", result: "+210% Website Traffic",     color: "#34d399", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", description: "Content marketing and social media strategy for a luxury real estate brokerage.",             challenge: "Prime Properties had no digital presence in a market where 97% of buyers search online.",     solution: "We launched an editorial content strategy with market reports and neighborhood guides.",           results: ["+210% website traffic in 8 months","28 inbound seller leads per month (was 0)","LinkedIn following grew from 200 to 8,400","$42M in attributed listing revenue"], duration: "8 months",  services: ["SEO & Content","Social Media","Brand Strategy"] },
];

const TESTIMONIALS = [
  { quote: "Evolve transformed our online presence completely. Our organic traffic tripled in just six months, and the ROI has been beyond what we imagined.",                                                                  
        name: "Sarah Mitchell", role: "CEO, Luxe Fashion Co.",          initials: "SM", color: "hsl(320, 84%, 67%)" },
  { quote: "Their PPC team knows exactly what they are doing. We cut our cost-per-lead in half while doubling our conversion rate. The analytics dashboards alone changed how our entire leadership team makes decisions.",                
        name: "James Chen",     role: "Founder, CloudFlow App",         initials: "JC", color: "rgba(34, 207, 238, 0.38)" },
  { quote: "Professional, responsive, and genuinely invested in our success. The monthly reports are thorough and honest. I never feel like I am in the dark about where our budget is going.",                                            
       name: "Maria Rodriguez",role: "Marketing Director, VitalCare",  initials: "MR", color: "#cc66bb7a" },
  { quote: "We went from zero digital presence to being the most visible luxury brokerage in our market. The content strategy they built for us is an asset that keeps compounding month after month.",                                  
         name: "David Park",     role: "Principal, Prime Properties",    initials: "DP", color: "hsla(290, 60%, 50%, 0.29)" },
];

const TEAM = [
  { name: "Alexandra Reyes", role: "CEO & Founder",    initials: "AR", color: "#6366f1", bio: "15 years in digital marketing. Former VP at Ogilvy."       },
  { name: "Marcus Webb",     role: "Head of Growth",   initials: "MW", color: "#22d3ee", bio: "Ex-Google. Managed $50M+ in ad spend."                      },
  { name: "Priya Singh",     role: "Creative Director", initials: "PS", color: "#ec4899", bio: "Award-winning designer. Ex-Airbnb design team."             },
  { name: "Tom Nakamura",   role: "Head of SEO",       initials: "TN", color: "#f59e0b", bio: "Built SEO programs for 3 unicorn startups."                 },
];

/* ============================================================
   BACKEND URLS
============================================================ */
const BACKEND    = "http://localhost:5000";
const CHAT_URL   = `${BACKEND}/api/chat`;
const CONTACT_URL= `${BACKEND}/api/contact`;
const ADMIN_URL  = `${BACKEND}/api/admin`;
const PROJECT_URL= `${BACKEND}/api/projects`;

/* ============================================================
   HOOKS
============================================================ */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ============================================================
   SHARED COMPONENTS
============================================================ */
function AnimatedSection({ children, className = "", delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Card3D({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setRot({ x: ((e.clientY - rect.top)  / rect.height - 0.5) * -12,
              y: ((e.clientX - rect.left) / rect.width  - 0.5) *  12 });
  };
  return (
    <div ref={ref} className={className} style={{ ...style, transform: hov ? `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.04,1.04,1.04)` : "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)", transition: hov ? "transform 0.1s ease" : "transform 0.5s ease", willChange: "transform", transformStyle: "preserve-3d" }}
      onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setRot({ x:0, y:0 }); }}>
      {children}
    </div>
  );
}

function ArrowBtn({ side, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={side === "left" ? "Previous" : "Next"}
      style={{ position: "absolute", top: "50%", left: side === "left" ? "max(16px,3vw)" : "auto", right: side === "right" ? "max(16px,3vw)" : "auto", transform: `translateY(-50%) scale(${hover ? 1.08 : 1})`, width: 56, height: 56, borderRadius: 999, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.18)", background: "rgba(20,20,30,.55)", color: "#fff", fontSize: 22, fontWeight: 700, cursor: "pointer", backdropFilter: "blur(10px)", boxShadow: hover ? "0 10px 40px -10px rgba(124,92,255,.55)" : "0 6px 24px -10px rgba(0,0,0,.6)", transition: "transform 300ms ease, box-shadow 300ms ease", zIndex: 999, pointerEvents: "auto", userSelect: "none", fontFamily: "inherit" }}>
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

/* ============================================================
   NAVBAR
============================================================ */
function Navbar({ page, setPage }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
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

  const navigate = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <div style={{ position:"fixed", top:0, left:0, height:"3px", width:`${progress}%`,
       background:"linear-gradient(90deg,#6366f1,#22d3ee)", zIndex:2000, transition:"width 0.1s" }} />

      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, height:"72px",
         background: scrolled ? "rgba(8,8,14,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none",
         borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent", transition:"all 0.4s ease" }}>

        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", height:"100%", display:"flex", 
          alignItems:"center", justifyContent:"space-between" }}>

          <button onClick={() => navigate("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", 
            gap:10, fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", letterSpacing:"0.05em", color:"#fafafa" }}>

            <span style={{ width:38, height:38, background: "linear-gradient(135deg, rgba(0, 229, 198, 0.44), hsla(320, 100%, 39%, 0.69))", 
            borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",  fontSize:"1rem", fontWeight:900 }}>E</span>

             Evolve <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}></span>
          </button>
          <nav style={{ display:"flex", alignItems:"center", gap:36 }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l.page} onClick={() => navigate(l.page)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:500,
               color: page===l.page ? "#fafafa" : "#a1a1aa", transition:"color 0.2s", fontFamily:"inherit", position:"relative", padding:"4px 0" }}>
                {l.label}
                {page===l.page && <span style={{ position:"absolute", bottom:-2, left:0, right:0, height:2, background: "linear-gradient(90deg,#ff2e93,#00e5c7)", borderRadius:2 }} />}
              </button>
            ))}
            <button onClick={() => navigate("contact")} style={{ padding:"10px 22px",background: "linear-gradient(135deg, #e600b4bb, #00b8939f)",
             border:"none", borderRadius:50, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 20px hsla(310, 84%, 67%, 0.40)", fontFamily:"inherit"
             }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              Free Audit
            </button>
            <button onClick={() => setPage("admin")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10,
               fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", letterSpacing:"0.05em", color:"#fafafa" }}> Admin panel</button>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ display:"none", background:"none", border:"none", cursor:"pointer",
             flexDirection:"column", gap:5, padding:4 }} className="mobile-toggle">

            {[0,1,2].map(i => <span key={i} style={{ display:"block", width:24, height:2, background:"#fafafa", borderRadius:2, 
              transition:"transform 0.3s, opacity 0.3s", transform: menuOpen&&i===0?"translateY(7px) rotate(45deg)":menuOpen&&i===2?"translateY(-7px) rotate(-45deg)":"none",
               opacity: menuOpen&&i===1?0:1 }} />)}
          </button>
        </div>
      </header>
      <div style={{ position:"fixed", inset:"72px 0 0 0", background:"rgba(8,8,14,0.98)", backdropFilter:"blur(20px)", zIndex:999, display:"flex",
         flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32, transform: menuOpen?"translateX(0)":"translateX(100%)", transition:"transform 0.35s ease" }}>
        {NAV_LINKS.map(l => <button key={l.page} onClick={() => navigate(l.page)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"2rem",
           fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", color: page===l.page?"#fafafa":"#666" }}>{l.label}</button>)}
        <button onClick={() => navigate("contact")} style={{ padding:"14px 40px", background:"linear-gradient(135deg, #e600b4bb, #00b8939f)", border:"none",
           borderRadius:50, color:"#fff", fontSize:"1.1rem", fontWeight:700, cursor:"pointer" }}>Free Audit</button>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap'); @media(max-width:900px){.desktop-nav{display:none!important;}.mobile-toggle{display:flex!important;}}`}</style>
    </>
  );
}

/* ============================================================
   SERVICES SHOWCASE 3D
============================================================ */
function ServicesShowcase3D({ setPage }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wheelLock = useRef(0);
  const touchStart = useRef(null);

  const go = (dir) =>
    setActive((a) => (a + dir + SERVICES.length) % SERVICES.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelLock.current < 450) return;
    if (Math.abs(e.deltaX) < 8 && Math.abs(e.deltaY) < 8) return;
    wheelLock.current = now;
    go(e.deltaY + e.deltaX > 0 ? 1 : -1);
  };
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const current = SERVICES[active];
  const accent = current.color;
  const accent2 = "#22d3ee";

  const keyframes = `
    @keyframes ssBgFloat { 0%,100%{transform:translate3d(0,0,0) scale(1);} 50%{transform:translate3d(2%,-3%,0) scale(1.08);} }
    @keyframes ssBgFloat2 { 0%,100%{transform:translate3d(0,0,0) scale(1);} 50%{transform:translate3d(-3%,2%,0) scale(1.1);} }
    @keyframes ssShimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
    @keyframes ssPulseGlow { 0%,100%{opacity:.55;} 50%{opacity:1;} }
    @keyframes ssFadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
  `;

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 72,
        overflow: "hidden",
        background:
          "radial-gradient(1200px 800px at 80% -10%, #1a0b3d 0%, transparent 60%)," +
          "radial-gradient(1000px 700px at -10% 110%, #0b3d3a 0%, transparent 55%)," +
          "linear-gradient(180deg,#05060b 0%,#07080f 100%)",
        color: "#f5f6fb",
        fontFamily: "'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{keyframes}</style>

      {/* Animated gradient backdrop */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          `radial-gradient(600px 600px at 20% 30%, ${accent}33, transparent 60%),` +
          `radial-gradient(700px 700px at 80% 70%, ${accent2}33, transparent 60%)`,
        transition: "background 800ms ease",
        animation: "ssBgFloat 14s ease-in-out infinite",
        filter: "blur(20px)",
      }}/>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "radial-gradient(2px 2px at 20% 30%,rgba(255,255,255,.15),transparent 50%)," +
          "radial-gradient(1px 1px at 70% 60%,rgba(255,255,255,.12),transparent 50%)," +
          "radial-gradient(1.5px 1.5px at 40% 80%,rgba(255,255,255,.1),transparent 50%)",
        animation: "ssBgFloat2 22s ease-in-out infinite",
      }}/>

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 2, padding: "40px 24px 0",
        maxWidth: 1280, margin: "0 auto", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 14px", border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 999, fontSize: 12, letterSpacing: ".18em",
          textTransform: "uppercase", color: "rgba(255,255,255,.75)",
          background: "rgba(255,255,255,.03)", backdropFilter: "blur(8px)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, background: accent,
            boxShadow: `0 0 12px ${accent}`,
            animation: "ssPulseGlow 2s ease-in-out infinite",
          }}/>
          Our Services
        </div>
        <h1 style={{
          margin: "20px auto 10px",
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(34px,5.2vw,64px)",
          lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700,
          maxWidth: 900,
          background: "linear-gradient(180deg,#fff 0%,rgba(255,255,255,.7) 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>
          Crafted services for brands that refuse the ordinary.
        </h1>
        <p style={{
          margin: "0 auto", maxWidth: 620,
          color: "rgba(229,231,235,.65)", fontSize: 16, lineHeight: 1.6,
        }}>
          Scroll, swipe, or use your arrow keys to drift through our practice.
        </p>
      </header>

      {/* Stage */}
      <section style={{
        position: "relative", zIndex: 2,
        height: "min(72vh, 640px)", marginTop: 32, perspective: 2000,
      }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {SERVICES.map((s, i) => {
            let offset = i - active;
            if (offset > SERVICES.length / 2) offset -= SERVICES.length;
            if (offset < -SERVICES.length / 2) offset += SERVICES.length;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const visible = abs <= 3;

            const translateX = offset * 220;
            const translateZ = -abs * 220 + (isActive && hovering ? 40 : 0);
            const rotateY = offset * -22;
            const scale = isActive ? (hovering ? 1.04 : 1) : 1 - abs * 0.08;
            const blur = isActive ? 0 : Math.min(abs * 2.2, 8);
            const opacity = visible ? (isActive ? 1 : 1 - abs * 0.22) : 0;

            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => isActive && setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                aria-label={s.title}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "min(420px,78vw)", height: "min(540px,68vh)",
                  marginLeft: "calc(min(420px,78vw) / -2)",
                  marginTop: "calc(min(540px,68vh) / -2)",
                  transform: `translate3d(${translateX}px,0,${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transition: "transform 700ms cubic-bezier(.22,1,.36,1), filter 700ms cubic-bezier(.22,1,.36,1), opacity 600ms ease",
                  filter: `blur(${blur}px)`, opacity,
                  zIndex: 100 - abs,
                  pointerEvents: visible ? "auto" : "none",
                  padding: 0, border: "none", background: "transparent",
                  cursor: isActive ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                }}
              >
                <div style={{
                  position: "relative", height: "100%", width: "100%",
                  borderRadius: 28, padding: 28, textAlign: "left", color: "#f5f6fb",
                  background:
                    "linear-gradient(160deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 60%)," +
                    "linear-gradient(180deg,rgba(10,12,22,.85),rgba(10,12,22,.95))",
                  border: "1px solid rgba(255,255,255,.08)",
                  boxShadow: isActive
                    ? `0 40px 120px -20px ${accent}55, 0 10px 40px -10px ${accent2}40, inset 0 1px 0 rgba(255,255,255,.08)`
                    : "0 20px 60px -20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)",
                  overflow: "hidden", backdropFilter: "blur(12px)",
                  display: "flex", flexDirection: "column",
                }}>
                  {/* Aurora glow */}
                  <div aria-hidden style={{
                    position: "absolute", top: -120, right: -120,
                    width: 320, height: 320, borderRadius: "50%",
                    background: `radial-gradient(closest-side, ${s.color}55, transparent 70%)`,
                    filter: "blur(20px)", animation: "ssPulseGlow 4s ease-in-out infinite",
                    pointerEvents: "none",
                  }}/>
                  <div aria-hidden style={{
                    position: "absolute", bottom: -140, left: -100,
                    width: 320, height: 320, borderRadius: "50%",
                    background: `radial-gradient(closest-side, ${accent2}44, transparent 70%)`,
                    filter: "blur(24px)", pointerEvents: "none",
                  }}/>

                  {/* Icon */}
                  <div style={{
                    position: "relative", width: 64, height: 64, borderRadius: 18,
                    display: "grid", placeItems: "center", fontSize: 30,
                    background: `linear-gradient(135deg, ${s.color}, ${accent2})`,
                    boxShadow: `0 10px 30px -10px ${s.color}aa`,
                  }}>
                    {s.icon}
                  </div>

                  {/* Hero image */}
                  <div style={{
                    position: "relative", marginTop: 20,
                    height: 180, borderRadius: 18, overflow: "hidden",
                    border: "1px solid rgba(255,255,255,.08)",
                    boxShadow: `0 20px 50px -20px ${s.color}66`,
                  }}>
                    <img
                      src={s.bg}
                      alt={s.title}
                      loading="lazy"
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transform: isActive && hovering ? "scale(1.08)" : "scale(1)",
                        transition: "transform 700ms cubic-bezier(.22,1,.36,1)",
                      }}
                    />
                    <div aria-hidden style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(180deg, transparent 40%, rgba(10,12,22,.85) 100%), linear-gradient(135deg, ${s.color}22, transparent 60%)`,
                    }}/>
                  </div>

                  {/* Stat badge */}
                  <div style={{
                    position: "absolute", top: 28, right: 28,
                    display: "inline-flex", alignItems: "baseline", gap: 8,
                    padding: "8px 14px", borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.04)", backdropFilter: "blur(10px)",
                    fontSize: 12, color: "rgba(255,255,255,.8)",
                  }}>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 14, letterSpacing: "-0.01em" }}>
                      {s.stats[0]}
                    </span>
                    <span style={{ opacity: .7 }}>{s.stats[1]}</span>
                  </div>

                  {/* Body */}
                  <div style={{ marginTop: "auto", position: "relative" }}>
                    <div style={{
                      fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase",
                      color: "rgba(255,255,255,.55)", marginBottom: 10,
                    }}>
                      {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                    </div>
                    <h3 style={{
                      margin: 0, fontFamily: "'Playfair Display',serif",
                      fontSize: 30, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700,
                    }}>{s.title}</h3>
                    <p style={{ margin: "12px 0 0", color: "rgba(229,231,235,.7)", fontSize: 15, lineHeight: 1.6 }}>
                      {s.description}
                    </p>

                    {/* Hover reveal */}
                    <div style={{
                      display: "grid",
                      gridTemplateRows: isActive && hovering ? "1fr" : "0fr",
                      transition: "grid-template-rows 500ms ease",
                    }}>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{
                          margin: "14px 0 0", fontSize: 13, lineHeight: 1.7,
                          color: "rgba(229,231,235,.6)",
                          animation: isActive && hovering ? "ssFadeUp 500ms ease both" : undefined,
                        }}>
                          {s.detail}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: 22 }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPage && setPage("contact"); }}
                        style={{
                          position: "relative", display: "inline-flex", alignItems: "center", gap: 10,
                          padding: "12px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700,
                          color: "#0b0c14", border: "none", cursor: "pointer",
                          background: `linear-gradient(135deg, ${s.color}, ${accent2})`,
                          boxShadow: `0 12px 30px -12px ${s.color}cc`,
                          overflow: "hidden", fontFamily: "inherit",
                        }}
                      >
                        Explore Service ›
                        <span aria-hidden style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)",
                          backgroundSize: "200% 100%", animation: "ssShimmer 2.6s linear infinite",
                          mixBlendMode: "overlay", pointerEvents: "none",
                        }}/>
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Arrows — clickable, high z-index, above stage */}
        <ArrowBtn side="left" onClick={() => go(-1)} />
        <ArrowBtn side="right" onClick={() => go(1)} />
      </section>

      {/* Dots */}
      <div style={{
        position: "relative", zIndex: 3, display: "flex", gap: 10,
        justifyContent: "center", padding: "32px 0 80px",
      }}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.title}`}
              style={{
                width: isActive ? 32 : 10, height: 10, borderRadius: 999,
                border: "1px solid rgba(255,255,255,.15)",
                background: isActive
                  ? `linear-gradient(90deg, ${s.color}, ${accent2})`
                  : "rgba(255,255,255,.08)",
                cursor: "pointer", transition: "all 400ms ease",
                boxShadow: isActive ? `0 0 18px ${s.color}88` : "none",
              }}
            />
          );
        })}
      </div>
    </main>
  );
}

// // ArrowBtn defined later to avoid duplicate declaration


/* ============================================================
   AI WIDGET
============================================================ */
function AskAIWidget() {
  const [question, setQuestion] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [error,    setError]    = useState("");

  const ask = async () => {
    if(!question.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res  = await fetch(CHAT_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({question:question.trim()}) });
      const data = await res.json();
      if(!data.success) throw new Error(data.message||"Something went wrong.");
      setResult(data);
    } catch(e) { setError(e?.message||"Something went wrong."); }
    finally    { setLoading(false); }
  };

  return (
    <div style={{ maxWidth:900, margin:"0 auto 100px", padding:"0 24px" }}>
      <AnimatedSection>
        <div style={{ padding:40, background:"linear-gradient(160deg,#12121c,#0c0c14)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:28, boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <span style={{ fontSize:24 }}>🤖</span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem", color:"#fafafa", margin:0 }}>Ask Our <span style={{ background:"linear-gradient(135deg,#ff2e93,#00e5c7)",
               WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>AI Assistant</span></h2>
          </div>
          <p style={{ color:"#a1a1aa", marginBottom:24, fontSize:14 }}>Ask anything about our services.</p>
          <textarea rows={3} value={question} onChange={e=>setQuestion(e.target.value)} placeholder='e.g. "How can you help me rank on Google?"' style={{ width:"100%", padding:"14px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fafafa", fontSize:15, outline:"none", fontFamily:"inherit", resize:"vertical", marginBottom:16 }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"} />
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20 }}>
            <button onClick={ask} disabled={loading||!question.trim()} style={{ padding:"12px 28px", background:loading||!question.trim()?"#2a2a3a":"linear-gradient(135deg,#ff2e93,#00e5c7)", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:700, cursor:loading||!question.trim()?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {loading?"Thinking…":"Ask AI →"}
            </button>
          </div>
          {error  && <div style={{ padding:16, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:12, color:"#fca5a5", fontSize:14 }}>{error}</div>}
          {result && <div style={{ padding:20, background:"#08080e", border:"1px solid rgba(99,102,241,0.25)", borderRadius:14 }}><div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#22d3ee", marginBottom:10 }}>AI Response</div><div style={{ color:"#fafafa", fontSize:15, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{result.answer}</div></div>}
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ============================================================
   HOME PAGE
============================================================ */
 function HomePage({ setPage }) {
  const [count, setCount] = useState({ a: 0, b: 0, c: 0 });
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, () => ({
      width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      animationDuration: 4 + Math.random() * 6, animationDelay: Math.random() * 4,
      background: Math.random() > 0.5 ? "#ff2e93" : "#00e5c7",
    }))
  );

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.5 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { a: 250, b: 98, c: 32 };
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount({ a: Math.floor(ease * targets.a), b: Math.floor(ease * targets.b), c: Math.floor(ease * targets.c) });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVisible]);

  return (
    <main>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0a0616" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,46,147,0.25),transparent 70%)", top: -200, right: -200, animation: "float1 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,199,0.15),transparent 70%)", bottom: -100, left: -100, animation: "float2 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "20px 60px", maskImage: "radial-gradient(ellipse at 50% 50%,black 30%,transparent 80%)" }} />
          {particles.map((p, i) => (
            <div key={i} style={{ position: "absolute", width: p.width, height: p.height, borderRadius: "50%", background: p.background, opacity: 0.4, left: p.left, top: p.top, animation: `particle ${p.animationDuration}s ease-in-out infinite`, animationDelay: `${p.animationDelay}s` }} />
          ))}
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", position: "relative", textAlign: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease forwards", opacity: 0, marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "rgba(255,46,147,0.1)", border: "1px solid rgba(255,46,147,0.25)", borderRadius: 50, fontSize: 13, fontWeight: 600, color: "#ff8fd0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, background: "#00e5c7", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Transforming Ideas InTo Impact
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, color: "#fafafa", lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.02em", animation: "fadeUp 0.8s 0.15s ease forwards", opacity: 0, textAlign: "center" }}>
            We Grow Brands That{" "}
            <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dominate Online</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75, maxWidth: 580, marginBottom: 44, color: "#a1a1aa", animation: "fadeUp 0.8s 0.3s ease forwards", opacity: 0, margin: "0 auto 44px auto", textAlign: "center" }}>
            Strategy, creativity, and data-driven campaigns that turn clicks into customers. Partner with Evolve and watch your business scale beyond expectations.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, animation: "fadeUp 0.8s 0.45s ease forwards", opacity: 0, justifyContent: "center" }}>
            <button onClick={() => setPage("contact")}
              style={{ padding: "16px 36px", background: "linear-gradient(135deg,#ff2e93,#00e5c7)", border: "none", borderRadius: 50, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,46,147,0.4)", transition: "transform 0.2s,box-shadow 0.2s", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Start Your Project →
            </button>
            <button onClick={() => setPage("work")}
              style={{ padding: "16px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, color: "#fafafa", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s,background 0.2s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff2e93"; e.currentTarget.style.background = "rgba(255,46,147,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "transparent"; }}>
              View Our Work
            </button>
          </div>

          <div ref={statsRef} style={{ display: "flex", flexWrap: "wrap", gap: 48, marginTop: 72, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)", animation: "fadeUp 0.8s 0.6s ease forwards", opacity: 0, justifyContent: "center" }}>
            {[
              { val: `${count.a}+`, label: "Clients Served" },
              { val: "3.2x", label: "Avg. ROI Increase" },
              { val: `${count.b}%`, label: "Client Retention" },
              { val: `${count.c}+`, label: "Campaigns Launched" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: "#fafafa", lineHeight: 1, marginBottom: 6, letterSpacing: "0.05em" }}>{s.val}</div>
                <div style={{ fontSize: 14, color: "#a1a1aa" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/* 3D COVERFLOW SERVICES SHOWCASE */}
        <ServicesShowcase3D setPage={setPage} />


      {/* CTA BAND */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,rgba(255,46,147,0.15),rgba(0,229,199,0.08))", borderTop: "1px solid rgba(255,46,147,0.2)", borderBottom: "1px solid rgba(255,46,147,0.2)" }}>
        <AnimatedSection style={{ textAlign: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20, textAlign: "center" }}>
              Ready to see what's possible?
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 36px auto", lineHeight: 1.7, textAlign: "center" }}>
              Book a free 30-minute strategy call. No pitch decks, just honest insights about your growth potential.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => setPage("contact")}
                style={{ padding: "18px 48px", background: "linear-gradient(135deg,#ff2e93,#00e5c7)", border: "none", borderRadius: 50, color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 40px rgba(255,46,147,0.4)", transition: "transform 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}>
                Book Free Strategy Call
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
        @keyframes float2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes particle{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
      `}</style>

    <AuraWidget />

    </main>
  );
};


/* ============================================================
   SERVICES PAGE
============================================================ */
function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#0a0616", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", background: "linear-gradient(180deg,#0d0d20,#0a0616)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,46,147,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,46,147,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <AnimatedSection>
          <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff8fd0", marginBottom: 16 }}>Our Services</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Everything You Need to <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Win Online</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Click any service to explore our full approach, methodology, and results.</p>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.07}>
              <Card3D>
                <div style={{ background: "#12121c", border: `1px solid ${active === i ? s.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 24, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setActive(active === i ? null : i)}>
                  <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                    <img src={s.bg} alt={s.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", transform: active === i ? "scale(1.08)" : "scale(1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${s.color}30 0%, rgba(18,18,28,0.85) 70%, #12121c 100%)` }} />
                  </div>
                  <div style={{ padding: "32px 32px 0" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{s.icon}</div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>{s.description}</p>
                  </div>
                  <div style={{ margin: "24px 32px 0", padding: "16px 20px", background: `${s.color}12`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: s.color, letterSpacing: "0.05em" }}>{s.stats[0]}</span>
                    <span style={{ fontSize: 13, color: "#a1a1aa" }}>{s.stats[1]}</span>
                  </div>
                  <div style={{ maxHeight: active === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
                    <div style={{ padding: "24px 32px 32px" }}>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "#c4c4cc" }}>{s.detail}</p>
                      <button onClick={(e) => { e.stopPropagation(); setPage("contact"); }}
                        style={{ marginTop: 20, padding: "10px 24px", background: `linear-gradient(135deg,${s.color},#00e5c7)`, border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: "16px 32px 24px", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: s.color, fontWeight: 600 }}>
                    {active === i ? "▲ Less" : "▼ See full approach"}
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   ABOUT PAGE
============================================================ */
function AboutPage() {
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh", overflow: "hidden" }}>

      {/* ── HERO BANNER SECTION ── */}
      <div style={{ position: "relative", padding: "120px 24px 100px", textAlign: "center", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
          alt="Our team collaborating"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 60%)", pointerEvents: "none" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(315, 90%, 74%)", display: "block", marginBottom: 16 }}>ABOUT US</span>
          <h1 style={{ position: "relative", fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5.5vw,4rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20, lineHeight: 1.1 }}>
            A Team Obsessed With <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Your Success</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px", position: "relative", zIndex: 2 }}>
        
        {/* ── CORE MISSION & STATS MATRIX (Responsive Linewise Layout) ── */}
<AnimatedSection>
  <div
    style={{ maxWidth: 1000, margin: "0 auto 100px", display: "flex", flexDirection: "column", gap: 40,}}>
    {/* Heading */}
    <div style={{ textAlign: "center" }}>
      <h2
        style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff", lineHeight: 1.3, marginBottom: 50, fontWeight: 800 }}>
 FOUNDED IN{" "}
 <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)" , WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    2016
  </span>{" "}
  WITH ONE{" "}
  <span style={{ background:  "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    MISSION
  </span>{" "}
  MAKE{" "}
  <span style={{ background:  "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    MARKETING
  </span>{" "}
    HONEST.
</h2>
     <p
        style={{color: "#a1a1aa", lineHeight: 1.9, fontSize: 15, maxWidth: 800, margin: "0 auto 20px"}}>
        Evolve was born from frustration. Too many agencies promised
        the moon, delivered mediocre reports, and charged clients for activity
        instead of results. We built something different.
        Today we are a 40-person team of strategists, designers, and data
        scientists serving 250+ brands worldwide.
      </p>
      <p style={{  color: "#a1a1aa", lineHeight: 1.9, fontSize: 30, maxWidth: 800, margin: "0 auto",}}>
      </p>
    </div>

    {/* Statistics */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 24,
      }}
    >
      {[
        ["2016", "Founded"],
        ["250+", "Clients"],
        ["40+", "Team Members"],
        ["$120M+", "Revenue Generated"],
      ].map(([value, label]) => (
        <div
          key={label}
          style={{ padding: 30, background: "linear-gradient(135deg,#1d1d2a,#171722)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)",
             boxShadow:"0 20px 50px rgba(0,0,0,.55),0 0 30px rgba(99,102,241,.15)",textAlign: "center", }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color: "#fff", marginBottom: 10,}}>
            {value}
          </div>
  <div style={{ color: "#a1a1aa", fontSize: 14, }}>
            {label}
          </div>
        </div>
      ))}
    </div>

    {/* Quote + Years */}
    <div style={{ display: "", gridTemplateColumns: "3fr 1fr", alignItems: "start", }} >
      {/* Quote */}
      <div style={{ padding: 40, background: "linear-gradient(135deg,#1d1d2a,#171722)",borderRadius: 30, border: "1px solid rgba(255,255,255,.08)",boxShadow: "0 20px 50px rgba(0,0,0,.5)",}}>
        <div style={{ fontFamily: "'Playfair Display',serif",fontSize: "1.6rem",color: "#fff", lineHeight: 1.7, fontStyle: "italic", marginBottom: 25, }}>
          "Marketing is no longer about the stuff you make, but the stories you
          tell."
        </div>

    <div style={{ color: "#f881da", fontSize: 14 , fontWeight: 700, letterSpacing: ".15em",}}>
          — SETH GODIN
        </div>
      </div>

      {/* Years Card */}
      <div style={{width: 170, height: 170, padding: 20,background: "linear-gradient(#08080e, #08080e) padding-box, linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08)) identity-box",
    backgroundColor: "#08080e", backgroundImage: "linear-gradient(135deg, rgba(120, 99, 241, 0.12), rgba(34,211,238,0.08))", display: "flex", gap: 18, boxShadow: "0 15px 30px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
    borderRadius: 30, border: "1px solid rgba(255,255,255,.08)", flexDirection: "column", justifyContent: "center", alignItems: "center",textAlign: "center", marginTop: -40, marginInline: "auto", marginRight:'5px',
  }}>
      
   <div style={{ fontFamily: "'Bebas Neue',sans-serif",fontSize: "4rem", color: "#fff", lineHeight: 1, }}>
     8+</div>

     <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, textAlign: "center",}}>
          Years of Excellence
        </div>
      </div>
    </div>
  </div>
</AnimatedSection>
         <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa", marginBottom: 40, textAlign: "center" }}>How We Work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, marginBottom: 80 }}>
            {[
              { icon: "📊", title: "Data-Driven", desc: "Every decision backed by analytics.", color: "#ff2e93", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
              { icon: "🔍", title: "Transparent", desc: "Clear reporting and honest communication.", color: "#00e5c7", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
              { icon: "🎯", title: "Results-Focused", desc: "We measure success by your revenue, not vanity metrics.", color: "#ffb800", img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80" },
              { icon: "🤝", title: "Partnership Mindset", desc: "We act as an extension of your team.", color: "#a78bfa", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <Card3D>
                 <div style={{position: "relative", padding: 0, background: "rgba(255,255,255,0.04)",backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 22, height: "100%", overflow: "hidden",
                    boxShadow: `0 1px 0 rgba(255,255,255,0.08) inset, 0 25px 50px -15px rgba(0,0,0,0.7), 0 10px 30px -10px ${v.color}55` }}>
                    <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                      <img src={v.img} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 0%, rgba(7,3,15,0.85) 100%), radial-gradient(circle at 80% 20%, ${v.color}55, transparent 60%)` }} />
                      <div style={{ position: "absolute", top: 14, left: 14, width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${v.color}, ${v.color}80)`, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: `0 8px 20px -6px ${v.color}` }}>{v.icon}</div>
                    </div>
                    <div style={{ padding: "20px 22px 24px" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>{v.title}</h3>
                      <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>{v.desc}</p>
                    </div>
                  </div>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* ── MEET THE TEAM PROFILE MATRIX ── */}
              <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa", marginBottom: 12, textAlign: "center" }}>Meet the Team</h2>
          <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: 48 }}>Senior strategists with real-world experience at the world's best companies.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {TEAM.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.1}>
                <Card3D>
                  <div style={{ position: "relative", padding: "32px 24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 22, textAlign: "center", overflow: "hidden", boxShadow: `0 1px 0 rgba(255,255,255,0.07) inset, 0 -30px 60px -30px ${m.color}30 inset, 0 30px 60px -20px rgba(0,0,0,0.75), 0 12px 35px -10px ${m.color}55`,}}>
                    <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 3, background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, borderRadius: 2 }} />
                    <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}25, transparent 70%)`, filter: "blur(25px)" }} />
                    <div style={{ position: "relative", width: 92, height: 92, borderRadius: "50%", padding: 3, background: `linear-gradient(135deg,${m.color},#00e5c7)`, margin: "0 auto 18px", boxShadow: `0 12px 30px -8px ${m.color}90, 0 0 0 4px rgba(255,255,255,0.04), 0 0 0 1px ${m.color}50` }}>
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block", border: "3px solid rgba(13,13,24,0.8)" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: "#fff", background: `linear-gradient(135deg,${m.color},#00e5c7)` }}>{m.initials}</div>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, color: "#fafafa", marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 13, color: m.color, marginBottom: 12, fontWeight: 600 }}>{m.role}</div>
                    <p style={{ fontSize: 13, color: "#a1a1aa" }}>{m.bio}</p>
                  </div>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Media Query styles to handle screen layout switches perfectly */}
      <style>{`
        .about-hero-grid {
          grid-template-columns: 1.2fr 0.8fr;
        }
        @media (max-width: 990px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ============================================================
   WORK PAGE
============================================================ */
function WorkPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#0a0616", minHeight: "100vh" }}>
      {selected !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", animation: "fadeIn 0.3s ease" }}
          onClick={() => setSelected(null)}>
          <div style={{ maxWidth: 700, width: "100%", background: "#12121c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, overflow: "hidden", maxHeight: "90vh", overflowY: "auto", animation: "scaleIn 0.3s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ height: 220, background: `linear-gradient(135deg,${PROJECTS[selected].color}40,${PROJECTS[selected].color}15)`, position: "relative", overflow: "hidden" }}>
              <img src={PROJECTS[selected].image} alt={PROJECTS[selected].title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, mixBlendMode: "luminosity" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "28px 32px" }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PROJECTS[selected].color, background: `${PROJECTS[selected].color}20`, padding: "4px 12px", borderRadius: 50, marginBottom: 12, display: "inline-block" }}>{PROJECTS[selected].category}</span>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa" }}>{PROJECTS[selected].title}</h2>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#fafafa", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ padding: 32 }}>
              <p style={{ color: "#a1a1aa", lineHeight: 1.75, marginBottom: 28, fontSize: "1.05rem" }}>{PROJECTS[selected].description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
                <div style={{ padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>The Challenge</div>
                  <p style={{ fontSize: 14, color: "#c4c4cc", lineHeight: 1.7 }}>{PROJECTS[selected].challenge}</p>
                </div>
                <div style={{ padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Our Solution</div>
                  <p style={{ fontSize: 14, color: "#c4c4cc", lineHeight: 1.7 }}>{PROJECTS[selected].solution}</p>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Results</div>
                {PROJECTS[selected].results.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#fafafa", marginBottom: 8 }}>
                    <span style={{ color: PROJECTS[selected].color, fontWeight: 700 }}>✓</span> {r}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {PROJECTS[selected].services.map((s) => (
                  <span key={s} style={{ padding: "6px 14px", background: `${PROJECTS[selected].color}15`, border: `1px solid ${PROJECTS[selected].color}40`, borderRadius: 50, fontSize: 13, color: PROJECTS[selected].color, fontWeight: 600 }}>{s}</span>
                ))}
                <span style={{ padding: "6px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, fontSize: 13, color: "#a1a1aa" }}>⏱ {PROJECTS[selected].duration}</span>
              </div>
              <button onClick={() => { setSelected(null); setPage("contact"); }}
                style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg,${PROJECTS[selected].color},#00e5c7)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Start a Similar Project →
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(0,229,199,0.08),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff8fd0", display: "block", marginBottom: 16 }}>Our Work</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Results That <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Speak for Themselves</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>Click any project to see the full case study.</p>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))", gap: 32 }}>
          {PROJECTS.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}>
              <Card3D>
                <div style={{ background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setSelected(i)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.color + "60"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,rgba(0,0,0,0.8),transparent 50%)` }} />
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%,${p.color}30,transparent 60%)` }} />
                    <div style={{ position: "absolute", top: 20, left: 20 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 50, border: `1px solid ${p.color}60` }}>{p.category}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#fafafa" }}>{p.title}</h3>
                      <span style={{ fontSize: 14, fontWeight: 700, color: p.color, background: `${p.color}20`, padding: "6px 14px", borderRadius: 50, whiteSpace: "nowrap" }}>{p.result}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 14, color: "#a1a1aa" }}>{p.description}</p>
                    <span style={{ color: p.color, fontSize: 20, flexShrink: 0, marginLeft: 16 }}>→</span>
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`}</style>
    </main>
  );
}
/* ============================================================
   TESTIMONIALS PAGE
============================================================ */
function TestimonialsPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ paddingTop: 72, background: "#0a0616", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.1),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff8fd0", display: "block", marginBottom: 16 }}>Testimonials</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            What Our <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Clients Say</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" }}>
        <AnimatedSection>
          <div style={{ padding: "48px", background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, marginBottom: 40,
             position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${TESTIMONIALS[active].color},#00e5c7)`, transition: "all 0.5s" }} />
            <div style={{ fontSize: 60, color: TESTIMONIALS[active].color, opacity: 0.3, fontFamily: "Georgia,serif", lineHeight: 0.8, marginBottom: 24 }}>"</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "#fafafa", lineHeight: 1.7, marginBottom: 36, transition: "all 0.4s" }}>
              {TESTIMONIALS[active].quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${TESTIMONIALS[active].color},#00e5c7)`, display: "flex",
               alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{TESTIMONIALS[active].initials}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "#fafafa" }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontSize: 13, color: "#a1a1aa" }}>{TESTIMONIALS[active].role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5, background: i === active ? TESTIMONIALS[active].color : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <Card3D>
                <div style={{ padding: 24, background: "#12121c", border: `1px solid ${i === active ? t.color + "60" : "rgba(255,255,255,0.07)"}`,
                 borderRadius: 20, cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setActive(i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#00e5c7)`, display: "flex",
                     alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fafafa", fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#a1a1aa" }}>{t.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65, fontStyle: "italic" }}>"{t.quote.slice(0, 100)}..."</p>
                </div>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   CONTACT PAGE
============================================================ */
function ContactPage() {
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
  const handle = e => setForm({...form, [e.target.name]:e.target.value});

  const handleSubmit = async e => {
    if(e&&e.preventDefault) e.preventDefault();
    if(!form.name.trim()||!form.email.trim()||!form.message.trim()) { setError("Please fill out all required fields."); return; }
    const emailRegex=/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(form.email.trim())) { setError("Please enter a valid email address."); return; }
    if(!form.company.trim()) { setError("Please enter your Company name."); return; }
    if(!form.service) { setError("Please select a Service."); return; }
    setError(""); setSubmitting(true);
    try {
      const res=await fetch(CONTACT_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!res.ok||!data.success) throw new Error(data.message||"Failed to send.");
      setSubmitted(true);
    } catch(err) { setError(err.message||"Something went wrong."); }
    finally { setSubmitting(false); }
  };

  return (
    <main style={{ paddingTop:72, background:"#08080e", minHeight:"100vh" }}>
      <div style={{ padding:"80px 24px 60px", textAlign:"center", position:"relative" }}>
        <AnimatedSection>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"hsl(315, 90%, 74%)", display:"block", marginBottom:16 }}>Get In Touch</span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,3.5rem)", fontWeight:800, color:"#fafafa", marginBottom:20 }}>Ready to
             <span style={{ background:"linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Elevate</span> Your Brand?</h1>
        </AnimatedSection>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px 60px", display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:64, alignItems:"start" }} className="contact-grid">
        <AnimatedSection>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", color:"#fafafa", marginBottom:24 }}>Let's talk results</h2>
            {[{icon:"✉️",label:"hello@elevatedigital.com"},{icon:"📞",label:"+1 (555) 123-4567"},{icon:"📍",label:"New York, NY"}].map(d=>(
              <div key={d.label} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize:20 }}>{d.icon}</span><span style={{ color:"#fafafa", fontSize:15 }}>{d.label}</span>
              </div>
            ))}
            <div style={{ marginTop:40 }}>
              <div style={{ fontWeight:700, color:"#fafafa", marginBottom:20 }}>Why clients choose us</div>
              {["No long-term lock-in contracts","Dedicated senior account manager","Weekly check-ins and Slack access","30-day money-back guarantee"].map(v=>(
                <div key={v} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, fontSize:14, color:"#a1a1aa" }}><span style={{ color:"#22d3ee", fontWeight:700 }}>✓</span> {v}</div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div style={{ padding:40, background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28 }}>
            {submitted?(
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(34,211,238,0.12)", display:"flex", alignItems:"center", justifyContent:"center", 
                  fontSize:32, margin:"0 auto 24px" }}>✓</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", color:"#fafafa", marginBottom:12 }}>Message Sent!</h3>
                <p style={{ color:"#a1a1aa" }}>We will reach out within 24 hours.</p>
              </div>
            ):(
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {error&&<div style={{ background:"rgba(239,68,68,0.15)", color:"#f87171", padding:"14px", borderRadius:"12px", border:"1px solid rgba(239,68,68,0.3)", fontSize:"14px" }}>⚠️ {error}</div>}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {[["name","Full Name","text","John Doe"],["email","Email Address","text","john@company.com"]].map(([n,l,t,p])=>(
                    <div key={n}>
                      <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:8 }}>{l}</label>
                      <input name={n} type={t} placeholder={p} value={form[n]} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fafafa", fontSize:15, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:8 }}>Company</label>
                  <input name="company" type="text" placeholder="Your Company" value={form.company} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fafafa", fontSize:15, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:8 }}>Service Interested In</label>
                  <select name="service" value={form.service} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:form.service?"#fafafa":"#666", fontSize:15, outline:"none", fontFamily:"inherit", appearance:"none" }}>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map(s=><option key={s.title} value={s.title}>{s.icon} {s.title}</option>)}
                    <option value="full">🚀 Full-Service Package</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:8 }}>Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your project..." value={form.message} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fafafa", fontSize:15, outline:"none", fontFamily:"inherit", resize:"vertical", minHeight:110 }}
                   onFocus={e=>e.target.style.borderColor="rgb(241, 99, 241)"} onBlur={e=>e.target.style.borderColor="rgba(255, 255, 255, 0.26)"}/>
                </div>
                <button type="submit" disabled={submitting} style={{ padding:"16px", background:submitting?"#2a2a3a":"linear-gradient(135deg,#ff2e93,#00e5c7)", border:"none", borderRadius:14, color:"#fff", fontSize:16, fontWeight:700, cursor:submitting?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:"0 4px 24px hsla(305, 84%, 67%, 0.44)" }}>
                  {submitting?"Sending…":"Send Message →"}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
      <AskAIWidget/>
      <style>{`@media(max-width:868px){.contact-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </main>
  );
}

/* ============================================================
   ADMIN LOGIN
============================================================ */
function AdminLogin({ onLogin }) {
  const [form,    setForm]    = useState({ username:"", password:"" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const handle = e => setForm({...form,[e.target.name]:e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    if(!form.username||!form.password){ setError("Both fields are required."); return; }
    setLoading(true); setError("");
    try {
      const res=await fetch(`${ADMIN_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      localStorage.setItem("adminToken",data.token);
      onLogin(data.token);
    } catch(err){ setError(err.message||"Login failed."); }
    finally{ setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#08080e", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',system-ui,sans-serif", padding:"24px" }}>
      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:56, height:56, borderRadius:16, margin:"0 auto 16px", background:"linear-gradient(135deg,#6366f1,#22d3ee)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🔐</div>
          <h1 style={{ color:"#fafafa", fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", margin:0 }}>Admin Panel</h1>
          <p style={{ color:"#a1a1aa", fontSize:14, marginTop:8 }}>Evolve — Internal Access Only</p>
        </div>
        <div style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:24, padding:36 }}>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {error&&<div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:12, padding:"12px 16px", color:"#fca5a5", fontSize:14 }}>⚠️ {error}</div>}
            {[["username","Username","text","admin"],["password","Password","password","••••••••"]].map(([name,label,type,placeholder])=>(
              <div key={name}>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#fafafa", marginBottom:8 }}>{label}</label>
                <input name={name} type={type} placeholder={placeholder} value={form[name]} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fafafa", fontSize:15, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
              </div>
            ))}
            <button type="submit" disabled={loading} style={{ padding:"13px", marginTop:4, background:loading?"#2a2a3a":"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {loading?"Logging in…":"Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ADMIN DASHBOARD (Contacts)
============================================================ */
function AdminDashboard({ token, onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [stats,    setStats]    = useState({ total:0, today:0, this_week:0 });
  const [search,   setSearch]   = useState("");
  const [service,  setService]  = useState("all");
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error,    setError]    = useState("");
 const [serviceStats, setServiceStats] = useState([]);

  const headers = useMemo(() => ({ "Content-Type":"application/json",
         Authorization:`Bearer ${token}` }), [token]);

  const fetchContacts = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params=new URLSearchParams();
      if(search) params.append("search",search);
      if(service!=="all") params.append("service",service);
      const res=await fetch(`${ADMIN_URL}/contacts?${params}`,{headers});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setContacts(data.contacts); setStats(data.stats); setServiceStats(data.serviceStats);
    } catch(err){ if(err.message.includes("token")||err.message.includes("log in")) onLogout(); setError(err.message||"Failed to load contacts."); }
    finally{ setLoading(false); }
  },[search,service, onLogout, headers]);

    useEffect(() => {
    const timeoutId = setTimeout(() => { fetchContacts(); }, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchContacts]);

  const handleDelete = async id => {
    if(!window.confirm("Delete this contact permanently?")) return;
    setDeleting(id);
    try {
      const res=await fetch(`${ADMIN_URL}/contacts/${id}`,{method:"DELETE",headers});
      const data=await res.json();
      if(!data.success) throw new Error(data.message);
      setContacts(prev=>prev.filter(c=>c.id!==id));
      setStats(prev=>({...prev,total:prev.total-1}));
    } catch(err){ alert("Could not delete: "+err.message); }
    finally{ setDeleting(null); }
  };

  const formatDate = dt => new Date(dt).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"});

  return (
    <main style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ color:"#fafafa", fontFamily:"'Playfair Display',serif", fontSize:"2rem", margin:0 }}>Contact Submissions</h1>
        <p style={{ color:"#a1a1aa", marginTop:8, fontSize:14 }}>All contact form submissions from your website</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:32 }}>
        {[{label:"Total Contacts",value:stats.total,icon:"👥",color:"#6366f1"},{label:"Today",value:stats.today,icon:"📅",color:"#22d3ee"},{label:"This Week",value:stats.this_week,icon:"📈",color:"#34d399"}].map(s=>(
          <div key={s.label} style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"24px 28px", display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:`${s.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{s.icon}</div>
            <div><div style={{ fontSize:28, fontWeight:700, color:"#fafafa", lineHeight:1 }}>{s.value}</div><div style={{ fontSize:13, color:"#a1a1aa", marginTop:4 }}>{s.label}</div></div>
          </div>
        ))}
      </div>
      <div style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24, marginBottom:30 }}>
  <h2 style={{ color:"#fafafa", marginBottom:20, fontSize:"1.2rem", fontWeight:700, }}>  🔥 Most Demanding Services </h2>

  {serviceStats.length === 0 ? (
    <p style={{ color:"#a1a1aa" }}>
      No service data available.
    </p>
  ) : (
      serviceStats.map((item) => {
      const max = serviceStats[0].total;
      const width = (item.total / max) * 100;

      return (
        <div key={item.service} style={{ marginBottom:18 }}>
          <div style={{ display:"flex",justifyContent:"space-between", marginBottom:6, color:"#fafafa"}}>
            <span>{item.service}</span>

            <strong>{item.total} Orders</strong>
          </div>
          <div style={{ width:"100%", height:12, background:"rgba(255,255,255,0.08)", borderRadius:20, overflow:"hidden",}}>
            <div style={{ width:`${width}%`, height:"100%", background:"linear-gradient(90deg,#6366f1,#22d3ee)", borderRadius:20, transition:"0.5s", }}
            />
          </div>
        </div>
      );
    })
  )}
</div>
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap", background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:16 }}>
        <input type="text" placeholder="🔍  Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1, minWidth:200, padding:"10px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fafafa", fontSize:14, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
        <select value={service} onChange={e=>setService(e.target.value)} style={{ padding:"10px 16px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fafafa", fontSize:14, outline:"none", fontFamily:"inherit", cursor:"pointer" }}>
          {["all","SEO & Content","Social Media","PPC Advertising","Brand Strategy","Web Design","Analytics & Reporting"].map(s=><option key={s} value={s}>{s==="all"?"All Services":s}</option>)}
        </select>
        <button onClick={fetchContacts} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#6366f1,#22d3ee)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Refresh</button>
      </div>
      {error&&<div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:12, padding:"14px 18px", color:"#fca5a5", fontSize:14, marginBottom:20 }}>⚠️ {error}</div>}
      <div style={{ background:"#12121c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
        {loading?(<div style={{ textAlign:"center", padding:60, color:"#a1a1aa" }}>Loading contacts...</div>):contacts.length===0?(<div style={{ textAlign:"center", padding:60 }}><div style={{ fontSize:40, marginBottom:12 }}>📭</div><div style={{ color:"#a1a1aa", fontSize:15 }}>No contacts found</div></div>):(
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  {["#","Name","Email","Company","Service","Message","Date","Action"].map(h=><th key={h} style={{ padding:"14px 20px", textAlign:"left", fontSize:12, fontWeight:700, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {contacts.map(c=>(
                  <tr key={c.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,0.05)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"16px 20px", color:"#666", fontSize:13 }}>{c.id}</td>
                    <td style={{ padding:"16px 20px", color:"#fafafa", fontWeight:600, fontSize:14 }}>{c.name}</td>
                    <td style={{ padding:"16px 20px", color:"#818cf8", fontSize:13 }}>{c.email}</td>
                    <td style={{ padding:"16px 20px", color:"#a1a1aa", fontSize:13 }}>{c.company||"—"}</td>
                    <td style={{ padding:"16px 20px" }}><span style={{ padding:"4px 10px", borderRadius:6, fontSize:12, fontWeight:600, background:"rgba(99,102,241,0.15)", color:"#818cf8" }}>{c.service||"—"}</span></td>
                    <td style={{ padding:"16px 20px", color:"#a1a1aa", fontSize:13, maxWidth:200 }}><span title={c.message}>{c.message.length>60?c.message.slice(0,60)+"…":c.message}</span></td>
                    <td style={{ padding:"16px 20px", color:"#666", fontSize:12, whiteSpace:"nowrap" }}>{formatDate(c.created_at)}</td>
                    <td style={{ padding:"16px 20px" }}><button onClick={()=>handleDelete(c.id)} disabled={deleting===c.id} style={{ padding:"6px 14px", background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, color:"#fca5a5", fontSize:12, fontWeight:600, cursor:deleting===c.id?"not-allowed":"pointer", fontFamily:"inherit" }}>{deleting===c.id?"…":"Delete"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

/* ============================================================
   ADMIN PROJECTS
============================================================ */
const PROJECT_STATUSES = ["planning","active","review","completed","on-hold"];
const STATUS_META = { planning:{color:"#818cf8",bg:"rgba(129,140,248,0.12)",label:"Planning"}, active:{color:"#34d399",bg:"rgba(52,211,153,0.12)",label:"Active"}, review:{color:"#f59e0b",bg:"rgba(245,158,11,0.12)",label:"In Review"}, completed:{color:"#22d3ee",bg:"rgba(34,211,238,0.12)",label:"Completed"}, "on-hold":{color:"#ef4444",bg:"rgba(239,68,68,0.12)",label:"On Hold"} };
const EMPTY_FORM = { project_name:"", client_name:"", client_email:"", service:"", status:"planning", progress:0, deadline:"", notes:"" };
const IS = { width:"100%", padding:"11px 14px", background:"#08080e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fafafa", fontSize:14, outline:"none", fontFamily:"inherit" };

 function ProjectForm({ onSubmit, label, form, setField, error, success, saving, onCancel }) {
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

function AdminProjects({ token }) {
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

/* ============================================================
   ADMIN PANEL (main wrapper)
============================================================ */
function AdminPanel() {
  const [token,   setToken]   = useState(()=>localStorage.getItem("adminToken")||null);
  const [section, setSection] = useState("contacts");
  const handleLogin  = t => setToken(t);
  const handleLogout = () => { localStorage.removeItem("adminToken"); setToken(null); };
  if(!token) return <AdminLogin onLogin={handleLogin}/>;

  return (
    <div style={{ minHeight:"100vh", background:"#08080e", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <header style={{ background:"rgba(18,18,28,0.95)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#22d3ee)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚡</div>
            <span style={{ color:"#fafafa", fontWeight:700, fontSize:16 }}>Elevate <span style={{ color:"#6366f1" }}>Admin</span></span>
          </div>
          <nav style={{ display:"flex", gap:4 }}>
            {[["contacts","👥 Contacts"],["projects","📁 Projects"]].map(([id,label])=>(
              <button key={id} onClick={()=>setSection(id)} style={{ padding:"7px 16px", borderRadius:8, fontSize:13, fontWeight:600, border:"none", cursor:"pointer", fontFamily:"inherit", background:section===id?"rgba(99,102,241,0.18)":"transparent", color:section===id?"#818cf8":"#666" }}>{label}</button>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} style={{ padding:"7px 18px", background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, color:"#fca5a5", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit",   marginLeft: "auto" }}>Logout</button>
        <button
  onClick={() => window.location.href = "/"}
  style={{
    padding: "7px 18px",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    color: "#fca5a5",
    cursor: "pointer",
    fontSize: "14px",
  }}
>
  ← Back to Website
</button>
      </header>
      {section==="contacts" && <AdminDashboard token={token} onLogout={handleLogout}/>}
      {section==="projects" && <AdminProjects  token={token}/>}
    </div>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const [legalOpen, setLegalOpen] = useState(null);

  const legalContent = {
    "Privacy Policy": { icon: "🔒", body: "We collect only the information you provide directly to us (name, email, company) when you fill out our contact form. We never sell your data to third parties. Your information is used solely to respond to your inquiry and provide our marketing services. You may request deletion of your data at any time by emailing hello@elevatedigital.com." },
    "Terms of Service": { icon: "📄", body: "By using this website and engaging our services, you agree that all work produced by Evolve remains our intellectual property until final payment is received. Project timelines are estimates and may vary. We require a 50% deposit before work begins. Either party may terminate a project with 14 days written notice." },
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
        <div onClick={() => setLegalOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
         display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 16px", animation: "fadeIn 0.25s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 680, background: "#12121c", border: "1px solid rgba(255,255,255,0.1)", 
            borderRadius: "24px 24px 0 0", padding: "36px 36px 48px", animation: "slideUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94)", maxHeight: "75vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>{legalContent[legalOpen].icon}</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 800, color: "#fafafa", margin: 0 }}>{legalOpen}</h2>
              </div>
              <button onClick={() => setLegalOpen(null)} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fafafa", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ height: 2, background: "linear-gradient(90deg,#ff2e93,#00e5c7)", borderRadius: 2, marginBottom: 24 }} />
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
                <span style={{ width: 32, height: 32, background: "linear-gradient(135deg,#ff2e93,#00e5c7)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem" }}>E</span>
                Elevate <span style={{ background: "linear-gradient(135deg,#ff2e93,#00e5c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Digital</span>
              </button>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>Full-service digital marketing agency helping brands grow online since 2016.</p>
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s) => (
                  <button key={s.label} onClick={() => window.open(s.url, "_blank")} title={s.label}
                    style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", cursor: "pointer", fontSize: 14, background: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fafafa"; e.currentTarget.style.borderColor = "#ff2e93"; e.currentTarget.style.background = "rgba(255,46,147,0.08)"; }}
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
            <p style={{ fontSize: 13, color: "#444" }}>© {new Date().getFullYear()} Evolve. All rights reserved.</p>
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

/* ============================================================
   APP ROOT
============================================================ */
export default function App() {
  const [page, setPage] = useState(
    window.location.pathname === "/admin" ? "admin" : "home"
  );
  const navigateTo = p => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };

  if(page==="admin") return <AdminPanel/>;

  const pages = {
    home:         <HomePage         setPage={navigateTo}/>,
    services:     <ServicesPage     setPage={navigateTo}/>,
    about:        <AboutPage        setPage={navigateTo}/>,
    work:         <WorkPage         setPage={navigateTo}/>,
    testimonials: <TestimonialsPage setPage={navigateTo}/>,
    contact:      <ContactPage      setPage={navigateTo}/>,
  };

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:"#08080e", color:"#a1a1aa", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:#08080e;} ::-webkit-scrollbar-thumb{background:#6366f1;border-radius:3px;}
        html{scroll-behavior:smooth;} body{overflow-x:hidden;}
        @media(max-width:900px){.desktop-nav{display:none!important;}.mobile-toggle{display:flex!important;}}
        @media(max-width:768px){[style*="grid-template-columns: 1fr 1fr"],[style*="grid-template-columns: 1fr 1.2fr"],[style*="grid-template-columns: 1fr 1.5fr"],[style*="grid-template-columns: 1fr 1fr 1fr 1fr"],[style*="grid-template-columns: 1.5fr 1fr 1fr 1fr"]{grid-template-columns:1fr!important;} [style*="grid-template-columns: repeat(auto-fit,minmax(500px"]{grid-template-columns:1fr!important;} [style*="grid-template-columns: repeat(3,1fr)"]{grid-template-columns:1fr!important;} [style*="grid-template-columns: repeat(4,1fr)"]{grid-template-columns:1fr 1fr!important;}}
        @keyframes pageIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <Navbar page={page} setPage={navigateTo}/>
      <div style={{ animation:"pageIn 0.4s ease" }}>
        {pages[page]||pages.home}
      </div>
      <Footer setPage={navigateTo}/>
    </div>
  );
}

