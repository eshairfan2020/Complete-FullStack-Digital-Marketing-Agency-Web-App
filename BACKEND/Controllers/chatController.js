// backend/controllers/chatController.js
import axios from "axios";
import pool from "../config/db.js";

// ─── Your Agency Services (context for Groq) ──────────────────────────────────
const SERVICES = [
  {
    title: "SEO & Content Marketing",
    description:
      "We help businesses rank higher on Google through keyword research, on-page optimization, technical SEO audits, link building, and content strategy tailored to your industry.",
  },
  {
    title: "Social Media Management",
    description:
      "We grow your brand presence across Instagram, TikTok, Facebook, and LinkedIn with consistent posting schedules, short-form video creative, community management, and engagement strategy.",
  },
  {
    title: "PPC Advertising",
    description:
      "We run laser-targeted paid ad campaigns on Google Search, Google Display, Meta, and Instagram — focused on predictable ROI, conversion tracking, and continuous A/B testing.",
  },
  {
    title: "Email Marketing",
    description:
      "We design and automate email campaigns — welcome sequences, newsletters, abandoned cart flows, and re-engagement campaigns — to nurture leads and increase repeat sales.",
  },
  {
    title: "Web Design & Development",
    description:
      "We build fast, mobile-responsive, conversion-optimized websites and landing pages using modern frameworks, with built-in SEO best practices from day one.",
  },
  {
    title: "Brand Strategy",
    description:
      "We define your voice, visual identity, and market positioning through deep research, competitor analysis, and customer interviews — delivering a full brand bible.",
  },
  {
    title: "Analytics & Reporting",
    description:
      "We build custom GA4 setups, Looker Studio dashboards, and attribution models that tie marketing spend directly to revenue with 100% data transparency.",
  },
];

// Build system prompt from services list
function buildSystemPrompt() {
  const serviceList = SERVICES.map(
    (s) => `- ${s.title}: ${s.description}`
  ).join("\n");

  return `You are the official AI assistant for a Digital Marketing Agency.

Here is the complete list of services we offer:
${serviceList}

Instructions:
- If the user asks about any of the services above, answer using ONLY the details provided here. Be specific and helpful.
- If the user asks something unrelated to digital marketing or our services, politely redirect them back to what we offer.
- Keep answers concise (3-5 sentences) unless the user asks for more detail.
- Never invent services we don't offer.
- Speak in a friendly, professional tone — you represent the agency.`;
}

// ─── Main Chat Controller ──────────────────────────────────────────────────────
export const chatController = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Step 1: Call Groq API to get AI answer
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user",   content: question },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    // Step 2: Save question + answer + timestamp to MySQL
    await pool.execute(
      `INSERT INTO chat_history (question, answer) VALUES (?, ?)`,
      [question.trim(), answer.trim()]
    );

    console.log("💬 Chat saved to MySQL");

    // Step 3: Send answer back to frontend
    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("Chat error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Groq API Error",
      error: error.response?.data || error.message,
    });
  }
};
