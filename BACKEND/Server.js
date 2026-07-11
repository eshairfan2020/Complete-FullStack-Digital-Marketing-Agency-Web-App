// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

console.log("Groq API Key:", process.env.GROQ_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat",    chatRoutes);     // Groq AI chat
app.use("/api/contact", contactRoutes);  // Contact form → MySQL

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running smoothly on port ${PORT}`)
);

