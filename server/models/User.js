import pool from "../config/db.js";

// Columns safe to send back to the app (never the password hash)
const PUBLIC_COLUMNS =
  "id, first_name, last_name, email, created_at, updated_at";

export async function findUserById(id) {
  const sql = `SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0] ?? null;
}

export async function findUserByEmail(email) {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.query(sql, [email]);
  return rows[0] ?? null;
}

export async function createUser({ firstName, lastName, email, passwordHash }) {
  const sql = `INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    firstName,
    lastName,
    email,
    passwordHash,
  ]);
  return findUserById(result.insertId);
}

export async function updateUser(id, { firstName, lastName, email }) {
  const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [firstName, lastName, email, id]);
  if (result.affectedRows === 0) return null;
  return findUserById(id);
}

export async function deleteUser(id) {
  const sql = "DELETE FROM users WHERE id = ?";
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
}
