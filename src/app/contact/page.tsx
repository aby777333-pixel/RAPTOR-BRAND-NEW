import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to GIORAPTOR about your brokerage technology requirements. Demos, integration discovery, and partnerships.'
};

const REASONS = [
  {
    title: 'Request a Demo',
    body: 'Walk through the trading platform, dealer console, CRM, and IB portal with a member of our team.'
  },
  {
    title: 'Integration Discovery',
    body: 'Mapping your bridges, LPs, PSPs, KYC vendors, and BI stack into a single rollout plan.'
  },
  {
    title: 'White-Label Launch',
    body: 'Branding, regulatory copy, multi-language content, and your full broker website — shipped as a unit.'
  },
  {
    title: 'Partnerships',
    body: 'Liquidity providers, payment partners, data vendors, and marketplace integrators welcome.'
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-white/5">
        <div className="container-page py-14 md:py-20">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-cyan">
            Contact
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Let&apos;s talk about your{' '}
            <span className="text-gradient-brand">brokerage</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-brand-mist/75 leading-relaxed text-lg">
            Tell us where you are — pre-launch, mid-migration, or scaling — and
            we&apos;ll respond within one business day with the right next step.
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl">
              What can we help you with?
            </h2>
            <ul className="mt-7 space-y-4">
              {REASONS.map((r) => (
                <li key={r.title} className="surface-card p-5">
                  <h3 className="font-medium text-white">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-mist/65 leading-relaxed">
                    {r.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
