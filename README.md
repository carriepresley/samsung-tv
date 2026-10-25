# Samsung TV — Glass Launcher

A minimal home screen for Samsung Tizen TVs: **Welcome**, four clear glass tiles with white app marks, and a plain charcoal background. No personal photos, paid service, or downloaded logo pack is needed for the default design.

Derived from [dylanfernandezdelara/samsung-tv-launcher](https://github.com/dylanfernandezdelara/samsung-tv-launcher), with glass styling, older-TV spacing fixes, a complete-screen reveal, and a Samsung API loading fix for automatic return.

## Read this first

This is a **developer-installed Tizen app**, not a Samsung system launcher replacement or a TV app-store download. Setup requires a computer, Samsung Developer Mode, and your own signing certificate. It is not a one-click installation.

The physical **Home button remains Samsung's Home button**. While the launcher is running in the background, it detects Samsung Home and brings itself forward. A brief Samsung screen can still appear. Back inside another app follows that app's behavior; return happens when Samsung Home appears.

The Home-return fix was successfully tested on a **2021 Samsung Frame QN55LS03AAFXZA**: leave YouTube, press Home, briefly see Samsung Home, then return to the launcher. The personal predecessor also ran on a Samsung DU8000, but this public build has not been separately tested on that model. Overnight/cold-boot behavior and other firmware versions are not guaranteed. If Samsung kills the app or the TV fully restarts, you may need to open Launcher manually once.

## Included fixes

- Samsung's `$WEBAPIS/webapis/webapis.js` loads **before** `main.js`. Without it, the foreground detector did not start on the tested Frame.
- The existing background worker and foreground watcher are retained, with automatic return enabled by default.
- Explicit tile margins work on older TV browsers without flex-gap support.
- Bundled vector marks and a plain background avoid image downloads during default startup.
- Heading and tiles reveal together; staggered entrance, frost drawing, and idle animation are disabled.
- Double Back from the launcher opens Samsung Home and pauses automatic return for two minutes, so you can reach settings.

## Requirements

- A Samsung TV running Tizen with Developer Mode and Samsung TV web-app support. Other brands, Android TV and Google TV are not supported.
- TV and computer on the same trusted local network; guest-network isolation can prevent connection.
- Node.js 18 or newer and Git.
- Tizen Studio CLI, Samsung TV extensions, and Samsung Certificate Extension.
- A Samsung account to create a certificate for your TV. Never share the certificate or password.

The scripts use macOS/Linux shell conventions. macOS was used for the tested setup. Linux and Windows/WSL setup are not verified by this edition; Windows may require native Tizen tools and networking adjustments.

## Setup

### 1. Download and preview

```sh
git clone https://github.com/carriepresley/samsung-tv.git
cd samsung-tv
npm ci
npm run preview
```

Open http://localhost:4173. Press Ctrl+C to stop the preview. A browser preview checks appearance and keyboard navigation; it cannot verify TV apps, certificates, or Home return. Missing optional local config/wallpaper files and the Samsung SDK URL in a desktop browser are expected.

### 2. Install the Samsung tools

Use the official [Tizen Studio downloads](https://developer.tizen.org/development/tizen-studio/download) and [Samsung TV development documentation](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk.html). Install Samsung TV tools and the Samsung Certificate Extension through Package Manager. The scripts expect `~/tizen-studio`; set `TIZEN_STUDIO` if yours is elsewhere. Some Mac tool versions require Rosetta on Apple Silicon.

Run `npm run doctor` to identify missing prerequisites. Keep Tizen Studio and your certificates if you want to install future changes. You can close Package Manager after installation.

### 3. Find and pair with your TV

```sh
npm run find-tv
npm run pair
```

Select the intended TV if more than one appears. Accept the **Allow** prompt on the TV. Discovery saves `tv.json`; pairing saves `tv-token.json`. Both stay local and are ignored by Git. If discovery fails, use `npm run find-tv -- YOUR_TV_IP`, replacing the placeholder with the address shown in the TV's network settings.

### 4. Enable Developer Mode

Open the TV's **Apps → App Settings** screen, then enter **1 2 3 4 5**. Menu names vary by model. If the remote lacks digits, with that TV screen open run:

```sh
npm run key -- KEY_1 KEY_2 KEY_3 KEY_4 KEY_5
```

Turn Developer Mode on and enter the **computer's local IP address**, not the TV's IP. Discovery prints the computer address. Follow the TV's restart prompt; a full restart may require unplugging for 60 seconds. On the Frame, a short Power press may enter Art Mode rather than fully restart.

### 5. Create your certificate

Open Tizen Certificate Manager. Choose **+ → Samsung → TV**, create a profile named **tv**, and sign in yourself. Choose distributor privilege **Public**, and include your TV's device ID (DUID). Connect the TV in Device Manager if necessary. Back up your certificates privately. Each target TV must be authorized by the distributor certificate.

### 6. Check apps and install

```sh
npm run apps
npm run doctor
npm run deploy
```

The default tiles are YouTube, Netflix, Prime Video, and Hulu. App IDs vary by country/model; missing apps are dimmed. Use the IDs from `npm run apps` to customize matches as described below. Deployment signs, installs, and launches the app; it does not install those streaming apps or provide subscriptions.

If your certificate profile is named differently:

```sh
CERT_PROFILE=YOUR_PROFILE npm run deploy
```

For a specific TV, set `TV_IP=YOUR_TV_IP` for the command. Do not copy another household's address or certificate.

### 7. Verify on the TV

1. Confirm Welcome and four spaced glass tiles appear together.
2. Use arrows and OK to launch an installed app, such as YouTube.
3. Press Home. A brief Samsung Home screen is expected, followed by the launcher.
4. From the launcher, press Back twice quickly. Samsung Home should remain available for settings for two minutes.
5. Add Launcher to Samsung Home and move it to the first position as a manual fallback.
6. If available, enable **Autorun Last App** in the TV's Start Screen/Smart Features settings. This is a startup preference, not a guarantee or a button remap.
7. Test ordinary off/on separately. Cold restarts, Art Mode, firmware updates, and memory pressure can behave differently.

If return fails, follow [Troubleshooting](docs/TROUBLESHOOTING.md). Do not repeatedly reinstall or reset your TV before checking the running app and API.

## Customize

```sh
cp launcher/config.local.example.js launcher/config.local.js
```

Edit that local file, then run `npm run deploy` again. Configuration overrides replace entire top-level values; supply the whole favorites array when changing it.

```js
var LAUNCHER_LOCAL = {
  favorites: [
    { title: 'YouTube', match: ['9Ur5IzDKqV.TizenYouTube', 'YouTube'], art: 'youtube', fit: 'mark' },
    { title: 'Netflix', match: ['org.tizen.netflix-app', 'Netflix'], art: 'netflixMark', fit: 'mark' },
    { title: 'Prime Video', match: ['org.tizen.primevideo', 'Prime Video'], art: 'primeSmile', fit: 'mark' },
    { title: 'Hulu', match: ['Hulu'], art: 'huluMark', fit: 'mark' }
  ],
  hideMissing: false,
  returnToLauncher: true,
  launcherOnPowerOn: true
};
```

Use actual app IDs from your TV. `hideMissing: true` removes unavailable apps. Four tiles are the intended layout; adding many may overflow the screen. An HDMI tile can use `{ title: 'Console', source: 'HDMI1' }`; support depends on TV APIs.

Change the greeting in `launcher/index.html`. Change the plain color in the final `#stage` rule in `launcher/style.css`. The clock/weather pill is hidden in this edition.

Optional personal wallpaper: put a landscape JPEG under `launcher/wallpapers/` and set `wallpapers: { files: ['wallpapers/my-photo.jpg'], minutes: 60 }` locally. Images are ignored by Git. Automatic rotation is disabled for the streamlined presentation; use a single image. The default needs no photo. Optional `npm run logos` downloads third-party logos; it is not needed for the included white vector marks.

To disable automatic return, set `returnToLauncher: false` and redeploy. To disable wake return only, set `launcherOnPowerOn: false`.

## Updates and removal

To update: `git pull`, `npm ci`, then `npm run deploy`. Local config and certificates remain local; Git may ask you to resolve conflicts if you edited tracked UI files.

To remove: from the launcher, double-press Back, then use Samsung **Apps → App Settings → Launcher → Delete** (menu names vary). You can disable Developer Mode afterwards if you no longer need it. No factory reset is needed.

## Privacy, support, and attribution

No household photos, pairing tokens, TV addresses, signing certificates, or personal configuration are included. See [.gitignore](.gitignore). Do not post these in issues or diagnostic screenshots. Keep TV developer/debug ports on a trusted LAN and do not expose them to the internet. Always run `npm run undebug` after debugging.

When reporting a problem, include TV model/year, firmware version, the action that fails, and the sanitized Home-return check output. Do not include tokens, certificates, device IDs, or your network address.

This edition preserves the original project's MIT license. See [LICENSE](LICENSE) and [NOTICE](NOTICE) for attribution and trademarks. Not affiliated with Samsung or streaming providers. The optional upstream iPhone remote and original demo media are not included in this minimal edition.
