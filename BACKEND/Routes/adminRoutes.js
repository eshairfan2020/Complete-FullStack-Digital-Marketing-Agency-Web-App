
import express from "express";
import { adminLogin, getContacts, deleteContact } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Public — login
router.post("/login", adminLogin);

// Protected — require valid admin JWT
router.get("/contacts",        adminAuth, getContacts);
router.delete("/contacts/:id", adminAuth, deleteContact);

export default router;
