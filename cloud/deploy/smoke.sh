#!/usr/bin/env bash
# Smoke-test the served site. Run ON the devbox after deploy.sh.
#   bash ~/github/heatcloud-slovakia/cloud/deploy/smoke.sh [base-url]
set -uo pipefail

BASE="${1:-http://$(tailscale ip -4 | head -1):8420}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
fail=0; n=0

check() { # url expected-status [expected-substring]
  local url="$1" want="$2" needle="${3:-}"
  local body code
  body="$(curl -sS -o /tmp/smoke.body -w '%{http_code}' "$url" 2>/dev/null)"; code="$body"
  n=$((n+1))
  if [ "$code" != "$want" ]; then
    printf '  FAIL  %-58s %s (wanted %s)\n' "${url#$BASE}" "$code" "$want"; fail=$((fail+1)); return
  fi
  if [ -n "$needle" ] && ! grep -qF -e "$needle" /tmp/smoke.body; then
    printf '  FAIL  %-58s missing %q\n' "${url#$BASE}" "$needle"; fail=$((fail+1)); return
  fi
  printf '  ok    %-58s %s\n' "${url#$BASE}" "$code"
}

echo "== smoke test against $BASE"

# Every generated page, derived from the build output rather than a hand list,
# so a new page cannot be forgotten here.
while IFS= read -r f; do
  rel="${f#$ROOT/dist}"
  url="$BASE${rel%index.html}"
  check "$url" 200 "</html>"
done < <(find "$ROOT/dist" -name index.html | sort)

echo "== assets and metadata"
check "$BASE/assets/styles.css"   200 "--accent"
check "$BASE/assets/favicon.svg"  200 "svg"
check "$BASE/sitemap.xml"         200 "<urlset"
check "$BASE/robots.txt"          200 "Disallow: /"

echo "== error handling"
check "$BASE/nope/"               404 "404"
check "$BASE/services/nothing/"   404 "404"

echo "== content spot checks"
check "$BASE/"                    200 "Cloud infrastructure that heats Slovak towns"
check "$BASE/legal/terms/"        200 "General Terms"
check "$BASE/legal/dpa/"          200 "Article 28"
check "$BASE/legal/sla/"          200 "Service credits"
check "$BASE/pricing/"            200 "excluding 23% Slovak VAT"
check "$BASE/services/gpu-cloud/" 200 "H200"
check "$BASE/legal/imprint/"      200 "placeholders"

echo
if [ "$fail" -eq 0 ]; then
  echo "PASS — $n checks"
else
  echo "FAIL — $fail of $n checks failed"
fi
exit $((fail > 0))
