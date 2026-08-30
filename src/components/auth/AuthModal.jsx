import React, { useState } from 'react';
import { 
  X, Mail, Lock, User, Sparkles, ArrowRight, 
  Github, Eye, EyeOff, ShieldCheck, CheckCircle2, 
  AlertCircle, Zap, RefreshCw, KeyRound, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';

export function AuthModal({ onAuthSuccess }) {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    signup, 
    resetPassword,
    loginWithOAuth, 
    demoLogin, 
    isLoading,
    isCloudAuth
  } = useAuth();
  
  const { showToast } = useResume();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Email validation
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Forgot Password Flow
    if (authModalMode === 'forgot') {
      try {
        const res = await resetPassword(formData.email);
        setSuccessMessage(res.message || 'Password reset link sent to your email.');
        showToast('Password reset instructions sent!', 'success');
      } catch (err) {
        setErrorMessage(err.message || 'Failed to send password reset email.');
      }
      return;
    }

    // Password validation for Login & Signup
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (authModalMode === 'signup') {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!formData.agreeTerms) {
        setErrorMessage('Please accept the Terms of Service to continue.');
        return;
      }

      try {
        const res = await signup(formData.name, formData.email, formData.password);
        showToast(`Welcome to ResuSphere AI, ${formData.name}!`, 'success');
        if (onAuthSuccess) onAuthSuccess(res.user);
      } catch (err) {
        setErrorMessage(err.message || 'Failed to create account.');
      }
    } else {
      try {
        const res = await login(formData.email, formData.password);
        showToast(`Welcome back, ${formData.email}!`, 'success');
        if (onAuthSuccess) onAuthSuccess(res.user);
      } catch (err) {
        setErrorMessage(err.message || 'Invalid credentials.');
      }
    }
  };

  const handleOAuth = async (provider) => {
    try {
      await loginWithOAuth(provider);
      showToast(`Signed in with ${provider}!`, 'success');
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      showToast(`Failed to connect with ${provider}`, 'error');
    }
  };

  const handleDemoSignIn = () => {
    const u = demoLogin('engineer');
    showToast(`Signed in as demo user (${u.name})!`, 'success');
    if (onAuthSuccess) onAuthSuccess(u);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Logo */}
        <div className="p-5 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                {authModalMode === 'login' && 'Welcome Back to ResuSphere'}
                {authModalMode === 'signup' && 'Create Your Account'}
                {authModalMode === 'forgot' && 'Reset Your Password'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {authModalMode === 'login' && 'Sign in to access your cloud-ready dashboard'}
                {authModalMode === 'signup' && 'Join thousands building AI-powered resumes & portfolios'}
                {authModalMode === 'forgot' && 'We will send you a secure link to reset your password'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up (Hidden in forgot password mode) */}
        <div className="p-4 pt-3 space-y-4">
          {authModalMode !== 'forgot' ? (
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => { setAuthModalMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authModalMode === 'login'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthModalMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authModalMode === 'signup'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { setAuthModalMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Demo Sign In Button (Developer Friendly & Fallback) */}
          {authModalMode !== 'forgot' && (
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 hover:from-indigo-500/20 hover:to-cyan-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2 transition-all group font-display"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>1-Click Instant Sign In (Alex Chen Demo Account)</span>
            </button>
          )}

          {/* Social OAuth Buttons */}
          {authModalMode !== 'forgot' && (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleOAuth('Google')}
                className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                  <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.6 7.4C.6 9.4 0 10.6 0 12s.6 2.6 1.6 4.6l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuth('GitHub')}
                className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                <span>GitHub</span>
              </button>
            </div>
          )}

          {authModalMode !== 'forgot' && (
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-[10px] font-medium text-slate-400 uppercase">Or continue with email</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>
          )}

          {/* Main Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Chen"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.chen@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {authModalMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setAuthModalMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                      className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}

            {authModalMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2 font-display"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  {authModalMode === 'login' && <span>Sign In to Workspace</span>}
                  {authModalMode === 'signup' && <span>Create Free Account</span>}
                  {authModalMode === 'forgot' && <span>Send Reset Instructions</span>}
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy & Cloud Architecture Transparency Notice */}
          <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {isCloudAuth ? 'Connected to Supabase Auth. Passwords encrypted.' : 'Protected session. No plaintext credentials stored.'}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
