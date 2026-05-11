'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { EmailTone, GenerateEmailResponse } from '@/types';
import {
  Sparkles, Copy, RotateCcw, Check, Globe, User, Building2,
  Briefcase, MessageSquare, Lightbulb, FileText, X, AlertCircle, Loader2,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const tones: { value: EmailTone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'bold', label: 'Bold' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'urgent', label: 'Urgent' },
];

const PROGRESS_STEPS: { message: string; ms: number }[] = [
  { message: 'Scanning website...', ms: 1200 },
  { message: 'Analyzing content...', ms: 1500 },
  { message: 'AI is writing your email...', ms: 3000 },
];

function EmailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-3 w-24 bg-white/10 rounded mb-2" />
        <div className="h-5 w-3/4 bg-blue-400/20 rounded" />
      </div>
      <div>
        <div className="h-3 w-24 bg-white/10 rounded mb-2" />
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2.5">
          {[100, 83, 95, 70, 88, 76, 90, 65].map((w, i) => (
            <div key={i} className="h-3 bg-white/10 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WelcomeBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mb-6 p-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl flex items-start justify-between gap-4"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">👋</span>
        <div>
          <h2 className="text-white font-semibold text-base mb-0.5">Welcome to ReachAI!</h2>
          <p className="text-muted-foreground text-sm">
            Fill in the prospect details on the left and hit{' '}
            <strong className="text-white">Generate Email</strong> to create your first personalized cold email.
          </p>
        </div>
      </div>
      <button onClick={onDismiss} className="text-muted-foreground hover:text-white transition-colors shrink-0 mt-0.5">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const templateIdFromUrl = searchParams.get('templateId');

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateEmailResponse | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: string; name: string } | null>(null);
  const [progressMsg, setProgressMsg] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [form, setForm] = useState({
    prospectName: '', prospectCompany: '', prospectRole: '',
    prospectWebsite: '', senderName: '', senderCompany: '',
    senderRole: '', valueProposition: '', tone: 'professional' as EmailTone,
    additionalContext: '',
  });

  useEffect(() => {
    fetch('/api/usage')
      .then(r => r.json())
      .then(data => { if (!data.error && data.emailsGenerated === 0) setShowWelcome(true); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!templateIdFromUrl) return;
    fetch('/api/templates').then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        const t = data.find(x => x.id === templateIdFromUrl);
        if (t) setSelectedTemplate({ id: t.id, name: t.name });
      }
    });
  }, [templateIdFromUrl]);

  const updateForm = (field: string, value: string) =>
    setForm(p => ({ ...p, [field]: value }));

  const runProgress = async () => {
    for (const step of PROGRESS_STEPS) {
      setProgressMsg(step.message);
      await new Promise(r => setTimeout(r, step.ms));
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    const progressPromise = runProgress();

    try {
      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          templateId: selectedTemplate?.id,
          model: localStorage.getItem('reachai_preferred_model') || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          toast.error('Monthly limit reached — upgrade your plan');
        } else if (res.status === 429) {
          toast.error('Too many requests. Please wait a moment and try again.');
        } else {
          toast.error('Something went wrong, please try again');
        }
        throw new Error(data.error || 'Failed to generate email');
      }

      await progressPromise;
      setProgressMsg('Done!');
      await new Promise(r => setTimeout(r, 400));

      setResult(data);
      setShowWelcome(false);
      toast.success('Saved to history');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setProgressMsg('');
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subjectLine}\n\n${result.emailBody}`);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderInput = (
    icon: React.ElementType,
    label: string,
    field: keyof typeof form,
    placeholder: string,
    textarea?: boolean,
  ) => {
    const Icon = icon;
    return (
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />{label}
        </label>
        {textarea ? (
          <textarea
            value={form[field]}
            onChange={e => updateForm(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
          />
        ) : (
          <input
            type="text"
            value={form[field]}
            onChange={e => updateForm(field, e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Email Generator</h1>
        <p className="text-muted-foreground text-sm">Generate hyper-personalized cold emails with AI</p>
      </div>

      <AnimatePresence>
        {showWelcome && <WelcomeBanner onDismiss={() => setShowWelcome(false)} />}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Prospect Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderInput(User, 'Prospect Name', 'prospectName', 'e.g. Sarah Chen')}
            {renderInput(Building2, 'Company', 'prospectCompany', 'e.g. TechFlow Inc.')}
            {renderInput(Briefcase, 'Role', 'prospectRole', 'e.g. VP of Engineering')}
            {renderInput(Globe, 'Website (optional)', 'prospectWebsite', 'https://techflow.com')}

            <div className="pt-2 border-t border-white/5">
              <h3 className="text-sm font-medium text-foreground mb-3">Your Details</h3>
              <div className="grid grid-cols-2 gap-3">
                {renderInput(User, 'Your Name', 'senderName', 'Your name')}
                {renderInput(Building2, 'Your Company', 'senderCompany', 'Your company')}
              </div>
              <div className="mt-3">
                {renderInput(Briefcase, 'Your Role', 'senderRole', 'Your role')}
              </div>
            </div>

            {renderInput(Lightbulb, 'Value Proposition', 'valueProposition', 'What unique value do you offer?', true)}
            {renderInput(MessageSquare, 'Additional Context', 'additionalContext', 'Any extra context...', true)}

            {/* Tone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map(t => (
                  <button
                    key={t.value}
                    onClick={() => updateForm('tone', t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      form.tone === t.value
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-white/5 text-muted-foreground border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template badge */}
            {selectedTemplate && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-100 font-medium">Using: {selectedTemplate.name}</span>
                </div>
                <button onClick={() => setSelectedTemplate(null)} className="text-muted-foreground hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              loading={loading}
              className="w-full"
              size="lg"
              disabled={!form.prospectName || !form.prospectCompany || !form.senderName}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate Email
            </Button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-200 text-sm font-medium">Generation Failed</p>
                  <p className="text-red-400/80 text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card variant={result ? 'glow' : 'default'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Generated Email</h2>
              {result && !loading && <Badge variant="success" size="md">Score: {result.score}/100</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {progressMsg && (
                    <motion.div
                      key={progressMsg}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                    >
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                      <span className="text-blue-200 text-sm font-medium">{progressMsg}</span>
                    </motion.div>
                  )}
                  <EmailSkeleton />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Subject Line</span>
                    <p className="text-blue-400 font-medium mt-1">{result.subjectLine}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Email Body</span>
                    <div className="mt-2 bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-foreground text-sm whitespace-pre-wrap leading-relaxed">{result.emailBody}</p>
                    </div>
                  </div>
                  {result.tips && result.tips.length > 0 && (
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Tips to Improve</span>
                      <ul className="mt-2 space-y-1.5">
                        {result.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleCopy} variant="secondary" size="sm">
                      {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button onClick={handleGenerate} variant="ghost" size="sm" loading={loading}>
                      <RotateCcw className="w-4 h-4 mr-1" /> Regenerate
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-white font-medium mb-1">No email generated yet</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Fill in the prospect details and click generate to create a personalized email.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-screen bg-white/5 rounded-xl" />}>
      <DashboardContent />
    </Suspense>
  );
}
