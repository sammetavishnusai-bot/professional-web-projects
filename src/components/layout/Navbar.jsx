import React, { useState } from 'react';
import { 
  Sparkles, FileText, Globe, CheckCircle2, 
  Sun, Moon, Download, ShieldCheck, Menu, X, 
  Users, ChevronDown, Rocket, Printer, Trash2, Save,
  User, LogIn, LogOut, LayoutDashboard, Compass, FolderGit2, BookOpen, Award, Briefcase
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { SaveStatusIndicator } from '../common/SaveStatusIndicator';

export function Navbar() {
  const { 
    activeView, setActiveView, 
    darkMode, setDarkMode, 
    atsScore, setIsAtsModalOpen,
    isPdfModalOpen, setIsPdfModalOpen,
    setIsClearModalOpen,
    activeProfileKey, loadProfile,
    saveResumeNow
  } = useResume();

  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'builder', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Globe },
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'interview', label: 'Interview', icon: Award },
    { id: 'tracker', label: 'Tracker', icon: Briefcase },
    ...(isAuthenticated ? [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1 font-display">
              ResuSphere <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-mono font-medium">AI 2.0</span>
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-medium">Career Platform</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-0.5 p-1 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-full">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md shadow-indigo-600/30 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Storage & AutoSave Status Indicator (Desktop) */}
          <div className="hidden lg:block">
            <SaveStatusIndicator compact={true} />
          </div>

          {/* Quick Demo Profiles & Storage Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfilesOpen(!isProfilesOpen)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Demos</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isProfilesOpen && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setIsProfilesOpen(false)}
              >
                <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Load Pre-Built Profiles
                </div>
                <button
                  onClick={() => { loadProfile('fullstack'); setIsProfilesOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                    activeProfileKey === 'fullstack' ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-semibold text-slate-900 dark:text-white">Alex Chen</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Senior Full-Stack & AI Engineer</span>
                </button>
                <button
                  onClick={() => { loadProfile('designer'); setIsProfilesOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                    activeProfileKey === 'designer' ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-semibold text-slate-900 dark:text-white">Elena Rostova</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Lead Product & UX Designer</span>
                </button>
                <button
                  onClick={() => { loadProfile('aiScientist'); setIsProfilesOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                    activeProfileKey === 'aiScientist' ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-semibold text-slate-900 dark:text-white">Dr. Marcus Vance</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Lead AI & ML Scientist</span>
                </button>

                <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />
                
                {/* Data Actions in Dropdown */}
                <button
                  onClick={() => { saveResumeNow(); setIsProfilesOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors font-semibold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Resume Now</span>
                </button>

                <button
                  onClick={() => { setIsClearModalOpen(true); setIsProfilesOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Stored Resume...</span>
                </button>
              </div>
            )}
          </div>

          {/* ATS Live Score Pill */}
          <button
            onClick={() => setIsAtsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 transition-all text-xs font-semibold group"
            title="Click to view ATS Analysis & Match Scanner"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>ATS: {atsScore.score}%</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Authentication Menu / Sign In Trigger */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-lg object-cover"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{user.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{user.email}</span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => { setActiveView('dashboard'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-indigo-500" />
                      <span>My Dashboard</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('builder'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Resume Studio</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('portfolio'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Globe className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Live Portfolio</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('roadmap'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Compass className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Career Roadmap</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('projects'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Rocket className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Project Generator</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('interview'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Interview Preparation</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('tracker'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Job Application Tracker</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('guide'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Project Builder Guide</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all font-display"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary Action Button */}
          {activeView === 'landing' ? (
            <button
              onClick={() => setActiveView('builder')}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 font-display"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Launch</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleOpenPdfModal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all font-display group"
                title="Download Resume as PDF"
              >
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                <span>PDF</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex flex-col gap-2">
          
          {/* Mobile Auth Status */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{user.name}</span>
                  <span className="text-[10px] text-slate-400 block">{user.email}</span>
                </div>
              </div>
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg text-xs"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-2">Load Sample Profile:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { loadProfile('fullstack'); setIsMobileMenuOpen(false); }}
                className="px-2 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-center text-slate-800 dark:text-slate-200 font-medium"
              >
                Engineer
              </button>
              <button
                onClick={() => { loadProfile('designer'); setIsMobileMenuOpen(false); }}
                className="px-2 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-center text-slate-800 dark:text-slate-200 font-medium"
              >
                Designer
              </button>
              <button
                onClick={() => { loadProfile('aiScientist'); setIsMobileMenuOpen(false); }}
                className="px-2 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-center text-slate-800 dark:text-slate-200 font-medium"
              >
                AI Scientist
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
