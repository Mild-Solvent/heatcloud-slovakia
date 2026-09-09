# HeatCloud product site (`site/`)

The **commercial** site — an Infomaniak-shaped product catalogue, pricing, and
an interactive preview of how the business works. This is a different thing from
the repo-root `index.html`, which is the research and pitch dossier.

Next.js 16 (App Router) + Tailwind, TypeScript, no other runtime dependencies.

It is a **preview**: the company is not incorporated, no service is operating,
nothing can be ordered. A strip at the top of every page says so, `robots.txt`
disallows everything, and the legal notice uses explicit placeholders instead of
invented registration numbers.

## What is in it

35 routes, all prerendered at build time:

| Route | What it is |
| --- | --- |
| `/` | Hero, the heat-flow diagram, the product grid, the business teaser |
| `/products/` + 14 `[slug]` pages | Cloud Servers, Public Cloud, Kubernetes, GPU Cloud, Object Storage, Databases, Backup, Web Hosting, Domains, Streaming, hSuite, hMail, hDrive, Heat Offtake |
| `/pricing/` | Every plan in one filterable table, with VAT and annual-billing toggles |
| **`/business/`** | **The interactive unit-economics model** — sliders for load, utilisation, compute price, power price, gas price, discount, offtake and COP; live EBITDA, revenue split, sensitivity table, and a with/without-heat comparison |
| **`/console/`** | **A mock of the customer console** — instances, storage, invoice, and the heat-contribution tab |
| `/heat/`, `/datacenters/`, `/about/`, `/support/`, `/contact/` | The rest of the marketing surface |
| `/legal/` + 7 `[doc]` pages | Terms, AUP, SLA, Privacy, DPA, Cookies, Legal notice |

The legal texts are drafts written to Slovak/EU shape (Act 22/2004 on electronic
commerce, Act 102/2014 on consumer distance contracts, Act 431/2002 on
accounting, GDPR Articles 28/32/33, EED 2023/1791 for the heat side). **No
advocate has reviewed them.** Each document says so at the top.

## Where the content lives

| File | What it holds |
| --- | --- |
| `content/services.ts` | The whole catalogue — one object per product. Drives the mega-menu, the product pages, `/pricing/` and the footer. Add an object and everything follows. |
| `content/legal.ts` | The seven legal documents, as arrays of `{ h, body }` sections |
| `content/company.ts` | Brand, placeholder legal identity, regions, and the dossier's reference figures |
| `content/html.ts` | `esc` / `table` helpers used inside the authored HTML fragments |
| `components/BusinessModel.tsx` | The interactive model, including every assumption as a named constant |
| `components/HeatFlow.tsx` | The hero diagram — electricity in, compute out of the top, heat out of the side |

### The model's assumptions

All at the top of `components/BusinessModel.tsx`, and restated in the footnote on
the page: PUE 1.15, 95% heat recovery, €4/MWh thermal maintenance, €800k/MW/year
overhead opex, €6.8m/MW IT capex, €1.1m/MW thermal capex, 8.5 MWh/year per Slovak
flat, 0.202 t CO₂/MWh for displaced gas heat.

The default compute price is **€380/kW/month**, which is a cloud rate rather than
a wholesale colocation rate. This matters: at colocation rates the site does not
clear its costs on compute alone, and the whole thesis of the site is that it
must. Drag the slider down to see that happen.

## Building and running

```sh
npm install
npm run dev        # http://localhost:8431
npm run build      # prerenders all 35 routes
npm run typecheck
```

## Serving it from the devbox

```sh
ssh remotemaster@devbox.tail20cc8f.ts.net
cd ~/github/heatcloud-slovakia/site
bash deploy.sh          # docker build + run, defaults to port 8420
bash smoke.sh           # 48 HTTP checks against the running site
node uitest.mjs         # 20 browser checks + screenshots into shots/
```

`deploy.sh` binds the container to the machine's **Tailscale address only** —
reachable from the tailnet, not from the LAN — with Docker's `unless-stopped`
restart policy. Port 8420 stays clear of the ports reserved on that box.

`uitest.mjs` needs Playwright's chromium once:
`npx playwright@1.63.0 install chromium`. It drives the real interactions (mega
menu, sliders, console tabs, VAT toggle, FAQ) and sweeps all 32 content routes at
three viewport widths checking for horizontal overflow.

Live at **http://devbox.tail20cc8f.ts.net:8420/** while the container is up.

## Not done yet

- **Slovak translation.** The dossier at the repo root is bilingual; this is
  English only. The content is already separated from the components, so a
  second locale is a content addition rather than a rewrite — but a Slovak cloud
  provider's terms of business should exist in Slovak first.
- No backend: the contact form composes a `mailto:` in the visitor's own client,
  and the console is a static mock.
- No OG image of its own; it borrows the dossier's `og.png`.

## History

This replaces an earlier hand-rolled static generator in `cloud/`, removed in the
same commit that added this. It is recoverable from commit `290252e` if any of
that copy is ever wanted back — though all of the service and legal content was
carried across into `content/`.
