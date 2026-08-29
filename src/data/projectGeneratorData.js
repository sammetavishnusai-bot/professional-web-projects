// Project Generator Knowledge Base & Implementation Plans

export const PROJECT_BLUEPRINTS = [
  // -------------------------------------------------------------
  // FRONTEND DEVELOPER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'fe-bp-1',
    roleId: 'frontend',
    roleName: 'Frontend Developer',
    title: 'Interactive Multi-Tenant SaaS Analytics Dashboard',
    shortDescription: 'Real-time telemetry dashboard featuring customizable KPI metric widgets, interactive time-series charts, theme presets, and CSV export.',
    problemSolved: 'Companies need intuitive, high-performance dashboards that aggregate complex business metrics without sluggish page redraws or memory leaks.',
    difficulty: 'Beginner',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Lucide Icons'],
    skillsPracticed: ['TypeScript Generics', 'Component Architecture', 'Data Visualization', 'Responsive Grid Layouts'],
    estimatedTime: '1 - 2 Weeks (15 - 20 Hours)',
    resumeValue: 'Demonstrates strong TypeScript typing, clean modular component architecture, and high-performance charting.',
    portfolioValue: 'High visual impact with dark/light mode toggle and interactive filtering that recruiters can demo instantly.',
    plan: {
      objective: 'Build a responsive SaaS dashboard that displays streaming metrics, data tables with pagination/search, and exportable reports.',
      featuresToBuild: [
        'KPI Metric summary cards with percentage growth indicators and sparklines',
        'Interactive time-series line, bar, and donut charts with date-range picker',
        'Data table with multi-column sorting, search keyword filtering, and pagination',
        'Theme switcher (Dark, Light, System) with CSS variables',
        'One-click CSV & JSON report export'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Wireframing & Layout', desc: 'Setup Vite + React + Tailwind CSS with responsive grid and sidebar navigation layout.' },
        { phase: 'Phase 2: State Management & Mock Data', desc: 'Create type definitions for telemetry metrics and create simulated API feeds.' },
        { phase: 'Phase 3: Chart Integration & Filtering', desc: 'Implement Chart.js/Recharts with responsive resizing and date filtering.' },
        { phase: 'Phase 4: Optimization & Deployment', desc: 'Add accessibility labels, test Lighthouse score, and deploy on Vercel/Netlify.' }
      ],
      suggestedFolderStructure: `src/
├── components/
│   ├── dashboard/
│   │   ├── MetricCard.tsx
│   │   ├── TelemetryChart.tsx
│   │   └── DataTable.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Dropdown.tsx
├── hooks/
│   └── useTelemetryData.ts
├── types/
│   └── dashboard.ts
└── utils/
    └── exportCsv.ts`,
      testingChecklist: [
        'Test responsiveness across Mobile (375px), Tablet (768px), and 4K Desktop',
        'Verify date range filter recalculates chart datasets accurately',
        'Ensure Lighthouse Performance score > 90',
        'Verify keyboard tab navigation on all interactive buttons'
      ],
      readmeChecklist: [
        'Project Title, Live Demo Link & Architecture Diagram',
        'Key Technical Highlights & Problem Solved',
        'Installation Guide (`npm install`, `npm run dev`)',
        'Component Architecture & State Flow explanation'
      ]
    }
  },
  {
    id: 'fe-bp-2',
    roleId: 'frontend',
    roleName: 'Frontend Developer',
    title: 'Collaborative Real-Time Kanban & Whiteboard Engine',
    shortDescription: 'Multi-user project workflow canvas supporting drag-and-drop task cards, column customization, tag filtering, and instant state synchronization.',
    problemSolved: 'Remote software engineering teams require frictionless, low-latency visual boards to coordinate sprints without page reloads.',
    difficulty: 'Intermediate',
    techStack: ['React', 'TypeScript', 'Zustand', 'HTML5 Drag & Drop', 'Tailwind CSS'],
    skillsPracticed: ['Complex State Management', 'Drag-and-Drop APIs', 'Optimistic UI Updates', 'Local Persistence'],
    estimatedTime: '2 - 3 Weeks (25 - 35 Hours)',
    resumeValue: 'Proves mastery of complex nested state machines, optimistic UI mutations, and state management.',
    portfolioValue: 'High engagement project that allows hiring managers to drag cards, create boards, and experience smooth 60fps animations.',
    plan: {
      objective: 'Create a production-grade Kanban tool with fluid drag-and-drop interactions, column reordering, and priority filtering.',
      featuresToBuild: [
        'Fluid drag-and-drop columns and task cards with drop indicators',
        'Inline editable task titles, descriptions, due dates, and priority chips',
        'Global search and multi-tag filtering (e.g. Bug, Feature, Urgent)',
        'Local storage persistence with undo/redo history stack',
        'Activity audit log showing task movement timeline'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Board Schema & Store', desc: 'Design normalized state structure with Zustand for columns and cards.' },
        { phase: 'Phase 2: Drag and Drop Interactions', desc: 'Implement drag event handlers with visual ghost previews and drop boundaries.' },
        { phase: 'Phase 3: Card Details Modal & Tags', desc: 'Build modal with markdown support, checklists, and color tags.' },
        { phase: 'Phase 4: History & Polish', desc: 'Add keyboard shortcuts (Ctrl+Z/Ctrl+Y) and micro-animations.' }
      ],
      suggestedFolderStructure: `src/
├── components/
│   ├── kanban/
│   │   ├── Board.tsx
│   │   ├── Column.tsx
│   │   ├── TaskCard.tsx
│   │   └── CardModal.tsx
├── store/
│   └── useKanbanStore.ts
├── types/
│   └── kanban.ts
└── utils/
    └── reorder.ts`,
      testingChecklist: [
        'Verify dragging cards between empty and populated columns works seamlessly',
        'Ensure board state persists across browser refresh',
        'Verify undo/redo stack accurately reverts reordering actions',
        'Test accessibility of drag handles via keyboard'
      ],
      readmeChecklist: [
        'High-resolution GIF demonstrating drag-and-drop functionality',
        'State normalization strategy and performance benchmarking',
        'Detailed steps to run locally and test suites'
      ]
    }
  },
  {
    id: 'fe-bp-3',
    roleId: 'frontend',
    roleName: 'Frontend Developer',
    title: 'Headless E-Commerce Storefront with Micro-Animations',
    shortDescription: 'High-speed modern e-commerce storefront with server-side rendered product catalogs, dynamic faceted search, cart drawer, and checkout.',
    problemSolved: 'Traditional e-commerce templates suffer from slow loading times and clunky cart updates that decrease conversion rates.',
    difficulty: 'Advanced',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Stripe Elements'],
    skillsPracticed: ['Server-Side Rendering (SSR)', 'Faceted Search', 'Checkout Security', 'Micro-Interactions'],
    estimatedTime: '3 - 4 Weeks (40+ Hours)',
    resumeValue: 'Demonstrates expertise in Next.js App Router, SSR, SEO optimization, and financial checkout integration.',
    portfolioValue: 'Commercial SaaS polish with smooth page transitions and mobile-friendly shopping drawer.',
    plan: {
      objective: 'Build an ultra-fast headless e-commerce store with dynamic inventory filtering, cart drawer, and mock payment gateway.',
      featuresToBuild: [
        'Fast SSR product catalog with faceted filter sidebar (Price, Category, Rating, Stock)',
        'Slide-out shopping cart drawer with optimistic quantity updates and price calculation',
        'Product detail page with photo gallery zoom, size selector, and customer reviews',
        'Simulated Stripe checkout with client-side form validation',
        'SEO metadata generation with OpenGraph preview cards'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Product Catalog & SSR', desc: 'Setup Next.js App Router with server components for rapid catalog hydration.' },
        { phase: 'Phase 2: Cart Store & Micro-Interactions', desc: 'Create persistent cart store with Framer Motion slide-in drawers.' },
        { phase: 'Phase 3: Search & Faceted Filtering', desc: 'Implement URL-query-based filtering for shareable search links.' },
        { phase: 'Phase 4: Checkout Flow & SEO', desc: 'Integrate mock Stripe card input and generate dynamic sitemaps.' }
      ],
      suggestedFolderStructure: `src/
├── app/
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── cart/page.tsx
│   └── layout.tsx
├── components/
│   ├── cart/CartDrawer.tsx
│   ├── product/ProductCard.tsx
│   └── ui/PriceTag.tsx
├── store/
│   └── useCartStore.ts
└── types/
    └── product.ts`,
      testingChecklist: [
        'Test cart calculation logic with discounts, taxes, and shipping rates',
        'Verify URL query parameters reflect active filter checkboxes',
        'Ensure mobile touch swipe closes the cart drawer fluidly',
        'Validate Core Web Vitals (LCP < 1.2s, CLS < 0.05)'
      ],
      readmeChecklist: [
        'Architecture diagram explaining SSR vs Client Component separation',
        'Lighthouse audit score screenshot (> 95 Performance)',
        'Instructions for mock payment testing credentials'
      ]
    }
  },

  // -------------------------------------------------------------
  // BACKEND DEVELOPER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'be-bp-1',
    roleId: 'backend',
    roleName: 'Backend Developer',
    title: 'Distributed Asynchronous Task Scheduling & Worker Queue',
    shortDescription: 'High-throughput background job processing engine with Redis queue broker, concurrency workers, retry exponential backoff, and dead-letter queues.',
    problemSolved: 'Monolithic servers freeze when handling CPU-intensive tasks like PDF generation, video transcoding, or mass emails synchronously.',
    difficulty: 'Intermediate',
    techStack: ['Node.js', 'Express', 'Redis', 'BullMQ', 'PostgreSQL', 'Docker'],
    skillsPracticed: ['Asynchronous Queues', 'Worker Concurrency', 'Fault Tolerance', 'Docker Orchestration'],
    estimatedTime: '2 - 3 Weeks (25 - 35 Hours)',
    resumeValue: 'Demonstrates understanding of distributed asynchronous systems, queue architectures, and resilient fault recovery.',
    portfolioValue: 'Features real-time telemetry dashboard monitoring queue latency, active workers, and job completion throughput.',
    plan: {
      objective: 'Construct a resilient distributed background task processing engine capable of handling 5,000+ jobs/min with automated retries.',
      featuresToBuild: [
        'REST API to enqueue background tasks (e.g. PDF report generation, image compression)',
        'Redis-backed queue with priority ordering and exponential backoff retry policy',
        'Dead-letter queue (DLQ) for inspecting and replaying failed jobs',
        'Worker process cluster with dynamic concurrency scaling',
        'Prometheus metric endpoints for task execution latency and throughput'
      ],
      developmentPhases: [
        { phase: 'Phase 1: API & Queue Setup', desc: 'Configure Express server and BullMQ connection with Redis container.' },
        { phase: 'Phase 2: Worker Handlers & Retries', desc: 'Write isolated job processors with error simulation and backoff timers.' },
        { phase: 'Phase 3: Database Auditing', desc: 'Store job state transitions (Queued, Processing, Completed, Failed) in PostgreSQL.' },
        { phase: 'Phase 4: Dockerization & Benchmarking', desc: 'Create docker-compose setup and benchmark throughput with Apache Bench/k6.' }
      ],
      suggestedFolderStructure: `server/
├── controllers/
│   └── jobController.js
├── queues/
│   ├── taskQueue.js
│   └── deadLetterQueue.js
├── workers/
│   ├── pdfWorker.js
│   └── emailWorker.js
├── db/
│   └── schema.sql
└── docker-compose.yml`,
      testingChecklist: [
        'Simulate worker crash during execution and verify job gets requeued cleanly',
        'Verify tasks exceeding max retry count transition into Dead-Letter Queue',
        'Test queue processing throughput with 1,000 simultaneous requests',
        'Ensure database connection pool handles concurrent worker writes'
      ],
      readmeChecklist: [
        'System architecture diagram showing Producer -> Redis Queue -> Worker Cluster -> PostgreSQL',
        'Benchmark report demonstrating throughput and latency',
        'Docker-compose quickstart instructions'
      ]
    }
  },
  {
    id: 'be-bp-2',
    roleId: 'backend',
    roleName: 'Backend Developer',
    title: 'Enterprise Multi-Tenant Role-Based Access Control (RBAC) API',
    shortDescription: 'Scalable authentication and authorization service with JWT token rotation, bcrypt password hashing, tenant data isolation, and audit trails.',
    problemSolved: 'B2B SaaS platforms must securely isolate client data across organizations and enforce granular employee permissions.',
    difficulty: 'Advanced',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Redis', 'Jest'],
    skillsPracticed: ['Security & Cryptography', 'Multi-Tenancy', 'Database Transactions', 'API Security Standards'],
    estimatedTime: '3 - 4 Weeks (35 - 45 Hours)',
    resumeValue: 'Shows mastery of enterprise security patterns, token rotation, tenant isolation, and strict RESTful design.',
    portfolioValue: 'Includes interactive Swagger / OpenAPI interactive documentation interface that engineers can test live.',
    plan: {
      objective: 'Build a secure, enterprise-grade authentication microservice with multi-tenant data partitioning and granular role permissions.',
      featuresToBuild: [
        'User registration with salted bcrypt hashing and email verification token',
        'Dual-token JWT architecture (Short-lived Access Token + Sliding Refresh Token)',
        'Redis-backed token blacklist for immediate session revocation upon logout',
        'Multi-tenant PostgreSQL schema with organization ID row-level security (RLS)',
        'Granular role-based middleware guards (Admin, Manager, Contributor, Viewer)'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Database & Security Schema', desc: 'Design normalized SQL schema for Users, Organizations, Roles, and Permissions.' },
        { phase: 'Phase 2: Auth Endpoints & Token Rotation', desc: 'Implement register, login, refresh, and logout handlers with Redis session tracking.' },
        { phase: 'Phase 3: RBAC Middleware & Guarding', desc: 'Create composable Express middleware for tenant and permission enforcement.' },
        { phase: 'Phase 4: Automated Testing & Swagger', desc: 'Write comprehensive integration tests with Jest/Supertest and OpenAPI spec.' }
      ],
      suggestedFolderStructure: `src/
├── middleware/
│   ├── authGuard.js
│   ├── rbacGuard.js
│   └── tenantGuard.js
├── controllers/
│   ├── authController.js
│   └── orgController.js
├── services/
│   ├── tokenService.js
│   └── passwordService.js
└── tests/
    └── auth.test.js`,
      testingChecklist: [
        'Test expired access token triggers automatic refresh without re-login',
        'Verify users from Organization A cannot access resources from Organization B',
        'Verify revoking a token blacklist immediately rejects subsequent API calls',
        'Verify SQL injection protection with parameterized queries'
      ],
      readmeChecklist: [
        'Security threat model and mitigation summary',
        'OpenAPI Swagger documentation link and sample curl requests',
        'Instructions for running Jest test suites with coverage reports'
      ]
    }
  },

  // -------------------------------------------------------------
  // FULL STACK DEVELOPER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'fs-bp-1',
    roleId: 'fullstack',
    roleName: 'Full Stack Developer',
    title: 'Full-Stack Developer Community & Code Discussion Portal',
    shortDescription: 'Interactive developer hub with syntax-highlighted code snippets, nested discussion threads, voting algorithms, and real-time alerts.',
    problemSolved: 'Technical teams and communities need structured forums where engineers can share code solutions, debug issues, and vote on answers.',
    difficulty: 'Intermediate',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    skillsPracticed: ['Full-Stack Integration', 'Relational Modeling', 'Syntax Highlighting', 'Search & Ranking'],
    estimatedTime: '2 - 3 Weeks (30 - 40 Hours)',
    resumeValue: 'Covers end-to-end engineering from responsive React UI to relational PostgreSQL query optimization and indexing.',
    portfolioValue: 'A full-fledged community platform that recruiters can create accounts on, post questions, and upvote answers.',
    plan: {
      objective: 'Create a full-stack developer forum supporting markdown formatting, code syntax styling, upvoting, and nested reply trees.',
      featuresToBuild: [
        'Post creation with Markdown editor, tags, and live code preview',
        'Nested recursive comments and discussion threads',
        'Upvoting/downvoting system with ranking algorithm (Hot, Top, Latest)',
        'User profile pages with reputation points, posted questions, and badges',
        'Full-text search indexing across question titles and code snippets'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Full-Stack Setup', desc: 'Initialize React frontend with Tailwind and Express backend with PostgreSQL.' },
        { phase: 'Phase 2: Question & Comment APIs', desc: 'Create CRUD routes with Prisma ORM and recursive comment population.' },
        { phase: 'Phase 3: Frontend UI & Markdown', desc: 'Build responsive feed, syntax highlighter, and interactive vote buttons.' },
        { phase: 'Phase 4: Search & Deployment', desc: 'Implement PostgreSQL full-text search and deploy frontend/backend.' }
      ],
      suggestedFolderStructure: `project/
├── client/
│   ├── src/components/
│   │   ├── PostCard.tsx
│   │   ├── CommentTree.tsx
│   │   └── MarkdownEditor.tsx
│   └── src/hooks/usePosts.ts
└── server/
    ├── routes/posts.js
    ├── controllers/voteController.js
    └── prisma/schema.prisma`,
      testingChecklist: [
        'Verify recursive nested comments render without infinite re-renders',
        'Test upvoting updates score optimistically in the client UI',
        'Ensure full-text search returns accurate results for programming keywords',
        'Validate input sanitization against Cross-Site Scripting (XSS)'
      ],
      readmeChecklist: [
        'Full-Stack Architecture overview and database schema ER diagram',
        'Instructions for running both frontend and backend concurrently',
        'Live demo URL with seeded demo accounts'
      ]
    }
  },

  // -------------------------------------------------------------
  // PYTHON DEVELOPER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'py-bp-1',
    roleId: 'python',
    roleName: 'Python Developer',
    title: 'High-Performance Resume & Job Description Keyword NLP Parser',
    shortDescription: 'Asynchronous FastAPI service that parses PDF/DOCX resumes, extracts entities (skills, experience, education), and matches against job descriptions.',
    problemSolved: 'Recruiters receive hundreds of unformatted resumes and waste hours manually matching candidates to job specifications.',
    difficulty: 'Intermediate',
    techStack: ['Python 3.11', 'FastAPI', 'Pydantic', 'PyPDF2', 'Spacy / NLTK', 'Docker'],
    skillsPracticed: ['FastAPI Asyncio', 'Document Parsing', 'Entity Extraction', 'Pydantic Validation'],
    estimatedTime: '2 Weeks (20 - 25 Hours)',
    resumeValue: 'Demonstrates Python text processing, asynchronous microservice architecture, and Pydantic schema validation.',
    portfolioValue: 'Includes interactive Swagger UI and web frontend where users can upload their resume PDF and see instant skill extractions.',
    plan: {
      objective: 'Build an asynchronous Python microservice that ingests resume documents and extracts technical skills and match percentages.',
      featuresToBuild: [
        'Asynchronous multi-part file upload endpoint accepting PDF and DOCX formats',
        'Text extraction and normalization pipeline cleaning formatting artifacts',
        'Keyword extraction matching against curated taxonomy of 2,000+ technical skills',
        'Job description matching engine computing semantic TF-IDF / Jaccard similarity',
        'Auto-generated Swagger / OpenAPI interactive documentation'
      ],
      developmentPhases: [
        { phase: 'Phase 1: FastAPI Core & Pydantic', desc: 'Setup FastAPI application with strict request/response validation schemas.' },
        { phase: 'Phase 2: PDF Parsing & Text Pipeline', desc: 'Implement PyPDF2/pdfplumber text extraction and cleaning regexes.' },
        { phase: 'Phase 3: Keyword & Matching Engine', desc: 'Build skill extraction taxonomy and score calculation algorithms.' },
        { phase: 'Phase 4: Docker Container & Tests', desc: 'Containerize with Docker and write PyTest unit tests.' }
      ],
      suggestedFolderStructure: `app/
├── api/
│   ├── routes.py
│   └── deps.py
├── core/
│   ├── parser.py
│   └── matcher.py
├── schemas/
│   └── resume.py
├── tests/
│   └── test_parser.py
├── Dockerfile
└── main.py`,
      testingChecklist: [
        'Test parsing of multi-page and corrupted PDF files with graceful errors',
        'Verify skill extraction accuracy against sample candidate resumes',
        'Ensure response time < 350ms for a 3-page resume',
        'Run PyTest suite with 100% endpoint coverage'
      ],
      readmeChecklist: [
        'API endpoint documentation with request/response JSON snippets',
        'Instructions for running locally with Docker (`docker compose up`)',
        'Benchmark analysis comparing parsing speeds'
      ]
    }
  },

  // -------------------------------------------------------------
  // DATA ANALYST PROJECTS
  // -------------------------------------------------------------
  {
    id: 'da-bp-1',
    roleId: 'data-analyst',
    roleName: 'Data Analyst',
    title: 'Global Tech Compensation & Remote Work SQL Analytics Suite',
    shortDescription: 'End-to-end data analytics project cleaning 100,000+ salary data points, writing complex SQL window queries, and building an interactive dashboard.',
    problemSolved: 'Job seekers and HR leaders lack transparent insights into compensation trends across experience tiers, tech stacks, and remote policies.',
    difficulty: 'Beginner',
    techStack: ['SQL (PostgreSQL)', 'Python (Pandas, NumPy)', 'Seaborn', 'Streamlit / Metabase'],
    skillsPracticed: ['Advanced SQL Queries', 'Data Cleaning & ETL', 'Exploratory Data Analysis', 'Executive Reporting'],
    estimatedTime: '1 - 2 Weeks (15 - 20 Hours)',
    resumeValue: 'Demonstrates advanced SQL window functions (RANK, DENSE_RANK, NTILE, LAG), CTEs, and statistical Python data wrangling.',
    portfolioValue: 'Comprehensive written case study with executive summary, clear chart visualizations, and interactive Streamlit web dashboard.',
    plan: {
      objective: 'Clean and analyze a real-world tech salary dataset using SQL and Python to extract business insights and build an executive dashboard.',
      featuresToBuild: [
        'Data cleaning pipeline removing outliers, handling missing values, and standardizing currencies',
        'PostgreSQL analytical schema with indexed query tables',
        '10+ complex SQL analysis queries utilizing Window Functions, CTEs, and Rollups',
        'Interactive Streamlit web dashboard with dynamic filters (Role, Country, Years Experience)',
        'Executive PDF insights summary report with key compensation takeaways'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Data Cleaning & Wrangling', desc: 'Clean raw dataset with Pandas, normalize titles, and export clean CSV.' },
        { phase: 'Phase 2: PostgreSQL Schema & Ingestion', desc: 'Create normalized SQL database and write analytical queries.' },
        { phase: 'Phase 3: Exploratory Visualization', desc: 'Generate distribution histograms, correlation heatmaps, and box plots.' },
        { phase: 'Phase 4: Interactive Dashboard & Report', desc: 'Deploy Streamlit dashboard and publish case study write-up.' }
      ],
      suggestedFolderStructure: `data-project/
├── data/
│   ├── raw_salaries.csv
│   └── cleaned_salaries.csv
├── notebooks/
│   └── exploratory_analysis.ipynb
├── sql/
│   ├── schema.sql
│   └── analytics_queries.sql
├── dashboard/
│   └── app.py
└── reports/
    └── executive_summary.pdf`,
      testingChecklist: [
        'Verify SQL queries return accurate aggregations without duplicate row counts',
        'Ensure currency conversion logic handles international salary parity correctly',
        'Validate Streamlit dashboard filters update charts smoothly in real time',
        'Confirm clean documentation of data assumptions and methodology'
      ],
      readmeChecklist: [
        'Executive summary highlighting the top 5 surprising salary insights',
        'Embedded SQL query snippets with explanation of Window Functions used',
        'Live Streamlit dashboard link'
      ]
    }
  },

  // -------------------------------------------------------------
  // JAVA DEVELOPER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'jv-bp-1',
    roleId: 'java',
    roleName: 'Java Developer',
    title: 'Enterprise Banking & High-Reliability Payment Processing Service',
    shortDescription: 'Thread-safe Java Spring Boot microservice handling fund transfers, double-entry ledger records, transaction rollbacks, and idempotency keys.',
    problemSolved: 'Financial systems must guarantee that money transfers never duplicate or lose balance records during network timeouts or concurrency spikes.',
    difficulty: 'Intermediate',
    techStack: ['Java 17', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Docker', 'JUnit 5'],
    skillsPracticed: ['ACID Transactions', 'Idempotency Design', 'Spring Security', 'Thread Safety & Concurrency'],
    estimatedTime: '2 - 3 Weeks (25 - 35 Hours)',
    resumeValue: 'Proves mastery of Spring Boot enterprise architecture, JPA entity relationships, and financial transaction integrity.',
    portfolioValue: 'Production-ready enterprise service with Swagger OpenAPI UI, unit test suites, and Docker container setup.',
    plan: {
      objective: 'Build a high-reliability Spring Boot banking service with strict transactional guarantees and double-entry accounting records.',
      featuresToBuild: [
        'User account management with balance inquiries and currency exchange rates',
        'Thread-safe fund transfer endpoint with pessimistic database locking',
        'Idempotency key enforcement to prevent duplicate charges on network retries',
        'Double-entry audit ledger logging debit/credit entries for every transfer',
        'Automated unit & integration tests with JUnit 5, Mockito, and Testcontainers'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Domain Entities & JPA', desc: 'Model Account, Transaction, and Ledger entities with PostgreSQL relationships.' },
        { phase: 'Phase 2: Transfer Service & Locking', desc: 'Implement @Transactional transfer logic with pessimistic lock queries.' },
        { phase: 'Phase 3: Idempotency & Validation', desc: 'Add Spring interceptors for idempotency headers and DTO validation.' },
        { phase: 'Phase 4: Test Suite & Docker', desc: 'Write integration tests verifying concurrent transfers and containerize.' }
      ],
      suggestedFolderStructure: `src/main/java/com/bank/
├── controller/
│   └── TransferController.java
├── service/
│   ├── TransferService.java
│   └── AccountService.java
├── model/
│   ├── Account.java
│   └── Transaction.java
├── repository/
│   └── AccountRepository.java
└── config/
    └── SecurityConfig.java`,
      testingChecklist: [
        'Simulate concurrent transfer requests from the same account and verify no overdraft occurs',
        'Verify duplicate request with same Idempotency-Key returns previous result without double-charging',
        'Verify transaction rollbacks cleanly when destination account is invalid',
        'Ensure JUnit test coverage > 85%'
      ],
      readmeChecklist: [
        'Financial architecture design and double-entry bookkeeping explanation',
        'Instructions for running locally with Maven (`./mvnw spring-boot:run`)',
        'Swagger UI URL and curl test examples'
      ]
    }
  },

  // -------------------------------------------------------------
  // UI/UX DESIGNER PROJECTS
  // -------------------------------------------------------------
  {
    id: 'ux-bp-1',
    roleId: 'ui-ux',
    roleName: 'UI/UX Designer',
    title: 'Cross-Platform Design System & Accessibility Component Library',
    shortDescription: 'Enterprise Figma design system containing responsive auto-layout components, color tokens, dark/light variants, and WCAG AAA compliance.',
    problemSolved: 'Product teams build disjointed, inconsistent interfaces when they lack a unified source of design truth and reusable components.',
    difficulty: 'Intermediate',
    techStack: ['Figma', 'Design Tokens', 'Auto-Layout 5.0', 'WCAG AAA Accessibility', 'Tailwind CSS Mapping'],
    skillsPracticed: ['Design System Architecture', 'Component Variants', 'Accessibility (A11y)', 'Design Tokens'],
    estimatedTime: '2 Weeks (20 - 25 Hours)',
    resumeValue: 'Demonstrates expertise in building scalable, production-ready design systems with component variants and engineering handoff documentation.',
    portfolioValue: 'Visually stunning Figma file and web documentation showcasing component states (hover, focus, disabled) and color contrast audits.',
    plan: {
      objective: 'Create a comprehensive Figma design system featuring 40+ atomic components with auto-layout, interactive variants, and token scales.',
      featuresToBuild: [
        'Foundations palette (Color tokens, 8pt spacing scale, typographic hierarchy, elevation shadows)',
        'Atomic UI components (Buttons, Inputs, Toggles, Dropdowns, Badges, Tooltips) with all interaction states',
        'Molecule & Organism templates (Navbar, Modals, Data Cards, Form Steppers)',
        'Dark mode and Light mode color mapping with WCAG AAA contrast compliance checks',
        'Design-to-code documentation with Tailwind CSS utility class mappings'
      ],
      developmentPhases: [
        { phase: 'Phase 1: Foundations & Tokens', desc: 'Define color styles, typographic scales, and spacing variables in Figma.' },
        { phase: 'Phase 2: Atomic Components', desc: 'Build button, input, and badge components using nested auto-layout.' },
        { phase: 'Phase 3: Complex Organisms', desc: 'Assemble modal dialogues, navigation bars, and data table patterns.' },
        { phase: 'Phase 4: Accessibility & Documentation', desc: 'Perform contrast audit, document usage rules, and export design tokens.' }
      ],
      suggestedFolderStructure: `Figma File Structure:
├── 📁 01. Cover & Overview
├── 📁 02. Foundations (Colors, Typography, Spacing)
├── 📁 03. Atomics (Buttons, Inputs, Badges)
├── 📁 04. Molecules (Cards, Modals, Forms)
├── 📁 05. Templates (Dashboard, Mobile Flow)
└── 📁 06. Developer Handoff Tokens`,
      testingChecklist: [
        'Verify all components resize responsively with auto-layout without breaking',
        'Audit all text and background pairings against WCAG AAA standards (minimum 7:1 ratio)',
        'Ensure component properties and variants have clear naming conventions',
        'Verify dark mode tokens map symmetrically to light mode tokens'
      ],
      readmeChecklist: [
        'Public Figma Community file link with duplicate access',
        'Design System Case Study summarizing token architecture and spacing methodology',
        'Component matrix showcase images'
      ]
    }
  }
];
