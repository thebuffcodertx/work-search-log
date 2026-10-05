import "./ApplicationForm.css";
import { useState } from "react";
import type { ApplicationStatus, JobApplication, WorkType } from "../types/applications";

// function ApplicationForm() {
function ApplicationForm({ onAdd }: { onAdd: (app: JobApplication) => void }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [workType, setWorkType] = useState<WorkType>("Remote");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Interested");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  //   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()

  //   const newApplication: JobApplication = {
  //     id: Date.now(),
  //     companyName,
  //     jobTitle,
  //     jobUrl,
  //     dateApplied,
  //     status,
  //     location,
  //     workType,
  //     contactName,
  //     contactEmail,
  //     notes,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString()
  //   }

  //   const savedApplications = localStorage.getItem("applications")

  //   const applications = savedApplications
  //     ? JSON.parse(savedApplications)
  //     : []

  //   applications.push(newApplication)

  //   localStorage.setItem(
  //     "applications",
  //     JSON.stringify(applications)
  //   )
  // }

  function resetForm() {
    setCompanyName("");
    setJobTitle("");
    setJobUrl("");
    setWorkType("Remote");
    setLocation("");
    setDateApplied("");
    setContactName("");
    setContactEmail("");
    setStatus("Interested");
    setNotes("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newApplication: JobApplication = {
      id: Date.now(),
      companyName,
      jobTitle,
      jobUrl,
      dateApplied,
      status,
      location,
      workType,
      contactName,
      contactEmail,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    fetch("http://localhost:3001/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplication),
    })
      .then((res) => res.json())
      // .then((saved) => console.log("Saved:", saved))
      .then((saved) => {
        onAdd(saved);
        resetForm();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      });
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      {showSuccess && (
  <div className="fixed bottom-4 right-4 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
    Application submitted!
  </div>
)}
      <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobUrl">Job URL</label>
        <input
          type="url"
          id="jobUrl"
          name="jobUrl"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="workType">Work Type</label>
        <select
          id="workType"
          name="workType"
          value={workType}
          onChange={(e) => setWorkType(e.target.value as WorkType)}
        >
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactName">Contact Name</label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        >
          <option value="Interested">Interested</option>
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit">Add Application</button>
    </form>
  );
}

export default ApplicationForm;
