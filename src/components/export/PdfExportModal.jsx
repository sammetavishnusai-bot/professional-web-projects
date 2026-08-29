import React, { useState, useEffect } from 'react';
import { 
  Download, X, FileText, CheckCircle2, Printer, 
  Sparkles, RefreshCw, Settings, ShieldCheck, Layers, FileCheck
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { exportResumeToPdf } from '../../utils/pdfExport';

export function PdfExportModal() {
  const { isPdfModalOpen, setIsPdfModalOpen, resumeData, showToast } = useResume();

  const candidateName = resumeData?.personalInfo?.fullName?.trim().replace(/\s+/g, '_') || 'My_Resume';
  
  const [fileName, setFileName] = useState(`${candidateName}_Resume.pdf`);
  const [pageSize, setPageSize] = useState('a4'); // 'a4' | 'letter'
  const [marginPreset, setMarginPreset] = useState('standard'); // 'standard' | 'compact' | 'minimal'
  const [isExporting, setIsExporting] = useState(false);
  const [progressState, setProgressState] = useState({ step: 0, percent: 0, message: '' });

  // Update default file name when profile name changes
  useEffect(() => {
    if (resumeData?.personalInfo?.fullName) {
      const cleanName = resumeData.personalInfo.fullName.trim().replace(/\s+/g, '_');
      setFileName(`${cleanName}_Resume.pdf`);
    }
  }, [resumeData?.personalInfo?.fullName]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isExporting) setIsPdfModalOpen(false);
    };
    if (isPdfModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPdfModalOpen, setIsPdfModalOpen, isExporting]);

  if (!isPdfModalOpen) return null;

  const marginValues = {
    standard: [8, 8, 8, 8],
    compact: [5, 5, 5, 5],
    minimal: [3, 3, 3, 3]
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setProgressState({ step: 1, percent: 15, message: 'Initializing PDF vector renderer...' });

    const success = await exportResumeToPdf({
      elementId: 'resume-preview-canvas',
      fileName: fileName.trim() || `${candidateName}_Resume.pdf`,
      pageSize: pageSize,
      margin: marginValues[marginPreset] || [8, 8, 8, 8],
      onProgress: (prog) => {
        setProgressState(prog);
      }
    });

    setTimeout(() => {
      setIsExporting(false);
      setProgressState({ step: 0, percent: 0, message: '' });
      if (success) {
        showToast('PDF downloaded successfully! Ready for job applications.');
        setIsPdfModalOpen(false);
      }
    }, 600);
  };

  const handleDirectPrint = () => {
    setIsPdfModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const sectionsCount = [
    resumeData?.personalInfo?.fullName ? 'Personal Info' : null,
    resumeData?.personalInfo?.summary ? 'Summary' : null,
    (resumeData?.experience || []).length > 0 ? `Experience (${resumeData.experience.length})` : null,
    (resumeData?.skills || []).length > 0 ? `Skills (${resumeData.skills.length} groups)` : null,
    (resumeData?.projects || []).length > 0 ? `Projects (${resumeData.projects.length})` : null,
    (resumeData?.education || []).length > 0 ? `Education (${resumeData.education.length})` : null,
    (resumeData?.certifications || []).length > 0 ? `Certifications` : null
  ].filter(Boolean);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => !isExporting && setIsPdfModalOpen(false)}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-white relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/15 rounded-2xl border border-indigo-200 dark:border-indigo-500/30">
              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                Download Resume as PDF
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono font-semibold">
                  Vector Lossless
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate clean, unbranded, ATS-friendly documents formatted for multi-page export.
              </p>
            </div>
          </div>

          <button
            onClick={() => !isExporting && setIsPdfModalOpen(false)}
            disabled={isExporting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="space-y-4 relative z-10">
          
          {/* File Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              PDF File Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Alex_Chen_Resume.pdf"
                className="w-full pl-3 pr-12 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">.pdf</span>
            </div>
          </div>

          {/* Page Format & Margins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Paper Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Paper Standard
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-950 rounded-xl p-0.5 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setPageSize('a4')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pageSize === 'a4' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  A4 (Global)
                </button>
                <button
                  type="button"
                  onClick={() => setPageSize('letter')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pageSize === 'letter' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  US Letter (US/CA)
                </button>
              </div>
            </div>

            {/* Margin Spacing */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Page Margins
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-950 rounded-xl p-0.5 border border-slate-200 dark:border-slate-800">
                {['standard', 'compact', 'minimal'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMarginPreset(m)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      marginPreset === m 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Section Summary Checklist */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Included Resume Sections ({sectionsCount.length})
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Multi-Page Flow Protection Active
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {sectionsCount.map((s, i) => (
                <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Progress & Loading State */}
        {isExporting && (
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>{progressState.message || 'Generating PDF...'}</span>
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{progressState.percent}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${progressState.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 relative z-10">
          
          <button
            type="button"
            onClick={handleDirectPrint}
            disabled={isExporting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print via Browser</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 font-display disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Exporting Vector PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Resume as PDF</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}
