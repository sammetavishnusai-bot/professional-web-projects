import React, { useState } from 'react';
import { Award, Languages, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export function CertificationsForm() {
  const { resumeData, setResumeData, showToast } = useResume();
  const certifications = resumeData.certifications || [];
  const languages = resumeData.languages || [];

  const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '' });
  const [newLang, setNewLang] = useState({ language: '', proficiency: 'Professional Working' });

  const handleAddCert = () => {
    if (!newCert.name.trim()) return;
    setResumeData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), { id: `cert-${Date.now()}`, ...newCert }]
    }));
    setNewCert({ name: '', issuer: '', date: '' });
    showToast('Added certification');
  };

  const handleRemoveCert = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(c => c.id !== id)
    }));
  };

  const handleAddLang = () => {
    if (!newLang.language.trim()) return;
    setResumeData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), { ...newLang }]
    }));
    setNewLang({ language: '', proficiency: 'Professional Working' });
    showToast('Added spoken language');
  };

  const handleRemoveLang = (index) => {
    setResumeData(prev => ({
      ...prev,
      languages: (prev.languages || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* Certifications Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Certifications & Industry Credentials
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Industry accreditations (AWS, Google, TensorFlow, etc.)
          </p>
        </div>

        {/* Existing Certs */}
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm">
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">{cert.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{cert.issuer} • {cert.date}</span>
              </div>
              <button
                onClick={() => handleRemoveCert(cert.id)}
                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Certification */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Certificate Name (e.g. AWS Solutions Architect)"
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
            className="px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Issuer (e.g. Amazon Web Services)"
            value={newCert.issuer}
            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
            className="px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="Year (e.g. 2023)"
              value={newCert.date}
              onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              className="w-24 px-2.5 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
            <button
              onClick={handleAddCert}
              className="flex-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Spoken Languages */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Spoken & Natural Languages
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Communication fluency for global & remote teams.
          </p>
        </div>

        {/* Existing Languages */}
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, idx) => (
            <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs shadow-sm">
              <span className="font-bold text-slate-900 dark:text-white">{lang.language}</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">({lang.proficiency})</span>
              <button
                onClick={() => handleRemoveLang(idx)}
                className="text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add Language */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Language (e.g. Spanish, German)..."
            value={newLang.language}
            onChange={(e) => setNewLang({ ...newLang, language: e.target.value })}
            className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <select
            value={newLang.proficiency}
            onChange={(e) => setNewLang({ ...newLang, proficiency: e.target.value })}
            className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-200 px-3 py-1.5"
          >
            <option value="Native / Bilingual">Native / Bilingual</option>
            <option value="Fluent / Full Professional">Fluent / Full Professional</option>
            <option value="Professional Working">Professional Working</option>
            <option value="Conversational">Conversational</option>
            <option value="Elementary">Elementary</option>
          </select>
          <button
            onClick={handleAddLang}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
          >
            Add
          </button>
        </div>
      </div>

    </div>
  );
}
