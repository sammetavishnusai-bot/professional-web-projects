import React, { useState } from 'react';
import { 
  Globe, Github, Linkedin, Mail, Phone, MapPin, 
  ExternalLink, Sparkles, Send, CheckCircle2, 
  ChevronRight, Code2, Briefcase, GraduationCap, 
  Layers, ArrowUpRight, Award, User, Download, Check
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

/**
 * XSS-Safe URL Sanitizer: Blocks javascript:, data:, vbscript: URIs
 */
function safeUrl(rawUrl, defaultProtocol = 'https://') {
  if (!rawUrl || typeof rawUrl !== 'string') return '#';
  const trimmed = rawUrl.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '#';
  }
  if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:')) {
    return trimmed;
  }
  return `${defaultProtocol}${trimmed}`;
}

export function PortfolioLivePreview({ previewMode = 'desktop' }) {
  const { portfolioData, portfolioTheme, accentColor, showToast } = useResume();
  const { 
    fullName, headline, aboutMe, avatarUrl, 
    email, phone, location, github, linkedin, website,
    skills, education, projects, achievements, certifications 
  } = portfolioData || {};

  const [projectFilter, setProjectFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

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
      showToast(`Thank you ${contactForm.name}! Message sent to ${email || 'developer'}.`, 'success');
    }, 600);
  };

  const filteredProjects = (projects || []).filter(p => {
    if (projectFilter === 'featured') return p.featured;
    return true;
  });

  // Theme Styling Configurations
  const getThemeWrapperClass = () => {
    switch (portfolioTheme) {
      case 'minimal-executive':
        return 'bg-white text-slate-900 font-sans';
      case 'creative-studio':
        return 'bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 text-slate-100 font-display';
      case 'modern-developer':
      default:
        return 'bg-[#0a0f1d] text-slate-100 font-sans';
    }
  };

  const isLight = portfolioTheme === 'minimal-executive';

  const cardBg = isLight 
    ? 'bg-slate-50 border-slate-200 shadow-sm' 
    : 'bg-slate-900/80 border-slate-800 shadow-xl backdrop-blur-sm';

  const subText = isLight ? 'text-slate-600' : 'text-slate-400';
  const headingColor = isLight ? 'text-slate-900' : 'text-white';

  return (
    <div className={`w-full min-h-full transition-colors duration-300 ${getThemeWrapperClass()}`}>
      
      {/* 1. STICKY PORTFOLIO NAVBAR */}
      <nav className={`sticky top-0 z-30 px-6 py-3.5 backdrop-blur-md border-b flex items-center justify-between transition-colors ${
        isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {(fullName || 'A').charAt(0)}
          </div>
          <span className={`text-sm font-bold tracking-tight ${headingColor} font-display`}>
            {fullName || 'Developer Portfolio'}
          </span>
        </div>

        {/* Section Navigation Links */}
        <div className="hidden sm:flex items-center gap-5 text-xs font-medium">
          <a href="#about" className={`hover:text-indigo-500 transition-colors ${subText}`}>About</a>
          <a href="#skills" className={`hover:text-indigo-500 transition-colors ${subText}`}>Skills</a>
          <a href="#projects" className={`hover:text-indigo-500 transition-colors ${subText}`}>Projects</a>
          <a href="#education" className={`hover:text-indigo-500 transition-colors ${subText}`}>Education</a>
          <a href="#contact" className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-sm transition-colors">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* PORTFOLIO CONTENT SECTIONS */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 space-y-16">
        
        {/* 2. HERO SECTION */}
        <section id="hero" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            
            {/* Avatar Headshot */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 shadow-xl overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover rounded-[20px]" />
                ) : (
                  <div className="w-full h-full bg-slate-800 rounded-[20px] flex items-center justify-center text-slate-400">
                    <User className="w-12 h-12 text-slate-400" />
                  </div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" title="Available for work" />
            </div>

            {/* Hero Copy */}
            <div className="flex-1 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for New Opportunities</span>
              </div>

              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${headingColor} font-display`}>
                Hi, I'm <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">{fullName || 'Alex Chen'}</span>
              </h1>

              <p className={`text-sm sm:text-base font-semibold ${subText} max-w-xl`}>
                {headline || 'Senior Full-Stack & AI Engineer'}
              </p>

              {location && (
                <div className={`flex items-center justify-center sm:justify-start gap-1.5 text-xs ${subText}`}>
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{location}</span>
                </div>
              )}

              {/* Action Buttons & Socials */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Work</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#contact"
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  Contact Me
                </a>

                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300 dark:border-slate-800">
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" className={`p-2 rounded-lg hover:text-indigo-500 ${subText}`}>
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noreferrer" className={`p-2 rounded-lg hover:text-indigo-500 ${subText}`}>
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className={`p-2 rounded-lg hover:text-indigo-500 ${subText}`}>
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <User className="w-4 h-4" />
            </div>
            <h2 className={`text-lg font-bold ${headingColor} font-display`}>About Me</h2>
          </div>

          <div className={`p-6 rounded-3xl border ${cardBg} space-y-3`}>
            <p className={`text-xs sm:text-sm leading-relaxed ${subText}`}>
              {aboutMe || 'Welcome to my personal portfolio! I build modern, resilient web software with clean architectures, intuitive user interfaces, and scalable backend infrastructure.'}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
              <div className="text-center sm:text-left">
                <span className={`text-base font-extrabold ${headingColor} font-display`}>5+ Years</span>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Engineering</span>
              </div>
              <div className="text-center sm:text-left">
                <span className={`text-base font-extrabold ${headingColor} font-display`}>{(projects || []).length}+ Apps</span>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Shipped</span>
              </div>
              <div className="text-center sm:text-left">
                <span className={`text-base font-extrabold ${headingColor} font-display`}>99.99%</span>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Uptime Mindset</span>
              </div>
              <div className="text-center sm:text-left">
                <span className={`text-base font-extrabold ${headingColor} font-display`}>{(skills || []).flatMap(s => s.items).length}+ Tech</span>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Proficiencies</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SKILLS & TECH STACK SECTION */}
        <section id="skills" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className={`text-lg font-bold ${headingColor} font-display`}>Technical Toolchains & Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(skills || []).map((cat, idx) => (
              <div key={idx} className={`p-5 rounded-3xl border ${cardBg} space-y-3`}>
                <h3 className={`text-xs font-bold ${headingColor} uppercase tracking-wider font-display`}>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items?.map((item, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                        isLight 
                          ? 'bg-white text-slate-800 border border-slate-200 shadow-sm' 
                          : 'bg-slate-800/80 text-slate-200 border border-slate-700/80'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {(!skills || skills.length === 0) && (
            <div className={`p-8 text-center rounded-3xl border border-dashed ${cardBg} ${subText} text-xs`}>
              No skills added yet. Use the Portfolio Editor to add your core competencies.
            </div>
          )}
        </section>

        {/* 5. FEATURED PROJECTS SECTION */}
        <section id="projects" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className={`text-lg font-bold ${headingColor} font-display`}>Featured Applications & Projects</h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setProjectFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  projectFilter === 'all' ? 'bg-indigo-600 text-white' : subText
                }`}
              >
                All ({(projects || []).length})
              </button>
              <button
                onClick={() => setProjectFilter('featured')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  projectFilter === 'featured' ? 'bg-indigo-600 text-white' : subText
                }`}
              >
                Featured
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((proj, pIdx) => (
              <div 
                key={proj.id || pIdx} 
                className={`p-5 rounded-3xl border ${cardBg} flex flex-col justify-between space-y-3.5 group hover:border-indigo-500/50 transition-all`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-bold ${headingColor} group-hover:text-indigo-400 transition-colors font-display`}>
                      {proj.title}
                    </h3>
                    {proj.featured && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed ${subText}`}>
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(proj.techStack) ? proj.techStack : []).map((t, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/80">
                    {proj.link && (
                      <a
                        href={safeUrl(proj.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={safeUrl(proj.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${subText} hover:text-slate-900 dark:hover:text-white flex items-center gap-1 ml-auto`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!projects || projects.length === 0) && (
            <div className={`p-8 text-center rounded-3xl border border-dashed ${cardBg} ${subText} text-xs`}>
              No projects added yet. Click "Add Project" in the Portfolio Editor.
            </div>
          )}
        </section>

        {/* 6. EDUCATION & ACADEMICS SECTION */}
        <section id="education" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className={`text-lg font-bold ${headingColor} font-display`}>Education & Academic Credentials</h2>
          </div>

          <div className="space-y-3">
            {(education || []).map((edu, idx) => (
              <div key={edu.id || idx} className={`p-5 rounded-3xl border ${cardBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold ${headingColor} font-display`}>
                    {edu.degree}
                  </h3>
                  <p className={`text-xs ${subText} flex items-center gap-1.5`}>
                    <span>{edu.institution}</span>
                    {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                  </p>
                  {edu.details && (
                    <p className={`text-[11px] ${subText} italic`}>{edu.details}</p>
                  )}
                </div>

                {edu.year && (
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto shrink-0">
                    {edu.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. ACHIEVEMENTS & CERTIFICATIONS SECTION */}
        {((achievements && achievements.length > 0) || (certifications && certifications.length > 0)) && (
          <section id="achievements" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Award className="w-4 h-4" />
              </div>
              <h2 className={`text-lg font-bold ${headingColor} font-display`}>Honors & Certifications</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(achievements || []).map((ach, idx) => (
                <div key={ach.id || idx} className={`p-5 rounded-3xl border ${cardBg} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500">
                      {ach.year || 'Award'}
                    </span>
                    <span className="text-[11px] text-slate-500">{ach.issuer}</span>
                  </div>
                  <h3 className={`text-xs font-bold ${headingColor} font-display`}>{ach.title}</h3>
                  {ach.description && (
                    <p className={`text-[11px] ${subText}`}>{ach.description}</p>
                  )}
                </div>
              ))}

              {(certifications || []).map((cert, idx) => (
                <div key={cert.id || idx} className={`p-5 rounded-3xl border ${cardBg} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-500">
                      {cert.year || 'Verified'}
                    </span>
                    <span className="text-[11px] text-slate-500">{cert.issuer}</span>
                  </div>
                  <h3 className={`text-xs font-bold ${headingColor} font-display`}>{cert.name}</h3>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-indigo-500 hover:underline flex items-center gap-1 pt-0.5"
                    >
                      <span>Verify Credential</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. INTERACTIVE CONTACT SECTION */}
        <section id="contact" className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className={`text-lg font-bold ${headingColor} font-display`}>Get In Touch</h2>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Contact Info */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <h3 className={`text-sm font-bold ${headingColor} font-display`}>Let's build something remarkable</h3>
                  <p className={`text-xs ${subText} mt-1 leading-relaxed`}>
                    Have a project in mind or looking for technical leadership? Send a message and let's connect.
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  {email && (
                    <a href={`mailto:${email}`} className={`flex items-center gap-2.5 ${subText} hover:text-indigo-500 transition-colors`}>
                      <Mail className="w-4 h-4 text-indigo-500" />
                      <span>{email}</span>
                    </a>
                  )}
                  {phone && (
                    <div className={`flex items-center gap-2.5 ${subText}`}>
                      <Phone className="w-4 h-4 text-indigo-500" />
                      <span>{phone}</span>
                    </div>
                  )}
                  {location && (
                    <div className={`flex items-center gap-2.5 ${subText}`}>
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Working Contact Form */}
              <form onSubmit={handleContactSubmit} className="md:col-span-7 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isLight ? 'bg-white border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address *"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      isLight ? 'bg-white border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                    }`}
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="How can I help you? *"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed ${
                    isLight ? 'bg-white border border-slate-300 text-slate-900' : 'bg-slate-950 border border-slate-800 text-white'
                  }`}
                />

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <footer className={`pt-10 pb-6 border-t ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-500'} text-xs flex flex-col sm:flex-row items-center justify-between gap-3`}>
          <span>© {new Date().getFullYear()} {fullName || 'Developer'}. All rights reserved.</span>
          <span className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <span className="text-indigo-500 font-bold">ResuSphere AI</span>
          </span>
        </footer>

      </div>

    </div>
  );
}
