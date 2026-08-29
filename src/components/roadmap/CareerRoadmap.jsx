import React, { useState, useEffect } from 'react';
import { 
  Compass, Target, CheckCircle2, AlertCircle, Sparkles, 
  ArrowRight, BookOpen, Layers, Check, Clock, Circle, 
  Code2, ExternalLink, Plus, FolderGit2, ShieldCheck, 
  ChevronRight, Award, Trophy, Zap, Search, Layout, Server, Terminal, BarChart3, Coffee, Figma
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { CAREER_ROADMAPS } from '../../data/careerRoadmapsData';

const ROADMAP_STORAGE_KEY = 'resusphere_roadmap_progress_v1';

export function CareerRoadmap() {
  const { resumeData, addPortfolioProject, setActiveView, showToast } = useResume();

  const [selectedRoleId, setSelectedRoleId] = useState('frontend');
  const [roleSearch, setRoleSearch] = useState('');
  
  // Progress tracker state: { [stepId]: 'not-started' | 'in-progress' | 'completed' }
  const [progressState, setProgressState] = useState(() => {
    try {
      const saved = localStorage.getItem(ROADMAP_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('[Roadmap] Failed to load progress state:', e);
    }
    return {};
  });

  // Save progress state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(progressState));
    } catch (e) {
      console.warn('[Roadmap] Failed to save progress state:', e);
    }
  }, [progressState]);

  // Extract all skills from user's current resume
  const userResumeSkills = (resumeData.skills || []).flatMap(group => group.items || []);

  const activeRoadmap = CAREER_ROADMAPS.find(r => r.id === selectedRoleId) || CAREER_ROADMAPS[0];

  // Intelligent Skill Matcher Helper
  const isSkillMatched = (requiredSkill) => {
    const reqClean = requiredSkill.toLowerCase().replace(/[^a-z0-9]/g, '');
    return userResumeSkills.some(userSkill => {
      const userClean = userSkill.toLowerCase().replace(/[^a-z0-9]/g, '');
      return userClean.includes(reqClean) || reqClean.includes(userClean) ||
        (reqClean.includes('react') && userClean.includes('react')) ||
        (reqClean.includes('node') && userClean.includes('node')) ||
        (reqClean.includes('python') && userClean.includes('python')) ||
        (reqClean.includes('sql') && (userClean.includes('sql') || userClean.includes('postgres'))) ||
        (reqClean.includes('typescript') && userClean.includes('typescript')) ||
        (reqClean.includes('figma') && userClean.includes('figma'));
    });
  };

  const skillsIHave = activeRoadmap.coreSkills.filter(s => isSkillMatched(s));
  const skillsToImprove = activeRoadmap.coreSkills.filter(s => !isSkillMatched(s));

  const matchPercentage = Math.round((skillsIHave.length / activeRoadmap.coreSkills.length) * 100);

  // Compute Roadmap Milestones completion
  const totalMilestones = activeRoadmap.roadmapSteps.length;
  const completedMilestones = activeRoadmap.roadmapSteps.filter(
    step => progressState[step.id] === 'completed'
  ).length;
  const inProgressMilestones = activeRoadmap.roadmapSteps.filter(
    step => progressState[step.id] === 'in-progress'
  ).length;

  const roadmapProgressPercentage = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

  const updateStepStatus = (stepId, status) => {
    setProgressState(prev => ({
      ...prev,
      [stepId]: status
    }));
    const statusText = status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started';
    showToast(`Marked milestone as ${statusText}!`);
  };

  // 1-Click Add Recommended Project to Portfolio Builder
  const handleAddProjectToPortfolio = (proj) => {
    const newPortfolioProj = {
      id: `proj-rec-${Date.now()}`,
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack,
      link: 'https://demo.app',
      github: 'https://github.com/username/project',
      featured: true
    };
    
    // We add this to portfolio
    addPortfolioProject(newPortfolioProj);
  };

  const filteredRoadmaps = CAREER_ROADMAPS.filter(r => 
    r.title.toLowerCase().includes(roleSearch.toLowerCase()) ||
    r.description.toLowerCase().includes(roleSearch.toLowerCase()) ||
    r.coreSkills.some(s => s.toLowerCase().includes(roleSearch.toLowerCase()))
  );

  const getRoleIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Figma': return <Figma className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-6xl mx-auto space-y-3 text-center sm:text-left pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
          <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
          <span>B.Tech & Fresher Career-Readiness Hub</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
          Career Roadmap & Skill Gap Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Benchmark your resume skills against real industry roles, discover missing technical pillars, track learning progress, and add recommended projects directly to your portfolio.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 2. TARGET ROLE SELECTOR */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
              Select Your Target Career Path
            </span>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles or skills..."
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredRoadmaps.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 group ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {getRoleIcon(role.icon)}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold font-display ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-900 dark:text-white'}`}>
                      {role.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {role.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SKILL GAP RADAR & READINESS OVERVIEW */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Skill Gap Analysis: {activeRoadmap.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Comparing {userResumeSkills.length} skills from your active resume against {activeRoadmap.coreSkills.length} core industry requirements.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-right">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Skill Match</span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                  {skillsIHave.length} / {activeRoadmap.coreSkills.length} Met
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-indigo-600/30">
                {matchPercentage}%
              </div>
            </div>
          </div>

          {/* Dual Panel: Skills I Have vs Skills I Should Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Panel 1: Skills I Have */}
            <div className="p-5 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 font-display">
                    Skills I Have ({skillsIHave.length})
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  Verified in Resume
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillsIHave.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-medium shadow-xs"
                  >
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>{skill}</span>
                  </span>
                ))}
                {skillsIHave.length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    No matching skills detected in your current resume for this role.
                  </span>
                )}
              </div>
            </div>

            {/* Panel 2: Skills I Should Improve */}
            <div className="p-5 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 font-display">
                    Skills I Should Improve ({skillsToImprove.length})
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  Target Gaps
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillsToImprove.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-200 rounded-lg text-xs font-medium shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{skill}</span>
                  </span>
                ))}
                {skillsToImprove.length === 0 && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    🎉 Excellent! You have covered all core skills for this role!
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* 4. STEP-BY-STEP LEARNING ROADMAP & PROGRESS TRACKER */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Step-by-Step Learning Milestones
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Structured learning sequence prioritized for high hiring impact.
              </p>
            </div>

            {/* Overall Progress Tracker Bar */}
            <div className="w-full sm:w-64 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Roadmap Progress</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                  {roadmapProgressPercentage}% ({completedMilestones}/{totalMilestones})
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${roadmapProgressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Milestones List */}
          <div className="space-y-4">
            {activeRoadmap.roadmapSteps.map((step, idx) => {
              const currentStatus = progressState[step.id] || 'not-started';
              const isDone = currentStatus === 'completed';
              const isWorking = currentStatus === 'in-progress';

              return (
                <div 
                  key={step.id} 
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isDone 
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40' 
                      : isWorking 
                        ? 'bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-200 dark:border-indigo-900/40'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isDone 
                          ? 'bg-emerald-500 text-white' 
                          : isWorking 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                          {step.skill}
                        </h3>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          {step.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        step.priority === 'High' 
                          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                          : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                      }`}>
                        {step.priority} Priority
                      </span>

                      {/* Status Buttons */}
                      <div className="flex items-center bg-white dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                        <button
                          type="button"
                          onClick={() => updateStepStatus(step.id, 'not-started')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            currentStatus === 'not-started' ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStepStatus(step.id, 'in-progress')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            currentStatus === 'in-progress' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStepStatus(step.id, 'completed')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            currentStatus === 'completed' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Why it matters */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold">Why it matters: </strong>
                    {step.whyItMatters}
                  </p>

                  {/* Suggested practice & project hook */}
                  <div className="ml-9 p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Suggested Hands-On Practice:</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {step.suggestedPractice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 5. RECOMMENDED PROJECTS CONNECTED TO MISSING SKILLS */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          
          <div className="flex items-center gap-2 pb-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Recommended Portfolio Project Blueprints
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Prove your skills to employers by building these tailored, high-signal applications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRoadmap.recommendedProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-400/50 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                      {proj.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 1-Click Add to Portfolio Action Button */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Award className="w-3 h-3 text-indigo-500" />
                      <span>{proj.skillsPracticed.join(', ')}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddProjectToPortfolio(proj)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 font-display"
                      title="Add this project to your Portfolio Builder showcase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 6. TRANSPARENCY DISCLAIMER */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>
            <strong>Educational Career-Readiness Notice:</strong> The Career Roadmap and Skill Gap system is designed as an explainable competency guide for B.Tech students and freshers. True mastery is achieved through consistent hands-on project development and problem-solving practice.
          </span>
        </div>

      </div>

    </div>
  );
}
