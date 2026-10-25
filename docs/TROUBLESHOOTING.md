# Troubleshooting

## Samsung Home appears and stays there

First open Launcher manually from Samsung Home. Retry: launcher → YouTube → Home. The physical Home button is not remapped; automatic return only works while the launcher can run its background watcher.

Run this diagnostic from the project folder:

```sh
npm run check-home
```

It opens debug mode, reports the effective return settings and Samsung foreground API availability, then attempts to restore normal mode even if the check fails. Leave the TV on during the check. If cleanup fails, run `npm run undebug` manually. This is an API availability check, not a substitute for the remote-button test.

Expected: `samsungApiLoaded: true`, `foregroundApi: "function"`, and both return settings `true`. The foreground value depends on which app is showing during the check.

- **API missing:** confirm `launcher/index.html` loads `$WEBAPIS/webapis/webapis.js` before `main.js`, then deploy this edition. The missing script caused this exact failure on the tested Frame. If it still fails, the firmware may not expose this API; timing changes cannot fix an unavailable API.
- **Return disabled:** remove a false override in `launcher/config.local.js`, then redeploy.
- **You just double-pressed Back:** return is deliberately paused for two minutes. Open Launcher manually to resume using it.
- **It works only after opening Launcher manually:** the app may have been stopped by a full restart or memory pressure. Try Autorun Last App if present, keep Launcher first in Samsung Home, and test your model's startup behavior. This app cannot guarantee system-level startup.
- **API works but detection does not:** Samsung Home app IDs may differ. A developer can inspect the foreground value while Samsung Home is visible and set `samsungHomeIds` in local config. Do not add streaming app IDs to that list or the launcher could interrupt playback.

## Settings keep disappearing

From Launcher, press Back twice quickly to open Samsung Home and pause return for two minutes. Navigate to settings during that interval. For a longer pause, disable `returnToLauncher` locally and deploy.

## No TV connection

Check both devices are on the same LAN, the TV is awake, and the Developer Mode host address matches this computer. A router reservation can prevent address changes. Guest Wi-Fi, VPNs, or client isolation may block discovery. Run `npm run doctor` and `npm run find-tv -- YOUR_TV_IP`. Never publish your local settings files to troubleshoot.

## Certificate/install error

Use a Samsung TV certificate, include this TV's DUID, and set `CERT_PROFILE` to the actual profile name. A certificate for one TV does not automatically authorize a second. Keep the certificate files/password private. `sdb shell` returning `closed` on retail TVs is not by itself a failed install.

## Missing or dimmed tiles

Run `npm run apps` and update the favorites `match` array with the installed app's actual ID. Install streaming apps through Samsung first. The launcher does not download them. Set `hideMissing: true` if you want missing tiles removed.

## Slow or partial display

Default startup uses plain CSS and bundled vectors; no image downloads are needed. Confirm you deployed from this public repo and did not add large images or remote logo URLs. Custom images must finish loading before the complete-screen reveal. A browser preview does not reproduce TV performance.

## Black screen or debug session left open

Run `npm run undebug` to close debug forwarding and relaunch normally. If the TV disconnected, reconnect it and retry. Do not leave debugging open on a shared network.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run doctor` | Check installation prerequisites |
| `npm run apps` | List installed app IDs |
| `npm run deploy` | Package, sign, install, launch |
| `npm run check-home` | Check API/settings and restore normal mode |
| `npm run preview` | Local browser appearance preview |
| `npm run debug` | Start TV debugging |
| `npm run undebug` | End debugging and launch normally |
| `npm run test-tv` | Upstream on-TV diagnostics, after starting debug; finish with undebug |

The Home-return mechanism depends on Samsung APIs and background execution that vary by firmware. No universal compatibility or permanent Home-key reassignment is promised.
