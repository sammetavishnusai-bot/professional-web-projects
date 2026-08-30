# AI Resume & Career Platform

> **Build your resume. Find your skill gaps. Build better projects. Get interview-ready.**

An end-to-end, open-source career preparation and resume platform designed for students, new graduates, and software engineers. The platform unifies resume crafting, developer portfolio publishing, skill gap analysis, interactive project guides, interview question practice, and job application tracking into a single cohesive workspace.

---

## 🌐 Live Demo & Repository

- **Live Web Application**: https://professional-web-projects-y7bu.vercel.app/
- **GitHub Repository**: [https://github.com/sammetavishnusai-bot/professional-web-projects](https://github.com/sammetavishnusai-bot/professional-web-projects)

---

## 🎯 User Flow

The platform guides candidates through an end-to-end career readiness workflow:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. Career   │ ──► │ 2. Skill-Gap │ ──► │  3. Project  │ ──► │  4. Resume   │
│     Goal     │     │   Analysis   │     │    Building  │     │   Creation   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐            │
│ 7. Job Apps  │ ◄── │ 6. Interview │ ◄── │ 5. Portfolio │ ◄──────────┘
│   Tracking   │     │  Preparation │     │   Publishing │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Career Goal**: Select your target engineering specialization (Frontend, Backend, Full-Stack, AI/ML, DevOps).
2. **Skill-Gap Analysis**: Benchmark existing skills against current market requirements to identify missing competencies.
3. **Project Building**: Choose structured, portfolio-grade project ideas with step-by-step milestone checklists.
4. **Resume Creation**: Generate tailored summaries, add verified projects, and format using 6 ATS-friendly architectures.
5. **Portfolio Publishing**: Customize a responsive developer portfolio and share it with a public URL (`#/portfolio/:username`).
6. **Interview Preparation**: Practice role-specific technical, system architecture, and behavioral questions with STAR-framework hints.
7. **Job Applications**: Manage interview pipelines, track application stages, and record salary/recruiter notes.

---

## ✨ Features

### 1. ATS-Compliant Resume Builder
- **6 Professional Templates**:
  - **Classic**: Centered formal header, editorial serif typography, clean hairline dividers.
  - **Modern**: High-impact layout with accent rules, tech stack badge grid, and action-oriented bullets.
  - **Minimal**: Ultra-clean monochrome single-column aesthetic with high whitespace readability.
  - **Professional**: Two-tone executive layout with top banner accent and structured achievement cards.
  - **Creative**: Asymmetric two-column layout with dark sidebar for avatar, skills, and contact links.
  - **Executive**: Corporate grid format emphasizing leadership scope, business metrics, and team scale.
- **Dynamic Section Suppression**: Automatically hides empty resume sections without leaving blank headers or gaps.
- **High-Fidelity PDF Export**: A4-standard vector rendering with `page-break-inside: avoid` pagination guards to prevent text cut-off.
- **Direct Print Preview**: Supports browser print dialogs via native `@media print` stylesheets.

### 2. Developer Portfolio Builder & Public Sharing
- **Live Device Simulator**: Toggle between Desktop (1080p), Tablet (768px), and Mobile (390px) responsive viewports.
- **3 Visual Themes**: Modern Developer (Dark & Cyan), Minimal Executive (Monochrome), and Creative Studio (Gradient Aura).
- **Public URL Sharing**: Publish portfolios to dedicated public routes (`#/portfolio/:username`) accessible without login.
- **One-Click Privacy Control**: Instant publish/unpublish toggle that enforces privacy at both database and frontend levels.
- **XSS-Safe Link Handling**: Sanitizes all external GitHub, LinkedIn, and project URLs to block malicious schemes.

### 3. Career Roadmaps & Skill Gap Analysis
- **5 Specialization Pathways**: Interactive roadmaps for Frontend, Backend, Full-Stack, AI/ML, and DevOps.
- **Skill Gap Benchmarking**: Compares current candidate proficiencies against industry benchmarks and outputs missing skill lists.
- **Categorized Suggestions**: Groups recommendations by core architecture, performance, and DevOps toolchains.

### 4. Project Generator & Builder Guides
- **Domain-Specific Projects**: Curated full-stack, AI, and cloud architectures filtered by difficulty (Beginner, Intermediate, Advanced).
- **Interactive Builder Guide**: Step-by-step milestone checklists, architecture diagrams, and tech stack recommendations.

### 5. Interview Preparation
- **Categorized Question Bank**: Technical fundamentals, project deep-dives, system architecture, and HR behavioral questions.
- **STAR Model Answers**: Structured guidance detailing Situation, Task, Action, and Result formats.
- **Progress Tracking**: Practice status bookmarking persisted across user sessions.

### 6. Job Application Tracker
- **Stage Management**: Track applications across Wishlist, Applied, Interviewing, Offer, and Rejected stages.
- **Filtering & Search**: Instant search by company, role title, or location with stage-based filtering.
- **Notes & Deadlines**: Log interview dates, recruiter contacts, and compensation details.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (`react`, `react-dom`): Component-driven user interface architecture.
- **Vite 6** (`vite`, `@vitejs/plugin-react`): High-speed development build tool and asset bundler.
- **Tailwind CSS 3** (`tailwindcss`, `postcss`, `autoprefixer`): Utility-first responsive styling and dark mode.
- **Lucide React** (`lucide-react`): Consistent vector iconography.
- **Framer Motion** (`framer-motion`): Micro-interactions and transition animations.
- **HTML2PDF.js & HTML2Canvas** (`html2pdf.js`, `canvas-confetti`): Client-side vector PDF generation and celebratory feedback.
- **clsx & tailwind-merge** (`clsx`, `tailwind-merge`): Conditional class composition.

### Backend Server
- **Node.js & Express 5** (`express`): RESTful API layer for server-side AI requests.
- **CORS** (`cors`): Cross-Origin Resource Sharing configuration restricted to authorized client domains.
- **Dotenv** (`dotenv`): Server environment configuration management.

### Database & Authentication
- **Supabase PostgreSQL** (`@supabase/supabase-js`): Relational cloud persistence with Row Level Security (RLS).
- **Supabase Auth**: Secure email/password authentication, password recovery, and persistent session listeners.
- **Local Storage Fallback**: Scoped offline fallback enabling guest exploration without mandatory account creation.

### AI Integration
- **OpenAI API** (`openai`): Server-side `gpt-4o-mini` engine for resume summaries, skill suggestions, gap analysis, and interview questions.
- **Zero-Secret Client Architecture**: Browser code interacts solely with our own backend API (`/api/ai/*`), ensuring API keys are never bundled in client assets.
- **Offline Rule Engine**: Built-in deterministic heuristics fallback when AI keys are not configured.

---

## 📁 Project Structure

```
├── public/                     # Static assets and favicon
├── server/                     # Backend API & Database Schemas
│   ├── controllers/            # Express request controllers (AI endpoints)
│   ├── db/
│   │   └── schema.sql          # 7 PostgreSQL tables with Row Level Security policies
│   ├── middleware/             # Input validation and rate/payload limit guards
│   ├── routes/                 # Express API routing (/api/ai/*)
│   ├── services/               # Server-side OpenAI service layer & heuristics
│   └── server.js               # Main Express application entry point
├── src/                        # Frontend React Application
│   ├── components/
│   │   ├── ats/                # ATS compatibility scanner modal
│   │   ├── auth/               # Sign-in, Sign-up, and Password Reset modals
│   │   ├── builder/            # Resume builder forms, canvas preview, and 6 templates
│   │   ├── common/             # Reusable UI widgets (Toast, buttons, inputs)
│   │   ├── dashboard/          # User activity dashboard and quick actions
│   │   ├── export/             # PDF export modal and configuration controls
│   │   ├── interview/          # Interview question bank and answer hints
│   │   ├── landing/            # Product landing page and feature highlights
│   │   ├── layout/             # Top navigation bar and responsive mobile drawer
│   │   ├── modals/             # Confirmation dialogues and reset modals
│   │   ├── portfolio/          # Portfolio builder, themes, and public showcase view
│   │   ├── projects/           # Project generator and interactive milestone guide
│   │   ├── roadmap/            # Career path roadmaps and skill-gap UI
│   │   └── tracker/            # Job application tracking Kanban/table
│   ├── context/
│   │   ├── AuthContext.jsx     # Supabase Auth state and session management
│   │   └── ResumeContext.jsx   # Global application data and persistence state
│   ├── data/                   # Default datasets (projects, templates, questions)
│   ├── services/
│   │   ├── dataStorageService.js # Scoped CRUD data access layer (Supabase + Local)
│   │   └── supabaseClient.js     # Public Supabase client configuration
│   ├── utils/
│   │   └── pdfExport.js        # High-DPI PDF generation and markdown export
│   ├── App.jsx                 # Dynamic view routing and hash listener
│   ├── index.css               # Tailwind utility imports and print styles
│   └── main.jsx                # Application root mounting
├── .env.example                # Safe environment variable template (no secrets)
├── package.json                # Project dependencies and script declarations
├── tailwind.config.js          # Tailwind theme and custom typography extensions
└── vite.config.js              # Vite build configuration and plugins
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/sammetavishnusai-bot/professional-web-projects.git
cd professional-web-projects
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```ini
# OpenAI Configuration (Server-side only — never exposed to client)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Cloud Database & Authentication (Client-side public keys)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Server Configuration
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

> **Security Note**: Never commit your `.env` file to version control. The `.gitignore` file is pre-configured to ignore all `.env` and `.env.local` files.

### 4. Run the Application

#### Start Backend AI Server:
```bash
npm run server
```
The server will start on `http://localhost:5000`.

#### Start Frontend Dev Server (in a second terminal):
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔒 Security & Privacy

1. **Server-Side AI Credential Isolation**: The `OPENAI_API_KEY` is accessed strictly in the Node.js runtime environment and is never included in client JavaScript bundles.
2. **Row Level Security (RLS)**: PostgreSQL tables enforce `auth.uid() = user_id` policies so authenticated users can only access their own private data.
3. **Public/Private Data Separation**: Public portfolio routes (`#/portfolio/:username`) expose only explicitly published portfolio records (`is_published = true`). Private resumes, job applications, and interview notes remain completely inaccessible to unauthenticated visitors.
4. **XSS Protection & URL Sanitization**: All user-entered links (GitHub, LinkedIn, live demo URLs) pass through protocol sanitizers (`safeUrl`) that block `javascript:`, `data:`, and `vbscript:` schemes.
5. **Payload Size Limits**: Backend Express endpoints enforce a `500kb` body limit to protect against memory-exhaustion denial-of-service attempts.

---

## ☁️ Deployment

### Frontend (Vercel)
The client application is configured for deployment on Vercel:
- **Build Command**: `vite build`
- **Output Directory**: `dist`
- **Framework Preset**: `Vite`

### Backend (Node.js / Express)
The backend API server can be deployed to any Node.js hosting platform (e.g. Render, Railway, AWS ECS):
- **Start Command**: `node server/server.js`
- Set `OPENAI_API_KEY`, `CLIENT_ORIGIN`, and `PORT` in the hosting environment variables.

---

## 🔮 Future Improvements

The following architectural enhancements are planned for future versions:
- **Real-Time Video Mock Interviews**: Integrating WebRTC audio/video capture with automated speech-to-text feedback.
- **Automated LinkedIn Profile Import**: One-click resume population via OAuth data exchange.
- **Live Job Board Aggregation**: Pulling active internship and fresher job listings directly from public recruitment APIs.
- **Custom Domain Mapping**: Allowing developers to connect their own custom domains (e.g., `developer.dev`) to their published portfolios.

---

## ⚠️ Disclaimer

All career roadmaps, skill suggestions, AI-generated summaries, job match scores, and interview questions provided by this platform are for educational and preparation guidance only. They do not constitute formal hiring guarantees, official certification credentials, or promises of employment.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
