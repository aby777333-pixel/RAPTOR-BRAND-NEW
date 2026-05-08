'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';

const NAV = [
  { href: '/crm/', label: 'Dashboard', match: /^\/crm\/?$/ },
  { href: '/crm/leads/', label: 'Leads', match: /^\/crm\/leads\/?$/ },
  { href: '/crm/brokers/', label: 'Brokers', match: /^\/crm\/brokers\/?$/ },
  {
    href: '/crm/affiliates/',
    label: 'Affiliates',
    match: /^\/crm\/affiliates\/?$/
  }
];

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const pathname = usePathname() ?? '/crm/';
  const router = useRouter();

  const onLogin = pathname.startsWith('/crm/login');

  useEffect(() => {
    if (auth.status === 'anon' && !onLogin) {
      router.replace('/crm/login/');
    }
    if (auth.status === 'authed' && onLogin) {
      router.replace('/crm/');
    }
  }, [auth.status, onLogin, router]);

  if (onLogin) {
    return <div className="min-h-[80vh]">{children}</div>;
  }

  if (auth.status !== 'authed') {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-brand-mist/60">Loading…</div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-10">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <aside>
          <div className="surface-card p-3">
            <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.22em] text-brand-mist/45">
              CRM
            </p>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active = item.match.test(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-brand-cyan/15 text-white'
                        : 'text-brand-mist/70 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="my-3 h-px bg-white/5" />
            <div className="px-3 pb-1 text-[11px] text-brand-mist/55 truncate">
              {auth.user?.email}
            </div>
            <button
              onClick={async () => {
                await getSupabase().auth.signOut();
                router.replace('/crm/login/');
              }}
              className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-brand-mist/70 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              Sign out
            </button>
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
