---
id: sk-dc-heat-utility
title: HeatCloud — sovereign cloud datacenters heating Slovak towns
kind: play
fields:
  - datacenter-heat-district-energy
  - ai-inference-infrastructure
stage: researched
thesis: Build Infomaniak-style cloud datacenters attached to Slovakia's gas-locked district heating networks, selling compute at market rates and recovered heat at gas-minus-20%, with EU decarbonisation money covering a third of the thermal capex.
wedge: A 300 kW heat-reuse compute container in one municipal aquapark or pool, cutting its gas bill ~30% and producing the reference plant, before any full-scale build.
buyer: "Compute: CTOs/CIOs of Slovak enterprises and public bodies needing in-country hosting. Heat: konateľ/predstavenstvo of the town teplárne or MH Teplárenský Holding; for the wedge, the primátor and the aquapark operator."
assumptions:
  - At least one Slovak heat network or municipal heat offtaker will contract recovered heat at ≥€55/MWh_th for 10+ years.
  - 5 MW of grid connection is obtainable within 24 months at a site ≤2 km from a CZT network with year-round hot-water demand.
  - Slovak/CEE colo + sovereign-cloud demand fills 5 MW within 24 months of opening at ≥€120/kW/month.
  - The thermal share of capex achieves ≥30% grant intensity under the efficient-CZT state-aid scheme / Modernisation Fund.
  - A heat-pump COP ≥3.5 is achievable lifting 40°C server water to the network's actual supply temperature (not its nameplate).
kill_criteria:
  - MHTH plus two municipal teplárne all refuse heat PPAs above €45/MWh_th — the Slovak price premium is not capturable; fall back to compute-only economics, which we would not build for.
  - Grid connection queue for ≥5 MW exceeds 4 years at every screened site.
  - Fewer than 1 MW of compute LOIs after six months of pre-selling.
  - State-aid ruling excludes private DC operators from the CZT investment scheme and no municipal JV structure fixes it.
  - The wedge pilot cannot beat the pool's gas cost by ≥20% after metering a full season.
confidence: low
links:
  - datacenter-heat-district-energy
  - infomaniak-d4-heat-recovery-2024
  - sk-heat-market-prices-2025
  - dc-heat-reuse-economics-comparables-2026
  - sk-eu-heat-funding-stack-2026
tags: [slovakia, datacenter, district-heating, waste-heat, eu-funds, cloud, infrastructure]
updated: 2026-08-28
---

## The shape of it

Year one is **not a datacenter**. Year one is three things that cost under
€500k combined:

1. **The wedge pilot**: one immersion- or water-cooled compute container
   (~300 kW IT) placed at a municipal aquapark or pool, running sold GPU/CPU
   workloads, dumping its heat into the pool's hot-water loop through a heat
   exchanger. The pool pays gas-minus-20–30% for the heat; the compute is sold
   as batch capacity (render, CI, inference). Deep Green has proven exactly
   this unit economics in the UK — a Devon pool cut its heating bill by >60%
   ([comparables](dc-heat-reuse-economics-comparables-2026.md)).
   On-site consumed heat avoids the ÚRSO supplier-licence question entirely.
2. **The site screen and offtake LOIs** for the full build: six MHTH cities
   plus the ten largest municipal CZT systems, scored on grid capacity,
   network distance, summer heat demand, fibre. Output: one preferred site
   with a signed heat-offtake LOI and a grid connection application filed.
3. **The funding file**: ELENA/TARGET technical-assistance application with
   the host municipality, state-aid eligibility opinion, and a Modernisation
   Fund / Program Slovensko application mapped to the thermal capex.

The full build (year 2–4, only if the three assumptions above survive year
one) is a 5 MW IT-load facility — Infomaniak D4 translated to a Slovak town:
water-cooled racks, 40–45°C capture, heat pumps lifting to 70–85°C, injection
into the town network, colo plus a thin sovereign-cloud layer (VPS, S3, K8s)
on top.

## The numbers (reference deployment, 5 MW IT load)

All figures are desk estimates for arguing with, not engineering. Sources in
the linked evidence notes; the governing formula is marked.

**Energy balance**

| Quantity | Value | Basis |
|---|---|---|
| IT load | 5.0 MW | design choice |
| IT electricity /yr | 43.8 GWh | 5 MW × 8,760 h |
| Facility electricity (PUE ~1.15, water-cooled) | ~50 GWh/yr | Infomaniak-class efficiency |
| Recoverable low-grade heat (40–45°C) | ~40 GWh_th/yr | ~90% of IT energy |
| Heat pump COP (40→75°C) | 3.5–4.0 | literature range 3.2–5.0 |
| Delivered district heat | **~53 GWh_th/yr** | Q_out = Q_in × COP/(COP−1), COP 4 |
| Extra electricity for heat pumps | ~13 GWh/yr | Q_out − Q_in |
| Households served (10 MWh_th/yr each) | **~5,000 flats** | a district of a mid-size town |

