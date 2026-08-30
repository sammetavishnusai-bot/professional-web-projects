import React from 'react';
import { 
  LayoutTemplate, CheckCircle2, Sparkles, ShieldCheck, 
  ArrowRight, Check, Palette, Eye, Award, Sliders
} from 'lucide-react';
import { useResume, PALETTES, FONTS } from '../../../context/ResumeContext';
import { TEMPLATES } from '../../../data/templateData';

export function TemplateSelectorForm() {
  const { 
    activeTemplate, setActiveTemplate, 
    accentColor, setAccentColor,
    fontFamily, setFontFamily,
    spacingDensity, setSpacingDensity,
    showToast 
  } = useResume();

  const handleSelectTemplate = (template) => {
    setActiveTemplate(template.id);
    showToast(`Applied "${template.name}" template layout!`, 'success');
  };

  // Helper to draw mini visual schematic wireframe for each layout
  const renderTemplateWireframe = (tplId, isSelected) => {
    const activeColor = isSelected ? accentColor : '#94a3b8';

    switch (tplId) {
      case 'modern':
      case 'modern-tech':
        return (
          <div className="w-full h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden shadow-inner text-[8px]">
            <div className="border-b-2 pb-1.5 flex justify-between items-center" style={{ borderColor: activeColor }}>
              <div className="space-y-0.5">
                <div className="w-16 h-2 rounded bg-slate-800 dark:bg-slate-200" />
                <div className="w-10 h-1.5 rounded" style={{ backgroundColor: activeColor }} />
              </div>
              <div className="w-12 h-1 rounded bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="space-y-1.5 py-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} />
                <div className="w-12 h-1.5 rounded bg-slate-700 dark:bg-slate-300" />
                <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-3/4 h-1 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="flex gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="w-6 h-2 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="w-6 h-2 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="w-6 h-2 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        );

      case 'minimal':
      case 'executive-minimal':
        return (
          <div className="w-full h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden shadow-inner text-[8px]">
            <div className="text-center pb-1.5 border-b border-slate-200 dark:border-slate-800 space-y-0.5">
              <div className="w-20 h-2 mx-auto rounded bg-slate-800 dark:bg-slate-200" />
              <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: activeColor }} />
            </div>
            <div className="space-y-1.5 py-1">
              <div className="w-14 h-1.5 rounded bg-slate-800 dark:bg-slate-200 border-b border-slate-300 dark:border-slate-700" />
              <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="w-4/5 h-1 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-1">
              <div className="w-14 h-1.5 rounded bg-slate-800 dark:bg-slate-200" />
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        );

      case 'professional':
      case 'nordic-indigo':
        return (
          <div className="w-full h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between shadow-inner text-[8px]">
            <div className="p-2 text-white flex justify-between items-center" style={{ backgroundColor: activeColor }}>
              <div className="space-y-0.5">
                <div className="w-14 h-2 rounded bg-white" />
                <div className="w-10 h-1 rounded bg-white/70" />
              </div>
              <div className="w-10 h-1 rounded bg-white/60" />
            </div>
            <div className="p-2 space-y-1.5 flex-1">
              <div className="p-1 bg-slate-50 dark:bg-slate-800 border-l-2 rounded-r" style={{ borderColor: activeColor }}>
                <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded" />
              </div>
              <div className="flex gap-1">
                <div className="flex-1 p-1 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="w-6 h-1 bg-slate-400 rounded" />
                </div>
                <div className="flex-1 p-1 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="w-6 h-1 bg-slate-400 rounded" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative':
      case 'creative-compact':
        return (
          <div className="w-full h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex shadow-inner text-[8px]">
            {/* Left 35% dark sidebar */}
            <div className="w-[35%] bg-slate-900 text-slate-300 p-2 flex flex-col justify-between border-r border-slate-800">
              <div className="space-y-1">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: activeColor }} />
                <div className="w-10 h-1.5 rounded bg-white" />
                <div className="w-8 h-1 rounded" style={{ backgroundColor: activeColor }} />
              </div>
              <div className="space-y-0.5 pt-1 border-t border-slate-800">
                <div className="w-8 h-1 rounded bg-slate-600" />
                <div className="w-6 h-1 rounded bg-slate-700" />
              </div>
            </div>
            {/* Right 65% content */}
            <div className="flex-1 p-2 space-y-1.5 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="w-12 h-1.5 rounded bg-slate-800 dark:bg-slate-200 border-b border-slate-200 dark:border-slate-800 pb-0.5" />
                <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="w-4/5 h-1 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
              <div className="space-y-1">
                <div className="w-12 h-1.5 rounded bg-slate-800 dark:bg-slate-200" />
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        );

      case 'classic':
      case 'serif-classic':
        return (
          <div className="w-full h-28 bg-[#faf8f5] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden shadow-inner text-[8px]">
            <div className="text-center pb-1.5 border-b-2 border-slate-900 dark:border-slate-100 space-y-0.5">
              <div className="w-24 h-2 mx-auto rounded bg-slate-900 dark:bg-slate-100 font-serif" />
              <div className="w-14 h-1 mx-auto rounded italic" style={{ color: activeColor }}>
                <div className="w-full h-full rounded" style={{ backgroundColor: activeColor }} />
              </div>
            </div>
            <div className="space-y-1 py-1">
              <div className="w-16 h-1.5 rounded bg-slate-900 dark:bg-slate-200 border-b border-slate-400" />
              <div className="w-full h-1 bg-slate-400 dark:bg-slate-600 rounded" />
              <div className="w-5/6 h-1 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
            <div className="space-y-1 border-t border-slate-200 dark:border-slate-800 pt-1">
              <div className="w-16 h-1.5 rounded bg-slate-900 dark:bg-slate-200" />
              <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
          </div>
        );

      case 'executive':
        return (
          <div className="w-full h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden shadow-inner text-[8px]">
            <div className="border-b pb-1.5 flex justify-between items-center" style={{ borderColor: activeColor }}>
              <div className="w-16 h-2 rounded bg-slate-900 dark:bg-slate-100" />
              <div className="w-10 h-1.5 rounded bg-slate-400" />
            </div>
            <div className="space-y-1 py-1">
              <div className="w-12 h-1.5 rounded bg-slate-800 dark:bg-slate-200" />
              <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
            <div className="flex gap-1 border-t border-slate-100 dark:border-slate-800 pt-1">
              <div className="w-8 h-1.5 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
              <LayoutTemplate className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Choose Resume Template
            </h2>
            <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
              6 Professional Architectures
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Select an ATS-engineered layout tailored to your industry. All resume data is preserved seamlessly when switching.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% ATS Verified</span>
        </div>
      </div>

      {/* 6 Template Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {TEMPLATES.map((tpl) => {
          const isSelected = activeTemplate === tpl.id || 
            (tpl.id === 'modern' && activeTemplate === 'modern-tech') ||
            (tpl.id === 'minimal' && activeTemplate === 'executive-minimal') ||
            (tpl.id === 'professional' && activeTemplate === 'nordic-indigo') ||
            (tpl.id === 'creative' && activeTemplate === 'creative-compact') ||
            (tpl.id === 'classic' && (activeTemplate === 'classic' || activeTemplate === 'serif-classic')) ||
            (tpl.id === 'executive' && activeTemplate === 'executive');

          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${
                isSelected
                  ? 'bg-indigo-50/50 dark:bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
              }`}
            >
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Left: Interactive Wireframe Preview */}
                <div className="sm:col-span-4">
                  {renderTemplateWireframe(tpl.id, isSelected)}
                </div>

                {/* Right: Info & Metadata */}
                <div className="sm:col-span-8 space-y-2.5">
                  
                  {/* Title & Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                        {tpl.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {tpl.layoutType}
                      </span>
                    </div>

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/30">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Template</span>
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Subtitle / Tagline */}
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {tpl.tagline} • <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">{tpl.atsRating}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tpl.description}
                  </p>

                  {/* Best For */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/70 p-2 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <strong className="text-slate-700 dark:text-slate-300">Best for:</strong> {tpl.bestFor}
                  </div>

                  {/* Key Feature Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.features.map((feat, fIdx) => (
                      <span key={fIdx} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700/60">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
