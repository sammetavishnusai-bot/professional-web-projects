import confetti from 'canvas-confetti';

/**
 * Advanced High-Fidelity Resume PDF Exporter
 * Clones target element at 1:1 scale to avoid zoom distortions,
 * optimizes multi-page page breaks, and provides progress states.
 */
export async function exportResumeToPdf({
  elementId = 'resume-preview-canvas',
  fileName = 'Resume.pdf',
  pageSize = 'a4',
  margin = [8, 8, 8, 8],
  onProgress = null
} = {}) {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error('Target resume element not found, falling back to window.print()');
    window.print();
    return;
  }

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.65 }
    });
  } catch (e) {}

  if (onProgress) onProgress({ step: 1, percent: 25, message: 'Preparing high-resolution document canvas...' });

  try {
    // Create an off-screen clone with exact 1:1 scale to prevent zoom distortion
    const clone = originalElement.cloneNode(true);
    clone.id = 'resume-export-clone';
    clone.style.transform = 'none';
    clone.style.margin = '0 auto';
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';
    clone.style.width = pageSize === 'letter' ? '215.9mm' : '210mm';
    clone.style.minHeight = pageSize === 'letter' ? '279.4mm' : '297mm';
    clone.classList.remove('resume-paper-shadow', 'shadow-2xl', 'shadow-xl');

    // Container for off-screen render
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = pageSize === 'letter' ? '215.9mm' : '210mm';
    container.style.zIndex = '-1000';
    container.appendChild(clone);
    document.body.appendChild(container);

    if (onProgress) onProgress({ step: 2, percent: 55, message: 'Optimizing page breaks & typography layout...' });

    // Dynamic import of html2pdf.js
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: margin, // in mm [top, left, bottom, right]
      filename: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2.5, // High resolution crisp text rendering
        useCORS: true,
        letterRendering: true,
        logging: false,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: {
        unit: 'mm',
        format: pageSize,
        orientation: 'portrait',
        compress: true
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['section', '.resume-entry', '.page-break-avoid', 'li', 'h2', 'h3']
      }
    };

    if (onProgress) onProgress({ step: 3, percent: 85, message: 'Compiling vector PDF stream...' });

    await html2pdf().set(opt).from(clone).save();

    // Clean up clone
    document.body.removeChild(container);

    if (onProgress) onProgress({ step: 4, percent: 100, message: 'PDF generated successfully!' });
    return true;
  } catch (error) {
    console.warn('html2pdf generation error, falling back to native print dialog:', error);
    if (onProgress) onProgress({ step: 4, percent: 100, message: 'Opening native print dialog...' });
    window.print();
    return false;
  }
}

export function exportResumeToJson(resumeData, fileName = 'resume-backup.json') {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName.endsWith('.json') ? fileName : `${fileName}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function copyResumeAsMarkdown(resumeData) {
  if (!resumeData) return '';
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;
  
  let md = `# ${personalInfo?.fullName || 'Candidate Name'}\n`;
  md += `**${personalInfo?.title || 'Professional Title'}**\n`;
  
  const contacts = [];
  if (personalInfo?.email) contacts.push(`Email: ${personalInfo.email}`);
  if (personalInfo?.phone) contacts.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo?.location) contacts.push(`Location: ${personalInfo.location}`);
  if (personalInfo?.website) contacts.push(`Website: ${personalInfo.website}`);
  if (personalInfo?.github) contacts.push(`GitHub: ${personalInfo.github}`);
  if (personalInfo?.linkedin) contacts.push(`LinkedIn: ${personalInfo.linkedin}`);
  
  if (contacts.length > 0) {
    md += `${contacts.join(' | ')}\n\n`;
  }

  if (personalInfo?.summary) {
    md += `## Professional Summary\n${personalInfo.summary}\n\n`;
  }

  if (skills && skills.length > 0) {
    md += `## Technical Skills\n`;
    skills.forEach(s => {
      md += `- **${s.category}:** ${(s.items || []).join(', ')}\n`;
    });
    md += `\n`;
  }

  if (experience && experience.length > 0) {
    md += `## Work Experience\n`;
    experience.forEach(exp => {
      md += `### ${exp.role} — ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n`;
      if (exp.location) md += `*${exp.location}*\n`;
      (exp.highlights || []).forEach(h => {
        md += `- ${h}\n`;
      });
      md += `\n`;
    });
  }

  if (projects && projects.length > 0) {
    md += `## Featured Projects\n`;
    projects.forEach(p => {
      md += `### ${p.title}\n`;
      if (p.subtitle) md += `*${p.subtitle}*\n`;
      if (p.description) md += `${p.description}\n`;
      if (p.techStack && p.techStack.length > 0) md += `**Technologies:** ${p.techStack.join(', ')}\n`;
      if (p.link) md += `**Live Demo:** ${p.link} `;
      if (p.github) md += `| **Source Code:** ${p.github}\n`;
      md += `\n`;
    });
  }

  if (education && education.length > 0) {
    md += `## Education\n`;
    education.forEach(edu => {
      md += `### ${edu.degree} — ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
      if (edu.gpa) md += `GPA: ${edu.gpa}\n`;
      (edu.highlights || []).forEach(h => {
        md += `- ${h}\n`;
      });
      md += `\n`;
    });
  }

  if (certifications && certifications.length > 0) {
    md += `## Certifications & Credentials\n`;
    certifications.forEach(c => {
      md += `- **${c.name}** — ${c.issuer} (${c.date})\n`;
    });
    md += `\n`;
  }

  if (languages && languages.length > 0) {
    md += `## Languages\n`;
    languages.forEach(l => {
      md += `- **${l.language}:** ${l.proficiency}\n`;
    });
    md += `\n`;
  }

  return md;
}
