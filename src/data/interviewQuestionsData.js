// Comprehensive Interview Question Knowledge Base & Dynamic Project Question Engine

export const ROLE_INTERVIEW_QUESTIONS = {
  frontend: [
    // Technical
    {
      id: 'fe-tech-1',
      category: 'technical',
      role: 'frontend',
      question: 'Explain the React Virtual DOM, reconciliation algorithm (Fiber), and how keys optimize list rendering.',
      whyInterviewerAsks: 'Assesses whether the candidate understands the internal rendering cost of React rather than treating it like a black box.',
      keyPointsToCover: [
        'Virtual DOM is an in-memory representation of UI elements comparing tree snapshots (diffing).',
        'React Fiber enables asynchronous interruptible rendering with priority levels.',
        'Keys provide stable identity across renders, preventing unneeded DOM node destruction and recreation.',
        'Never use array index as keys if items can be reordered, inserted, or deleted.'
      ],
      sampleAnswerFramework: 'Start with the concept of the Virtual DOM tree -> Explain how Diffing compares new vs old VDOM -> Describe why keys enable O(N) element tracking -> Conclude with performance optimization tips.',
      difficulty: 'Medium'
    },
    {
      id: 'fe-tech-2',
      category: 'technical',
      role: 'frontend',
      question: 'What are Closures in JavaScript, and how do they power React Hooks like useState and useEffect?',
      whyInterviewerAsks: 'Tests core JavaScript language fundamentals and how lexical scope enables persistent hook state between component renders.',
      keyPointsToCover: [
        'A closure is a function that retains access to its lexical scope even when executed outside that scope.',
        'React hooks maintain an array/linked-list of state cells tied to the component fiber through closures.',
        'Common pitfall: Stale closures in useEffect when dependency arrays are omitted or incomplete.'
      ],
      sampleAnswerFramework: 'Define closure with a concise code example -> Relate it to how useState retains value across render cycles -> Highlight the stale closure edge case in useEffect.',
      difficulty: 'Medium'
    },
    {
      id: 'fe-tech-3',
      category: 'technical',
      role: 'frontend',
      question: 'How do you optimize Core Web Vitals (LCP, INP/FID, CLS) in a modern single-page or SSR web application?',
      whyInterviewerAsks: 'Evaluates real-world performance engineering, asset optimization, and user experience awareness.',
      keyPointsToCover: [
        'Largest Contentful Paint (LCP): Preload hero images, use WebP/AVIF formats, optimize critical CSS, and implement CDN caching.',
        'Interaction to Next Paint (INP): Break long JavaScript tasks using requestIdleCallback/web workers, debounce high-frequency events.',
        'Cumulative Layout Shift (CLS): Explicitly set image width/height aspect ratios and reserve font/banner spaces.'
      ],
      sampleAnswerFramework: 'Define each of the 3 metrics -> Give actionable frontend techniques for each -> Mention diagnostic tools used (Lighthouse, Chrome DevTools Performance panel).',
      difficulty: 'Hard'
    },
    // HR & Behavioral
    {
      id: 'fe-hr-1',
      category: 'behavioral',
      role: 'frontend',
      question: 'Tell me about a time you had a technical disagreement with a backend engineer or designer. How did you resolve it?',
      whyInterviewerAsks: 'Evaluates cross-functional communication, empathy, and ability to prioritize product and user needs over personal ego.',
      keyPointsToCover: [
        'Situation: Context of the disagreement (e.g. API contract structure, payload size, design responsiveness).',
        'Task: The shared business goal and why alignment was critical.',
        'Action: How you presented objective trade-offs (e.g. network latency vs client computation) calmly.',
        'Result: The compromise reached and the successful launch outcome.'
      ],
      sampleAnswerFramework: 'Use the STAR method (Situation, Task, Action, Result) -> Emphasize collaborative data-driven decision making.',
      difficulty: 'Easy'
    },
    // Resume-Based
    {
      id: 'fe-res-1',
      category: 'resume',
      role: 'frontend',
      question: 'Looking at your resume, why did you decide to use TypeScript and Tailwind CSS for your recent applications?',
      whyInterviewerAsks: 'Checks if the candidate can articulate technical toolchain selection based on trade-offs rather than just following trends.',
      keyPointsToCover: [
        'TypeScript prevented compile-time schema mismatch bugs between frontend and API contracts.',
        'Tailwind eliminated CSS bundle bloat, enforced design tokens, and sped up responsive UI development.',
        'Mention measurable developer velocity or defect reduction.'
      ],
      sampleAnswerFramework: 'Directly address the architectural advantage -> Contrast with alternatives (e.g. Vanilla CSS vs Tailwind) -> State the project outcome.',
      difficulty: 'Easy'
    }
  ],

  backend: [
    {
      id: 'be-tech-1',
      category: 'technical',
      role: 'backend',
      question: 'Explain Database Indexing (B-Trees vs Hash Indexes) and how you diagnose and fix a slow SQL query in PostgreSQL.',
      whyInterviewerAsks: 'Tests database performance fundamentals, indexing strategies, and real-world debugging workflows.',
      keyPointsToCover: [
        'B-Tree indexes support range queries, equality, and sorting, making them the default in relational databases.',
        'Hash indexes only support exact equality checks.',
        'Use `EXPLAIN ANALYZE` to inspect query execution plans and detect sequential scans (Seq Scan).',
        'Fix with composite indexes, covering indexes, query restructuring, and avoiding N+1 loops.'
      ],
      sampleAnswerFramework: 'Explain B-Tree mechanics -> Describe EXPLAIN ANALYZE output -> Share optimization techniques (indexing, CTEs, pagination).',
      difficulty: 'Hard'
    },
    {
      id: 'be-tech-2',
      category: 'technical',
      role: 'backend',
      question: 'How do you design a scalable authentication system with JWT, and how do you handle secure token revocation upon logout?',
      whyInterviewerAsks: 'Evaluates cybersecurity knowledge, stateless token architecture, and edge-case handling.',
      keyPointsToCover: [
        'Dual-token model: Short-lived Access Token (15m) in memory/cookies + Sliding Refresh Token in HTTP-only secure cookie.',
        'JWTs are stateless; revoking them immediately requires an in-memory Redis blacklist with TTL matching token expiry.',
        'Bcrypt / Argon2 password hashing with high work factors to prevent brute-force attacks.'
      ],
      sampleAnswerFramework: 'Outline the token lifecycle -> Explain the stateless revocation dilemma -> Describe the Redis blacklist solution.',
      difficulty: 'Medium'
    },
    {
      id: 'be-hr-1',
      category: 'behavioral',
      role: 'backend',
      question: 'Describe a situation where a production bug or unexpected system outage occurred. How did you respond?',
      whyInterviewerAsks: 'Assesses calm problem-solving under pressure, incident triage, post-mortem analysis, and preventative mindset.',
      keyPointsToCover: [
        'Situation: Sudden error spike or database connection pool exhaustion.',
        'Task: Immediate triage to restore service and minimize downtime.',
        'Action: Rollback deployment or scale connection limits, inspect server logs, and isolate the root cause.',
        'Result: Zero data loss, post-mortem blameless retrospective, and added monitoring alerts.'
      ],
      sampleAnswerFramework: 'STAR Method: Crisis context -> Immediate containment action -> Root cause fix -> Long-term automated prevention.',
      difficulty: 'Medium'
    }
  ],

  fullstack: [
    {
      id: 'fs-tech-1',
      category: 'technical',
      role: 'fullstack',
      question: 'How do you prevent Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and SQL Injection across the stack?',
      whyInterviewerAsks: 'Security is paramount for full-stack developers who manage both client inputs and database queries.',
      keyPointsToCover: [
        'XSS: Sanitize inputs, avoid `dangerouslySetInnerHTML`, encode dynamic strings, and enforce Content Security Policy (CSP).',
        'CSRF: Use SameSite=Strict cookies, anti-CSRF challenge tokens for state-changing POST/PUT requests.',
        'SQL Injection: Strictly use parameterized queries, prepared statements, or reputable ORMs (Prisma, SQLAlchemy).'
      ],
      sampleAnswerFramework: 'Address each vulnerability systematically with both frontend preventative measures and backend defensive controls.',
      difficulty: 'Medium'
    }
  ],

  python: [
    {
      id: 'py-tech-1',
      category: 'technical',
      role: 'python',
      question: 'Explain Python Global Interpreter Lock (GIL), multithreading vs multiprocessing, and when to use `asyncio`.',
      whyInterviewerAsks: 'Tests deep knowledge of Python runtime concurrency and asynchronous I/O architectures.',
      keyPointsToCover: [
        'GIL prevents multiple native threads from executing Python bytecode simultaneously in CPython.',
        'CPU-bound tasks: Use `multiprocessing` to bypass GIL across multiple CPU cores.',
        'I/O-bound tasks (API calls, DB queries): Use `asyncio` event loops with `async/await` for high-concurrency efficiency.'
      ],
      sampleAnswerFramework: 'Define GIL -> Compare Threads vs Processes -> Explain why Asyncio is optimal for web APIs (FastAPI).',
      difficulty: 'Hard'
    }
  ],

  'data-analyst': [
    {
      id: 'da-tech-1',
      category: 'technical',
      role: 'data-analyst',
      question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL? Provide an example.',
      whyInterviewerAsks: 'Window functions are the #1 screening topic for data analyst technical evaluations.',
      keyPointsToCover: [
        'ROW_NUMBER(): Assigns a unique sequential integer to each row regardless of ties (1, 2, 3, 4).',
        'RANK(): Assigns same rank to ties but skips subsequent rank numbers (1, 2, 2, 4).',
        'DENSE_RANK(): Assigns same rank to ties without skipping subsequent numbers (1, 2, 2, 3).'
      ],
      sampleAnswerFramework: 'State definitions clearly -> Provide a practical query example ranking employee salaries by department.',
      difficulty: 'Easy'
    }
  ],

  java: [
    {
      id: 'jv-tech-1',
      category: 'technical',
      role: 'java',
      question: 'Explain the internal working of HashMap in Java, hash collisions, and how Java 8 upgraded buckets to Red-Black Trees.',
      whyInterviewerAsks: 'Evaluates core Java collection data structures, memory management, and algorithmic complexity.',
      keyPointsToCover: [
        'HashMap uses an array of Nodes/Buckets with `hashCode()` and `equals()`.',
        'Collisions are handled via linked lists in buckets.',
        'In Java 8, when a bucket exceeds 8 items (TREEIFY_THRESHOLD), the linked list converts to a balanced Red-Black Tree, improving lookup from O(N) to O(log N).'
      ],
      sampleAnswerFramework: 'Describe hashing and indexing -> Explain collision resolution -> Detail the Java 8 Treeify performance optimization.',
      difficulty: 'Hard'
    }
  ],

  'ui-ux': [
    {
      id: 'ux-tech-1',
      category: 'technical',
      role: 'ui-ux',
      question: 'How do you conduct usability testing for a prototype, and how do you decide when to follow user feedback versus design principles?',
      whyInterviewerAsks: 'Tests research methodology, empathy, and analytical decision-making in user experience design.',
      keyPointsToCover: [
        'Define clear task-based test scenarios without leading the user.',
        'Measure task completion rate, time on task, and qualitative friction points.',
        'Balance feedback with core usability heuristics (Nielsen Norman heuristics, WCAG accessibility).'
      ],
      sampleAnswerFramework: 'Explain test setup -> Detail execution and observation -> Explain how you synthesize qualitative & quantitative data.',
      difficulty: 'Medium'
    }
  ]
};

