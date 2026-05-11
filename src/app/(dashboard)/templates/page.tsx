'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { FileText, Plus, Trash2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categoryColors: Record<string, 'info' | 'success' | 'warning' | 'premium' | 'danger'> = {
  sales: 'info',
  networking: 'success',
  'follow-up': 'warning',
  partnership: 'premium',
  recruiting: 'danger',
  custom: 'info',
};

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', prompt: '', category: 'custom' });
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchTemplates(); }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.error) setTemplates(data);
    } catch {
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTemplate.name || !newTemplate.prompt) return;
    setCreating(true);
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTemplate),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setTemplates(prev => [data, ...prev]);
        setShowModal(false);
        setNewTemplate({ name: '', description: '', prompt: '', category: 'custom' });
        toast.success('Template saved successfully');
      }
    } catch {
      toast.error('Something went wrong, please try again');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setTemplates(prev => prev.filter(t => t.id !== id));
      toast.success('Template deleted');
    } catch {
      toast.error('Something went wrong, please try again');
    } finally {
      setDeleting(null);
    }
  };

  const handleUseTemplate = (template: any) => {
    router.push(`/dashboard?templateId=${template.id}`);
  };

  const customTemplates = templates.filter(t => !t.is_default);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Templates</h1>
          <p className="text-muted-foreground text-sm">Manage your email templates</p>
        </div>
        <Button onClick={() => setShowModal(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> New Template
        </Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : templates.length === 0 ? (
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
            className="w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mb-6"
          >
            <FileText className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-semibold text-white mb-2">No templates yet</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              Create reusable templates to speed up your outreach and keep your emails consistent.
            </p>
            <Button size="lg" onClick={() => setShowModal(true)}>
              <Sparkles className="w-4 h-4 mr-2" />
              Create your first template
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence initial={false}>
              {templates.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  layout
                >
                  <Card hover className="group h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        {!t.is_default && (
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={deleting === t.id}
                            className="p-1.5 text-muted-foreground hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <h3 className="text-white text-sm font-medium mb-1">{t.name}</h3>
                      <p className="text-muted-foreground text-xs mb-4 flex-1">
                        {t.description || 'No description provided.'}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Badge variant={categoryColors[t.category] || 'info'} size="sm">{t.category}</Badge>
                          {t.is_default && <Badge variant="default" size="sm">Default</Badge>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUseTemplate(t)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA when no custom templates but defaults exist */}
          {customTemplates.length === 0 && templates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 border border-dashed border-white/15 rounded-2xl flex flex-col items-center gap-3 text-center"
            >
              <p className="text-muted-foreground text-sm">
                You're using default templates. Create a custom one to match your style.
              </p>
              <Button variant="secondary" size="sm" onClick={() => setShowModal(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Create custom template
              </Button>
            </motion.div>
          )}
        </>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create Template"
        description="Design a custom email template"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Template Name</label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50"
              placeholder="e.g. Cold Intro"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <input
              type="text"
              value={newTemplate.description}
              onChange={e => setNewTemplate({ ...newTemplate, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50"
              placeholder="What kind of email is this?"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Prompt Instructions</label>
            <textarea
              value={newTemplate.prompt}
              onChange={e => setNewTemplate({ ...newTemplate, prompt: e.target.value })}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 resize-none"
              placeholder="Instructions for the AI on how to write emails using this template..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1" disabled={creating}>
              Cancel
            </Button>
            <Button onClick={handleCreate} className="flex-1" loading={creating}>
              Create Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
