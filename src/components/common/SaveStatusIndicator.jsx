import React, { useState, useEffect } from 'react';
import { Cloud, Check, RefreshCw, AlertCircle, Save, HardDrive } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function SaveStatusIndicator({ compact = false }) {
  const { lastSaved, saveStatus, saveResumeNow } = useResume();
  const [timeAgoText, setTimeAgoText] = useState('Saved just now');

  // Compute live relative time
  useEffect(() => {
    if (!lastSaved) {
      setTimeAgoText('Ready to save');
      return;
    }

    const updateRelative = () => {
      const now = Date.now();
      const savedTime = new Date(lastSaved).getTime();
      const diffSec = Math.floor((now - savedTime) / 1000);

      if (diffSec < 10) {
        setTimeAgoText('Saved just now');
      } else if (diffSec < 60) {
        setTimeAgoText(`Saved ${diffSec}s ago`);
      } else if (diffSec < 3600) {
        const mins = Math.floor(diffSec / 60);
        setTimeAgoText(`Saved ${mins}m ago`);
      } else {
        const timeFormatted = new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTimeAgoText(`Saved at ${timeFormatted}`);
      }
    };

    updateRelative();
    const interval = setInterval(updateRelative, 10000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  if (compact) {
    return (
      <div 
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 select-none"
        title={lastSaved ? `Last auto-saved: ${new Date(lastSaved).toLocaleString()}` : 'Auto-save active'}
      >
        {saveStatus === 'saving' ? (
          <>
            <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
            <span className="text-amber-600 dark:text-amber-400 font-medium">Saving...</span>
          </>
        ) : saveStatus === 'error' ? (
          <>
            <AlertCircle className="w-3 h-3 text-rose-500" />
            <span className="text-rose-500 font-medium">Save failed</span>
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{timeAgoText}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div 
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 select-none"
        title={lastSaved ? `Last auto-saved: ${new Date(lastSaved).toLocaleString()}` : 'Auto-save active'}
      >
        {saveStatus === 'saving' ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span className="text-amber-600 dark:text-amber-400 font-medium">Saving...</span>
          </>
        ) : saveStatus === 'error' ? (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-rose-500 font-medium">Save failed</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{timeAgoText}</span>
          </>
        )}
      </div>

      {/* Manual Save Trigger Button */}
      <button
        type="button"
        onClick={saveResumeNow}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
        title="Force manual save now"
      >
        <Save className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span>Save</span>
      </button>
    </div>
  );
}
