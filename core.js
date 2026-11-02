/* ===== Lõi dùng chung: cấu trúc bài + chấm điểm (chạy cả trên trình duyệt và Apps Script) =====
   KHÔNG chứa đáp án. Đáp án nằm trong Apps Script (keys.js / tab DapAn). */
var VOCAB_CORE = (function () {
  var EXAM_ID = 'HSG11-VOCAB01-ENV';
  var EXAM_TITLE = 'Chuyên đề từ vựng 01 – Environment';

  function range(prefix, n) { var a = []; for (var i = 1; i <= n; i++) a.push(prefix + i); return a; }

  /* open: câu mở (không chấm điểm) – bấm Kiểm tra sẽ hiện gợi ý */
  var SECTIONS = [
    { id: 'R1', short: 'Bài đọc 1', title: 'Reading 1 – Headings', ids: range('h1_', 5), open: true },
    { id: 'R2', short: 'Bài đọc 2', title: 'Reading 2 – Headings', ids: range('h2_', 5), open: true },
    { id: 'CQ', short: 'Đọc hiểu', title: 'Comprehension check', ids: range('cq', 4), open: true },
    { id: 'VOC', short: 'Từ vựng', title: 'Vocabulary from the texts', ids: [], study: true },
    { id: 'QC', short: 'Quick check', title: 'Quick check', ids: ['qc1a', 'qc1b', 'qc2', 'qc3', 'qc4', 'qc5'] },
    { id: 'WF', short: 'Bài 1', title: 'Word form', ids: range('wf', 20) },
    { id: 'WB', short: 'Bài 2', title: 'Words from the box', ids: range('wb', 12) },
    { id: 'MC', short: 'Bài 3', title: 'Collocations & idioms (A–D)', ids: range('mc', 12) },
    { id: 'MN', short: 'Bài 4', title: 'Closest / opposite meaning', ids: range('mn', 12) },
    { id: 'KW', short: 'Bài 5', title: 'Key word transformation', ids: range('kw', 10) }
  ];

  /* type: text | choice | rw | open ; partial: sai nhẹ được nửa điểm ; strict: đúng chính tả 100% */
  var META = {};
  function set(ids, obj) { ids.forEach(function (id) { var o = {}; for (var k in obj) o[k] = obj[k]; META[id] = o; }); }
  set(range('h1_', 5).concat(range('h2_', 5)), { type: 'open', kind: 'heading' });
  set(range('cq', 4), { type: 'open', kind: 'comp' });
  set(['qc1a', 'qc1b', 'qc2', 'qc3', 'qc4', 'qc5'], { type: 'text', strict: true });
  set(range('wf', 20), { type: 'text', partial: true });
  set(range('wb', 12), { type: 'text', partial: true });
  set(range('mc', 12), { type: 'choice' });
  set(range('mn', 12), { type: 'choice' });
  var KW = {
    1: ['The poorest communities suffer most from the loss of biodiversity.', 'BRUNT', 'The poorest communities', 'the loss of biodiversity.'],
    2: ['The government says it supports biodiversity targets but does nothing to meet them.', 'LIP', 'The government only', 'biodiversity targets.'],
    3: ['Many species are extremely close to dying out.', 'BRINK', 'Many species are teetering', 'extinction.'],
    4: ['The fishing industry is currently going through a severe crisis.', 'THROES', 'The fishing industry is', 'a severe crisis.'],
    5: ['Politicians keep postponing difficult decisions about emissions.', 'CAN', 'On emissions, politicians keep', 'the road.'],
    6: ['Banning plastic straws will make almost no difference to ocean pollution.', 'DROP', 'Banning plastic straws is', 'when it comes to ocean pollution.'],
    7: ['The valley is now almost completely impossible to live in.', 'ALL', 'The valley is now', '.'],
    8: ['Air pollution affects children far more than it affects adults.', 'DISPROPORTIONATELY', 'Children are', 'air pollution.'],
    9: ['Nobody expected the gloomy forecast to actually happen.', 'PASS', 'Nobody expected the gloomy forecast', '.'],
    10: ['Nature protects us from storms; coastal wetlands are a good example of this.', 'POINT', 'Nature protects us from storms; coastal wetlands are', '.']
  };
  for (var k in KW) META['kw' + k] = { type: 'rw', partial: true, prompt: KW[k][0], word: KW[k][1], prefix: KW[k][2], suffix: KW[k][3], must: [KW[k][1].toLowerCase()] };

  var SCORED = [];
  SECTIONS.forEach(function (s) { if (!s.open && !s.study) SCORED = SCORED.concat(s.ids); });
  var ALL_IDS = [];
  SECTIONS.forEach(function (s) { ALL_IDS = ALL_IDS.concat(s.ids); });

  /* ---------- chuẩn hoá ---------- */
  function norm(s) {
    s = String(s == null ? '' : s).toLowerCase();
    s = s.replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"');
    s = s.replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not')
      .replace(/\bwon't\b/g, 'will not').replace(/n't\b/g, ' not');
    s = s.replace(/[.,!?;:"()\[\]\/…]/g, ' ').replace(/[-–—]/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }
  /* "(a|b|)" = một trong các lựa chọn (để trống = có thể bỏ) */
  function expand(k) {
    var parts = String(k).split(/(\([^()]*\))/), out = [''];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i]; if (p === '') continue;
      var alts = /^\(.*\)$/.test(p) ? p.slice(1, -1).split('|') : [p], next = [];
      for (var a = 0; a < out.length && next.length < 600; a++)
        for (var b = 0; b < alts.length; b++) next.push(out[a] + alts[b]);
      out = next;
    }
    return out;
  }
  function variants(list) {
    var seen = {}, out = [];
    (list || []).forEach(function (k) { expand(k).forEach(function (v) { var n = norm(v); if (n && !seen[n]) { seen[n] = 1; out.push(n); } }); });
    return out;
  }
  function stripFix(id, ans) {
    var s = norm(ans), m = META[id];
    var pre = norm(m.prefix), suf = norm(m.suffix);
    if (pre && (s === pre || s.indexOf(pre + ' ') === 0)) s = s.slice(pre.length).trim();
    if (suf && (s === suf || s.slice(-(suf.length + 1)) === ' ' + suf)) s = s.slice(0, s.length - suf.length).trim();
    return s;
  }
  function isBlank(id, a) { return a == null || String(a).trim() === ''; }

  /* ---------- "gần đúng" → nửa điểm ---------- */
  var FUNC = { a: 1, an: 1, the: 1, to: 1, at: 1, on: 1, in: 1, of: 1, for: 1, with: 1, by: 1, from: 1, into: 1, up: 1, out: 1, off: 1, about: 1, that: 1, as: 1, over: 1, down: 1 };
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function bases(w) {
    var out = {}, c = [w];
    if (/s$/.test(w)) c.push(w.slice(0, -1));
    if (/es$/.test(w)) c.push(w.slice(0, -2));
    if (/d$/.test(w)) c.push(w.slice(0, -1));
    if (/ed$/.test(w)) c.push(w.slice(0, -2));
    if (/ing$/.test(w)) { c.push(w.slice(0, -3)); c.push(w.slice(0, -3) + 'e'); }
    if (/(ies|ied)$/.test(w)) c.push(w.slice(0, -3) + 'y');
    if (/ly$/.test(w)) c.push(w.slice(0, -2));
    c.slice().forEach(function (x) { if (/([bcdfghjklmnpqrstvz])\1$/.test(x)) c.push(x.slice(0, -1)); });
    c.forEach(function (x) { if (x.length >= 2) { out[x] = 1; out[x.replace(/e$/, '')] = 1; } });
    return out;
  }
  function minorPair(a, b) {
    var A = bases(a), B = bases(b);
    for (var k in A) if (B[k]) return true;
    return Math.min(a.length, b.length) >= 4 && lev(a, b) <= 1;
  }
  function cost(x, y) {
    var m = x.length, n = y.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = []; d[i][0] = i === 0 ? 0 : d[i - 1][0] + (FUNC[x[i - 1]] ? 1 : 2); }
    for (j = 1; j <= n; j++) d[0][j] = d[0][j - 1] + (FUNC[y[j - 1]] ? 1 : 2);
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      var sub = x[i - 1] === y[j - 1] ? 0 : (minorPair(x[i - 1], y[j - 1]) ? 1 : 2);
      d[i][j] = Math.min(d[i - 1][j] + (FUNC[x[i - 1]] ? 1 : 2), d[i][j - 1] + (FUNC[y[j - 1]] ? 1 : 2), d[i - 1][j - 1] + sub);
    }
    return d[m][n];
  }
  function scoreText(id, s, keys) {
    var v = variants(keys), i;
    for (i = 0; i < v.length; i++) if (v[i] === s) return 1;
    var m = META[id];
    if (!m.partial || !s) return 0;
    if (m.must) {
      var toks = s.split(' '), ok = false;
      m.must.forEach(function (w) { if (toks.indexOf(w) >= 0) ok = true; });
      if (!ok) return 0;
    }
    var st = s.split(' ');
    for (i = 0; i < v.length; i++) if (cost(st, v[i].split(' ')) <= 1) return 0.5;
    return 0;
  }

  /* Chấm một câu: 0 | 0.5 | 1 (câu mở: null) */
  function gradeOne(id, a, keys) {
    var m = META[id]; if (!m || m.type === 'open') return null;
    if (isBlank(id, a)) return 0;
    var k = keys[id] || [];
    if (m.type === 'choice') {
      var A = String(a).trim().toUpperCase();
      for (var i = 0; i < k.length; i++) if (String(k[i]).trim().toUpperCase() === A) return 1;
      return 0;
    }
    if (m.type === 'rw') return scoreText(id, stripFix(id, a), k);
    return scoreText(id, norm(a), k);
  }
  function grade(answers, keys) {
    var res = {};
    SCORED.forEach(function (id) { res[id] = gradeOne(id, (answers || {})[id], keys); });
    return res;
  }
  function r1(x) { return Math.round(x * 10) / 10; }
  function summarize(res) {
    var out = { correct: 0, half: 0, points: 0, total: SCORED.length, score: 0, secs: {} };
    SECTIONS.forEach(function (s) {
      if (s.open || s.study) return;
      var c = 0, h = 0, p = 0;
      s.ids.forEach(function (id) { var v = res[id] || 0; p += v; if (v === 1) c++; else if (v === 0.5) h++; });
      out.secs[s.id] = { correct: c, half: h, points: p, total: s.ids.length };
      out.correct += c; out.half += h; out.points += p;
    });
    out.score = r1(out.points / SCORED.length * 10);
    return out;
  }

  /* Gợi ý heading: so khớp ý chính (danh sách gốc từ) */
  function ideaHits(answer, groups) {
    var s = ' ' + norm(answer) + ' ';
    return (groups || []).map(function (g) {
      var hit = g.w.some(function (w) { return s.indexOf(' ' + norm(w)) >= 0; });
      return { l: g.l, ok: hit };
    });
  }
  function wordCount(s) { var n = norm(s); return n ? n.split(' ').length : 0; }

  return {
    EXAM_ID: EXAM_ID, EXAM_TITLE: EXAM_TITLE, SECTIONS: SECTIONS, META: META, SCORED: SCORED, ALL_IDS: ALL_IDS,
    norm: norm, expand: expand, isBlank: isBlank, gradeOne: gradeOne, grade: grade, summarize: summarize,
    ideaHits: ideaHits, wordCount: wordCount
  };
})();