// Function to generate dynamic project interview questions for user's actual resume/portfolio projects
export function generateDynamicProjectQuestions(projects = []) {
  if (!projects || projects.length === 0) {
    return [
      {
        id: 'dyn-proj-default',
        category: 'project',
        role: 'general',
        question: 'Walk me through the architecture of your most challenging software project. What technical trade-offs did you make?',
        whyInterviewerAsks: 'Tests your high-level system thinking, technical ownership, and ability to communicate complex architectures concisely.',
        keyPointsToCover: [
          'Overview: What problem the application solves and who uses it.',
          'Architecture: Frontend, backend, database, and third-party services.',
          'Trade-offs: Why you picked certain technologies over alternatives.',
          'Key Challenge: A major performance bottleneck or bug and how you solved it.'
        ],
        sampleAnswerFramework: 'Start with 1-sentence elevator pitch -> Outline component layers -> Discuss a specific technical hurdle -> Share measurable outcome.',
        difficulty: 'Medium'
      }
    ];
  }

  const generated = [];

  projects.forEach((proj, idx) => {
    const techString = Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || 'chosen tech stack');

    // Question 1: Architectural Deep Dive
    generated.push({
      id: `dyn-proj-arch-${proj.id || idx}`,
      category: 'project',
      role: 'general',
      question: `In your project "${proj.title}", walk me through the system architecture and explain why you chose ${techString}.`,
      whyInterviewerAsks: `Evaluates your technical justification for selecting ${techString} and how you structured the application modules.`,
      keyPointsToCover: [
        `Explain the core problem "${proj.title}" solves.`,
        `Describe how data flows through the application layers.`,
        `Justify using ${techString} based on performance, productivity, or scalability.`,
        `Mention any security or performance optimizations implemented.`
      ],
      sampleAnswerFramework: `1. Problem Statement -> 2. Technical Stack Justification (${techString}) -> 3. Component / Data Flow -> 4. Lessons learned during building.`,
      difficulty: 'Medium',
      projectName: proj.title
    });

    // Question 2: Technical Challenge & Debugging
    generated.push({
      id: `dyn-proj-challenge-${proj.id || idx}`,
      category: 'project',
      role: 'general',
      question: `What was the most difficult technical bottleneck or bug you encountered while developing "${proj.title}", and how did you resolve it?`,
      whyInterviewerAsks: 'Assesses real problem-solving, debugging methodology, and resilience when encountering complex software failures.',
      keyPointsToCover: [
        'Identify the root cause of the issue (e.g. memory leak, race condition, state desynchronization, slow database query).',
        'Explain the diagnostic tools used to isolate the issue (DevTools, logs, profiling).',
        'Describe the code fix implemented and how you verified it did not break regression tests.',
        'What preventative safeguards were put in place.'
      ],
      sampleAnswerFramework: 'STAR Method: Symptom -> Investigation & Root Cause -> Solution & Code Refactor -> Performance/Reliability Outcome.',
      difficulty: 'Hard',
      projectName: proj.title
    });
  });

  return generated;
}
