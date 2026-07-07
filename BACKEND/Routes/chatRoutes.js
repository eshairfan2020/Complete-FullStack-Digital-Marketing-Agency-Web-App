// backend/routes/chatRoutes.js
import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatController);

export default router;
