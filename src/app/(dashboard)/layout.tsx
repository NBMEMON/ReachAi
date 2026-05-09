'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import {
  Sparkles, LayoutDashboard, History, FileText,
  Settings, ChevronLeft, Menu, Zap,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Generator' },
  { href: '/history', icon: History, label: 'History' },
  { href: '/templates', icon: FileText, label: 'Templates' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usage, setUsage] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/usage').then(res => res.json()).then(data => {
      if (!data.error) setUsage(data);
    }).catch(console.error);
  }, [pathname]); // Refetch when pathname changes (e.g. going back to dashboard)

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col border-r border-white/5 bg-[#0a0a1a] transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {!collapsed && <span className="text-lg font-bold text-white">ReachAI</span>}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1.5 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                  active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                )}>
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Usage Card */}
        {!collapsed && usage && (
          <div className="mx-3 mb-4 p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-white text-xs font-medium capitalize">{usage.currentPlan} Plan</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (usage.emailsGenerated / usage.emailsLimit) * 100)}%` }} />
            </div>
            <p className="text-muted-foreground text-xs">{usage.emailsGenerated}/{usage.emailsLimit === 'unlimited' ? '∞' : usage.emailsLimit} emails used</p>
          </div>
        )}

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-4 justify-between">
        <button onClick={() => setMobileOpen(true)} className="p-2 text-muted-foreground"><Menu className="w-5 h-5" /></button>
        <span className="text-white font-bold">ReachAI</span>
        <UserButton />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0a0a1a] border-r border-white/5 p-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ReachAI</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm',
                      active ? 'bg-blue-500/10 text-blue-400' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    )}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-14 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
