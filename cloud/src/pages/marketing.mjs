import { services, groups, byGroup } from '../services.mjs';
import { site, company, regions } from '../site.mjs';
import { section, sectionNarrow, heading, cards, stats, table, faq, cta, crumbs, note, checks, esc } from '../lib.mjs';

// --------------------------------------------------------------- /pricing/
export function pricing() {
  const rows = (key) => byGroup(key).flatMap((s) => (s.plans || []).map((p) => [
    `<a href="/services/${s.slug}/">${esc(s.name)}</a>`,
    esc(p.name),
    esc(p.for),
    p.specs.map((x) => `${x[0]} ${x[1]}`).join(', '),
    `<span class="price-cell">${esc(p.price)}</span> <span class="tiny">${esc(p.unit || '/month')}</span>`,
  ]));

  const head = ['Service', 'Plan', 'For', 'Includes', { t: 'Price', num: true }];

  const tables = groups.filter((g) => rows(g.key).length).map((g) => `
    <h2 id="${g.key}">${g.title}</h2>
    <p class="small">${g.blurb}</p>
    ${table(head, rows(g.key))}`).join('\n');

  const body = crumbs([['Home', '/'], ['Pricing']]) + `
<section class="sec-tight">
  <div class="wrap">
    ${heading('Every price, on one page', {
      kicker: 'Pricing',
      lede: 'No quote form to see a number, no "contact sales" on anything with a price list. All figures exclude 23% Slovak VAT.',
    })}
  </div>
</section>` + section(`
  ${cards([
    { title: 'VAT', body: 'Prices exclude VAT. Slovak customers and EU consumers pay 23%. Businesses elsewhere in the EU with a valid VAT number are invoiced under the reverse charge; customers outside the EU are invoiced without VAT.' },
    { title: 'Billing', body: 'Monthly in advance for subscriptions, monthly in arrears for metered usage. Card, SEPA direct debit or bank transfer. Annual payment takes 15% off subscription services.' },
    { title: 'Changing plans', body: 'Upgrade any time — the difference is prorated to the day. Downgrade at the end of a billing period. No cancellation fee, ever.' },
  ], 'g3')}`, { tight: true }) + section(tables) + section(
    heading('What is never charged extra', { kicker: 'Included' }) +
    checks([
      'Egress from Object Storage, hDrive and Managed Backup, within fair use.',
      'Restores, including full disaster-recovery restores into a Cloud Server.',
      'The Kubernetes control plane, on clusters of any size.',
      'DNS hosting and DNSSEC, whether or not the domain is registered with us.',
      'DDoS mitigation on every service.',
      'TLS certificates, including wildcards, on every hosted domain.',
      'Support, in Slovak, Czech or English — there is one tier and everybody is on it.',
      'Migration from your current provider, on annual plans.',
    ]),
  ) + section(
    heading('Questions about the bill', { kicker: 'FAQ' }) + faq([
      ['Is there a minimum term?', 'No, on monthly billing: everything can be cancelled at the end of the month in which you cancel. Annual plans run to the end of the paid year; if you cancel early we do not refund the remainder, which is the trade for the 15% discount.'],
      ['Do prices change?', 'We can change prices with 30 days written notice, and you can terminate without penalty inside that notice period. Registry price changes on domains are passed through at cost.'],
      ['What happens if I do not pay?', 'A reminder on day 3, suspension on day 7, deletion 30 days after suspension. You can export everything during that whole window. Details are in clause 7 of the Terms.'],
      ['Can we get a purchase order and 30-day invoicing?', 'Yes, for public bodies and companies above roughly €200/month. Ask on the contact form.'],
    ]),
  ) + cta({
    title: 'Want this modelled against your current bill?',
    body: 'Send us last month’s invoice from wherever you are now and we will map it line by line, including the parts where we come out more expensive.',
    primary: ['Send us an invoice', '/contact/'],
    secondary: ['Read the terms', '/legal/terms/'],
  });

  return { path: '/pricing/', title: 'Pricing', description: 'Every HeatCloud price on one page — compute, storage, web, workplace — in EUR excluding 23% Slovak VAT, with no egress charges and no cancellation fees.', body };
}

