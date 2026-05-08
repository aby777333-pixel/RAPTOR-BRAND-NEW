'use client';

import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './supabase';

export type AuthState = {
  status: 'loading' | 'authed' | 'anon';
  user: User | null;
  session: Session | null;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    user: null,
    session: null
  });

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setState({
        status: data.session ? 'authed' : 'anon',
        user: data.session?.user ?? null,
        session: data.session ?? null
      });
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setState({
        status: session ? 'authed' : 'anon',
        user: session?.user ?? null,
        session: session ?? null
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
