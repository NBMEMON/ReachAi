import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Copy, Trash2, Mail, Check } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase';
import { syncUserToDatabase } from '@/lib/auth-sync';

// Convert to Server Component to fetch securely
export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) return null;

  let emails: any[] = [];
  
  try {
    const dbUser = await syncUserToDatabase(userId);
    if (dbUser) {
      const adminClient = createAdminClient();
      const { data } = await adminClient
        .from('emails')
        .select('*')
        .eq('user_id', dbUser.id)
        .order('created_at', { ascending: false });
        
      if (data) emails = data;
    }
  } catch (err) {
    console.error('Failed to fetch history:', err);
    // Ignore error so page doesn't crash if Supabase is not configured yet
  }

  const scoreColor = (s: number) => s >= 90 ? 'success' : s >= 80 ? 'info' : 'warning';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Email History</h1>
        <p className="text-muted-foreground text-sm">Browse and manage your generated emails</p>
      </div>

      {/* Email list */}
      <div className="space-y-3">
        {emails.map((email) => (
          <Card key={email.id} hover className="group">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-sm font-medium">{email.prospect_name}</h3>
                    <span className="text-muted-foreground text-xs">at {email.prospect_company}</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5">{email.subject_line}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={scoreColor(email.score || 0)}>{email.score || 0}/100</Badge>
                <Badge variant="default">{email.tone}</Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-red-400" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {emails.length === 0 && (
          <div className="text-center py-16">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No emails found. Start generating to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
