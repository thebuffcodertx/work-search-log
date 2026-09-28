import "./ApplicationForm.css"

function ApplicationForm() {

    return (
           <form className="application-form">
      <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
        />
      </div>

      <div className="form-group">
  <label htmlFor="jobUrl">Job URL</label>
  <input
    type="url"
    id="jobUrl"
    name="jobUrl"
  />
</div>

      <div className="form-group">
  <label htmlFor="workType">Work Type</label>
  <select id="workType" name="workType">
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
  />
</div>

      <div className="form-group">
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
        />
      </div>

      <div className="form-group">
  <label htmlFor="contactName">Contact Name</label>
  <input
    type="text"
    id="contactName"
    name="contactName"
  />
</div>

<div className="form-group">
  <label htmlFor="contactEmail">Contact Email</label>
  <input
    type="email"
    id="contactEmail"
    name="contactEmail"
  />
</div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status">
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
  />
</div>

      <button type="submit">Add Application</button>
    </form>
    )
}

export default ApplicationForm