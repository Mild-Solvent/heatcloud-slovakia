---
id: infomaniak-d4-heat-recovery-2024
title: Infomaniak D4 reinjects ~100% of datacenter power as district heat in Geneva
kind: evidence
source: news.infomaniak.com, siemens.com, tranetechnologies.com, theenergyst.com (2024-2026)
retrieved: 2026-08-28
bears_on: [datacenter-heat-district-energy, sk-dc-heat-utility]
strength: reported
links: [datacenter-heat-district-energy]
tags: [datacenter, district-heating, waste-heat, switzerland, reference-plant]
updated: 2026-08-28
---

## What it says

Infomaniak's D4 datacenter in Geneva — underground, beneath a public park —
has been feeding essentially all of its electricity consumption back into the
Canton of Geneva's district heating network as heat since 11 November 2024.
The published numbers:

- ~10,000 servers; roughly **95% of consumed energy reused as heat**.
- Server-side heat comes off at **40–45°C**, is captured by air–water heat
  exchangers and lifted by **Trane heat pumps to district temperature (~67°C,
  up to 85°C design)** before injection into the SIG (Services Industriels de
  Genève) network.
- **1.7 MW of recovered thermal output**, marketed as heating ~6,000
  energy-efficient homes in winter, avoiding up to **3,600 t CO₂/year** versus
  gas.
- The project was developed *with* the utility (SIG) and a housing cooperative
  — the offtake was contracted before the concrete was poured.
- Siemens and Trane both use it as a flagship reference, which is why the
  engineering detail is public.

Infomaniak itself is the interesting part commercially: a ~30-year-old
profitable Swiss hosting company (mail, kDrive, VPS, S3-compatible storage)
that built the datacenter *for its own cloud workloads*. The heat recovery is
a by-product of a business that already had revenue — not the business itself.

## What it changes

Anchors the technical feasibility claims in
[datacenter-heat-district-energy](datacenter-heat-district-energy.md):
40–45°C capture, heat-pump lift to ~70°C, ~95% recovery are demonstrated in a
running plant, not a paper study. It also sets the honest framing for the
Slovak play: Infomaniak sequenced **cloud revenue first, heat second**. Nobody
has yet made the reverse sequencing work.

## How much to trust it

Vendor and operator publications — every party quoted (Infomaniak, Siemens,
Trane, SIG) benefits from the story. The engineering numbers are plausible and
consistent across four independent-ish sources, so `reported`, but the "6,000
homes" figure is a marketing conversion of 1.7 MW at Swiss new-build
efficiency, not a metered delivery statistic. Treat the CO₂ figure the same
way.
