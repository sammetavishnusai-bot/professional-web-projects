import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { ResumeBuilder } from './components/builder/ResumeBuilder';
import { PortfolioBuilder } from './components/portfolio/PortfolioBuilder';
import { CareerRoadmap } from './components/roadmap/CareerRoadmap';
import { ProjectGenerator } from './components/projects/ProjectGenerator';
import { ProjectBuilderGuide } from './components/projects/ProjectBuilderGuide';
import { InterviewPreparation } from './components/interview/InterviewPreparation';
import { JobApplicationTracker } from './components/tracker/JobApplicationTracker';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AtsScannerModal } from './components/ats/AtsScannerModal';
import { PdfExportModal } from './components/export/PdfExportModal';
import { ClearResumeModal } from './components/modals/ClearResumeModal';
import { AuthModal } from './components/auth/AuthModal';
import { Toast } from './components/common/Toast';

function AppContent() {
  const { activeView, setActiveView } = useResume();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      {/* Dynamic View Router */}
      <main className="flex-1 flex flex-col">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'builder' && <ResumeBuilder />}
        {activeView === 'portfolio' && <PortfolioBuilder />}
        {activeView === 'roadmap' && <CareerRoadmap />}
        {activeView === 'projects' && <ProjectGenerator />}
        {activeView === 'guide' && <ProjectBuilderGuide />}
        {activeView === 'interview' && <InterviewPreparation />}
        {activeView === 'tracker' && <JobApplicationTracker />}
        {activeView === 'dashboard' && <UserDashboard />}
      </main>

      {/* Global Modals and Notifications */}
      <AtsScannerModal />
      <PdfExportModal />
      <ClearResumeModal />
      <AuthModal onAuthSuccess={() => setActiveView('dashboard')} />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  );
}
