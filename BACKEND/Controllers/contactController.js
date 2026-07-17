
import pool from "../config/db.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO contacts (name, email, company, service, message)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.trim().toLowerCase(),
        company?.trim() || "",
        service || "",
        message.trim(),
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: result.insertId,
    });

  } catch (error) {
    console.error("MySQL save error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong saving your message. Please try again.",
    });
  }
};
