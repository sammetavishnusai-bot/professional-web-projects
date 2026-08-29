import React, { useState } from 'react';
import { 
  X, FileText, CheckCircle2, Layers, FolderTree, 
  Sparkles, Plus, ExternalLink, ShieldCheck, Clock, 
  Terminal, Globe, ArrowRight, Check, Rocket, BookOpen
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function ProjectPlanModal({ project, isOpen, onClose }) {
  const { resumeData, setResumeData, portfolioData, setPortfolioData, openProjectInGuide, showToast } = useResume();
  const [addedToResume, setAddedToResume] = useState(false);
  const [addedToPortfolio, setAddedToPortfolio] = useState(false);

  if (!isOpen || !project) return null;

  const { title, shortDescription, difficulty, techStack, skillsPracticed, estimatedTime, resumeValue, portfolioValue, plan } = project;

  // Add to Resume Projects handler
  const handleAddToResume = () => {
    const newResumeProject = {
      id: `proj-gen-${Date.now()}`,
      title: title,
      subtitle: `${difficulty} Project • ${techStack.slice(0, 3).join(', ')}`,
      description: shortDescription,
      techStack: techStack,
      link: 'https://github.com/username/project',
      github: 'https://github.com/username/project',
      featured: true,
      metrics: `⚡ Key Focus: ${skillsPracticed.slice(0, 2).join(' & ')}`
    };

    setResumeData(prev => ({
      ...prev,
      projects: [newResumeProject, ...(prev.projects || [])]
    }));

    setAddedToResume(true);
    showToast(`Added "${title}" to your Resume Projects!`, 'success');
  };

  // Add to Portfolio Builder handler
  const handleAddToPortfolio = () => {
    const newPortfolioProject = {
      id: `port-proj-${Date.now()}`,
      title: title,
      description: shortDescription,
      techStack: techStack,
      link: 'https://demo.app',
      github: 'https://github.com/username/project',
      featured: true
    };

    setPortfolioData(prev => ({
      ...prev,
      projects: [newPortfolioProject, ...(prev.projects || [])]
    }));

    setAddedToPortfolio(true);
    showToast(`Added "${title}" to your Portfolio Builder!`, 'success');
  };

  const handleOpenInteractiveGuide = () => {
    onClose();
    openProjectInGuide(project.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                difficulty === 'Intermediate' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' :
                'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
              }`}>
                {difficulty} Blueprint
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{estimatedTime}</span>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
              {title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {shortDescription}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs">
          
          {/* Action Callout: Open Step-by-Step Guide */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-cyan-950/30 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 font-display flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Interactive Step-by-Step Guide Available</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Track progress through all 7 development stages with checkboxes and task explanations.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenInteractiveGuide}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0 font-display"
            >
              <span>Open Project Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tech Stack & Skills Practiced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2 font-display">
                Recommended Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech, i) => (
                  <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2 font-display">
                Key Skills Strengthened
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsPracticed.map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 1. Project Objective & Core Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Project Objective & Scope</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {plan.objective}
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Features to Build (Checklist)
              </span>
              <div className="space-y-2">
                {plan.featuresToBuild.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Development Phases */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Recommended Step-by-Step Development Phases</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.developmentPhases.map((phase, i) => (
                <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-display block">
                    {phase.phase}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Suggested Folder Structure */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-indigo-500" />
              <span>Suggested File & Directory Structure</span>
            </h3>
            <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-[11px] overflow-x-auto border border-slate-800 shadow-inner">
              <pre>{plan.suggestedFolderStructure}</pre>
            </div>
          </div>

          {/* 4. Testing & README Checklists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white font-display block">
                Testing Checklist
              </span>
              <div className="space-y-1.5">
                {plan.testingChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white font-display block">
                GitHub README Checklist
              </span>
              <div className="space-y-1.5">
                {plan.readmeChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Recommended Blueprint • Ready for implementation</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToResume}
              disabled={addedToResume}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-display ${
                addedToResume
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {addedToResume ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{addedToResume ? 'Added to Resume' : 'Add to Resume'}</span>
            </button>

            <button
              type="button"
              onClick={handleAddToPortfolio}
              disabled={addedToPortfolio}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-display shadow-sm ${
                addedToPortfolio
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {addedToPortfolio ? <Check className="w-3.5 h-3.5" /> : <Rocket className="w-3.5 h-3.5" />}
              <span>{addedToPortfolio ? 'Added to Portfolio' : 'Add to Portfolio'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
