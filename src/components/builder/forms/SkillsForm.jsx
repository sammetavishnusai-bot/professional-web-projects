import React, { useState } from 'react';
import { Cpu, Plus, Trash2, X, Sparkles, PlusCircle, Wand2, ListFilter } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { AiSkillSuggester } from './AiSkillSuggester';

export function SkillsForm() {
  const { resumeData, updateSkillCategory, addSkillCategory, removeSkillCategory, showToast } = useResume();
  const { skills, personalInfo } = resumeData;

  const [activeSubView, setActiveSubView] = useState('manager'); // 'manager' | 'ai-suggester'
  const [newSkillInput, setNewSkillInput] = useState({});
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddSkillToCategory = (catIndex, skillText) => {
    if (!skillText || !skillText.trim()) return;
    const currentCategory = skills[catIndex];
    if (currentCategory) {
      const cleanSkill = skillText.trim();
      if (!currentCategory.items.some(item => item.toLowerCase() === cleanSkill.toLowerCase())) {
        const newItems = [...currentCategory.items, cleanSkill];
        updateSkillCategory(catIndex, currentCategory.category, newItems);
        setNewSkillInput({ ...newSkillInput, [catIndex]: '' });
        showToast(`Added "${cleanSkill}" to ${currentCategory.category}`);
      } else {
        showToast(`"${cleanSkill}" is already in this category!`, 'error');
      }
    }
  };

  const handleRemoveSkillFromCategory = (catIndex, itemIndex) => {
    const currentCategory = skills[catIndex];
    if (currentCategory) {
      const newItems = currentCategory.items.filter((_, i) => i !== itemIndex);
      updateSkillCategory(catIndex, currentCategory.category, newItems);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-view Switcher Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your technical toolchains, architecture specializations, and soft skills.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-0.5 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveSubView('manager')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubView === 'manager'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>My Skills ({skills?.reduce((acc, c) => acc + (c.items?.length || 0), 0)})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('ai-suggester')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubView === 'ai-suggester'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Suggester</span>
          </button>
        </div>
      </div>

      {/* Render AI Suggester if toggled */}
      {activeSubView === 'ai-suggester' ? (
        <AiSkillSuggester onSkillsAdded={() => setActiveSubView('manager')} />
      ) : (
        <div className="space-y-6">
          
          {/* Quick AI Suggester CTA Banner */}
          <div className="p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                  Looking for in-demand skills for your target role?
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Use the AI Skill Suggester to discover trending technical and leadership skills with 1-click multi-add.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubView('ai-suggester')}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold whitespace-nowrap shadow-sm transition-colors"
            >
              Open AI Suggester
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-4">
            {skills?.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => updateSkillCategory(catIdx, e.target.value, cat.items)}
                    className="bg-transparent text-sm font-bold text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5"
                    placeholder="Category Name (e.g. Frontend, Cloud, Leadership)"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {cat.items?.length || 0} skills
                    </span>
                    <button
                      onClick={() => removeSkillCategory(catIdx)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.items?.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-medium group shadow-sm"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => handleRemoveSkillFromCategory(catIdx, itemIdx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                        title="Remove skill"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {cat.items?.length === 0 && (
                    <span className="text-xs text-slate-400 italic py-1">No skills added in this group yet.</span>
                  )}
                </div>

                {/* Add New Skill Tag Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSkillInput[catIdx] || ''}
                    onChange={(e) => setNewSkillInput({ ...newSkillInput, [catIdx]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkillToCategory(catIdx, newSkillInput[catIdx]);
                      }
                    }}
                    placeholder="Type skill & press Enter (e.g. TypeScript, PyTorch, Docker)..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleAddSkillToCategory(catIdx, newSkillInput[catIdx])}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Add
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Add New Category */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category Name (e.g. Cloud & DevOps, Leadership)..."
              className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (newCategoryName.trim()) {
                  addSkillCategory(newCategoryName.trim());
                  setNewCategoryName('');
                  showToast(`Created "${newCategoryName.trim()}" category!`);
                }
              }}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Group</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
