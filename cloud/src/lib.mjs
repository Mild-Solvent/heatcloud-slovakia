// Small HTML helpers. No dependencies, no templating engine — every page is a
// function returning a string, and these are the shared building blocks.

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Content copy is authored trusted (it is in this repo), so `raw` passes through.
export const raw = (s) => s ?? '';

export const slugify = (s) => String(s).toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const money = (n) => n == null ? '—'
  : '€' + Number(n).toFixed(2).replace(/\.00$/, '.–');

// ---------------------------------------------------------------- components

export const section = (inner, { id, cls = '', tight = false } = {}) =>
  `<section class="${tight ? 'sec-tight' : 'sec'} ${cls}"${id ? ` id="${id}"` : ''}>
  <div class="wrap">${inner}</div>
</section>`;

export const sectionNarrow = (inner, { id, cls = '' } = {}) =>
  `<section class="sec ${cls}"${id ? ` id="${id}"` : ''}>
  <div class="wrap-narrow">${inner}</div>
</section>`;

export const heading = (title, { kicker, lede, center = false, level = 2 } = {}) => `
  <div class="${center ? 'center' : ''}">
    ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
    <h${level}>${raw(title)}</h${level}>
    ${lede ? `<p class="lede">${raw(lede)}</p>` : ''}
  </div>`;

export const cards = (items, gridCls = 'g3') => `
  <div class="grid ${gridCls}">
    ${items.map((c) => c.href
      ? `<a class="card card-link" href="${c.href}">
           ${c.icon ? icon(c.icon) : ''}
           <h3>${raw(c.title)}</h3>
           <p class="small">${raw(c.body)}</p>
           ${c.meta ? `<p class="small" style="margin:.4rem 0 0"><b>${raw(c.meta)}</b></p>` : ''}
           <span class="svc-more">${raw(c.more || 'Learn more →')}</span>
         </a>`
      : `<div class="card">
           ${c.icon ? icon(c.icon) : ''}
           <h3>${raw(c.title)}</h3>
           <p class="small">${raw(c.body)}</p>
         </div>`).join('\n    ')}
  </div>`;

export const stats = (items) => `
  <div class="grid g4">
    ${items.map((s) => `<div class="stat"><span class="n">${raw(s.n)}</span><span class="l">${raw(s.l)}</span></div>`).join('\n    ')}
  </div>`;

export const checks = (items) =>
  `<ul class="checks">${items.map((i) => `<li><span>${raw(i)}</span></li>`).join('')}</ul>`;

export const table = (head, rows, { caption } = {}) => `
  <div class="tblwrap">
    <table>
      ${caption ? `<caption class="tiny" style="padding:.6rem .85rem;text-align:left">${raw(caption)}</caption>` : ''}
      <thead><tr>${head.map((h) => {
        const t = typeof h === 'object' ? h.t : h;
        const num = typeof h === 'object' && h.num;
        return `<th${num ? ' class="num"' : ''}>${raw(t)}</th>`;
      }).join('')}</tr></thead>
      <tbody>
        ${rows.map((r) => `<tr>${r.map((c, i) => {
          const num = typeof head[i] === 'object' && head[i].num;
          return `<td${num ? ' class="num"' : ''}>${raw(c)}</td>`;
        }).join('')}</tr>`).join('\n        ')}
      </tbody>
    </table>
  </div>`;

export const plans = (list) => `
  <div class="plans">
    ${list.map((p) => `
    <div class="plan${p.featured ? ' feat' : ''}">
      ${p.featured ? '<span class="tagtop badge badge-accent">Most chosen</span>' : ''}
      <h3>${raw(p.name)}</h3>
      <p class="small" style="margin:0">${raw(p.for)}</p>
      <p class="price">${raw(p.price)}<small> ${raw(p.unit || '/month')}</small></p>
      <p class="tiny" style="margin:0">excl. VAT</p>
      <ul>${p.specs.map((s) => `<li><b>${raw(s[0])}</b> ${raw(s[1] || '')}</li>`).join('')}</ul>
      <a class="btn ${p.featured ? 'btn-primary' : ''}" href="/contact/?plan=${encodeURIComponent(p.name)}">${raw(p.cta || 'Request access')}</a>
    </div>`).join('\n    ')}
  </div>`;

export const faq = (items) => items.map(([q, a]) => `
  <details class="faq">
    <summary>${raw(q)}</summary>
    <p>${raw(a)}</p>
  </details>`).join('\n');

export const note = (inner, kind = '') =>
  `<div class="note ${kind}">${raw(inner)}</div>`;

