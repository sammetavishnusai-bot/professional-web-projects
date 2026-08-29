export const sampleProfiles = {
  fullstack: {
    id: 'fullstack',
    name: 'Alex Chen',
    title: 'Senior Full-Stack & AI Engineer',
    category: 'Engineering',
    personalInfo: {
      fullName: 'Alex Chen',
      title: 'Senior Full-Stack & AI Engineer',
      email: 'alex.chen@devmail.io',
      phone: '+1 (555) 234-8901',
      location: 'San Francisco, CA (Open to Remote)',
      website: 'https://alexchen.dev',
      github: 'https://github.com/alexchen-dev',
      linkedin: 'https://linkedin.com/in/alexchen-tech',
      twitter: 'https://x.com/alexchen_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      summary: 'High-velocity Senior Full-Stack Engineer with 6+ years specializing in distributed React/Node.js systems and generative AI workflows. Architected cloud-native microservices scaling to 12M+ monthly active users at 99.99% uptime. Proven track record transforming legacy monolithic architectures into high-throughput event-driven micro-frontends while slashing AWS cloud costs by 34%.'
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Full-Stack Engineer',
        company: 'Synthetix AI Systems',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        highlights: [
          'Spearheaded development of a real-time collaborative AI canvas using React, WebSockets, and WebAssembly, boosting daily user engagement by 48%.',
          'Architected an event-driven ingestion pipeline handling 14,000 requests/sec with Redis Streams and Kafka, reducing latency from 240ms to 42ms.',
          'Championed CI/CD pipeline automation and TypeScript strict mode migrations across 18 repositories, reducing production rollbacks by 73%.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Senior Software Engineer',
        company: 'Veloce Cloud Solutions',
        location: 'San Jose, CA',
        startDate: '2019-08',
        endDate: '2022-02',
        current: false,
        highlights: [
          'Re-engineered core billing & analytics dashboard with Next.js and GraphQL, decreasing initial page bundle size by 54% and improving Core Web Vitals to 98/100.',
          'Authored high-performance REST and gRPC endpoints supporting multi-tenant enterprise data partitioning across 6 global AWS regions.',
          'Mentored 8 junior and mid-level engineers, running weekly architecture reviews and code quality workshops.'
        ]
      },
      {
        id: 'exp-3',
        role: 'Software Engineer',
        company: 'Nexis Media Labs',
        location: 'Austin, TX',
        startDate: '2018-06',
        endDate: '2019-07',
        current: false,
        highlights: [
          'Built responsive component libraries with React, Storybook, and Tailwind CSS, adopted by 12 cross-functional frontend squads.',
          'Integrated Stripe payment gateway and fraud detection webhooks, successfully processing $3.2M in annual recurring transactions.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2014',
        endDate: '2018',
        gpa: '3.85 / 4.0',
        highlights: [
          'Honors: Dean\'s Honors List (6 consecutive semesters), Magna Cum Laude',
          'Coursework: Distributed Systems, Advanced Algorithms, Machine Learning, Database Architecture'
        ]
      }
    ],
    skills: [
      { category: 'Frontend', items: ['React 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vue 3', 'Redux Toolkit', 'Framer Motion', 'WebAssembly'] },
      { category: 'Backend & Cloud', items: ['Node.js', 'Python / FastAPI', 'PostgreSQL', 'Redis', 'GraphQL', 'Docker', 'Kubernetes', 'AWS (Lambda, S3, ECS)'] },
      { category: 'AI & Data', items: ['LangChain', 'OpenAI APIs', 'Vector DBs (Pinecone)', 'Embeddings', 'Kafka', 'Elasticsearch'] },
      { category: 'DevOps & Tools', items: ['Git / GitHub Actions', 'Terraform', 'Jest / Vitest', 'Cypress', 'Webpack / Vite', 'Datadog'] }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'CognitiveFlow - AI Prompt & Agent Studio',
        subtitle: 'Enterprise Generative AI Canvas & Orchestration Engine',
        description: 'An open-source visual prompt chaining and agent workflow builder built for developer teams. Features node-based execution graph, vector memory integration, and instant API deployment.',
        techStack: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Pinecone', 'Tailwind CSS'],
        link: 'https://cognitiveflow.demo.io',
        github: 'https://github.com/alexchen-dev/cognitive-flow',
        featured: true,
        metrics: '⭐ 3.2k GitHub Stars • 45k monthly downloads'
      },
      {
        id: 'proj-2',
        title: 'HyperStream - Real-time Data Visualizer',
        subtitle: 'Sub-millisecond WebSocket Timeseries Grapher',
        description: 'A WebGL-powered financial time-series chart rendering 100,000+ data points at steady 60 FPS. Implements custom shaders for candle stick analysis and orderbook depth charts.',
        techStack: ['Three.js', 'WebGL', 'React', 'Rust/Wasm', 'Tailwind CSS'],
        link: 'https://hyperstream.demo.io',
        github: 'https://github.com/alexchen-dev/hyper-stream',
        featured: true,
        metrics: '⚡ 60 FPS @ 100k data points • Zero frame drop'
      },
      {
        id: 'proj-3',
        title: 'VaultKey - Zero-Knowledge Secret Manager',
        subtitle: 'End-to-End Encrypted Developer Environment Sync',
        description: 'Lightweight desktop and CLI utility for synchronizing team environment variables using asymmetric RSA-4096 and AES-GCM-256 client-side encryption.',
        techStack: ['Electron', 'React', 'Go', 'SQLite', 'WebCrypto'],
        link: 'https://vaultkey.demo.io',
        github: 'https://github.com/alexchen-dev/vaultkey',
        featured: false,
        metrics: '🔒 Zero server telemetry • End-to-end encrypted'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023' },
      { id: 'cert-2', name: 'TensorFlow Developer Certificate', issuer: 'Google Cloud', date: '2022' }
    ],
    languages: [
      { language: 'English', proficiency: 'Native / Bilingual' },
      { language: 'Mandarin', proficiency: 'Professional Working' },
      { language: 'German', proficiency: 'Elementary' }
    ]
  },

  designer: {
    id: 'designer',
    name: 'Elena Rostova',
    title: 'Lead Product & UX/UI Designer',
    category: 'Design',
    personalInfo: {
      fullName: 'Elena Rostova',
      title: 'Lead Product & Design Systems Architect',
      email: 'elena.rostova@designworks.co',
      phone: '+1 (555) 489-3210',
      location: 'New York, NY (Hybrid)',
      website: 'https://elenarostova.design',
      github: 'https://github.com/elena-designs',
      linkedin: 'https://linkedin.com/in/elena-rostova-design',
      twitter: 'https://x.com/elena_ux',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      summary: 'Award-winning Lead Product Designer with 7+ years of expertise in crafting scalable enterprise design systems, high-converting consumer mobile apps, and accessible B2B SaaS interfaces. Pioneered multi-brand design tokens used across 40+ products, driving a 210% increase in checkout conversions and cutting frontend design handoff discrepancies by 65%.'
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Head of Product Design',
        company: 'Aura Fintech Labs',
        location: 'New York, NY',
        startDate: '2022-01',
        endDate: 'Present',
        current: true,
        highlights: [
          'Led end-to-end design strategy for mobile wealth management app, growing active user base from 120k to 1.8M within 18 months.',
          'Constructed unified Figma Design System with 400+ tokenized components and WCAG AAA compliance standards.',
          'Spearheaded user research labs across 65 enterprise clients, translating qualitative insights into product roadmap iterations.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Senior UI/UX Designer',
        company: 'Prism Studio',
        location: 'Brooklyn, NY',
        startDate: '2019-03',
        endDate: '2021-12',
        current: false,
        highlights: [
          'Redesigned e-commerce checkout funnel for Fortune 500 client, elevating checkout completion rate by 28.4% ($14M incremental ARR).',
          'Delivered interactive micro-animations and motion guidelines using Protopie, After Effects, and Rive.',
          'Conducted A/B testing and multivariable usability evaluations with Maze and FullStory.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.F.A. in Interaction Design & HCI',
        institution: 'Rhode Island School of Design (RISD)',
        location: 'Providence, RI',
        startDate: '2015',
        endDate: '2019',
        gpa: '3.92 / 4.0',
        highlights: [
          'President of RISD UX Society • Red Dot Design Junior Concept Award Winner 2019'
        ]
      }
    ],
    skills: [
      { category: 'UI & Visual Design', items: ['Figma Mastery', 'Design Tokens', 'Design Systems', 'Typography', 'Color Theory', 'Wireframing', 'Responsive UI'] },
      { category: 'UX & Research', items: ['User Journey Mapping', 'Information Architecture', 'Usability Testing', 'Card Sorting', 'Jobs To Be Done (JTBD)', 'A/B Testing'] },
      { category: 'Prototyping & Motion', items: ['Protopie', 'Rive', 'Framer', 'After Effects', 'Lottie', 'Interactive Micro-interactions'] },
      { category: 'Tech & Collaboration', items: ['HTML/CSS/Tailwind', 'React Basics', 'Storybook', 'Zeroheight', 'WCAG AAA Accessibility', 'Jira/Agile'] }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Lumina Design System',
        subtitle: 'Cross-Platform Enterprise Design Language',
        description: 'Multi-brand scalable design token system spanning Web, iOS, and Android. Includes automatic Figma-to-Code sync scripts, accessible color contrast generators, and documentation portal.',
        techStack: ['Figma', 'Style Dictionary', 'Storybook', 'Tailwind CSS', 'Framer'],
        link: 'https://lumina-system.demo.io',
        github: 'https://github.com/elena-designs/lumina-tokens',
        featured: true,
        metrics: '🏆 Best Design System 2023 • 400+ tokenized UI elements'
      },
      {
        id: 'proj-2',
        title: 'Zenith Crypto Portfolio & Neobank',
        subtitle: 'Zero-Friction Decentralized Asset Management Mobile App',
        description: 'Mobile banking UI/UX designed for modern retail investors. Features tactile haptic micro-interactions, dark mode biometric security screens, and instant asset swaps.',
        techStack: ['Figma', 'Protopie', 'Rive Animation', 'React Native'],
        link: 'https://zenith-app.demo.io',
        github: 'https://github.com/elena-designs/zenith-ux',
        featured: true,
        metrics: '⭐ 4.9 App Store Rating • 1.8M Onboarded Users'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'NN/g UX Master Certified (Interaction Design & Usability)', issuer: 'Nielsen Norman Group', date: '2022' },
      { id: 'cert-2', name: 'Certified Professional in Accessibility Core Competencies (CPACC)', issuer: 'IAAP', date: '2023' }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'French', proficiency: 'Fluent' }
    ]
  },

  aiScientist: {
    id: 'aiScientist',
    name: 'Dr. Marcus Vance',
    title: 'Lead AI & Machine Learning Scientist',
    category: 'AI / Data',
    personalInfo: {
      fullName: 'Dr. Marcus Vance',
      title: 'Lead AI / Machine Learning Scientist',
      email: 'marcus.vance@neurotech.ai',
      phone: '+1 (555) 789-0123',
      location: 'Boston, MA (Hybrid)',
      website: 'https://marcusvance.ai',
      github: 'https://github.com/marcusvance-ai',
      linkedin: 'https://linkedin.com/in/marcus-vance-phd',
      twitter: 'https://x.com/marcus_vance_ai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      summary: 'Ph.D. AI Scientist and ML Engineer with 8+ years researching LLM alignment, multi-modal reasoning, and high-throughput inference optimization. Author of 11 peer-reviewed papers at NeurIPS, ICML, and CVPR. Successfully productionized generative AI pipelines serving 25M daily inferences while trimming GPU compute overhead by 41% using quantization (AWQ/GPTQ) and vLLM.'
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Principal Research Scientist',
        company: 'NeuroGenesis AI',
        location: 'Boston, MA',
        startDate: '2021-08',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected domain-specific 70B parameter Mixture-of-Experts (MoE) LLM for biomedical literature synthesis, outperforming baseline GPT-4 by 19% on PubMedQA benchmark.',
          'Engineered distributed model training infrastructure on 512 H100 GPUs with Megatron-LM and DeepSpeed ZeRO-3, achieving 94% linear scaling efficiency.',
          'Led a research team of 9 ML scientists and engineers developing self-correcting RAG frameworks with dynamic graph retrieval.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Senior Machine Learning Engineer',
        company: 'DeepHorizon Technologies',
        location: 'Cambridge, MA',
        startDate: '2018-09',
        endDate: '2021-07',
        current: false,
        highlights: [
          'Developed computer vision multi-object tracking model deployed on edge devices with TensorRT, cutting inference latency from 80ms to 11ms.',
          'Built automated feature store and model drift monitoring pipeline with Feast and Weights & Biases.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Ph.D. in Computer Science (Artificial Intelligence)',
        institution: 'Massachusetts Institute of Technology (MIT)',
        location: 'Cambridge, MA',
        startDate: '2014',
        endDate: '2018',
        gpa: '4.0 / 4.0',
        highlights: [
          'Dissertation: Deep Generative Models for Multi-Modal Temporal Reasoning',
          'Advisor: Prof. Regina Barzilay • NSF Graduate Research Fellow'
        ]
      }
    ],
    skills: [
      { category: 'AI & Deep Learning', items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'DeepSpeed', 'Megatron-LM', 'vLLM', 'FlashAttention', 'LoRA / QLoRA'] },
      { category: 'LLMs & Agents', items: ['LangGraph', 'LlamaIndex', 'RAG Architectures', 'Vector Databases (Milvus, Qdrant)', 'RLHF / DPO', 'Prompt Engineering'] },
      { category: 'MLOps & Infrastructure', items: ['CUDA', 'TensorRT', 'Triton Inference Server', 'Kubernetes / Kubeflow', 'Ray', 'MLflow', 'Docker', 'GCP / AWS'] },
      { category: 'Languages & Math', items: ['Python', 'C++', 'Rust', 'SQL', 'Linear Algebra', 'Bayesian Inference', 'Stochastic Calculus'] }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'SynapseMoE - Open Source Sparse Mixture-of-Experts',
        subtitle: 'Ultra-fast MoE Routing Engine for PyTorch',
        description: 'An open-source distributed router for MoE architectures that accelerates token dispatch across GPU clusters by 2.4x using custom CUDA kernels.',
        techStack: ['PyTorch', 'CUDA', 'C++', 'Triton', 'Python'],
        link: 'https://synapse-moe.demo.ai',
        github: 'https://github.com/marcusvance-ai/synapse-moe',
        featured: true,
        metrics: '🌟 5.8k Stars • NeurIPS 2023 Spotlight Oral'
      },
      {
        id: 'proj-2',
        title: 'MedRAG - Grounded Clinical QA Engine',
        subtitle: 'Hierarchical Knowledge Graph RAG with Citation Validation',
        description: 'Zero-hallucination medical diagnostic assistant leveraging PubMed knowledge graphs and hybrid semantic-lexical reranking algorithms.',
        techStack: ['Python', 'FastAPI', 'Neo4j', 'Qdrant', 'React'],
        link: 'https://medrag.demo.ai',
        github: 'https://github.com/marcusvance-ai/medrag',
        featured: true,
        metrics: '🩺 98.2% factual verification rate on clinical benchmarks'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'NVIDIA Certified Instructor - Deep Learning & LLM Acceleration', issuer: 'NVIDIA Deep Learning Institute', date: '2023' }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Japanese', proficiency: 'Conversational' }
    ]
  }
};
