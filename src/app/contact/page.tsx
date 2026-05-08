import type { Metadata } from 'next';

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
            <form
              className="surface-card grid gap-5 p-7 md:p-9"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              name="contact"
              action="/contact/?success=1"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Work email" name="email" type="email" required />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Company" name="company" />
                <Field label="Country / jurisdiction" name="country" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-brand-mist/60">
                  I&apos;m interested in
                </label>
                <select
                  name="interest"
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist focus:border-brand-cyan focus:outline-none"
                  defaultValue="full-stack"
                >
                  <option value="full-stack">The complete platform</option>
                  <option value="trading">Trading platforms</option>
                  <option value="dealer">Dealer systems</option>
                  <option value="crm">CRM</option>
                  <option value="portals">Client / IB portals</option>
                  <option value="pamm-copy">PAMM &amp; Copy Trading</option>
                  <option value="website">Brokerage website</option>
                  <option value="other">Something else</option>
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
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-brand-mist placeholder:text-brand-mist/30 focus:border-brand-cyan focus:outline-none"
                  placeholder="Stage, license, asset coverage, target launch date, anything we should know."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-brand-ink transition-all hover:bg-brand-cyan/90 hover:shadow-glow-cyan"
              >
                Send message
              </button>

              <p className="text-xs text-brand-mist/45">
                By submitting, you agree to be contacted by GIORAPTOR about your
                enquiry. We don&apos;t share contact details with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-brand-mist placeholder:text-brand-mist/30 focus:border-brand-cyan focus:outline-none"
      />
    </div>
  );
}
