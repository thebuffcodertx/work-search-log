import Navbar from "./components/Navbar";
import ApplicationForm from "./components/ApplicationForm";
import DisplayWorkSearches from "./components/DisplayWorkSearches";
import type { JobApplication } from "./types/applications";
import { useEffect, useState } from "react";

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  // console.log(applications);


  return (
    <>
      <Navbar title="Work Search Log" />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <h1>Work Search Log</h1>
        <p>Track your job applications in one place.</p>

        {/* <ApplicationForm /> */}
        <ApplicationForm onAdd={(saved) => setApplications((prev) => [...prev, saved])} />

 {applications.map((app) => <DisplayWorkSearches key={app.id} {...app} />)}
      
     {/* <DisplayWorkSearches
  id={1}
  companyName="Acme Corp"
  jobTitle="Frontend Developer"
  jobUrl="https://example.com/jobs/123"
  dateApplied="2026-09-28"
  status="Interviewing"
  location="Austin, TX"
  workType="Hybrid"
  contactName="Jordan Lee"
  contactEmail="jordan@example.com"
  notes="Phone screen went well. Technical interview next week."
  createdAt="2026-09-28T10:00:00Z"
  updatedAt="2026-10-01T14:30:00Z"
/>

<DisplayWorkSearches
  id={2}
  companyName="Globex"
  jobTitle="React Engineer"
  dateApplied="2026-10-02"
  status="Applied"
  workType="Remote"
  createdAt="2026-10-02T09:00:00Z"
  updatedAt="2026-10-02T09:00:00Z"
/>

<DisplayWorkSearches
  id={3}
  companyName="Initech"
  jobTitle="Junior Web Developer"
  dateApplied="2026-09-15"
  status="Rejected"
  location="Dallas, TX"
  contactName="Sam Rivera"
  createdAt="2026-09-15T12:00:00Z"
  updatedAt="2026-09-30T16:45:00Z"
/> */}
</main>
      
    </>
  );
}

export default App;