// ------------------------------------------------------------------ /heat/
export function heat() {
  const body = crumbs([['Home', '/'], ['Heat recovery']]) + `
<section class="hero" style="padding:3rem 0 2rem">
  <div class="wrap">
    <div class="hero-in">
      <div>
        <p class="kicker">Heat recovery</p>
        <h1>Where the heat goes.</h1>
        <p class="lede">Every watt that enters a datacenter leaves it as heat. The only question
        is whether it leaves through a chimney or through a pipe that ends in somebody's radiator.</p>
      </div>
      <div class="panel">
        ${stats([
          { n: '~95%', l: 'of electrical input recoverable' },
          { n: '40–50 °C', l: 'off the racks' },
          { n: '70–85 °C', l: 'into the network' },
          { n: '€93.4/MWh', l: 'the gas heat it displaces' },
        ])}
      </div>
    </div>
  </div>
</section>` + section(
    heading('The chain, step by step', { kicker: 'How it works' }) + `
    <div class="grid g2">
      ${[
        ['1 — Capture', 'Servers are cooled by water, not by blowing air at them. Direct-to-chip cold plates on GPU nodes and rear-door heat exchangers on general compute pick the heat up in a closed loop that leaves the hall at 40–50 °C.'],
        ['2 — Lift', 'That temperature is too low for a Slovak district network, which runs its primary at 70–85 °C. Industrial heat pumps lift it, consuming roughly one unit of electricity for every four to five units of heat delivered.'],
        ['3 — Deliver', 'The hot side feeds a plate exchanger at the utility’s substation. Past that flange it is the utility’s network, metered exactly like any other heat source they buy.'],
        ['4 — Fall back', 'When the network cannot take heat — a mild week in April, a planned outage — the loop is rejected to dry coolers instead. The datacenter never depends on the offtake to stay cool.'],
      ].map(([t, b]) => `<div class="card"><h3>${t}</h3><p class="small">${b}</p></div>`).join('')}
    </div>`,
  ) + section(
    heading('The economics, without the varnish', { kicker: 'Numbers' }) +
    `<p>These are desk estimates for a reference 5 MW electrical site, taken from the research
    dossier this company grew out of. They are good enough to decide whether to look further and
    not good enough to sign anything.</p>` +
    table(['Line', 'Reference value', 'Note'], [
      ['IT load', '5 MW electrical', 'Base-load, high utilisation — GPU and steady compute'],
      ['Recoverable heat', '~4.7 MW thermal', 'About 95% of electrical input, before heat-pump lift'],
      ['Heat pump COP', '4.0–5.0', 'Lifting a 45 °C loop to 75 °C'],
      ['Delivered heat cost', '~€55/MWh', 'Heat-pump electricity, maintenance, capex amortisation'],
      ['Displaced gas heat', '€93.4/MWh', 'Regulated Slovak delivered heat price, gas-fired'],
      ['Contract discount', 'gas minus ~20%', 'What the utility saves; what makes them sign'],
      ['Households served', '~5 000 flats', 'Marketing conversion at Slovak building stock, not metered delivery'],
    ]) + note(`<p><b>Where this is proven.</b> Infomaniak’s D4 datacenter in Geneva has fed
      essentially its entire electricity consumption into the Geneva district network as heat
      since 11 November 2024 — 1.7 MW thermal, servers at 40–45 °C, heat-pumped to about 67 °C.
      The engineering is not speculative. The Slovak part — the offtake contracts, the funding,
      the regulated price environment — is what we are building.</p>`),
  ) + section(
    heading('What it is not', { kicker: 'Honest limits' }, ) + `
    <div class="grid g2">
      ${[
        ['It is not carbon-free compute', 'The servers still draw grid electricity. What changes is that the heat displaces burned gas instead of being wasted, so the same joule does two jobs.'],
        ['It is not a summer product', 'District demand collapses in July. Annual delivery is contracted against a realistic seasonal profile, and summer heat is largely rejected.'],
        ['It does not work everywhere', 'It needs a network within a couple of kilometres, a utility willing to sign a 10–15 year agreement, and a site with power. That is a short list of places, and we are honest about which ones.'],
        ['It is not why you should buy compute', 'Buy the compute because the price, the jurisdiction and the support work for you. The heat is why the price can be what it is.'],
      ].map(([t, b]) => `<div class="card"><h3>${t}</h3><p class="small">${b}</p></div>`).join('')}
    </div>`,
  ) + section(
    `<div class="panel" id="dossier">
      <p class="kicker">Source material</p>
      <h2>The research this is based on is published in full.</h2>
      <p>Market sizing, the reference deployment model, the EU funding stack (Modernisation Fund,
      Programme Slovakia, ELENA/TARGET, EIB/EBRD), the regulatory requirements under Act 657/2004
      and ÚRSO, the pilot, and the kill criteria — including the ones that would sink it.</p>
      <div class="btns">
        <a class="btn btn-primary" href="https://mild-solvent.github.io/heatcloud-slovakia/">Open the dossier</a>
        <a class="btn btn-ghost" href="/services/heat-offtake/">Heat offtake for utilities</a>
      </div>
    </div>`,
  ) + cta({
    title: 'Run a district network?',
    body: 'Send us your primary and return temperatures, an annual load profile and your delivered gas heat cost. That is enough for an indicative term sheet.',
    primary: ['Talk to us about heat', '/contact/?service=Heat%20Offtake'],
    secondary: ['See the data centres', '/datacenters/'],
  });

  return { path: '/heat/', title: 'Heat recovery', description: 'How HeatCloud captures datacenter waste heat at 40–50 °C, lifts it with heat pumps to 70–85 °C and sells it into Slovak district heating networks below the cost of gas.', body };
}

