import React from 'react';
import { 
  Target, Sparkles, Compass, Rocket, FileText, 
  Globe, Award, Briefcase, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function ProductFlowSection() {
  const { setActiveView } = useResume();

  const steps = [
    {
      step: 1,
      name: 'Career Goal',
      label: 'Select Track',
      desc: 'Choose your target engineering role (Frontend, Backend, Full Stack, Python, Java, Data, UI/UX).',
      view: 'roadmap',
      icon: Target,
      color: 'bg-indigo-500 text-white'
    },
    {
      step: 2,
      name: 'Skill Gap',
      label: 'Radar Analysis',
      desc: 'Compare skills you have against what industry roles require and identify missing competencies.',
      view: 'roadmap',
      icon: Compass,
      color: 'bg-purple-500 text-white'
    },
    {
      step: 3,
      name: 'Project',
      label: 'Build Blueprints',
      desc: 'Pick architectural projects with 7-step development guides to prove hands-on abilities.',
      view: 'projects',
      icon: Rocket,
      color: 'bg-rose-500 text-white'
    },
    {
      step: 4,
      name: 'Resume',
      label: 'ATS Resume Studio',
      desc: 'Format your achievements into 5 ATS-compliant templates with instant vector PDF download.',
      view: 'builder',
      icon: FileText,
      color: 'bg-blue-500 text-white'
    },
    {
      step: 5,
      name: 'Portfolio',
      label: 'Live Website',
      desc: 'Sync resume data in 1-click into an interactive portfolio website with 3 visual themes.',
      view: 'portfolio',
      icon: Globe,
      color: 'bg-emerald-500 text-white'
    },
    {
      step: 6,
      name: 'Interview',
      label: 'Answer Simulator',
      desc: 'Practice technical, project architecture, and behavioral questions with answer drafting.',
      view: 'interview',
      icon: Award,
      color: 'bg-amber-500 text-white'
    },
    {
      step: 7,
      name: 'Job Tracker',
      label: 'Pipeline Hub',
      desc: 'Track submissions, OA assessments, and interview rounds on a table and Kanban board.',
      view: 'tracker',
      icon: Briefcase,
      color: 'bg-cyan-500 text-white'
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
          The 7-Step Career Progression Flow
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-display">
          How ResuSphere Guides Your Career Journey
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          From deciding your target job role to signing your offer letter, each module connects seamlessly.
        </p>
      </div>

      {/* 7-Step Horizontal / Grid Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              onClick={() => setActiveView(s.view)}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl flex flex-col justify-between space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-md group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    0{s.step}
                  </span>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shadow-xs ${s.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {s.name}
                  </h3>
                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 block">
                    {s.label}
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-3">
                  {s.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
