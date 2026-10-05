
const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Interviewing: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
}

type JobCardProps = {
    id: number;
    companyName: string;
    jobTitle: string;
    jobUrl?: string;
    dateApplied: string;
    status: string;
    location?: string;
    workType?: string;
    contactName?: string;
    contactEmail?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
};

export default function DisplayWorkSearches({
      companyName,
    jobTitle,
    jobUrl,
    dateApplied,
    status,
    location,
    workType,
    contactName,
    contactEmail,
    notes

}: JobCardProps) {
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
            <dt className="text-gray-500">Date Applied</dt>
            <dd className="text-gray-900">{dateApplied ? dateApplied : "-"}</dd>
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
  
  );
}
