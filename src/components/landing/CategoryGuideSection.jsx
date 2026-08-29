import React from 'react';
import { 
  FileText, Globe, ShieldCheck, Target, Sparkles, 
  Compass, Rocket, Award, Briefcase, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function CategoryGuideSection() {
  const { setActiveView } = useResume();

  const categories = [
    {
      category: '1. Build',
      tagline: 'Create industry-grade profiles',
      badge: 'Core Creation',
      badgeColor: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      items: [
        {
          title: 'ATS Resume Studio',
          desc: '5 professional templates, real-time preview, and multi-page vector PDF export.',
          view: 'builder',
          icon: FileText,
          iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
        },
        {
          title: 'Live Portfolio Website',
          desc: '1-click portfolio generator with 3 visual themes, photo uploader, and case studies.',
          view: 'portfolio',
          icon: Globe,
          iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
        }
      ]
    },
    {
      category: '2. Improve',
      tagline: 'Optimize with AI & ATS scanners',
      badge: 'AI Screening',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      items: [
        {
          title: 'ATS Resume Scanner',
          desc: 'Instant 0–100 readability score, section verification, and actionable fixes.',
          view: 'builder',
          icon: ShieldCheck,
          iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        },
        {
          title: 'Job Description Matcher',
          desc: 'Compare resumes against job postings to detect matching and missing keywords.',
          view: 'builder',
          icon: Target,
          iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
        }
      ]
    },
    {
      category: '3. Prepare',
      tagline: 'Level up skills & crack interviews',
      badge: 'Career Readiness',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      items: [
        {
          title: 'Career Roadmap & Skill Gap',
          desc: '7 career tracks with skill gap radar and milestone progress tracking.',
          view: 'roadmap',
          icon: Compass,
          iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
        },
        {
          title: 'Project Blueprints & Guide',
          desc: 'Curated architectural project specs with step-by-step implementation guides.',
          view: 'projects',
          icon: Rocket,
          iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
        },
        {
          title: 'Interview Simulator',
          desc: 'Technical, behavioral, and resume deep-dive question practice simulator.',
          view: 'interview',
          icon: Award,
          iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
        }
      ]
    },
    {
      category: '4. Track',
      tagline: 'Organize recruitment pipeline',
      badge: 'Pipeline Hub',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      items: [
        {
          title: 'Job Application Tracker',
          desc: 'Sortable table and 6-stage Kanban board to track applications from submission to offer.',
          view: 'tracker',
          icon: Briefcase,
          iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>The Complete 4-Step Career Launch System</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
          Everything You Need: From Fresh Resume to Signed Offer
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Engineered specifically for B.Tech students, fresh graduates, and self-taught developers to master the complete technical hiring cycle.
        </p>
      </div>

      {/* 4 Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, ci) => (
          <div 
            key={ci}
            className="p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                  {cat.category}
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-semibold ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {cat.tagline}
              </p>

              <div className="space-y-2 pt-1">
                {cat.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={ii}
                      onClick={() => setActiveView(item.view)}
                      className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl hover:border-indigo-400/60 transition-all cursor-pointer group space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${item.iconBg}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display">
                            {item.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
