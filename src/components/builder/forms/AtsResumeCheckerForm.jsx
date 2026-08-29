import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, 
  Sparkles, Check, ArrowRight, Zap, Info, FileText, 
  User, Briefcase, Cpu, Award, ExternalLink, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResume } from '../../../context/ResumeContext';
import { calculateAtsScore } from '../../../utils/atsScorer';

export function AtsResumeCheckerForm({ onNavigateToTab = null }) {
  const { resumeData, showToast } = useResume();

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [activeTabFilter, setActiveTabFilter] = useState('all'); // 'all' | 'issues' | 'strengths'

  // Calculate current live score
  const atsResult = calculateAtsScore(resumeData);

  const handleRunCheckAgain = () => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 300);
    setTimeout(() => setScanStep(3), 600);

    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);
      showToast(`ATS analysis complete! Score: ${atsResult.score}/100`, 'success');

      if (atsResult.score >= 85) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      }
    }, 950);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 75) return 'text-cyan-600 dark:text-cyan-400';
    if (score >= 60) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-cyan-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const scanSteps = [
    'Scanning required sections & contact integrity...',
    'Evaluating action verbs and quantifiable metrics...',
    'Computing ATS keyword density and parse compatibility...'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              ATS Resume Checker & Audit Radar
            </h2>
            <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
              Live Audit Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Transparent, explainable checks to verify section completeness, metric quantification, and recruiter readability.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunCheckAgain}
          disabled={isScanning}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Analyzing...' : 'Run Check Again'}</span>
        </button>
      </div>

      {/* Scanning Progress Banner */}
      {isScanning && (
        <div className="p-5 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
              <span>{scanSteps[scanStep - 1] || 'Scanning resume...'}</span>
            </span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">Step {scanStep} of 3</span>
          </div>
          <div className="w-full h-2 bg-indigo-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${(scanStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Score Hero Card */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900/90 dark:to-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Circular Score Gauge */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer decorative ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${getScoreColor(atsResult.score)} transition-all duration-1000 ease-out`}
                  strokeDasharray={`${atsResult.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-extrabold font-display ${getScoreColor(atsResult.score)}`}>
                  {atsResult.score}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
              </div>
            </div>

            <div className="mt-2 text-center">
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">
                Grade: {atsResult.grade}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {atsResult.label}
              </span>
            </div>
          </div>

          {/* 5-Pillar Score Breakdown Meters */}
          <div className="sm:col-span-8 space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Core ATS Category Pillars
            </span>

            <div className="space-y-2">
              {atsResult.breakdown.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-950/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.category}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {item.score}/{item.max} <span className="text-[10px] text-slate-400">({item.details})</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getScoreBg((item.score / item.max) * 100)} rounded-full transition-all duration-500`}
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Filter Tabs: Strengths vs Issues */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTabFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTabFilter === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Checks ({atsResult.strengths.length + atsResult.issues.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('issues')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTabFilter === 'issues'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Issues to Fix ({atsResult.issues.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('strengths')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeTabFilter === 'strengths'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Strengths Passed ({atsResult.strengths.length})</span>
        </button>
      </div>

      {/* Issues & Warnings List */}
      {(activeTabFilter === 'all' || activeTabFilter === 'issues') && atsResult.issues.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Opportunities for Score Improvement ({atsResult.issues.length})</span>
          </div>

          <div className="space-y-2.5">
            {atsResult.issues.map((iss, i) => (
              <div 
                key={i} 
                className="p-4 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 rounded-2xl space-y-2 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      iss.type === 'critical' 
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30' 
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                    }`}>
                      {iss.type}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{iss.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {iss.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-rose-50/70 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/20 text-xs text-rose-800 dark:text-rose-300 flex items-center justify-between gap-2">
                  <span><strong>Recommended Fix:</strong> {iss.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passed Strengths List */}
      {(activeTabFilter === 'all' || activeTabFilter === 'strengths') && atsResult.strengths.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Passed Checks & Strengths ({atsResult.strengths.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {atsResult.strengths.map((str, i) => (
              <div 
                key={i} 
                className="p-3.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl space-y-1 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{str.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {str.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Step-by-Step Optimization Plan */}
      <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5 font-display">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Actionable Improvement Checklist</span>
        </h3>
        
        <div className="space-y-1.5">
          {atsResult.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Professional ATS Transparency & Compliance Notice */}
      <div className="p-4 bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">ATS Assessment Transparency Notice:</strong>
          This score is an automated heuristic benchmark evaluating section completeness, keyword frequency, metric density, and structural clarity based on standard recruiter screening criteria. Different employers utilize proprietary algorithms, and scoring high here does not guarantee an interview or passing any third-party system.
        </div>
      </div>

    </div>
  );
}
