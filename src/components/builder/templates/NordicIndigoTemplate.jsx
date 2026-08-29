import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Award } from 'lucide-react';

export function NordicIndigoTemplate({ data, accentColor = '#4f46e5', fontFamily = 'display', spacing = 'balanced' }) {
  if (!data) return null;
  const { personalInfo, experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  const densityStyles = {
    compact: 'space-y-3 text-xs leading-tight',
    balanced: 'space-y-4 text-[13px] leading-normal',
    roomy: 'space-y-5 text-sm leading-relaxed'
  };

  const fontClass = {
    sans: 'font-sans',
    display: 'font-display',
    serif: 'font-serif',
    mono: 'font-mono'
  }[fontFamily] || 'font-display';

  return (
    <div className={`resume-sheet bg-white text-slate-800 max-w-[210mm] min-h-[297mm] mx-auto overflow-hidden ${fontClass}`}>
      
      {/* Top Stylish Accent Banner */}
      <div 
        className="p-8 text-white relative overflow-hidden page-break-avoid"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor} 0%, #1e1b4b 100%)` 
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {personalInfo?.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-medium text-indigo-100 tracking-wide mt-1">
              {personalInfo?.title || 'Professional Title'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-indigo-100">
            {personalInfo?.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-indigo-300" />{personalInfo.email}</span>}
            {personalInfo?.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-indigo-300" />{personalInfo.phone}</span>}
            {personalInfo?.location && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-indigo-300" />{personalInfo.location}</span>}
            {personalInfo?.github && <span className="flex items-center gap-1.5"><Github className="w-3 h-3 text-indigo-300" />{personalInfo.github.replace('https://', '')}</span>}
          </div>
        </div>
      </div>

      <div className={`p-8 ${densityStyles[spacing]}`}>
        
        {/* Professional Summary */}
        {personalInfo?.summary && (
          <div className="p-3.5 bg-slate-50 border-l-4 rounded-r-lg page-break-avoid" style={{ borderColor: accentColor }}>
            <p className="text-slate-700 leading-relaxed italic">
              "{personalInfo.summary}"
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Experience & Achievements
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-200 pl-3.5 ml-1 resume-entry page-break-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {exp.role} <span className="text-slate-500 font-normal">@ {exp.company}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-slate-700">
                    {(exp.highlights || []).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Skills & Tech Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((s, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 resume-entry">
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">{s.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {(s.items || []).map((item, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3 border border-slate-200 rounded-lg resume-entry page-break-avoid">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-slate-900">{p.title}</span>
                    {p.metrics && <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{p.metrics}</span>}
                  </div>
                  {p.description && <p className="text-slate-600 text-xs mt-1">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs resume-entry">
                  <span className="font-bold text-slate-900">{edu.degree} — {edu.institution}</span>
                  <span className="text-slate-500 font-mono">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
