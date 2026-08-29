import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Download, Code2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function HeroSection() {
  const { setActiveView } = useResume();

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background glow halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-cyan-500/15 dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-cyan-500/20 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-indigo-500/30 shadow-glow-sm text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>All-in-One Career Readiness Platform for B.Tech & Freshers</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white font-display max-w-4xl mx-auto leading-[1.2]">
          Build your resume. Find your skill gaps. <span className="text-gradient">Build better projects.</span> Get interview-ready.
        </h1>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          ResuSphere AI helps students and freshers move seamlessly from career goal to resume, portfolio, projects, interview preparation, and job application tracking.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveView('builder')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 font-display group"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Build My Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActiveView('roadmap')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 shadow-sm transition-all flex items-center justify-center gap-2 font-display"
          >
            <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Start Career Roadmap</span>
          </button>
        </div>

        {/* Key Product Pillars Row (Objective & Verified) */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">ATS-Friendly Layouts</span>
          </div>

          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">1-Click Live Portfolio</span>
          </div>

          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium">Practical Project Blueprints</span>
          </div>

          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="font-medium">Clean Vector PDF Export</span>
          </div>
        </div>

      </div>

    </section>
  );
}
