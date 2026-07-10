// backend/routes/projectRoutes.js
import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// All project routes are admin only
router.get("/",        adminAuth, getAllProjects);
router.get("/:id",     adminAuth, getProjectById);
router.post("/",       adminAuth, createProject);
router.put("/:id",     adminAuth, updateProject);
router.delete("/:id",  adminAuth, deleteProject);

export default router;