// ----------------------------------------------------------- /datacenters/
export function datacenters() {
  const body = crumbs([['Home', '/'], ['Data centres']]) + `
<section class="sec-tight">
  <div class="wrap">
    ${heading('Where your data physically is', {
      kicker: 'Data centres',
      lede: 'Two Slovak regions planned, each sited against a district heating network. Nothing is replicated out of the country unless you configure it yourself.',
    })}
  </div>
</section>` + section(
    note(`<p><b>Status, stated plainly.</b> None of these sites is operating today. The company is
      in formation and the regions below are at design and site-selection stage. We publish the
      status of each one rather than implying a footprint we do not have.</p>`, 'warn') +
    table(['Region', 'City', 'Status', 'Heat network', 'Note'], regions.map((r) => [
      `<code>${r.code}</code>`, r.city,
      `<span class="badge">${r.status}</span>`, r.heat, r.note,
    ])),
  ) + section(
    heading('How the halls are built', { kicker: 'Design' }) + cards([
      { title: 'Liquid cooling as the default', body: 'Direct-to-chip on accelerators, rear-door heat exchangers on general compute. Air cooling is the exception, because air cannot carry heat anywhere worth selling it.' },
      { title: 'N+1 on everything that can fail', body: 'Two independent medium-voltage feeds, N+1 UPS and generation, N+1 cooling. Concurrent maintainability is the design target for the primary region.' },
      { title: 'Heat rejection that still works', body: 'Dry coolers sized for the full load, so the datacenter is never dependent on the district network being able to take heat.' },
      { title: 'Physical access control', body: 'Two-factor at the perimeter, mantrap, per-rack locks, CCTV with 90-day retention, and an access log you can request for your own cages.' },
      { title: 'Aiming at the usual certifications', body: 'ISO 27001 and ISO 50001 are the target for the first operating year, and we will publish the certificate rather than the intention when we have it.' },
      { title: 'Efficiency the regulation now expects', body: 'Waste-heat integration counts towards the efficient district heating criteria under EED 2023/1791 and towards the reporting obligations that come with it.' },
    ], 'g3'),
  ) + section(
    heading('Data residency and access', { kicker: 'Sovereignty' }) + `
    <p>Customer content is stored in the Slovak region you select. We do not replicate it to
    another country, and we do not operate a region outside Slovakia. Support engineers access
    customer systems only on a ticket you opened or an incident we have told you about, and every
    such access is logged and available to you on request.</p>
    <p>Sub-processors — the small number of third parties who can touch infrastructure or data —
    are listed by name, role and country in the <a href="/legal/dpa/">Data Processing
    Agreement</a>. We give 30 days notice before adding one, and you can object.</p>`,
  ) + cta({
    title: 'Need a site visit or a due-diligence pack?',
    body: 'For customers evaluating a migration, we will walk the site, share the single-line diagram and answer the procurement questionnaire.',
    primary: ['Request the pack', '/contact/'],
    secondary: ['How the heat works', '/heat/'],
  });

  return { path: '/datacenters/', title: 'Data centres', description: 'HeatCloud’s Slovak regions: Bratislava, Košice and Žilina, each sited against a district heating network, with liquid cooling, N+1 infrastructure and data residency in Slovakia.', body };
}

