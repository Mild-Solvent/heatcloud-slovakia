---
id: datacenter-heat-district-energy
title: Datacenter waste heat as district energy
kind: field
status: emerging
category: physical-world
monetization:
  - colocation and cloud hosting revenue (the actual business)
  - regulated or contracted heat sales into district networks
  - avoided-cost heat purchase agreements with heat utilities
  - grant-subsidised build margin on the thermal side (EU funds)
scores:
  demand: 3
  margin: 2
  moat: 4
  incumbency: 3
  capital: 5
  speed: 1
  ai_leverage: 3
  regulatory: 4
  displacement: 1
confidence: low
links:
  - sk-dc-heat-utility
  - grid-der-orchestration
  - ai-inference-infrastructure
  - legacy-public-sector-replacement
tags: [energy, datacenter, district-heating, waste-heat, slovakia, physical-world, regulated, eu-funds]
evidence:
  - claim: A running datacenter reinjects ~95% of consumed power as 67°C district heat via heat pumps
    source: evidence/infomaniak-d4-heat-recovery-2024
    date: 2024-11-11
    strength: reported
  - claim: Standardised heat offtake exists at €35-45/MWh in Nordic capitals; Octopus invested £200M in the micro-DC variant
    source: evidence/dc-heat-reuse-economics-comparables-2026
    date: 2026-08-28
    strength: reported
  - claim: Slovak regulated heat variable component averages €93.4/MWh (2025), gas-set
    source: evidence/sk-heat-market-prices-2025
    date: 2025-01-01
    strength: reported
  - claim: EED 2023/1791 forces waste-heat CBAs on every EU datacenter >1MW
    source: evidence/sk-eu-heat-funding-stack-2026
    date: 2023-09-20
    strength: reported
open_questions:
  - Can a private DC operator hold a Slovak heat licence and keep the spread between heat-pump cost and gas-set regulated prices, or does ÚRSO's cost-audit regime hand the spread to the offtaker?
  - Is there any Slovak site where multi-MW grid connection, an amortised or expandable CZT network, and fibre coexist within ~2 km — or does the physical intersection kill the field locally?
  - Does the compute side clear on its own? If Slovak/CEE colo demand cannot fill 5 MW at €130+/kW/month, the heat story is decoration on a stranded asset.
updated: 2026-08-28
---

## Where the money is

Two budget lines, wildly unequal, and the field only makes sense if you keep
them in the right order.

**Line one: compute.** Colocation in secondary European markets clears at
roughly €100–180/kW/month; cloud services layered on top (VPS, storage,
managed hosting — the Infomaniak model) multiply revenue per MW several times
over. A 5 MW IT-load facility at healthy occupancy is a €7–10M/year colo
business before any cloud layer. Slovakia's entire existing market is small —
~14 facilities, ~30 MW total, two-thirds of it in Bratislava — which cuts both
ways: little competition, and little proven demand
([evidence](dc-heat-reuse-economics-comparables-2026.md)).

**Line two: heat.** Every MWh of electricity a datacenter eats leaves as
30–45°C heat. Captured and lifted by heat pump to network temperature, it
becomes sellable district heat. In the Nordics, where this is already a
standardised traded product, it fetches €35–45/MWh — roughly €200–350k per MW
of IT load per year. In Slovakia the comparable marginal heat is **gas-fired
and regulated at a €93.4/MWh average variable component**
([evidence](sk-heat-market-prices-2025.md)), so the same physical
product is worth about twice as much per MWh — and the buyer is under EU
pressure to decarbonise. District heating reaches ~1.8M Slovaks; the state's
MH Teplárenský Holding alone serves ~320,000 households across six cities.

The arithmetic that governs everything: delivered waste heat costs
approximately *P_electricity / (COP − 1)* per MWh_th (the heat itself is free;
you pay for the lift). At Slovak industrial power around €150–180/MWh and COP
4, that is €50–60/MWh_th against a €93 gas-set reference. The spread is real
but it is a **spread on a small number**. Heat is 10–20% of project revenue at
best. Anyone who pitches this field heat-first has the business upside down —
including, historically, most of the startups in it.

**Line three, the odd one: subsidy.** The EU is unusually willing to pay for
exactly this shape of project. EED 2023/1791 obliges every EU datacenter over
1 MW to assess waste-heat recovery; Slovakia has ~€3.89bn of Modernisation
Fund to spend by 2030 with district heating as a named priority, a state-aid
scheme for efficient CZT investment with a €50M notification ceiling, and EIB
technical-assistance programmes already operating in Slovak towns
([evidence](sk-eu-heat-funding-stack-2026.md)). The thermal half
of the capex can plausibly be a third grant-funded. The compute half cannot,
and never will be.

## Who owns it today

Nobody owns the *combination*, which is the finding.

- **Heat**: MH Teplárenský Holding (state, six cities), municipal teplárne,
  and private operators — Veolia, Engie, KOOR — own the networks and the
  customer relationships, all under ÚRSO price regulation. They are
  gas-heavy, under-capitalised for decarbonisation, and publicly squabbling
  about heat prices. None of them runs compute.
