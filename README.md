# HeatCloud Slovakia

Research and pitch dossier: **Infomaniak-style cloud datacenters attached to
Slovakia's district heating networks** — compute sold at market rates, recovered
heat at gas-minus-20%, EU decarbonisation funding on the thermal capex.

The site (`index.html`, no build step) is published via GitHub Pages and covers:

- Thesis and how the energy/money flows work
- Market: Slovak DC capacity, district heating reach, regulated heat prices
- Reference 5 MW deployment model (energy balance, revenue, capex)
- EU funding stack (Modernisation Fund, Program Slovensko, ELENA/TARGET, EIB/EBRD)
- Business and regulatory requirements (Act 657/2004, ÚRSO, grid, EED 2023/1791)
- The 300 kW aquapark wedge pilot
- Investor and ally targets, roadmap, risks and kill criteria, sources

Source of truth is the private research corpus (field
`datacenter-heat-district-energy`, play `sk-dc-heat-utility` and four evidence
notes). Edit there first; this site is the presentation layer.

All figures are desk estimates for evaluation — not engineering, an offer, or
investment advice.

## Languages

The site ships English and Slovak side by side, toggled by the EN/SK button in
the nav. Both versions live in `index.html` as parallel `[data-pane]` blocks —
Slovak section ids are prefixed `sk-`, and the toggle maps the current anchor
across languages so the reader keeps their place. The choice persists in
`localStorage`; first-time visitors get Slovak if their browser language is `sk`.

Editing rule: change both panes, or neither. The Slovak text is a real
translation using domestic terminology (CZT, teplárne, ÚRSO, odpadové teplo),
not a string-for-string swap of the English.
