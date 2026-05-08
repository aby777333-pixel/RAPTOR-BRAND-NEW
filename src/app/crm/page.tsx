'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getSupabase,
  type Lead,
  STAGE_LABEL,
  STAGE_TONE,
  LEAD_STAGES
} from '@/lib/supabase';

type Counts = {
  leadsByStage: Record<Lead['stage'], number>;
  brokers: number;
  affiliates: number;
};

export default function CrmDashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    (async () => {
      try {
        const [leadsRes, brokersRes, affiliatesRes, recentRes] =
          await Promise.all([
            supabase.from('leads').select('stage'),
            supabase.from('brokers').select('id', { count: 'exact', head: true }),
            supabase
              .from('affiliates')
              .select('id', { count: 'exact', head: true }),
            supabase
              .from('leads')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(8)
          ]);

        if (leadsRes.error) throw leadsRes.error;
        if (brokersRes.error) throw brokersRes.error;
        if (affiliatesRes.error) throw affiliatesRes.error;
        if (recentRes.error) throw recentRes.error;

        const byStage = LEAD_STAGES.reduce((acc, s) => {
          acc[s] = 0;
          return acc;
        }, {} as Record<Lead['stage'], number>);
        for (const row of leadsRes.data ?? []) {
          const s = row.stage as Lead['stage'];
          if (s in byStage) byStage[s] += 1;
        }

        if (!active) return;
        setCounts({
          leadsByStage: byStage,
          brokers: brokersRes.count ?? 0,
          affiliates: affiliatesRes.count ?? 0
        });
        setRecent((recentRes.data ?? []) as Lead[]);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const totalLeads = counts
    ? LEAD_STAGES.reduce((sum, s) => sum + counts.leadsByStage[s], 0)
    : 0;

  return (
    <div>
      <header className="mb-7">
        <h1 className="font-display text-3xl tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-brand-mist/60">
          Pipeline at a glance — leads, brokers, and partners.
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Total leads"
          value={counts ? totalLeads : '—'}
          tone="cyan"
          href="/crm/leads/"
        />
        <SummaryCard
          label="Brokers"
          value={counts ? counts.brokers : '—'}
          tone="cyan"
          href="/crm/brokers/"
        />
        <SummaryCard
          label="Affiliates"
          value={counts ? counts.affiliates : '—'}
          tone="gold"
          href="/crm/affiliates/"
        />
      </div>

      <h2 className="mt-10 mb-4 text-xs uppercase tracking-[0.22em] text-brand-mist/50">
        Pipeline by stage
      </h2>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {LEAD_STAGES.map((stage) => (
          <div key={stage} className="surface-card p-4">
            <div
              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${STAGE_TONE[stage]}`}
            >
              {STAGE_LABEL[stage]}
            </div>
            <div className="mt-3 font-display text-2xl text-white">
              {counts ? counts.leadsByStage[stage] : '—'}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-4 text-xs uppercase tracking-[0.22em] text-brand-mist/50">
        Recent leads
      </h2>
      <div className="surface-card overflow-hidden">
        {recent.length === 0 ? (
          <p className="px-5 py-6 text-sm text-brand-mist/55">
            No leads yet. Submissions from the website Contact form will land
            here automatically.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {recent.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">
                    {l.contact_name}
                    {l.company ? (
                      <span className="text-brand-mist/55"> · {l.company}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-brand-mist/50">
                    {l.email ?? '—'} · {l.source}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${STAGE_TONE[l.stage]}`}
                >
                  {STAGE_LABEL[l.stage]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
  href
}: {
  label: string;
  value: number | string;
  tone: 'cyan' | 'gold';
  href: string;
}) {
  return (
    <Link
      href={href}
      className="surface-card surface-card-hover block p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.22em] text-brand-mist/55">
          {label}
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.22em] ${
            tone === 'cyan' ? 'text-brand-cyan' : 'text-brand-gold-light'
          }`}
        >
          View →
        </span>
      </div>
      <div className="mt-3 font-display text-3xl text-white">{value}</div>
    </Link>
  );
}
