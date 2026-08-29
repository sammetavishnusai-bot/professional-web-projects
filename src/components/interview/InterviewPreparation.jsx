import React, { useState, useEffect } from 'react';
import { 
  Award, Target, CheckCircle2, Circle, AlertCircle, 
  HelpCircle, ChevronLeft, ChevronRight, Sparkles, 
  BookOpen, Layers, FolderGit2, ShieldCheck, Clock, 
  Check, ArrowRight, UserCheck, MessageSquare, RotateCcw,
  Search, Filter, Edit3, Save, Compass
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { ROLE_INTERVIEW_QUESTIONS, generateDynamicProjectQuestions } from '../../data/interviewQuestionsData';

const INTERVIEW_STORAGE_KEY = 'resusphere_interview_prep_progress_v1';

export function InterviewPreparation() {
  const { resumeData, portfolioData, showToast } = useResume();

  const [selectedRole, setSelectedRole] = useState('frontend');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'technical' | 'project' | 'behavioral' | 'resume'
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('simulator'); // 'simulator' | 'browser'

  // Practice state: { [qId]: { status: 'practiced' | 'needs-review' | 'unpracticed', userNotes: string, date: string } }
  const [practiceProgress, setPracticeProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(INTERVIEW_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('[Interview] Failed to load practice progress:', e);
    }
    return {};
  });

  // Save practice state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(INTERVIEW_STORAGE_KEY, JSON.stringify(practiceProgress));
    } catch (e) {
      console.warn('[Interview] Failed to save practice progress:', e);
    }
  }, [practiceProgress]);

  // Combine static role questions + dynamic project questions
  const userProjects = [...(resumeData.projects || []), ...(portfolioData.projects || [])];
  // Deduplicate projects by title
  const uniqueProjects = Array.from(new Map(userProjects.map(p => [p.title, p])).values());

  const staticRoleQuestions = ROLE_INTERVIEW_QUESTIONS[selectedRole] || ROLE_INTERVIEW_QUESTIONS.frontend;
  const dynamicProjectQuestions = generateDynamicProjectQuestions(uniqueProjects);

  const allQuestions = [...staticRoleQuestions, ...dynamicProjectQuestions];

  // Filter questions based on category and search
  const filteredQuestions = allQuestions.filter(q => {
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      q.question.toLowerCase().includes(query) ||
      (q.whyInterviewerAsks || '').toLowerCase().includes(query) ||
      (q.projectName || '').toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  const activeQuestion = filteredQuestions[activeQuestionIndex] || filteredQuestions[0] || allQuestions[0];

  // Compute Practice Statistics
  const totalQuestionsCount = allQuestions.length;
  const practicedCount = allQuestions.filter(q => practiceProgress[q.id]?.status === 'practiced').length;
  const needsReviewCount = allQuestions.filter(q => practiceProgress[q.id]?.status === 'needs-review').length;
  const remainingCount = totalQuestionsCount - practicedCount;
  const prepPercentage = totalQuestionsCount > 0 ? Math.round((practicedCount / totalQuestionsCount) * 100) : 0;

  // Weak area questions (flagged needs-review or unpracticed)
  const weakQuestions = allQuestions.filter(q => {
    const status = practiceProgress[q.id]?.status;
    return status === 'needs-review' || !status;
  });

  const handleUpdateStatus = (questionId, newStatus) => {
    setPracticeProgress(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        status: newStatus,
        date: new Date().toISOString()
      }
    }));
    const text = newStatus === 'practiced' ? 'Practiced & Mastered' : newStatus === 'needs-review' ? 'Flagged for Review' : 'Marked Unpracticed';
    showToast(`Question marked as ${text}!`);
  };

  const handleUpdateNotes = (questionId, notes) => {
    setPracticeProgress(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        userNotes: notes,
        status: prev[questionId]?.status || 'needs-review',
        date: new Date().toISOString()
      }
    }));
  };

  const currentQProgress = practiceProgress[activeQuestion?.id] || { status: 'unpracticed', userNotes: '' };

  const rolesList = [
    { id: 'frontend', label: 'Frontend Developer' },
    { id: 'backend', label: 'Backend Developer' },
    { id: 'fullstack', label: 'Full Stack Developer' },
    { id: 'python', label: 'Python Developer' },
    { id: 'data-analyst', label: 'Data Analyst' },
    { id: 'java', label: 'Java Developer' },
    { id: 'ui-ux', label: 'UI/UX Designer' }
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Questions', count: allQuestions.length },
    { id: 'technical', label: 'Technical', count: allQuestions.filter(q => q.category === 'technical').length },
    { id: 'project', label: 'Project-Specific', count: dynamicProjectQuestions.length },
    { id: 'behavioral', label: 'HR / Behavioral', count: allQuestions.filter(q => q.category === 'behavioral').length },
    { id: 'resume', label: 'Resume Deep-Dive', count: allQuestions.filter(q => q.category === 'resume').length }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 space-y-8 custom-scrollbar">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-6xl mx-auto space-y-3 text-center sm:text-left pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
          <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>B.Tech & Fresher Interview Readiness Simulator</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
          Interview Preparation & Answer Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Master technical screeners, behavioral scenarios, and project deep-dives tailored to your active resume skills and projects.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 2. ROLE & PROGRESS METRICS BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Target Role Selector (7 cols) */}
          <div className="lg:col-span-7 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">
              Target Interview Role
            </span>

            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
              {rolesList.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setActiveQuestionIndex(0);
                    showToast(`Loaded interview track: ${role.label}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedRole === role.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Tracker Card (5 cols) */}
          <div className="lg:col-span-5 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Overall Readiness Score</span>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {prepPercentage}% Prepared
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${prepPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px]">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{totalQuestionsCount}</span>
                <span className="text-[10px] text-slate-400">Total Questions</span>
              </div>
              <div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{practicedCount}</span>
                <span className="text-[10px] text-slate-400">Practiced</span>
              </div>
              <div>
                <span className="font-bold text-amber-600 dark:text-amber-400 block">{remainingCount}</span>
                <span className="text-[10px] text-slate-400">Remaining</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. CATEGORY & VIEW CONTROLS */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setActiveQuestionIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search interview questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveQuestionIndex(0);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* 4. MAIN INTERACTIVE PRACTICE SIMULATOR CARD */}
        {filteredQuestions.length > 0 ? (
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
            
            {/* Top Navigation & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  {activeQuestion.category} Question
                </span>

                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeQuestion.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' :
                  activeQuestion.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' :
                  'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                }`}>
                  {activeQuestion.difficulty}
                </span>

                {activeQuestion.projectName && (
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3" />
                    <span>{activeQuestion.projectName}</span>
                  </span>
                )}
              </div>

              {/* Question Stepper & Action buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {activeQuestionIndex + 1} of {filteredQuestions.length}
                </span>

                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                    className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 transition-colors"
                    title="Previous Question"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={activeQuestionIndex >= filteredQuestions.length - 1}
                    onClick={() => setActiveQuestionIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                    className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 transition-colors"
                    title="Next Question"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Question Title */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-display leading-snug">
                "{activeQuestion.question}"
              </h2>
            </div>

            {/* Why the Interviewer Asks This & Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Why It Matters & Key Points (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                
                <div className="p-4 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block font-display flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Why the Interviewer May Ask This</span>
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeQuestion.whyInterviewerAsks}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-display">
                    Key Points You Should Cover
                  </span>
                  <div className="space-y-1.5">
                    {activeQuestion.keyPointsToCover.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activeQuestion.sampleAnswerFramework && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-display">
                      Recommended Answer Framework
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
                      {activeQuestion.sampleAnswerFramework}
                    </p>
                  </div>
                )}

              </div>

              {/* Right Column: Interactive Practice Textarea (6 cols) */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Draft Your Practice Response</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {(currentQProgress.userNotes || '').length} chars
                    </span>
                  </div>

                  <textarea
                    rows={8}
                    value={currentQProgress.userNotes || ''}
                    onChange={(e) => handleUpdateNotes(activeQuestion.id, e.target.value)}
                    placeholder="Type your structured answer here using the STAR method or technical trade-offs... Practice saying it out loud as you type."
                    className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans"
                  />
                </div>

                {/* Practice Status Controls */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(activeQuestion.id, 'needs-review')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        currentQProgress.status === 'needs-review'
                          ? 'bg-amber-500 text-white shadow-xs font-bold'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400'
                      }`}
                    >
                      Needs Review
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(activeQuestion.id, 'practiced')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        currentQProgress.status === 'practiced'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Practiced</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeQuestionIndex < filteredQuestions.length - 1) {
                        setActiveQuestionIndex(prev => prev + 1);
                      } else {
                        showToast('You have reached the end of this track!', 'success');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 font-display"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 space-y-2">
            <p className="text-sm font-semibold">No questions found matching your filter criteria.</p>
            <p className="text-xs">Try selecting "All Questions" or clearing your search term.</p>
          </div>
        )}

        {/* 5. "MY WEAK AREAS & PRIORITY FOCUS" CARD */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  My Priority Weak Areas & Unpracticed Topics ({weakQuestions.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Target questions you haven't yet mastered to maximize interview confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {weakQuestions.slice(0, 4).map((q, idx) => (
              <div
                key={q.id || idx}
                onClick={() => {
                  const targetIdx = filteredQuestions.findIndex(item => item.id === q.id);
                  if (targetIdx !== -1) setActiveQuestionIndex(targetIdx);
                }}
                className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 cursor-pointer space-y-1.5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase font-semibold">
                    {q.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{q.difficulty}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {q.question}
                </h4>
              </div>
            ))}
          </div>

        </div>

        {/* 6. EDUCATIONAL DISCLAIMER */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>
            <strong>Educational Readiness Notice:</strong> The Interview Preparation simulator provides industry-vetted questions and articulation frameworks for practice. Actual questions in real technical interviews vary based on company requirements and interviewer preferences.
          </span>
        </div>

      </div>

    </div>
  );
}
