import React, { useState } from 'react';
import { 
  Globe, Smartphone, Monitor, Tablet, Copy, 
  Sparkles, RefreshCw, Layers, Edit3, Eye, 
  Palette, ExternalLink, Check, Download
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { PortfolioEditor } from './PortfolioEditor';
import { PortfolioLivePreview } from './PortfolioLivePreview';

export function PortfolioBuilder() {
  const { 
    portfolioData, 
    portfolioTheme, 
    setPortfolioTheme, 
    syncPortfolioFromResume, 
    showToast 
  } = useResume();

  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [mobileViewMode, setMobileViewMode] = useState('split'); // 'editor' | 'preview'
  const [copiedUrl, setCopiedUrl] = useState(false);

  const usernameSlug = portfolioData?.fullName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'developer';
  const customUrl = `https://${usernameSlug}.craftfolio.ai`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customUrl);
    setCopiedUrl(true);
    showToast(`Copied shareable portfolio URL: ${customUrl}`);
    setTimeout(() => setCopiedUrl(false), 2000);
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
      
      {/* Top Toolbar: URL bar, Device Simulator, and Theme Switcher */}
      <div className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        
        {/* Mock Browser URL Bar */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-slate-900 dark:text-slate-200 font-semibold">{customUrl}</span>
          <button 
            onClick={handleCopyLink}
            className="p-1 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 ml-1 transition-colors"
            title="Copy Shareable Portfolio URL"
          >
            {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          </button>
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
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Device Mode Switcher */}
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
