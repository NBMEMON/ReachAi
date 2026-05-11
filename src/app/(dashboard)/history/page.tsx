'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, Copy, Trash2, Sparkles } from 'lucide-react';
import Link from 'next/link';

type Email = {
  id: string;
  prospect_name: string;
  prospect_company: string;
  subject_line: string;
  email_body: string;
  score: number;
  tone: string;
  created_at: string;
};

const scoreVariant = (s: number): 'success' | 'info' | 'warning' =>
  s >= 90 ? 'success' : s >= 80 ? 'info' : 'warning';

export default function HistoryPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/emails')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setEmails(data); })
      .catch(() => toast.error('Failed to load email history'))
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = async (email: Email) => {
    await navigator.clipboard.writeText(`Subject: ${email.subject_line}\n\n${email.email_body}`);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/emails/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setEmails(prev => prev.filter(e => e.id !== id));
      toast.success('Email deleted');
    } catch {
      toast.error('Something went wrong, please try again');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Email History</h1>
        <p className="text-muted-foreground text-sm">Browse and manage your generated emails</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : emails.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-28 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-6"
          >
            <Mail className="w-10 h-10 text-blue-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-2">No emails yet</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              Your generated emails will appear here. Start by creating your first personalized cold email.
            </p>
            <Link href="/dashboard">
              <Button size="lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate your first email
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {emails.map((email, i) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                layout
              >
                <Card hover className="group">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white text-sm font-medium truncate">{email.prospect_name}</h3>
                          <span className="text-muted-foreground text-xs shrink-0">at {email.prospect_company}</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5 truncate">{email.subject_line}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={scoreVariant(email.score || 0)}>{email.score || 0}/100</Badge>
                      <Badge variant="default">{email.tone}</Badge>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(email)}>
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          loading={deleting === email.id}
                          onClick={() => handleDelete(email.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
