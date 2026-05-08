'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';

const INTEREST_OPTIONS: { value: string; label: string }[] = [
  { value: 'full-stack', label: 'The complete platform' },
  { value: 'trading', label: 'Trading platforms' },
  { value: 'dealer', label: 'Dealer systems' },
  { value: 'crm', label: 'CRM' },
  { value: 'portals', label: 'Client / IB portals' },
  { value: 'pamm-copy', label: 'PAMM & Copy Trading' },
  { value: 'website', label: 'Brokerage website' },
  { value: 'other', label: 'Something else' }
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [interest, setInterest] = useState('full-stack');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return; // honeypot — silent drop
    setStatus('submitting');
    setErrorMessage(null);

    // Insert into Supabase leads (sales pipeline)
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('leads').insert({
        contact_name: name.trim(),
        email: email.trim() || null,
        company: company.trim() || null,
        country: country.trim() || null,
        source: 'website',
        stage: 'new',
        interest:
          INTEREST_OPTIONS.find((o) => o.value === interest)?.label ?? interest,
        message: message.trim() || null
      });
      if (error) throw error;
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not save your message. Please try again or email us directly.'
      );
      return;
    }

    // Also POST to Netlify Forms (existing inbox stays working)
    try {
      const formData = new URLSearchParams({
        'form-name': 'contact',
        name,
        email,
        company,
        country,
        interest,
        message
      });
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
    } catch {
      // Netlify is best-effort; Supabase already captured the lead
    }

    setStatus('success');
    setName('');
    setEmail('');
    setCompany('');
    setCountry('');
    setInterest('full-stack');
    setMessage('');
  };

  return (
    <form
      className="surface-card grid gap-5 p-7 md:p-9"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      name="contact"
      onSubmit={submit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out:{' '}
          <input
            name="bot-field"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </label>
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          value={name}
          onChange={setName}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          required
          value={email}
          onChange={setEmail}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Company"
          name="company"
          value={company}
          onChange={setCompany}
        />
        <Field
          label="Country / jurisdiction"
          name="country"
          value={country}
          onChange={setCountry}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
          I&apos;m interested in
        </label>
        <select
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
        >
          {INTEREST_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-brand-ink-soft">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
          Tell us about your project
        </label>
        <textarea
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-brand-mist placeholder:text-brand-mist/30 focus:border-brand-cyan focus:outline-none"
          placeholder="Stage, license, asset coverage, target launch date, anything we should know."
        />
      </div>

      {status === 'error' && (
        <div className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </div>
      )}
      {status === 'success' && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Thanks — your message landed in our pipeline. We&apos;ll be in touch
          within one business day.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-brand-ink transition-all hover:bg-brand-cyan/90 hover:shadow-glow-cyan disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs text-brand-mist/45">
        By submitting, you agree to be contacted by GIORAPTOR about your
        enquiry. We don&apos;t share contact details with third parties.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  value,
  onChange
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
        {label}
        {required && <span className="text-brand-cyan"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist placeholder:text-brand-mist/30 focus:border-brand-cyan focus:outline-none"
      />
    </div>
  );
}
