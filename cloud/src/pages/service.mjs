import { services, groups, byGroup, bySlug } from '../services.mjs';
import { section, heading, cards, table, plans, faq, cta, crumbs, icon, note, esc } from '../lib.mjs';

// ------------------------------------------------------------ /services/
export function servicesIndex() {
  const body = crumbs([['Home', '/'], ['Services']]) + `
<section class="sec-tight">
  <div class="wrap">
    ${heading('Every service we run', {
      kicker: 'Catalogue',
      lede: `${services.length} services, all on our own hardware in Slovakia, all under the same terms and the same SLA framework.`,
    })}
  </div>
</section>` + groups.map((g) => section(`
    <h2>${g.title}</h2>
    <p class="lede">${g.blurb}</p>
    ${cards(byGroup(g.key).map((s) => ({
      href: `/services/${s.slug}/`, icon: s.icon, title: s.name, body: s.summary, meta: s.from,
    })), 'g3')}`, { id: g.key })).join('\n') + cta({
    title: 'Not sure which of these you need?',
    body: 'Describe the workload and we will tell you the cheapest thing that will actually hold it — including when that is not us.',
    primary: ['Ask us', '/contact/'],
    secondary: ['Compare prices', '/pricing/'],
  });

  return {
    path: '/services/',
    title: 'Services',
    description: `All ${services.length} HeatCloud services: cloud servers, OpenStack, Kubernetes, GPU, object storage, databases, backup, web hosting, domains, streaming, hSuite, hMail, hDrive and heat offtake.`,
    body,
  };
}

// ------------------------------------------------- /services/<slug>/
export function servicePage(s) {
  const group = groups.find((g) => g.key === s.group);

  const hero = `
<section class="hero" style="padding:2.6rem 0 2.2rem">
  <div class="wrap">
    <div class="hero-in">
      <div>
        <p class="kicker">${esc(group.title)}</p>
        <h1>${esc(s.name)}</h1>
        <p class="lede">${s.tagline}</p>
        <p><span class="badge badge-accent">${esc(s.from)}</span></p>
        <div class="btns">
          <a class="btn btn-primary" href="/contact/?service=${encodeURIComponent(s.name)}">Request access</a>
          ${s.plans ? '<a class="btn btn-ghost" href="#plans">See the plans</a>' : '<a class="btn btn-ghost" href="/heat/">How the heat works</a>'}
        </div>
      </div>
      <div class="panel">
        ${icon(s.icon, 'svc-ico')}
        ${s.intro}
      </div>
    </div>
  </div>
</section>`;

  const features = section(
    heading('What you get', { kicker: 'Features' }) +
    cards(s.features.map((f) => ({ title: f.title, body: f.body })), 'g2'),
  );

  const specs = section(
    heading('Technical specification', { kicker: 'Specs' }) +
    table(['', ''], s.specs.map(([k, v]) => [`<b>${k}</b>`, v])),
  );

  const planBlock = s.plans ? section(
    heading('Plans and prices', {
      kicker: 'Pricing',
      lede: 'All prices exclude 23% Slovak VAT. Business customers with a valid EU VAT number are invoiced under the reverse charge.',
    }) + plans(s.plans) +
    (s.planNote ? `<p class="small">${s.planNote}</p>` : ''),
    { id: 'plans' },
  ) : section(
    heading('Commercial shape', { kicker: 'How it is sold' }) +
    `<div class="panel"><p>${s.from === 'contracted, indexed to your gas cost'
      ? 'Heat is sold under a bilateral heat purchase agreement, not from a price list. Send us your network parameters and we will come back with an indicative term sheet.'
      : 'Contact us for pricing.'}</p>
      <div class="btns"><a class="btn btn-primary" href="/contact/?service=${encodeURIComponent(s.name)}">Start a conversation</a></div></div>`,
    { id: 'plans' },
  );

  const faqBlock = section(
    heading('Questions we actually get asked', { kicker: 'FAQ' }) + faq(s.faq),
  );

  const relatedBlock = section(
    heading('Often bought with this', { kicker: 'Related' }) +
    cards(s.related.map(bySlug).filter(Boolean).map((r) => ({
      href: `/services/${r.slug}/`, icon: r.icon, title: r.name, body: r.summary, meta: r.from,
    })), 'g3'),
  );

  const legalNote = section(
    `<p class="small">${esc(s.name)} is provided under our
    <a href="/legal/terms/">General Terms &amp; Conditions</a>, the
    <a href="/legal/aup/">Acceptable Use Policy</a> and the
    <a href="/legal/sla/">Service Level Agreement</a>. Where we process personal data on your
    behalf, the <a href="/legal/dpa/">Data Processing Agreement</a> applies automatically and
    needs no separate signature.</p>`,
    { tight: true },
  );

  const body = crumbs([['Home', '/'], ['Services', '/services/'], [s.name]]) +
    hero + features + specs + planBlock + faqBlock + relatedBlock + legalNote + cta({
      title: `Put ${esc(s.name)} to work.`,
      body: 'Tell us the shape of the workload and we will confirm what it costs and when we can serve it.',
      primary: ['Talk to us', `/contact/?service=${encodeURIComponent(s.name)}`],
      secondary: ['All services', '/services/'],
    });

  return {
    path: `/services/${s.slug}/`,
    title: s.name,
    description: s.summary,
    body,
  };
}

export const servicePages = () => services.map(servicePage);
