import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Sparkles, ChevronDown, ChevronUp, Check, RefreshCw } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { aiEngine } from '../../../utils/aiEngine';

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience, showToast } = useResume();
  const { experience } = resumeData;

  const [expandedId, setExpandedId] = useState(experience?.[0]?.id || null);
  const [activeBulletTarget, setActiveBulletTarget] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleOpenAiImprover = (expId, bulletIndex, currentText) => {
    setActiveBulletTarget({ expId, bulletIndex, currentText });
    setIsAiLoading(true);

    setTimeout(() => {
      const suggestions = aiEngine.enhanceBullet(currentText, resumeData?.personalInfo?.title || 'Engineer');
      setAiSuggestions(suggestions);
      setIsAiLoading(false);
      showToast('Generated 3 high-impact metric bullet variations', 'ai');
    }, 450);
  };

  const handleApplyAiSuggestion = (text) => {
    if (!activeBulletTarget) return;
    const { expId, bulletIndex } = activeBulletTarget;
    const targetExp = experience.find(e => e.id === expId);
    if (targetExp) {
      const newHighlights = [...(targetExp.highlights || [])];
      newHighlights[bulletIndex] = text;
      updateExperience(expId, { highlights: newHighlights });
      showToast('Applied AI bullet point!');
    }
    setActiveBulletTarget(null);
  };

  const handleAddHighlight = (expId) => {
    const targetExp = experience.find(e => e.id === expId);
    if (targetExp) {
      const newHighlights = [...(targetExp.highlights || []), 'Delivered core microservice features with 99.9% uptime, increasing customer retention by 15%.'];
      updateExperience(expId, { highlights: newHighlights });
    }
  };

  const handleUpdateHighlight = (expId, index, value) => {
    const targetExp = experience.find(e => e.id === expId);
    if (targetExp) {
      const newHighlights = [...(targetExp.highlights || [])];
      newHighlights[index] = value;
      updateExperience(expId, { highlights: newHighlights });
    }
  };

  const handleRemoveHighlight = (expId, index) => {
    const targetExp = experience.find(e => e.id === expId);
    if (targetExp) {
      const newHighlights = (targetExp.highlights || []).filter((_, i) => i !== index);
      updateExperience(expId, { highlights: newHighlights });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Work Experience
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add your professional history with quantifiable achievements and action verbs.
          </p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience?.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div 
              key={exp.id} 
              className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              {/* Accordion Bar */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {exp.role || 'New Role'} <span className="text-slate-500 dark:text-slate-400 font-normal">at {exp.company || 'Company'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {exp.startDate || 'YYYY-MM'} – {exp.current ? 'Present' : (exp.endDate || 'YYYY-MM')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(exp.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Form Content */}
              {isExpanded && (
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title / Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="e.g. Synthetix AI"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          placeholder="e.g. 2022-03"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                        <input
                          type="text"
                          disabled={exp.current}
                          value={exp.current ? 'Present' : exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          placeholder="e.g. 2024-01"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-700 dark:text-slate-300 select-none">
                      I currently work in this role
                    </label>
                  </div>

                  {/* Bullet Points / Achievements */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Key Accomplishments & Bullet Points (Google X-Y-Z formula)
                      </label>
                      <button
                        onClick={() => handleAddHighlight(exp.id)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(exp.highlights || []).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="text-slate-400 text-xs mt-2.5 font-mono">{hIdx + 1}.</span>
                          <textarea
                            rows={2}
                            value={highlight}
                            onChange={(e) => handleUpdateHighlight(exp.id, hIdx, e.target.value)}
                            placeholder="e.g. Architected an event-driven ingestion pipeline handling 14k req/sec, reducing latency by 48%..."
                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                          />
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleOpenAiImprover(exp.id, hIdx, highlight)}
                              className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 transition-colors"
                              title="Enhance with AI (Metrics & Action Verbs)"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
                            </button>
                            <button
                              onClick={() => handleRemoveHighlight(exp.id, hIdx)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Delete bullet point"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Bullet Improver Modal */}
      {activeBulletTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Bullet Point Enhancer</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Google X-Y-Z formula & Action Verbs</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveBulletTarget(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Original Draft:</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">{activeBulletTarget.currentText}</p>
            </div>

            {isAiLoading ? (
              <div className="py-10 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Injecting high-impact verbs and quantifiable metrics...</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {aiSuggestions.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleApplyAiSuggestion(item.content)}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.style}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center gap-1">
                        <Check className="w-3 h-3" /> Apply Bullet
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
