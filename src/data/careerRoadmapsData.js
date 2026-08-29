// Career Roadmap and Skill Gap Knowledge Base for B.Tech Students & Freshers

export const CAREER_ROADMAPS = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: 'Layout',
    tagline: 'Modern Web Interfaces, Component Architecture & Interactive SPAs',
    description: 'Master building responsive, accessible, and high-performance user interfaces using modern JavaScript frameworks and design systems.',
    coreSkills: [
      'JavaScript (ES6+)', 'TypeScript', 'React 19', 'Next.js', 'HTML5 & Semantic CSS',
      'Tailwind CSS', 'State Management (Zustand / Redux)', 'RESTful APIs & GraphQL',
      'Web Performance & Core Web Vitals', 'Git & Version Control', 'Testing (Vitest / Jest)'
    ],
    roadmapSteps: [
      {
        id: 'fe-1',
        skill: 'JavaScript (ES6+) & DOM Fundamentals',
        category: 'Foundational Language',
        priority: 'High',
        whyItMatters: 'Core JavaScript (closures, promises, async/await, array methods) is the primary interview filter for all entry-level frontend roles.',
        suggestedPractice: 'Build a vanilla JS interactive Kanban board or dynamic product filtering system.',
        recommendedProjectTitle: 'Interactive Task & Kanban Workflow Board',
        recommendedProjectDesc: 'Drag-and-drop task management tool built with vanilla JavaScript, local storage persistence, and dynamic DOM rendering.',
        recommendedProjectTech: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage']
      },
      {
        id: 'fe-2',
        skill: 'React 19 Component Architecture & Hooks',
        category: 'Framework Core',
        priority: 'High',
        whyItMatters: 'React is the dominant UI library in tech companies. Mastery of hooks (useState, useEffect, useMemo, custom hooks) is mandatory.',
        suggestedPractice: 'Build a multi-step form builder with live preview and validation.',
        recommendedProjectTitle: 'Multi-Step Resume & Portfolio Generator',
        recommendedProjectDesc: 'Interactive SPA featuring dynamic state management, custom hooks, and downloadable outputs.',
        recommendedProjectTech: ['React', 'TypeScript', 'Tailwind CSS']
      },
      {
        id: 'fe-3',
        skill: 'TypeScript for Frontend Applications',
        category: 'Type Safety & Architecture',
        priority: 'High',
        whyItMatters: 'Over 85% of modern enterprise frontend codebases require TypeScript for scalable, bug-free development.',
        suggestedPractice: 'Refactor an existing JavaScript project to strict TypeScript with generic interfaces and API contract types.',
        recommendedProjectTitle: 'Type-Safe Financial Analytics Dashboard',
        recommendedProjectDesc: 'Real-time financial telemetry dashboard with typed API responses, interactive charts, and filtering.',
        recommendedProjectTech: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js']
      },
      {
        id: 'fe-4',
        skill: 'Next.js 14 & Server-Side Rendering (SSR)',
        category: 'Full-Stack React & Performance',
        priority: 'Medium',
        whyItMatters: 'Next.js App Router, SSR, and SEO optimization are top requirements for high-traffic consumer web applications.',
        suggestedPractice: 'Build an SSR blog with Markdown rendering, metadata tags, and dynamic route handlers.',
        recommendedProjectTitle: 'High-Performance Developer Blog & Documentation Hub',
        recommendedProjectDesc: 'SEO-optimized knowledge base featuring server-side rendering, syntax highlighting, and dark mode.',
        recommendedProjectTech: ['Next.js', 'React', 'Tailwind CSS', 'MDX']
      },
      {
        id: 'fe-5',
        skill: 'State Management & API Orchestration',
        category: 'Data Layer',
        priority: 'Medium',
        whyItMatters: 'Handling complex asynchronous server state, caching, and optimistic updates is essential for production applications.',
        suggestedPractice: 'Implement TanStack Query or Zustand for an e-commerce shopping cart with real-time stock sync.',
        recommendedProjectTitle: 'E-Commerce Product Explorer & Checkout Flow',
        recommendedProjectDesc: 'Full e-commerce experience with client-side state caching, optimistic cart updates, and mock Stripe checkout.',
        recommendedProjectTech: ['React', 'Zustand', 'Tailwind CSS', 'REST API']
      }
    ],
    recommendedProjects: [
      {
        id: 'fe-proj-1',
        title: 'Modern SaaS Analytics Dashboard',
        description: 'Interactive analytics dashboard featuring real-time metric charts, theme customization, and CSV export capabilities.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        skillsPracticed: ['TypeScript', 'React', 'Tailwind CSS', 'Data Visualization'],
        difficulty: 'Beginner / Intermediate'
      },
      {
        id: 'fe-proj-2',
        title: 'Collaborative Real-Time Workspace Canvas',
        description: 'Multi-user interactive whiteboard supporting live vector shapes, real-time presence indicators, and offline sync.',
        techStack: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
        skillsPracticed: ['WebSockets', 'React Hooks', 'State Synchronization'],
        difficulty: 'Intermediate / Advanced'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: 'Server',
    tagline: 'High-Throughput APIs, Distributed Microservices & Databases',
    description: 'Design robust backend services, scalable REST/GraphQL APIs, database schema architectures, and secure authentication pipelines.',
    coreSkills: [
      'Node.js & Express', 'Python (FastAPI / Django)', 'PostgreSQL & SQL Mastery',
      'Redis Caching', 'RESTful API Design', 'Docker & Containerization',
      'Authentication (JWT & OAuth 2.0)', 'Microservices Architecture', 'Git & CI/CD Pipelines'
    ],
    roadmapSteps: [
      {
        id: 'be-1',
        skill: 'RESTful API Design & Express / Node.js',
        category: 'Server Core',
        priority: 'High',
        whyItMatters: 'Designing consistent, clean REST endpoints with proper HTTP status codes and middleware is fundamental for backend engineers.',
        suggestedPractice: 'Build a CRUD API with request validation middleware, pagination, and standardized error responses.',
        recommendedProjectTitle: 'Enterprise Resource & User Management API',
        recommendedProjectDesc: 'RESTful API with role-based access control, input sanitization, rate-limiting, and Swagger OpenAPI documentation.',
        recommendedProjectTech: ['Node.js', 'Express', 'PostgreSQL', 'JWT']
      },
      {
        id: 'be-2',
        skill: 'Relational Database Schema Design (PostgreSQL)',
        category: 'Data Persistence',
        priority: 'High',
        whyItMatters: 'Database indexing, foreign key constraints, transactions (ACID), and query optimization prevent production bottlenecks.',
        suggestedPractice: 'Design a relational schema for an order management system and write complex SQL joins and aggregation queries.',
        recommendedProjectTitle: 'High-Scale E-Commerce Database & Order Processing Engine',
        recommendedProjectDesc: 'Normalized PostgreSQL schema with transaction isolation, automated inventory deductions, and index benchmarking.',
        recommendedProjectTech: ['PostgreSQL', 'SQL', 'Prisma ORM', 'Node.js']
      },
      {
        id: 'be-3',
        skill: 'Redis In-Memory Caching & Rate Limiting',
        category: 'Performance & Scalability',
        priority: 'High',
        whyItMatters: 'Caching hot database queries and rate-limiting incoming traffic reduces latency and prevents server outages.',
        suggestedPractice: 'Implement a Redis caching layer for API responses with TTL expiration and sliding-window rate limiters.',
        recommendedProjectTitle: 'High-Throughput URL Shortener with Redis Analytics',
        recommendedProjectDesc: 'Distributed URL shortening service handling 10,000 req/sec with Redis key caching and click telemetry.',
        recommendedProjectTech: ['Node.js', 'Redis', 'PostgreSQL', 'Docker']
      },
      {
        id: 'be-4',
        skill: 'Docker Containerization & Deployment',
        category: 'DevOps & Tooling',
        priority: 'Medium',
        whyItMatters: 'Packaging applications into Docker containers ensures consistency across development, staging, and production environments.',
        suggestedPractice: 'Write multi-stage Dockerfiles and docker-compose files linking Node.js, PostgreSQL, and Redis containers.',
        recommendedProjectTitle: 'Containerized Microservices Cluster',
        recommendedProjectDesc: 'Multi-container application with Docker Compose, automated health checks, and environment variable isolation.',
        recommendedProjectTech: ['Docker', 'Docker Compose', 'Node.js', 'PostgreSQL']
      }
    ],
    recommendedProjects: [
      {
        id: 'be-proj-1',
        title: 'Distributed Task Scheduling & Worker Queue',
        description: 'Asynchronous background job queue utilizing Redis and worker threads to process email notifications and report generation.',
        techStack: ['Node.js', 'Redis', 'BullMQ', 'PostgreSQL'],
        skillsPracticed: ['Redis', 'Asynchronous Queues', 'Error Handling'],
        difficulty: 'Intermediate'
      },
      {
        id: 'be-proj-2',
        title: 'Secure Multi-Tenant Auth Service',
        description: 'Authentication microservice with JWT signing, refresh token rotation, bcrypt password hashing, and OAuth 2.0 social login.',
        techStack: ['Node.js', 'Express', 'JWT', 'PostgreSQL'],
        skillsPracticed: ['Security', 'JWT', 'OAuth 2.0', 'SQL'],
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: 'Layers',
    tagline: 'End-to-End Product Engineering from UI to Database',
    description: 'Master full lifecycle web engineering connecting responsive React frontends with scalable Node.js/Python backends and relational databases.',
    coreSkills: [
      'React 19', 'TypeScript', 'Node.js & Express', 'PostgreSQL / MongoDB',
      'RESTful APIs & GraphQL', 'Tailwind CSS', 'Docker Containerization',
      'Git & CI/CD Pipelines', 'Authentication & Authorization'
    ],
    roadmapSteps: [
      {
        id: 'fs-1',
        skill: 'Frontend & Backend API Contract Integration',
        category: 'Full-Stack Core',
        priority: 'High',
        whyItMatters: 'Full-stack engineers must connect rich client state to backend controllers without data desynchronization.',
        suggestedPractice: 'Build a full-stack CRUD application with optimistic updates and error toast boundaries.',
        recommendedProjectTitle: 'Full-Stack Project Management Platform',
        recommendedProjectDesc: 'Comprehensive workspace tool featuring interactive boards, team member invitations, and real-time activity logs.',
        recommendedProjectTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
      },
      {
        id: 'fs-2',
        skill: 'Authentication & Session Architecture',
        category: 'Security',
        priority: 'High',
        whyItMatters: 'End-to-end security requires managing HTTP-only cookies, JWT verification, and protected client-side routes.',
        suggestedPractice: 'Implement secure login, registration, and role-based page navigation guards.',
        recommendedProjectTitle: 'Multi-Role Enterprise Portal',
        recommendedProjectDesc: 'SaaS application with Admin, Manager, and Member permissions, audit logs, and profile management.',
        recommendedProjectTech: ['React', 'Node.js', 'JWT', 'PostgreSQL']
      },
      {
        id: 'fs-3',
        skill: 'Database Modeling & Query Optimization',
        category: 'Data Layer',
        priority: 'High',
        whyItMatters: 'Efficient full-stack developers write clean relational migrations and prevent N+1 query performance traps.',
        suggestedPractice: 'Design normalized tables with Prisma ORM and write pagination and full-text search indexes.',
        recommendedProjectTitle: 'Content Publishing & Discussion Forum',
        recommendedProjectDesc: 'Interactive community platform with nested comments, upvoting, tag filtering, and instant search.',
        recommendedProjectTech: ['React', 'Node.js', 'PostgreSQL', 'Prisma']
      }
    ],
    recommendedProjects: [
      {
        id: 'fs-proj-1',
        title: 'Full-Stack E-Learning Platform',
        description: 'Complete course management platform with video progress tracking, quiz assessments, certificate generation, and student dashboard.',
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        skillsPracticed: ['Full-Stack Integration', 'PostgreSQL', 'State Management'],
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'python',
    title: 'Python Developer',
    icon: 'Terminal',
    tagline: 'Backend Systems, FastAPI, Automation & Data Scripting',
    description: 'Leverage Python for clean backend microservices, high-speed asynchronous APIs with FastAPI, data manipulation, and web scraping.',
    coreSkills: [
      'Python 3 (OOP & Asyncio)', 'FastAPI / Django', 'PostgreSQL & SQLAlchemy',
      'PyTest & Automated Testing', 'Pandas & NumPy Basics', 'Docker',
      'REST APIs & Pydantic', 'Git & Linux CLI'
    ],
    roadmapSteps: [
      {
        id: 'py-1',
        skill: 'Python 3 Object-Oriented & Asyncio Programming',
        category: 'Core Language',
        priority: 'High',
        whyItMatters: 'Understanding Python data structures, decorators, context managers, and async concurrency is essential.',
        suggestedPractice: 'Build a multi-threaded web scraper or asynchronous batch file processing pipeline.',
        recommendedProjectTitle: 'Asynchronous Web Scraper & Price Tracker',
        recommendedProjectDesc: 'High-concurrency crawler collecting product data, monitoring price fluctuations, and sending email alerts.',
        recommendedProjectTech: ['Python', 'Asyncio', 'BeautifulSoup4', 'SQLite']
      },
      {
        id: 'py-2',
        skill: 'FastAPI & Pydantic Data Validation',
        category: 'Modern Web Framework',
        priority: 'High',
        whyItMatters: 'FastAPI is the industry standard for high-performance Python microservices with automatic OpenAPI documentation.',
        suggestedPractice: 'Build a RESTful service with dependency injection and Pydantic schema validation.',
        recommendedProjectTitle: 'High-Performance Machine Learning Model Serving API',
        recommendedProjectDesc: 'FastAPI backend serving text classification models with batch inference and async request queues.',
        recommendedProjectTech: ['Python', 'FastAPI', 'Pydantic', 'Docker']
      }
    ],
    recommendedProjects: [
      {
        id: 'py-proj-1',
        title: 'Automated Resume Keyword Parser & Matcher',
        description: 'Python NLP service that ingests PDF documents, extracts technical skills, and matches candidates against job requirements.',
        techStack: ['Python', 'FastAPI', 'Pydantic', 'PyPDF2'],
        skillsPracticed: ['FastAPI', 'Text Processing', 'API Design'],
        difficulty: 'Beginner / Intermediate'
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: 'BarChart3',
    tagline: 'Data Wrangling, SQL Analytics, Dashboards & Business Intelligence',
    description: 'Transform raw data into actionable business intelligence using SQL queries, Pandas, statistical modeling, and interactive dashboards.',
    coreSkills: [
      'SQL (Joins, Window Functions, CTEs)', 'Python (Pandas, NumPy)',
      'Data Visualization (Matplotlib, Seaborn)', 'PowerBI / Tableau',
      'Statistical Analysis', 'Excel & Advanced Formulas', 'Data Cleaning & ETL'
    ],
    roadmapSteps: [
      {
        id: 'da-1',
        skill: 'Advanced SQL Analytics (Window Functions & CTEs)',
        category: 'Database Querying',
        priority: 'High',
        whyItMatters: 'Over 90% of data analyst technical interviews evaluate complex SQL window functions (RANK, ROW_NUMBER, LAG, LEAD).',
        suggestedPractice: 'Solve 30 real-world business queries on cohort retention, revenue churn, and customer lifetime value.',
        recommendedProjectTitle: 'SaaS Product Growth & Retention SQL Analytics',
        recommendedProjectDesc: 'Comprehensive SQL case study analyzing user signups, conversion cohorts, and monthly recurring revenue.',
        recommendedProjectTech: ['SQL', 'PostgreSQL', 'Data Modeling']
      },
      {
        id: 'da-2',
        skill: 'Python Data Wrangling with Pandas & NumPy',
        category: 'Data Processing',
        priority: 'High',
        whyItMatters: 'Pandas enables cleaning messy datasets, handling missing values, pivoting tables, and merging diverse sources.',
        suggestedPractice: 'Clean an unformatted CSV dataset of 100,000 rows and export a structured exploratory data report.',
        recommendedProjectTitle: 'Customer Churn & Behavioral Exploratory Analysis',
        recommendedProjectDesc: 'Interactive Jupyter Notebook identifying key churn indicators using statistical correlation and visual charts.',
        recommendedProjectTech: ['Python', 'Pandas', 'NumPy', 'Seaborn']
      }
    ],
    recommendedProjects: [
      {
        id: 'da-proj-1',
        title: 'Global Tech Salary & Job Market Intelligence Dashboard',
        description: 'Interactive data analysis analyzing tech compensation trends across roles, locations, and experience levels.',
        techStack: ['Python', 'Pandas', 'SQL', 'Streamlit'],
        skillsPracticed: ['Data Cleaning', 'SQL Queries', 'Data Visualization'],
        difficulty: 'Beginner / Intermediate'
      }
    ]
  },
  {
    id: 'java',
    title: 'Java Developer',
    icon: 'Coffee',
    tagline: 'Enterprise Applications, Spring Boot & Microservices',
    description: 'Build enterprise-grade, high-reliability services using Java 17+, Spring Boot, Spring Security, Hibernate ORM, and relational databases.',
    coreSkills: [
      'Java 17+ (OOP, Generics, Streams, Lambdas)', 'Spring Boot & Spring Data JPA',
      'Hibernate ORM & PostgreSQL', 'Spring Security (JWT)', 'Maven / Gradle',
      'JUnit & Mockito Testing', 'Docker & REST APIs'
    ],
    roadmapSteps: [
      {
        id: 'jv-1',
        skill: 'Java 17+ Core & Streams API',
        category: 'Language Core',
        priority: 'High',
        whyItMatters: 'Functional streams, lambdas, memory management, and OOP design patterns form the baseline for Java roles.',
        suggestedPractice: 'Write clean Java code using the Stream API for complex filtering, mapping, and grouping operations.',
        recommendedProjectTitle: 'Banking Transaction Processing Engine',
        recommendedProjectDesc: 'Java application modeling account balances, transaction audits, and thread-safe fund transfers.',
        recommendedProjectTech: ['Java 17', 'JUnit 5', 'Maven']
      },
      {
        id: 'jv-2',
        skill: 'Spring Boot REST APIs & Spring Data JPA',
        category: 'Enterprise Framework',
        priority: 'High',
        whyItMatters: 'Spring Boot is the standard framework for enterprise Java backend development across Fortune 500 companies.',
        suggestedPractice: 'Build a RESTful service with Spring Data JPA repository interfaces, DTOs, and exception handling.',
        recommendedProjectTitle: 'Enterprise Inventory Management Backend',
        recommendedProjectDesc: 'Spring Boot REST microservice with JPA entity relationships, automated pagination, and PostgreSQL storage.',
        recommendedProjectTech: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL']
      }
    ],
    recommendedProjects: [
      {
        id: 'jv-proj-1',
        title: 'Flight Booking & Reservation System',
        description: 'Spring Boot microservice handling seat availability, passenger booking, ticket validation, and PDF invoice generation.',
        techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        skillsPracticed: ['Spring Boot', 'JPA', 'PostgreSQL', 'REST APIs'],
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    icon: 'Figma',
    tagline: 'Design Systems, User Research, Wireframes & Interactive Prototypes',
    description: 'Craft user-centric digital experiences using Figma, design tokens, responsive typography, WCAG accessibility, and usability testing.',
    coreSkills: [
      'Figma Mastery & Auto Layout', 'Design Systems & Component Libraries',
      'User Research & Journey Mapping', 'Interactive Prototyping',
      'WCAG Accessibility Standards', 'Design-to-Code Handoff', 'Tailwind CSS Basics'
    ],
    roadmapSteps: [
      {
        id: 'ux-1',
        skill: 'Figma Auto-Layout & Component Variants',
        category: 'Design Tooling',
        priority: 'High',
        whyItMatters: 'Fast, responsive interface design requires mastering nested auto-layout, interactive component variants, and design tokens.',
        suggestedPractice: 'Build a full responsive component library (buttons, inputs, modals, cards) in Figma.',
        recommendedProjectTitle: 'Cross-Platform SaaS Design System (Component Library)',
        recommendedProjectDesc: 'Comprehensive Figma design system with light/dark tokens, responsive auto-layout components, and WCAG AAA compliance.',
        recommendedProjectTech: ['Figma', 'Design Tokens', 'Accessibility']
      },
      {
        id: 'ux-2',
        skill: 'User Journey Mapping & Wireframing',
        category: 'UX Research',
        priority: 'High',
        whyItMatters: 'Solving real user pain points with low-fidelity wireframes before coding saves weeks of engineering rework.',
        suggestedPractice: 'Conduct 3 user interviews and map user personas and onboarding user flows.',
        recommendedProjectTitle: 'Fintech Mobile App UX Case Study',
        recommendedProjectDesc: 'End-to-end UX case study detailing user persona research, wireframing, usability test findings, and high-fidelity prototype.',
        recommendedProjectTech: ['Figma', 'UX Research', 'Prototyping']
      }
    ],
    recommendedProjects: [
      {
        id: 'ux-proj-1',
        title: 'Modern Healthcare & Telemedicine Patient Portal',
        description: 'High-fidelity mobile and desktop prototype designed in Figma featuring patient appointment scheduling, lab telemetry, and doctor chat.',
        techStack: ['Figma', 'Design Tokens', 'User Research', 'Prototyping'],
        skillsPracticed: ['Figma', 'UI/UX Design', 'Design Systems'],
        difficulty: 'Beginner / Intermediate'
      }
    ]
  }
];
