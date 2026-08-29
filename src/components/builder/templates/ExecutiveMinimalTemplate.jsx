import React from 'react';

export function ExecutiveMinimalTemplate({ data, accentColor = '#334155', fontFamily = 'sans', spacing = 'balanced' }) {
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
    <div className={`resume-sheet bg-white text-slate-900 p-10 max-w-[210mm] min-h-[297mm] mx-auto ${fontClass} ${densityStyles[spacing]}`}>
      
      {/* Centered Minimal Header */}
      <div className="text-center pb-4 border-b border-slate-300 page-break-avoid">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: accentColor }}>
          {personalInfo?.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin.replace('https://', '')}</span>}
          {personalInfo?.website && <span>• {personalInfo.website.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            Professional Experience
          </h2>

          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950 text-[13.5px]">
                    {exp.role}, <span className="font-semibold text-slate-700">{exp.company}</span>
                  </span>
                  <span className="text-xs font-medium text-slate-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-800">
                  {(exp.highlights || []).map((h, i) => (
                    <li key={i} className="pl-0.5">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Key Initiatives & Projects
          </h2>

          <div className="space-y-2.5">
            {projects.map((p) => (
              <div key={p.id} className="resume-entry page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">
                    {p.title} {p.subtitle && <span className="font-normal text-slate-600">— {p.subtitle}</span>}
                  </span>
                  {p.metrics && <span className="text-[11px] font-semibold text-slate-600">{p.metrics}</span>}
                </div>
                {p.description && <p className="text-slate-700 text-xs mt-0.5">{p.description}</p>}
                {p.techStack && p.techStack.length > 0 && (
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    <strong>Technologies:</strong> {p.techStack.join(', ')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies */}
      {skills && skills.length > 0 && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Core Competencies & Skills
          </h2>

          <div className="space-y-1 text-xs text-slate-800">
            {skills.map((s, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold text-slate-900 w-36 shrink-0">{s.category}:</span>
                <span className="text-slate-700">{(s.items || []).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Education
          </h2>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-xs resume-entry page-break-avoid">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-700 block">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                  {edu.highlights && (
                    <span className="text-[11px] text-slate-600 block">{edu.highlights.join(' • ')}</span>
                  )}
                </div>
                <span className="font-medium text-slate-600">
                  {edu.startDate} – {edu.endDate} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Certifications
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
            {certifications.map((c) => (
              <span key={c.id}>
                <strong>{c.name}</strong> ({c.issuer}, {c.date})
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
