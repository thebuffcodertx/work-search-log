import type { ApplicationStatus, JobApplication } from "../types/applications"

type LogsProps = {
  application: JobApplication
}

const statusColors: Record<ApplicationStatus, string> = {
  Interested: "bg-gray-100 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  Screening: "bg-indigo-100 text-indigo-800",
  Interview: "bg-purple-100 text-purple-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Withdrawn: "bg-yellow-100 text-yellow-800",
}

// "2026-09-28" -> "Sep 28, 2026". Adding a time keeps the date in local time,
// otherwise it's read as UTC and can show up as the day before.
function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function Logs({ application }: LogsProps) {
  const {
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
  } = application

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{jobTitle}</h3>
          <p className="text-gray-600">{companyName}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500">Date applied</dt>
          <dd className="text-gray-900">{dateApplied ? formatDate(dateApplied) : "—"}</dd>
        </div>

        {workType && (
          <div>
            <dt className="text-gray-500">Work type</dt>
            <dd className="text-gray-900">{workType}</dd>
          </div>
        )}

        {location && (
          <div>
            <dt className="text-gray-500">Location</dt>
            <dd className="text-gray-900">{location}</dd>
          </div>
        )}

        {contactName && (
          <div>
            <dt className="text-gray-500">Contact</dt>
            <dd className="text-gray-900">
              {contactName}
              {contactEmail && (
                <>
                  {" · "}
                  <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline">
                    {contactEmail}
                  </a>
                </>
              )}
            </dd>
          </div>
        )}
      </dl>

      {notes && (
        <div className="mt-4 text-sm">
          <h4 className="text-gray-500">Notes</h4>
          <p className="whitespace-pre-line text-gray-900">{notes}</p>
        </div>
      )}

      {jobUrl && (
        <a
          href={jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          View job posting →
        </a>
      )}
    </article>
  )
}

export default Logs
