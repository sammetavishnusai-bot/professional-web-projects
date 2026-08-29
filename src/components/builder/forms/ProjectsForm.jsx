import React, { useState } from 'react';
import { FolderGit2, Plus, Trash2, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const [expandedId, setExpandedId] = useState(projects?.[0]?.id || null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Projects & Open Source Works
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Key applications, open-source repositories, and technical portfolio items.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects?.map((p, index) => {
          const isExpanded = expandedId === p.id;
          return (
            <div key={p.id} className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              
              {/* Accordion Bar */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {p.title || 'New Project'}
                      {p.featured && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                          Featured
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm">
                      {p.subtitle || p.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(p.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Form Content */}
              {isExpanded && (
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => updateProject(p.id, { title: e.target.value })}
                        placeholder="e.g. CognitiveFlow"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subtitle / Architectural Highlight</label>
                      <input
                        type="text"
                        value={p.subtitle || ''}
                        onChange={(e) => updateProject(p.id, { subtitle: e.target.value })}
                        placeholder="e.g. Real-Time Generative AI Orchestration Engine"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={p.link || ''}
                        onChange={(e) => updateProject(p.id, { link: e.target.value })}
                        placeholder="https://myproject.demo.io"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub / Code URL</label>
                      <input
                        type="text"
                        value={p.github || ''}
                        onChange={(e) => updateProject(p.id, { github: e.target.value })}
                        placeholder="https://github.com/username/project"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tech Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={p.techStack?.join(', ') || ''}
                      onChange={(e) => updateProject(p.id, { 
                        techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                      })}
                      placeholder="React, TypeScript, FastAPI, Redis, Pinecone"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Metrics / Proof Badge</label>
                    <input
                      type="text"
                      value={p.metrics || ''}
                      onChange={(e) => updateProject(p.id, { metrics: e.target.value })}
                      placeholder="e.g. ⭐ 3.2k GitHub Stars • 45k monthly downloads"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description & Architecture Notes</label>
                    <textarea
                      rows={3}
                      value={p.description}
                      onChange={(e) => updateProject(p.id, { description: e.target.value })}
                      placeholder="Describe what problem this solves, key technical hurdles overcome, and architecture patterns used..."
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                    />
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
