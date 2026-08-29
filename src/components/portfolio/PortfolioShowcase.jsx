import React, { useState } from 'react';
import { 
  Globe, Github, Linkedin, Mail, ExternalLink, 
  Sparkles, Smartphone, Monitor, Tablet, Download, 
  Send, CheckCircle2, ChevronRight, Code2, Briefcase, 
  GraduationCap, Layers, ArrowUpRight, Share2, Copy, Search
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { exportResumeToPdf } from '../../utils/pdfExport';
import { ProjectDetailModal } from './ProjectDetailModal';

export function PortfolioShowcase() {
  const { resumeData, showToast, accentColor, setIsPdfModalOpen } = useResume();
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [portfolioTheme, setPortfolioTheme] = useState('slate'); // 'slate' | 'cyber' | 'minimal' | 'sunset'
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [projectSearch, setProjectSearch] = useState('');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const usernameSlug = personalInfo?.fullName?.toLowerCase().replace(/\s+/g, '-') || 'developer';
  const customUrl = `https://${usernameSlug}.craftfolio.ai`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customUrl);
    showToast(`Copied portfolio URL: ${customUrl}`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill out all contact fields', 'error');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactForm({ name: '', email: '', message: '' });
      showToast(`Thank you ${contactForm.name}! Your message has been sent to ${personalInfo?.email || 'the developer'}.`, 'success');
    }, 700);
  };

  // Filter projects
  const filteredProjects = (projects || []).filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          (p.description || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
                          (p.techStack || []).some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
    if (projectFilter === 'all') return matchesSearch;
    if (projectFilter === 'featured') return matchesSearch && p.featured;
    return matchesSearch;
  });

  const deviceWidths = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[390px]'
  };

  const themeStyles = {
    slate: 'bg-slate-950 text-slate-100 border-slate-800',
    cyber: 'bg-[#080d1a] text-cyan-50 border-cyan-900/50',
    minimal: 'bg-white text-slate-900 border-slate-200 shadow-xl',
    sunset: 'bg-gradient-to-b from-slate-950 via-purple-950/50 to-slate-950 text-slate-100 border-purple-900/40'
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950 overflow-hidden transition-colors">
      
      {/* Top Device Simulator Toolbar & URL Bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 p-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-20 transition-colors">
        
        {/* Mock Browser URL bar */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-slate-900 dark:text-slate-200">{customUrl}</span>
          <button 
            onClick={handleCopyLink}
            className="p-1 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 ml-1 transition-colors"
            title="Copy Shareable Link"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded flex items-center gap-1 text-xs font-medium transition-colors ${
              deviceMode === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded flex items-center gap-1 text-xs font-medium transition-colors ${
              deviceMode === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded flex items-center gap-1 text-xs font-medium transition-colors ${
              deviceMode === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Portfolio Theme Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Theme:</span>
            {['slate', 'cyber', 'minimal', 'sunset'].map((t) => (
              <button
                key={t}
                onClick={() => setPortfolioTheme(t)}
                className={`px-2 py-0.5 rounded capitalize text-[11px] font-medium transition-colors ${
                  portfolioTheme === t ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-sm transition-colors"
            title="Download Resume as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume as PDF</span>
          </button>
        </div>

      </div>

      {/* Main Scrollable Device Viewport Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start custom-scrollbar">
        <div className={`transition-all duration-300 rounded-3xl shadow-2xl border ${deviceWidths[deviceMode]} ${themeStyles[portfolioTheme]} overflow-hidden`}>
          
          {/* Portfolio Hero */}
          <div className="p-8 sm:p-12 relative overflow-hidden border-b border-slate-200/50 dark:border-slate-800/80">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Avatar Photo */}
              {personalInfo?.avatar ? (
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 shadow-2xl shadow-indigo-500/20"
                  style={{ borderColor: accentColor }}
                />
              ) : (
                <div 
                  className="w-28 h-28 rounded-3xl flex items-center justify-center text-3xl font-extrabold text-white shadow-xl"
                  style={{ backgroundColor: accentColor }}
                >
                  {personalInfo?.fullName?.charAt(0) || 'A'}
                </div>
              )}

              {/* Bio & Socials */}
              <div className="flex-1 text-center md:text-left space-y-3">
                
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Full-time & High-Impact Consulting</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                  {personalInfo?.fullName || 'Your Name'}
                </h1>
                
                <p className="text-base sm:text-lg font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 font-display">
                  {personalInfo?.title || 'Professional Title'}
                </p>

                <p className="text-sm opacity-85 leading-relaxed max-w-2xl font-normal">
                  {personalInfo?.summary || 'Experienced engineering leader passionate about building scalable, resilient products.'}
                </p>

                {/* Social Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {personalInfo?.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {personalInfo?.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {personalInfo?.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-rose-500" />
                      <span>{personalInfo.email}</span>
                    </a>
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* Interactive Skills Matrix Section */}
          {skills && skills.length > 0 && (
            <div className="p-8 sm:p-12 border-b border-slate-200/50 dark:border-slate-800/80 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold font-display">Technical Expertise & Core Toolchain</h2>
                  <p className="text-xs opacity-70 mt-0.5">Categorized industry capabilities and architecture frameworks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {skills.map((cat, idx) => (
                  <div key={idx} className="p-4 bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(cat.items || []).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-xs font-medium px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects Gallery */}
          {projects && projects.length > 0 && (
            <div className="p-8 sm:p-12 border-b border-slate-200/50 dark:border-slate-800/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold font-display">Featured Projects & Case Studies</h2>
                  <p className="text-xs opacity-70 mt-0.5">Explore open-source works, live web applications, and architectures</p>
                </div>

                {/* Filter and Search */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setProjectFilter('all')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        projectFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      All ({projects.length})
                    </button>
                    <button
                      onClick={() => setProjectFilter('featured')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        projectFilter === 'featured' ? 'bg-indigo-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      Featured
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="p-5 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display">
                          {p.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
                      </div>

                      {p.subtitle && (
                        <p className="text-xs opacity-70 mt-1 font-medium">{p.subtitle}</p>
                      )}

                      <p className="text-xs opacity-85 mt-2.5 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {(p.techStack || []).slice(0, 4).map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-slate-950 text-indigo-700 dark:text-indigo-300 rounded border border-slate-200 dark:border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.metrics && (
                        <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">
                          {p.metrics}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience & Timeline */}
          {experience && experience.length > 0 && (
            <div className="p-8 sm:p-12 border-b border-slate-200/50 dark:border-slate-800/80 space-y-6">
              <div>
                <h2 className="text-xl font-extrabold font-display">Career Journey & Experience</h2>
                <p className="text-xs opacity-70 mt-0.5">Proven track record of engineering leadership and high-impact delivery</p>
              </div>

              <div className="space-y-6 border-l-2 border-slate-300 dark:border-slate-800 pl-6 ml-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 group-hover:bg-indigo-600 transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="text-sm font-bold">
                        {exp.role} <span className="text-indigo-600 dark:text-indigo-400">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono opacity-70">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                      </span>
                    </div>

                    <ul className="mt-2 space-y-1.5 text-xs opacity-85 list-disc list-inside">
                      {(exp.highlights || []).map((h, i) => (
                        <li key={i} className="leading-relaxed">{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Contact Form */}
          <div className="p-8 sm:p-12 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-extrabold font-display">Get In Touch</h2>
              <p className="text-xs opacity-70">
                Interested in working together or exploring opportunities? Send a message directly.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <textarea
                rows={4}
                placeholder="Tell me about your project, role, or questions..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Transmitting Message...' : 'Send Direct Message'}</span>
              </button>
            </form>
          </div>

          {/* Portfolio Footer */}
          <div className="p-6 bg-slate-100/80 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs opacity-60">
            © {new Date().getFullYear()} {personalInfo?.fullName || 'Developer'}. Built with ResuSphere AI.
          </div>

        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          accentColor={accentColor}
        />
      )}

    </div>
  );
}
