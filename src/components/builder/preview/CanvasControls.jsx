import React, { useRef } from 'react';
import { 
  Palette, Type, Sliders, ZoomIn, ZoomOut, 
  RotateCcw, Download, Copy, Upload, FileText, Check, Sparkles, Shield, Printer
} from 'lucide-react';
import { useResume, PALETTES, FONTS } from '../../../context/ResumeContext';
import { exportResumeToJson, copyResumeAsMarkdown } from '../../../utils/pdfExport';

export function CanvasControls({ zoom, setZoom }) {
  const {
    activeTemplate, setActiveTemplate,
    accentColor, setAccentColor,
    fontFamily, setFontFamily,
    spacingDensity, setSpacingDensity,
    resumeData, showToast,
    setIsAtsModalOpen, setIsPdfModalOpen, atsScore,
    importJsonData
  } = useResume();

  const fileInputRef = useRef(null);

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'executive', name: 'Executive' },
  ];

  const handleCopyMarkdown = () => {
    const md = copyResumeAsMarkdown(resumeData);
    navigator.clipboard.writeText(md);
    showToast('Resume copied as Markdown to clipboard!');
  };

  const handleNativePrint = () => {
    window.print();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        importJsonData(json);
      } catch (err) {
        showToast('Invalid JSON file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="canvas-controls bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs transition-colors z-20 shadow-sm">
      
      {/* Template Selector Pills */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 custom-scrollbar">
        <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1 hidden lg:inline">Template:</span>
        {templates.map((tpl) => {
          const isTplActive = activeTemplate === tpl.id ||
            (tpl.id === 'modern' && activeTemplate === 'modern-tech') ||
            (tpl.id === 'minimal' && activeTemplate === 'executive-minimal') ||
            (tpl.id === 'professional' && activeTemplate === 'nordic-indigo') ||
            (tpl.id === 'creative' && activeTemplate === 'creative-compact') ||
            (tpl.id === 'executive' && activeTemplate === 'serif-classic');

          return (
            <button
              key={tpl.id}
              onClick={() => {
                setActiveTemplate(tpl.id);
                showToast(`Applied ${tpl.name} layout!`);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                isTplActive
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {tpl.name}
            </button>
          );
        })}
      </div>

      {/* Customization Bar: Palette, Font, Spacing, Zoom, Download PDF */}
      <div className="flex items-center flex-wrap gap-2">
        
        {/* Color Swatches + Custom Picker */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
          {PALETTES.map((pal) => (
            <button
              key={pal.hex}
              onClick={() => setAccentColor(pal.hex)}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform ${
                accentColor === pal.hex ? 'scale-125 ring-2 ring-indigo-500 dark:ring-white' : 'hover:scale-110 opacity-85'
              }`}
              style={{ backgroundColor: pal.hex }}
              title={pal.name}
            />
          ))}
          <label className="cursor-pointer relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-dashed border-slate-400 dark:border-slate-500 hover:scale-110 transition-transform" title="Choose custom color">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400">+</span>
          </label>
        </div>

        {/* Font Switcher */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
        >
          {FONTS.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        {/* Spacing Controller */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
          {['compact', 'balanced', 'roomy'].map(sp => (
            <button
              key={sp}
              onClick={() => setSpacingDensity(sp)}
              className={`px-2 py-1 rounded capitalize text-[11px] font-medium transition-colors ${
                spacingDensity === sp ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <button 
            onClick={() => setZoom(z => Math.max(50, z - 10))}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-8 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(z => Math.min(130, z + 10))}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setZoom(100)}
            className="px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-300"
            title="Reset Zoom"
          >
            100%
          </button>
        </div>

        {/* Action Tools: ATS, Print, JSON, Markdown, Download PDF */}
        <div className="flex items-center gap-1.5">
          
          <button
            onClick={() => setIsAtsModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-medium"
            title="Run ATS Audit"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Audit</span>
          </button>

          <button
            onClick={handleNativePrint}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            title="Print via Browser"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            title="Copy as Markdown"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => exportResumeToJson(resumeData)}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            title="Backup JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            title="Import JSON Backup"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".json" 
            className="hidden" 
          />

          {/* Prominent Download Resume as PDF Button */}
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md shadow-indigo-600/30 transition-all font-display group ml-1"
          >
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume as PDF</span>
          </button>

        </div>

      </div>

    </div>
  );
}
