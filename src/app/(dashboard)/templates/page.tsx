'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { FileText, Plus, Pencil, Trash2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

const categoryColors: Record<string, 'info' | 'success' | 'warning' | 'premium' | 'danger'> = {
  sales: 'info', networking: 'success', 'follow-up': 'warning', partnership: 'premium', recruiting: 'danger', custom: 'info',
};

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', prompt: '', category: 'custom' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.error) setTemplates(data);
    } catch (err) {
      console.error(err);
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
      if (!data.error) {
        setTemplates([data, ...templates]);
        setShowModal(false);
        setNewTemplate({ name: '', description: '', prompt: '', category: 'custom' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleUseTemplate = (template: any) => {
    // Redirect to dashboard and pass template info via state or query param
    // We'll use a query param for simplicity in this session
    const params = new URLSearchParams();
    params.set('templateId', template.id);
    router.push(`/dashboard?${params.toString()}`);
  };

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
            <Card key={i} className="animate-pulse">
              <CardContent className="h-40 bg-white/5 rounded-xl" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <Card key={t.id} hover className="group">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex gap-1">
                    {!t.is_default && (
                      <>
                        <button className="p-1.5 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10"><Pencil className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-muted-foreground hover:text-red-400 rounded-lg hover:bg-white/10"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                  </div>
                </div>
                <h3 className="text-white text-sm font-medium mb-1">{t.name}</h3>
                <p className="text-muted-foreground text-xs mb-4 flex-1">{t.description || 'No description provided.'}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Badge variant={categoryColors[t.category] || 'info'} size="sm">{t.category}</Badge>
                    {t.is_default && <Badge variant="default" size="sm">Default</Badge>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleUseTemplate(t)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Template" description="Design a custom email template">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Template Name</label>
            <input type="text" value={newTemplate.name} onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50" placeholder="e.g. Cold Intro" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <input type="text" value={newTemplate.description} onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50" placeholder="What kind of email is this?" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Prompt Instructions</label>
            <textarea value={newTemplate.prompt} onChange={(e) => setNewTemplate({ ...newTemplate, prompt: e.target.value })} rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 resize-none"
              placeholder="Instructions for the AI on how to write emails using this template..." />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1" disabled={creating}>Cancel</Button>
            <Button onClick={handleCreate} className="flex-1" loading={creating}>Create Template</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
