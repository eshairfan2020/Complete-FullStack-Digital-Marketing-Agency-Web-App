// backend/controllers/projectController.js
import pool from "../config/db.js";

const VALID_STATUSES   = ["planning", "active", "review", "completed", "on-hold"];
const VALID_SERVICES   = [
  "SEO & Content", "Social Media", "PPC Advertising",
  "Brand Strategy", "Web Design", "Analytics & Reporting", "Full-Service Package",
];

// ─── 1. Get All Projects ───────────────────────────────────────────────────────
export const getAllProjects = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query  = "SELECT * FROM projects WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }
    if (search) {
      query += " AND (project_name LIKE ? OR client_name LIKE ? OR client_email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.execute(query, params);

    // Stats
    const [[{ total }]]     = await pool.execute("SELECT COUNT(*) AS total FROM projects");
    const [[{ active }]]    = await pool.execute("SELECT COUNT(*) AS active FROM projects WHERE status = 'active'");
    const [[{ completed }]] = await pool.execute("SELECT COUNT(*) AS completed FROM projects WHERE status = 'completed'");
    const [[{ overdue }]]   = await pool.execute(
      "SELECT COUNT(*) AS overdue FROM projects WHERE deadline < CURDATE() AND status != 'completed'"
    );

    return res.status(200).json({
      success: true,
      projects: rows,
      stats: { total, active, completed, overdue },
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch projects." });
  }
};

// ─── 2. Get Single Project ────────────────────────────────────────────────────
export const getProjectById = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    return res.status(200).json({ success: true, project: rows[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch project." });
  }
};

// ─── 3. Create Project ────────────────────────────────────────────────────────
export const createProject = async (req, res) => {
  try {
    const {
      project_name, client_name, client_email,
      service, status = "planning", progress = 0,
      deadline, notes = "",
    } = req.body;

    // Validation
    if (!project_name?.trim() || !client_name?.trim() || !client_email?.trim() || !service || !deadline) {
      return res.status(400).json({
        success: false,
        message: "project_name, client_name, client_email, service, and deadline are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client_email)) {
      return res.status(400).json({ success: false, message: "Invalid client email." });
    }

    const progressVal = Math.min(100, Math.max(0, parseInt(progress) || 0));

    const [result] = await pool.execute(
      `INSERT INTO projects
        (project_name, client_name, client_email, service, status, progress, deadline, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project_name.trim(), client_name.trim(),
        client_email.trim().toLowerCase(),
        service, status, progressVal, deadline, notes.trim(),
      ]
    );

    const [rows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [result.insertId]);

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: rows[0],
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ success: false, message: "Failed to create project." });
  }
};

// ─── 4. Update Project ────────────────────────────────────────────────────────
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_name, client_name, client_email,
      service, status, progress, deadline, notes,
    } = req.body;

    // Check exists
    const [existing] = await pool.execute("SELECT * FROM projects WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const current = existing[0];
    const progressVal = progress !== undefined
      ? Math.min(100, Math.max(0, parseInt(progress)))
      : current.progress;

    await pool.execute(
      `UPDATE projects SET
        project_name  = ?,
        client_name   = ?,
        client_email  = ?,
        service       = ?,
        status        = ?,
        progress      = ?,
        deadline      = ?,
        notes         = ?
       WHERE id = ?`,
      [
        project_name  ?? current.project_name,
        client_name   ?? current.client_name,
        client_email  ?? current.client_email,
        service       ?? current.service,
        status        ?? current.status,
        progressVal,
        deadline      ?? current.deadline,
        notes         ?? current.notes,
        id,
      ]
    );

    const [updated] = await pool.execute("SELECT * FROM projects WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Project updated.",
      project: updated[0],
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({ success: false, message: "Failed to update project." });
  }
};

// ─── 5. Delete Project ────────────────────────────────────────────────────────
export const deleteProject = async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM projects WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    return res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete project." });
  }
};
