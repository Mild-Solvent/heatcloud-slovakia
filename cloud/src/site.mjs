// Global site configuration: brand, company identity, navigation, footer.
// Everything user-visible that is NOT service-catalogue copy lives here.

export const site = {
  name: 'HeatCloud',
  nameFull: 'HeatCloud Slovakia',
  tagline: 'The Slovak cloud that heats towns',
  // Served from the devbox over Tailscale; there is no public origin yet.
  origin: 'http://devbox.tail20cc8f.ts.net:8420',
  lang: 'en',
  vatRate: 23,          // Slovak standard VAT, 23% since 2025-01-01
  currency: '€',
  updated: '2026-09-09',
  version: '1.0-preview',
};

// Placeholder legal identity. These are deliberately NOT invented registration
// numbers — the entity is not incorporated, and the site says so everywhere the
// details would otherwise appear.
export const company = {
  legalName: 'HeatCloud Slovakia s. r. o.',
  status: 'in formation (v zakladaní) — not yet incorporated',
  seat: 'Bratislava, Slovak Republic',
  ico: 'not yet assigned',
  dic: 'not yet assigned',
  icdph: 'not yet assigned',
  register: 'to be registered in the Commercial Register of the Bratislava City Court',
  email: 'hello@heatcloud.sk',
  abuse: 'abuse@heatcloud.sk',
  security: 'security@heatcloud.sk',
  dpo: 'privacy@heatcloud.sk',
  law: 'Slovak law',
  courts: 'the courts of the Slovak Republic',
};

export const regions = [
  { code: 'sk-bts-1', city: 'Bratislava', status: 'in design',
    heat: 'Bratislava CHP network (MH Teplárenský holding)', note: 'Primary region. Two independent MV feeds, N+1 cooling, heat rejected to the city network above 5 °C ambient.' },
  { code: 'sk-kos-1', city: 'Košice', status: 'planned',
    heat: 'TEKO / Košice district heat', note: 'Second region for in-country redundancy and east-Slovak latency.' },
  { code: 'sk-zil-1', city: 'Žilina', status: 'candidate',
    heat: 'Žilinská teplárenská', note: 'Candidate site; heat offtake term sheet not signed.' },
];

// Top navigation. `menu` entries render a mega-menu; the services menu is built
// from the catalogue at render time.
export const nav = [
  { label: 'Services', menu: 'services' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Heat recovery', href: '/heat/' },
  { label: 'Data centres', href: '/datacenters/' },
  { label: 'Support', href: '/support/' },
  { label: 'Company', href: '/about/' },
];

export const footerCols = [
  {
    title: 'Compute',
    links: [
      ['Cloud Servers', '/services/cloud-servers/'],
      ['Public Cloud', '/services/public-cloud/'],
      ['Managed Kubernetes', '/services/kubernetes/'],
      ['GPU Cloud', '/services/gpu-cloud/'],
    ],
  },
  {
    title: 'Data',
    links: [
      ['Object Storage', '/services/object-storage/'],
      ['Managed Databases', '/services/databases/'],
      ['Managed Backup', '/services/backup/'],
      ['Data centres', '/datacenters/'],
    ],
  },
  {
    title: 'Web & work',
    links: [
      ['Web Hosting', '/services/web-hosting/'],
      ['Domain Names', '/services/domains/'],
      ['hSuite', '/services/hsuite/'],
      ['hDrive', '/services/hdrive/'],
      ['hMail', '/services/hmail/'],
      ['Streaming', '/services/streaming/'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms & Conditions', '/legal/terms/'],
      ['Acceptable Use Policy', '/legal/aup/'],
      ['Service Level Agreement', '/legal/sla/'],
      ['Privacy Policy', '/legal/privacy/'],
      ['Data Processing Agreement', '/legal/dpa/'],
      ['Cookie Policy', '/legal/cookies/'],
      ['Legal notice', '/legal/imprint/'],
    ],
  },
];
