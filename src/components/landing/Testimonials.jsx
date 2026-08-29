import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Staff Software Engineer',
      company: 'Ex-Uber, now Stripe',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      text: 'The AI Bullet Improver changed everything for me. It rephrased my backend experience using the Google X-Y-Z formula and my interview callback rate jumped from 5% to over 30% within two weeks.'
    },
    {
      name: 'David Kim',
      role: 'Lead Product Designer',
      company: 'Fintech Unicorn',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      text: 'The 1-click dynamic portfolio generation is pure magic. I didn\'t have to spend a weekend building a personal site from scratch—I just entered my resume info and had a gorgeous live site ready.'
    },
    {
      name: 'Priya Sharma',
      role: 'AI / Machine Learning Engineer',
      company: 'Autonomous AI Labs',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      text: 'The ATS keyword scanner helped me spot 5 missing terms for a Principal ML role. I added them with 1 click and received an interview invitation from the recruiter 48 hours later.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white font-display">
          Loved by Top Engineers & Tech Leaders
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          See how candidates landed offers at Google, Stripe, Meta, and high-growth AI startups.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-4 relative transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
              <img
                src={rev.image}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{rev.role} • <span className="text-indigo-600 dark:text-indigo-400 font-medium">{rev.company}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
