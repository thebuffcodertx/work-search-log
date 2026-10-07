import pool from '../config/db.js';

//FINDALL
export async function findAll(userId, filters = {}) {
  const { from, to, status, role } = filters;
  let sql = 'SELECT * FROM work_searches WHERE user_id = ?';
  const params = [userId];

  if (from) { sql += ' AND activity_date >= ?'; params.push(from); }
  if (to) { sql += ' AND activity_date <= ?'; params.push(to); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (role) { sql += ' AND job_title LIKE ?'; params.push(`%${role}%`); }

  sql += ' ORDER BY activity_date DESC';

  const [rows] = await pool.query(sql, params);
  return rows;
}

//FINDONE
export async function findById(id, userId) {
    const sql = 'SELECT * FROM work_searches WHERE id = ? AND user_id = ?';
    const [rows] = await pool.query(sql, [id, userId]);
    return rows[0] ?? null;
}

//CREATE
export async function create(userId, data) {
  const {
    activityType, activityDate, companyName, jobTitle, jobUrl,
    platform, workType, location, contactName, contactEmail, status, notes,
  } = data;

  const sql = `INSERT INTO work_searches
    (user_id, activity_type, activity_date, company_name, job_title, job_url,
     platform, work_type, location, contact_name, contact_email, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [ userId, activityType, activityDate, companyName, jobTitle, jobUrl,
    platform, workType, location, contactName, contactEmail, status, notes];  // 13 values, matching the 13 columns above

  const [result] = await pool.query(sql, params);
  return findById(result.insertId, userId);
}

//UPDATE
export async function update(id, userId, data) {
  const {
    activityType, activityDate, companyName, jobTitle, jobUrl,
    platform, workType, location, contactName, contactEmail, status, notes,
  } = data;

  const sql = `UPDATE work_searches SET
    activity_type = ?, activity_date = ?, company_name = ?, job_title = ?, job_url = ?,
    platform = ?, work_type = ?, location = ?, contact_name = ?, contact_email = ?,
    status = ?, notes = ?
    WHERE id = ? AND user_id = ?`;

  const params = [ activityType, activityDate, companyName, jobTitle, jobUrl,
    platform, workType, location, contactName, contactEmail, status, notes,id, userId ];  // 14 values: the 12 SET fields in order, then the 2 WHERE values

  const [result] = await pool.query(sql, params);
  if (result.affectedRows === 0) return null;
  return findById(id, userId);
}

//DELETE
export async function remove(id, userId){
     const sql = `DELETE FROM work_searches WHERE id = ? AND user_id = ?`;
     const [result] = await pool.query(sql, [id, userId]);
     return result.affectedRows > 0;
}