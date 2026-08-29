import React, { useState } from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function Footer() {
  const { setActiveView, showToast } = useResume();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed to ResuSphere AI Career Newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white font-display">ResuSphere AI</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              Next-generation career readiness platform: ATS resume builder, interactive live portfolio, project blueprints, interview prep, and application pipeline tracker.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Status: All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Core Studio */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-display">Studios</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><button onClick={() => setActiveView('builder')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Resume Studio</button></li>
              <li><button onClick={() => setActiveView('portfolio')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Live Portfolio</button></li>
              <li><button onClick={() => setActiveView('builder')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">ATS Scanner</button></li>
              <li><button onClick={() => setActiveView('builder')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">AI Matcher</button></li>
            </ul>
          </div>

          {/* Career Readiness */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-display">Career Features</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><button onClick={() => setActiveView('roadmap')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Career Roadmap & Skill Gap</button></li>
              <li><button onClick={() => setActiveView('projects')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Project Generator</button></li>
              <li><button onClick={() => setActiveView('interview')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Interview Preparation</button></li>
              <li><button onClick={() => setActiveView('tracker')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Job Application Tracker</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-display">Stay Ahead</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Get weekly recruiter tips, ATS algorithm updates, and high-converting resume formulas.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Socials */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} ResuSphere AI Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
