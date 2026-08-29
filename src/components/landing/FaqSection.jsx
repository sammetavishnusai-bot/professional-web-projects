import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does the ATS keyword scanner optimize my resume?',
      a: 'Our algorithmic ATS scanner parses your target job description to identify high-frequency keywords, framework requirements, and required skills. It cross-checks your current resume content and highlights exact missing competencies with 1-click injection suggestions.'
    },
    {
      q: 'Will my downloaded PDF resume have watermarks or branding?',
      a: 'Never. All PDF exports are 100% clean, vector-rendered, and unbranded. You get professional, publication-grade documents ready to send to top employers.'
    },
    {
      q: 'How does the 1-Click Dynamic Portfolio Generator work?',
      a: 'The moment you enter or edit your resume information, ResuSphere automatically constructs a fully responsive, interactive developer portfolio website complete with featured project case studies, skills taxonomy, career timeline, and contact card.'
    },
    {
      q: 'What is the Google X-Y-Z formula for bullet points?',
      a: 'Google’s recruiting teams recommend formatting achievements as: "Accomplished [X] as measured by [Y], by doing [Z]". Our AI Bullet Improver takes your raw responsibility notes and reformulates them into strong, metric-backed impact statements.'
    },
    {
      q: 'Can I back up and restore my resume data?',
      a: 'Yes! You can download your entire profile as a single structured JSON file anytime and restore it with one click on any computer.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white font-display">
          Got Questions? We’ve Got Answers.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors shadow-sm"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 select-none"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white font-display">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
