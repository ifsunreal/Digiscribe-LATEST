#!/bin/bash
# Passenger cannot directly execute nvm node binaries on some cPanel hosts.
# This shim loads nvm (if available) and then delegates to node.

export NVM_DIR="/home/.nvm"

# Load nvm if present
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  source "$NVM_DIR/nvm.sh" --no-use
fi

# If nvm put node on PATH, use it
if command -v node &>/dev/null; then
  exec node "$@"
fi

# Fallback: find the newest node binary installed under nvm
NODE_BIN=$(ls -1d /home/.nvm/versions/node/*/bin/node 2>/dev/null | sort -V | tail -1)
if [ -n "$NODE_BIN" ] && [ -x "$NODE_BIN" ]; then
  exec "$NODE_BIN" "$@"
fi

# Last resort: system node
SYS_NODE=$(command -v /usr/bin/node /usr/local/bin/node 2>/dev/null | head -1)
if [ -n "$SYS_NODE" ]; then
  exec "$SYS_NODE" "$@"
fi

echo "ERROR: No executable Node.js binary found." >&2
exit 1
