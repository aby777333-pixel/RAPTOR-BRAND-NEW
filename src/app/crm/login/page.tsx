'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

type Mode = 'signin' | 'signup';

export default function CrmLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    const supabase = getSupabase();
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        router.replace('/crm/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        if (data.session) {
          router.replace('/crm/');
        } else {
          setInfo(
            'Account created. Check your inbox to confirm your email, then sign in.'
          );
          setMode('signin');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-10">
      <div className="surface-card w-full max-w-md p-8">
        <h1 className="font-display text-2xl tracking-tight">
          {mode === 'signin' ? 'Sign in to the CRM' : 'Create your CRM account'}
        </h1>
        <p className="mt-2 text-sm text-brand-mist/60">
          GIORAPTOR internal — for staff, sales, and ops.
        </p>

        <form className="mt-7 space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === 'signin' ? 'current-password' : 'new-password'
              }
              className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-brand-ink transition-all hover:bg-brand-cyan/90 disabled:opacity-50"
          >
            {busy
              ? 'Working…'
              : mode === 'signin'
              ? 'Sign in'
              : 'Create account'}
          </button>

          <p className="text-center text-sm text-brand-mist/60">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                    setInfo(null);
                  }}
                  className="text-brand-cyan hover:underline"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setError(null);
                    setInfo(null);
                  }}
                  className="text-brand-cyan hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
