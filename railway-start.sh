#!/bin/sh
# Builds Form.io's NODE_CONFIG from Railway variables, then starts the official server.
set -e
cd /app

missing=""
for v in MONGO_URL JWT_SECRET DB_SECRET ROOT_EMAIL ROOT_PASSWORD; do
  eval "val=\${$v:-}"
  [ -n "$val" ] || missing="$missing $v"
done
if [ -n "$missing" ]; then
  echo "railway-start: missing required variable(s):$missing" >&2
  exit 1
fi

NODE_CONFIG="$(node /app/railway-config.js)"
export NODE_CONFIG

exec node --no-node-snapshot main
