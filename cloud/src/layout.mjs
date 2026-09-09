import { site, company, nav, footerCols } from './site.mjs';
import { services, groups } from './services.mjs';
import { esc, raw, brandMark } from './lib.mjs';

const caret = `<svg class="caret" viewBox="0 0 10 10" fill="none" stroke="currentColor"
  stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m2 4 3 3 3-3"/></svg>`;

function servicesMenu() {
  const cols = groups.map((g) => `
        <div class="menu-col">
          <h4>${esc(g.title)}</h4>
          ${services.filter((s) => s.group === g.key).map((s) =>
            `<a href="/services/${s.slug}/">${esc(s.name)}<span>${esc(s.menuNote)}</span></a>`).join('\n          ')}
        </div>`).join('');
  return `
      <div class="menu" role="group" aria-label="Services">
        <div class="menu-grid">${cols}
        </div>
        <div class="menu-foot">
          <span class="small">${services.length} services, all running in Slovakia.</span>
          <a class="btn btn-sm" href="/services/">All services →</a>
        </div>
      </div>`;
}

function navBar(current) {
  const items = nav.map((item) => {
    if (item.menu === 'services') {
      const open = current.startsWith('/services/');
      return `
      <div class="has-menu" data-menu>
        <button type="button" aria-expanded="false"${open ? ' style="color:var(--ink)"' : ''}>
          ${esc(item.label)} ${caret}
        </button>${servicesMenu()}
      </div>`;
    }
    const cur = current === item.href;
    return `      <a href="${item.href}"${cur ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`;
  }).join('\n');

  return `
<header class="nav">
  <div class="nav-in">
    <a class="brand" href="/" aria-label="${esc(site.nameFull)} home">
      ${brandMark()}
      <span><b>HEATCLOUD</b><i>SLOVAKIA</i></span>
    </a>
    <nav class="nav-links" id="navlinks" aria-label="Main">
${items}
    </nav>
    <div class="nav-right">
      <a class="btn btn-sm btn-ghost btn-hide" href="/support/">Support</a>
      <a class="btn btn-sm btn-primary" href="/contact/">Talk to us</a>
      <button class="burger" id="burger" type="button" aria-expanded="false"
        aria-controls="navlinks" aria-label="Menu"><span></span></button>
    </div>
  </div>
</header>`;
}

function footer() {
  const cols = footerCols.map((c) => `
      <div>
        <h4>${esc(c.title)}</h4>
        <ul>${c.links.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul>
      </div>`).join('');

  return `
<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/" style="margin-bottom:.7rem">
          ${brandMark()}
          <span><b>HEATCLOUD</b><i>SLOVAKIA</i></span>
        </a>
        <p class="small" style="max-width:26rem">Sovereign Slovak cloud infrastructure whose
        waste heat is sold into district heating networks instead of being thrown at the sky.</p>
        <p class="small"><a href="mailto:${company.email}">${company.email}</a></p>
      </div>${cols}
    </div>
    <div class="foot-bottom">
      <span>© 2026 ${esc(company.legalName)} — ${esc(company.status)}.</span>
      <span>Prices in EUR excluding ${site.vatRate}% Slovak VAT. Site version ${esc(site.version)},
        updated ${esc(site.updated)}.</span>
    </div>
  </div>
</footer>`;
}

const SCRIPT = `
(function(){
  var burger = document.getElementById('burger');
  var links  = document.getElementById('navlinks');
  if (burger && links) {
    burger.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open && window.innerWidth <= 960 ? 'hidden' : '';
    });
  }
  var menus = Array.prototype.slice.call(document.querySelectorAll('[data-menu]'));
  function closeAll(except){
    menus.forEach(function(m){
      if (m === except) return;
      m.setAttribute('data-open','false');
      m.querySelector('button').setAttribute('aria-expanded','false');
    });
  }
  menus.forEach(function(m){
    var btn = m.querySelector('button');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = m.getAttribute('data-open') === 'true';
      closeAll(m);
      m.setAttribute('data-open', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });
  document.addEventListener('click', function(e){
    if (!e.target.closest || !e.target.closest('[data-menu]')) closeAll(null);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeAll(null);
      if (links && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      }
    }
  });
  // Prefill the contact form from ?plan= / ?service=
  var params = new URLSearchParams(location.search);
  var msg = document.getElementById('c-message');
  if (msg && !msg.value) {
    var p = params.get('plan'), s = params.get('service');
    if (p) msg.value = 'I would like to know more about the ' + p + ' plan.';
    else if (s) msg.value = 'I would like to know more about ' + s + '.';
  }
})();
`;

export function page({ path, title, description, body, ogTitle, noRibbon = false }) {
  const full = `${title} — ${site.nameFull}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#12161c">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${site.origin}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.nameFull)}">
<meta property="og:url" content="${site.origin}${path}">
<meta property="og:title" content="${esc(ogTitle || title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${site.origin}/assets/og.png">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${noRibbon ? '' : `<div class="ribbon"><b>Preview build.</b> This site is a design and copy draft for
  ${esc(site.nameFull)} — no service is live, no order can be placed, and the company details in the
  legal notice are placeholders. <a href="/legal/imprint/">What this means</a>.</div>`}
${navBar(path)}
<main id="main">
${raw(body)}
</main>
${footer()}
<script>${SCRIPT}</script>
</body>
</html>
`;
}
