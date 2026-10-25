#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
cleanup() { bash tools/undebug.sh || echo 'Cleanup failed. Reconnect the TV and run npm run undebug.' >&2; }
trap cleanup EXIT
bash tools/debug.sh
node tools/tv-debug.js eval '(function () { var c = Object.assign({}, window.LAUNCHER_CONFIG || {}, window.LAUNCHER_LOCAL || {}); var a = window.webapis && window.webapis.appcommon; var result = { samsungApiLoaded: !!window.webapis, foregroundApi: a ? typeof a.getForegroundAppId : "missing", returnToLauncher: c.returnToLauncher !== false, launcherOnPowerOn: c.launcherOnPowerOn !== false }; try { result.foreground = a && a.getForegroundAppId ? a.getForegroundAppId() : null; } catch (e) { result.error = String(e); } return result; })()'
