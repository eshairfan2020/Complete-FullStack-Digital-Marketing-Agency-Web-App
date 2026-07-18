import express       from "express";
import cors          from "cors";
import dotenv        from "dotenv";
import chatRoutes    from "./routes/chatRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes   from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// app.use(cors({
//   origin:      ["http://localhost:5173", "http://localhost:3000"],
//   methods:     ["GET", "POST", "DELETE", "PUT"],
//   credentials: true,
// }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL || "*",
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/chat",     chatRoutes);
app.use("/api/contact",  contactRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/projects", projectRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Backend running on port ${PORT}`)
// );

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}

export default app;

