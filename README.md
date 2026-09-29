# Work Search Log

A full-stack app for tracking job applications and work-search activity in one place.

Job searches produce a lot of scattered information: which companies you applied to, when, for what role, who you talked to, and where each application stands. Work Search Log keeps all of it in one record per application, so you can see your progress and follow up at the right time.

The project is being built in stages. The frontend comes first, then a backend, a database and deployment.

## Tech stack

| Layer | Technology | Status |
| --- | --- | --- |
| Frontend | React 19, TypeScript, CSS, Vite | In progress |
| Storage (temporary) | Browser `localStorage` | In progress |
| Backend | Node.js, Express (REST API) | Planned |
| Database | PostgreSQL | Planned |
| DevOps | Docker, AWS, CI/CD | Planned |

## Current features

- A form to add a job application: company, job title, job URL, work type, location, date applied, contact name and email, status, and notes.
- A typed data model for applications, written in TypeScript.
- Saved applications persist in the browser with `localStorage`, so they survive a page refresh.

## Architecture

### Now

```
React form  ──►  JobApplication object  ──►  localStorage ("applications")
```

The app is a single-page React app. The form is made of controlled components: each input's value lives in React state and updates on every keystroke. On submit, the form builds a `JobApplication` object and appends it to a JSON array saved in `localStorage`.

### Planned

```
React (client)  ──HTTP/JSON──►  Express REST API  ──SQL──►  PostgreSQL
```

The frontend will send HTTP requests to an Express API. The API will handle the application logic and talk to PostgreSQL. `localStorage` is a stand-in until then, so the rest of the frontend can be built without waiting on the backend.

## Data model

Defined in [`client/src/types/applications.ts`](client/src/types/applications.ts):

```ts
interface JobApplication {
  id: number;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  dateApplied: string;
  status: ApplicationStatus;   // "Interested" | "Applied" | "Screening" | "Interview" | "Offer" | "Rejected" | "Withdrawn"
  location?: string;
  workType?: WorkType;         // "Remote" | "Hybrid" | "On-site"
  contactName?: string;
  contactEmail?: string;
  notes?: string;
  createdAt: string;           // ISO 8601 timestamp
  updatedAt: string;           // ISO 8601 timestamp
}
```

## Design decisions

- **Status and work type are string-literal unions, not free text.** Only valid values like `"Interview"` or `"Remote"` can be stored, and TypeScript catches typos at compile time. This also makes filtering by status straightforward later.
- **Required and optional fields are separated in the type.** Company, job title, date and status are required. Everything else is optional (`?`), because early in an application you often don't know the contact or location yet.
- **`createdAt` and `updatedAt` timestamps.** These make it possible to sort by recent activity and show when an application last changed. The fields already match the columns a database table would have.
- **`localStorage` first, database later.** Building the UI and data model before the backend let me work on one layer at a time. When the API exists, only the save and load logic needs to change.
- **Temporary IDs.** IDs come from `Date.now()` for now. PostgreSQL will generate them once the database is added.

## Roadmap

- [x] React + TypeScript + Vite project setup
- [x] Job application data model
- [x] Application form
- [x] Save applications to `localStorage`
- [ ] List and view saved applications
- [ ] Edit and delete applications
- [ ] Filter and sort by status, date and work type
- [ ] Express REST API with CRUD routes
- [ ] PostgreSQL database
- [ ] Docker setup
- [ ] Deploy to AWS
- [ ] CI/CD pipeline

## Getting started

Requires Node.js and npm.

```sh
cd client
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

Other scripts, also run from `client/`:

```sh
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # serve the production build locally
```

## Project structure

```
work-search-log/
└── client/                  # React frontend
    └── src/
        ├── components/      # UI components, each with its own CSS file
        ├── types/           # TypeScript data model
        ├── App.tsx
        └── main.tsx
```
