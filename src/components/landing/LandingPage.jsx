import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductFlowSection } from './ProductFlowSection';
import { CategoryGuideSection } from './CategoryGuideSection';
import { TargetAudienceSection } from './TargetAudienceSection';
import { HowItWorksSection } from './HowItWorksSection';
import { InteractiveTeaser } from './InteractiveTeaser';
import { TemplateShowcase } from './TemplateShowcase';
import { FaqSection } from './FaqSection';
import { Footer } from '../layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between transition-colors duration-300">
      <main className="space-y-4 sm:space-y-8">
        <HeroSection />
        <ProductFlowSection />
        <CategoryGuideSection />
        <TargetAudienceSection />
        <HowItWorksSection />
        <InteractiveTeaser />
        <TemplateShowcase />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
