import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { sampleProfiles } from '../data/sampleProfiles';
import { calculateAtsScore } from '../utils/atsScorer';

const ResumeContext = createContext();

const LOCAL_STORAGE_KEY = 'resusphere_data_v2';
const SETTINGS_KEY = 'resusphere_settings_v2';
const LAST_SAVED_KEY = 'resusphere_last_saved_v2';
const PORTFOLIO_STORAGE_KEY = 'resusphere_portfolio_v2';
const GUIDE_STORAGE_KEY = 'resusphere_project_guide_progress_v1';
const APPLICATIONS_STORAGE_KEY = 'resusphere_job_applications_v1';

export const PALETTES = [
  { name: 'Indigo Pulse', hex: '#6366f1', rgb: '99, 102, 241', bgClass: 'bg-indigo-600' },
  { name: 'Cyber Cyan', hex: '#06b6d4', rgb: '6, 182, 212', bgClass: 'bg-cyan-500' },
  { name: 'Emerald Forest', hex: '#10b981', rgb: '16, 185, 129', bgClass: 'bg-emerald-500' },
  { name: 'Violet Neon', hex: '#8b5cf6', rgb: '139, 92, 246', bgClass: 'bg-purple-600' },
  { name: 'Sunset Amber', hex: '#f59e0b', rgb: '245, 158, 11', bgClass: 'bg-amber-500' },
  { name: 'Rose Quartz', hex: '#f43f5e', rgb: '244, 63, 94', bgClass: 'bg-rose-500' },
  { name: 'Nordic Slate', hex: '#334155', rgb: '51, 65, 85', bgClass: 'bg-slate-700' },
  { name: 'Midnight Onyx', hex: '#0f172a', rgb: '15, 23, 42', bgClass: 'bg-slate-900' }
];

export const FONTS = [
  { id: 'sans', name: 'Inter (Modern Sans)', className: 'font-sans' },
  { id: 'display', name: 'Outfit (SaaS Display)', className: 'font-display' },
  { id: 'serif', name: 'Playfair (Editorial Serif)', className: 'font-serif' },
  { id: 'mono', name: 'Fira Code (Tech / Dev)', className: 'font-mono' }
];

const DEFAULT_APPLICATIONS = [
  {
    id: 'app-1',
    company: 'Stripe',
    jobTitle: 'Frontend Engineer',
    location: 'Remote (US/India)',
    jobUrl: 'https://stripe.com/jobs',
    salary: '$135,000 - $160,000',
    dateApplied: '2026-08-22',
    status: 'Interview',
    notes: 'Completed technical screen on React Fiber. Round 2 architectural deep-dive scheduled for Friday.'
  },
  {
    id: 'app-2',
    company: 'Datadog',
    jobTitle: 'Full-Stack Software Engineer',
    location: 'Hybrid (Bengaluru / New York)',
    jobUrl: 'https://datadoghq.com/careers',
    salary: '$120,000 - $145,000',
    dateApplied: '2026-08-25',
    status: 'Assessment',
    notes: 'Submitted asynchronous coding challenge on distributed worker queues. Awaiting recruiter score.'
  },
  {
    id: 'app-3',
    company: 'Vercel',
    jobTitle: 'Next.js Developer Advocate',
    location: 'Remote',
    jobUrl: 'https://vercel.com/careers',
    salary: '$130,000 - $155,000',
    dateApplied: '2026-08-26',
    status: 'Applied',
    notes: 'Tailored resume emphasizing SSR optimization, Next.js 14 App Router, and community tutorials.'
  },
  {
    id: 'app-4',
    company: 'Linear',
    jobTitle: 'Product Software Engineer',
    location: 'San Francisco / Remote',
    jobUrl: 'https://linear.app/careers',
    salary: '$140,000 - $170,000',
    dateApplied: '2026-08-28',
    status: 'Interested',
    notes: 'Connected with Engineering Manager on LinkedIn. Preparing tailored portfolio link.'
  },
  {
    id: 'app-5',
    company: 'Cloudflare',
    jobTitle: 'Junior Systems Engineer',
    location: 'Austin, TX (Hybrid)',
    jobUrl: 'https://cloudflare.com/careers',
    salary: '$125,000 - $140,000',
    dateApplied: '2026-08-10',
    status: 'Offer',
    notes: '🎉 Received official offer letter! Reviewing compensation package and equity vesting schedule.'
  }
];

