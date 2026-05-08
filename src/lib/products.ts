export type Product = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  features: string[];
  highlight: 'cyan' | 'gold';
};

export const PRODUCTS: Product[] = [
  {
    slug: 'trading-platforms',
    title: 'Multi-Asset Trading Platforms',
    tagline: 'Forex, indices, metals, energies, crypto — one terminal.',
    summary:
      'Institutional-grade web and mobile trading terminals with real-time pricing, advanced charting, depth-of-market, and order management. Built for low-latency execution and modern UX.',
    features: [
      'TradingView-grade charts with 80+ indicators',
      'One-click and ladder execution',
      'Web, desktop, and mobile (iOS / Android)',
      'Multi-account, multi-currency support',
      'Voice trading, hotkeys, and watchlists'
    ],
    highlight: 'cyan'
  },
  {
    slug: 'dealer-systems',
    title: 'Dealer & Dealing Desk',
    tagline: 'A-book / B-book routing, exposure, and risk in one console.',
    summary:
      'Bloomberg-style dealing desk with intelligent routing, toxic flow detection, exposure monitoring, and a full execution console. Run the book the way professional desks do.',
    features: [
      'Smart A/B routing engine with override controls',
      'Toxic flow detection and counterparty profiling',
      'Real-time exposure and margin surveillance',
      'Open book monitor and session P&L analytics',
      'AI auto-dealer with explainable decisions'
    ],
    highlight: 'gold'
  },
  {
    slug: 'crm',
    title: 'Brokerage CRM',
    tagline: 'Onboard, manage, and grow — every desk on one platform.',
    summary:
      'Centralized CRM that orchestrates brokers, affiliates, marketing teams, staff, and operational users. Lead pipelines, KYC/AML, segmentation, automations, and full lifecycle visibility.',
    features: [
      'Lead pipeline and conversion automation',
      'KYC / AML workflows with document review',
      'Role-based access for staff and partners',
      'Segmentation, campaigns, and outreach',
      'Audit trail across the entire client journey'
    ],
    highlight: 'cyan'
  },
  {
    slug: 'client-portals',
    title: 'Client Portals',
    tagline: 'A premium home for every trader.',
    summary:
      'Modern client portal for funding, account management, document submission, history, statements, and support. Branded to your house, integrated with your stack.',
    features: [
      'Multi-currency wallet and deposit / withdrawal',
      'Account opening with automated KYC',
      'Statements, history, and tax exports',
      'In-portal support and ticketing',
      'Personalization and content modules'
    ],
    highlight: 'cyan'
  },
  {
    slug: 'ib-portals',
    title: 'IB & Affiliate Portals',
    tagline: 'Multi-tier partner programs that actually scale.',
    summary:
      'Run IB and affiliate operations with confidence — multi-level commission schemes, real-time reporting, marketing materials, and automated payouts.',
    features: [
      'Multi-tier IB structures with custom rules',
      'Per-symbol, per-volume, and revenue-share models',
      'Marketing kits, links, and tracking codes',
      'Real-time partner dashboards and reports',
      'Automated commission calculation and payout'
    ],
    highlight: 'gold'
  },
  {
    slug: 'pamm',
    title: 'PAMM Systems',
    tagline: 'Managed accounts, transparent allocation.',
    summary:
      'Percentage Allocation Money Management with audit-ready accounting. Manager profiles, performance analytics, allocation rules, and investor protection built in.',
    features: [
      'Manager profiles with verified track records',
      'Proportional allocation across investor pools',
      'Performance fees, high-water marks, lock-ups',
      'Investor dashboards with daily statements',
      'Compliance controls and dispute resolution'
    ],
    highlight: 'gold'
  },
  {
    slug: 'copy-trading',
    title: 'Copy Trading',
    tagline: 'Strategy marketplace your traders will trust.',
    summary:
      'Social and copy trading with leaderboards, risk controls, and verified analytics. Discover strategies, allocate capital, and follow performers with full transparency.',
    features: [
      'Leaderboards with verified, third-party metrics',
      'Risk-adjusted ranking (Sharpe, drawdown, win rate)',
      'Per-strategy allocation and stop-loss caps',
      'Real-time mirroring with slippage controls',
      'Strategy-provider revenue share'
    ],
    highlight: 'cyan'
  },
  {
    slug: 'websites',
    title: 'Brokerage Websites',
    tagline: 'Premium broker websites, designed and shipped.',
    summary:
      'Fully developed broker websites with regulated copy, conversion-optimized layouts, multi-language support, and a content management workflow your marketing team will love.',
    features: [
      'Custom design tuned to your brand and license',
      'Conversion-optimized landing and product pages',
      'Multi-language and multi-region content',
      'Headless CMS for non-technical editing',
      'SEO, analytics, and consent management built in'
    ],
    highlight: 'gold'
  }
];
