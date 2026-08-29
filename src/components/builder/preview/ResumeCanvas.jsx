import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { CanvasControls } from './CanvasControls';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';

export function ResumeCanvas() {
  const { 
    resumeData, 
    activeTemplate, 
    accentColor, 
    fontFamily, 
    spacingDensity 
  } = useResume();

  const [zoom, setZoom] = useState(100);

  const renderTemplate = () => {
    const props = {
      data: resumeData,
      accentColor,
      fontFamily,
      spacing: spacingDensity
    };

    switch (activeTemplate) {
      case 'modern':
      case 'modern-tech':
        return <ModernTemplate {...props} />;
      case 'minimal':
      case 'executive-minimal':
        return <MinimalTemplate {...props} />;
      case 'professional':
      case 'nordic-indigo':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
      case 'creative-compact':
        return <CreativeTemplate {...props} />;
      case 'executive':
      case 'serif-classic':
        return <ExecutiveTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-100 dark:bg-slate-950/80 overflow-hidden transition-colors">
      
      {/* Top Toolbar */}
      <CanvasControls zoom={zoom} setZoom={setZoom} />

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start custom-scrollbar">
        <div 
          style={{ 
            transform: `scale(${zoom / 100})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="transition-all"
        >
          {/* Printable Element Target with realistic paper drop shadow */}
          <div id="resume-preview-canvas" className="rounded-lg overflow-hidden resume-paper-shadow bg-white">
            {renderTemplate()}
          </div>
        </div>
      </div>

    </div>
  );
}
