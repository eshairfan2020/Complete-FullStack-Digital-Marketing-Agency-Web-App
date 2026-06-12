
import { useState, useEffect, useRef } from "react";

/* ============================================================
   DATA
============================================================ */
const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "About", page: "about" },
  { label: "Work", page: "work" },
  { label: "Testimonials", page: "testimonials" },
  { label: "Contact", page: "contact" },
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
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
];

const PROJECTS = [
  {
    category: "E-Commerce", title: "Luxe Fashion Co.", result: "+187% Online Sales", color: "#6366f1",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    description: "Complete brand overhaul and e-commerce growth strategy for a luxury fashion retailer.",
    challenge: "Luxe Fashion Co. had a beautiful product but was invisible online — a dated website, zero SEO presence, and Meta ads bleeding budget with no targeting.",
    solution: "We redesigned their Shopify store with conversion-optimized UX, launched a content-first SEO strategy targeting luxury fashion keywords, and rebuilt their Meta ad funnels with creative testing at scale.",
    results: ["+187% online sales in 9 months", "3.4x ROAS on paid social", "62% reduction in cart abandonment", "Organic traffic grew from 800 to 14,000 monthly visitors"],
    duration: "9 months", services: ["Web Design", "SEO & Content", "PPC Advertising"],
  },
  {
    category: "SaaS", title: "CloudFlow App", result: "+340% Lead Generation", color: "#22d3ee",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    description: "Full-funnel demand generation and ABM strategy for a B2B SaaS project management tool.",
    challenge: "CloudFlow was burning through VC cash on broad PPC with a 12% lead-to-close rate and $480 cost-per-acquisition.",
    solution: "We pivoted to an account-based marketing model: identify ideal customer profiles, create hyper-targeted LinkedIn campaigns, build automated nurture sequences.",
    results: ["+340% qualified lead volume", "Cost-per-acquisition down to $112", "Lead-to-close rate improved to 34%", "Series A secured at $8M 6 months after campaign launch"],
    duration: "12 months", services: ["PPC Advertising", "Brand Strategy", "Analytics"],
  },
  {
    category: "Healthcare", title: "VitalCare Clinic", result: "+95% Appointment Bookings", color: "#a78bfa",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    description: "Local SEO and reputation management campaign for a multi-location healthcare provider.",
    challenge: "VitalCare had 4 clinics but ranked on page 3 for nearly every local search term.",
    solution: "We executed a hyper-local SEO strategy: optimized Google Business Profiles for all 4 locations, built location-specific content hubs.",
    results: ["+95% online appointment bookings", "All 4 locations in Google Maps top 3", "4.8-star average rating (up from 3.9)", "New patient acquisition cost reduced by 41%"],
    duration: "6 months", services: ["SEO & Content", "PPC Advertising", "Analytics"],
  },
  {
    category: "Real Estate", title: "Prime Properties", result: "+210% Website Traffic", color: "#34d399",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    description: "Content marketing and social media strategy for a luxury real estate brokerage.",
    challenge: "Prime Properties had no digital presence in a market where 97% of buyers begin their search online.",
    solution: "We launched an editorial content strategy — market reports, neighborhood guides, investment insights.",
    results: ["+210% website traffic in 8 months", "28 inbound seller leads per month (was 0)", "LinkedIn following grew from 200 to 8,400", "$42M in attributed listing revenue"],
    duration: "8 months", services: ["SEO & Content", "Social Media", "Brand Strategy"],
  },
];

const TESTIMONIALS = [
  { quote: "Elevate Digital transformed our online presence completely. Our organic traffic tripled in just six months, and the ROI has been beyond what we imagined. They are true partners, not just vendors.", name: "Sarah Mitchell", role: "CEO, Luxe Fashion Co.", initials: "SM", color: "#6366f1" },
  { quote: "Their PPC team knows exactly what they are doing. We cut our cost-per-lead in half while doubling our conversion rate. The analytics dashboards alone changed how our entire leadership team makes decisions.", name: "James Chen", role: "Founder, CloudFlow App", initials: "JC", color: "#22d3ee" },
  { quote: "Professional, responsive, and genuinely invested in our success. The monthly reports are thorough and honest. I never feel like I am in the dark about where our budget is going.", name: "Maria Rodriguez", role: "Marketing Director, VitalCare", initials: "MR", color: "#a78bfa" },
  { quote: "We went from zero digital presence to being the most visible luxury brokerage in our market. The content strategy they built for us is an asset that keeps compounding month after month.", name: "David Park", role: "Principal, Prime Properties", initials: "DP", color: "#34d399" },
];