- **Compute**: Deutsche Telekom, VNET, Datacube and a handful of others run
  Slovakia's ~30 MW. None of them sells heat. Hyperscalers skipped Slovakia
  entirely (nearest regions: Vienna, Warsaw).
- **The combination, abroad**: Infomaniak (Geneva, running since 2024),
  Stockholm/Helsinki/Copenhagen DCs selling into open heat markets, Deep
  Green/Qarnot at the micro end with serious backing (£200M from Octopus).
  All of them are compute businesses that added heat, or utilities buying
  heat — no one has built a standalone company on the seam and made it big.

`incumbency: 3`: the halves are owned, the join is not.

## Where the seams are

- **Gas-parity pricing in a gas-locked market.** Slovak CZT's marginal heat is
  gas at ~€93/MWh variable. Waste heat delivered at €50–60 cost can undercut
  it by 20–30% *and* count as decarbonisation the network operator must
  otherwise buy with capex it does not have. The seam is selling the heat
  utility its own compliance story cheaper than gas.
- **The EED forcing function.** Every new EU datacenter >1 MW now has to
  produce a waste-heat CBA. A developer who arrives with the heat offtake
  pre-contracted — Infomaniak-style, utility at the table before ground-break
  — turns a permitting burden into a permitting asset. In a small country the
  number of people who can assemble that deal is approximately zero; being
  the one who can is the moat (`moat: 4`, same logic as
  grid-der-orchestration: the rules are the
  product surface).
- **Micro before macro.** The Deep Green wedge — 200–500 kW compute containers
  in municipal pools, hospitals, aquaparks, selling heat at gas-minus-20% —
  needs no ÚRSO supplier licence (heat consumed on-site), no multi-MW grid
  connection, and produces a reference plant plus political goodwill for a
  fraction of the capital. It is the only version of this field with
  `speed` better than 1.
- **The funding-assembly seam.** Municipalities with dying gas teplárne
  qualify for money they do not know how to reach (ELENA pays 90% of the
  engineering; TARGET already did it for Partizánske). Whoever does the
  paperwork chooses the technology. That is a services wedge that can fund
  the research for the infrastructure play — adjacent to what
  legacy-public-sector-replacement
  says about who wins public procurement.

## What would have to be true

Falsifiable, in checking order:

1. **A Slovak heat network will sign a heat purchase agreement ≥€55/MWh_th
   for 10+ years.** Checkable by asking MH Teplárenský Holding and two
   municipal teplárne. If the honest answer is avoided-cost-minus, the heat
   line dies and only the compute business remains.
2. **A site exists with ≥5 MW connectable grid capacity within ~2 km of a CZT
   network with summer demand** (hot water load; heat with no summer sink is
   worth ~60% of face value). Checkable against ZSD/SSD/VSD connection queues
   and network maps.
3. **Slovak/CEE demand can fill 5 MW of IT load within 24 months at
   ≥€120/kW/month** — sovereignty/GDPR workloads, Slovak public sector, AI
   inference overflow from Vienna. Checkable by pre-selling: LOIs before
   steel.
4. **A private operator can be an eligible applicant** under the CZT state-aid
   scheme and Modernisation Fund calls, at ≥30% realised aid intensity on the
   thermal capex. Checkable with one grant consultant and one state-aid
   lawyer.
5. **ÚRSO's price regime lets the producer keep the spread** rather than
   auditing it away. Checkable by reading the pricing decree against a model
   filing — before, not after, incorporation.

## Kill criteria

- Two of the three big heat networks (MHTH, Veolia, a large municipal) decline
  a heat PPA above €45/MWh_th → the Slovak premium is theoretical; the field
  collapses to the Nordic version, which is a yield enhancer for DCs that
  would exist anyway — i.e. not a field, a feature.
- No qualifying site (grid + network + fibre) after a real screen of the six
  MHTH cities plus the ten largest municipal systems → physically dead here,
  regardless of economics.
- Colo pre-sales stall below 1 MW of LOIs in six months of trying → the
  compute leg fails and heat cannot save it; walk away, or shrink to the
  Deep Green micro wedge permanently.
- ÚRSO treats recovered heat revenue as a cost offset in the DC's *other*
  regulated dealings, or the licence regime demands the full regulated-utility
  apparatus for <10 GWh/yr sales → margin evaporates in compliance.

## Why it ranks where it does

Scored honestly, this is a **bad fit for this corpus and possibly a good
business**: `capital: 5` and `speed: 1` are the worst pairing in the repo —
tens of millions and 3–5 years to first full revenue, versus software fields
that reach revenue in months on nothing. `margin: 2` because it is
infrastructure with a regulated component, not software. It stays in the
corpus because `displacement: 1` (no model eats a heat main), `moat: 4`, and
because the micro wedge plus the funding-assembly seam are things a small
team *can* start — and because the EED just forced every datacenter in
Europe to become a potential customer of whoever understands this. Compare
ai-inference-infrastructure: same compute
demand tailwind, but this variant trades speed for a physical moat and a
subsidy stack. The full read-through to a concrete Slovak deployment, with
numbers, lives in [sk-dc-heat-utility](sk-dc-heat-utility.md).
