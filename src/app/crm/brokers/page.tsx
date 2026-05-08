'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabase, type Broker } from '@/lib/supabase';

const STATUSES: Broker['status'][] = [
  'lead',
  'qualified',
  'active',
  'churned'
];

const STATUS_TONE: Record<Broker['status'], string> = {
  lead: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10',
  qualified: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
  active: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  churned: 'text-rose-300 border-rose-400/30 bg-rose-400/10'
};

const EMPTY = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  country: '',
  website: '',
  status: 'lead' as Broker['status'],
  notes: ''
};

type Filter = 'all' | Broker['status'];

export default function CrmBrokersPage() {
  const [rows, setRows] = useState<Broker[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('brokers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else {
      setRows((data ?? []) as Broker[]);
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

  const updateStatus = async (id: string, status: Broker['status']) => {
    const supabase = getSupabase();
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase
      .from('brokers')
      .update({ status })
      .eq('id', id);
    if (error) {
      setError(error.message);
      refresh();
    }
  };

  const deleteRow = async (id: string) => {
    if (!confirm('Delete this broker?')) return;
    const { error } = await getSupabase()
      .from('brokers')
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
      company_name: form.company_name.trim(),
      contact_name: form.contact_name.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      country: form.country.trim() || null,
      website: form.website.trim() || null,
      status: form.status,
      notes: form.notes.trim() || null
    };
    const { error } = await getSupabase().from('brokers').insert(payload);
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
          <h1 className="font-display text-3xl tracking-tight">Brokers</h1>
          <p className="mt-1 text-sm text-brand-mist/60">
            Broker accounts and prospects.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md bg-brand-cyan px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-cyan/90"
        >
          {showForm ? 'Close' : '+ Add broker'}
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
            label="Company name *"
            value={form.company_name}
            required
            onChange={(v) => setForm({ ...form, company_name: v })}
          />
          <Field
            label="Primary contact"
            value={form.contact_name}
            onChange={(v) => setForm({ ...form, contact_name: v })}
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
          <Field
            label="Website"
            value={form.website}
            onChange={(v) => setForm({ ...form, website: v })}
          />
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as Broker['status'] })
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
              {busy ? 'Saving…' : 'Save broker'}
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
          <p className="px-5 py-6 text-sm text-brand-mist/55">No brokers yet.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {visible.map((b) => (
              <li key={b.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {b.company_name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-brand-mist/55">
                      {[b.contact_name, b.email, b.phone, b.country]
                        .filter(Boolean)
                        .join(' · ') || '—'}
                    </p>
                    {b.website && (
                      <a
                        href={b.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-xs text-brand-cyan hover:underline"
                      >
                        {b.website}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(
                          b.id,
                          e.target.value as Broker['status']
                        )
                      }
                      className={`rounded-md border bg-transparent px-2 py-1 text-xs uppercase tracking-[0.16em] focus:outline-none ${STATUS_TONE[b.status]}`}
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
                      onClick={() => deleteRow(b.id)}
                      className="text-xs text-brand-mist/45 hover:text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {b.notes && (
                  <p className="mt-2 text-xs text-brand-mist/65">{b.notes}</p>
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