const TEAM = [
  { name: "Alexandra Reyes", role: "CEO & Founder", initials: "AR", color: "#6366f1", bio: "15 years in digital marketing. Former VP at Ogilvy." },
  { name: "Marcus Webb", role: "Head of Growth", initials: "MW", color: "#22d3ee", bio: "Ex-Google. Managed $50M+ in ad spend." },
  { name: "Priya Singh", role: "Creative Director", initials: "PS", color: "#ec4899", bio: "Award-winning designer. Ex-Airbnb design team." },
  { name: "Tom Nakamura", role: "Head of SEO", initials: "TN", color: "#f59e0b", bio: "Built SEO programs for 3 unicorn startups." },
];

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
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Card3D({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const onMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: cy * -12, y: cx * 12 });
  };
  return (
    <div ref={ref} className={className} style={{
      ...style,
      transform: hov ? `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.04,1.04,1.04)` : "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)",
      transition: hov ? "transform 0.1s ease" : "transform 0.5s ease",
      willChange: "transform",
      transformStyle: "preserve-3d",
    }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}>
      {children}
    </div>
  );
}

/* ============================================================
   ✅ NEW: EXPANDING CARDS COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   WHAT WAS ADDED & HOW IT WORKS:
   ─────────────────────────────────────────────────────────
   1. ALL 6 CARDS ARE SHOWN AT ONCE in a 3×2 grid (3 per row).
      No scrolling needed to see them — they are all visible
      on the homepage together.

   2. HOVER = EXPAND TO CENTER:
      When you hover any card:
      • That card SCALES UP (grows bigger via transform:scale)
      • Its z-index goes to 50 so it floats above all others
      • A full-screen BLUR OVERLAY appears behind it
        (position:fixed dark+blur layer, z-index:40)
      • The card's background IMAGE zooms in slightly
      • The full description + CTA button fade in at the bottom
      • The icon starts floating animation (floatIcon keyframe)
      • Spinning rings + orbiting dots appear (just like before)

   3. MOUSE LEAVE = COLLAPSE BACK:
      When you move mouse away, everything smoothly returns:
      • Card shrinks back to original size (scale:1)
      • Blur overlay fades out
      • Detail content fades out

   4. BACKGROUND BLUR:
      A <div> with position:fixed covers the ENTIRE screen
      with backdrop-filter:blur(12px) and a dark overlay.
      It only appears (opacity:1) when a card is hovered.
      The hovered card itself has a higher z-index (50)
      than the blur layer (40), so the card floats ON TOP
      of the blur — making all OTHER cards look blurred.

   5. STAGGERED ENTRANCE:
      When the section scrolls into view, each card fades in
      one by one using IntersectionObserver + CSS animation
      with delay = index × 0.1s.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
============================================================ */
function ExpandingCardsSection({ setPage }) {
  // hoveredIndex: which card is currently being hovered (-1 = none)
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  // revealed: true when section has scrolled into viewport → triggers entrance animation
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  // Watch for section to enter viewport → reveal cards one by one
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const isAnyHovered = hoveredIndex !== -1;

  return (
    <section
      ref={sectionRef}
      style={{ background: "#08080e", padding: "80px 0 100px", position: "relative" }}
    >
      {/* ── Section header ── */}
      <div style={{ textAlign: "center", padding: "0 24px 56px" }}>
        <AnimatedSection>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>
            What We Do
          </span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "#fafafa", marginBottom: 16 }}>
            Services Built for Growth
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#a1a1aa", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Hover any card to explore that service in detail.
          </p>
        </AnimatedSection>
      </div>

      {/*
        ── FULL-SCREEN BLUR OVERLAY ──
        This div covers the ENTIRE screen when any card is hovered.
        It uses backdrop-filter:blur to blur everything behind it.
        The hovered card has z-index:50, this overlay has z-index:40,
        so the card floats sharp ABOVE the blur.
        All non-hovered cards sit at z-index:1 — BELOW the blur → they look blurred.
      */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        // Only visible when a card is hovered
        opacity: isAnyHovered ? 1 : 0,
        // backdropFilter blurs everything rendered behind this div
        //backdropFilter: isAnyHovered ? "blur(14px)" : "blur(0px)",
        //WebkitBackdropFilter: isAnyHovered ? "blur(14px)" : "blur(0px)",
       // background: isAnyHovered ? "rgba(5,5,12,0.72)" : "rgba(5,5,12,0)",
        transition: "opacity 0.4s ease, backdrop-filter 0.4s ease",
        // pointer-events:none so it doesn't block mouse events on the cards
        pointerEvents: "none",
      }} />

      {/* ── Cards Grid: 3 columns × 2 rows ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 32px",
        position: "relative",
        // zIndex:1 keeps the grid below the blur overlay
        // (individual hovered card will override with zIndex:50)
        zIndex: 1,
      }}
        className="expanding-cards-grid"
      >
        {SERVICES.map((s, i) => {
          const isHovered = hoveredIndex === i;

          // Staggered entrance: each card appears with delay i*0.1s
          const entranceDelay = revealed ? i * 0.1 : 9;

          return (
            <div
              key={s.title}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                // ── HEIGHT ──
                // Normal: 260px. Hovered: 400px (taller to show content)
                height: isHovered ? 420 : 270,

                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                border: `1px solid ${isHovered ? s.color + "80" : "rgba(255,255,255,0.08)"}`,

                // ── SCALE & Z-INDEX ──
                // Hovered card: scale(1.06) + z-index:50 (floats above blur layer)
                // Normal card: scale(1) + z-index:1
                transform: isHovered ? "scale(1.06)" : "scale(1)",
                zIndex: isHovered ? 50 : 1,

                // ── TRANSITIONS ──
                transition: [
                  "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                  "height 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                  "border-color 0.3s ease",
                  "box-shadow 0.4s ease",
                  "z-index 0s",
                  "opacity 0.5s ease",
                ].join(", "),

                // Glow shadow when hovered
                boxShadow: isHovered
                  ? `0 0 0 1px ${s.color}60, 0 24px 60px ${s.color}30, 0 48px 80px rgba(0,0,0,0.6)`
                  : "0 4px 20px rgba(0,0,0,0.3)",

                // Staggered entrance animation
                animation: revealed ? `cardReveal 0.55s ${entranceDelay}s both` : "none",
              }}
            >
              {/* ── Background image ── */}
              <img
                src={s.bg}
                alt={s.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  // Image brightens + zooms on hover
                  filter: isHovered ? "brightness(0.38) saturate(0.65)" : "brightness(0.2) saturate(0.35)",
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  transition: "filter 0.5s ease, transform 0.6s ease",
                }}
              />

              {/* ── Colour gradient overlay (bottom fade) ── */}
              <div style={{
                position: "absolute", inset: 0,
                background: isHovered
                  ? `linear-gradient(160deg, ${s.color}22 0%, rgba(8,8,14,0.9) 55%, rgba(8,8,14,0.98) 100%)`
                  : `linear-gradient(to top, rgba(8,8,14,0.95) 0%, rgba(8,8,14,0.4) 100%)`,
                transition: "background 0.5s ease",
              }} />

              {/* ── Pulsing glow orb (visible on hover) ── */}
              <div style={{
                position: "absolute",
                top: "30%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 200, height: 200,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${s.color}35 0%, transparent 65%)`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.5s ease",
                animation: isHovered ? "pulseGlow 3s ease-in-out infinite" : "none",
                pointerEvents: "none",
              }} />

              {/* ── Spinning outer ring (hover only) ── */}
              {isHovered && (
                <div style={{
                  position: "absolute", top: "28%", left: "50%",
                  width: 120, height: 120,
                  marginTop: -60, marginLeft: -60,
                  borderRadius: "50%",
                  border: `1.5px dashed ${s.color}45`,
                  animation: "spinCW 10s linear infinite",
                  pointerEvents: "none",
                }} />
              )}

              {/* ── Spinning inner ring CCW (hover only) ── */}
              {isHovered && (
                <div style={{
                  position: "absolute", top: "28%", left: "50%",
                  width: 86, height: 86,
                  marginTop: -43, marginLeft: -43,
                  borderRadius: "50%",
                  border: `1px dashed ${s.color}60`,
                  animation: "spinCCW 7s linear infinite",
                  pointerEvents: "none",
                }} />
              )}

              {/* ── Orbiting dot (hover only) ── */}
              {isHovered && (
                <div style={{
                  position: "absolute", top: "28%", left: "50%",
                  width: 0, height: 0,
                  animation: "orbitCard 5s linear infinite",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: s.color,
                    boxShadow: `0 0 10px ${s.color}`,
                    marginTop: -4, marginLeft: -4,
                  }} />
                </div>
              )}

              {/* ── Service icon ── */}
              <div style={{
                position: "absolute",
                // Icon moves up when hovered to make room for content below
                top: isHovered ? "22%" : "35%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                fontSize: isHovered ? 52 : 38,
                lineHeight: 1,
                transition: "top 0.45s ease, font-size 0.45s ease",
                animation: isHovered ? "floatIcon 3.5s ease-in-out infinite" : "none",
                filter: isHovered ? `drop-shadow(0 0 18px ${s.color}80)` : "none",
                zIndex: 2,
              }}>
                {s.icon}
              </div>

              {/* ── Always-visible bottom label (shown when NOT hovered) ── */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "20px 22px",
                opacity: isHovered ? 0 : 1,
                transform: isHovered ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                zIndex: 2,
              }}>
                {/* Small stat badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: `${s.color}20`,
                  border: `1px solid ${s.color}40`,
                  borderRadius: 50, padding: "3px 10px",
                  marginBottom: 8,
                }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", color: s.color, letterSpacing: "0.05em", lineHeight: 1 }}>{s.stats[0]}</span>
                  <span style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 600 }}>{s.stats[1]}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 800, color: "#fafafa", lineHeight: 1.2 }}>{s.title}</h3>
              </div>

              {/* ── Expanded content (slides up on hover) ── */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "24px 24px 28px",
                // Fades in only when hovered
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(20px)",
                // Slight delay so it appears after the card finishes expanding
                transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
                zIndex: 2,
              }}>
                {/* Stat badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}50`,
                  borderRadius: 50, padding: "5px 14px",
                  marginBottom: 12,
                  animation: isHovered ? "badgePulse 2.5s ease-in-out infinite" : "none",
                }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: s.color, letterSpacing: "0.06em", lineHeight: 1 }}>{s.stats[0]}</span>
                  <span style={{ fontSize: 11, color: "#ccc", fontWeight: 600 }}>{s.stats[1]}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.2rem,2vw,1.55rem)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 10, lineHeight: 1.2,
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}>
                  {s.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.65, marginBottom: 18,
                  textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                }}>
                  {s.description}
                </p>

                {/* Explore button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setPage("services"); }}
                  style={{
                    padding: "9px 24px",
                    background: s.color,
                    border: "none", borderRadius: 50,
                    color: "#fff", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: `0 4px 18px ${s.color}55`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
                >
                  Explore →
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* CSS keyframes for all animations used inside this component */}
      <style>{`
        /* Card floats up when first entering viewport */
        @keyframes cardReveal {
          from { opacity: 0; transform: scale(0.88) translateY(28px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        /* Icon bobs up and down gently */
        @keyframes floatIcon {
          0%,100% { transform: translateX(-50%) translateY(-50%); }
          40%      { transform: translateX(-50%) translateY(calc(-50% - 10px)) rotate(3deg); }
          70%      { transform: translateX(-50%) translateY(calc(-50% - 4px)) rotate(-2deg); }
        }
        /* Outer ring rotates clockwise */
        @keyframes spinCW  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        /* Inner ring rotates counter-clockwise */
        @keyframes spinCCW { from{transform:rotate(360deg)} to{transform:rotate(0deg)}    }
        /* Glow orb breathes in and out */
        @keyframes pulseGlow {
          0%,100% { opacity:0.4; transform:translate(-50%,-50%) scale(1);    }
          50%      { opacity:0.7; transform:translate(-50%,-50%) scale(1.18); }
        }
        /* Dot orbits around the icon area */
        @keyframes orbitCard {
          from { transform: rotate(0deg)   translateX(52px) rotate(0deg);    }
          to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
        }
        /* Stat badge pulses opacity */
        @keyframes badgePulse { 0%,100%{opacity:.75} 50%{opacity:1} }

        /* Responsive: 2 columns on tablet, 1 on mobile */
        @media (max-width: 900px) {
          .expanding-cards-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .expanding-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   NAVBAR
============================================================ */
function Navbar({ page, setPage }) {
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
      background: Math.random() > 0.5 ? "#6366f1" : "#22d3ee",
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
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#08080e" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.25),transparent 70%)", top: -200, right: -200, animation: "float1 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.15),transparent 70%)", bottom: -100, left: -100, animation: "float2 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at 50% 50%,black 30%,transparent 80%)" }} />
          {particles.map((p, i) => (
            <div key={i} style={{ position: "absolute", width: p.width, height: p.height, borderRadius: "50%", background: p.background, opacity: 0.4, left: p.left, top: p.top, animation: `particle ${p.animationDuration}s ease-in-out infinite`, animationDelay: `${p.animationDelay}s` }} />
          ))}
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", position: "relative", textAlign: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease forwards", opacity: 0, marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 50, fontSize: 13, fontWeight: 600, color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, background: "#22d3ee", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Award-Winning Digital Agency
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, color: "#fafafa", lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.02em", animation: "fadeUp 0.8s 0.15s ease forwards", opacity: 0, textAlign: "center" }}>
            We Grow Brands That{" "}
            <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dominate Online</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75, maxWidth: 580, marginBottom: 44, color: "#a1a1aa", animation: "fadeUp 0.8s 0.3s ease forwards", opacity: 0, margin: "0 auto 44px auto", textAlign: "center" }}>
            Strategy, creativity, and data-driven campaigns that turn clicks into customers. Partner with Elevate Digital and watch your business scale beyond expectations.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, animation: "fadeUp 0.8s 0.45s ease forwards", opacity: 0, justifyContent: "center" }}>
            <button onClick={() => setPage("contact")}
              style={{ padding: "16px 36px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)", transition: "transform 0.2s,box-shadow 0.2s", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Start Your Project →
            </button>
            <button onClick={() => setPage("work")}
              style={{ padding: "16px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, color: "#fafafa", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s,background 0.2s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
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

      {/* ✅ EXPANDING CARDS — replaces old FullScreenServiceCards */}
      <ExpandingCardsSection setPage={setPage} />

      {/* CTA BAND */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.08))", borderTop: "1px solid rgba(99,102,241,0.2)", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
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
                style={{ padding: "18px 48px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 50, color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 40px rgba(99,102,241,0.4)", transition: "transform 0.2s", fontFamily: "inherit" }}
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
    </main>
  );
}

/* ============================================================
   SERVICES PAGE
============================================================ */
function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", background: "linear-gradient(180deg,#0d0d20,#08080e)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <AnimatedSection>
          <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", marginBottom: 16 }}>Our Services</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Everything You Need to <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Win Online</span>
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
                        style={{ marginTop: 20, padding: "10px 24px", background: `linear-gradient(135deg,${s.color},#22d3ee)`, border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
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
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>About Us</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            A Team Obsessed With <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Your Success</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 100 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa", marginBottom: 24, lineHeight: 1.3 }}>Founded in 2016 with one mission: make marketing honest.</h2>
              <p style={{ color: "#a1a1aa", lineHeight: 1.8, marginBottom: 20 }}>Elevate Digital was born from frustration — too many agencies promising the moon, delivering mediocre reports, and billing clients for activity instead of results. We built something different.</p>
              <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>Today we are a 40-person team of strategists, designers, and data scientists serving 250+ brands worldwide.</p>
              <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[["2016", "Founded"], ["250+", "Clients"], ["40+", "Team Members"], ["$120M+", "Revenue Generated"]].map(([v, l]) => (
                  <div key={l} style={{ padding: "20px 24px", background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, textAlign: "center", minWidth: 100 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: "#fafafa", letterSpacing: "0.05em" }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ padding: 36, background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, marginBottom: 16 }}>
                <div style={{ fontSize: "1.4rem", fontFamily: "'Playfair Display',serif", color: "#fafafa", lineHeight: 1.5, marginBottom: 20, fontStyle: "italic" }}>"Marketing is no longer about the stuff you make, but the stories you tell."</div>
                <div style={{ fontSize: 13, color: "#818cf8" }}>— Seth Godin</div>
              </div>
              <div style={{ padding: "24px 32px", background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.08))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color: "#fafafa", letterSpacing: "0.05em", lineHeight: 1 }}>8+</span>
                <span style={{ color: "#fafafa", fontWeight: 600 }}>Years of Excellence</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa", marginBottom: 40, textAlign: "center" }}>How We Work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, marginBottom: 80 }}>
            {[
              { icon: "📊", title: "Data-Driven", desc: "Every decision backed by analytics.", color: "#6366f1" },
              { icon: "🔍", title: "Transparent", desc: "Clear reporting and honest communication.", color: "#22d3ee" },
              { icon: "🎯", title: "Results-Focused", desc: "We measure success by your revenue, not vanity metrics.", color: "#ec4899" },
              { icon: "🤝", title: "Partnership Mindset", desc: "We act as an extension of your team.", color: "#f59e0b" },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <Card3D>
                  <div style={{ padding: 28, background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, height: "100%" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${v.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{v.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>{v.title}</h3>
                    <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>{v.desc}</p>
                  </div>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fafafa", marginBottom: 12, textAlign: "center" }}>Meet the Team</h2>
          <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: 48 }}>Senior strategists with real-world experience at the world's best companies.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {TEAM.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.1}>
                <Card3D>
                  <div style={{ padding: 28, background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, textAlign: "center" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg,${m.color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: "#fff", margin: "0 auto 16px" }}>{m.initials}</div>
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
    </main>
  );
}

/* ============================================================
   WORK PAGE
============================================================ */
function WorkPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  return (
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
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
                style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg,${PROJECTS[selected].color},#22d3ee)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Start a Similar Project →
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(34,211,238,0.08),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>Our Work</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            Results That <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Speak for Themselves</span>
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
    <main style={{ paddingTop: 72, background: "#08080e", minHeight: "100vh" }}>
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.1),transparent 60%)" }} />
        <AnimatedSection>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", display: "block", marginBottom: 16 }}>Testimonials</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#fafafa", marginBottom: 20 }}>
            What Our <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Clients Say</span>
          </h1>
        </AnimatedSection>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" }}>
        <AnimatedSection>
          <div style={{ padding: "48px", background: "#12121c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, marginBottom: 40, position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${TESTIMONIALS[active].color},#22d3ee)`, transition: "all 0.5s" }} />
            <div style={{ fontSize: 60, color: TESTIMONIALS[active].color, opacity: 0.3, fontFamily: "Georgia,serif", lineHeight: 0.8, marginBottom: 24 }}>"</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "#fafafa", lineHeight: 1.7, marginBottom: 36, transition: "all 0.4s" }}>
              {TESTIMONIALS[active].quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${TESTIMONIALS[active].color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{TESTIMONIALS[active].initials}</div>
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
                <div style={{ padding: 24, background: "#12121c", border: `1px solid ${i === active ? t.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setActive(i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#22d3ee)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
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
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["name", "Full Name", "text", "John Doe"], ["email", "Email", "email", "john@company.com"]].map(([n, l, t, p]) => (
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
                <button onClick={() => setSubmitted(true)}
                  style={{ padding: "16px", background: "linear-gradient(135deg,#6366f1,#22d3ee)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s,box-shadow 0.2s", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(99,102,241,0.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(99,102,241,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.3)"; }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </main>
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

/* ============================================================
   APP ROOT
============================================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const navigateTo = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pages = {
    home: <HomePage setPage={navigateTo} />,
    services: <ServicesPage setPage={navigateTo} />,
    about: <AboutPage setPage={navigateTo} />,
    work: <WorkPage setPage={navigateTo} />,
    testimonials: <TestimonialsPage setPage={navigateTo} />,
    contact: <ContactPage setPage={navigateTo} />,
  };

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: "#08080e", color: "#a1a1aa", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #08080e; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 3px; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @media (max-width: 900px) { .desktop-nav{display:none!important;} .mobile-toggle{display:flex!important;} }
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 1fr"],[style*="grid-template-columns: 1fr 1.2fr"],[style*="grid-template-columns: 1fr 1.5fr"],[style*="grid-template-columns: 1fr 1fr 1fr 1fr"],[style*="grid-template-columns: 1.5fr 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(auto-fit,minmax(500px"] { grid-template-columns: 1fr !important; }
        }
        @keyframes pageIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <Navbar page={page} setPage={navigateTo} />
      <div style={{ animation: "pageIn 0.4s ease" }}>
        {pages[page] || pages.home}
      </div>
      <Footer setPage={navigateTo} />
    </div>
  );
}
