import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, X, Sparkles, CheckCircle2, AlertTriangle, 
  ArrowRight, Search, PlusCircle, RefreshCw, FileText 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { aiEngine } from '../../utils/aiEngine';

export function AtsScannerModal() {
  const { isAtsModalOpen, setIsAtsModalOpen, atsScore, resumeData, addSkillCategory, updateSkillCategory, showToast } = useResume();

  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAtsModalOpen(false);
    };
    if (isAtsModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAtsModalOpen, setIsAtsModalOpen]);

  if (!isAtsModalOpen) return null;

  const handleScanJob = () => {
    setIsScanning(true);
    setTimeout(() => {
      const res = aiEngine.analyzeJobDescription(jobDescription, resumeData);
      setAnalysisResult(res);
      setIsScanning(false);
      showToast('Job description scanned and keyword match computed!');
    }, 600);
  };

  const handleAddMissingKeyword = (kw) => {
    const skills = resumeData.skills || [];
    if (skills.length > 0) {
      const firstCat = skills[0];
      if (!firstCat.items.includes(kw)) {
        updateSkillCategory(0, firstCat.category, [...firstCat.items, kw]);
        showToast(`Injected "${kw}" into ${firstCat.category}!`);
      } else {
        showToast(`"${kw}" is already in your skills list!`);
      }
    } else {
      addSkillCategory('Technical Skills');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsAtsModalOpen(false)}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                ATS Radar & Keyword Copilot
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono font-semibold">
                  Score: {atsScore.score}/100
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audit your resume against applicant tracking systems and target job listings.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAtsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Breakdown Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-center sm:text-left sm:border-r border-slate-200 dark:border-slate-800 pr-3 flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Resume Grade</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{atsScore.score}%</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">({atsScore.grade})</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{atsScore.label}</span>
          </div>

          <div className="col-span-2 space-y-2 pt-2 sm:pt-0">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Category Pillars</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {atsScore.breakdown.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{item.category}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.score}/{item.max}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Job Description Scanner */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Target Job Description Match Scanner
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Paste job post to detect missing keywords</span>
          </div>

          <div className="space-y-2">
            <textarea
              rows={3}
              placeholder="Paste the target job posting text or requirements here (e.g., We are looking for a Senior React Engineer with Docker, AWS, GraphQL, and CI/CD experience...)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
            />
            <button
              onClick={handleScanJob}
              disabled={isScanning}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>{isScanning ? 'Analyzing Keywords...' : 'Scan & Compute Match Rate'}</span>
            </button>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="p-4 bg-slate-50 dark:bg-slate-950/90 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Target Role Match Rate:</span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {analysisResult.matchScore}% Match
                </span>
              </div>

              {/* Matched Keywords */}
              <div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                  ✓ Matched Keywords Found in Your Resume ({analysisResult.matchedKeywords.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysisResult.matchedKeywords.map((kw, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords with 1-click add */}
              <div>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                  ⚠ Missing High-Frequency Keywords (Click to inject into skills):
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysisResult.missingKeywords.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddMissingKeyword(kw)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono flex items-center gap-1 transition-colors"
                      title="Add to resume skills"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actionable Tips */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Actionable Optimization Checklist
          </h3>
          <div className="space-y-1.5">
            {atsScore.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
