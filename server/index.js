import express from "express"
import cors from "cors"
import pool from "./config/db.js"

const app = express()
app.use(cors())
app.use(express.json())

// app.get("/api/applications", (req, res) => {
//   res.json([{
//   id: 1,
//   companyName: "Acme Corp",
//   jobTitle: "Frontend Developer",
//   jobUrl: "https://example.com/jobs/123",
//   dateApplied: "2026-09-28",
//   status: "Interviewing",
//   location: "Austin, TX",
//   workType: "Hybrid",
//   contactName: "Jordan Lee",
//   contactEmail: "jordan@example.com",
//   notes: "Phone screen went well. Technical interview next week.",
//   createdAt: "2026-09-28T10:00:00Z",
//   updatedAt: "2026-10-01T14:30:00Z",
// }])
// })

const applications = [
  {
    id: 1,
    companyName: "Acme Corp",
    jobTitle: "Frontend Developer",
    jobUrl: "https://example.com/jobs/123",
    dateApplied: "2026-09-28",
    status: "Interviewing",
    location: "Austin, TX",
    workType: "Hybrid",
    contactName: "Jordan Lee",
    contactEmail: "jordan@example.com",
    notes: "Phone screen went well. Technical interview next week.",
    createdAt: "2026-09-28T10:00:00Z",
    updatedAt: "2026-10-01T14:30:00Z",
  },
]

//GET Requests
app.get("/api/applications", (req, res) => {
    res.json(applications)
})

//POSTS
app.post("/api/applications", (req, res) => {
  const now = new Date().toISOString()
  const newApplication = { id: Date.now(), ...req.body, createdAt: now, updatedAt: now }
  applications.push(newApplication)
  res.status(201).json(newApplication)
})

try {
  await pool.query("SELECT 1")
  console.log("Connected to MySQL")
} catch (err) {
  console.error("MySQL connection failed:", err.message)
}


app.listen(3001, () => console.log("Server running on http://localhost:3001"))