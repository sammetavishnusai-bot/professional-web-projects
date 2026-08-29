import React, { useState, useEffect } from 'react';
import { 
  Target, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, 
  PlusCircle, Check, Copy, ArrowRight, FileText, Briefcase, 
  Cpu, Layers, HelpCircle, AlertCircle, FileSearch, Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResume } from '../../../context/ResumeContext';
import { aiApiClient } from '../../../services/aiApiClient';

const SAMPLE_JOB_DESCRIPTIONS = {
  fullstack: `We are looking for a Senior Full-Stack Engineer with 5+ years of experience building scalable distributed web applications.
Key Requirements:
- Deep proficiency in React 19, TypeScript, Next.js, and Node.js.
- Strong backend experience with Python, FastAPI, PostgreSQL, and Redis.
- Hands-on experience with Docker, Kubernetes, AWS (EKS, Lambda, S3), and CI/CD pipelines.
- Experience architecting microservices, WebSockets, and high-throughput RESTful APIs.
- Familiarity with Vector Databases (Pinecone), LLM application integration, and Agile/Scrum methodologies.`,
  
  designer: `We are hiring a Lead Product Designer to shape the future of our enterprise AI platform.
Key Requirements:
- 5+ years in product design, design systems architecture, and UX research.
- Mastery of Figma, Design Tokens, WCAG AAA Accessibility, and interactive prototyping.
- Experience with Design-to-Code handoffs, Storybook, and Tailwind CSS.
- Strong track record collaborating closely with engineering leads and product executives.`,
  
  aiScientist: `Seeking a Senior AI/ML Scientist to design and deploy generative AI foundation models.
Key Requirements:
- Proven experience with PyTorch, TensorFlow, Transformers, and LLM Fine-Tuning (LoRA).
- Expertise in RAG architectures, Vector Databases (Pinecone/Milvus), vLLM, and CUDA optimization.
- Distributed model training (DeepSpeed / Ray) and MLOps tooling (MLflow, Docker, Kubernetes).`
};

