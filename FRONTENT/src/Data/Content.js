export const NAV_LINKS = [

  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "About", page: "about" },
  { label: "Work", page: "work" },
  { label: "Testimonials", page: "testimonials" },
  { label: "Contact", page: "contact" },
];

export const SERVICES = [
  {
    icon: "🔍",
    title: "SEO & Content",
    description:
      "Rank higher on Google with keyword research, on-page optimization, and content that converts visitors into leads.",
    detail:
      "Our SEO team conducts deep technical audits, builds authoritative backlinks, and crafts long-form content strategies that compound over time. We target high-intent keywords, optimize Core Web Vitals, and deliver monthly transparency reports. Average clients see 3x organic growth in 6 months.",
    color: "#6366f1",
    stats: ["+312%", "Organic Traffic"],
  },
  {
    icon: "📱",
    title: "Social Media",
    description:
      "Build engaged communities and drive brand awareness across Instagram, LinkedIn, TikTok, and more.",
    detail:
      "We manage end-to-end social presence: content calendars, graphic design, copywriting, community moderation, and paid amplification. Our creative team produces Reels, carousels, and stories that stop the scroll. We A/B test constantly to maximize engagement and follower growth.",
    color: "#ec4899",
    stats: ["+580%", "Engagement Rate"],
  },
  {
    icon: "📈",
    title: "PPC Advertising",
    description:
      "Maximize ad spend with targeted Google Ads and Meta campaigns that deliver measurable ROI.",
    detail:
      "From keyword bidding strategies to creative testing and audience segmentation, our certified PPC specialists manage every dollar with precision. We reduce wasted spend, scale winning creatives, and provide weekly performance dashboards. Average ROAS improvement: 4.1x.",
    color: "#f59e0b",
    stats: ["4.1x", "Average ROAS"],
  },
  {
    icon: "🎨",
    title: "Brand Strategy",
    description:
      "Define your voice, visual identity, and positioning to stand out in a crowded marketplace.",
    detail:
      "Brand strategy starts with deep market research, competitor analysis, and customer interviews. We deliver a full brand bible: logo system, color palette, typography, tone-of-voice guidelines, and messaging frameworks. Brands we've repositioned see an average 67% increase in perceived value.",
    color: "#8b5cf6",
    stats: ["+67%", "Perceived Value"],
  },
  {
    icon: "💻",
    title: "Web Design",
    description:
      "Stunning, fast-loading websites built to convert — from landing pages to full e-commerce stores.",
    detail:
      "We design and develop in Webflow, Next.js, and Shopify — always mobile-first with a 95+ PageSpeed score. Every site includes UX research, wireframes, interactive prototypes, and post-launch CRO optimization. Our sites convert on average 2.8x better than industry benchmarks.",
    color: "#22d3ee",
    stats: ["2.8x", "Conversion Rate"],
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    description:
      "Real-time dashboards and monthly reports so you always know exactly what is working.",
    detail:
      "We build custom GA4 setups, Looker Studio dashboards, and attribution models that tie marketing spend directly to revenue. You get a dedicated Slack channel with your team, weekly syncs, and a 30-page monthly report covering every channel, metric, and recommendation.",
    color: "#34d399",
    stats: ["100%", "Data Transparency"],
  },
];

