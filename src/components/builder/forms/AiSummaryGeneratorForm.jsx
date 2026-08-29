import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RefreshCw, Copy, Check, CheckCircle2, 
  ArrowRight, User, Briefcase, GraduationCap, Cpu, 
  Target, Download, AlertCircle, Wand2, ArrowDownCircle, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { aiApiClient } from '../../../services/aiApiClient';

export function AiSummaryGeneratorForm() {
  const { resumeData, updatePersonalInfo, showToast } = useResume();
  const { personalInfo, experience, education, skills } = resumeData;

  // Form State
  const [formData, setFormData] = useState({
    fullName: personalInfo?.fullName || '',
    jobTitle: personalInfo?.title || '',
    education: education?.[0] ? `${education[0].degree} from ${education[0].institution}` : '',
    skills: skills?.flatMap(s => s.items).join(', ') || '',
    experience: experience?.[0] ? `${experience[0].role} at ${experience[0].company} (${experience.length}+ roles total)` : '',
    careerGoal: 'Targeting high-impact roles delivering scalable, production-grade solutions.'
  });

  // Generator & UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedVariations, setGeneratedVariations] = useState([]);
  const [activeVariationIndex, setActiveVariationIndex] = useState(0);
  const [currentEditableText, setCurrentEditableText] = useState(personalInfo?.summary || '');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preload variations if resume has summary
  useEffect(() => {
    if (personalInfo?.summary && generatedVariations.length === 0) {
      setCurrentEditableText(personalInfo.summary);
    }
  }, [personalInfo?.summary]);

  // 1-Click Sync from Current Resume Data
  const handleSyncFromResume = () => {
    const skillsList = skills?.flatMap(s => s.items).join(', ') || '';
    const eduList = education?.map(e => `${e.degree} from ${e.institution}`).join(' • ') || '';
    const expList = experience?.map(e => `${e.role} at ${e.company}`).slice(0, 2).join(' • ') || '';

    setFormData({
      fullName: personalInfo?.fullName || '',
      jobTitle: personalInfo?.title || '',
      education: eduList || formData.education,
      skills: skillsList || formData.skills,
      experience: expList ? `${expList} (${experience.length}+ roles)` : formData.experience,
      careerGoal: formData.careerGoal || 'Seeking next-level engineering leadership opportunities.'
    });

    setErrorMessage('');
    showToast('Synced profile fields from your resume details!');
  };

  // Generate Summaries with AI
  const handleGenerate = async () => {
    // Basic validation
    if (!formData.jobTitle.trim() && !formData.skills.trim() && !formData.experience.trim()) {
      setErrorMessage('Please provide at least a Job Title, Skills, or Work Experience to generate tailored summaries.');
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 300);
    setTimeout(() => setLoadingStep(3), 600);

    try {
      const response = await aiApiClient.generateSummary({
        fullName: formData.fullName,
        jobTitle: formData.jobTitle || 'Software Engineer',
        education: formData.education,
        skills: formData.skills,
        experience: formData.experience,
        careerGoal: formData.careerGoal
      });

      const results = response.data;
      if (results && results.length > 0) {
        setGeneratedVariations(results);
        setActiveVariationIndex(0);
        setCurrentEditableText(results[0].summary);
        showToast('Generated 3 professional AI resume summaries!', 'ai');
      } else {
        throw new Error('No summary variations returned.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to generate summaries. Please check input parameters.');
      showToast('Error generating AI summary', 'error');
    } finally {
      setIsGenerating(false);
      setLoadingStep(0);
    }
  };

  // Switch between variations
  const handleSelectVariation = (index) => {
    setActiveVariationIndex(index);
    if (generatedVariations[index]) {
      setCurrentEditableText(generatedVariations[index].summary);
    }
  };

  // Copy summary to clipboard
  const handleCopySummary = () => {
    if (!currentEditableText) return;
    navigator.clipboard.writeText(currentEditableText);
    setCopied(true);
    showToast('Summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Apply directly to resume
  const handleApplyToResume = () => {
    if (!currentEditableText.trim()) {
      showToast('Summary is empty', 'error');
      return;
    }
    updatePersonalInfo('summary', currentEditableText.trim());
    showToast('Applied AI Summary to Live Resume!');
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  const loadingMessages = [
    'Synthesizing career highlights and competencies...',
    'Optimizing keywords for high ATS pass-rates...',
    'Polishing action verbs with Google X-Y-Z formula...'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
              <Wand2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              AI Resume Summary Generator
            </h2>
            <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              Pro Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Craft high-impact, ATS-optimized executive summaries tailored to your exact career history and aspirations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSyncFromResume}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          title="Auto-fill form inputs from your existing resume sections"
        >
          <ArrowDownCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Sync from Resume</span>
        </button>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Parameters Form */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Alex Chen"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Career / Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Career / Job Title <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="e.g. Senior Full-Stack & AI Engineer"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            />
          </div>

        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Education */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Education / Academic Honors</span>
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="e.g. B.S. in Computer Science from UC Berkeley"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Experience Highlights */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Experience Highlights & Years</span>
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g. 6+ years scaling distributed systems at Synthetix AI"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Skills */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Key Skills & Technologies (Comma-separated)</span>
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="e.g. React 19, TypeScript, Node.js, Python, AWS, Docker, Vector DBs, System Design"
            className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          />
        </div>

        {/* Career Goal */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Target Career Goal / Next Opportunity</span>
          </label>
          <input
            type="text"
            value={formData.careerGoal}
            onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
            placeholder="e.g. Seeking Staff Engineer roles architecting generative AI platforms"
            className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Primary Generate with AI Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 font-display"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Synthesizing Summary with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Generate with AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Professional Loading State */}
      {isGenerating && (
        <div className="p-6 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>AI Copilot at work</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">Step {loadingStep} of 3</span>
          </div>

          <div className="w-full h-2 bg-indigo-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${(loadingStep / 3) * 100}%` }}
            />
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 italic">
            {loadingMessages[loadingStep - 1] || 'Synthesizing career summary...'}
          </p>
        </div>
      )}

      {/* Generated Summaries Result Panel */}
      {generatedVariations.length > 0 && !isGenerating && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Variation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {generatedVariations.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectVariation(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeVariationIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{item.title.split(' ')[0]}</span>
                <span>Variation {idx + 1}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeVariationIndex === idx ? 'bg-indigo-400/30 text-white' : 'bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Editable Text Area Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{generatedVariations[activeVariationIndex]?.title || 'Generated Resume Summary'}</span>
              </span>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>{currentEditableText.split(/\s+/).filter(Boolean).length} words</span>
                <span>•</span>
                <span>{currentEditableText.length} chars</span>
              </div>
            </div>

            {/* Editable Textarea */}
            <textarea
              rows={5}
              value={currentEditableText}
              onChange={(e) => setCurrentEditableText(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed custom-scrollbar font-normal"
              placeholder="Edit your AI-generated summary here..."
            />

            {/* Keywords Tag Badges */}
            {generatedVariations[activeVariationIndex]?.keywords && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
                  Target Keywords Injected:
                </span>
                {generatedVariations[activeVariationIndex].keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* Actions: Apply, Regenerate, Copy */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleApplyToResume}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply to Resume</span>
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
