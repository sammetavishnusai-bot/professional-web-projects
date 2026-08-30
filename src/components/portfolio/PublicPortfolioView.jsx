import React, { useState, useEffect } from 'react';
import { 
  Globe, Github, Linkedin, Mail, ExternalLink, 
  Sparkles, Check, Copy, ArrowLeft, ShieldCheck, 
  GraduationCap, Award, Briefcase, Code, Eye, 
  CheckCircle2, AlertCircle, RefreshCw, UserCheck
} from 'lucide-react';
import { dataStorageService } from '../../services/dataStorageService';
import { useResume } from '../../context/ResumeContext';

export function PublicPortfolioView({ usernameSlug, onBackToHome }) {
  const { setActiveView, showToast } = useResume();
  const [slug, setSlug] = useState(() => {
    if (usernameSlug) return usernameSlug;
    // Check URL parameters or hash
    const hash = window.location.hash;
    if (hash.startsWith('#/portfolio/')) {
      return hash.replace('#/portfolio/', '').split('?')[0];
    }
    const params = new URLSearchParams(window.location.search);
    return params.get('portfolio') || 'alex-chen';
  });

  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function fetchPortfolio() {
      setIsLoading(true);
      setErrorStatus(null);

      const res = await dataStorageService.getPublicPortfolio(slug);
      if (res.success && res.data) {
        setPortfolio(res.data);
      } else {
        setErrorStatus(res.error || 'Portfolio is private or unpublished.');
      }
      setIsLoading(false);
    }

    fetchPortfolio();
  }, [slug]);

  const handleCopyShareLink = () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#/portfolio/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    showToast('Public portfolio link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
          <h2 className="text-lg font-bold font-display">Loading Public Portfolio...</h2>
          <p className="text-xs text-slate-400 font-mono">Fetching verified cloud records for @{slug}</p>
        </div>
      </div>
    );
  }

  // Not Found / Unpublished Error State
  if (errorStatus || !portfolio) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-xl animate-in zoom-in-95">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Portfolio Not Accessible</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              {errorStatus || 'This portfolio is currently private, unpublished, or does not exist.'}
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else setActiveView('landing');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </button>
            <button
              onClick={() => setActiveView('portfolio')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Build Your Own Public Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Portfolio Content
  const {
    fullName = 'Developer',
    headline = 'Software Engineer',
    bio = '',
    avatar = '',
    email = '',
    github = '',
    linkedin = '',
    skills = [],
    education = [],
    projects = [],
    achievements = [],
    certifications = []
  } = portfolio;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Top Verified Public Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-tight text-white font-display">ResuSphere Public Showcase</span>
            <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Verified Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyShareLink}
            className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Share Portfolio</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveView('landing')}
            className="hidden sm:inline-flex py-1.5 px-3 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all font-display"
          >
            Build Yours
          </button>
        </div>
      </header>

      {/* Main Public Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-12">
        
        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <img 
            src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
            alt={fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
              <UserCheck className="w-3.5 h-3.5" />
              <span>@{slug}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {fullName}
            </h1>
            <p className="text-sm font-medium text-slate-300 font-display">
              {headline}
            </p>
            {bio && (
              <p className="text-xs text-slate-400 leading-relaxed pt-1 max-w-xl">
                {bio}
              </p>
            )}

            {/* Social & Contact Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3">
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Contact</span>
                </a>
              )}
              {github && (
                <a 
                  href={github.startsWith('http') ? github : `https://${github}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        {skills && skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Core Engineering Skills</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((cat, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                  <h3 className="text-xs font-bold text-indigo-300 font-display">{cat.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(cat.items || []).map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects Section */}
        {projects && projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Featured Software Projects ({projects.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-3 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400">
                        {proj.github && (
                          <a 
                            href={proj.github.startsWith('http') ? proj.github : `https://${proj.github}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:text-white transition-colors"
                            title="Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.link && (
                          <a 
                            href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:text-cyan-400 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                      {proj.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Timeline */}
        {education && education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Education & Academic Background</span>
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white font-display">{edu.degree}</h3>
                    <p className="text-xs text-slate-400">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                  </div>
                  {edu.year && (
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                      {edu.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Achievements */}
        {((achievements && achievements.length > 0) || (certifications && certifications.length > 0)) && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Honors & Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(achievements || []).map((ach, idx) => (
                <div key={`ach-${idx}`} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-amber-300 font-display">{ach.title}</h3>
                    {ach.year && <span className="text-[10px] font-mono text-slate-400">{ach.year}</span>}
                  </div>
                  {ach.description && <p className="text-[11px] text-slate-400">{ach.description}</p>}
                </div>
              ))}
              {(certifications || []).map((cert, idx) => (
                <div key={`cert-${idx}`} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-display">{cert.name}</h3>
                    {cert.year && <span className="text-[10px] font-mono text-slate-400">{cert.year}</span>}
                  </div>
                  {cert.issuer && <p className="text-[11px] text-slate-400">Issued by {cert.issuer}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verified Footer */}
        <footer className="pt-10 border-t border-slate-800/80 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public portfolio verified and hosted on ResuSphere Cloud.</span>
          </div>
          <div>
            <button
              onClick={() => setActiveView('landing')}
              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Create your own AI-powered resume and portfolio on ResuSphere AI →
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