// ----------------------------------------------------------------- /about/
export function about() {
  const body = crumbs([['Home', '/'], ['Company']]) + `
<section class="sec-tight">
  <div class="wrap">
    ${heading('A hosting company with a second product: heat', {
      kicker: 'Company',
      lede: 'HeatCloud Slovakia is being built to sell compute at market rates and the heat it produces to district networks below the cost of gas.',
    })}
  </div>
</section>` + sectionNarrow(`
    <div class="prose">
      <h2>What we are doing</h2>
      <p>Slovak district heating is largely gas-fired, and the regulated delivered price sits
      around €93.4/MWh. A datacenter turns electricity into low-grade heat as an unavoidable
      by-product, and that heat can be delivered into a district network for roughly €55/MWh
      once heat pumps and capex are accounted for. Somebody is going to capture that spread.
      We would like it to be a Slovak company, with the servers and the data in Slovakia.</p>

      <h2>The sequence matters</h2>
      <p>Infomaniak — the Swiss host whose Geneva datacenter feeds its entire electrical
      consumption into the city network as heat — did it in a specific order: they were a
      profitable hosting business for decades, and the heat recovery came as a by-product of
      infrastructure they were building anyway. Nobody has yet made the reverse sequencing work,
      where the heat is the business and the compute is filler.</p>
      <p>So we are building the cloud business first. Every service on this site has to stand on
      its own commercial merits with the heat revenue set to zero. The heat contracts are what
      make the economics good; they are not what make them viable.</p>

      <h2>Where we are</h2>
      <p>The company is <b>in formation</b>. There is a research dossier, a service design, a
      pricing model, and conversations with heat utilities. There is not yet an operating
      datacenter, an incorporated entity, or a service you can buy. This website is a preview of
      what is being built, and it says so on every page rather than in a footnote.</p>

      <h2>How we intend to behave</h2>
      <ul>
        <li><b>Publish the numbers, including the bad ones.</b> The research dossier includes the
        kill criteria — the conditions under which this idea should be abandoned.</li>
        <li><b>No lock-in mechanics.</b> No egress fees, no renewal price traps, no proprietary
        API where a standard one exists, no fee for leaving.</li>
        <li><b>Say no clearly.</b> If a workload belongs somewhere else, or if we cannot serve
        the capacity you need on the date you need it, we say so instead of selling a queue
        position.</li>
        <li><b>One support tier.</b> Everybody gets the engineers. Paying more buys capacity and
        response times, not the right to reach a competent person.</li>
      </ul>

      <h2>Contact</h2>
      <p>General enquiries: <a href="mailto:${company.email}">${company.email}</a><br>
      Abuse reports: <a href="mailto:${company.abuse}">${company.abuse}</a><br>
      Security disclosures: <a href="mailto:${company.security}">${company.security}</a><br>
      Data protection: <a href="mailto:${company.dpo}">${company.dpo}</a></p>
      <p class="small">Full legal identity, or what exists of it so far, is on the
      <a href="/legal/imprint/">legal notice</a>.</p>
    </div>`) + cta({
    title: 'Want to be an early customer, a heat partner, or an investor?',
    body: 'All three conversations are open, and each of them starts the same way.',
    primary: ['Get in touch', '/contact/'],
    secondary: ['Read the research', 'https://mild-solvent.github.io/heatcloud-slovakia/'],
  });

  return { path: '/about/', title: 'Company', description: 'HeatCloud Slovakia: a cloud business being built to sell compute at market rates and its recovered heat to Slovak district heating networks below the cost of gas.', body };
}

