// ============================================================
// ReachAI — Type Definitions
// ============================================================

export type Plan = 'free' | 'starter' | 'pro';

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  plan: Plan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  emails_generated: number;
  created_at: string;
  updated_at: string;
}

export interface Email {
  id: string;
  user_id: string;
  prospect_name: string;
  prospect_company: string;
  prospect_role: string;
  prospect_website: string | null;
  scraped_context: string | null;
  tone: EmailTone;
  template_id: string | null;
  subject_line: string;
  email_body: string;
  score: number | null;
  created_at: string;
}

export interface Template {
  id: string;
  user_id: string | null;
  name: string;
  description: string;
  prompt_template: string;
  category: TemplateCategory;
  is_default: boolean;
  created_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  action: 'email_generated' | 'prospect_scraped';
  metadata: Record<string, unknown>;
  created_at: string;
}

export type EmailTone =
  | 'professional'
  | 'friendly'
  | 'casual'
  | 'urgent'
  | 'humorous'
  | 'bold';

export type TemplateCategory =
  | 'sales'
  | 'networking'
  | 'follow-up'
  | 'partnership'
  | 'recruiting'
  | 'custom';

export interface PlanLimits {
  name: string;
  displayName: string;
  emailsPerMonth: number;
  scrapesPerMonth: number;
  templates: number | 'unlimited';
  features: string[];
  price: number;
  priceAnnual: number;
  stripePriceId: string | null;
}

export interface GenerateEmailRequest {
  prospectName: string;
  prospectCompany: string;
  prospectRole: string;
  prospectWebsite?: string;
  senderName: string;
  senderCompany: string;
  senderRole: string;
  valueProposition: string;
  tone: EmailTone;
  templateId?: string;
  additionalContext?: string;
  model?: string;
}

export interface GenerateEmailResponse {
  subjectLine: string;
  emailBody: string;
  score: number;
  tips: string[];
}

export interface ScrapedData {
  companyDescription: string;
  recentNews: string[];
  products: string[];
  teamInfo: string;
  rawContent: string;
}

export interface UsageStats {
  emailsGenerated: number;
  emailsLimit: number;
  scrapesUsed: number;
  scrapesLimit: number;
  currentPlan: Plan;
  resetDate: string;
}
