# HireVibe — Full-Stack HR Consultancy & Recruitment Web Platform

An enterprise-grade, full-stack web platform built for **HireVibe** — a boutique HR consultancy and recruitment firm offering:
- **Recruitment & Contingent Staffing**
- **Retained Executive Search (C-Suite & Board)**
- **HR Policy, Employee Handbook & Multi-State Labor Compliance**
- **Payroll & Compensation Benchmarking Advisory**
- **Manager Coaching & Leadership L&D Academies**

---

## 🚀 Key Features

### 1. Public Marketing Website
- **Homepage (`/`)**: Hero section with dual CTAs, live trust metrics (98% 1-year retention, 250+ enterprise clients, $120M+ executive payroll placed), core practice areas, live featured jobs, executive testimonials, and consultation inquiry.
- **Services Hub (`/services`)**: Deep-dive breakdowns for Recruitment, Executive Search, Compliance, Payroll, and Training with an interactive consultation scope submission form.
- **Job Directory (`/jobs`)**: Dynamic multi-faceted filtering (keyword search, department, job type, experience level, remote toggle) and 1-click apply modal with resume upload.
- **Job Detail (`/jobs/[id]`)**: Full position specifications, compensation range, benefits, employer background, and application modal.
- **About Us (`/about`)**: Managing Director Eleanor Vance & Senior Partner bios, core consulting values, and methodology.
- **Case Studies (`/case-studies`)**: Client success stories with quantifiable ROI and placement timelines.
- **HR Insights & Blog (`/blog`, `/blog/[slug]`)**: Thought leadership articles, category filters, reading times, and full article view.
- **Employer Pricing (`/pricing`)**: Recruitment engagement models (Contingency vs Retained) and Subscription HR Retainer tiers (Startup, Growth, Enterprise).
- **Contact Us (`/contact`)**: Regional office directory (Chicago HQ, New York, San Francisco), consultation form, and FAQ accordion.

### 2. Candidate Portal (`/portal/candidate`)
- **Dashboard**: High-level application pipeline metrics, recent alerts, matching jobs.
- **My Applications (`/portal/candidate/applications`)**: Multi-stage visual tracking (Submitted ➔ Under Review ➔ Interview ➔ Offer ➔ Rejected), cover notes, and recruiter feedback.
- **Profile Management (`/portal/candidate/profile`)**: Title headline, location, bio, skills tags, years of experience, and resume upload/preview.
- **Saved Jobs (`/portal/candidate/saved`)**: Bookmarking system with 1-click apply.

### 3. Client & Employer Portal (`/portal/employer`)
- **Dashboard**: Active postings count, total applicants, open consulting tickets, quick job posting.
- **Job Postings Manager (`/portal/employer/jobs`)**: Create new job postings with full specifications, edit, close/reactivate.
- **Applicant Review Pipeline (`/portal/employer/applicants`)**: Filter candidates by job and stage, inspect candidate dossiers, download CVs, update stages, and record recruiter notes.
- **HR Consulting Desk (`/portal/employer/consulting`)**: Submit new advisory scopes, track status, view assigned Senior Partner and progress notes.
- **Company Profile (`/portal/employer/profile`)**: Manage company name, brand logo, industry, size, website, and active advisory plan.

### 4. Admin Dashboard (`/admin`)
- **Analytics Overview**: Platform-wide metrics, candidate counts, active client companies, total job applications, and inbound consulting tickets.
- **User Directory (`/admin/users`)**: Search and filter all Candidates, Employers, and Admins.
- **Job Moderation (`/admin/jobs`)**: Feature jobs on homepage, approve, close, or delete listings.
- **HR Consulting Desk (`/admin/services`)**: Assign Senior Partners (e.g., Eleanor Vance, Marcus Rivera, Dr. Aris Thorne), update status, and log client notes.
- **Insights CMS (`/admin/blog`)**: Publish and edit articles directly to the Insights blog.

---

## ⚡ Quick Demo Persona Logins

You can log in with one click using the demo switcher at the top of any page or the `/login` screen:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@hirevibe.com` | `Admin@123` | Eleanor Vance (Managing Director, Full Governance) |
| **Employer** | `recruiter@techscale.io` | `Employer@123` | TechScale Systems (Review Candidates, Post Jobs) |
| **Candidate** | `candidate@alexrivera.dev` | `Candidate@123` | Alex Rivera (Track Applications, Manage Resume) |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Corporate Executive Design System
- **Database & ORM**: PostgreSQL / SQLite with Prisma ORM
- **Authentication**: JWT-based session tokens stored in secure HTTP-only cookies
- **File Uploads**: Resumes (PDF/DOCX) and company logos saved to `/public/uploads/`
- **Email Service**: Transactional email dispatcher with in-app notification center persistence

---

## 💻 Local Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Sync & Seeding
The database comes pre-configured with SQLite for instant zero-configuration local execution, and includes full PostgreSQL schema definitions (`prisma/schema.postgresql.prisma` and `docker-compose.yml`).

Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

Populate comprehensive demo data:
```bash
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the assigned port) to explore the website.

---

## 🐘 Optional PostgreSQL Setup (Docker)

To run against a local PostgreSQL container:
```bash
# Start Postgres container
docker compose up -d

# Point DATABASE_URL in .env to:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hirevibe?schema=public"

# Push schema to PostgreSQL
npx prisma db push --schema=prisma/schema.postgresql.prisma
```

---

## 🚢 Deploying to Vercel

HireVibe is fully pre-configured for one-click deployment on [Vercel](https://vercel.com):

### 1. Import Repository
1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** ➔ **"Project"**.
2. Select your GitHub repository: `https://github.com/ashprince777/hirevibe.git`.

### 2. Configure Environment Variables
In the Vercel project configuration, add the following Environment Variables:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Connection string to your cloud PostgreSQL (Vercel Postgres, Supabase, Neon, or Railway) |
| `JWT_SECRET` | `hirevibe-enterprise-secret-key-32-chars-minimum` | Minimum 32-character secret key for secure authentication |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production URL of your deployed application |

> **Tip**: You can use Vercel's built-in **Storage ➔ Postgres** tab to create a free serverless database with 1 click. Vercel automatically populates `DATABASE_URL` and `POSTGRES_PRISMA_URL`!

### 3. Automatic Build
- Vercel automatically runs `postinstall` (`node scripts/prepare-prisma.js && prisma generate`) and `build` (`prisma generate && next build`).
- `scripts/prepare-prisma.js` automatically detects your remote PostgreSQL database from `DATABASE_URL` and configures Prisma accordingly.

### 4. Seed Database (Optional)
To seed the remote database with initial Indian executive search roles, sample candidates, and consulting practice areas:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

