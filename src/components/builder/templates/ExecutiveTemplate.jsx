import React from 'react';

export function ExecutiveTemplate({ data, accentColor = '#1e293b', fontFamily = 'serif', spacing = 'balanced' }) {
  if (!data) return null;
  const { personalInfo, experience = [], education = [], skills = [], projects = [], certifications = [], languages = [] } = data;

  const densityStyles = {
    compact: 'space-y-3 text-xs leading-tight',
    balanced: 'space-y-4 text-[13px] leading-normal',
    roomy: 'space-y-6 text-sm leading-relaxed'
  };

  return (
    <div className={`resume-sheet bg-[#fdfdfc] text-slate-900 p-10 max-w-[210mm] min-h-[297mm] mx-auto font-serif ${densityStyles[spacing]}`}>
      
      {/* Classic Editorial Centered Header */}
      <div className="text-center pb-3 border-b-2 border-slate-900 page-break-avoid">
        <h1 className="text-3xl font-normal tracking-wide text-slate-950 uppercase font-serif">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-sm italic text-slate-700 mt-1" style={{ color: accentColor }}>
          {personalInfo?.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-700 mt-2 font-sans">
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.email && <span>• {personalInfo.email}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin.replace('https://', '')}</span>}
          {personalInfo?.website && <span>• {personalInfo.website.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
            Executive Summary
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Executive Leadership & Experience
          </h2>

          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950 text-sm">
                    {exp.company} <span className="font-normal italic">— {exp.role}</span>
                  </span>
                  <span className="text-xs text-slate-600 font-sans">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-800">
                  {(exp.highlights || []).map((h, i) => (
                    <li key={i}>{h}</li>
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Strategic Initiatives & Works
          </h2>

          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id} className="resume-entry page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">
                    {p.title} {p.subtitle && <span className="font-normal italic text-slate-700">— {p.subtitle}</span>}
                  </span>
                  {p.metrics && <span className="text-[11px] font-sans text-slate-600">{p.metrics}</span>}
                </div>
                {p.description && <p className="text-slate-800 text-xs mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Education & Honors
          </h2>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-xs resume-entry">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="italic block text-slate-800">{edu.degree}</span>
                  {edu.highlights && (
                    <span className="text-[11px] text-slate-600 block font-sans">{edu.highlights.join(' • ')}</span>
                  )}
                </div>
                <span className="text-slate-600 font-sans">
                  {edu.startDate} – {edu.endDate} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Areas of Expertise
          </h2>

          <div className="space-y-1 text-xs">
            {skills.map((s, idx) => (
              <div key={idx} className="flex resume-entry">
                <span className="font-bold text-slate-900 w-36 shrink-0">{s.category}:</span>
                <span className="text-slate-800">{(s.items || []).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

// Alias for backward compatibility
export const SerifClassicTemplate = ExecutiveTemplate;
