import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

export function CreativeTemplate({ data, accentColor = '#8b5cf6', fontFamily = 'sans', spacing = 'balanced' }) {
  if (!data) return null;
  const { personalInfo, experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  const fontClass = {
    sans: 'font-sans',
    display: 'font-display',
    serif: 'font-serif',
    mono: 'font-mono'
  }[fontFamily] || 'font-sans';

  return (
    <div className={`resume-sheet bg-white text-slate-800 max-w-[210mm] min-h-[297mm] mx-auto flex flex-col md:flex-row overflow-hidden ${fontClass}`}>
      
      {/* Left Sidebar (35% Width) */}
      <div className="w-full md:w-[35%] bg-slate-900 text-slate-200 p-6 flex flex-col gap-6">
        
        {/* Personal Details */}
        <div className="page-break-avoid">
          {personalInfo?.avatar && (
            <img 
              src={personalInfo.avatar} 
              alt={personalInfo.fullName} 
              className="w-20 h-20 rounded-2xl object-cover mb-4 border-2 shadow-lg"
              style={{ borderColor: accentColor }}
            />
          )}
          <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-semibold mt-1 tracking-wide" style={{ color: accentColor }}>
            {personalInfo?.title || 'Professional Title'}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-2 text-xs text-slate-300 page-break-avoid">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
            Contact
          </h3>
          {personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{personalInfo.github.replace('https://', '')}</span>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="space-y-3 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              Skills & Stack
            </h3>
            {skills.map((s, idx) => (
              <div key={idx} className="space-y-1 resume-entry">
                <span className="text-[11px] font-bold text-slate-300 block">{s.category}</span>
                <div className="flex flex-wrap gap-1">
                  {(s.items || []).map((item, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Sidebar */}
        {education && education.length > 0 && (
          <div className="space-y-2 text-xs page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5 resume-entry">
                <span className="font-bold text-white block text-xs">{edu.degree}</span>
                <span className="text-slate-400 block text-[11px]">{edu.institution}</span>
                <span className="text-slate-500 font-mono text-[10px]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Right Main Content (65% Width) */}
      <div className="w-full md:w-[65%] p-6 space-y-5">
        
        {/* Profile Summary */}
        {personalInfo?.summary && (
          <div className="page-break-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Profile
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Work Experience
            </h3>

            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 resume-entry page-break-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-xs text-slate-900">
                      {exp.role} <span className="font-medium text-slate-500">| {exp.company}</span>
                    </span>
                    <span className="text-[10px] font-semibold font-mono text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs text-slate-700">
                    {(exp.highlights || []).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Key Projects
            </h3>

            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 resume-entry page-break-avoid">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-slate-900">{p.title}</span>
                    {p.metrics && <span className="text-[10px] font-mono text-indigo-600">{p.metrics}</span>}
                  </div>
                  {p.description && <p className="text-slate-600 text-[11px] mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Alias for backward compatibility
export const CreativeCompactTemplate = CreativeTemplate;
