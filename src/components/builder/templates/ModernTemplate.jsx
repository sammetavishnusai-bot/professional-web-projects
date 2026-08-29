import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

export function ModernTemplate({ data, accentColor = '#6366f1', fontFamily = 'sans', spacing = 'balanced' }) {
  if (!data) return null;
  const { personalInfo, experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  const densityStyles = {
    compact: 'space-y-3 text-xs leading-tight',
    balanced: 'space-y-4 text-[13px] leading-normal',
    roomy: 'space-y-6 text-sm leading-relaxed'
  };

  const fontClass = {
    sans: 'font-sans',
    display: 'font-display',
    serif: 'font-serif',
    mono: 'font-mono'
  }[fontFamily] || 'font-sans';

  return (
    <div className={`resume-sheet bg-white text-slate-800 p-8 max-w-[210mm] min-h-[297mm] mx-auto ${fontClass} ${densityStyles[spacing]}`}>
      
      {/* Header Banner */}
      <div className="border-b-2 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 page-break-avoid" style={{ borderColor: accentColor }}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <p className="text-base font-semibold mt-0.5 tracking-wide" style={{ color: accentColor }}>
            {personalInfo?.title || 'Professional Title'}
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap md:flex-col gap-1.5 text-xs text-slate-600 font-medium">
          {personalInfo?.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {personalInfo.github.replace('https://', '')}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {personalInfo.linkedin.replace('https://', '')}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="pt-1 page-break-avoid">
          <p className="text-slate-700 leading-relaxed font-normal">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Work Experience
            </h2>
            <div className="h-[2px] flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative resume-entry page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-slate-900 text-[14px]">
                    {exp.role} <span className="font-medium text-slate-600">at {exp.company}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <span className="text-[11px] text-slate-500 block mb-1.5">{exp.location}</span>
                )}
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                  {(exp.highlights || []).map((h, i) => (
                    <li key={i} className="pl-1">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Key Projects & Engineering Highlights
            </h2>
            <div className="h-[2px] flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="resume-entry page-break-avoid">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    {p.title}
                    {p.link && <ExternalLink className="w-3 h-3 text-slate-400" />}
                  </span>
                  {p.metrics && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                      {p.metrics}
                    </span>
                  )}
                </div>
                {p.description && <p className="text-slate-600 text-xs mt-0.5">{p.description}</p>}
                {p.techStack && p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section className="page-break-avoid">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Technical & Domain Competencies
            </h2>
            <div className="h-[2px] flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {skills.map((s, idx) => (
              <div key={idx} className="flex flex-col resume-entry">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                  {s.category}:
                </span>
                <span className="text-slate-600">
                  {(s.items || []).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="page-break-avoid">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Education & Honors
            </h2>
            <div className="h-[2px] flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
          </div>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start resume-entry page-break-avoid">
                <div>
                  <span className="font-bold text-slate-900 text-xs block">{edu.degree}</span>
                  <span className="text-slate-600 text-xs">{edu.institution}, {edu.location}</span>
                  {edu.highlights && (
                    <span className="text-[11px] text-slate-500 block">{edu.highlights.join(' • ')}</span>
                  )}
                </div>
                <span className="text-xs font-mono font-medium text-slate-500">
                  {edu.startDate} – {edu.endDate} {edu.gpa && `(GPA: ${edu.gpa})`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="page-break-avoid">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Certifications & Credentials
            </h2>
            <div className="h-[2px] flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700">
            {certifications.map((c) => (
              <span key={c.id} className="resume-entry">
                <strong>{c.name}</strong> ({c.issuer}, {c.date})
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

// Alias for backward compatibility
export const ModernTechTemplate = ModernTemplate;