// --------------------------------------------------------------- /support/
export function support() {
  const body = crumbs([['Home', '/'], ['Support']]) + `
<section class="sec-tight">
  <div class="wrap">
    ${heading('One support tier, and everybody is on it', {
      kicker: 'Support',
      lede: 'Answered in Slovak, Czech or English by engineers with access to the platform. Paying more buys faster response times, not a competent human.',
    })}
  </div>
</section>` + section(
    table(['Severity', 'What it means', { t: 'First response', num: false }, 'Channel'], [
      ['<b>S1 — Down</b>', 'A production service is unavailable or unusable and there is no workaround.', '1 hour, 24/7', 'Phone and ticket'],
      ['<b>S2 — Degraded</b>', 'Production is impaired, or a workaround exists but is not sustainable.', '4 business hours', 'Ticket'],
      ['<b>S3 — Question</b>', 'A question, a configuration problem, or a non-production issue.', '1 business day', 'Ticket or email'],
      ['<b>S4 — Request</b>', 'A change, a quota increase, or a feature question.', '3 business days', 'Ticket or email'],
    ]) +
    `<p class="small">Business hours are 08:00–18:00 CET, Monday to Friday, Slovak public holidays
    excluded. S1 is answered around the clock on every plan — including the €4.90 one.</p>`,
  ) + section(
    heading('What we do without being asked', { kicker: 'Operations' }) + cards([
      { title: 'Status page and incident notices', body: 'A public status page with per-service state, and an email to every affected customer within 30 minutes of an incident being confirmed — not after it is resolved.' },
      { title: 'Post-incident reports', body: 'Every S1 gets a written report within five working days: timeline, cause, what we changed. Published, not just sent to the people who complained.' },
      { title: 'Maintenance windows announced', body: 'Fourteen days notice for anything that can interrupt service, seven for security patching, and immediate for an actively exploited vulnerability — with an explanation afterwards.' },
      { title: 'Migration help', body: 'Moving in from another provider is free on annual plans, including out-of-hours DNS cutovers.' },
    ], 'g2'),
  ) + section(
    heading('SLA in one paragraph', { kicker: 'Guarantees' }) +
    `<p>Most services carry a 99.9% monthly availability commitment; Kubernetes control planes and
    replicated databases carry 99.95%. If we miss it, you get a credit against the next invoice —
    10% of the monthly fee below 99.9%, 25% below 99%, 50% below 95% — claimable within 30 days,
    calculated from our own monitoring. The full text, including what does not count as
    downtime, is in the <a href="/legal/sla/">Service Level Agreement</a>.</p>`,
  ) + section(
    heading('Reporting things', { kicker: 'Channels' }) + `
    <div class="grid g3">
      <div class="card"><h3>Abuse</h3><p class="small">Spam, phishing, malware or an attack from
        our address space: <a href="mailto:${company.abuse}">${company.abuse}</a>. Acknowledged
        within 24 hours; include full headers or logs with timestamps in UTC.</p></div>
      <div class="card"><h3>Security</h3><p class="small">Vulnerabilities in our platform:
        <a href="mailto:${company.security}">${company.security}</a>. We will not pursue anyone
        who reports in good faith and does not access other customers’ data.</p></div>
      <div class="card"><h3>Data protection</h3><p class="small">Access, erasure and other data
        subject requests: <a href="mailto:${company.dpo}">${company.dpo}</a>. Answered within one
        month, per the <a href="/legal/privacy/">Privacy Policy</a>.</p></div>
    </div>`,
  ) + cta({
    title: 'Something broken, or about to be?',
    body: 'Open a ticket, or tell us about the migration before you start it rather than after.',
    primary: ['Contact support', '/contact/'],
    secondary: ['Read the SLA', '/legal/sla/'],
  });

  return { path: '/support/', title: 'Support', description: 'HeatCloud support: one tier for every customer, S1 answered in one hour around the clock, published post-incident reports, and an SLA that pays credits without a fight.', body };
}

