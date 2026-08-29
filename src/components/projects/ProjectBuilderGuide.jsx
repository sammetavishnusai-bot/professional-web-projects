import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, Circle, ArrowLeft, 
  Sparkles, Layers, ShieldCheck, Clock, FolderTree, 
  Terminal, Globe, Download, Plus, Check, FileText, 
  ExternalLink, Code2, Rocket, AlertCircle, ChevronDown, 
  Copy, RefreshCw, Cpu, TestTube, BookMarked
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { PROJECT_BLUEPRINTS } from '../../data/projectGeneratorData';

export function ProjectBuilderGuide() {
  const { 
    selectedGuideProjectId, 
    setSelectedGuideProjectId, 
    projectGuideProgress, 
    updateProjectGuideTask, 
    updateProjectGuideStatus, 
    addProject, 
    addPortfolioProject, 
    setActiveView, 
    showToast 
  } = useResume();

  const [isSwitchDropdownOpen, setIsSwitchDropdownOpen] = useState(false);

  const activeProject = PROJECT_BLUEPRINTS.find(p => p.id === selectedGuideProjectId) || PROJECT_BLUEPRINTS[0];

  const currentProgress = projectGuideProgress[activeProject.id] || { completedTasks: {}, status: 'In Progress' };
  const completedTasksMap = currentProgress.completedTasks || {};
  const currentStatus = currentProgress.status || 'In Progress';

  // 7-Stage Detailed Roadmap for the active project
  const stages = [
    {
      id: 'step-1',
      number: 1,
      title: 'Project Setup & Development Environment',
      explanation: 'Initialize your code repository, configure build tooling with modern bundlers, and enforce code quality linting.',
      tasks: [
        { id: `${activeProject.id}_s1_t1`, label: 'Initialize Git repository (`git init`) and create `.gitignore` file' },
        { id: `${activeProject.id}_s1_t2`, label: 'Scaffold project with Vite / Next.js / FastAPI template and package manager' },
        { id: `${activeProject.id}_s1_t3`, label: 'Configure Tailwind CSS / Styling tokens and base typography styles' },
        { id: `${activeProject.id}_s1_t4`, label: 'Setup ESLint, Prettier, and strict TypeScript / Python compiler flags' }
      ]
    },
    {
      id: 'step-2',
      number: 2,
      title: 'Folder Structure & Architecture Layout',
      explanation: 'Organize files into clean, decoupled domain directories separating presentation components from business logic and data clients.',
      tasks: [
        { id: `${activeProject.id}_s2_t1`, label: 'Create domain directories (`components/`, `hooks/`, `types/`, `services/`, `utils/`)' },
        { id: `${activeProject.id}_s2_t2`, label: 'Establish global layout containers (Header, Sidebar, Navigation wrappers)' },
        { id: `${activeProject.id}_s2_t3`, label: 'Create shared TypeScript interfaces or Pydantic data contract models' }
      ]
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Core Business Logic & State Engine',
      explanation: 'Implement the fundamental data models, state stores, caching mechanisms, or API endpoints before building complex UI.',
      tasks: [
        { id: `${activeProject.id}_s3_t1`, label: 'Implement state store (Zustand / Redux) or backend database entities' },
        { id: `${activeProject.id}_s3_t2`, label: 'Create API fetch wrappers with error handling and request timeouts' },
        { id: `${activeProject.id}_s3_t3`, label: 'Build mock data generator or seed data fixtures for local testing' }
      ]
    },
    {
      id: 'step-4',
      number: 4,
      title: 'Interactive UI & Feature Development',
      explanation: 'Assemble user-facing interfaces, responsive tables, interactive charts, forms, and micro-interactions.',
      tasks: [
        { id: `${activeProject.id}_s4_t1`, label: 'Build primary dashboard/feed widgets and interactive data tables' },
        { id: `${activeProject.id}_s4_t2`, label: 'Implement search keyword filtering, category pills, and multi-column sorting' },
        { id: `${activeProject.id}_s4_t3`, label: 'Add dark/light theme switching and responsive mobile slide-out drawer' }
      ]
    },
    {
      id: 'step-5',
      number: 5,
      title: 'Testing & Quality Assurance',
      explanation: 'Verify edge cases, validate data bounds, test responsive viewports, and audit accessibility contrast.',
      tasks: [
        { id: `${activeProject.id}_s5_t1`, label: 'Write unit tests for core calculation utilities and state mutations' },
        { id: `${activeProject.id}_s5_t2`, label: 'Verify accessibility standards (WCAG 2.1 AA keyboard focus & color contrast)' },
        { id: `${activeProject.id}_s5_t3`, label: 'Test responsiveness on mobile (375px), tablet (768px), and 1080p desktop' }
      ]
    },
    {
      id: 'step-6',
      number: 6,
      title: 'Documentation & GitHub README',
      explanation: 'Craft a compelling, recruiter-ready README with architectural diagrams, live demo links, and installation commands.',
      tasks: [
        { id: `${activeProject.id}_s6_t1`, label: 'Draft comprehensive README with architecture diagram and live demo URL' },
        { id: `${activeProject.id}_s6_t2`, label: 'Document environment variables and local quickstart instructions (`npm run dev`)' },
        { id: `${activeProject.id}_s6_t3`, label: 'Include high-resolution feature screenshots and key technical highlights' }
      ]
    },
    {
      id: 'step-7',
      number: 7,
      title: 'Production Deployment & Continuous Integration',
      explanation: 'Deploy the project to cloud platforms (Vercel, Netlify, Render) and configure automated build checks.',
      tasks: [
        { id: `${activeProject.id}_s7_t1`, label: 'Configure automated production deployment on Vercel / Netlify / Render' },
        { id: `${activeProject.id}_s7_t2`, label: 'Setup GitHub Actions CI workflow to run linter and tests on every pull request' },
        { id: `${activeProject.id}_s7_t3`, label: 'Verify production SSL certificate and add live link to Resume & Portfolio' }
      ]
    }
  ];

  // Compute total tasks and completed percentage
  const allTasks = stages.flatMap(s => s.tasks);
  const completedTaskCount = allTasks.filter(t => completedTasksMap[t.id]).length;
  const totalTaskCount = allTasks.length;
  const progressPercent = totalTaskCount > 0 ? Math.round((completedTaskCount / totalTaskCount) * 100) : 0;

  // Tech Stack Explanations Dictionary
  const techExplanations = {
    'React 19': 'Enables modular UI component architecture, hooks for isolated state management, and optimized virtual DOM rendering.',
    'React': 'Industry standard component library for building rich single-page web applications with declarative state.',
    'TypeScript': 'Adds static type safety, eliminates common runtime exceptions, and provides autocomplete for cleaner codebases.',
    'Tailwind CSS': 'Utility-first styling system that avoids bulky CSS bundles and provides consistent design tokens and dark mode.',
    'Next.js 14': 'Provides server-side rendering (SSR), SEO optimization, and file-based routing for commercial web apps.',
    'Node.js': 'Event-driven, non-blocking asynchronous JavaScript runtime optimal for scalable REST APIs.',
    'Express': 'Lightweight HTTP web server framework for routing, middleware request validation, and JSON responses.',
    'PostgreSQL': 'Robust ACID-compliant relational database for structured schemas, foreign keys, and complex indexing.',
    'Redis': 'Sub-millisecond in-memory data store for caching query results, session management, and rate-limiting.',
    'FastAPI': 'Modern high-performance Python framework with native async support and automated OpenAPI documentation.',
    'Pydantic': 'Enforces data validation and parsing using Python type annotations with clear error feedback.',
    'Docker': 'Containerizes applications to guarantee identical behavior across developer laptops and production servers.',
    'Chart.js': 'Flexible HTML5 canvas charting library for rendering interactive time-series telemetry widgets.',
    'Zustand': 'Minimalist state management with zero boilerplate, full TypeScript support, and local storage persistence.'
  };

  const handleAddToResume = () => {
    const newResumeProj = {
      id: `proj-gen-${Date.now()}`,
      title: activeProject.title,
      subtitle: `${activeProject.difficulty} Project • ${activeProject.techStack.slice(0, 3).join(', ')}`,
      description: activeProject.shortDescription,
      techStack: activeProject.techStack,
      link: 'https://github.com/username/project',
      github: 'https://github.com/username/project',
      featured: true,
      metrics: `⚡ Key Focus: ${activeProject.skillsPracticed.slice(0, 2).join(' & ')}`
    };
    addProject(newResumeProj);
  };

  const handleAddToPortfolio = () => {
    const newPortProj = {
      id: `port-proj-${Date.now()}`,
      title: activeProject.title,
      description: activeProject.shortDescription,
      techStack: activeProject.techStack,
      link: 'https://demo.app',
      github: 'https://github.com/username/project',
      featured: true
    };
    addPortfolioProject(newPortProj);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* 1. TOP NAVIGATION & PROJECT SELECTOR BAR */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        
        <button
          onClick={() => setActiveView('projects')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Generator</span>
        </button>

        {/* Switch Project Blueprint Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSwitchDropdownOpen(!isSwitchDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-500 transition-all shadow-xs"
          >
            <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{activeProject.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isSwitchDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-96 overflow-y-auto custom-scrollbar"
              onMouseLeave={() => setIsSwitchDropdownOpen(false)}
            >
              <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Blueprint Guide
              </div>
              {PROJECT_BLUEPRINTS.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedGuideProjectId(proj.id);
                    setIsSwitchDropdownOpen(false);
                    showToast(`Switched guide to: ${proj.title}`);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                    proj.id === activeProject.id 
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{proj.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{proj.roleName} • {proj.difficulty}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 2. PROJECT HERO OVERVIEW CARD */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {activeProject.roleName}
                </span>

                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeProject.difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                  activeProject.difficulty === 'Intermediate' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' :
                  'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                }`}>
                  {activeProject.difficulty}
                </span>

                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeProject.estimatedTime}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                {activeProject.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {activeProject.shortDescription}
              </p>
            </div>

            {/* Status Selector & Overall Progress Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shrink-0 w-full md:w-64">
              
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Project Status
                </span>
                <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {['Recommended', 'In Progress', 'Completed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateProjectGuideStatus(activeProject.id, st)}
                      className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
                        currentStatus === st
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {st.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Completion</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                    {progressPercent}% ({completedTaskCount}/{totalTaskCount})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Problem Statement & Objective Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Problem Statement
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeProject.problemSolved}
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Engineering Objective
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeProject.plan.objective}
              </p>
            </div>
          </div>

          {/* Quick 1-Click Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToResume}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 font-display"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Add to Resume Projects</span>
            </button>

            <button
              type="button"
              onClick={handleAddToPortfolio}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 font-display"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Add to Portfolio Showcase</span>
            </button>
          </div>

        </div>

        {/* 3. TECH STACK RATIONALE SECTION */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
          
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Tech Stack Architecture & Why It's Recommended
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Understand the architectural tradeoffs and industry reasons for choosing these tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {activeProject.techStack.map((tech, i) => {
              const explanation = techExplanations[tech] || 'Industry-standard technology providing performance, developer tooling, and scalability.';
              return (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-display block">
                    {tech}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {explanation}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4. STEP-BY-STEP DEVELOPMENT ROADMAP (7 STAGES) */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          
          <div className="flex items-center gap-2 pb-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Step-by-Step Implementation Roadmap
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Follow this sequential development checklist to complete the project methodically.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((stage) => {
              const stageTasks = stage.tasks;
              const isStageFullyDone = stageTasks.every(t => completedTasksMap[t.id]);

              return (
                <div 
                  key={stage.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                    isStageFullyDone
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isStageFullyDone 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : 'bg-indigo-600 text-white'
                      }`}>
                        {isStageFullyDone ? <Check className="w-4 h-4" /> : stage.number}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                          {stage.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {stage.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-2 pl-11">
                    {stage.tasks.map((task) => {
                      const isChecked = Boolean(completedTasksMap[task.id]);
                      return (
                        <label
                          key={task.id}
                          className="flex items-start gap-2.5 cursor-pointer text-xs group"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => updateProjectGuideTask(activeProject.id, task.id, e.target.checked)}
                            className="mt-0.5 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                          />
                          <span className={`leading-relaxed transition-colors ${
                            isChecked 
                              ? 'line-through text-slate-400 dark:text-slate-500' 
                              : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}>
                            {task.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 5. TESTING CHECKLIST & README CHECKLIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Testing Checklist Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Comprehensive Testing Checklist
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {activeProject.plan.testingChecklist.map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* README Checklist Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                GitHub README Structure Checklist
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {activeProject.plan.readmeChecklist.map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
