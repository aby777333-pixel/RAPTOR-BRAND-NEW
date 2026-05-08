'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabase, type Affiliate } from '@/lib/supabase';

const TIERS: Affiliate['tier'][] = ['standard', 'gold', 'platinum'];
const STATUSES: Affiliate['status'][] = [
  'pending',
  'active',
  'paused',
  'terminated'
];

const STATUS_TONE: Record<Affiliate['status'], string> = {
  pending: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10',
  active: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  paused: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  terminated: 'text-rose-300 border-rose-400/30 bg-rose-400/10'
};

const TIER_TONE: Record<Affiliate['tier'], string> = {
  standard: 'text-brand-mist/70 border-white/10 bg-white/[0.04]',
  gold: 'text-brand-gold-light border-brand-gold/30 bg-brand-gold/10',
  platinum: 'text-violet-300 border-violet-400/30 bg-violet-400/10'
};

const EMPTY = {
  full_name: '',
  email: '',
  company: '',
  country: '',
  tier: 'standard' as Affiliate['tier'],
  status: 'active' as Affiliate['status'],
  commission_rate: '',
  notes: ''
};

type Filter = 'all' | Affiliate['status'];

export default function CrmAffiliatesPage() {
  const [rows, setRows] = useState<Affiliate[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from('affiliates')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else {
      setRows((data ?? []) as Affiliate[]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter]
  );

  const updateField = async (
    id: string,
    field: 'status' | 'tier',
    value: string
  ) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
    const { error } = await getSupabase()
      .from('affiliates')
      .update({ [field]: value })
      .eq('id', id);
    if (error) {
      setError(error.message);
      refresh();
    }
  };

  const deleteRow = async (id: string) => {
    if (!confirm('Delete this affiliate?')) return;
    const { error } = await getSupabase()
      .from('affiliates')
      .delete()
      .eq('id', id);
    if (error) setError(error.message);
    refresh();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim() || null,
      company: form.company.trim() || null,
      country: form.country.trim() || null,
      tier: form.tier,
      status: form.status,
      commission_rate: form.commission_rate
        ? Number(form.commission_rate)
        : null,
      notes: form.notes.trim() || null
    };
    const { error } = await getSupabase().from('affiliates').insert(payload);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setForm(EMPTY);
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Affiliates</h1>
          <p className="mt-1 text-sm text-brand-mist/60">
            IBs, partners, and revenue-share programs.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-cyan/90"
        >
          {showForm ? 'Close' : '+ Add affiliate'}
        </button>
      </header>

      {error && (
        <div className="mb-5 rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={submit}
          className="surface-card mb-6 grid gap-4 p-6 md:grid-cols-2"
        >
          <Field
            label="Full name *"
            value={form.full_name}
            required
            onChange={(v) => setForm({ ...form, full_name: v })}
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Field
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />
          <Field
            label="Country"
            value={form.country}
            onChange={(v) => setForm({ ...form, country: v })}
          />
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Tier
            </label>
            <select
              value={form.tier}
              onChange={(e) =>
                setForm({ ...form, tier: e.target.value as Affiliate['tier'] })
              }
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            >
              {TIERS.map((t) => (
                <option key={t} value={t} className="bg-brand-ink-soft">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as Affiliate['status']
                })
              }
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-brand-ink-soft">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Commission rate (%)"
            type="number"
            value={form.commission_rate}
            onChange={(v) => setForm({ ...form, commission_rate: v })}
          />
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Notes
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-md bg-brand-cyan px-5 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-cyan/90 disabled:opacity-50"
            >
              {busy ? 'Saving…' : 'Save affiliate'}
            </button>
          </div>
        </form>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <Pill
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label="All"
          count={rows.length}
        />
        {STATUSES.map((s) => (
          <Pill
            key={s}
            active={filter === s}
            onClick={() => setFilter(s)}
            label={s}
            count={rows.filter((r) => r.status === s).length}
          />
        ))}
      </div>

      <div className="surface-card overflow-hidden">
        {loading ? (
          <p className="px-5 py-6 text-sm text-brand-mist/55">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="px-5 py-6 text-sm text-brand-mist/55">
            No affiliates yet.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {visible.map((a) => (
              <li key={a.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {a.full_name}
                      {a.company && (
                        <span className="text-brand-mist/55">
                          {' '}
                          · {a.company}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-brand-mist/55">
                      {[a.email, a.country].filter(Boolean).join(' · ') || '—'}
                      {a.commission_rate != null
                        ? ` · ${a.commission_rate}% comm`
                        : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={a.tier}
                      onChange={(e) =>
                        updateField(a.id, 'tier', e.target.value)
                      }
                      className={`rounded-md border bg-transparent px-2 py-1 text-xs uppercase tracking-[0.16em] focus:outline-none ${TIER_TONE[a.tier]}`}
                    >
                      {TIERS.map((t) => (
                        <option
                          key={t}
                          value={t}
                          className="bg-brand-ink-soft text-brand-mist"
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                    <select
                      value={a.status}
                      onChange={(e) =>
                        updateField(a.id, 'status', e.target.value)
                      }
                      className={`rounded-md border bg-transparent px-2 py-1 text-xs uppercase tracking-[0.16em] focus:outline-none ${STATUS_TONE[a.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-brand-ink-soft text-brand-mist"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteRow(a.id)}
                      className="text-xs text-brand-mist/45 hover:text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {a.notes && (
                  <p className="mt-2 text-xs text-brand-mist/65">{a.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text'
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
      />
    </div>
  );
}

function Pill({
  active,
  onClick,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] transition-colors ${
        active
          ? 'border-brand-cyan/40 bg-brand-cyan/15 text-white'
          : 'border-white/10 bg-white/[0.02] text-brand-mist/60 hover:bg-white/[0.05]'
      }`}
    >
      {label} <span className="ml-1 text-brand-mist/40">{count}</span>
    </button>
  );
}
