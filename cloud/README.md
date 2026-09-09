# HeatCloud product site (`cloud/`)

The **commercial** site — the service catalogue, pricing and legal documents for
HeatCloud Slovakia as a cloud provider. This is a different thing from the
repo-root `index.html`, which is the research and pitch dossier.

It is a **preview**: the company is not incorporated, no service is operating,
nothing can be ordered. Every page carries a ribbon saying so, `robots.txt`
disallows everything, and the legal notice uses explicit placeholders instead of
invented registration numbers.

## What is in it

31 pages generated from data:

- Home, `/services/` index, and **14 service pages** — Cloud Servers, Public
  Cloud, Managed Kubernetes, GPU Cloud, Object Storage, Managed Databases,
  Managed Backup, Web Hosting, Domain Names, Streaming, hSuite, hMail, hDrive,
  and Heat Offtake (the one aimed at district heating operators).
- `/pricing/` — every plan from the catalogue on one page.
- `/heat/`, `/datacenters/`, `/about/`, `/support/`, `/contact/`.
- `/legal/` — index plus **seven documents**: General Terms & Conditions,
  Acceptable Use Policy, SLA, Privacy Policy, Data Processing Agreement, Cookie
  Policy, and the legal notice.
- `/404.html`, `sitemap.xml`, `robots.txt`.

The legal texts are drafts written to Slovak/EU shape (Act 22/2004 on electronic
commerce, Act 102/2014 on consumer distance contracts, Act 431/2002 on
accounting, GDPR Articles 28/32/33, EED 2023/1791 for the heat side). **No
advocate has reviewed them.** Each document says so at the top.

## Building

No dependencies, no lockfile, no install step. Node 20+:

```sh
node build.mjs --check      # writes dist/, verifies every internal link
```

`--check` fails the build if an internal link points at a page that does not
exist, or if a page is missing its title, description, nav or footer.

## Where the content lives

| File | What it holds |
| --- | --- |
| `src/site.mjs` | Brand, company identity, regions, nav, footer columns |
| `src/services.mjs` | The whole catalogue: one object per service, drives the pages, the menu, `/pricing/` and the footer |
| `src/lib.mjs` | HTML helpers and the icon set |
| `src/layout.mjs` | Page shell — head, nav with mega-menu, ribbon, footer, the one inline script |
| `src/styles.css` | The entire design system, light and dark |
| `src/pages/*.mjs` | One module per page family |

To add a service, add an object to `src/services.mjs`. Its page, its menu entry,
its pricing rows and its cards on the home page all follow.

## Serving it from the devbox

`dist/` is not committed — build it where you serve it.

```sh
ssh remotemaster@devbox.tail20cc8f.ts.net
cd ~/github/heatcloud-slovakia/cloud
bash deploy/deploy.sh        # builds, then runs nginx:alpine on the tailnet
bash deploy/smoke.sh         # 40 HTTP checks against the running site
```

`deploy.sh` binds the container to the machine's **Tailscale address only** on
port 8420 — reachable from the tailnet, not from the LAN — and restarts it with
Docker's `unless-stopped` policy. Port 8420 was chosen to stay clear of the
ports reserved on that box.

Live at **http://devbox.tail20cc8f.ts.net:8420/** while the container is up.

## Not done yet

- **Slovak translation.** The dossier at the repo root is bilingual; this site
  is English only. The generator is structured so a second locale is a content
  addition rather than a rewrite, but the work has not been done — and a Slovak
  cloud provider's terms of business should exist in Slovak first.
- No backend: the contact form composes a `mailto:` in the visitor's own client.
- No OG image of its own; it borrows the dossier's `assets/og.png`.
