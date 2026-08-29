import React from 'react';
import { 
  User, ShieldCheck, FileText, Globe, Sparkles, 
  Download, ExternalLink, ArrowRight, CheckCircle2, 
  Clock, Database, Lock, LogOut, Copy, RefreshCw, 
  Layers, HardDrive, Key, Award, Cpu, Plus, Compass, Rocket, Briefcase 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';

export function UserDashboard() {
  const { user, logout, authProviderConfig, openAuthModal } = useAuth();
  const { 
    resumeData, 
    portfolioData, 
    activeTemplate, 
    portfolioTheme, 
    atsScore, 
    lastSaved, 
    setActiveView, 
    setIsPdfModalOpen,
    showToast 
  } = useResume();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Protected User Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please sign in to view your saved resume documents, live portfolio settings, and account profile.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all font-display"
            >
              Sign In to View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const usernameSlug = portfolioData?.fullName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'developer';
  const customUrl = `https://${usernameSlug}.craftfolio.ai`;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* Top Welcome Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] shadow-lg shrink-0">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-[14px]"
            />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                {user.name}
              </h1>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                {user.plan}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
              <span>{user.email}</span>
              <span>•</span>
              <span>Member since {user.createdAt}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveView('builder')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 font-display"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Resume Studio</span>
          </button>

          <button
            onClick={() => {
              logout();
              showToast('Signed out successfully');
            }}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Sign Out of Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Active Cloud Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Active Resume Asset Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {resumeData.personalInfo?.fullName || 'Primary'} Resume
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Template: <strong className="capitalize">{activeTemplate}</strong>
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ATS {atsScore.score}%</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-center">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {resumeData.experience?.length || 0}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Roles</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {(resumeData.skills || []).flatMap(s => s.items).length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Skills</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {resumeData.projects?.length || 0}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Projects</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3" />
                <span>{lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Auto-saved'}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => setActiveView('builder')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1"
                >
                  <span>Edit in Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Live Portfolio Asset Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {portfolioData.fullName || 'Personal'} Portfolio Site
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Theme: <strong className="capitalize">{portfolioTheme?.replace('-', ' ')}</strong>
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Ready</span>
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="truncate">{customUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(customUrl);
                  showToast('Copied portfolio URL!');
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 p-1"
                title="Copy Link"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                {(portfolioData.projects || []).length} Showcase Projects
              </span>

              <button
                onClick={() => setActiveView('portfolio')}
                className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1"
              >
                <span>Edit Portfolio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Launch Career Suite Grid */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Career Readiness Suite Navigation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setActiveView('roadmap')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Compass className="w-5 h-5 text-indigo-500" />
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">Career Roadmap</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Skill gap radar & milestone tracker</p>
            </button>

            <button
              onClick={() => setActiveView('projects')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Rocket className="w-5 h-5 text-indigo-500" />
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">Project Generator</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Proven architectural blueprints</p>
            </button>

            <button
              onClick={() => setActiveView('interview')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Award className="w-5 h-5 text-indigo-500" />
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">Interview Prep</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Role & project answer simulator</p>
            </button>

            <button
              onClick={() => setActiveView('tracker')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">Job Tracker</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Organize applications & interviews</p>
            </button>
          </div>
        </div>

        {/* Cloud Sync & Provider Architecture Status Card */}
        <div className="p-6 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-600/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  Cloud Database & Auth Architecture Status
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your workspace is decoupled and ready for continuous cloud synchronization.
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-semibold shrink-0">
              {authProviderConfig.mode}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero Plaintext Secrets</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                No credentials or passwords stored in client storage.
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Scoped User Repository</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Documents isolated per user ID ({user.id}).
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cloud Adapter Ready</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Prepared for Supabase, Firebase, or Custom JWT server.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
