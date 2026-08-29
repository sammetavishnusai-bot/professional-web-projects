import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin, Sparkles, Check, RefreshCw } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { aiEngine } from '../../../utils/aiEngine';

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, showToast } = useResume();
  const { personalInfo } = resumeData;

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSummaries, setAiSummaries] = useState([]);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleGenerateAiSummary = () => {
    setIsAiGenerating(true);
    setShowAiModal(true);

    setTimeout(() => {
      const skillsFlat = (resumeData?.skills || []).flatMap(s => s.items);
      const results = aiEngine.generateSummaries(
        personalInfo?.title || 'Software Engineer',
        '5+',
        skillsFlat,
        'impact'
      );
      setAiSummaries(results);
      setIsAiGenerating(false);
      showToast('Generated 3 AI-optimized summaries', 'ai');
    }, 600);
  };

  const handleSelectSummary = (text) => {
    updatePersonalInfo('summary', text);
    setShowAiModal(false);
    showToast('Applied AI summary to resume!');
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Personal & Contact Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your name, professional title, contact methods, and executive summary.
          </p>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo?.fullName || ''}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="e.g. Alex Chen"
            className="w-full px-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          />
        </div>

        {/* Professional Headline */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Professional Title / Headline <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo?.title || ''}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            placeholder="e.g. Senior Full-Stack & AI Engineer"
            className="w-full px-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personalInfo?.email || ''}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="alex.chen@example.com"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="tel"
              value={personalInfo?.phone || ''}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Location / Relocation
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo?.location || ''}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA (Open to Remote)"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Portfolio / Website */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Website / Portfolio URL
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personalInfo?.website || ''}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://alexchen.dev"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            GitHub Profile
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo?.github || ''}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="https://github.com/alexchen-dev"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo?.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/alexchen"
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
            />
          </div>
        </div>

      </div>

      {/* Avatar Image URL for Creative Template */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Profile Photo Avatar URL (Used in Creative Template & Live Portfolio)
        </label>
        <input
          type="url"
          value={personalInfo?.avatar || ''}
          onChange={(e) => updatePersonalInfo('avatar', e.target.value)}
          placeholder="https://images.unsplash.com/photo-..."
          className="w-full px-3 py-2 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
        />
      </div>

      {/* Professional Summary with AI Generator Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Professional Summary
          </label>
          <button
            onClick={handleGenerateAiSummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-amber-300" />
            <span>AI Polish Summary</span>
          </button>
        </div>

        <textarea
          rows={4}
          value={personalInfo?.summary || ''}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Write a concise 2-4 sentence summary of your key expertise, years of experience, and quantifiable achievements..."
          className="w-full p-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 leading-relaxed custom-scrollbar"
        />
      </div>

      {/* AI Summary Suggestions Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/15 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Summary Recommendations</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tailored for: {personalInfo?.title || 'Engineer'}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            {isAiGenerating ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Crafting tailored ATS-optimized summaries...</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {aiSummaries.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectSummary(item.text)}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.label}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        Use This Summary
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{item.text}</p>
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
