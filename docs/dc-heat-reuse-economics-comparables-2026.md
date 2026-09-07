---
id: dc-heat-reuse-economics-comparables-2026
title: Heat-reuse economics — Stockholm pays €35-45/MWh; Octopus put £200m into Deep Green
kind: evidence
source: eurelectric.org (Stockholm Exergi), datacenterdynamics.com, octopus.energy, sciencedirect.com review S1364032125005362, turnerandtownsend.com cost index
retrieved: 2026-08-28
bears_on: [datacenter-heat-district-energy, sk-dc-heat-utility]
strength: reported
links: [datacenter-heat-district-energy]
tags: [datacenter, waste-heat, comparables, stockholm, deep-green, capex]
updated: 2026-08-28
---

## What it says

The reference economics from markets where datacenter heat is already traded:

- **Stockholm Data Parks / Open District Heating**: Stockholm Exergi buys
  waste heat under standardised, temperature-indexed contracts priced off the
  network's avoided production cost. Reported heat purchase prices in
  Stockholm/Copenhagen/Helsinki: **€35–45/MWh**; a DC earns roughly
  **€190k/MW/year** (SEK 2M/MW/yr). The utility pays for the pipe connection;
  the DC pays for its heat pumps. Waste heat became a *revenue line*, but a
  minor one — it converts a cooling cost into a small profit.
- **Deep Green (UK)**: Octopus Energy invested **£200M (2024)** in micro
  datacenters sited inside swimming pools and heat networks; a Devon pool cut
  its heating bill >60%. The pitch: 1% of UK DC demand could heat 1,500 pools.
  This is the capital-light end of the same field — compute goes to the heat,
  not pipes to the compute.
- **Academic review (2025, Renewable & Sustainable Energy Reviews)**: across
  documented DC-to-DH projects, heat pump **COP 3.2–5.0** is typical when
  lifting 30–45°C server heat to network temperature; DCs reject nearly all
  consumed electricity as low-grade heat.
- **Datacenter capex benchmarks (2025)**: ~**$10M/MW** typical all-in for
  cloud/colo builds; Frankfurt/London ~$14M/MW; Turner & Townsend index +5.5%
  y/y. This is what the compute side of any combined project costs regardless
  of the heat story.

## What it changes

Two things on [datacenter-heat-district-energy](datacenter-heat-district-energy.md):

1. Confirms `emerging` status — heat offtake is contracted and standardised in
   at least three European capitals, and a serious utility wrote a £200M
   cheque for the thesis. This is no longer speculative.
2. Caps expectations on `margin`: at €35–45/MWh, heat revenue per MW of IT
   load is ~€200–350k/yr against ~$10M/MW capex. Heat *cannot carry* a
   datacenter's capital cost anywhere in Europe. It is a 2–5% yield enhancer
   and a permitting/funding story. The Slovak twist — gas-priced heat at
   ~€93/MWh variable ([sk-heat-market-prices-2025](sk-heat-market-prices-2025.md))
   — roughly doubles the Nordic heat revenue per MWh, but does not change the
   conclusion, only softens it.

## How much to trust it

Stockholm numbers come from the utility's own advocacy pieces (`reported`,
borderline anecdote on the €190k/MW figure). Deep Green's "1,500 pools" is
marketing. The COP range is from a peer-reviewed literature survey and is the
most trustworthy item here. Capex index is a QS firm selling cost consulting —
directionally solid, precisely self-interested.
