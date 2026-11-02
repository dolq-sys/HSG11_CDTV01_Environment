/* ===== Hình minh hoạ từ vựng (SVG vẽ tay) ===== */
var VOCAB_ART = (function () {
  var G = '#3f8f5a', GL = '#cfe8d4', S = '#c9a46a', B = '#f4ecd9', W = '#4a90c8', WL = '#d6e9f7', N = '#1f3a5f', R = '#b4441c', Y = '#f2c14e', K = '#8a919c';
  function svg(body, label) {
    return '<svg viewBox="0 0 220 130" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg" font-family="Be Vietnam Pro, system-ui, sans-serif">' + body + '</svg>';
  }
  function t(x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.fs || 10) + '" fill="' + (o.c || N) + '" text-anchor="' + (o.a || 'middle') + '" font-weight="' + (o.w || 600) + '">' + s + '</text>'; }
  function arrow(x1, y1, x2, y2, c, w, dash) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    var p1 = (x2 - h * Math.cos(a - 0.45)) + ',' + (y2 - h * Math.sin(a - 0.45)), p2 = (x2 - h * Math.cos(a + 0.45)) + ',' + (y2 - h * Math.sin(a + 0.45));
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="4 4"' : '') + '/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + p1 + ' ' + p2 + '" fill="' + c + '"/>';
  }
  function tree(x, y, s) { s = s || 1; return '<rect x="' + (x - 3 * s) + '" y="' + (y - 14 * s) + '" width="' + 6 * s + '" height="' + 14 * s + '" fill="#7a5a33"/><circle cx="' + x + '" cy="' + (y - 22 * s) + '" r="' + 13 * s + '" fill="' + G + '"/>'; }
  function bulb(x, y, s, on) {
    s = s || 1;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + 11 * s + '" fill="' + (on ? Y : '#fff') + '" stroke="' + N + '" stroke-width="1.6"/>' +
      '<rect x="' + (x - 5 * s) + '" y="' + (y + 9 * s) + '" width="' + 10 * s + '" height="' + 7 * s + '" rx="1.5" fill="' + K + '"/>';
  }
  function factory(x, y) {
    return '<path d="M' + x + ' ' + y + ' v-32 l18 12 v-12 l18 12 v-12 l18 12 v20 z" fill="#9aa3b0"/>' +
      '<rect x="' + (x + 40) + '" y="' + (y - 58) + '" width="9" height="40" fill="#7b8491"/>' +
      '<circle cx="' + (x + 48) + '" cy="' + (y - 66) + '" r="7" fill="#c3c8cf"/><circle cx="' + (x + 58) + '" cy="' + (y - 74) + '" r="9" fill="#d5d9de"/>';
  }

  var A = {};

  A['habitat fragmentation'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + B + '"/>' +
    '<g stroke="#e3d6b6" stroke-width="1">' + [20, 40, 95, 110].map(function (y) { return '<line x1="0" y1="' + y + '" x2="220" y2="' + y + '"/>'; }).join('') + '</g>' +
    '<rect x="0" y="62" width="220" height="10" fill="#b9a37c"/><rect x="128" y="0" width="10" height="130" fill="#b9a37c"/>' +
    '<path d="M14 12 q30-6 52 2 q22 12 12 34 q-26 10-54 2 q-18-14-10-38z" fill="' + G + '"/>' +
    '<path d="M150 10 q30-6 54 6 q10 22-4 38 q-28 6-46-4 q-14-18-4-40z" fill="' + G + '"/>' +
    '<path d="M18 84 q28-8 58 0 q20 12 8 32 q-30 10-58 2 q-16-14-8-34z" fill="' + G + '"/>' +
    '<path d="M156 82 q26-6 46 6 q8 18-6 30 q-24 6-40-6 q-8-16 0-30z" fill="' + G + '"/>' +
    '<g fill="#fff">' + [[40, 30], [52, 36], [176, 30], [46, 100], [180, 102], [100, 26]].map(function (p, i) { return i === 5 ? '' : '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3"/>'; }).join('') + '</g>' +
    '<rect x="68" y="54" width="122" height="14" rx="4" fill="#f4ecd9"/>' + t(129, 64, 'isolated patches', { fs: 9.5, c: '#6b5a36' }), 'habitat fragmentation');

  A['edge effects'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + B + '"/>' +
    '<circle cx="190" cy="24" r="12" fill="' + Y + '"/>' +
    '<g stroke="' + Y + '" stroke-width="2" stroke-linecap="round">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<line x1="' + (190 + 16 * Math.cos(a)) + '" y1="' + (24 + 16 * Math.sin(a)) + '" x2="' + (190 + 21 * Math.cos(a)) + '" y2="' + (24 + 21 * Math.sin(a)) + '"/>'; }).join('') + '</g>' +
    '<g stroke="' + K + '" stroke-width="2" fill="none" stroke-linecap="round"><path d="M8 50 q12-6 24 0 t24 0"/><path d="M8 62 q12-6 24 0 t24 0"/></g>' +
    '<ellipse cx="112" cy="76" rx="74" ry="44" fill="#e3cf8a"/><ellipse cx="112" cy="76" rx="50" ry="27" fill="' + G + '"/>' +
    t(112, 80, 'moist core', { fs: 10, c: '#fff' }) + t(112, 115, 'dry, windy edge', { fs: 9, c: '#7a6420' }), 'edge effects');

  (function () {
    var cols = [R, W, G, Y, '#8a5cc2'], dots = '', i;
    for (i = 0; i < 26; i++) dots += '<circle cx="' + (22 + (i % 6) * 12) + '" cy="' + (34 + Math.floor(i / 6) * 15) + '" r="4.2" fill="' + cols[(i * 7) % 5] + '"/>';
    var right = [[150, 50, W], [168, 62, W], [186, 48, G], [160, 84, W], [182, 88, G]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.2" fill="' + p[2] + '"/>'; }).join('');
    A['genetic bottleneck'] = svg(
      '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
      '<path d="M20 20 H85 Q95 20 95 45 V55 H125 V45 Q125 20 135 20 H200 Q210 20 210 30 V100 Q210 110 200 110 H135 Q125 110 125 85 V75 H95 V85 Q95 110 85 110 H20 Q10 110 10 100 V30 Q10 20 20 20 Z" fill="#fff" stroke="' + N + '" stroke-width="2"/>' +
      dots + right + '<circle cx="110" cy="65" r="4.2" fill="' + W + '"/>' +
      t(52, 124, 'large, varied', { fs: 9 }) + t(168, 124, 'few, similar', { fs: 9 }), 'genetic bottleneck');
  })();

  (function () {
    var cx = 110, cy = 112, r1 = 44, r2 = 78, n = 7, out = '';
    for (var i = 0; i < n; i++) {
      var a1 = Math.PI - i * Math.PI / n, a2 = Math.PI - (i + 1) * Math.PI / n, g = 0.012;
      a1 -= g; a2 += g;
      var pts = [[r2, a1], [r2, a2], [r1, a2], [r1, a1]].map(function (p) { return (cx + p[0] * Math.cos(p[1])).toFixed(1) + ',' + (cy - p[0] * Math.sin(p[1])).toFixed(1); }).join(' ');
      out += '<polygon points="' + pts + '" fill="' + (i === 3 ? R : '#c9c2b2') + '" stroke="#fff" stroke-width="1.5"/>';
    }
    A['keystone species'] = svg('<rect width="220" height="130" rx="12" fill="' + B + '"/>' + out +
      '<rect x="20" y="112" width="180" height="6" fill="#b9a37c"/>' + t(110, 26, 'keystone', { fs: 11, c: R }) + arrow(110, 30, 110, 40, R, 2), 'keystone species');
  })();

  A['trophic cascade'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<circle cx="40" cy="28" r="14" fill="' + N + '"/><path d="M30 18 l20 20 M50 18 l-20 20" stroke="' + R + '" stroke-width="3.5" stroke-linecap="round"/>' +
    t(66, 26, 'apex predator', { a: 'start' }) + t(66, 38, 'removed', { a: 'start', c: R, w: 700 }) +
    arrow(40, 46, 40, 58, K, 2) +
    '<g fill="#a0782a">' + [24, 36, 48, 60, 30, 54].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (i < 4 ? 68 : 78) + '" r="5"/>'; }).join('') + '</g>' +
    t(80, 74, 'herbivores', { a: 'start' }) + arrow(150, 80, 150, 62, R, 2.5) +
    arrow(40, 88, 40, 98, K, 2) +
    '<g fill="' + G + '"><path d="M22 120 l5-12 l5 12z"/><path d="M50 120 l4-8 l4 8z" opacity=".6"/></g>' +
    '<g stroke="' + K + '" stroke-width="1.5"><line x1="36" y1="120" x2="40" y2="114"/><line x1="62" y1="120" x2="66" y2="115"/></g>' +
    t(80, 116, 'vegetation, soil', { a: 'start' }) + arrow(178, 100, 178, 118, R, 2.5), 'trophic cascade');

  A['apex predator'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<polygon points="110,12 132,42 88,42" fill="' + R + '"/>' +
    '<polygon points="86,46 134,46 156,76 64,76" fill="#d79a5c"/>' +
    '<polygon points="62,80 158,80 180,112 40,112" fill="' + G + '"/>' +
    t(140, 30, 'apex predator', { a: 'start', c: R }) + t(110, 65, 'herbivores', { c: '#fff' }) + t(110, 100, 'plants', { c: '#fff' }), 'apex predator');

  A['carbon sink'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<rect x="0" y="86" width="220" height="44" fill="#6b4b2a"/><rect x="0" y="86" width="220" height="8" fill="' + G + '"/>' +
    '<g fill="#4a321c">' + [30, 70, 110, 150, 190].map(function (x) { return '<rect x="' + (x - 14) + '" y="' + 104 + '" width="28" height="4" rx="2"/>'; }).join('') + '</g>' +
    tree(70, 88, 1.5) + tree(150, 88, 1.2) +
    t(30, 22, 'CO₂', { fs: 12, c: N }) + t(110, 22, 'CO₂', { fs: 12 }) + t(190, 22, 'CO₂', { fs: 12 }) +
    arrow(30, 28, 56, 46, N, 2) + arrow(110, 28, 110, 52, N, 2) + arrow(190, 28, 164, 48, N, 2) +
    arrow(96, 96, 96, 118, '#e9d8b8', 2) + t(150, 122, 'carbon locked in peat', { fs: 9, c: '#f3e6cc' }), 'carbon sink');

  A['tipping point'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M0 110 Q40 108 60 80 Q80 44 96 44 Q112 44 132 86 Q150 118 220 118 V130 H0Z" fill="' + GL + '" stroke="' + G + '" stroke-width="2"/>' +
    '<circle cx="96" cy="34" r="10" fill="' + R + '"/>' + arrow(110, 40, 160, 100, R, 2, true) +
    t(96, 18, 'tipping point', { fs: 10, c: R }) + t(30, 100, 'stable', { fs: 9 }) +
    '<g transform="translate(186 70)"><path d="M-12 0 a12 12 0 1 1 6 10.4" fill="none" stroke="' + N + '" stroke-width="2"/><polygon points="-6,10.4 -12,4 -1,4" fill="' + N + '"/></g>' +
    t(186, 52, 'feedback loop', { fs: 9 }), 'tipping point');

  (function () {
    var x = [28, 82, 140, 192], r = [9, 14, 19, 24], n = [1, 3, 6, 11], lab = ['plankton', 'small fish', 'big fish', 'seal'], out = '';
    x.forEach(function (cx, i) {
      out += '<circle cx="' + cx + '" cy="60" r="' + r[i] + '" fill="' + WL + '" stroke="' + W + '" stroke-width="1.8"/>';
      for (var k = 0; k < n[i]; k++) { var a = k * 2.4, d = (r[i] - 5) * Math.sqrt((k + .5) / n[i]); out += '<circle cx="' + (cx + d * Math.cos(a)).toFixed(1) + '" cy="' + (60 + d * Math.sin(a)).toFixed(1) + '" r="2.3" fill="' + R + '"/>'; }
      out += t(cx, 104, lab[i], { fs: 9 });
      if (i < 3) out += arrow(cx + r[i] + 3, 60, x[i + 1] - r[i + 1] - 3, 60, K, 1.6);
    });
    A['biomagnification'] = svg('<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + out + t(110, 22, 'toxin concentration rises', { fs: 10, c: R }), 'biomagnification');
  })();

  A['run-off'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<path d="M0 30 L150 96 L150 130 L0 130Z" fill="#b8925a"/>' +
    '<g stroke="' + G + '" stroke-width="3" stroke-linecap="round">' + [20, 50, 80, 110].map(function (x) { var y = 30 + x * 66 / 150; return '<line x1="' + x + '" y1="' + (y - 2) + '" x2="' + x + '" y2="' + (y - 12) + '"/>'; }).join('') + '</g>' +
    '<path d="M140 100 Q180 96 220 104 V130 H140Z" fill="' + W + '"/>' +
    arrow(40, 60, 90, 82, '#6b4b2a', 2.2) + arrow(80, 82, 132, 104, '#6b4b2a', 2.2) +
    t(184, 122, 'river', { fs: 9, c: '#fff' }) + t(56, 22, 'fertiliser, soil', { fs: 9 }), 'run-off');

  A['hypoxic'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<rect x="0" y="22" width="220" height="16" fill="#7fb36a"/>' +
    '<g fill="#5c9a4a">' + [14, 40, 70, 104, 136, 170, 200].map(function (x) { return '<circle cx="' + x + '" cy="30" r="6"/>'; }).join('') + '</g>' +
    '<rect x="0" y="38" width="220" height="50" fill="#8fb7d6"/>' +
    '<rect x="0" y="88" width="220" height="42" fill="#5d6670"/>' +
    '<g fill="none" stroke="#fff" stroke-width="1.4"><circle cx="40" cy="60" r="3"/><circle cx="160" cy="54" r="2.5"/></g>' +
    t(110, 16, 'algal bloom', { fs: 9 }) + t(110, 66, 'little oxygen', { fs: 9, c: '#fff' }) + t(110, 112, 'dead zone', { fs: 11, c: '#fff', w: 700 }), 'hypoxic dead zone');

  A['effluent'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + factory(14, 92) +
    '<rect x="70" y="80" width="40" height="7" fill="#7b8491"/>' +
    '<path d="M110 84 q12 2 14 22" stroke="#8a5cc2" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<path d="M0 100 Q110 92 220 104 V130 H0Z" fill="' + W + '"/>' +
    '<path d="M120 106 q30 8 70 2 q20 8 30 6 V118 q-40 6-100-4z" fill="#8a5cc2" opacity=".7"/>' + t(170, 96, 'effluent', { fs: 10, c: '#8a5cc2' }), 'effluent');

  A['leachate'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M30 70 Q110 10 190 70Z" fill="#9aa3b0"/>' +
    '<g fill="#c3c8cf">' + [[78, 50], [104, 40], [130, 44], [150, 54]].map(function (p) { return '<rect x="' + p[0] + '" y="' + p[1] + '" width="12" height="8" rx="2"/>'; }).join('') + '</g>' +
    '<rect x="0" y="70" width="220" height="30" fill="#b8925a"/><rect x="0" y="100" width="220" height="30" fill="' + W + '" opacity=".85"/>' +
    '<g fill="#6a7b2d">' + [[80, 82], [110, 90], [140, 80], [96, 110], [128, 116]].map(function (p) { return '<path d="M' + p[0] + ' ' + (p[1] - 6) + ' q5 7 0 9 q-5-2 0-9z"/>'; }).join('') + '</g>' +
    t(110, 64, 'landfill', { fs: 10, c: '#fff' }) + t(186, 120, 'groundwater', { fs: 9, c: '#fff' }), 'leachate');

  A['salinisation'] = svg(
    '<rect width="220" height="130" rx="12" fill="#fbf3dc"/>' +
    '<rect x="0" y="70" width="220" height="60" fill="#b8925a"/>' +
    '<g fill="#fff">' + [12, 30, 48, 66, 84, 128, 146, 164, 182, 200].map(function (x, i) { return '<rect x="' + x + '" y="' + (70 + (i % 3) * 4) + '" width="6" height="6" transform="rotate(45 ' + (x + 3) + ' ' + (73 + (i % 3) * 4) + ')"/>'; }).join('') + '</g>' +
    '<path d="M110 70 V44" stroke="#8a7a3a" stroke-width="3"/><path d="M110 50 q-18 2-22 16" stroke="#8a7a3a" stroke-width="3" fill="none"/><path d="M110 46 q16 4 18 20" stroke="#8a7a3a" stroke-width="3" fill="none"/>' +
    t(110, 26, 'salt crusts, plants wilt', { fs: 10 }), 'salinisation');

  A['circular economy'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<g transform="translate(94 64)">' + [0, 1, 2, 3].map(function (i) {
      var a1 = i * Math.PI / 2 + 0.25, a2 = (i + 1) * Math.PI / 2 - 0.25, r = 38;
      var x1 = r * Math.cos(a1), y1 = r * Math.sin(a1), x2 = r * Math.cos(a2), y2 = r * Math.sin(a2);
      var tx = x2 - 8 * Math.sin(a2) * -1, ty = y2 - 8 * Math.cos(a2);
      return '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" fill="none" stroke="' + G + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="4.5" fill="' + G + '"/>';
    }).join('') +
    t(0, -46, 'make', { fs: 9 }) + t(52, 4, 'use', { fs: 9, a: 'start' }) + t(0, 54, 'repair', { fs: 9 }) + t(-52, 4, 'recycle', { fs: 9, a: 'end' }) + '</g>' +
    t(192, 92, 'linear:', { fs: 9, c: K }) + t(192, 106, 'take → make', { fs: 9, c: K }) + t(192, 118, '→ waste', { fs: 9, c: K }) +
    '<line x1="166" y1="124" x2="216" y2="94" stroke="' + R + '" stroke-width="2.5"/>', 'circular economy');

  A['rebound effect'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + bulb(36, 54, 1.3, true) + t(36, 98, '1 efficient bulb', { fs: 9 }) +
    arrow(66, 58, 100, 58, K, 2) + bulb(122, 42, 1, true) + bulb(152, 42, 1, true) + bulb(182, 42, 1, true) + bulb(137, 76, 1, true) + bulb(167, 76, 1, true) +
    t(152, 112, 'used more → savings lost', { fs: 9, c: R }), 'rebound effect');

  A['planned obsolescence'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="74" y="14" width="56" height="104" rx="9" fill="#fff" stroke="' + N + '" stroke-width="2.5"/>' +
    '<path d="M86 30 l14 22 l-8 10 l16 20 l-6 14 l12 12" stroke="' + K + '" stroke-width="1.6" fill="none"/>' +
    '<circle cx="160" cy="44" r="18" fill="#fff" stroke="' + R + '" stroke-width="2.5"/><path d="M160 32 V44 L169 50" stroke="' + R + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    t(160, 82, 'built to', { fs: 9, c: R }) + t(160, 94, 'fail early', { fs: 9, c: R }), 'planned obsolescence');

  A['greenwashing'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + factory(40, 112) +
    '<path d="M60 92 q14-26 40-24 q-2 28-40 24z" fill="' + G + '"/><path d="M62 90 q16-10 30-18" stroke="#fff" stroke-width="1.5" fill="none"/>' +
    '<rect x="142" y="40" width="10" height="44" rx="2" fill="#a0782a" transform="rotate(30 147 62)"/><rect x="128" y="76" width="18" height="16" rx="3" fill="' + G + '" transform="rotate(30 137 84)"/>' +
    t(170, 118, '“eco-friendly”?', { fs: 10, c: G }), 'greenwashing');

  A['abyssal'] = svg(
    '<defs><linearGradient id="abg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3ea"/><stop offset="1" stop-color="#0d2238"/></linearGradient></defs>' +
    '<rect width="220" height="130" rx="12" fill="url(#abg)"/>' +
    '<path d="M0 116 Q60 108 110 118 T220 112 V130 H0Z" fill="#3a3326"/>' +
    '<g fill="' + Y + '">' + [[60, 112], [96, 116], [150, 110], [176, 114]].map(function (p) { return '<rect x="' + p[0] + '" y="' + p[1] + '" width="4" height="3"/>'; }).join('') + '</g>' +
    t(12, 18, '0 m', { a: 'start', fs: 9 }) + t(12, 60, '2 000 m', { a: 'start', fs: 9, c: '#e6eef6' }) + t(12, 100, '6 000 m', { a: 'start', fs: 9, c: '#e6eef6' }) +
    t(150, 98, 'abyssal depths', { fs: 10, c: '#fff' }), 'abyssal');

  A['carbon offsetting'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="107" y="40" width="6" height="74" fill="' + N + '"/><rect x="80" y="112" width="60" height="6" rx="3" fill="' + N + '"/>' +
    '<line x1="40" y1="48" x2="180" y2="40" stroke="' + N + '" stroke-width="3"/><circle cx="110" cy="44" r="5" fill="' + N + '"/>' +
    '<path d="M40 48 L24 78 H56Z" fill="none" stroke="' + K + '" stroke-width="1.4"/><path d="M180 40 L164 70 H196Z" fill="none" stroke="' + K + '" stroke-width="1.4"/>' +
    '<circle cx="34" cy="70" r="8" fill="#9aa3b0"/><circle cx="46" cy="68" r="10" fill="#b3bac4"/>' + tree(180, 70, .8) +
    t(40, 98, 'emissions here', { fs: 9 }) + t(180, 98, 'trees elsewhere', { fs: 9 }), 'carbon offsetting');

  A['endocrine disruptor'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M90 16 q20-8 40 0 q14 10 10 40 q-4 30-30 62 q-26-32-30-62 q-4-30 10-40z" fill="' + WL + '" stroke="' + N + '" stroke-width="2"/>' +
    '<g fill="' + G + '"><circle cx="104" cy="44" r="5"/><circle cx="118" cy="58" r="5"/></g>' +
    '<g fill="' + R + '"><rect x="106" y="70" width="9" height="9" transform="rotate(45 110 74)"/><rect x="40" y="56" width="9" height="9" transform="rotate(45 44 60)"/><rect x="170" y="40" width="9" height="9" transform="rotate(45 174 44)"/></g>' +
    arrow(52, 62, 96, 70, R, 1.6, true) + t(44, 86, 'chemical', { fs: 9, c: R }) + t(176, 70, 'mimics', { fs: 9, c: R }) + t(176, 82, 'hormones', { fs: 9, c: R }), 'endocrine disruptor');

  return A;
})();