**The governing spread.** Delivered heat cost ≈ electricity price ÷ (COP−1)
plus heat-pump O&M and capex recovery. At €165/MWh industrial power and COP 4:
**~€55/MWh_th all-in** (≈€41 electricity + ~€14 capex/O&M). Slovak regulated
variable heat averaged **€93.4/MWh in 2025**
([prices](sk-heat-market-prices-2025.md)). Sell at **€70/MWh_th**:
the offtaker saves ~25% versus gas and decarbonises; we clear ~€15/MWh_th
margin on 53 GWh = **~€0.8M/yr heat margin**, with upside if power is bought
smarter (off-peak, PPA) or COP lands higher. At Nordic-style €40/MWh offtake
the heat line loses money — which is why this play is Slovakia-specific.

**Revenue at maturity (year 3 of operation, 85% occupancy)**

| Line | €/yr | Basis |
|---|---|---|
| Colocation, 4,250 kW sold @ €140/kW/mo | ~€7.1M | secondary-market pricing |
| Sovereign cloud layer (VPS/S3/managed) uplift | €1–3M | Infomaniak model; requires product + sales, scored low confidence |
| Heat sales, 53 GWh_th @ €70 | ~€3.7M | of which ~€2.9M passes through to power + capex |
| **Total** | **€11–14M** | heat is ~15–20% of gross, less of margin |

**Capex**

| Item | €M | Basis |
|---|---|---|
| Datacenter shell, fit-out, power, cooling (5 MW) | 40–50 | ~$10M/MW European benchmark |
| Heat recovery: heat pumps (~7 MW_th), HX, buffer | 5–7 | €0.7–1M per MW_th installed |
| Network connection (≤2 km pre-insulated pair) | 1–2 | route-dependent |
| **Total** | **~46–59** | |
| Realistic grants (30–45% of thermal ~€7–9M) | −2.5 to −4 | CZT state-aid scheme + Modernisation Fund |
| ELENA/TARGET-funded engineering | −0.5 | 90% of development costs grantable |

The grants do not change the shape: **the compute business must service
~€40M+ of capital on its own**. Debt-wise that is EIB/EBRD/SIH territory at
infrastructure tenors, which requires the offtake contracts (both kinds) to
exist first. The wedge pilot, by contrast, is ~€350–450k all-in (container,
300 kW of compute, HX skid, install) and reaches revenue in under a year.

## Business requirements (the compliance map)

What has to be obtained, in rough order:

- **Company + heat licence**: povolenie from ÚRSO under Act 657/2004 for
  výroba a rozvod tepla (production and distribution) — needed only when
  selling heat off-site; the wedge avoids it. Odborný zástupca (qualified
  responsible person) required.
- **Osvedčenie o súlade** with the municipal heat concept (koncepcia rozvoja
  obce v tepelnej energetike) for new thermal capacity ≥10 MW_th — in
  practice means the town must *want* the project; get the memorandum first.
- **ÚRSO price regulation**: two-component heat price per the pricing decree
  — cost-audited. The €70/MWh strategy must be structured so the regulator
  sees justified costs (heat-pump electricity, capex depreciation) — flagged
  as the play's sharpest regulatory risk.
- **Grid connection**: application to the regional DSO (ZSD/SSD/VSD) or SEPS
  for ≥5 MW — the national bottleneck; file at LOI stage, not at permit
  stage.
- **Construction**: územné konanie + stavebné povolenie under the new
  construction act; EIA screening (datacenter with thermal plant likely
  triggers zisťovacie konanie).
- **EED obligations**: Art. 26 cost–benefit analysis (which this project
  passes by construction) and Art. 12 KPI reporting for DCs ≥500 kW — the
  wedge container at 300 kW ducks it; the full build reports.
- **Compute side**: ISO 27001 + eventually EUCS/SNAS accreditation if the
  sovereign-public-sector segment is real; GDPR residency is the sales
  wedge, so certification is not optional.

## Who to pitch (investors and allies)

Ordered by fit, with the reason they would take the meeting:

