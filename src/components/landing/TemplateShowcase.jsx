import React, { useState } from 'react';
import { Palette, ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { TEMPLATES } from '../../data/templateData';

export function TemplateShowcase() {
  const { activeTemplate, setActiveTemplate, setActiveView, showToast } = useResume();
  const [selectedTpl, setSelectedTpl] = useState(activeTemplate || 'modern');

  const handleUseTemplate = (tplId) => {
    setActiveTemplate(tplId);
    setSelectedTpl(tplId);
    setActiveView('builder');
    showToast(`Loaded ${tplId} template in Studio!`);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
          <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Curated Resume Architectures</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-display">
          5 Distinct ATS-Optimized Templates
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Switch between Modern, Minimal, Professional, Creative, and Executive layouts anytime with zero data loss.
        </p>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TEMPLATES.map((tpl) => {
          const isSelected = selectedTpl === tpl.id || (tpl.id === 'modern' && selectedTpl === 'modern-tech');
          return (
            <div
              key={tpl.id}
              onClick={() => setSelectedTpl(tpl.id)}
              className={`p-5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg ${
                isSelected 
                  ? 'border-indigo-500 shadow-glow-sm bg-white dark:bg-slate-900 ring-2 ring-indigo-500/20' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Mini Preview Box */}
                <div 
                  className="h-28 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="h-2 w-12 rounded" style={{ backgroundColor: tpl.accentDefault }} />
                  <div className="space-y-1">
                    <div className="h-1.5 w-24 bg-slate-300 dark:bg-slate-800 rounded" />
                    <div className="h-1.5 w-16 bg-slate-300 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800/60 rounded" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm font-display">{tpl.name}</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-500/30">
                      ATS 99%
                    </span>
                  </div>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">{tpl.tagline}</span>
                </div>

                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                  {tpl.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUseTemplate(tpl.id);
                }}
                className="w-full mt-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-600/20 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-300 hover:text-white border border-indigo-200 dark:border-indigo-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span>Select & Edit</span>
                <ArrowRight className="w-3 h-3" />
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
}
