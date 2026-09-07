---
id: sk-heat-market-prices-2025
title: Slovak regulated heat — €93.4/MWh variable component, gas-dominated, state-subsidised
kind: evidence
source: urso.gov.sk, pravda.sk, teraz.sk, spectator.sme.sk (2024-2026)
retrieved: 2026-08-28
bears_on: [datacenter-heat-district-energy, sk-dc-heat-utility]
strength: reported
links: [datacenter-heat-district-energy, sk-dc-heat-utility]
tags: [slovakia, district-heating, regulated-price, urso, heat-market]
updated: 2026-08-28
---

## What it says

ÚRSO's published heat price data for 2025, plus 2026 guidance:

- Average **variable component: €0.0934/kWh = €93.4/MWh** for 2025 (down
  11.2% from 2024 on falling gas prices). Variable costs are ~72% of the
  average heat price.
- Average **fixed component: €235.90/kW** of contracted capacity per year (up
  3.6%).
- An average Slovak household pays **~€936/year** for district heat.
- 2026: ÚRSO expects heat prices roughly flat (~€4/yr average increase), but
  the household outcome depends on continued state energy subsidies — the
  government has been buying down regulated energy prices since 2022.
- Slovak district heating remains predominantly **gas-fired**; Bankwatch
  documented €55M of Modernisation Fund money going to *gas* district heating
  projects — nearly half the district-heating earmark — and notes Slovakia
  has no fossil phase-out plan for heating.
- Structure of the sector: **MH Teplárenský Holding** (state, formed 2022)
  owns the plants in Bratislava, Trnava, Martin, Žilina, Zvolen and Košice —
  ~320,000 households, ~1M people. The rest is municipal teplárne and private
  operators (Veolia, Engie, KOOR), all under ÚRSO two-component price
  regulation per Act 657/2004 and its pricing decrees.

## What it changes

This is the load-bearing number for
[sk-dc-heat-utility](sk-dc-heat-utility.md): the marginal heat Slovak
networks buy or make is gas-priced at ~€93/MWh variable. Recovered datacenter
heat delivered via heat pump costs roughly (electricity price ÷ (COP−1)) ≈
€40–55/MWh at current Slovak industrial power prices — there is a real spread,
which is not true in Nordic markets where heat is already cheap. It also
raises `regulatory` on the field: prices are set by ÚRSO cost audit, not by
the market, so the spread is captured only if the regulator lets you keep it,
or if you sell below the incumbent's regulated price directly to offtakers.

## How much to trust it

ÚRSO is the price regulator publishing its own weighted averages — as close to
authoritative as this market gets, hence `reported` rather than `measured`
(we have not reconciled the underlying decisions). The subsidy politics is
reported press coverage and can swing year to year; do not build a model that
only works if the 2025 subsidy regime persists.
