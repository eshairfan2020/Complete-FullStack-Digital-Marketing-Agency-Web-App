// backend/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Creates a connection pool (handles multiple requests efficiently)
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "My_password",  // default password if not set in .env
  database: process.env.DB_NAME     || "elevate_digital",
  waitForConnections: true,
  connectionLimit: 10,
});

// Test the connection when server starts
pool.getConnection()
  .then((conn) => {
    console.log("✅ MySQL Connected Successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL Connection Error:", err.message);
    process.exit(1);
  });

export default pool;
