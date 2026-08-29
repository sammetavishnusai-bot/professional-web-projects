import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export function ProjectDetailModal({ project, onClose, accentColor = '#6366f1' }) {
  if (!project) return null;

  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-900 dark:text-white max-h-[85vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                Featured Case Study
              </span>
              {project.metrics && (
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                  {project.metrics}
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold mt-2 font-display text-slate-900 dark:text-white">{project.title}</h2>
            {project.subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{project.subtitle}</p>}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overview & Problem Solved</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Architecture & Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Highlights / Metrics */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/80 space-y-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            Key Engineering Highlights & Impact
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Designed for high-throughput concurrency with zero runtime dependencies on outdated libraries.</li>
            <li>Fully responsive UI with accessible WCAG AAA keyboard navigation and dark mode support.</li>
            <li>Automated unit and integration test suite with &gt;90% branch coverage and continuous deployment.</li>
          </ul>
        </div>

        {/* Links Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live App</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