// Helper to safely sanitize and validate stored resume schema
function validateAndSanitizeResumeData(data) {
  if (!data || typeof data !== 'object') return null;
  if (!data.personalInfo || typeof data.personalInfo !== 'object') return null;

  return {
    personalInfo: {
      fullName: data.personalInfo.fullName || '',
      title: data.personalInfo.title || '',
      email: data.personalInfo.email || '',
      phone: data.personalInfo.phone || '',
      location: data.personalInfo.location || '',
      website: data.personalInfo.website || '',
      linkedin: data.personalInfo.linkedin || '',
      github: data.personalInfo.github || '',
      summary: data.personalInfo.summary || '',
      avatarUrl: data.personalInfo.avatarUrl || ''
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    languages: Array.isArray(data.languages) ? data.languages : []
  };
}

// Generate default portfolio data from resume data
function createDefaultPortfolioData(sourceResume = sampleProfiles.fullstack) {
  return {
    fullName: sourceResume.personalInfo?.fullName || 'Alex Chen',
    headline: sourceResume.personalInfo?.title || 'Senior Full-Stack & AI Engineer',
    aboutMe: sourceResume.personalInfo?.summary || 'Passionate software engineer specialized in building scalable, resilient cloud applications and intuitive AI user experiences.',
    avatarUrl: sourceResume.personalInfo?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    email: sourceResume.personalInfo?.email || 'alex.chen@craftfolio.io',
    phone: sourceResume.personalInfo?.phone || '+1 (555) 234-5678',
    location: sourceResume.personalInfo?.location || 'San Francisco, CA',
    github: sourceResume.personalInfo?.github || 'https://github.com/alexchen',
    linkedin: sourceResume.personalInfo?.linkedin || 'https://linkedin.com/in/alexchen',
    website: sourceResume.personalInfo?.website || 'https://alexchen.dev',
    skills: sourceResume.skills && sourceResume.skills.length > 0 ? sourceResume.skills : [
      { category: 'Technical Stack', items: ['React 19', 'TypeScript', 'Node.js', 'Python', 'Docker', 'AWS'] }
    ],
    education: (sourceResume.education || []).map(e => ({
      id: e.id || `edu-${Date.now()}`,
      degree: e.degree || '',
      institution: e.institution || '',
      year: `${e.startDate || ''} - ${e.endDate || ''}`.trim().replace(/^-|-$/, ''),
      gpa: e.gpa || '',
      details: (e.highlights || []).join(' • ') || ''
    })),
    projects: (sourceResume.projects || []).map(p => ({
      id: p.id || `proj-${Date.now()}`,
      title: p.title || '',
      description: p.description || '',
      techStack: Array.isArray(p.techStack) ? p.techStack : [],
      link: p.link || '',
      github: p.github || '',
      featured: p.featured !== undefined ? p.featured : true
    })),
    achievements: [
      {
        id: 'ach-1',
        title: '1st Place Winner - Global AI Hackathon',
        issuer: 'OpenAI & Google Cloud',
        year: '2024',
        description: 'Engineered an autonomous multi-agent developer system processing 10k+ code repositories.'
      },
      {
        id: 'ach-2',
        title: 'Dean\'s Honor List & Academic Excellence',
        issuer: 'UC Berkeley',
        year: '2022',
        description: 'Ranked in top 5% percentile for computer science and distributed computing coursework.'
      }
    ],
    certifications: (sourceResume.certifications || []).map(c => ({
      id: c.id || `cert-${Date.now()}`,
      name: c.name || 'AWS Certified Solutions Architect',
      issuer: c.issuer || 'Amazon Web Services',
      year: c.date || '2023',
      credentialUrl: c.link || 'https://aws.amazon.com'
    }))
  };
}

export function ResumeProvider({ children }) {
  // 1. Restore Saved Resume Data
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validated = validateAndSanitizeResumeData(parsed);
        if (validated) return validated;
      }
    } catch (e) {
      console.error('[Storage] Failed to read resume from localStorage:', e);
    }
    return sampleProfiles.fullstack;
  });

  // 2. Restore Saved Portfolio Data
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.fullName) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[Storage] Failed to read portfolio data from localStorage');
    }
    return createDefaultPortfolioData(sampleProfiles.fullstack);
  });

  // 3. Restore Project Builder Guide Progress
  const [projectGuideProgress, setProjectGuideProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(GUIDE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('[Guide] Failed to load guide progress:', e);
    }
    return {};
  });

  const [selectedGuideProjectId, setSelectedGuideProjectId] = useState('fe-bp-1');

  // 4. Restore Job Applications
  const [jobApplications, setJobApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('[Storage] Failed to load job applications:', e);
    }
    return DEFAULT_APPLICATIONS;
  });

  // Save Job Applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(jobApplications));
    } catch (e) {
      console.warn('[Storage] Failed to save job applications:', e);
    }
  }, [jobApplications]);

  // Save Project Guide Progress
  useEffect(() => {
    try {
      localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(projectGuideProgress));
    } catch (e) {
      console.warn('[Guide] Failed to save progress:', e);
    }
  }, [projectGuideProgress]);

  // 5. Restore Saved Settings
  const savedSettings = (() => {
    try {
      const settingsStr = localStorage.getItem(SETTINGS_KEY);
      if (settingsStr) return JSON.parse(settingsStr);
    } catch (e) {
      console.warn('[Storage] Failed to read settings from localStorage');
    }
    return {};
  })();

  const [activeProfileKey, setActiveProfileKey] = useState('fullstack');
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'builder' | 'portfolio' | 'roadmap' | 'projects' | 'guide' | 'interview' | 'tracker' | 'dashboard'
  const [activeTemplate, setActiveTemplate] = useState(savedSettings.activeTemplate || 'modern');
  const [portfolioTheme, setPortfolioTheme] = useState(savedSettings.portfolioTheme || 'modern-developer');
  const [accentColor, setAccentColor] = useState(savedSettings.accentColor || '#6366f1');
  const [fontFamily, setFontFamily] = useState(savedSettings.fontFamily || 'sans');
  const [spacingDensity, setSpacingDensity] = useState(savedSettings.spacingDensity || 'balanced');
  const [showPhoto, setShowPhoto] = useState(savedSettings.showPhoto !== undefined ? savedSettings.showPhoto : true);
  const [darkMode, setDarkMode] = useState(savedSettings.darkMode !== undefined ? savedSettings.darkMode : true);
  
  // Storage & Save Status Tracking
  const [lastSaved, setLastSaved] = useState(() => {
    try {
      return localStorage.getItem(LAST_SAVED_KEY) || null;
    } catch {
      return null;
    }
  });
  const [saveStatus, setSaveStatus] = useState('saved');

  // Modals & UI States
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Undo / Redo stacks
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  // Sync dark mode class with HTML element and body
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
  }, [darkMode]);

  // Sync CSS primary variable
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', accentColor);
  }, [accentColor]);

  // Persistent Settings Auto-Save
  useEffect(() => {
    try {
      const settingsObj = {
        activeTemplate,
        portfolioTheme,
        accentColor,
        fontFamily,
        spacingDensity,
        showPhoto,
        darkMode
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj));
    } catch (e) {
      console.warn('[Storage] Failed to save settings to localStorage', e);
    }
  }, [activeTemplate, portfolioTheme, accentColor, fontFamily, spacingDensity, showPhoto, darkMode]);

  // Automatic Data Persistence for Resume Data
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
        const nowIso = new Date().toISOString();
        localStorage.setItem(LAST_SAVED_KEY, nowIso);
        setLastSaved(nowIso);
        setSaveStatus('saved');
      } catch (e) {
        console.error('[Storage] Autosave failed:', e);
        setSaveStatus('error');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [resumeData]);

  // Automatic Persistence for Portfolio Data
  useEffect(() => {
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioData));
    } catch (e) {
      console.warn('[Storage] Failed to save portfolio data to localStorage', e);
    }
  }, [portfolioData]);

  // Computed Live ATS Score
  const atsScore = calculateAtsScore(resumeData);

  // Toast notification trigger
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Job Application Handlers
  const addJobApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      company: appData.company || 'Company Name',
      jobTitle: appData.jobTitle || 'Software Engineer',
      location: appData.location || 'Remote',
      jobUrl: appData.jobUrl || '',
      salary: appData.salary || '',
      dateApplied: appData.dateApplied || new Date().toISOString().split('T')[0],
      status: appData.status || 'Applied',
      notes: appData.notes || '',
      createdAt: new Date().toISOString()
    };
    setJobApplications(prev => [newApp, ...prev]);
    showToast(`Added application for ${newApp.company}!`, 'success');
    return newApp;
  };

  const updateJobApplication = (id, updatedFields) => {
    setJobApplications(prev => prev.map(a => a.id === id ? { ...a, ...updatedFields } : a));
    showToast('Updated job application details.');
  };

  const deleteJobApplication = (id) => {
    setJobApplications(prev => prev.filter(a => a.id !== id));
    showToast('Removed job application entry.', 'info');
  };

  const updateJobStatus = (id, newStatus) => {
    setJobApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToast(`Application status updated to ${newStatus}!`);
  };

  // Helper to open project in Guide
  const openProjectInGuide = (projectId) => {
    setSelectedGuideProjectId(projectId);
    setActiveView('guide');
    showToast('Opened Step-by-Step Project Builder Guide!');
  };

  // Update specific task completion in Project Guide
  const updateProjectGuideTask = (projectId, taskId, isChecked) => {
    setProjectGuideProgress(prev => {
      const projProgress = prev[projectId] || { completedTasks: {}, status: 'In Progress' };
      const newTasks = { ...(projProgress.completedTasks || {}), [taskId]: isChecked };
      return {
        ...prev,
        [projectId]: {
          ...projProgress,
          completedTasks: newTasks,
          status: projProgress.status || 'In Progress'
        }
      };
    });
  };

  // Update overall project status
  const updateProjectGuideStatus = (projectId, status) => {
    setProjectGuideProgress(prev => {
      const projProgress = prev[projectId] || { completedTasks: {} };
      return {
        ...prev,
        [projectId]: {
          ...projProgress,
          status
        }
      };
    });
    showToast(`Project marked as ${status}!`);
  };

  // State modification with History tracking
  const updateDataWithHistory = (updater) => {
    setResumeData(prev => {
      setHistory(h => [...h.slice(-15), prev]);
      setFuture([]);
      return typeof updater === 'function' ? updater(prev) : updater;
    });
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture(f => [resumeData, ...f]);
    setHistory(h => h.slice(0, -1));
    setResumeData(previous);
    showToast('Undo applied', 'info');
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory(h => [...h, resumeData]);
    setFuture(f => f.slice(1));
    setResumeData(next);
    showToast('Redo applied', 'info');
  };

  // Explicit Manual Save Action
  const saveResumeNow = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioData));
      localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(projectGuideProgress));
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(jobApplications));
      const nowIso = new Date().toISOString();
      localStorage.setItem(LAST_SAVED_KEY, nowIso);
      setLastSaved(nowIso);
      setSaveStatus('saved');
      showToast('All workspace data saved to browser storage!', 'success');
    } catch (e) {
      console.error('[Storage] Manual save failed:', e);
      setSaveStatus('error');
      showToast('Failed to save data', 'error');
    }
  };

  // Explicit Clear Resume Data Action
  const clearResumeData = (blankMode = false) => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
      localStorage.removeItem(LAST_SAVED_KEY);
      
      const blankData = {
        personalInfo: {
          fullName: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: '',
          avatarUrl: ''
        },
        experience: [],
        education: [],
        skills: [{ category: 'Technical Skills', items: [] }],
        projects: [],
        certifications: [],
        languages: []
      };

      const targetData = blankMode ? blankData : sampleProfiles.fullstack;
      
      setResumeData(targetData);
      setPortfolioData(createDefaultPortfolioData(targetData));
      setHistory([]);
      setFuture([]);
      setLastSaved(null);
      setSaveStatus('cleared');
      setIsClearModalOpen(false);
      showToast(blankMode ? 'Cleared all resume & portfolio data.' : 'Cleared edits and restored default template profile.', 'info');
    } catch (e) {
      console.error('[Storage] Failed to clear resume data:', e);
      showToast('Error clearing data', 'error');
    }
  };

  const loadProfile = (profileKey) => {
    if (sampleProfiles[profileKey]) {
      const chosen = sampleProfiles[profileKey];
      updateDataWithHistory(chosen);
      setPortfolioData(createDefaultPortfolioData(chosen));
      setActiveProfileKey(profileKey);
      showToast(`Loaded ${chosen.name}'s demo profile`);
    }
  };

  const resetResume = () => {
    updateDataWithHistory(sampleProfiles.fullstack);
    setPortfolioData(createDefaultPortfolioData(sampleProfiles.fullstack));
    showToast('Reset to default profile', 'info');
  };

  // Section Specific Resume Updaters
  const updatePersonalInfo = (field, value) => {
    updateDataWithHistory(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'High-Growth Tech Inc',
      location: 'San Francisco, CA (Remote)',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      highlights: [
        'Spearheaded the development of core distributed services, improving system throughput by 32%.',
        'Automated CI/CD pipelines reducing deployment friction and cutting release rollbacks by 45%.'
      ]
    };
    updateDataWithHistory(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
    showToast('Added new experience entry');
  };

  const updateExperience = (id, updatedFields) => {
    updateDataWithHistory(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...updatedFields } : exp)
    }));
  };

  const removeExperience = (id) => {
    updateDataWithHistory(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    showToast('Removed experience entry', 'info');
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2018',
      endDate: '2022',
      gpa: '3.85 / 4.0',
      highlights: ['Dean\'s Honors List • Relevant Coursework: Distributed Systems & Machine Learning']
    };
    updateDataWithHistory(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
    showToast('Added education entry');
  };

  const updateEducation = (id, updatedFields) => {
    updateDataWithHistory(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...updatedFields } : edu)
    }));
  };

  const removeEducation = (id) => {
    updateDataWithHistory(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    showToast('Removed education entry', 'info');
  };

  const addProject = (customProj = null) => {
    const newProj = customProj ? {
      id: customProj.id || `proj-${Date.now()}`,
      title: customProj.title || 'New Project',
      subtitle: customProj.subtitle || (Array.isArray(customProj.techStack) ? customProj.techStack.slice(0, 3).join(', ') : ''),
      description: customProj.description || '',
      techStack: Array.isArray(customProj.techStack) ? customProj.techStack : [],
      link: customProj.link || 'https://demo.io',
      github: customProj.github || 'https://github.com/username/project',
      featured: customProj.featured !== undefined ? customProj.featured : true,
      metrics: customProj.metrics || '⚡ High Impact Project'
    } : {
      id: `proj-${Date.now()}`,
      title: 'Real-Time Collaboration Engine',
      subtitle: 'WebSocket & WebAssembly High-Throughput Canvas',
      description: 'Engineered an interactive real-time visual collaboration canvas supporting 10,000+ simultaneous edits with sub-20ms synchronization latency.',
      techStack: ['React', 'TypeScript', 'WebSockets', 'WebAssembly', 'Tailwind CSS'],
      link: 'https://demo.io',
      github: 'https://github.com/username/project',
      featured: true,
      metrics: '⚡ 10k+ concurrent users • 60 FPS'
    };
    updateDataWithHistory(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
    showToast(customProj ? `Added "${newProj.title}" to Resume Projects!` : 'Added new project');
  };

  const updateProject = (id, updatedFields) => {
    updateDataWithHistory(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };

  const removeProject = (id) => {
    updateDataWithHistory(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    showToast('Removed project', 'info');
  };

  const addSkillCategory = (categoryName = 'New Technical Domain') => {
    updateDataWithHistory(prev => ({
      ...prev,
      skills: [...prev.skills, { category: categoryName, items: ['React', 'TypeScript', 'Node.js'] }]
    }));
    showToast(`Created category "${categoryName}"`);
  };

  const updateSkillCategory = (index, categoryName, items) => {
    updateDataWithHistory(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = { category: categoryName, items };
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkillCategory = (index) => {
    updateDataWithHistory(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
    showToast('Removed skill group', 'info');
  };

  const addPortfolioProject = (customProj = null) => {
    const newProj = customProj ? {
      id: customProj.id || `port-proj-${Date.now()}`,
      title: customProj.title || 'New Featured Application',
      description: customProj.description || '',
      techStack: Array.isArray(customProj.techStack) ? customProj.techStack : ['React', 'TypeScript', 'Tailwind CSS'],
      link: customProj.link || 'https://demo.io',
      github: customProj.github || 'https://github.com/username/project',
      featured: customProj.featured !== undefined ? customProj.featured : true
    } : {
      id: `proj-${Date.now()}`,
      title: 'New Featured Application',
      description: 'Built a scalable, interactive platform delivering high user performance and modern UI design.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      link: 'https://demo.io',
      github: 'https://github.com/username/project',
      featured: true
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    showToast(customProj ? `Added "${newProj.title}" to Portfolio Showcase!` : 'Added new portfolio project');
  };

  const updatePortfolioProject = (id, updatedFields) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };

  const removePortfolioProject = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    showToast('Removed portfolio project', 'info');
  };

  const importJsonData = (jsonObj) => {
    try {
      if (jsonObj && jsonObj.personalInfo) {
        updateDataWithHistory(jsonObj);
        showToast('Successfully restored resume data from JSON!');
      } else {
        showToast('Invalid JSON structure: Missing personalInfo', 'error');
      }
    } catch (e) {
      showToast('Failed to parse JSON backup', 'error');
    }
  };

  const value = {
    resumeData,
    setResumeData: updateDataWithHistory,
    portfolioData,
    setPortfolioData,
    portfolioTheme,
    setPortfolioTheme,
    selectedGuideProjectId,
    setSelectedGuideProjectId,
    openProjectInGuide,
    projectGuideProgress,
    updateProjectGuideTask,
    updateProjectGuideStatus,
    jobApplications,
    addJobApplication,
    updateJobApplication,
    deleteJobApplication,
    updateJobStatus,
    activeProfileKey,
    activeView,
    setActiveView,
    activeTemplate,
    setActiveTemplate,
    accentColor,
    setAccentColor,
    fontFamily,
    setFontFamily,
    spacingDensity,
    setSpacingDensity,
    showPhoto,
    setShowPhoto,
    darkMode,
    setDarkMode,
    lastSaved,
    saveStatus,
    saveResumeNow,
    clearResumeData,
    isClearModalOpen,
    setIsClearModalOpen,
    atsScore,
    isAtsModalOpen,
    setIsAtsModalOpen,
    isPdfModalOpen,
    setIsPdfModalOpen,
    toastMessage,
    showToast,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    loadProfile,
    resetResume,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addPortfolioProject,
    updatePortfolioProject,
    removePortfolioProject,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    importJsonData
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
