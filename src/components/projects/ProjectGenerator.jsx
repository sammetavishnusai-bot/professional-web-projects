import React, { useState } from 'react';
import { 
  Rocket, Filter, Search, Sparkles, BookOpen, 
  Layers, FolderGit2, CheckCircle2, ArrowRight, 
  Clock, ShieldCheck, Plus, Check, FileText, 
  ExternalLink, Code2, Tag, Compass 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { PROJECT_BLUEPRINTS } from '../../data/projectGeneratorData';
import { ProjectPlanModal } from './ProjectPlanModal';

export function ProjectGenerator() {
  const { resumeData, addProject, addPortfolioProject, showToast, setActiveView } = useResume();

  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // User's active skills to compute "Recommended for your Skill Gap"
  const userSkills = (resumeData.skills || []).flatMap(g => g.items || []).map(s => s.toLowerCase());

  // Filter projects
  const filteredProjects = PROJECT_BLUEPRINTS.filter(proj => {
    const matchesRole = selectedRole === 'all' || proj.roleId === selectedRole;
    const matchesDiff = selectedDifficulty === 'all' || proj.difficulty === selectedDifficulty;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      proj.title.toLowerCase().includes(query) ||
      proj.shortDescription.toLowerCase().includes(query) ||
      proj.techStack.some(t => t.toLowerCase().includes(query)) ||
      proj.skillsPracticed.some(s => s.toLowerCase().includes(query));

    return matchesRole && matchesDiff && matchesSearch;
  });

  const handleQuickAddToResume = (proj, e) => {
    e.stopPropagation();
    const newResumeProj = {
      id: `proj-gen-${Date.now()}`,
      title: proj.title,
      subtitle: `${proj.difficulty} Project • ${proj.techStack.slice(0, 3).join(', ')}`,
      description: proj.shortDescription,
      techStack: proj.techStack,
      link: 'https://github.com/username/project',
      github: 'https://github.com/username/project',
      featured: true,
      metrics: `⚡ Key Focus: ${proj.skillsPracticed.slice(0, 2).join(' & ')}`
    };
    addProject(newResumeProj);
  };

  const handleQuickAddToPortfolio = (proj, e) => {
    e.stopPropagation();
    const newPortProj = {
      id: `port-proj-${Date.now()}`,
      title: proj.title,
      description: proj.shortDescription,
      techStack: proj.techStack,
      link: 'https://demo.app',
      github: 'https://github.com/username/project',
      featured: true
    };
    addPortfolioProject(newPortProj);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-6xl mx-auto space-y-3 text-center sm:text-left pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
          <Rocket className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Practical Project Blueprints for Students & Freshers</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
          Career Project Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Choose proven, industry-tested project blueprints designed to demonstrate production engineering capabilities, master targeted skill gaps, and stand out in hiring pipelines.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 2. FILTER & SEARCH CONTROLS */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by keyword (e.g. Next.js, Redis, SQL, Docker)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Difficulty Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">Difficulty:</span>
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

          </div>

          {/* Role Filter Pills */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">Role:</span>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'fullstack', label: 'Full Stack' },
              { id: 'python', label: 'Python' },
              { id: 'data-analyst', label: 'Data Analyst' },
              { id: 'java', label: 'Java' },
              { id: 'ui-ux', label: 'UI/UX' }
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedRole === role.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

        </div>

        {/* 3. PROJECT BLUEPRINTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => {
            return (
              <div
                key={proj.id}
                onClick={() => setActiveModalProject(proj)}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  
                  {/* Top Badge & Role */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {proj.roleName}
                    </span>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      proj.difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                      proj.difficulty === 'Intermediate' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' :
                      'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {proj.difficulty}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover:text-indigo-500 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {proj.shortDescription}
                    </p>
                  </div>

                  {/* Problem It Solves Box */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                      Problem It Solves
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {proj.problemSolved}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.map((tech, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Resume Value vs Portfolio Value */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60">
                      <strong className="text-indigo-600 dark:text-indigo-400 block font-semibold">Resume Value:</strong>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] leading-tight block mt-0.5">
                        {proj.resumeValue}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60">
                      <strong className="text-purple-600 dark:text-purple-400 block font-semibold">Portfolio Value:</strong>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] leading-tight block mt-0.5">
                        {proj.portfolioValue}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(proj)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-display"
                  >
                    <span>View Full Project Plan</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddToResume(proj, e)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex items-center gap-1"
                      title="Add to Resume Builder Projects"
                    >
                      <FileText className="w-3 h-3 text-indigo-500" />
                      <span>Resume</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAddToPortfolio(proj, e)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs font-display"
                      title="Add to Portfolio Builder Showcase"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Portfolio</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 space-y-2">
            <p className="text-sm font-semibold">No project blueprints found matching your filter criteria.</p>
            <p className="text-xs">Try searching for a different keyword or selecting "All Roles".</p>
          </div>
        )}

        {/* 4. RESPONSIBLE CAREER GUIDANCE NOTICE */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>
            <strong>Project Blueprint Integrity:</strong> All recommended project blueprints are curated architectural specifications designed for learning and portfolio development. When added to your Resume or Portfolio, customize the details with your actual implementation results.
          </span>
        </div>

      </div>

      {/* Project Plan Detailed Modal */}
      <ProjectPlanModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />

    </div>
  );
}
