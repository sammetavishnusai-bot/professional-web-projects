import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Cpu, FolderGit2, 
  Award, Globe, Github, Linkedin, Mail, Phone, MapPin, 
  Plus, Trash2, X, RefreshCw, Upload, Image, Link2, 
  Sparkles, CheckCircle2, AlertCircle, Eye, FileText
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function PortfolioEditor() {
  const { 
    portfolioData, 
    updatePortfolioField, 
    syncPortfolioFromResume,
    addPortfolioProject,
    updatePortfolioProject,
    removePortfolioProject,
    addPortfolioAchievement,
    updatePortfolioAchievement,
    removePortfolioAchievement,
    addPortfolioCertification,
    updatePortfolioCertification,
    removePortfolioCertification,
    showToast 
  } = useResume();

  const [activeTab, setActiveTab] = useState('personal');
  const [newSkillText, setNewSkillText] = useState('');
  const [selectedSkillCat, setSelectedSkillCat] = useState(0);

  // Profile photo upload to base64
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size exceeds 2MB limit', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePortfolioField('avatarUrl', reader.result);
        showToast('Profile photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // URL Validator Helper
  const isValidUrl = (str) => {
    if (!str) return true; // optional
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const tabs = [
    { id: 'personal', label: 'About & Contact', icon: User },
    { id: 'skills', label: 'Skills & Stack', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: `${portfolioData?.projects?.length || 0}` },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Honors & Certs', icon: Award }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 overflow-hidden">
      
      {/* Top Header & Sync Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-950/80">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Portfolio Studio Editor
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Configure your personal website sections, achievements, and projects.
          </p>
        </div>

        <button
          type="button"
          onClick={syncPortfolioFromResume}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm transition-all flex items-center gap-1.5 shrink-0 font-display"
          title="Import information from your Resume details"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync from Resume</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 flex items-center gap-1 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Form */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        
        {/* TAB 1: PERSONAL & ABOUT */}
        {activeTab === 'personal' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            
            {/* Avatar Photo Upload Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border-2 border-indigo-500/30 shrink-0 shadow-inner">
                {portfolioData.avatarUrl ? (
                  <img src={portfolioData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">
                  Profile Photo
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Upload a headshot image (PNG, JPG, max 2MB).
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <label className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-colors flex items-center gap-1.5">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  {portfolioData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => updatePortfolioField('avatarUrl', '')}
                      className="px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={portfolioData.fullName || ''}
                  onChange={(e) => updatePortfolioField('fullName', e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Headline <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={portfolioData.headline || ''}
                  onChange={(e) => updatePortfolioField('headline', e.target.value)}
                  placeholder="e.g. Senior Full-Stack & AI Engineer"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* About Me Story */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                About Me (Portfolio Bio Summary)
              </label>
              <textarea
                rows={3}
                value={portfolioData.aboutMe || ''}
                onChange={(e) => updatePortfolioField('aboutMe', e.target.value)}
                placeholder="Tell your professional story, passion, and engineering philosophy..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Contact & Social Links */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Contact & Social Presence
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-indigo-500" />
                    <span>Contact Email</span>
                  </label>
                  <input
                    type="email"
                    value={portfolioData.email || ''}
                    onChange={(e) => updatePortfolioField('email', e.target.value)}
                    placeholder="alex.chen@example.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-indigo-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={portfolioData.phone || ''}
                    onChange={(e) => updatePortfolioField('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    <span>City & Country Location</span>
                  </label>
                  <input
                    type="text"
                    value={portfolioData.location || ''}
                    onChange={(e) => updatePortfolioField('location', e.target.value)}
                    placeholder="San Francisco, CA (Remote)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Github className="w-3 h-3 text-indigo-500" />
                    <span>GitHub Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={portfolioData.github || ''}
                    onChange={(e) => updatePortfolioField('github', e.target.value)}
                    placeholder="https://github.com/username"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isValidUrl(portfolioData.github) ? 'border-slate-300 dark:border-slate-800' : 'border-rose-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-indigo-500" />
                    <span>LinkedIn Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={portfolioData.linkedin || ''}
                    onChange={(e) => updatePortfolioField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isValidUrl(portfolioData.linkedin) ? 'border-slate-300 dark:border-slate-800' : 'border-rose-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-indigo-500" />
                    <span>Personal Website / Custom URL</span>
                  </label>
                  <input
                    type="url"
                    value={portfolioData.website || ''}
                    onChange={(e) => updatePortfolioField('website', e.target.value)}
                    placeholder="https://mywebsite.com"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isValidUrl(portfolioData.website) ? 'border-slate-300 dark:border-slate-800' : 'border-rose-500'
                    }`}
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SKILLS & STACK */}
        {activeTab === 'skills' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Portfolio Skill Categories ({portfolioData?.skills?.length || 0})
              </span>
            </div>

            <div className="space-y-3">
              {(portfolioData.skills || []).map((cat, catIdx) => (
                <div key={catIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const newSkills = [...portfolioData.skills];
                        newSkills[catIdx].category = e.target.value;
                        updatePortfolioField('skills', newSkills);
                      }}
                      className="bg-transparent text-xs font-bold text-slate-900 dark:text-white border-b border-transparent focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const newSkills = portfolioData.skills.filter((_, i) => i !== catIdx);
                        updatePortfolioField('skills', newSkills);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.items?.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => {
                            const newSkills = [...portfolioData.skills];
                            newSkills[catIdx].items = newSkills[catIdx].items.filter((_, i) => i !== itemIdx);
                            updatePortfolioField('skills', newSkills);
                          }}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add skill tag (e.g. Next.js, Docker)..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          e.preventDefault();
                          const newSkills = [...portfolioData.skills];
                          newSkills[catIdx].items = [...(newSkills[catIdx].items || []), e.target.value.trim()];
                          updatePortfolioField('skills', newSkills);
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const newSkills = [...(portfolioData.skills || []), { category: 'Domain Tools', items: ['Docker', 'AWS', 'Git'] }];
                updatePortfolioField('skills', newSkills);
              }}
              className="w-full py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill Category</span>
            </button>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                Featured Portfolio Projects ({portfolioData?.projects?.length || 0})
              </span>
              <button
                onClick={addPortfolioProject}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {(portfolioData.projects || []).map((proj, pIdx) => (
                <div key={proj.id || pIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updatePortfolioProject(proj.id, { title: e.target.value })}
                      placeholder="Project Title (e.g. AI Workflow Platform)"
                      className="bg-transparent text-sm font-bold text-slate-900 dark:text-white border-b border-transparent focus:border-indigo-500 focus:outline-none flex-1 mr-2"
                    />
                    <div className="flex items-center gap-1">
                      <label className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mr-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(proj.featured)}
                          onChange={(e) => updatePortfolioProject(proj.id, { featured: e.target.checked })}
                          className="rounded text-indigo-600 focus:ring-0"
                        />
                        <span>Featured</span>
                      </label>
                      <button
                        onClick={() => removePortfolioProject(proj.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Project Description
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updatePortfolioProject(proj.id, { description: e.target.value })}
                      placeholder="Describe what the application does, scale, architecture, and user outcomes..."
                      className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Tech Stack (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || '')}
                        onChange={(e) => {
                          const parsed = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          updatePortfolioProject(proj.id, { techStack: parsed });
                        }}
                        placeholder="React, TypeScript, Tailwind CSS"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={proj.link || ''}
                        onChange={(e) => updatePortfolioProject(proj.id, { link: e.target.value })}
                        placeholder="https://demo.app"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={proj.github || ''}
                      onChange={(e) => updatePortfolioProject(proj.id, { github: e.target.value })}
                      placeholder="https://github.com/username/project"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}

              {(!portfolioData.projects || portfolioData.projects.length === 0) && (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-xs text-slate-400">
                  No projects added yet. Click "Add Project" or "Sync from Resume" above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
              Academic Degrees & Training ({portfolioData?.education?.length || 0})
            </span>

            <div className="space-y-3">
              {(portfolioData.education || []).map((edu, eIdx) => (
                <div key={edu.id || eIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Degree / Major
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...portfolioData.education];
                          newEdu[eIdx].degree = e.target.value;
                          updatePortfolioField('education', newEdu);
                        }}
                        placeholder="B.S. in Computer Science"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        University / School
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...portfolioData.education];
                          newEdu[eIdx].institution = e.target.value;
                          updatePortfolioField('education', newEdu);
                        }}
                        placeholder="UC Berkeley"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Years / Graduation Date
                      </label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...portfolioData.education];
                          newEdu[eIdx].year = e.target.value;
                          updatePortfolioField('education', newEdu);
                        }}
                        placeholder="2018 - 2022"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        GPA / Grade (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => {
                          const newEdu = [...portfolioData.education];
                          newEdu[eIdx].gpa = e.target.value;
                          updatePortfolioField('education', newEdu);
                        }}
                        placeholder="3.85 / 4.0"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Academic Highlights / Honors
                    </label>
                    <input
                      type="text"
                      value={edu.details || ''}
                      onChange={(e) => {
                        const newEdu = [...portfolioData.education];
                        newEdu[eIdx].details = e.target.value;
                        updatePortfolioField('education', newEdu);
                      }}
                      placeholder="Dean's Honors List • Focus on Distributed Systems"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ACHIEVEMENTS & CERTIFICATIONS */}
        {activeTab === 'achievements' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Achievements Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                  Awards, Hackathons & Honors ({portfolioData?.achievements?.length || 0})
                </span>
                <button
                  onClick={addPortfolioAchievement}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Award</span>
                </button>
              </div>

              <div className="space-y-3">
                {(portfolioData.achievements || []).map((ach, aIdx) => (
                  <div key={ach.id || aIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => updatePortfolioAchievement(ach.id, { title: e.target.value })}
                        placeholder="Award Title (e.g. 1st Place AI Hackathon)"
                        className="bg-transparent text-xs font-bold text-slate-900 dark:text-white border-b border-transparent focus:border-indigo-500 focus:outline-none flex-1 mr-2"
                      />
                      <button
                        onClick={() => removePortfolioAchievement(ach.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={ach.issuer}
                        onChange={(e) => updatePortfolioAchievement(ach.id, { issuer: e.target.value })}
                        placeholder="Issuing Organization"
                        className="px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={ach.year}
                        onChange={(e) => updatePortfolioAchievement(ach.id, { year: e.target.value })}
                        placeholder="Year (e.g. 2024)"
                        className="px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <input
                      type="text"
                      value={ach.description || ''}
                      onChange={(e) => updatePortfolioAchievement(ach.id, { description: e.target.value })}
                      placeholder="Brief accomplishment context..."
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                  Professional Certifications ({portfolioData?.certifications?.length || 0})
                </span>
                <button
                  onClick={addPortfolioCertification}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Cert</span>
                </button>
              </div>

              <div className="space-y-3">
                {(portfolioData.certifications || []).map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updatePortfolioCertification(cert.id, { name: e.target.value })}
                        placeholder="Certification Name"
                        className="bg-transparent text-xs font-bold text-slate-900 dark:text-white border-b border-transparent focus:border-indigo-500 focus:outline-none flex-1 mr-2"
                      />
                      <button
                        onClick={() => removePortfolioCertification(cert.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updatePortfolioCertification(cert.id, { issuer: e.target.value })}
                        placeholder="Issuer (e.g. AWS, Coursera)"
                        className="px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => updatePortfolioCertification(cert.id, { year: e.target.value })}
                        placeholder="Year (e.g. 2023)"
                        className="px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <input
                      type="url"
                      value={cert.credentialUrl || ''}
                      onChange={(e) => updatePortfolioCertification(cert.id, { credentialUrl: e.target.value })}
                      placeholder="Verification URL (e.g. https://aws.amazon.com/...)"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