export function JobDescriptionMatcherForm() {
  const { resumeData, addSkillCategory, updateSkillCategory, showToast } = useResume();
  const { skills = [], personalInfo } = resumeData;

  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS.fullstack);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedMissing, setCopiedMissing] = useState(false);

  // Load initial analysis on mount
  useEffect(() => {
    aiApiClient.matchJobDescription({
      jobDescription: SAMPLE_JOB_DESCRIPTIONS.fullstack,
      resumeData
    }).then(res => {
      if (res.data) setAnalysisResult(res.data);
    });
  }, []);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setErrorMessage('Please paste a job description (at least 20 characters) to analyze matching keywords.');
      return;
    }

    setErrorMessage('');
    setIsAnalyzing(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 300);
    setTimeout(() => setLoadingStep(3), 600);

    try {
      const response = await aiApiClient.matchJobDescription({
        jobDescription: jobDescription.trim(),
        resumeData
      });

      const res = response.data;
      if (res) {
        setAnalysisResult(res);
        showToast(`Job match analyzed! Score: ${res.matchScore}%`, 'success');

        if (res.matchScore >= 80) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
      } else {
        throw new Error('No match analysis returned.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to analyze job match.');
      showToast('Error matching job description', 'error');
    } finally {
      setIsAnalyzing(false);
      setLoadingStep(0);
    }
  };

  const handleAddMissingKeyword = (kw) => {
    if (skills.length > 0) {
      const firstCat = skills[0];
      const cleanKw = kw.trim();
      if (!firstCat.items.some(item => item.toLowerCase() === cleanKw.toLowerCase())) {
        updateSkillCategory(0, firstCat.category, [...firstCat.items, cleanKw]);
        showToast(`Injected "${cleanKw}" into ${firstCat.category}!`, 'success');
        
        // Re-evaluate immediately with updated state
        setTimeout(() => {
          setAnalysisResult(prev => ({
            ...prev,
            matchedKeywords: [...prev.matchedKeywords, cleanKw],
            missingKeywords: prev.missingKeywords.filter(k => k !== cleanKw),
            matchScore: Math.min(100, prev.matchScore + 5)
          }));
        }, 100);
      } else {
        showToast(`"${cleanKw}" is already present in your skills!`);
      }
    } else {
      addSkillCategory('Technical Skills');
    }
  };

  const handleCopyMissingKeywords = () => {
    if (analysisResult.missingKeywords.length === 0) return;
    navigator.clipboard.writeText(analysisResult.missingKeywords.join(', '));
    setCopiedMissing(true);
    showToast('Copied missing keywords to clipboard!');
    setTimeout(() => setCopiedMissing(false), 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 70) return 'text-cyan-600 dark:text-cyan-400';
    if (score >= 50) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 70) return 'bg-cyan-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const loadingMessages = [
    'Parsing job posting keywords & technical competencies...',
    'Comparing requirements against your active resume content...',
    'Computing semantic match rate and gap analysis...'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              AI Job Description Matcher
            </h2>
            <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              Gap Analysis
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Paste target job requirements to calculate keyword match rates, detect missing skills, and get section-by-section optimizations.
          </p>
        </div>

        {/* Quick Sample Job Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[10px] font-semibold text-slate-400 uppercase hidden sm:inline">Load Sample:</span>
          <button
            type="button"
            onClick={() => {
              setJobDescription(SAMPLE_JOB_DESCRIPTIONS.fullstack);
              showToast('Loaded Full-Stack / AI Engineer job posting!');
            }}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            Full-Stack / AI
          </button>
          <button
            type="button"
            onClick={() => {
              setJobDescription(SAMPLE_JOB_DESCRIPTIONS.designer);
              showToast('Loaded Product Designer job posting!');
            }}
            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            Designer
          </button>
        </div>
      </div>

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Job Description Input Card */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-display">
            <FileSearch className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Target Job Description & Role Requirements</span>
          </label>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>{jobDescription.split(/\s+/).filter(Boolean).length} words</span>
            <span>•</span>
            <button
              onClick={() => setJobDescription('')}
              className="text-slate-400 hover:text-rose-500 flex items-center gap-0.5 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description or requirements text here (e.g. We are looking for a Senior React & Node.js Engineer with Docker, AWS, GraphQL, and CI/CD experience...)"
          className="w-full p-3.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed custom-scrollbar font-normal"
        />

        {/* Primary Compare & Match Button */}
        <div>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 font-display"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Comparing with Resume Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Compare & Match with AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Progress State */}
      {isAnalyzing && (
        <div className="p-6 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Semantic matching in progress</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">Step {loadingStep} of 3</span>
          </div>

          <div className="w-full h-2 bg-indigo-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${(loadingStep / 3) * 100}%` }}
            />
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 italic">
            {loadingMessages[loadingStep - 1] || 'Analyzing job match...'}
          </p>
        </div>
      )}

      {/* Analysis Results Display */}
      {!isAnalyzing && analysisResult && analysisResult.matchScore > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Match Score Hero Card */}
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-900/90 dark:to-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Circular Gauge */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${getScoreColor(analysisResult.matchScore)} transition-all duration-1000 ease-out`}
                      strokeDasharray={`${analysisResult.matchScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>

                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className={`text-3xl font-extrabold font-display ${getScoreColor(analysisResult.matchScore)}`}>
                      {analysisResult.matchScore}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Job Match</span>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">
                    {analysisResult.matchGrade}
                  </span>
                </div>
              </div>

              {/* Statistics Overview */}
              <div className="sm:col-span-8 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Keyword Alignment Breakdown
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center sm:text-left">
                    <span className="text-[10px] text-slate-400 block">Matched Skills</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-display">
                      {analysisResult.matchedKeywords.length}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center sm:text-left">
                    <span className="text-[10px] text-slate-400 block">Missing Skills</span>
                    <span className="text-xl font-bold text-amber-500 dark:text-amber-400 font-display">
                      {analysisResult.missingKeywords.length}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center sm:text-left">
                    <span className="text-[10px] text-slate-400 block">Job Keywords Analyzed</span>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-display">
                      {analysisResult.topJobKeywords.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBg(analysisResult.matchScore)} transition-all duration-700 rounded-full`}
                    style={{ width: `${analysisResult.matchScore}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Matched Keywords vs Missing Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Matched Keywords */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matching Skills Found in Resume ({analysisResult.matchedKeywords.length})</span>
                </span>
              </div>

              {analysisResult.matchedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
                    >
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-2">No matching keywords detected yet.</p>
              )}
            </div>

            {/* Missing Keywords with 1-Click Injection */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Missing Skills in Your Resume ({analysisResult.missingKeywords.length})</span>
                </span>
                
                {analysisResult.missingKeywords.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCopyMissingKeywords}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                    title="Copy all missing keywords"
                  >
                    {copiedMissing ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMissing ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {analysisResult.missingKeywords.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click any keyword below to inject it directly into your skills matrix:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleAddMissingKeyword(kw)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 transition-all hover:scale-105"
                        title="Click to inject into resume skills"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Outstanding! All high-priority job keywords are present in your resume.</span>
                </div>
              )}
            </div>

          </div>

          {/* Section-by-Section Improvement Suggestions */}
          {analysisResult.sectionImprovements && analysisResult.sectionImprovements.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Resume Sections to Optimize for this Role ({analysisResult.sectionImprovements.length})
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysisResult.sectionImprovements.map((rec, idx) => (
                  <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-indigo-50 dark:bg-indigo-500/15 rounded-md text-indigo-600 dark:text-indigo-400">
                        <FileText className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rec.section}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                      <strong>Observation:</strong> {rec.issue}
                    </p>
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-300 pl-6 leading-relaxed bg-indigo-50/50 dark:bg-indigo-950/20 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                      <strong>Recommendation:</strong> {rec.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Job Keywords Full List */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              All Target Job Keywords Detected ({analysisResult.topJobKeywords.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {analysisResult.topJobKeywords.map((kw, i) => {
                const isMatched = analysisResult.matchedKeywords.includes(kw);
                return (
                  <span 
                    key={i}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                      isMatched 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isMatched ? `✓ ${kw}` : kw}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Compliance / Transparency Disclaimer */}
          <div className="p-4 bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Job Match Benchmark Disclaimer:</strong>
              This match score is an automated semantic alignment benchmark comparing keywords and qualifications. It is designed for resume optimization and does not guarantee employer interviews or passing any proprietary ATS.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
