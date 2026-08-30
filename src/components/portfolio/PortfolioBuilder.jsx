import React, { useState } from 'react';
import { 
  Globe, Smartphone, Monitor, Tablet, Copy, 
  Sparkles, RefreshCw, Layers, Edit3, Eye, 
  Palette, ExternalLink, Check, Download,
  Share2, EyeOff, Radio, Lock, ShieldCheck
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { dataStorageService } from '../../services/dataStorageService';
import { PortfolioEditor } from './PortfolioEditor';
import { PortfolioLivePreview } from './PortfolioLivePreview';

export function PortfolioBuilder() {
  const { 
    portfolioData, 
    setPortfolioData,
    portfolioTheme, 
    setPortfolioTheme, 
    showToast,
    setActiveView
  } = useResume();

  const { user } = useAuth();

  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [mobileViewMode, setMobileViewMode] = useState('split'); // 'editor' | 'preview'
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isEditingSlug, setIsEditingSlug] = useState(false);

  const defaultSlug = portfolioData?.fullName?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'developer';
  const currentSlug = portfolioData?.slug || defaultSlug;
  const [slugInput, setSlugInput] = useState(currentSlug);
  const isPublished = portfolioData?.isPublished !== false;

  const publicUrl = `${window.location.origin}${window.location.pathname}#/portfolio/${currentSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    showToast('Copied public portfolio link to clipboard!', 'success');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    const userId = user?.id || 'guest';

    if (isPublished) {
      // Unpublish
      const res = await dataStorageService.unpublishPortfolio(userId, portfolioData);
      setPortfolioData(prev => ({ ...prev, isPublished: false }));
      showToast('Portfolio has been unpublished and is now private.', 'info');
    } else {
      // Publish
      const res = await dataStorageService.publishPortfolio(userId, currentSlug, portfolioData);
      setPortfolioData(prev => ({ ...prev, isPublished: true, slug: currentSlug }));
      showToast(`Portfolio is now published live at @${currentSlug}!`, 'success');
    }

    setIsPublishing(false);
  };

  const handleSaveSlug = async () => {
    const clean = slugInput.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!clean) {
      showToast('Please enter a valid slug (letters and numbers only).', 'error');
      return;
    }

    const userId = user?.id || 'guest';
    const updated = { ...portfolioData, slug: clean };
    setPortfolioData(updated);
    if (isPublished) {
      await dataStorageService.publishPortfolio(userId, clean, updated);
    } else {
      await dataStorageService.updatePortfolio(userId, updated);
    }

    setIsEditingSlug(false);
    showToast(`Updated portfolio public username to @${clean}`, 'success');
  };

  const themes = [
    { id: 'modern-developer', label: 'Modern Developer', icon: '🚀', desc: 'Cyber Dark & Neon Glow' },
    { id: 'minimal-executive', label: 'Minimalist Clean', icon: '⚡', desc: 'Pure Monochrome Contrast' },
    { id: 'creative-studio', label: 'Creative Studio', icon: '🎨', desc: 'Vibrant Aura & Gradients' }
  ];

  const deviceWidthClasses = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] max-w-full h-[90%] rounded-3xl border-8 border-slate-800 shadow-2xl my-auto',
    mobile: 'w-[390px] max-w-full h-[90%] rounded-3xl border-8 border-slate-800 shadow-2xl my-auto'
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors">
      
      {/* Top Toolbar: Live Public URL Bar, Publishing Controls, Device Simulator & Theme Switcher */}
      <div className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        
        {/* Public URL Bar & Status Badge */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-1.5 mr-1">
            <span className={`w-2.5 h-2.5 rounded-full ${isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          </div>
          
          <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          
          {isEditingSlug ? (
            <div className="flex items-center gap-1">
              <span className="text-slate-400">/portfolio/</span>
              <input
                type="text"
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-indigo-500 rounded text-xs text-slate-900 dark:text-white font-mono focus:outline-none"
                placeholder="username"
                autoFocus
              />
              <button
                onClick={handleSaveSlug}
                className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-sans font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <span 
              onClick={() => { setSlugInput(currentSlug); setIsEditingSlug(true); }}
              className="text-slate-900 dark:text-slate-200 font-semibold cursor-pointer hover:underline"
              title="Click to edit public username / slug"
            >
              #/portfolio/{currentSlug}
            </span>
          )}

          <div className="flex items-center gap-1 ml-1 border-l border-slate-300 dark:border-slate-700 pl-1.5">
            <button 
              onClick={handleCopyLink}
              className="p-1 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              title="Copy Public Portfolio Link"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <a
              href={`#/portfolio/${currentSlug}`}
              target="_blank"
              rel="noreferrer"
              className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              title="Open Public Portfolio in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center: Theme Selector Pills */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setPortfolioTheme(t.id);
                showToast(`Switched theme to ${t.label}!`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                portfolioTheme === t.id
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Publish / Unpublish Action & Device Simulator */}
        <div className="flex items-center gap-2">
          
          {/* Publish / Unpublish Toggle Button */}
          <button
            onClick={handleTogglePublish}
            disabled={isPublishing}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 font-display ${
              isPublished 
                ? 'bg-emerald-500/10 hover:bg-rose-500/10 text-emerald-600 dark:text-emerald-400 hover:text-rose-600 border border-emerald-500/30 hover:border-rose-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
            }`}
          >
            {isPublished ? (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span>Live (Click to Unpublish)</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Publish Portfolio</span>
              </>
            )}
          </button>

          {/* Device Simulator (Desktop / Tablet / Mobile) */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-0.5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceMode === 'desktop' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Desktop 1080p View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceMode === 'tablet' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Tablet 768px View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceMode === 'mobile' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Mobile 390px View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="lg:hidden flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-full">
          <button
            onClick={() => setMobileViewMode('editor')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Portfolio Editor</span>
          </button>
          <button
            onClick={() => setMobileViewMode('preview')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileViewMode === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Portfolio Preview</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Form Editor Pane (5 Cols on large screens) */}
        <div className={`lg:col-span-5 h-full overflow-hidden ${
          mobileViewMode === 'editor' || mobileViewMode === 'split' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
        }`}>
          <PortfolioEditor />
        </div>

        {/* Right Live Preview Canvas Pane (7 Cols on large screens) */}
        <div className={`lg:col-span-7 h-full overflow-y-auto custom-scrollbar flex items-start justify-center p-0 sm:p-4 bg-slate-200/60 dark:bg-slate-950/80 ${
          mobileViewMode === 'preview' ? 'flex flex-col' : 'hidden lg:flex'
        }`}>
          <div className={`${deviceWidthClasses[deviceMode]} overflow-y-auto custom-scrollbar shadow-2xl transition-all duration-300`}>
            <PortfolioLivePreview previewMode={deviceMode} />
          </div>
        </div>

      </div>

    </div>
  );
}
