import { services, groups, byGroup } from '../services.mjs';
import { section, heading, cards, stats, cta, icon, note, raw } from '../lib.mjs';

export function home() {
  const hero = `
<section class="hero">
  <div class="wrap">
    <div class="hero-in">
      <div>
        <p class="kicker">Sovereign cloud · Slovak racks · recovered heat</p>
        <h1>Cloud infrastructure that heats Slovak towns.</h1>
        <p class="lede">Servers, storage, mail and managed services run from data centres in
        Slovakia — and the heat they produce is sold into district heating networks instead of
        being blown into the sky. Same compute, one less boiler.</p>
        <div class="btns">
          <a class="btn btn-primary" href="/services/">Browse the services</a>
          <a class="btn btn-ghost" href="/heat/">How the heat recovery works</a>
        </div>
        <p class="tiny" style="margin-top:1rem">Prices in EUR excluding 23% VAT.
          No egress charges on storage. Data stays in Slovakia unless you move it.</p>
      </div>
      <div class="panel">
        <p class="kicker">The spread this is built on</p>
        <div class="grid" style="gap:.7rem">
          <div class="stat"><span class="n">€93.4<small style="font-size:.9rem">/MWh</small></span>
            <span class="l">What Slovak district heat costs today, gas-fired</span></div>
          <div class="stat"><span class="n">~€55<small style="font-size:.9rem">/MWh</small></span>
            <span class="l">What recovered datacenter heat costs to deliver</span></div>
          <div class="stat"><span class="n">~5 000</span>
            <span class="l">Flats a 5 MW site can heat through a district network</span></div>
        </div>
        <p class="tiny" style="margin:.9rem 0 0">Desk estimates from our
          <a href="/heat/#dossier">research dossier</a>, not an offer.</p>
      </div>
    </div>
  </div>
</section>`;

  const why = section(
    heading('Why anyone would buy from a Slovak cloud', {
      kicker: 'The case',
      lede: 'Three reasons, in the order customers actually raise them.',
      center: true,
    }) + cards([
      { icon: 'scale', title: 'Jurisdiction you can point at',
        body: 'Your data sits in Slovakia, under Slovak and EU law, operated by a company with no parent in a jurisdiction that can compel disclosure without an EU legal basis. For public bodies and healthcare that is not a preference, it is a procurement requirement.' },
      { icon: 'wave', title: 'A price that is not paid for twice',
        body: 'Heat sold to a district network is a second revenue stream on the same electricity. That is what funds no-egress storage and a free Kubernetes control plane instead of a marketing budget.' },
      { icon: 'headset', title: 'Support in Slovak, by people who run it',
        body: 'One support tier for everybody, answered in Slovak, Czech or English by engineers with access to the platform — not a script and an escalation queue.' },
    ]),
    { cls: '' },
  );

  const svcSections = groups.map((g) => `
    <h3 style="margin:2rem 0 .3rem">${g.title}</h3>
    <p class="small" style="margin:0 0 .9rem">${g.blurb}</p>
    ${cards(byGroup(g.key).map((s) => ({
      href: `/services/${s.slug}/`, icon: s.icon, title: s.name,
      body: s.summary, meta: s.from,
    })), 'g3')}`).join('\n');

  const catalogue = section(
    heading('Everything we run', {
      kicker: 'Services',
      lede: `${services.length} services across compute, storage, web, workplace and heat. All of them run on the same hardware, in the same halls, under the same terms.`,
    }) + svcSections,
    { id: 'services' },
  );

  const heatBlock = section(`
    <div class="hero-in">
      <div>
        <p class="kicker">The half nobody else sells</p>
        <h2>The waste heat is a product, not an emission.</h2>
        <p>A datacenter turns essentially all of its electricity into low-grade heat. Almost
        everyone throws that away. We take it off the racks at 40–50 °C, lift it with heat pumps
        to the 70–85 °C a Slovak district network runs at, and sell it to the utility under a
        long-term contract at a discount to what gas costs them.</p>
        <p>That contract is why the compute below it can be priced the way it is — and why a
        town gets a base-load heat source that does not burn anything.</p>
        <div class="btns">
          <a class="btn" href="/heat/">How it works</a>
          <a class="btn btn-ghost" href="/services/heat-offtake/">For heat utilities →</a>
        </div>
      </div>
      <div>
        ${stats([
          { n: '~95%', l: 'of electrical input recoverable as heat' },
          { n: '40–50 °C', l: 'temperature off the racks' },
          { n: '70–85 °C', l: 'delivered into the network' },
          { n: '10–15 yr', l: 'heat purchase agreement' },
        ])}
      </div>
    </div>`);

  const trust = section(
    heading('How we behave', { kicker: 'Terms, plainly' }) + cards([
      { icon: 'lock', title: 'No egress ransom',
        body: 'Getting data out of Object Storage, hDrive or a managed database costs nothing. A price that only works while you stay is not a price.' },
      { icon: 'shield', title: 'Renewal at the registration price',
        body: 'Domains, hosting and subscriptions renew at what you paid. No introductory rate that triples in year two.' },
      { icon: 'archive', title: '30 days before anything is deleted',
        body: 'Unpaid invoices suspend after 7 days and delete after a further 30. You can pull a full copy at any point in that window.' },
      { icon: 'scale', title: 'The SLA pays out without a fight',
        body: 'Credits are calculated from our own monitoring and applied to the next invoice when you claim within 30 days. The thresholds are in the SLA, not in a sales deck.' },
    ], 'g2'),
  );

  const dossier = section(
    `<div class="panel">
      <p class="kicker">Where this came from</p>
      <h2>A research dossier, then a company.</h2>
      <p>HeatCloud started as a desk study of one question: Slovak district heat is gas-fired at
      €93.4/MWh, recovered datacenter heat costs about €55/MWh to deliver — who captures the
      spread? The dossier that came out of it covers the market, a reference 5 MW deployment
      model, the EU funding stack, the regulatory requirements under Act 657/2004 and ÚRSO, and
      the risks that would kill it.</p>
      <p>It is published in full, including the numbers that do not flatter the idea.</p>
      <div class="btns">
        <a class="btn" href="https://mild-solvent.github.io/heatcloud-slovakia/">Read the dossier</a>
        <a class="btn btn-ghost" href="/about/">About the company</a>
      </div>
    </div>`);

  const body = hero + why + catalogue + heatBlock + trust + dossier + cta({
    title: 'Tell us what you need to run.',
    body: 'A workload, a migration date, a heat network, or a question about the terms. We answer in one working day.',
    primary: ['Talk to us', '/contact/'],
    secondary: ['See the pricing', '/pricing/'],
  });

  return {
    path: '/',
    title: 'Cloud infrastructure that heats Slovak towns',
    ogTitle: 'The Slovak cloud that heats towns',
    description: 'Servers, storage, mail and managed services in Slovak data centres — with the waste heat sold into district heating networks. Prices in EUR, no egress fees, data stays in Slovakia.',
    body,
  };
}
