/* ===== Hình minh hoạ từ vựng (SVG vẽ tay, một số có chuyển động chậm – xem các lớp .an-* trong style.css) ===== */
var VOCAB_ART = (function () {
  var G = '#3f8f5a', GL = '#cfe8d4', S = '#c9a46a', B = '#f4ecd9', W = '#4a90c8', WL = '#d6e9f7', N = '#1f3a5f', R = '#b4441c', Y = '#f2c14e', K = '#8a919c';
  function svg(body, label) {
    return '<svg class="vsvg" viewBox="0 0 220 130" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg" font-family="Be Vietnam Pro, system-ui, sans-serif">' + body + '</svg>';
  }
  function t(x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.fs || 10) + '" fill="' + (o.c || N) + '" text-anchor="' + (o.a || 'middle') + '" font-weight="' + (o.w || 600) + '">' + s + '</text>'; }
  function arrow(x1, y1, x2, y2, c, w, dash) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    var p1 = (x2 - h * Math.cos(a - 0.45)).toFixed(1) + ',' + (y2 - h * Math.sin(a - 0.45)).toFixed(1), p2 = (x2 - h * Math.cos(a + 0.45)).toFixed(1) + ',' + (y2 - h * Math.sin(a + 0.45)).toFixed(1);
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="4 4"' : '') + '/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + p1 + ' ' + p2 + '" fill="' + c + '"/>';
  }
  function g(cls, body, style) { return '<g class="' + cls + '"' + (style ? ' style="' + style + '"' : '') + '>' + body + '</g>'; }
  function tree(x, y, s) { s = s || 1; return '<rect x="' + (x - 3 * s) + '" y="' + (y - 14 * s) + '" width="' + 6 * s + '" height="' + 14 * s + '" fill="#7a5a33"/><circle cx="' + x + '" cy="' + (y - 22 * s) + '" r="' + 13 * s + '" fill="' + G + '"/>'; }
  function bulb(x, y, s, on) {
    s = s || 1;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + 11 * s + '" fill="' + (on ? Y : '#fff') + '" stroke="' + N + '" stroke-width="1.6"/>' +
      '<rect x="' + (x - 5 * s) + '" y="' + (y + 9 * s) + '" width="' + 10 * s + '" height="' + 7 * s + '" rx="1.5" fill="' + K + '"/>';
  }
  function factory(x, y) {
    return '<path d="M' + x + ' ' + y + ' v-32 l18 12 v-12 l18 12 v-12 l18 12 v20 z" fill="#9aa3b0"/>' +
      '<rect x="' + (x + 40) + '" y="' + (y - 58) + '" width="9" height="40" fill="#7b8491"/>' +
      g('an-smoke', '<circle cx="' + (x + 48) + '" cy="' + (y - 66) + '" r="7" fill="#c3c8cf"/><circle cx="' + (x + 58) + '" cy="' + (y - 74) + '" r="9" fill="#d5d9de"/>');
  }
  function drop(x, y, c, s) { s = s || 1; return '<path d="M' + x + ' ' + (y - 7 * s) + ' q' + 5 * s + ' ' + 7 * s + ' 0 ' + 10 * s + ' q-' + 5 * s + ' -' + 3 * s + ' 0 -' + 10 * s + 'z" fill="' + c + '"/>'; }

  var A = {};

  A['habitat fragmentation'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + B + '"/>' +
    '<g stroke="#e3d6b6" stroke-width="1">' + [20, 40, 95, 110].map(function (y) { return '<line x1="0" y1="' + y + '" x2="220" y2="' + y + '"/>'; }).join('') + '</g>' +
    '<rect x="0" y="62" width="220" height="10" fill="#b9a37c"/><rect x="128" y="0" width="10" height="130" fill="#b9a37c"/>' +
    '<path d="M14 12 q30-6 52 2 q22 12 12 34 q-26 10-54 2 q-18-14-10-38z" fill="' + G + '"/>' +
    '<path d="M150 10 q30-6 54 6 q10 22-4 38 q-28 6-46-4 q-14-18-4-40z" fill="' + G + '"/>' +
    '<path d="M18 84 q28-8 58 0 q20 12 8 32 q-30 10-58 2 q-16-14-8-34z" fill="' + G + '"/>' +
    '<path d="M156 82 q26-6 46 6 q8 18-6 30 q-24 6-40-6 q-8-16 0-30z" fill="' + G + '"/>' +
    g('an-jit', '<circle cx="40" cy="30" r="3" fill="#fff"/><circle cx="52" cy="36" r="3" fill="#fff"/>') +
    g('an-jit d2', '<circle cx="176" cy="30" r="3" fill="#fff"/>') + g('an-jit d3', '<circle cx="46" cy="100" r="3" fill="#fff"/>') + g('an-jit d1', '<circle cx="180" cy="102" r="3" fill="#fff"/>') +
    '<rect x="68" y="54" width="122" height="14" rx="4" fill="#f4ecd9"/>' + t(129, 64, 'isolated patches', { fs: 9.5, c: '#6b5a36' }), 'habitat fragmentation');

  A['edge effects'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + B + '"/>' +
    g('an-spin', '<circle cx="190" cy="24" r="12" fill="' + Y + '"/><g stroke="' + Y + '" stroke-width="2" stroke-linecap="round">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<line x1="' + (190 + 16 * Math.cos(a)).toFixed(1) + '" y1="' + (24 + 16 * Math.sin(a)).toFixed(1) + '" x2="' + (190 + 21 * Math.cos(a)).toFixed(1) + '" y2="' + (24 + 21 * Math.sin(a)).toFixed(1) + '"/>'; }).join('') + '</g>', 'transform-origin:190px 24px') +
    g('an-wind', '<g stroke="' + K + '" stroke-width="2" fill="none" stroke-linecap="round"><path d="M8 50 q12-6 24 0 t24 0"/><path d="M8 62 q12-6 24 0 t24 0"/></g>') +
    '<ellipse cx="112" cy="76" rx="74" ry="44" fill="#e3cf8a"/><ellipse cx="112" cy="76" rx="50" ry="27" fill="' + G + '"/>' +
    t(112, 80, 'moist core', { fs: 10, c: '#fff' }) + t(112, 115, 'dry, windy edge', { fs: 9, c: '#7a6420' }), 'edge effects');

  (function () {
    var cols = [R, W, G, Y, '#8a5cc2'], dots = '', i;
    for (i = 0; i < 26; i++) dots += '<circle cx="' + (22 + (i % 6) * 12) + '" cy="' + (34 + Math.floor(i / 6) * 15) + '" r="4.2" fill="' + cols[(i * 7) % 5] + '"/>';
    var right = [[150, 50, W], [168, 62, W], [186, 48, G], [160, 84, W], [182, 88, G]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.2" fill="' + p[2] + '"/>'; }).join('');
    A['genetic bottleneck'] = svg(
      '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
      '<path d="M20 20 H85 Q95 20 95 45 V55 H125 V45 Q125 20 135 20 H200 Q210 20 210 30 V100 Q210 110 200 110 H135 Q125 110 125 85 V75 H95 V85 Q95 110 85 110 H20 Q10 110 10 100 V30 Q10 20 20 20 Z" fill="#fff" stroke="' + N + '" stroke-width="2"/>' +
      dots + right + g('an-pass', '<circle cx="88" cy="65" r="4.2" fill="' + W + '"/>') +
      t(52, 124, 'large, varied', { fs: 9 }) + t(168, 124, 'few, similar', { fs: 9 }), 'genetic bottleneck');
  })();

  (function () {
    var cx = 110, cy = 112, r1 = 44, r2 = 78, n = 7, out = '', key = '';
    for (var i = 0; i < n; i++) {
      var a1 = Math.PI - i * Math.PI / n + 0.012, a2 = Math.PI - (i + 1) * Math.PI / n - 0.012;
      var pts = [[r2, a1], [r2, a2], [r1, a2], [r1, a1]].map(function (p) { return (cx + p[0] * Math.cos(p[1])).toFixed(1) + ',' + (cy - p[0] * Math.sin(p[1])).toFixed(1); }).join(' ');
      var poly = '<polygon points="' + pts + '" fill="' + (i === 3 ? R : '#c9c2b2') + '" stroke="#fff" stroke-width="1.5"/>';
      if (i === 3) key = poly; else out += poly;
    }
    A['keystone species'] = svg('<rect width="220" height="130" rx="12" fill="' + B + '"/>' + out + g('an-key', key) +
      '<rect x="20" y="112" width="180" height="6" fill="#b9a37c"/>' + t(110, 18, 'keystone', { fs: 11, c: R }), 'keystone species');
  })();

  A['trophic cascade'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<circle cx="40" cy="28" r="14" fill="' + N + '"/><path d="M30 18 l20 20 M50 18 l-20 20" stroke="' + R + '" stroke-width="3.5" stroke-linecap="round"/>' +
    t(66, 26, 'apex predator', { a: 'start' }) + t(66, 38, 'removed', { a: 'start', c: R, w: 700 }) +
    arrow(40, 46, 40, 58, K, 2) +
    g('an-pulse', '<g fill="#a0782a">' + [24, 36, 48, 60, 30, 54].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (i < 4 ? 68 : 78) + '" r="5"/>'; }).join('') + '</g>', 'transform-origin:42px 73px') +
    t(80, 74, 'herbivores', { a: 'start' }) + g('an-bob', arrow(150, 80, 150, 62, R, 2.5)) +
    arrow(40, 88, 40, 98, K, 2) +
    '<g fill="' + G + '"><path d="M22 120 l5-12 l5 12z"/><path d="M50 120 l4-8 l4 8z" opacity=".6"/></g>' +
    '<g stroke="' + K + '" stroke-width="1.5"><line x1="36" y1="120" x2="40" y2="114"/><line x1="62" y1="120" x2="66" y2="115"/></g>' +
    t(80, 116, 'vegetation, soil', { a: 'start' }) + g('an-bob d2', arrow(178, 100, 178, 118, R, 2.5)), 'trophic cascade');

  A['apex predator'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    g('an-pulse', '<polygon points="110,12 132,42 88,42" fill="' + R + '"/>', 'transform-origin:110px 32px') +
    '<polygon points="86,46 134,46 156,76 64,76" fill="#d79a5c"/>' +
    '<polygon points="62,80 158,80 180,112 40,112" fill="' + G + '"/>' +
    t(140, 30, 'apex predator', { a: 'start', c: R }) + t(110, 65, 'herbivores', { c: '#fff' }) + t(110, 100, 'plants', { c: '#fff' }), 'apex predator');

  A['carbon sink'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<rect x="0" y="86" width="220" height="44" fill="#6b4b2a"/><rect x="0" y="86" width="220" height="8" fill="' + G + '"/>' +
    '<g fill="#4a321c">' + [30, 70, 110, 150, 190].map(function (x) { return '<rect x="' + (x - 14) + '" y="104" width="28" height="4" rx="2"/>'; }).join('') + '</g>' +
    tree(70, 88, 1.5) + tree(150, 88, 1.2) +
    g('an-fall', t(30, 22, 'CO₂', { fs: 12 }) + arrow(30, 28, 56, 46, N, 2)) +
    g('an-fall d1', t(110, 22, 'CO₂', { fs: 12 }) + arrow(110, 28, 110, 52, N, 2)) +
    g('an-fall d2', t(190, 22, 'CO₂', { fs: 12 }) + arrow(190, 28, 164, 48, N, 2)) +
    arrow(96, 96, 96, 118, '#e9d8b8', 2) + t(150, 122, 'carbon locked in peat', { fs: 9, c: '#f3e6cc' }), 'carbon sink');

  A['tipping point'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M0 110 Q40 108 60 80 Q80 44 96 44 Q112 44 132 86 Q150 118 220 118 V130 H0Z" fill="' + GL + '" stroke="' + G + '" stroke-width="2"/>' +
    arrow(110, 40, 160, 100, R, 2, true) +
    g('an-roll', '<circle cx="96" cy="34" r="10" fill="' + R + '"/>') +
    t(96, 18, 'tipping point', { fs: 10, c: R }) + t(30, 100, 'stable', { fs: 9 }) +
    g('an-spin', '<path d="M174 70 a12 12 0 1 1 6 10.4" fill="none" stroke="' + N + '" stroke-width="2"/><polygon points="180,80.4 174,74 185,74" fill="' + N + '"/>', 'transform-origin:186px 70px') +
    t(186, 52, 'feedback loop', { fs: 9 }), 'tipping point');

  (function () {
    var x = [28, 82, 140, 192], r = [9, 14, 19, 24], n = [1, 3, 6, 11], lab = ['plankton', 'small fish', 'big fish', 'seal'], out = '';
    x.forEach(function (cx, i) {
      var inner = '<circle cx="' + cx + '" cy="60" r="' + r[i] + '" fill="' + WL + '" stroke="' + W + '" stroke-width="1.8"/>';
      for (var k = 0; k < n[i]; k++) { var a = k * 2.4, d = (r[i] - 5) * Math.sqrt((k + .5) / n[i]); inner += '<circle cx="' + (cx + d * Math.cos(a)).toFixed(1) + '" cy="' + (60 + d * Math.sin(a)).toFixed(1) + '" r="2.3" fill="' + R + '"/>'; }
      out += g('an-seq s' + i, inner) + t(cx, 104, lab[i], { fs: 9 });
      if (i < 3) out += arrow(cx + r[i] + 3, 60, x[i + 1] - r[i + 1] - 3, 60, K, 1.6);
    });
    A['biomagnification'] = svg('<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + out + t(110, 22, 'toxin concentration rises', { fs: 10, c: R }), 'biomagnification');
  })();

  A['run-off'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<path d="M0 30 L150 96 L150 130 L0 130Z" fill="#b8925a"/>' +
    '<g stroke="' + G + '" stroke-width="3" stroke-linecap="round">' + [20, 50, 80, 110].map(function (x) { var y = 30 + x * 66 / 150; return '<line x1="' + x + '" y1="' + (y - 2) + '" x2="' + x + '" y2="' + (y - 12) + '"/>'; }).join('') + '</g>' +
    '<path d="M140 100 Q180 96 220 104 V130 H140Z" fill="' + W + '"/>' +
    '<path class="an-flow" d="M30 56 L140 104" stroke="#6b4b2a" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"/>' +
    '<path class="an-flow d1" d="M60 80 L146 116" stroke="#6b4b2a" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"/>' +
    t(184, 122, 'river', { fs: 9, c: '#fff' }) + t(56, 22, 'fertiliser, soil', { fs: 9 }), 'run-off');

  A['hypoxic'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    '<rect x="0" y="22" width="220" height="16" fill="#7fb36a"/>' +
    '<g fill="#5c9a4a">' + [14, 40, 70, 104, 136, 170, 200].map(function (x) { return '<circle cx="' + x + '" cy="30" r="6"/>'; }).join('') + '</g>' +
    '<rect x="0" y="38" width="220" height="50" fill="#8fb7d6"/>' +
    '<rect x="0" y="88" width="220" height="42" fill="#5d6670"/>' +
    g('an-rise', '<circle cx="40" cy="80" r="3" fill="none" stroke="#fff" stroke-width="1.4"/>') + g('an-rise d2', '<circle cx="160" cy="80" r="2.5" fill="none" stroke="#fff" stroke-width="1.4"/>') +
    t(110, 16, 'algal bloom', { fs: 9 }) + t(110, 66, 'little oxygen', { fs: 9, c: '#fff' }) + t(110, 112, 'dead zone', { fs: 11, c: '#fff', w: 700 }), 'hypoxic dead zone');

  A['effluent'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + factory(14, 92) +
    '<rect x="70" y="80" width="40" height="7" fill="#7b8491"/>' +
    '<path class="an-flow" d="M110 84 q12 2 14 22" stroke="#8a5cc2" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="8 4"/>' +
    '<path d="M0 100 Q110 92 220 104 V130 H0Z" fill="' + W + '"/>' +
    g('an-spread', '<path d="M120 106 q30 8 70 2 q20 8 30 6 V118 q-40 6-100-4z" fill="#8a5cc2" opacity=".7"/>', 'transform-origin:124px 110px') + t(170, 96, 'effluent', { fs: 10, c: '#8a5cc2' }), 'effluent');

  A['leachate'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M30 70 Q110 10 190 70Z" fill="#9aa3b0"/>' +
    '<g fill="#c3c8cf">' + [[78, 50], [104, 40], [130, 44], [150, 54]].map(function (p) { return '<rect x="' + p[0] + '" y="' + p[1] + '" width="12" height="8" rx="2"/>'; }).join('') + '</g>' +
    '<rect x="0" y="70" width="220" height="30" fill="#b8925a"/><rect x="0" y="100" width="220" height="30" fill="' + W + '" opacity=".85"/>' +
    [[80, 0], [110, 1], [140, 2], [96, 3], [126, 1]].map(function (p) { return g('an-drip d' + p[1], drop(p[0], 80, '#6a7b2d')); }).join('') +
    t(110, 64, 'landfill', { fs: 10, c: '#fff' }) + t(186, 120, 'groundwater', { fs: 9, c: '#fff' }), 'leachate');

  A['salinisation'] = svg(
    '<rect width="220" height="130" rx="12" fill="#fbf3dc"/>' +
    '<rect x="0" y="70" width="220" height="60" fill="#b8925a"/>' +
    g('an-glint', [12, 30, 48, 66, 84, 128, 146, 164, 182, 200].map(function (x, i) { return '<rect x="' + x + '" y="' + (70 + (i % 3) * 4) + '" width="6" height="6" fill="#fff" transform="rotate(45 ' + (x + 3) + ' ' + (73 + (i % 3) * 4) + ')"/>'; }).join('')) +
    '<path d="M110 70 V44" stroke="#8a7a3a" stroke-width="3"/>' +
    g('an-droop', '<path d="M110 50 q-18 2-22 16" stroke="#8a7a3a" stroke-width="3" fill="none"/><path d="M110 46 q16 4 18 20" stroke="#8a7a3a" stroke-width="3" fill="none"/>', 'transform-origin:110px 46px') +
    t(110, 26, 'salt crusts, plants wilt', { fs: 10 }), 'salinisation');

  A['circular economy'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    g('an-spin slow', [0, 1, 2, 3].map(function (i) {
      var a1 = i * Math.PI / 2 + 0.25, a2 = (i + 1) * Math.PI / 2 - 0.25, r = 38, cx = 94, cy = 64;
      return '<path d="M' + (cx + r * Math.cos(a1)).toFixed(1) + ' ' + (cy + r * Math.sin(a1)).toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + (cx + r * Math.cos(a2)).toFixed(1) + ' ' + (cy + r * Math.sin(a2)).toFixed(1) + '" fill="none" stroke="' + G + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="' + (cx + r * Math.cos(a2)).toFixed(1) + '" cy="' + (cy + r * Math.sin(a2)).toFixed(1) + '" r="4.5" fill="' + G + '"/>';
    }).join(''), 'transform-origin:94px 64px') +
    t(94, 18, 'make', { fs: 9 }) + t(146, 68, 'use', { fs: 9, a: 'start' }) + t(94, 118, 'repair', { fs: 9 }) + t(42, 68, 'recycle', { fs: 9, a: 'end' }) +
    t(192, 92, 'linear:', { fs: 9, c: K }) + t(192, 106, 'take → make', { fs: 9, c: K }) + t(192, 118, '→ waste', { fs: 9, c: K }) +
    '<line x1="166" y1="124" x2="216" y2="94" stroke="' + R + '" stroke-width="2.5"/>', 'circular economy');

  A['rebound effect'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + bulb(36, 54, 1.3, true) + t(36, 98, '1 efficient bulb', { fs: 9 }) +
    arrow(66, 58, 100, 58, K, 2) +
    [[122, 42], [152, 42], [182, 42], [137, 76], [167, 76]].map(function (p, i) { return g('an-blink d' + i, bulb(p[0], p[1], 1, true)); }).join('') +
    t(152, 112, 'used more → savings lost', { fs: 9, c: R }), 'rebound effect');

  A['planned obsolescence'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="74" y="14" width="56" height="104" rx="9" fill="#fff" stroke="' + N + '" stroke-width="2.5"/>' +
    '<path class="an-crack" d="M86 30 l14 22 l-8 10 l16 20 l-6 14 l12 12" stroke="' + K + '" stroke-width="1.6" fill="none" stroke-dasharray="120" />' +
    '<circle cx="160" cy="44" r="18" fill="#fff" stroke="' + R + '" stroke-width="2.5"/>' +
    g('an-spin fast', '<path d="M160 44 V32" stroke="' + R + '" stroke-width="2.5" stroke-linecap="round"/>', 'transform-origin:160px 44px') +
    '<path d="M160 44 L169 50" stroke="' + R + '" stroke-width="2.5" stroke-linecap="round"/>' +
    t(160, 82, 'built to', { fs: 9, c: R }) + t(160, 94, 'fail early', { fs: 9, c: R }), 'planned obsolescence');

  A['greenwashing'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' + factory(40, 112) +
    '<path d="M60 92 q14-26 40-24 q-2 28-40 24z" fill="' + G + '"/><path d="M62 90 q16-10 30-18" stroke="#fff" stroke-width="1.5" fill="none"/>' +
    g('an-brush', '<rect x="142" y="40" width="10" height="44" rx="2" fill="#a0782a" transform="rotate(30 147 62)"/><rect x="128" y="76" width="18" height="16" rx="3" fill="' + G + '" transform="rotate(30 137 84)"/>') +
    t(170, 118, '“eco-friendly”?', { fs: 10, c: G }), 'greenwashing');

  A['abyssal'] = svg(
    '<defs><linearGradient id="abg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3ea"/><stop offset="1" stop-color="#0d2238"/></linearGradient></defs>' +
    '<rect width="220" height="130" rx="12" fill="url(#abg)"/>' +
    '<path d="M0 116 Q60 108 110 118 T220 112 V130 H0Z" fill="#3a3326"/>' +
    [[60, 0], [96, 1], [150, 2], [176, 3]].map(function (p) { return g('an-sink d' + p[1], '<rect x="' + p[0] + '" y="112" width="4" height="3" fill="' + Y + '"/>'); }).join('') +
    t(12, 18, '0 m', { a: 'start', fs: 9 }) + t(12, 60, '2 000 m', { a: 'start', fs: 9, c: '#e6eef6' }) + t(12, 100, '6 000 m', { a: 'start', fs: 9, c: '#e6eef6' }) +
    t(150, 98, 'abyssal depths', { fs: 10, c: '#fff' }), 'abyssal');

  A['carbon offsetting'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="107" y="40" width="6" height="74" fill="' + N + '"/><rect x="80" y="112" width="60" height="6" rx="3" fill="' + N + '"/>' +
    g('an-tilt', '<line x1="40" y1="44" x2="180" y2="44" stroke="' + N + '" stroke-width="3"/>' +
      '<path d="M40 44 L24 74 H56Z" fill="none" stroke="' + K + '" stroke-width="1.4"/><path d="M180 44 L164 74 H196Z" fill="none" stroke="' + K + '" stroke-width="1.4"/>' +
      '<circle cx="34" cy="66" r="8" fill="#9aa3b0"/><circle cx="46" cy="64" r="10" fill="#b3bac4"/>' + tree(180, 74, .8), 'transform-origin:110px 44px') +
    '<circle cx="110" cy="44" r="5" fill="' + N + '"/>' +
    t(40, 98, 'emissions here', { fs: 9 }) + t(180, 98, 'trees elsewhere', { fs: 9 }), 'carbon offsetting');

  A['endocrine disruptor'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M90 16 q20-8 40 0 q14 10 10 40 q-4 30-30 62 q-26-32-30-62 q-4-30 10-40z" fill="' + WL + '" stroke="' + N + '" stroke-width="2"/>' +
    '<g fill="' + G + '"><circle cx="104" cy="44" r="5"/><circle cx="118" cy="58" r="5"/></g>' +
    '<g fill="' + R + '"><rect x="170" y="40" width="9" height="9" transform="rotate(45 174 44)"/></g>' +
    g('an-enter', '<rect x="40" y="56" width="9" height="9" fill="' + R + '" transform="rotate(45 44 60)"/>') +
    '<line x1="52" y1="62" x2="96" y2="70" stroke="' + R + '" stroke-width="1.6" stroke-dasharray="4 4"/>' +
    t(44, 86, 'chemical', { fs: 9, c: R }) + t(176, 70, 'mimics', { fs: 9, c: R }) + t(176, 82, 'hormones', { fs: 9, c: R }), 'endocrine disruptor');

  /* ---- từ học thuật & idiom ---- */
  A['precipitous'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<line x1="24" y1="112" x2="206" y2="112" stroke="' + K + '" stroke-width="1.5"/><line x1="24" y1="14" x2="24" y2="112" stroke="' + K + '" stroke-width="1.5"/>' +
    '<path class="an-draw" d="M28 34 L70 30 L110 36 L126 40 L140 98 L200 104" fill="none" stroke="' + R + '" stroke-width="3" stroke-linejoin="round" stroke-dasharray="260"/>' +
    t(170, 30, 'a sudden,', { fs: 10, c: R }) + t(170, 43, 'steep fall', { fs: 10, c: R }), 'precipitous');

  A['proliferate'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + GL + '"/>' +
    (function () { var o = '', k = 0; for (var i = 0; i < 24; i++) { var x = 24 + (i * 37) % 176, y = 22 + ((i * 53) % 90); o += g('an-pop d' + (k++ % 6), '<ellipse cx="' + x + '" cy="' + y + '" rx="7" ry="5" fill="#a0782a"/><circle cx="' + (x + 6) + '" cy="' + (y - 3) + '" r="3" fill="#a0782a"/>', 'transform-origin:' + x + 'px ' + y + 'px'); } return o; })() +
    '<rect x="62" y="108" width="96" height="16" rx="5" fill="#fff" opacity=".85"/>' + t(110, 120, 'numbers multiply', { fs: 10 }), 'proliferate');

  A['ubiquitous'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<circle cx="110" cy="65" r="48" fill="' + WL + '" stroke="' + W + '" stroke-width="2"/>' +
    '<path d="M80 40 q14-10 28 0 q8 12-6 18 q-16 4-22-18z M118 76 q20-6 30 8 q-6 16-24 12 q-12-8-6-20z" fill="' + GL + '" stroke="' + G + '" stroke-width="1.2"/>' +
    g('an-spin slow', [[0, 52], [40, 50], [80, 54], [130, 50], [170, 52], [220, 55], [270, 50], [310, 53]].map(function (p) { var a = p[0] * Math.PI / 180; return '<rect x="' + (110 + p[1] * Math.cos(a) - 3).toFixed(1) + '" y="' + (65 + p[1] * Math.sin(a) - 2).toFixed(1) + '" width="6" height="4" rx="1" fill="' + R + '"/>'; }).join(''), 'transform-origin:110px 65px') +
    [[96, 58], [126, 52], [104, 88], [132, 98], [88, 76]].map(function (p) { return '<rect x="' + p[0] + '" y="' + p[1] + '" width="5" height="3" fill="' + R + '"/>'; }).join('') +
    t(110, 126, 'found everywhere', { fs: 9, c: R }), 'ubiquitous');

  A['inexorable'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="96" y="12" width="28" height="92" rx="14" fill="#fff" stroke="' + N + '" stroke-width="2"/>' +
    '<circle cx="110" cy="108" r="16" fill="' + R + '"/>' +
    g('an-mercury', '<rect x="104" y="20" width="12" height="88" rx="6" fill="' + R + '"/>', 'transform-origin:110px 108px') +
    '<g stroke="' + N + '" stroke-width="1.5">' + [30, 46, 62, 78].map(function (y) { return '<line x1="124" y1="' + y + '" x2="132" y2="' + y + '"/>'; }).join('') + '</g>' +
    t(176, 50, 'rising,', { fs: 10, c: R }) + t(176, 63, 'unstoppable', { fs: 10, c: R }), 'inexorable');

  A['stem the tide'] = svg(
    '<rect width="220" height="130" rx="12" fill="' + WL + '"/>' +
    g('an-wave', '<path d="M-20 92 q15-24 30 0 t30 0 t30 0 t30 0 V130 H-20Z" fill="' + W + '"/>') +
    '<rect x="126" y="44" width="16" height="86" fill="#7b8491"/><rect x="142" y="104" width="78" height="26" fill="' + S + '"/>' +
    '<path d="M166 104 v-18 l12 -10 l12 10 v18z" fill="#fff" stroke="' + N + '" stroke-width="1.5"/>' +
    t(170, 30, 'the wall', { fs: 10 }) + t(170, 42, 'stops the tide', { fs: 10 }), 'stem the tide');

  A['bear the brunt of'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    g('an-press', '<rect x="56" y="18" width="108" height="30" rx="4" fill="#7b8491"/>' + t(110, 37, 'the worst part', { fs: 10, c: '#fff' })) +
    '<path d="M110 56 v14" stroke="' + R + '" stroke-width="3"/>' +
    '<circle cx="110" cy="80" r="9" fill="' + N + '"/><path d="M96 88 h28 l4 30 h-36z" fill="' + N + '"/>' +
    '<path d="M98 92 l-10 -26 M122 92 l10 -26" stroke="' + N + '" stroke-width="5" stroke-linecap="round"/>', 'bear the brunt of');

  A['teeter on the brink of'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M0 70 H120 L126 130 H0Z" fill="' + S + '"/><path d="M120 70 L126 130" stroke="#8a6d3b" stroke-width="2"/>' +
    g('an-teeter', '<circle cx="114" cy="38" r="7" fill="' + N + '"/><path d="M114 45 v14 M114 59 l-6 11 M114 59 l6 11 M102 50 h24" stroke="' + N + '" stroke-width="3" stroke-linecap="round"/>', 'transform-origin:114px 70px') +
    t(178, 110, 'the brink', { fs: 10, c: R }), 'teeter on the brink of');

  A['a drop in the ocean'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="0" y="78" width="220" height="52" fill="' + W + '"/>' +
    g('an-dropfall', drop(110, 30, W, 1.3)) +
    g('an-ripple', '<ellipse cx="110" cy="80" rx="14" ry="3" fill="none" stroke="#fff" stroke-width="1.5"/>', 'transform-origin:110px 80px') +
    t(110, 112, 'too small to matter', { fs: 10, c: '#fff' }), 'a drop in the ocean');

  A['kick the can down the road'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<rect x="0" y="94" width="220" height="36" fill="#9aa3b0"/>' +
    '<g stroke="#fff" stroke-width="3" stroke-dasharray="14 12"><line x1="0" y1="112" x2="220" y2="112"/></g>' +
    '<path d="M22 92 l14 -24 l6 4 l-8 20 h14 v4 h-26z" fill="' + N + '"/>' +
    g('an-can', '<rect x="54" y="78" width="12" height="16" rx="2" fill="' + R + '"/><rect x="54" y="82" width="12" height="3" fill="#fff"/>') +
    t(150, 40, 'deal with it later…', { fs: 10, c: R }), 'kick the can down the road');

  A['tip the balance'] = svg(
    '<rect width="220" height="130" rx="12" fill="#f7f8fb"/>' +
    '<path d="M104 112 L110 50 L116 112Z" fill="' + N + '"/><rect x="84" y="110" width="52" height="6" rx="3" fill="' + N + '"/>' +
    g('an-tip', '<line x1="40" y1="50" x2="180" y2="50" stroke="' + N + '" stroke-width="3"/><path d="M40 50 L26 76 H54Z" fill="' + GL + '" stroke="' + G + '" stroke-width="1.4"/><path d="M180 50 L166 76 H194Z" fill="#f3d9cd" stroke="' + R + '" stroke-width="1.4"/>' +
      g('an-add', '<circle cx="40" cy="64" r="5" fill="' + G + '"/>'), 'transform-origin:110px 50px') +
    t(40, 98, 'one more', { fs: 9, c: G }) + t(40, 108, 'small change', { fs: 9, c: G }), 'tip the balance');

  return A;
})();
