'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { CreditCard, BarChart3, User, Zap, Mail, Shield, Bell, Bot } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/config/plans';
import { FREE_MODELS } from '@/lib/openrouter';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'ai-model', label: 'AI Model', icon: Bot },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'usage', label: 'API Usage', icon: BarChart3 },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(FREE_MODELS[0].id);
  const [modelSaved, setModelSaved] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Load saved model preference
  React.useEffect(() => {
    const saved = localStorage.getItem('reachai_preferred_model');
    if (saved) setSelectedModel(saved);
  }, []);

  React.useEffect(() => {
    fetch('/api/usage').then(res => res.json()).then(data => {
      if (!data.error) setUsage(data);
    }).catch(console.error);
  }, []);

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account, billing, and API preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <UserButton appearance={{ elements: { avatarBox: 'w-20 h-20 shadow-xl border-2 border-white/10' } }} />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Your Profile</h3>
                      <p className="text-muted-foreground text-sm">Security and personal details managed by Clerk</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="p-4 bg-white/5 border border-border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Settings</p>
                          <p className="text-foreground text-sm">Update your email and communications</p>
                        </div>
                      </div>
                      <UserButton appearance={{ elements: { userButtonTrigger: 'hidden' } }} />
                    </div>

                    <div className="p-4 bg-white/5 border border-border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Password & Security</p>
                          <p className="text-foreground text-sm">Manage MFA and authentication</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                    <p className="text-foreground text-sm leading-relaxed">
                      All account information is securely synced through our auth provider. You can manage your session, passwords, and security settings directly via the profile interface.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Model Tab */}
          {activeTab === 'ai-model' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">AI Model</h3>
                      <p className="text-muted-foreground text-sm">Choose which free AI model generates your emails</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {FREE_MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setModelSaved(false);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left',
                          selectedModel === model.id
                            ? 'bg-purple-500/10 border-purple-500/30 ring-1 ring-purple-500/20'
                            : 'bg-white/5 border-border hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                            selectedModel === model.id ? 'border-purple-400' : 'border-muted-foreground'
                          )}>
                            {selectedModel === model.id && (
                              <div className="w-2 h-2 rounded-full bg-purple-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-foreground font-medium text-sm">{model.name}</p>
                            <p className="text-muted-foreground text-xs font-mono mt-0.5">{model.id}</p>
                          </div>
                        </div>
                        {model.id === FREE_MODELS[0].id && (
                          <Badge variant="info" size="sm">Recommended</Badge>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Button
                      onClick={() => {
                        localStorage.setItem('reachai_preferred_model', selectedModel);
                        setModelSaved(true);
                        setTimeout(() => setModelSaved(false), 2000);
                      }}
                      size="lg"
                      className="px-8"
                    >
                      {modelSaved ? '✓ Saved!' : 'Save Preference'}
                    </Button>
                  </div>

                  <div className="mt-8 p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                    <p className="text-foreground text-sm leading-relaxed">
                      All models are <strong className="text-foreground">100% free</strong> via OpenRouter — no credit card needed.
                      Free models have rate limits (~20 requests/minute). If you hit limits, wait 30 seconds and try again.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Subscription</h3>
                        <p className="text-muted-foreground text-sm capitalize">{usage?.currentPlan || 'Free'} Plan Active</p>
                      </div>
                    </div>
                    <Badge variant="info" size="md" className="capitalize px-4 py-1">{usage?.currentPlan || 'Free'}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Emails Generated</p>
                          <p className="text-2xl font-bold text-foreground">{usage?.emailsGenerated || 0} <span className="text-muted-foreground text-sm font-normal">/ {usage?.emailsLimit === 'unlimited' ? '∞' : (usage?.emailsLimit || 10)}</span></p>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ((usage?.emailsGenerated || 0) / (usage?.emailsLimit || 10)) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="bg-white/5 border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Prospect Scrapes</p>
                          <p className="text-2xl font-bold text-foreground">{usage?.scrapesUsed || 0} <span className="text-muted-foreground text-sm font-normal">/ {usage?.scrapesLimit === 'unlimited' ? '∞' : (usage?.scrapesLimit || 5)}</span></p>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ((usage?.scrapesUsed || 0) / (usage?.scrapesLimit || 5)) * 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-foreground font-medium mb-1">Need more capacity?</p>
                      <p className="text-muted-foreground text-sm">Upgrade to a paid plan to unlock more generations and features.</p>
                    </div>
                    <Button onClick={handleUpgrade} size="lg" className="px-8 shadow-lg shadow-blue-500/20">Upgrade Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Usage Tab */}
          {activeTab === 'usage' && (
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-foreground">Usage Analytics</h3>
                </div>

                <div className="space-y-8">
                  {[
                    { label: 'Emails Generated', used: usage?.emailsGenerated || 0, limit: usage?.emailsLimit || 10, color: 'bg-blue-500', icon: Mail },
                    { label: 'Prospects Scraped', used: usage?.scrapesUsed || 0, limit: usage?.scrapesLimit || 5, color: 'bg-purple-500', icon: Zap },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{item.label}</span>
                        </div>
                        <span className="text-foreground font-semibold">{item.used} <span className="text-muted-foreground text-sm font-normal">/ {item.limit === 'unlimited' ? '∞' : item.limit}</span></span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: item.limit === 'unlimited' ? '100%' : `${Math.min(100, (item.used / item.limit) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-lg w-fit">
                  <Bell className="w-3 h-3" />
                  Your usage resets on the first of next month.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
