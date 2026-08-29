import React from 'react';
import { 
  Sparkles, Palette, Globe, ShieldCheck, Download, 
  Smartphone, Layers, Zap, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function BentoFeatures() {
  const { setActiveView } = useResume();

  const features = [
    {
      title: 'Google X-Y-Z Metric Engine',
      description: 'Converts simple bullet points into quantifiable achievements: "Accomplished [X], as measured by [Y], by doing [Z]".',
      badge: 'Core AI',
      icon: Sparkles,
      iconColor: 'text-amber-500 dark:text-amber-400',
      gradient: 'from-amber-500/10 via-indigo-500/5 to-transparent',
      span: 'lg:col-span-2'
    },
    {
      title: '5 Switchable Luxury Templates',
      description: 'Switch between Modern Tech, Executive Clean, Nordic Indigo, Serif Editorial, and Creative Split in 1-click without losing edits.',
      badge: 'Zero Reformatting',
      icon: Palette,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      gradient: 'from-indigo-500/10 to-transparent',
      span: 'lg:col-span-1'
    },
    {
      title: 'Dynamic Web Portfolio Generator',
      description: 'Automatically transforms your structured resume data into an interactive developer portfolio with case studies and contact form.',
      badge: '1-Click Site',
      icon: Globe,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      gradient: 'from-cyan-500/10 to-transparent',
      span: 'lg:col-span-1'
    },
    {
      title: 'ATS Scanner & Job Matcher',
      description: 'Paste any job description to extract target competencies, detect missing keywords, and get instant 1-click injection recommendations.',
      badge: '98%+ Pass Rate',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500/10 via-purple-500/5 to-transparent',
      span: 'lg:col-span-2'
    },
    {
      title: 'Pixel-Perfect Vector PDF Export',
      description: 'Zero watermark, crisp vector rendering, clean print CSS styles, and full JSON backup and restore capabilities.',
      badge: 'Lossless Quality',
      icon: Download,
      iconColor: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500/10 to-transparent',
      span: 'lg:col-span-1'
    },
    {
      title: 'Full Mobile & Tablet Studio',
      description: 'Build, edit, and preview on the go. Seamless responsive UI crafted for desktop, tablet, and mobile smartphones.',
      badge: '100% Responsive',
      icon: Smartphone,
      iconColor: 'text-rose-600 dark:text-rose-400',
      gradient: 'from-rose-500/10 via-indigo-500/5 to-transparent',
      span: 'lg:col-span-2'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>SaaS Architectural Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-display">
          Everything You Need to Stand Out & Get Hired
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Built according to modern hiring manager standards, recruiter psychology, and ATS algorithms.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className={`${f.span} p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-xl`}
            >
              {/* Subtle background gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`} />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                    <Icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {f.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:text-indigo-500">
                <span>Explore in Studio</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