export const cta = ({ title, body, primary, secondary }) => `
<section class="sec">
  <div class="wrap">
    <div class="panel center">
      <h2>${raw(title)}</h2>
      <p class="lede">${raw(body)}</p>
      <div class="btns">
        <a class="btn btn-primary" href="${primary[1]}">${raw(primary[0])}</a>
        ${secondary ? `<a class="btn btn-ghost" href="${secondary[1]}">${raw(secondary[0])}</a>` : ''}
      </div>
    </div>
  </div>
</section>`;

export const crumbs = (trail) => `
<div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    ${trail.map(([label, href], i) => (i ? '<span>/</span>' : '') +
      (href ? `<a href="${href}">${esc(label)}</a>` : `<span style="margin:0">${esc(label)}</span>`)).join('')}
  </nav>
</div>`;

// Table of contents for legal documents; also returns the anchored headings.
export const legalDoc = (sectionsList) => {
  const toc = `
  <nav class="toc" aria-label="Contents">
    <h2>Contents</h2>
    <ol>${sectionsList.map((s) => `<li><a href="#${slugify(s.h)}">${esc(s.h)}</a></li>`).join('')}</ol>
  </nav>`;
  const body = sectionsList.map((s, i) =>
    `<h2 id="${slugify(s.h)}">${i + 1}. ${esc(s.h)}</h2>\n${raw(s.body)}`).join('\n');
  return toc + '\n' + body;
};

// ---------------------------------------------------------------------- icons
const ICONS = {
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.5 3.75 3.75 0 0 0 6.5 19z"/>',
  k8s: '<path d="M12 3 4.5 6.8v8.4L12 21l7.5-5.8V6.8z"/><circle cx="12" cy="12" r="2.6"/><path d="M12 3v6.4M4.5 6.8 10 11M19.5 6.8 14 11M12 21v-6.4"/>',
  chip: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21"/>',
  bucket: '<path d="M4 6h16l-1.6 13.2a1 1 0 0 1-1 .8H6.6a1 1 0 0 1-1-.8z"/><ellipse cx="12" cy="6" rx="8" ry="2.4"/>',
  db: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"/><path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3"/>',
  shield: '<path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 5 2.2A9 9 0 1 0 18 19"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  suite: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
  play: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m10.5 9.2 5 2.8-5 2.8z"/>',
  archive: '<rect x="3" y="4" width="18" height="4.5" rx="1.4"/><path d="M4.8 8.5V19a1 1 0 0 0 1 1h12.4a1 1 0 0 0 1-1V8.5"/><path d="M10 12h4"/>',
  flame: '<path d="M12 3s5.2 4.1 5.2 8.6A5.2 5.2 0 0 1 12 21a5.2 5.2 0 0 1-5.2-9.4C6.8 7.1 12 3 12 3z"/><path d="M12 21a2.6 2.6 0 0 0 2.6-4.4C14.6 14.5 12 12.5 12 12.5s-2.6 2-2.6 4.1A2.6 2.6 0 0 0 12 21z"/>',
  wave: '<path d="M3 8c2.2-2.4 4.4-2.4 6.6 0S14.2 10.4 16.4 8 21 5.6 21 5.6"/><path d="M3 14c2.2-2.4 4.4-2.4 6.6 0s4.6 2.4 6.8 0 4.6-2.4 4.6-2.4"/><path d="M3 20h18"/>',
  lock: '<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
  headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="12.5" width="4.5" height="7" rx="2"/><rect x="17" y="12.5" width="4.5" height="7" rx="2"/><path d="M19 19.5v.5a3 3 0 0 1-3 3h-2.5"/>',
  scale: '<path d="M12 4v16M6 8h12M8 20h8"/><path d="m6 8-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z"/>',
};

export const icon = (name, cls = 'svc-ico') => {
  const d = ICONS[name];
  if (!d) return '';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
};

export const brandMark = () => `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" stroke-opacity=".38" stroke-width="1.7"/>
  <g stroke="#3fb5b5" stroke-width="2.5" stroke-linecap="round">
    <line x1="12.96" y1="38.4" x2="35.04" y2="38.4"/>
    <line x1="14.30" y1="33.4" x2="33.70" y2="33.4"/>
    <line x1="15.66" y1="28.3" x2="32.34" y2="28.3"/>
  </g>
  <g stroke="#e8823f" stroke-width="2.4" stroke-linecap="round" fill="none">
    <path d="M14.4 21.1 C17.6 23.5, 20.8 23.5, 24 21.1 C27.2 18.7, 30.4 18.7, 33.6 21.1"/>
    <path d="M15.9 14.4 C18.6 16.3, 21.3 16.3, 24 14.4 C26.7 12.5, 29.4 12.5, 32.1 14.4"/>
  </g>
</svg>`;
