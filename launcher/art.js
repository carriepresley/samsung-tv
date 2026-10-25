// Vector tile artwork, drawn on a 400x240 (5:3) canvas so it stays sharp at the focused size.
// Each entry fills the tile edge to edge.
var TILE_ART = (function () {
  var FONT = 'font-family="SamsungOneUI, SamsungOne, TizenSans, -apple-system, Helvetica Neue, Arial, sans-serif"';
  function svg(body) {
    return '<svg class="art" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + body + '</svg>';
  }

  return {
    netflixMark: svg(
      '<rect width="400" height="240" fill="#080808"/>' +
      '<path d="M158 58 H182 V182 L158 186 Z M218 58 H242 V186 L218 182 Z" fill="#b20710"/>' +
      '<path d="M158 58 H182 L242 186 L218 182 Z" fill="#e50914"/>'
    ),
    primeSmile: svg(
      '<rect width="400" height="240" fill="#0879e8"/>' +
      '<path d="M106 109 Q192 179 286 112" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M260 100 Q283 96 298 103 Q298 124 285 140" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>'
    ),
    huluMark: svg(
      '<rect width="400" height="240" fill="#071c16"/>' +
      '<text x="200" y="150" text-anchor="middle" ' + FONT + ' font-size="100" font-weight="800" letter-spacing="-6" fill="#1ce783">hulu</text>'
    ),
    ps5: svg(
      '<defs>' +
        '<linearGradient id="a-ps-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7bf0"/><stop offset="0.55" stop-color="#0b4bb3"/><stop offset="1" stop-color="#001a4d"/></linearGradient>' +
        '<radialGradient id="a-ps-hi" cx="0.2" cy="-0.1" r="0.9"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<rect width="400" height="240" fill="url(#a-ps-bg)"/><rect width="400" height="240" fill="url(#a-ps-hi)"/>' +
      // glyph row scaled to the shared mark size (equal-area rule in main.js)
      '<g transform="translate(200 120) scale(1.4) translate(-200 -120.5)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M104 139 L124 102 L144 139 Z"/>' +
        '<circle cx="181" cy="120" r="19"/>' +
        '<path d="M207 103 L240 136 M240 103 L207 136"/>' +
        '<rect x="258" y="101" width="38" height="38" rx="4"/>' +
      '</g>'
    ),

    disney: svg(
      '<defs><radialGradient id="a-dis-bg" cx="0.5" cy="1.1" r="1"><stop offset="0" stop-color="#2ad1e3"/><stop offset="0.45" stop-color="#0d4f7a"/><stop offset="1" stop-color="#040b25"/></radialGradient></defs>' +
      '<rect width="400" height="240" fill="url(#a-dis-bg)"/>' +
      '<path d="M112 112 C 160 52, 260 52, 300 108" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.9"/>' +
      '<text x="200" y="146" text-anchor="middle" ' + FONT + ' font-size="54" font-weight="700" font-style="italic" letter-spacing="-1" fill="#fff">Disney+</text>'
    ),

    prime: svg(
      '<defs><linearGradient id="a-pr-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a38"/><stop offset="1" stop-color="#050a10"/></linearGradient></defs>' +
      '<rect width="400" height="240" fill="url(#a-pr-bg)"/>' +
      '<text x="200" y="116" text-anchor="middle" ' + FONT + ' font-size="56" font-weight="700" letter-spacing="-1.5" fill="#fff">prime</text>' +
      '<path d="M146 130 Q 198 154 250 128" fill="none" stroke="#1a98ff" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M238 121 L252 127 L245 141" fill="none" stroke="#1a98ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="200" y="182" text-anchor="middle" ' + FONT + ' font-size="32" font-weight="500" letter-spacing="1" fill="#fff">video</text>'
    ),

    youtube: svg(
      '<rect width="400" height="240" fill="#ff0000"/>' +
      '<path d="M174 78 L246 120 L174 162 Z" fill="#fff"/>'
    ),

    instagram: svg(
      '<defs><radialGradient id="a-ig-bg" cx="0.28" cy="1.15" r="1.35"><stop offset="0" stop-color="#fdf497"/><stop offset="0.12" stop-color="#fdf497"/><stop offset="0.45" stop-color="#fd5949"/><stop offset="0.65" stop-color="#d6249f"/><stop offset="1" stop-color="#285aeb"/></radialGradient></defs>' +
      '<rect width="400" height="240" fill="url(#a-ig-bg)"/>' +
      '<g fill="none" stroke="#fff" stroke-width="9"><rect x="158" y="78" width="84" height="84" rx="25"/><circle cx="200" cy="120" r="20"/></g>' +
      '<circle cx="224.5" cy="96.5" r="5.5" fill="#fff"/>'
    )
  };
})();
