import React from 'react';
import { Trash2, AlertTriangle, X, RefreshCcw, FileText, Check } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function ClearResumeModal() {
  const { isClearModalOpen, setIsClearModalOpen, clearResumeData } = useResume();

  if (!isClearModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Clear Stored Resume Data?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose how you would like to reset your workspace.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsClearModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Options */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Clearing your data will remove saved edits from your browser's local storage. This action cannot be undone.
          </p>

          <div className="space-y-2 pt-2">
            {/* Option 1: Reset to Sample Demo */}
            <button
              onClick={() => clearResumeData(false)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left flex items-start gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                <RefreshCcw className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Reset to Default Sample Profile
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Restores the full-featured demo template data (Alex Chen - Senior Full-Stack Engineer).
                </p>
              </div>
            </button>

            {/* Option 2: Clean Blank Canvas */}
            <button
              onClick={() => clearResumeData(true)}
              className="w-full p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/60 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-left flex items-start gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">
                  Start Blank Slate
                </h4>
                <p className="text-[11px] text-rose-600/80 dark:text-rose-300/70 mt-0.5">
                  Wipes all sections completely for typing a new resume from scratch.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={() => setIsClearModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
