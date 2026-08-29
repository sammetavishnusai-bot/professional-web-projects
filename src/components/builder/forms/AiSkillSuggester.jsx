import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Cpu, Layers, Award, PlusCircle, Check, 
  CheckCircle2, ArrowRight, RefreshCw, AlertCircle, 
  Target, Briefcase, Plus, ShieldCheck, CheckSquare, Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResume } from '../../../context/ResumeContext';
import { aiApiClient } from '../../../services/aiApiClient';

export function AiSkillSuggester({ onSkillsAdded = null }) {
  const { resumeData, updateSkillCategory, addSkillCategory, showToast } = useResume();
  const { skills = [], personalInfo } = resumeData;

  // Form input state
  const [targetJobTitle, setTargetJobTitle] = useState(personalInfo?.title || 'Senior Full-Stack & AI Engineer');
  const [careerGoal, setCareerGoal] = useState('Seeking next-level engineering leadership roles scaling high-impact distributed products.');
  
  // Generation & Selection state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [targetCategoryName, setTargetCategoryName] = useState('Auto-Group by Category');

  // Load initial suggestions on mount
  useEffect(() => {
    aiApiClient.suggestSkills({
      targetJobTitle: personalInfo?.title || 'Software Engineer',
      careerGoal: 'High-impact distributed systems'
    }).then(res => {
      if (res.data) setSuggestedCategories(res.data);
    });
  }, []);

  // Check if a skill is already present in current resume
  const isSkillAlreadyInResume = (skillName) => {
    const clean = skillName.toLowerCase().trim();
    return skills.some(cat => 
      cat.items.some(item => item.toLowerCase().trim() === clean)
    );
  };

  // Generate skills with AI
  const handleGenerateSkills = async () => {
    if (!targetJobTitle.trim()) {
      setErrorMessage('Please enter a Target Job Title to generate relevant skill suggestions.');
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 300);
    setTimeout(() => setLoadingStep(3), 600);

    try {
      const response = await aiApiClient.suggestSkills({
        targetJobTitle: targetJobTitle.trim(),
        careerGoal: careerGoal.trim()
      });

      const results = response.data;
      if (results && results.length > 0) {
        setSuggestedCategories(results);
        setSelectedSkills([]);
        showToast(`Generated tailored technical & soft skill recommendations!`, 'ai');
      } else {
        throw new Error('No skill recommendations returned.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to suggest skills. Please check input parameters.');
      showToast('Error suggesting skills', 'error');
    } finally {
      setIsGenerating(false);
      setLoadingStep(0);
    }
  };

  // Toggle single skill selection
  const handleToggleSkill = (skillName) => {
    if (isSkillAlreadyInResume(skillName)) return;

    setSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  // Select all unadded skills in a category
  const handleSelectAllInCategory = (categorySkills) => {
    const unadded = categorySkills.filter(s => !isSkillAlreadyInResume(s));
    const allSelected = unadded.every(s => selectedSkills.includes(s));

    if (allSelected) {
      setSelectedSkills(prev => prev.filter(s => !unadded.includes(s)));
    } else {
      setSelectedSkills(prev => Array.from(new Set([...prev, ...unadded])));
    }
  };

  // Add all selected skills to resume
  const handleAddSelectedToResume = () => {
    if (selectedSkills.length === 0) {
      showToast('Please select at least one skill to add', 'error');
      return;
    }

    let addedCount = 0;

    if (targetCategoryName === 'Auto-Group by Category') {
      // Group selected skills based on their source category
      suggestedCategories.forEach(cat => {
        const skillsFromThisCat = cat.skills.filter(s => 
          selectedSkills.includes(s) && !isSkillAlreadyInResume(s)
        );

        if (skillsFromThisCat.length > 0) {
          const existingCatIdx = skills.findIndex(
            s => s.category.toLowerCase().trim() === cat.category.toLowerCase().trim()
          );

          if (existingCatIdx >= 0) {
            const currentItems = skills[existingCatIdx].items;
            const merged = Array.from(new Set([...currentItems, ...skillsFromThisCat]));
            updateSkillCategory(existingCatIdx, skills[existingCatIdx].category, merged);
          } else {
            addSkillCategory(cat.category);
            // After state update, update items
            const newIndex = skills.length;
            setTimeout(() => {
              updateSkillCategory(newIndex, cat.category, skillsFromThisCat);
            }, 50);
          }
          addedCount += skillsFromThisCat.length;
        }
      });
    } else {
      // Add all to chosen specific category
      const targetIdx = skills.findIndex(s => s.category === targetCategoryName);
      if (targetIdx >= 0) {
        const currentItems = skills[targetIdx].items;
        const validNew = selectedSkills.filter(s => !isSkillAlreadyInResume(s));
        const merged = Array.from(new Set([...currentItems, ...validNew]));
        updateSkillCategory(targetIdx, targetCategoryName, merged);
        addedCount = validNew.length;
      } else {
        addSkillCategory(targetCategoryName);
        setTimeout(() => {
          updateSkillCategory(skills.length, targetCategoryName, selectedSkills);
        }, 50);
        addedCount = selectedSkills.length;
      }
    }

    // Clear selections and notify
    setSelectedSkills([]);
    showToast(`Added ${addedCount} skills to your resume!`, 'success');

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    if (onSkillsAdded) onSkillsAdded();
  };

  const loadingMessages = [
    'Analyzing target job market requirements...',
    'Synthesizing high-demand technical frameworks & cloud architecture...',
    'Matching leadership and cross-functional soft skills...'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              AI Skill Suggestions & Radar
            </h2>
            <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              Smart Suggester
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Discover in-demand technical toolchains, architecture specializations, and leadership competencies for your target role.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setTargetJobTitle(personalInfo?.title || 'Software Engineer');
            setCareerGoal('Targeting leadership roles in cloud & distributed systems.');
            showToast('Synced role from Personal Details!');
          }}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
        >
          Sync Target Role
        </button>
      </div>

      {/* Error State */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Parameters Form Card */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Target Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Target Job Title <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              value={targetJobTitle}
              onChange={(e) => setTargetJobTitle(e.target.value)}
              placeholder="e.g. Senior Full-Stack & AI Engineer"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Career Goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Career Goal / Next Aspiration</span>
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Transitioning into Staff AI Engineer scaling LLMs"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Suggest Skills with AI Button */}
        <div>
          <button
            type="button"
            onClick={handleGenerateSkills}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 font-display"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Generating In-Demand Skills...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Suggest Skills with AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="p-6 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing market demands</span>
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
            {loadingMessages[loadingStep - 1] || 'Analyzing skills...'}
          </p>
        </div>
      )}

      {/* Action Bar when skills are selected */}
      {selectedSkills.length > 0 && !isGenerating && (
        <div className="sticky top-2 z-30 p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''} selected</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={targetCategoryName}
              onChange={(e) => setTargetCategoryName(e.target.value)}
              className="bg-indigo-700 text-white text-xs border border-indigo-500 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-white"
            >
              <option value="Auto-Group by Category">Auto-Group by Category</option>
              {skills.map((c, i) => (
                <option key={i} value={c.category}>{c.category}</option>
              ))}
            </select>

            <button
              onClick={handleAddSelectedToResume}
              className="px-4 py-1.5 rounded-lg bg-white text-indigo-700 font-bold text-xs hover:bg-slate-100 shadow-sm transition-all whitespace-nowrap"
            >
              Add to Resume
            </button>
          </div>
        </div>
      )}

      {/* Categorized Skill Suggestions Grid */}
      {!isGenerating && suggestedCategories.length > 0 && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Selectable Skill Recommendations (Click chips to multi-select)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Duplicates automatically disabled
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {suggestedCategories.map((catGroup, idx) => {
              const unaddedSkills = catGroup.skills.filter(s => !isSkillAlreadyInResume(s));
              const allSelected = unaddedSkills.length > 0 && unaddedSkills.every(s => selectedSkills.includes(s));

              return (
                <div key={idx} className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                  
                  {/* Category Header with Select All */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                        <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>{catGroup.category}</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {catGroup.description}
                      </p>
                    </div>

                    {unaddedSkills.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectAllInCategory(catGroup.skills)}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                      >
                        {allSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>{allSelected ? 'Deselect All' : 'Select All'}</span>
                      </button>
                    )}
                  </div>

                  {/* Selectable Skill Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {catGroup.skills.map((skillName, sIdx) => {
                      const alreadyInResume = isSkillAlreadyInResume(skillName);
                      const isSelected = selectedSkills.includes(skillName);

                      if (alreadyInResume) {
                        return (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-800 cursor-not-allowed opacity-70"
                            title="Already present in your resume skills"
                          >
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>{skillName}</span>
                            <span className="text-[9px] font-mono ml-0.5">(In Resume)</span>
                          </span>
                        );
                      }

                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleToggleSkill(skillName)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/30'
                              : 'bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:border-indigo-400'
                          }`}
                        >
                          {isSelected ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <PlusCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          )}
                          <span>{skillName}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
