import React from 'react';
import { GraduationCap, BookOpen, Sparkles, Briefcase, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function TargetAudienceSection() {
  const { setActiveView } = useResume();

  const audiences = [
    {
      title: 'B.Tech & Engineering Students',
      badge: 'Campus Placements',
      desc: 'Build ATS-compliant resumes and structured GitHub project portfolios for on-campus drives and off-campus tech hiring.',
      points: [
        'Turn coursework and academic projects into industry achievements',
        'Identify missing tech stack skills before final-year placement season',
        'Export multi-page vector PDFs formatted for corporate campus ATS systems'
      ],
      action: 'builder',
      actionText: 'Build Placement Resume'
    },
    {
      title: 'College Students & Tech Majors',
      badge: 'Early Upskilling',
      desc: 'Discover critical industry skill gaps early in your 2nd or 3rd year and follow structured semester learning roadmaps.',
      points: [
        '7 structured learning tracks (Frontend, Backend, Python, Java, etc.)',
        'Learn why specific tools like Docker, Redis, or PostgreSQL matter',
        'Build real projects rather than copying generic tutorial apps'
      ],
      action: 'roadmap',
      actionText: 'View Learning Roadmaps'
    },
    {
      title: 'Freshers & Entry-Level Devs',
      badge: 'Job Ready',
      desc: 'Stand out in hiring pipelines with verified architectural project blueprints and tailored interview practice.',
      points: [
        'Practice role-specific technical & behavioral interview questions',
        'Answer architecture deep-dives based on your actual resume projects',
        '1-click live developer portfolio site with 3 responsive themes'
      ],
      action: 'interview',
      actionText: 'Practice Interviews'
    },
    {
      title: 'Early-Career Job Seekers',
      badge: 'Pipeline Hub',
      desc: 'Stay completely organized across dozens of submissions with our visual job application tracker and Kanban pipeline.',
      points: [
        'Log company, salary, job posting link, and recruiter notes',
        'Track progress from Applied to OA, Interview, and Offer',
        'Filter applications by status, job title, and company'
      ],
      action: 'tracker',
      actionText: 'Open Job Tracker'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Tailored for Every Stage of Your College-to-Career Journey</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
          Who ResuSphere AI Is Built For
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Designed specifically to address the unique challenges of entry-level candidates, freshers, and university graduates.
        </p>
      </div>

      {/* 4 Audience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((aud, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase">
                  {aud.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {aud.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {aud.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {aud.points.map((pt, pi) => (
                  <div key={pi} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveView(aud.action)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-display"
              >
                <span>{aud.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
