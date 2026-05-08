'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  getSupabase,
  type Lead,
  LEAD_STAGES,
  STAGE_LABEL,
  STAGE_TONE
} from '@/lib/supabase';

type Filter = 'all' | Lead['stage'];

const SOURCES: Lead['source'][] = [
  'website',
  'referral',
  'event',
  'partner',
  'outbound',
  'other'
];

const EMPTY_FORM = {
  contact_name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  source: 'outbound' as Lead['source'],
  interest: '',
  message: '',
  value_usd: '',
  owner: '',
  notes: ''
};

export default function CrmLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setLeads((data ?? []) as Lead[]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const visible = useMemo(() => {
    if (filter === 'all') return leads;
    return leads.filter((l) => l.stage === filter);
  }, [leads, filter]);

  const updateStage = async (id: string, stage: Lead['stage']) => {
    const supabase = getSupabase();
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
    const { error } = await supabase
      .from('leads')
      .update({ stage })
      .eq('id', id);
    if (error) {
      setError(error.message);
      refresh();
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    const supabase = getSupabase();
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) setError(error.message);
    refresh();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = getSupabase();
    const payload = {
      contact_name: form.contact_name.trim(),
      company: form.company.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      country: form.country.trim() || null,
      source: form.source,
      stage: 'new' as const,
      interest: form.interest.trim() || null,
      message: form.message.trim() || null,
      value_usd: form.value_usd ? Number(form.value_usd) : null,
      owner: form.owner.trim() || null,
      notes: form.notes.trim() || null
    };
    const { error } = await supabase.from('leads').insert(payload);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-brand-mist/60">
            Sales pipeline. Website submissions land here as <code>new</code>.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-cyan/90"
        >
          {showForm ? 'Close' : '+ Add lead'}
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
            label="Contact name *"
            value={form.contact_name}
            onChange={(v) => setForm({ ...form, contact_name: v })}
            required
          />
          <Field
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Field
            label="Phone"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <Field
            label="Country"
            value={form.country}
            onChange={(v) => setForm({ ...form, country: v })}
          />
          <SelectField
            label="Source"
            value={form.source}
            onChange={(v) => setForm({ ...form, source: v as Lead['source'] })}
            options={SOURCES}
          />
          <Field
            label="Interest"
            value={form.interest}
            onChange={(v) => setForm({ ...form, interest: v })}
          />
          <Field
            label="Estimated value (USD)"
            type="number"
            value={form.value_usd}
            onChange={(v) => setForm({ ...form, value_usd: v })}
          />
          <Field
            label="Owner"
            value={form.owner}
            onChange={(v) => setForm({ ...form, owner: v })}
          />
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Message / notes
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-md bg-brand-cyan px-5 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-cyan/90 disabled:opacity-50"
            >
              {busy ? 'Saving…' : 'Save lead'}
            </button>
          </div>
        </form>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterPill
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label="All"
          count={leads.length}
        />
        {LEAD_STAGES.map((s) => (
          <FilterPill
            key={s}
            active={filter === s}
            onClick={() => setFilter(s)}
            label={STAGE_LABEL[s]}
            count={leads.filter((l) => l.stage === s).length}
          />
        ))}
      </div>

      <div className="surface-card overflow-hidden">
        {loading ? (
          <p className="px-5 py-6 text-sm text-brand-mist/55">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="px-5 py-6 text-sm text-brand-mist/55">
            No leads in this view yet.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {visible.map((l) => (
              <li key={l.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {l.contact_name}
                      {l.company && (
                        <span className="text-brand-mist/55">
                          {' '}
                          · {l.company}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-brand-mist/55">
                      {[l.email, l.phone, l.country].filter(Boolean).join(' · ') ||
                        '—'}
                    </p>
                    {(l.interest || l.message) && (
                      <p className="mt-1.5 line-clamp-2 text-xs text-brand-mist/65">
                        {l.interest && (
                          <span className="text-brand-cyan/90">
                            {l.interest}:{' '}
                          </span>
                        )}
                        {l.message ?? ''}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={l.stage}
                      onChange={(e) =>
                        updateStage(l.id, e.target.value as Lead['stage'])
                      }
                      className={`rounded-md border bg-transparent px-2 py-1 text-xs uppercase tracking-[0.16em] focus:outline-none ${STAGE_TONE[l.stage]}`}
                    >
                      {LEAD_STAGES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-brand-ink-soft text-brand-mist"
                        >
                          {STAGE_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteLead(l.id)}
                      className="text-xs text-brand-mist/45 hover:text-rose-300"
                      aria-label="Delete lead"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-brand-mist/40">
                  {l.source} · {new Date(l.created_at).toLocaleString()}
                </p>
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

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-brand-ink-soft">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterPill({
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
      {label}{' '}
      <span className="ml-1 text-brand-mist/40">{count}</span>
    </button>
  );
}
