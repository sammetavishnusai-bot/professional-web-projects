import React, { useState } from 'react';
import { 
  Briefcase, Plus, Search, Filter, ExternalLink, 
  Trash2, Edit3, CheckCircle2, Clock, XCircle, 
  Building2, MapPin, Calendar, DollarSign, LayoutList, 
  Kanban, AlertCircle, ArrowUpRight, ChevronRight, FileText
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { JobApplicationModal } from './JobApplicationModal';

export function JobApplicationTracker() {
  const { 
    jobApplications, 
    deleteJobApplication, 
    updateJobStatus, 
    showToast 
  } = useResume();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  // Status Badge Colors & Icons Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interested':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
      case 'Applied':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Assessment':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Interview':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Offer':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 font-bold';
      case 'Rejected':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      case 'Withdrawn':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600';
    }
  };

  // Dashboard Statistics
  const totalCount = jobApplications.length;
  const activeCount = jobApplications.filter(a => ['Interested', 'Applied', 'Assessment', 'Interview'].includes(a.status)).length;
  const interviewCount = jobApplications.filter(a => a.status === 'Interview').length;
  const offerCount = jobApplications.filter(a => a.status === 'Offer').length;
  const rejectedCount = jobApplications.filter(a => a.status === 'Rejected').length;

  // Filtered Applications List
  const uniqueCompanies = Array.from(new Set(jobApplications.map(a => a.company))).sort();

  const filteredApplications = jobApplications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || app.company === companyFilter;
    
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      app.company.toLowerCase().includes(q) ||
      app.jobTitle.toLowerCase().includes(q) ||
      (app.location || '').toLowerCase().includes(q) ||
      (app.notes || '').toLowerCase().includes(q);

    return matchesStatus && matchesCompany && matchesSearch;
  });

  const handleEdit = (app) => {
    setEditingApplication(app);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  // Kanban Pipeline Columns
  const kanbanColumns = [
    { id: 'Interested', title: 'Interested / Bookmarked', color: 'border-slate-400' },
    { id: 'Applied', title: 'Applied', color: 'border-blue-400' },
    { id: 'Assessment', title: 'Assessment / OA', color: 'border-purple-400' },
    { id: 'Interview', title: 'Interview Scheduled', color: 'border-amber-400' },
    { id: 'Offer', title: '🎉 Offer Received', color: 'border-emerald-400' },
    { id: 'Rejected', title: 'Rejected', color: 'border-rose-400' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Career Pipeline & Application Tracker</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Job Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Keep track of companies, submission dates, interview rounds, and recruiter notes in one synchronized pipeline.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 font-display self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Job Application</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 2. DASHBOARD METRICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Applications</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{totalCount}</span>
              <Briefcase className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Active Pipeline</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{activeCount}</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">Interviews</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{interviewCount}</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Offers Received</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{offerCount}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Rejected</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{rejectedCount}</span>
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
          </div>

        </div>

        {/* 3. FILTER, SEARCH & LAYOUT CONTROLS */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
          
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search company, job title, location, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 px-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="all">All Statuses ({totalCount})</option>
                <option value="Interested">Interested</option>
                <option value="Applied">Applied</option>
                <option value="Assessment">Assessment</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Company Filter */}
            {uniqueCompanies.length > 0 && (
              <div className="flex items-center gap-1">
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="p-1.5 px-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">All Companies</option>
                  {uniqueCompanies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

          {/* Layout Toggle: Table vs Kanban */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-end md:self-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>

            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

        </div>

        {/* 4. MAIN CONTENT AREA (TABLE OR KANBAN) */}
        {filteredApplications.length > 0 ? (
          viewMode === 'table' ? (
            
            /* Table View */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4 font-display">Company & Title</th>
                      <th className="py-3.5 px-4 font-display">Location</th>
                      <th className="py-3.5 px-4 font-display">Date Applied</th>
                      <th className="py-3.5 px-4 font-display">Status</th>
                      <th className="py-3.5 px-4 font-display">Compensation</th>
                      <th className="py-3.5 px-4 font-display">Notes</th>
                      <th className="py-3.5 px-4 font-display text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                        
                        {/* Company & Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-display text-xs shrink-0 mt-0.5">
                              {app.company[0]}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">
                                {app.company}
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                {app.jobTitle}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{app.location || 'Remote'}</span>
                          </span>
                        </td>

                        {/* Date Applied */}
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono text-[11px]">
                          {app.dateApplied || '—'}
                        </td>

                        {/* Status dropdown */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={app.status}
                            onChange={(e) => updateJobStatus(app.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${getStatusBadge(app.status)}`}
                          >
                            <option value="Interested">Interested</option>
                            <option value="Applied">Applied</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">🎉 Offer</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Withdrawn">Withdrawn</option>
                          </select>
                        </td>

                        {/* Salary */}
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono text-[11px]">
                          {app.salary || '—'}
                        </td>

                        {/* Notes */}
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-xs truncate text-[11px]">
                          {app.notes || '—'}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {app.jobUrl && (
                              <a
                                href={app.jobUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Open Job Posting URL"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}

                            <button
                              onClick={() => handleEdit(app)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Edit Application"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => deleteJobApplication(app.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            
            /* Kanban Pipeline View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
              {kanbanColumns.map((col) => {
                const colApps = filteredApplications.filter(a => a.status === col.id);
                return (
                  <div 
                    key={col.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-3 shadow-xs flex flex-col min-h-[320px]"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                        {col.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {colApps.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1">
                      {colApps.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => handleEdit(app)}
                          className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl hover:border-indigo-400/50 cursor-pointer transition-all space-y-2 group shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display group-hover:text-indigo-500 transition-colors truncate">
                              {app.company}
                            </h4>
                            {app.jobUrl && (
                              <a
                                href={app.jobUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-slate-400 hover:text-indigo-600"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                            {app.jobTitle}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                            <span>{app.location || 'Remote'}</span>
                            <span className="font-mono">{app.dateApplied}</span>
                          </div>
                        </div>
                      ))}

                      {colApps.length === 0 && (
                        <div className="p-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                          No applications
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          )
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 space-y-3">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No applications found matching your filter criteria.</p>
            <p className="text-xs">Try clearing filters or click "+ Add Job Application" to log a new position.</p>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Application</span>
            </button>
          </div>
        )}

      </div>

      {/* Add / Edit Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingApplication={editingApplication}
      />

    </div>
  );
}
