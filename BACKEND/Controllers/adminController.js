// backend/controllers/adminController.js
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

// ─── Admin Login ───────────────────────────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Check against .env credentials
    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Issue a JWT token valid for 8 hours
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET || "admin_secret_key",
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─── Get All Contacts ──────────────────────────────────────────────────────────
export const getContacts = async (req, res) => {
  try {
    const { search, service } = req.query;

    let query = "SELECT * FROM contacts WHERE 1=1";
    const params = [];

    // Search by name or email
    if (search) {
      query += " AND (name LIKE ? OR email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    // Filter by service
    if (service && service !== "all") {
      query += " AND service = ?";
      params.push(service);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.execute(query, params);

    // Get stats
    const [[{ total }]]        = await pool.execute("SELECT COUNT(*) AS total FROM contacts");
    const [[{ today }]]        = await pool.execute("SELECT COUNT(*) AS today FROM contacts WHERE DATE(created_at) = CURDATE()");
    const [[{ this_week }]]    = await pool.execute("SELECT COUNT(*) AS this_week FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");

    return res.status(200).json({
      success: true,
      contacts: rows,
      stats: { total, today, this_week },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return res.status(500).json({ success: false, message: "Could not fetch contacts." });
  }
};

// ─── Delete a Contact ──────────────────────────────────────────────────────────
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute("DELETE FROM contacts WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }

    return res.status(200).json({ success: true, message: "Contact deleted." });
  } catch (error) {
    console.error("Delete contact error:", error);
    return res.status(500).json({ success: false, message: "Could not delete contact." });
  }
};
