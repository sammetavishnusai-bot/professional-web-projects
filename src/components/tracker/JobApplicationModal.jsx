import React, { useState, useEffect } from 'react';
import { 
  X, Briefcase, Building2, MapPin, Link as LinkIcon, 
  Calendar, DollarSign, FileText, Check, AlertCircle 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function JobApplicationModal({ isOpen, onClose, editingApplication }) {
  const { addJobApplication, updateJobApplication, showToast } = useResume();

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    location: 'Remote',
    jobUrl: '',
    salary: '',
    dateApplied: new Date().toISOString().split('T')[0],
    status: 'Applied',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApplication) {
      setFormData({
        company: editingApplication.company || '',
        jobTitle: editingApplication.jobTitle || '',
        location: editingApplication.location || 'Remote',
        jobUrl: editingApplication.jobUrl || '',
        salary: editingApplication.salary || '',
        dateApplied: editingApplication.dateApplied || new Date().toISOString().split('T')[0],
        status: editingApplication.status || 'Applied',
        notes: editingApplication.notes || ''
      });
    } else {
      setFormData({
        company: '',
        jobTitle: '',
        location: 'Remote',
        jobUrl: '',
        salary: '',
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'Applied',
        notes: ''
      });
    }
    setErrors({});
  }, [editingApplication, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (editingApplication) {
      updateJobApplication(editingApplication.id, formData);
    } else {
      addJobApplication(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {editingApplication ? 'Edit Job Application' : 'Add New Job Application'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track status, recruiter notes, and interview stages.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto max-h-[75vh] custom-scrollbar">
          
          {/* Company Name & Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Company Name *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Stripe, Google, Startup"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  errors.company ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                }`}
              />
              {errors.company && <p className="text-[10px] text-rose-500">{errors.company}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                <span>Job Title *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer, SDE-1"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className={`w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  errors.jobTitle ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                }`}
              />
              {errors.jobTitle && <p className="text-[10px] text-rose-500">{errors.jobTitle}</p>}
            </div>
          </div>

          {/* Location & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Remote / Hybrid / Bengaluru"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Application Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
              >
                <option value="Interested">Interested (Bookmarked)</option>
                <option value="Applied">Applied</option>
                <option value="Assessment">Assessment (OA)</option>
                <option value="Interview">Interview Scheduled</option>
                <option value="Offer">🎉 Offer Received</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          {/* Job Posting URL & Date Applied */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Job Posting Link</span>
              </label>
              <input
                type="url"
                placeholder="https://company.com/jobs/123"
                value={formData.jobUrl}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Date Applied</span>
              </label>
              <input
                type="date"
                value={formData.dateApplied}
                onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Salary / Compensation */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
              <span>Target Salary / Compensation (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. $120,000 / ₹18 LPA"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Recruiter Notes / Interview Key Points</span>
            </label>
            <textarea
              rows={3}
              placeholder="Recruiter name, referral contact, specific interview questions asked..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 font-display"
            >
              <Check className="w-4 h-4" />
              <span>{editingApplication ? 'Save Changes' : 'Save Application'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
