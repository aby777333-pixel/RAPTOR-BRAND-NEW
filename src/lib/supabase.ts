'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.'
    );
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'gioraptor-crm-auth'
      }
    });
  }
  return cached;
}

export type Broker = {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  website: string | null;
  status: 'lead' | 'qualified' | 'active' | 'churned';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Affiliate = {
  id: string;
  full_name: string;
  email: string | null;
  company: string | null;
  country: string | null;
  tier: 'standard' | 'gold' | 'platinum';
  status: 'pending' | 'active' | 'paused' | 'terminated';
  commission_rate: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  contact_name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  source: 'website' | 'referral' | 'event' | 'partner' | 'outbound' | 'other';
  stage: 'new' | 'contacted' | 'demo' | 'proposal' | 'won' | 'lost';
  interest: string | null;
  message: string | null;
  value_usd: number | null;
  owner: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const LEAD_STAGES: Lead['stage'][] = [
  'new',
  'contacted',
  'demo',
  'proposal',
  'won',
  'lost'
];

export const STAGE_LABEL: Record<Lead['stage'], string> = {
  new: 'New',
  contacted: 'Contacted',
  demo: 'Demo',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost'
};

export const STAGE_TONE: Record<Lead['stage'], string> = {
  new: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10',
  contacted: 'text-sky-300 border-sky-400/30 bg-sky-400/10',
  demo: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
  proposal: 'text-brand-gold-light border-brand-gold/30 bg-brand-gold/10',
  won: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  lost: 'text-rose-300 border-rose-400/30 bg-rose-400/10'
};
