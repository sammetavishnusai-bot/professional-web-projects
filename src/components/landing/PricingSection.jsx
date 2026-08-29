import React, { useState } from 'react';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function PricingSection() {
  const { setActiveView } = useResume();
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free Explorer',
      price: '$0',
      period: 'forever',
      description: 'Ideal for drafting your first ATS resume and testing AI features.',
      features: [
        'Full Access to Resume Studio',
        '2 Luxury Resume Templates',
        '5 AI Polish & Bullet Enhancements / day',
        'Pixel-Perfect PDF Vector Export',
        'JSON Backup & Restore'
      ],
      cta: 'Start Free Today',
      popular: false,
      buttonStyle: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700'
    },
    {
      name: 'Pro AI Unlimited',
      price: annual ? '$9' : '$14',
      period: 'per month',
      badge: 'Most Popular',
      description: 'Everything you need to accelerate your job search and stand out.',
      features: [
        'Unlimited AI Bullet & Summary Enhancements',
        'All 5 Premium Resume Templates',
        '1-Click Live Hosted Web Portfolio',
        'Full ATS Radar & Job Description Matcher',
        'Custom Subdomain (yourname.craftfolio.ai)',
        'Priority ATS Scoring & Actionable Audit'
      ],
      cta: 'Launch Pro Studio',
      popular: true,
      buttonStyle: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-glow-sm'
    },
    {
      name: 'Lifetime Pass',
      price: '$89',
      period: 'one-time payment',
      description: 'Pay once and enjoy lifetime access to all future AI models & templates.',
      features: [
        'Everything in Pro AI Unlimited',
        'Lifetime Updates & New Templates',
        'Custom Domain Mapping (e.g. yourname.com)',
        'Private AI Prompt Fine-Tuning',
        'Dedicated VIP Career Support'
      ],
      cta: 'Get Lifetime Access',
      popular: false,
      buttonStyle: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white font-display">
          Transparent, Fair Pricing
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Invest in your career. Land offers that pay 20x–50x more.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className={`text-xs font-semibold ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-colors relative border border-slate-300 dark:border-slate-700"
          >
            <div className={`w-4 h-4 rounded-full bg-indigo-600 transition-transform ${annual ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1 ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            <span>Annual</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-medium">Save 35%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl bg-white/80 dark:bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-xl ${
              p.popular 
                ? 'border-indigo-500 shadow-glow-md bg-white dark:bg-slate-900 ring-2 ring-indigo-500/20' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {p.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                {p.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-display">{p.price}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/{p.period}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveView('builder')}
              className={`w-full mt-8 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${p.buttonStyle}`}
            >
              <span>{p.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
