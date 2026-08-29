import React from 'react';
import { Compass, Rocket, FileText, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function HowItWorksSection() {
  const { setActiveView } = useResume();

  const steps = [
    {
      step: '01',
      title: 'Choose Career Track & Analyze Skill Gaps',
      desc: 'Select a target role (Frontend, Backend, Python, Java, Data, etc.) and run an automated skill gap check comparing your current abilities against hiring benchmarks.',
      action: 'roadmap',
      actionText: 'Explore Roadmaps',
      icon: Compass,
      color: 'bg-indigo-500 text-white'
    },
    {
      step: '02',
      title: 'Build Proven Project Blueprints',
      desc: 'Select curated project specifications with problem statements, recommended tech stacks, ASCII folder structures, testing checklists, and 7-stage implementation guides.',
      action: 'projects',
      actionText: 'View Blueprints',
      icon: Rocket,
      color: 'bg-purple-500 text-white'
    },
    {
      step: '03',
      title: 'Generate ATS Resume & Live Portfolio',
      desc: 'Format your education, skills, and projects into 5 ATS-friendly templates with instant PDF export, and create a shareable live portfolio website in 1-click.',
      action: 'builder',
      actionText: 'Launch Studio',
      icon: FileText,
      color: 'bg-emerald-500 text-white'
    },
    {
      step: '04',
      title: 'Practice Interviews & Track Applications',
      desc: 'Simulate technical, project deep-dive, and behavioral interviews with structured answer drafting, and manage all your submissions on a visual Kanban pipeline.',
      action: 'interview',
      actionText: 'Practice Now',
      icon: Award,
      color: 'bg-amber-500 text-white'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
          How ResuSphere Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A transparent, step-by-step methodology to turn academic learning into hiring confidence.
        </p>
      </div>

      {/* 4 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-xs ${st.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveView(st.action)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-display"
                >
                  <span>{st.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
