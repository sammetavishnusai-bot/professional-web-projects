import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function Toast() {
  const { toastMessage } = useResume();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    ai: <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
  };

  return (
    <AnimatePresence>
      <motion.div
        key={toastMessage.id}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900/95 dark:bg-slate-900/95 text-white border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-xl max-w-md"
      >
        {icons[toastMessage.type] || icons.success}
        <span className="text-sm font-medium text-slate-100">{toastMessage.text}</span>
      </motion.div>
    </AnimatePresence>
  );
}
