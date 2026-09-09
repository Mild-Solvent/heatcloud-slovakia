#!/usr/bin/env bash
# Build the HeatCloud product site and serve it from this machine on the tailnet.
# Run ON the devbox, from anywhere:  bash ~/github/heatcloud-slovakia/cloud/deploy/deploy.sh
#
# Binds only to the Tailscale address, so the preview is reachable from the
# tailnet and from nowhere else on the LAN.
set -euo pipefail

NAME=heatcloud-web
PORT=8420
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== building"
cd "$ROOT"
node build.mjs --check

echo "== resolving tailscale address"
TSIP="$(tailscale ip -4 2>/dev/null | head -1 || true)"
if [ -z "$TSIP" ]; then
  echo "!! no tailscale IPv4 found; refusing to bind 0.0.0.0" >&2
  exit 1
fi
echo "   $TSIP"

echo "== (re)starting container"
docker rm -f "$NAME" >/dev/null 2>&1 || true
docker run -d \
  --name "$NAME" \
  --restart unless-stopped \
  -p "${TSIP}:${PORT}:80" \
  -v "$ROOT/dist:/usr/share/nginx/html:ro" \
  -v "$ROOT/deploy/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:alpine >/dev/null

echo "== waiting for it to answer"
for i in $(seq 1 30); do
  if curl -fs -o /dev/null "http://${TSIP}:${PORT}/" 2>/dev/null; then break; fi
  sleep 0.5
done

echo "== serving on http://devbox.tail20cc8f.ts.net:${PORT}/"
docker ps --filter "name=$NAME" --format '   {{.Names}}  {{.Status}}  {{.Ports}}'
