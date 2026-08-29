import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Cpu, FolderGit2, 
  Award, Undo2, Redo2, RotateCcw, Eye, Edit3, Sparkles, Wand2, 
  LayoutTemplate, ShieldCheck, Target, Save, Trash2 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { TemplateSelectorForm } from './forms/TemplateSelectorForm';
import { JobDescriptionMatcherForm } from './forms/JobDescriptionMatcherForm';
import { AtsResumeCheckerForm } from './forms/AtsResumeCheckerForm';
import { AiSummaryGeneratorForm } from './forms/AiSummaryGeneratorForm';
import { AiSkillSuggester } from './forms/AiSkillSuggester';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { ResumeCanvas } from './preview/ResumeCanvas';
import { SaveStatusIndicator } from '../common/SaveStatusIndicator';

export function ResumeBuilder() {
  const { 
    undo, redo, canUndo, canRedo, 
    resetResume, atsScore, 
    saveResumeNow, setIsClearModalOpen 
  } = useResume();
  
  const [activeTab, setActiveTab] = useState('templates');
  const [mobileTabMode, setMobileTabMode] = useState('editor'); // 'editor' | 'preview'

  const tabs = [
    { id: 'templates', label: 'Choose Template', icon: LayoutTemplate, badge: '5 Layouts' },
    { id: 'job-matcher', label: 'Job Matcher', icon: Target, badge: 'AI Match' },
    { id: 'ats-checker', label: 'ATS Checker', icon: ShieldCheck, badge: `${atsScore?.score || 0}%` },
    { id: 'summary', label: 'AI Summary Generator', icon: Wand2, badge: 'AI Pro' },
    { id: 'skills-ai', label: 'AI Skill Suggestions', icon: Sparkles, badge: 'AI Radar' },
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Stack', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'templates':
        return <TemplateSelectorForm />;
      case 'job-matcher':
        return <JobDescriptionMatcherForm />;
      case 'ats-checker':
        return <AtsResumeCheckerForm onNavigateToTab={(t) => setActiveTab(t)} />;
      case 'summary':
        return <AiSummaryGeneratorForm />;
      case 'skills-ai':
        return <AiSkillSuggester onSkillsAdded={() => setActiveTab('skills')} />;
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'education':
        return <EducationForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return <TemplateSelectorForm />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-full">
          <button
            onClick={() => setMobileTabMode('editor')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTabMode === 'editor' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Form Editor</span>
          </button>
          <button
            onClick={() => setMobileTabMode('preview')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileTabMode === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Resume Preview</span>
          </button>
        </div>
      </div>

      {/* Dual-Pane Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Form Editor Pane (5 Cols on large screens) */}
        <div className={`lg:col-span-5 flex flex-col h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 overflow-hidden ${
          mobileTabMode === 'editor' ? 'flex' : 'hidden lg:flex'
        }`}>
          
          {/* Top Tabs Bar */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 bg-slate-50/80 dark:bg-slate-950/80">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-[55%] sm:max-w-[65%] custom-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Storage Status & Actions Bar */}
            <div className="flex items-center gap-1.5 shrink-0">
              
              <div className="hidden sm:block">
                <SaveStatusIndicator compact={true} />
              </div>

              {/* Manual Save Button */}
              <button
                type="button"
                onClick={saveResumeNow}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                title="Save Resume to Browser Storage (Ctrl+S)"
              >
                <Save className="w-3.5 h-3.5" />
              </button>

              {/* Clear Resume Data Button */}
              <button
                type="button"
                onClick={() => setIsClearModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Clear Stored Resume Data..."
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* History Utilities */}
              <div className="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-1">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-30 transition-colors"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-30 transition-colors"
                  title="Redo"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Scroll Content */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-white dark:bg-slate-950">
            {renderActiveForm()}
          </div>

          {/* Bottom Nav Stepper */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                const currentIdx = tabs.findIndex(t => t.id === activeTab);
                if (currentIdx > 0) setActiveTab(tabs[currentIdx - 1].id);
              }}
              disabled={activeTab === tabs[0].id}
              className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
            >
              Previous Section
            </button>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {tabs.findIndex(t => t.id === activeTab) + 1} / {tabs.length}
            </span>
            <button
              onClick={() => {
                const currentIdx = tabs.findIndex(t => t.id === activeTab);
                if (currentIdx < tabs.length - 1) setActiveTab(tabs[currentIdx + 1].id);
              }}
              disabled={activeTab === tabs[tabs.length - 1].id}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors shadow-sm"
            >
              Next Section
            </button>
          </div>

        </div>

        {/* Right Live Preview Canvas Pane (7 Cols on large screens) */}
        <div className={`lg:col-span-7 h-full overflow-hidden ${
          mobileTabMode === 'preview' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
        }`}>
          <ResumeCanvas />
        </div>

      </div>

    </div>
  );
}