// --------------------------------------------------------------- /contact/
export function contact() {
  const options = services.map((s) => `<option>${esc(s.name)}</option>`).join('');
  const body = crumbs([['Home', '/'], ['Contact']]) + sectionNarrow(
    heading('Talk to us', {
      kicker: 'Contact',
      lede: 'One inbox, answered by the people building this. One working day, usually less.',
    }) + note(`<p><b>This preview has no server.</b> The form below composes an email in your own
      mail client — nothing is sent to us or stored anywhere by this page. You can also just
      write to <a href="mailto:${company.email}">${company.email}</a>.</p>`) + `
    <form class="panel" id="contact-form" style="display:grid;gap:.9rem" novalidate>
      <div>
        <label for="c-name" style="display:block;font-size:.85rem;font-weight:600;margin-bottom:.25rem">Your name</label>
        <input id="c-name" name="name" type="text" autocomplete="name"
          style="width:100%;padding:.6rem .7rem;border:1px solid var(--line);border-radius:9px;
          background:var(--bg);color:var(--ink);font:inherit">
      </div>
      <div>
        <label for="c-email" style="display:block;font-size:.85rem;font-weight:600;margin-bottom:.25rem">Email</label>
        <input id="c-email" name="email" type="email" autocomplete="email"
          style="width:100%;padding:.6rem .7rem;border:1px solid var(--line);border-radius:9px;
          background:var(--bg);color:var(--ink);font:inherit">
      </div>
      <div>
        <label for="c-topic" style="display:block;font-size:.85rem;font-weight:600;margin-bottom:.25rem">Topic</label>
        <select id="c-topic" name="topic"
          style="width:100%;padding:.6rem .7rem;border:1px solid var(--line);border-radius:9px;
          background:var(--bg);color:var(--ink);font:inherit">
          <option>General enquiry</option>
          <option>Migration from another provider</option>
          <option>Heat offtake (district network operator)</option>
          <option>Public sector procurement</option>
          <option>Investment</option>
          ${options}
        </select>
      </div>
      <div>
        <label for="c-message" style="display:block;font-size:.85rem;font-weight:600;margin-bottom:.25rem">What do you need?</label>
        <textarea id="c-message" name="message" rows="6"
          style="width:100%;padding:.6rem .7rem;border:1px solid var(--line);border-radius:9px;
          background:var(--bg);color:var(--ink);font:inherit"></textarea>
      </div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center">
        <button class="btn btn-primary" type="submit">Compose the email</button>
        <span class="tiny">Opens your mail client with the message filled in.</span>
      </div>
    </form>
    <script>
    (function(){
      var f = document.getElementById('contact-form');
      if (!f) return;
      f.addEventListener('submit', function(e){
        e.preventDefault();
        var v = function(id){ var el = document.getElementById(id); return el ? el.value : ''; };
        var subject = '[' + (v('c-topic') || 'Enquiry') + '] ' + (v('c-name') || 'Website enquiry');
        var lines = [v('c-message'), '', '--', v('c-name'), v('c-email')].join('\\n');
        window.location.href = 'mailto:${company.email}?subject=' +
          encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines);
      });
    })();
    </script>` + `
    <div class="grid g2" style="margin-top:1.6rem">
      <div class="card"><h3>Direct addresses</h3><p class="small">
        General: <a href="mailto:${company.email}">${company.email}</a><br>
        Abuse: <a href="mailto:${company.abuse}">${company.abuse}</a><br>
        Security: <a href="mailto:${company.security}">${company.security}</a><br>
        Data protection: <a href="mailto:${company.dpo}">${company.dpo}</a></p></div>
      <div class="card"><h3>Registered office</h3><p class="small">
        ${esc(company.legalName)}<br>${esc(company.seat)}<br>
        <span class="tiny">${esc(company.status)} — see the
        <a href="/legal/imprint/">legal notice</a>.</span></p></div>
    </div>`);

  return { path: '/contact/', title: 'Contact', description: 'Get in touch with HeatCloud Slovakia about cloud services, a migration, a district heating offtake contract, or investment.', body };
}

// ------------------------------------------------------------------- 404
export function notFound() {
  const body = sectionNarrow(
    heading('404 — that page is not here', {
      kicker: 'Not found',
      lede: 'The link is wrong, or the page moved while this site was being built. Both are possible in a preview.',
    }) + `
    <div class="btns"><a class="btn btn-primary" href="/">Back to the home page</a>
    <a class="btn btn-ghost" href="/services/">All services</a></div>`);
  return {
    path: '/404.html',
    title: 'Page not found',
    description: 'That page does not exist on the HeatCloud Slovakia site. Head back to the home page or the service catalogue.',
    body,
  };
}