**Strategic / offtake-side (these come first — they make the story true)**
- **MH Teplárenský Holding** — state heat monopoly in six cities with a
  decarbonisation mandate and Modernisation Fund access; a heat PPA or JV
  here *is* the project. Pitch: we bring you compliant non-gas heat cheaper
  than your marginal gas, at zero capex to you.
- **Municipal teplárne + primátori** of towns like Partizánske (already in
  EIB TARGET planning, wants waste heat), Spišská Nová Ves (published 2025
  heat concept), and the aquapark towns for the wedge.
- **ESCO Slovensko (SPP + ČEZ JV), KOOR, Veolia Energia Slovensko** — ESCOs
  that could build-own-operate the thermal skid while we run compute.

**Institutional capital (full build)**
- **EIB** (ELENA, TARGET, senior debt — already lending into Slovak energy),
  **EBRD** (CEE district heating track record), **Slovak Investment Holding**
  (national promotional co-investor).
- **Wood & Company energy/infrastructure funds** and **Eterus Capital** (its
  Slovak PE arm) — CEE energy assets are their lane.
- **Octopus Energy Generation** — wrote the £200M Deep Green cheque; a CEE
  version with gas-priced heat offtake is a thesis extension, not a new idea
  for them.

**Venture / growth (wedge + cloud layer)**
- **Contrarian Ventures** (Vilnius, energy-transition-only VC, invests CEE),
  **2150**, **Extantia**, **World Fund** — European climate funds that have
  all backed heat or DC-efficiency plays.
- **Neulogy Ventures**, **ZAKA VC**, **Vision Ventures** — Slovak/CEE funds
  for the pre-seed wedge; **Crowdberry** specifically for a
  community/municipal co-investment round, which doubles as political
  air-cover in the host town.
- **Sandberg Capital** — Slovak growth fund with software DNA for the cloud
  layer once it has revenue.

**People who would read the paper** (roles, not commitments): the SIEA
efficient-heating programme office; ÚRSO's regulatory policy section (they
have publicly complained about gas dependence); the MH SR energy section
running the state-aid scheme; Bankwatch/energy-transition NGOs who want a
non-gas district heating flagship to point at; Slovak hosting founders
(Websupport alumni network) for the compute distribution.

## Why now

Four clocks started recently and none had struck before 2024: (1) EED
2023/1791 makes waste-heat assessment mandatory for every EU DC >1 MW —
compliance demand did not exist before; (2) Slovakia lost cheap Russian gas
transit and its heat sector is politically desperate for non-gas sources;
(3) the Modernisation Fund's district-heating money must be spent by 2030 and
is currently embarrassing its donors by flowing to gas; (4) AI inference
demand made small-market datacenters investable again. Infomaniak D4 went
live November 2024 and proved the integrated plant at city scale
([evidence](infomaniak-d4-heat-recovery-2024.md)).

## Why us

Honestly: no unfair advantage yet. No site, no licence, no anchor tenant, no
utility relationship. What exists is this research file, fluency in the EU
funding machinery, and software capability for the cloud layer — the part
every heat incumbent lacks. The wedge pilot is deliberately sized so that a
team with no track record can still execute it and convert "no advantage"
into "the only people in Slovakia who have actually done it".

## First 90 days

1. **Weeks 1–2**: one-page teaser + this model; book meetings with MHTH
   strategy, two municipal teplárne, one aquapark operator.
2. **Weeks 2–6**: state-aid + heat-licensing legal opinion (fixed fee,
   ~€5–10k); kills or confirms assumptions 1 and 4 on paper.
3. **Weeks 3–8**: site screen of the 16 candidate systems from public grid
   and network data; shortlist of 3.
4. **Weeks 6–10**: wedge pilot term sheet with one pool/aquapark: we install
   and operate, they buy heat at gas-minus-25%, 3-year term, exit clause.
5. **Weeks 8–12**: pre-sell compute: 10 conversations with Slovak
   enterprises/public bodies on in-country hosting; count LOI megawatts.
6. **Week 12**: go/no-go against the kill criteria; if go, raise ~€600k
   pre-seed (wedge + 12 months runway) from the Slovak VC list while filing
   the ELENA/TARGET application with the shortlisted town.

## What kills it

Ranked by likelihood: (1) ÚRSO price regulation quietly confiscates the
spread — most likely and least visible; (2) grid connection timelines make
the full build a 2030 story and investors pass; (3) compute demand in
Slovakia is thinner than the sovereignty narrative suggests and occupancy
stalls; (4) MHTH decides to do it itself with state money once the pilot
proves it — mitigated only by moving fast and holding the pilot's operating
know-how; (5) gas prices fall far enough that the €93 reference collapses
toward €60 and the heat margin with it.