export const PROJECTS = [
  {
    category: "E-Commerce",
    title: "Luxe Fashion Co.",
    result: "+187% Online Sales",
    color: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    description:
      "Complete brand overhaul and e-commerce growth strategy for a luxury fashion retailer.",
    challenge:
      "Luxe Fashion Co. had a beautiful product but was invisible online — a dated website, zero SEO presence, and Meta ads bleeding budget with no targeting.",
    solution:
      "We redesigned their Shopify store with conversion-optimized UX, launched a content-first SEO strategy targeting luxury fashion keywords, and rebuilt their Meta ad funnels with creative testing at scale.",
    results: [
      "+187% online sales in 9 months",
      "3.4x ROAS on paid social",
      "62% reduction in cart abandonment",
      "Organic traffic grew from 800 to 14,000 monthly visitors",
    ],
    duration: "9 months",
    services: ["Web Design", "SEO & Content", "PPC Advertising"],
  },
  {
    category: "SaaS",
    title: "CloudFlow App",
    result: "+340% Lead Generation",
    color: "#22d3ee",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    description:
      "Full-funnel demand generation and ABM strategy for a B2B SaaS project management tool.",
    challenge:
      "CloudFlow was burning through VC cash on broad PPC with a 12% lead-to-close rate and $480 cost-per-acquisition — completely unsustainable at their growth stage.",
    solution:
      "We pivoted to an account-based marketing model: identify ideal customer profiles, create hyper-targeted LinkedIn campaigns, build automated nurture sequences, and optimize landing pages for specific pain points.",
    results: [
      "+340% qualified lead volume",
      "Cost-per-acquisition down to $112",
      "Lead-to-close rate improved to 34%",
      "Series A secured at $8M 6 months after campaign launch",
    ],
    duration: "12 months",
    services: ["PPC Advertising", "Brand Strategy", "Analytics"],
  },
  {
    category: "Healthcare",
    title: "VitalCare Clinic",
    result: "+95% Appointment Bookings",
    color: "#a78bfa",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    description:
      "Local SEO and reputation management campaign for a multi-location healthcare provider.",
    challenge:
      "VitalCare had 4 clinics but ranked on page 3 for nearly every local search term. Competitors were capturing patients who didn't know VitalCare existed.",
    solution:
      "We executed a hyper-local SEO strategy: optimized Google Business Profiles for all 4 locations, built location-specific content hubs, launched a review generation system, and ran geo-targeted Google Ads for high-intent searches like 'urgent care near me'.",
    results: [
      "+95% online appointment bookings",
      "All 4 locations in Google Maps top 3",
      "4.8-star average rating (up from 3.9)",
      "New patient acquisition cost reduced by 41%",
    ],
    duration: "6 months",
    services: ["SEO & Content", "PPC Advertising", "Analytics"],
  },
  {
    category: "Real Estate",
    title: "Prime Properties",
    result: "+210% Website Traffic",
    color: "#34d399",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    description:
      "Content marketing and social media strategy for a luxury real estate brokerage.",
    challenge:
      "Prime Properties had no digital presence in a market where 97% of buyers begin their search online. Their competitors were capturing every organic lead.",
    solution:
      "We launched an editorial content strategy — market reports, neighborhood guides, investment insights — that positioned Prime's agents as the definitive local experts. Combined with a LinkedIn thought-leadership program and Instagram visual storytelling.",
    results: [
      "+210% website traffic in 8 months",
      "28 inbound seller leads per month (was 0)",
      "LinkedIn following grew from 200 to 8,400",
      "$42M in attributed listing revenue",
    ],
    duration: "8 months",
    services: ["SEO & Content", "Social Media", "Brand Strategy"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Elevate Digital transformed our online presence completely. Our organic traffic tripled in just six months, and the ROI has been beyond what we imagined. They are true partners, not just vendors.",
    name: "Sarah Mitchell",
    role: "CEO, Luxe Fashion Co.",
    initials: "SM",
    color: "#6366f1",
  },
  {
    quote:
      "Their PPC team knows exactly what they are doing. We cut our cost-per-lead in half while doubling our conversion rate. The analytics dashboards alone changed how our entire leadership team makes decisions.",
    name: "James Chen",
    role: "Founder, CloudFlow App",
    initials: "JC",
    color: "#22d3ee",
  },
  {
    quote:
      "Professional, responsive, and genuinely invested in our success. The monthly reports are thorough and honest. I never feel like I am in the dark about where our budget is going.",
    name: "Maria Rodriguez",
    role: "Marketing Director, VitalCare",
    initials: "MR",
    color: "#a78bfa",
  },
  {
    quote:
      "We went from zero digital presence to being the most visible luxury brokerage in our market. The content strategy they built for us is an asset that keeps compounding month after month.",
    name: "David Park",
    role: "Principal, Prime Properties",
    initials: "DP",
    color: "#34d399",
  },
];

export const TEAM = [
  {
    name: "Alexandra Reyes",
    role: "CEO & Founder",
    initials: "AR",
    color: "#6366f1",
    bio: "15 years in digital marketing. Former VP at Ogilvy.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Growth",
    initials: "MW",
    color: "#22d3ee",
    bio: "Ex-Google. Managed $50M+ in ad spend.",
  },
  {
    name: "Priya Singh",
    role: "Creative Director",
    initials: "PS",
    color: "#ec4899",
    bio: "Award-winning designer. Ex-Airbnb design team.",
  },
  {
    name: "Tom Nakamura",
    role: "Head of SEO",
    initials: "TN",
    color: "#f59e0b",
    bio: "Built SEO programs for 3 unicorn startups.",
  },
];

