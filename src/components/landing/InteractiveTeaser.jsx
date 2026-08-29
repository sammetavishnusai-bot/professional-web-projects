import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, Zap, Shield, FileText } from 'lucide-react';
import { aiEngine } from '../../utils/aiEngine';
import { useResume } from '../../context/ResumeContext';

export function InteractiveTeaser() {
  const { setActiveView } = useResume();

  const [inputBullet, setInputBullet] = useState('Responsible for improving website performance and helping with backend.');
  const [enhancedResult, setEnhancedResult] = useState('Architected asynchronous Redis caching layer and optimized SQL indexing across 12 microservices, reducing p99 API latency by 44% and scaling throughput to 8.5M daily requests.');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const sampleWeakBullets = [
    'Responsible for improving website performance and helping with backend.',
    'Worked on user login and added authentication features.',
    'Helped design the new design system in Figma for mobile.'
  ];

  const handleEnhance = (text = inputBullet) => {
    setIsEnhancing(true);
    setTimeout(() => {
      const results = aiEngine.enhanceBullet(text, 'Senior Software Engineer');
      setEnhancedResult(results[0].content);
      setIsEnhancing(false);
    }, 450);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
          
          {/* Left Column: Interactive AI Improver Demo */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Interactive AI Copilot Playground</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-display">
                See How AI Converts Weak Points into $150k+ Impact
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Try typing a basic resume responsibility below or pick an example to test our Google X-Y-Z formula engine.
              </p>
            </div>

            {/* Example pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {sampleWeakBullets.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputBullet(sample);
                    handleEnhance(sample);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors truncate max-w-xs"
                >
                  "{sample.slice(0, 35)}..."
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Your Raw Draft:</label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={inputBullet}
                  onChange={(e) => setInputBullet(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                />
                <button
                  onClick={() => handleEnhance()}
                  disabled={isEnhancing}
                  className="absolute right-2 bottom-3 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isEnhancing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
                  <span>Enhance with AI</span>
                </button>
              </div>
            </div>

            {/* Result Box */}
            <div className="p-4 bg-slate-100/90 dark:bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AI Polished Output (Google X-Y-Z Metric Standard):
                </span>
                <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 dark:bg-indigo-500/20 px-2 py-0.5 rounded">
                  ATS Score: 98%
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
                "{enhancedResult}"
              </p>
            </div>
          </div>

          {/* Right Column: Live Feature Highlights Card */}
          <div className="w-full lg:w-80 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ResuSphere Engine
              </span>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>Real-time instant live preview with 5 designer templates</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Interactive ATS keyword matching and scoring algorithm</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>1-Click interactive live portfolio website generator</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('builder')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Open Full Resume Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
