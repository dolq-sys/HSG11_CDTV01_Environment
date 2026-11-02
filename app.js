/* ===== Ứng dụng luyện từ vựng ===== */
(function () {
  'use strict';
  var CFG = window.APP_CONFIG || {};
  var CORE = VOCAB_CORE;
  var LS_KEY = 'vocab_' + CORE.EXAM_ID;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SECS = CORE.SECTIONS, SEC = {};
  SECS.forEach(function (s) { SEC[s.id] = s; });
  function secOf(id) { for (var i = 0; i < SECS.length; i++) if (SECS[i].ids.indexOf(id) >= 0) return SECS[i]; return null; }

  /* ---------- lưu trữ cục bộ ---------- */
  var store = loadStore();
  function loadStore() {
    try { var s = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); if (s && s.profiles) return s; } catch (e) {}
    return { profiles: {}, last: null };
  }
  function saveStore() { try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch (e) {} }
  var saveT; function saveSoon() { clearTimeout(saveT); saveT = setTimeout(saveStore, 300); }
  function pidOf(n, c) { return CORE.norm(n) + '|' + CORE.norm(c); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }

  var P = null, cur = null, mode = 'start'; // start | doing | review | result | teacher
  var T = null; // dữ liệu chế độ giáo viên

  /* ---------- tiện ích ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt1(x) { return (Math.round(x * 10) / 10).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
  function fmtPts(x) { return String(x).replace('.', ','); }
  function fmtDate(t) { var d = new Date(t), p = function (n) { return (n < 10 ? '0' : '') + n; }; return p(d.getHours()) + ':' + p(d.getMinutes()) + ' ' + p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear(); }
  var toastT;
  function toast(msg, ms) { var t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, ms || 3200); }
  function show(id) { ['startScreen', 'examScreen', 'resultScreen'].forEach(function (s) { $('#' + s).hidden = s !== id; }); window.scrollTo(0, 0); }
  var ICON = {
    ok: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bad: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 6.5l7 7M13.5 6.5l-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    half: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M10 4a6 6 0 0 1 0 12z" fill="currentColor"/></svg>'
  };

  /* ---------- dựng trang ---------- */
  $('#examBody').innerHTML = VOCAB_CONTENT.html;
  $('#cntAll').textContent = CORE.ALL_IDS.length;
  $$('#examBody .hl').forEach(function (el, i) { el.dataset.hid = 'h' + i; });
  var VIEWS = $$('#examBody .view'), curView = 0;
  (function buildNav() {
    $('#secNav').innerHTML = VIEWS.map(function (v, i) {
      var s = SEC[v.dataset.sec];
      return '<button type="button" class="sn" data-v="' + i + '"><span class="snt">' + s.short + '</span><span class="snr">' + (s.study ? 'tự học' : s.title.replace(/^.*?– /, '')) + '</span><span class="snc"></span></button>';
    }).join('');
    $('#secNav').addEventListener('click', function (e) { var b = e.target.closest('.sn'); if (b) showView(+b.dataset.v); });
  })();
  function viewIndex(secId) { for (var i = 0; i < VIEWS.length; i++) if (VIEWS[i].dataset.sec === secId) return i; return 0; }
  function showView(i) {
    i = Math.max(0, Math.min(VIEWS.length - 1, i)); curView = i;
    VIEWS.forEach(function (v, k) { v.classList.toggle('active', k === i); });
    $$('#secNav .sn').forEach(function (b, k) { b.classList.toggle('active', k === i); if (k === i && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' }); });
    $('#btnPrevV').disabled = i === 0; $('#btnNextV').disabled = i === VIEWS.length - 1;
    $$('.rwin', VIEWS[i]).forEach(autoGrow);
    updCheckBar();
    if (cur && mode === 'doing') { cur.view = i; saveSoon(); }
    HL.hide(); hideGloss();
  }
  $('#btnPrevV').onclick = function () { showView(curView - 1); };
  $('#btnNextV').onclick = function () { showView(curView + 1); };
  function goTo(target) { // "R1:3" → mở đoạn 3 bài đọc 1
    var p = target.split(':'), vi = viewIndex(p[0]);
    showView(vi);
    var el = document.getElementById(p[0] + '-p' + p[1]); if (!el) return;
    setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1400); }, 40);
  }
  function goToItem(id) {
    var s = secOf(id); if (!s) return; showView(viewIndex(s.id));
    var el = document.getElementById('q' + id) || (document.getElementById('q-' + id) || {}).parentNode; if (!el) return;
    setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1400); }, 40);
  }

  /* ---------- đọc / ghi câu trả lời ---------- */
  function readAnswers() {
    var a = {};
    $$('#examBody input[type=radio]:checked').forEach(function (r) { a[r.dataset.q] = r.value; });
    $$('#examBody .gap, #examBody .rwin').forEach(function (el) { if (el.value.trim()) a[el.dataset.q] = el.value.trim(); });
    return a;
  }
  function writeAnswers(a) {
    a = a || {};
    $$('#examBody input[type=radio]').forEach(function (r) { r.checked = a[r.dataset.q] === r.value; });
    $$('#examBody .gap, #examBody .rwin').forEach(function (el) { el.value = a[el.dataset.q] || ''; });
    $$('#examBody .rwin').forEach(autoGrow);
    refreshFilled();
  }
  function setDisabled(dis) { $$('#examBody input, #examBody textarea').forEach(function (el) { el.disabled = dis; }); $$('.chk1').forEach(function (b) { b.hidden = dis; }); }
  function autoGrow(t) { if (!t.offsetParent) return; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }

  function navStats(answers, marks) {
    $$('#secNav .sn').forEach(function (b, i) {
      var s = SEC[VIEWS[i].dataset.sec], c = b.querySelector('.snc');
      b.classList.remove('full', 'some', 't-good', 't-mid', 't-bad');
      if (s.study) { c.textContent = ''; return; }
      var done = s.ids.filter(function (id) { return !CORE.isBlank(id, answers[id]); }).length;
      var checked = s.open ? [] : s.ids.filter(function (id) { return marks && marks[id] != null; });
      if (!s.open && checked.length) {
        var pts = 0; s.ids.forEach(function (id) { pts += (marks[id] || 0); });
        c.textContent = fmtPts(pts) + '/' + s.ids.length + ' đúng';
        var r = pts / s.ids.length; b.classList.add(r >= 0.8 ? 't-good' : r >= 0.5 ? 't-mid' : 't-bad');
      } else {
        c.textContent = done + '/' + s.ids.length;
        b.classList.toggle('full', done === s.ids.length); b.classList.toggle('some', done > 0 && done < s.ids.length);
      }
    });
  }
  function refreshFilled() {
    $$('#examBody .gap, #examBody .rwin').forEach(function (el) { el.classList.toggle('filled', !!el.value.trim()); });
    var a = readAnswers();
    $('#cntDone').textContent = CORE.ALL_IDS.filter(function (id) { return !CORE.isBlank(id, a[id]); }).length;
    if (mode === 'doing') navStats(a, cur && cur.marks);
  }
  function onEdit(e) {
    if (mode !== 'doing' || !cur) return;
    var t = e.target, id = t.dataset && t.dataset.q;
    if (t.classList.contains('rwin')) autoGrow(t);
    if (id && cur.marks && cur.marks[id] != null) { delete cur.marks[id]; clearMark(id); }
    refreshFilled(); updCheckBar();
    clearTimeout(saveT); saveT = setTimeout(function () { if (cur) { cur.answers = readAnswers(); saveStore(); } }, 300);
  }
  $('#examBody').addEventListener('input', onEdit);
  $('#examBody').addEventListener('change', onEdit);
  $('#examBody').addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.key === 'Enter' && t.matches('.gap, .rwin:not(.tall)')) {
      e.preventDefault();
      var all = $$('.gap, .rwin', VIEWS[curView]).filter(function (x) { return !x.disabled; }), k = all.indexOf(t);
      if (all[k + 1]) all[k + 1].focus();
    }
    if ((e.key === 'Enter' || e.key === ' ') && t.classList.contains('vw')) { e.preventDefault(); showGloss(t); }
  });
  $('#examBody').addEventListener('click', function (e) {
    var g = e.target.closest('.golink'); if (g) { goTo(g.dataset.goto); return; }
    var w = e.target.closest('.wordbank .w'); if (w && mode === 'doing') { w.classList.toggle('used'); return; }
    var pt = e.target.closest('.ptab');
    if (pt) { $$('.ptab', pt.parentNode).forEach(function (x) { x.classList.toggle('active', x === pt); }); $$('.pt', pt.closest('.inner')).forEach(function (x) { x.hidden = x.dataset.pt !== pt.dataset.pt; }); return; }
    var c1 = e.target.closest('.chk1'); if (c1) { doCheck([c1.dataset.chk], secOf(c1.dataset.chk).id, c1); return; }
  });

  /* ---------- đánh dấu đúng / sai ---------- */
  function clearMark(id) {
    var el = document.getElementById('q' + id), inp = document.getElementById('q-' + id);
    $$('[data-mk="' + id + '"]').forEach(function (x) { x.remove(); });
    if (inp) inp.classList.remove('r-ok', 'r-half', 'r-bad');
    if (el && CORE.META[id].type === 'choice') $$('label.ch', el).forEach(function (l) { l.classList.remove('pick-ok', 'pick-bad', 'is-key'); });
  }
  function clearAllMarks() {
    $$('#examBody [data-mk]').forEach(function (x) { x.remove(); });
    $$('#examBody .r-ok, #examBody .r-half, #examBody .r-bad').forEach(function (x) { x.classList.remove('r-ok', 'r-half', 'r-bad'); });
    $$('#examBody .pick-ok, #examBody .pick-bad, #examBody .is-key').forEach(function (x) { x.classList.remove('pick-ok', 'pick-bad', 'is-key'); });
    $$('#examBody .fb').forEach(function (x) { x.innerHTML = ''; });
  }
  function label(v, blank) { return v === 1 ? 'Đúng' : v === 0.5 ? 'Nửa điểm' : blank ? 'Bỏ trống' : 'Chưa đúng'; }
  function markOne(id, v, blank, keys) {
    clearMark(id);
    var m = CORE.META[id], el = document.getElementById('q' + id), inp = document.getElementById('q-' + id);
    var st = v === 1 ? 'ok' : v === 0.5 ? 'half' : blank ? 'blank' : 'bad';
    var badge = '<span class="mk ' + st + '" data-mk="' + id + '">' + (v === 1 ? ICON.ok : v === 0.5 ? ICON.half : ICON.bad) + '<span>' + label(v, blank) + '</span></span>';
    var key = keys && v !== 1 && keys[id] ? '<span class="tkey" data-mk="' + id + '">Đáp án: <b>' + esc(keys[id].join(' / ').replace(/\(([^()]*)\)/g, function (_, x) { return '(' + x.split('|').map(function (s) { return s || '∅'; }).join(' / ') + ')'; })) + '</b></span>' : '';
    if (m.type === 'choice') {
      var ks = keys && keys[id] ? keys[id].map(function (x) { return String(x).toUpperCase(); }) : [];
      $$('label.ch', el).forEach(function (l) {
        var r = l.querySelector('input');
        l.classList.toggle('pick-ok', r.checked && v === 1); l.classList.toggle('pick-bad', r.checked && v !== 1);
        l.classList.toggle('is-key', ks.indexOf(r.value) >= 0);
      });
      el.querySelector('.qrow').insertAdjacentHTML('beforeend', badge);
    } else if (m.type === 'rw') {
      if (inp.value) inp.classList.add('r-' + st);
      el.querySelector('.qrow').insertAdjacentHTML('beforeend', badge);
      if (key) el.insertAdjacentHTML('beforeend', '<div class="tkey block" data-mk="' + id + '">' + key.replace(/^<span class="tkey" data-mk="[^"]+">|<\/span>$/g, '') + '</div>');
    } else {
      if (inp.value) inp.classList.add('r-' + st);
      inp.insertAdjacentHTML('afterend', badge.replace('class="mk ', 'class="mk sm ') + key);
    }
  }
  function renderFb(id, f) {
    var box = $('.fb[data-fb="' + id + '"]'); if (!box) return;
    if (!f) { box.innerHTML = ''; return; }
    var h = '';
    if (f.s) {
      h += '<div class="fbt">Gợi ý heading</div><ul class="fbs">' + f.s.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      if (f.idea) h += '<div class="fbt">Ý chính heading nên có</div><div class="ideas">' + f.idea.map(function (x) {
        return '<span class="idea ' + (x.ok ? 'ok' : 'no') + '">' + (x.ok ? ICON.ok : '<i class="dot"></i>') + esc(x.l) + '</span>';
      }).join('') + '</div><p class="fbn">' + (f.idea.every(function (x) { return x.ok; }) ? 'Heading của bạn đã nêu đủ các ý chính.' : f.idea.some(function (x) { return x.ok; }) ? 'Heading của bạn có ý đúng; thử bổ sung ý còn thiếu (ô chưa tô xanh).' : 'Heading chưa nêu được ý chính của đoạn – đọc lại đoạn và so với gợi ý.') + ' <span class="muted">(máy dò theo từ khoá, chỉ để tham khảo)</span></p>';
    } else if (f.a) {
      h += '<div class="fbt">Câu trả lời gợi ý</div><p class="fba">' + esc(f.a) + '</p>' +
        (f.p ? '<div class="fbt">Ý cần có</div><ul class="fbs">' + f.p.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '');
    }
    box.innerHTML = '<div class="fbbox">' + h + '</div>';
  }
  function applyResults(answers, marks, fb, keys) {
    clearAllMarks();
    Object.keys(marks || {}).forEach(function (id) { if (CORE.META[id] && marks[id] != null) markOne(id, marks[id], CORE.isBlank(id, answers[id]), keys); });
    Object.keys(fb || {}).forEach(function (id) { renderFb(id, fb[id]); });
  }

  /* ---------- gọi file hứng (POST, body text/plain) ---------- */
  function api(body) {
    if (!CFG.API_URL || /PASTE_/.test(CFG.API_URL)) return Promise.reject(new Error('Chưa cấu hình địa chỉ file hứng (API_URL trong config.js)'));
    return fetch(CFG.API_URL, { method: 'POST', body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (!d || !d.ok) throw new Error((d && d.error) || 'File hứng không phản hồi đúng'); return d; });
  }
  function payload(action, extra) {
    var b = {
      action: action, exam: CORE.EXAM_ID, sid: cur.aid, name: P.name, cls: P.cls, startedAt: cur.startedAt, at: Date.now(),
      answers: cur.answers, checks: cur.checks || {}, hl: cur.hl || {}, ua: navigator.userAgent.slice(0, 160)
    };
    for (var k in extra) b[k] = extra[k];
    return b;
  }

  /* ---------- KIỂM TRA ---------- */
  var busy = false;
  function updCheckBar() {
    var s = SEC[VIEWS[curView].dataset.sec], btn = $('#btnCheck'), info = $('#chkInfo');
    btn.hidden = mode !== 'doing' || s.study;
    if (s.study) { info.innerHTML = '<b>' + s.title + '</b>'; return; }
    if (mode !== 'doing') { info.innerHTML = '<b>' + s.title + '</b>'; return; }
    var a = readAnswers(), marks = (cur && cur.marks) || {};
    var done = s.ids.filter(function (id) { return !CORE.isBlank(id, a[id]); }).length;
    if (!s.open && s.ids.some(function (id) { return marks[id] != null; })) {
      var c = 0, h = 0; s.ids.forEach(function (id) { if (marks[id] === 1) c++; else if (marks[id] === 0.5) h++; });
      info.innerHTML = '<b>Đúng ' + c + '/' + s.ids.length + '</b>' + (h ? '<span>' + h + ' câu nửa điểm</span>' : '<span>đã làm ' + done + '/' + s.ids.length + '</span>');
    } else info.innerHTML = '<b>Đã làm ' + done + '/' + s.ids.length + '</b><span>' + (s.open ? 'bấm Kiểm tra để xem gợi ý' : 'bấm Kiểm tra để biết đúng/sai') + '</span>';
  }
  $('#btnCheck').onclick = function () {
    var s = SEC[VIEWS[curView].dataset.sec];
    var a = readAnswers(), ids = s.open ? s.ids.filter(function (id) { return CORE.wordCount(a[id]) >= 2; }) : s.ids;
    if (s.open && !ids.length) { toast(s.id === 'CQ' ? 'Hãy trả lời ít nhất một câu (từ 2 từ trở lên) rồi mới kiểm tra.' : 'Hãy viết ít nhất một heading (từ 2 từ trở lên) rồi mới kiểm tra.'); return; }
    if (!s.open && !s.ids.some(function (id) { return !CORE.isBlank(id, a[id]); })) { toast('Bạn chưa làm câu nào trong bài này.'); return; }
    doCheck(ids, s.id, $('#btnCheck'));
  };
  function doCheck(ids, secId, btn) {
    if (busy || mode !== 'doing' || !cur) return;
    cur.answers = readAnswers();
    if (CORE.META[ids[0]].type === 'open' && ids.length === 1 && CORE.wordCount(cur.answers[ids[0]]) < 2) { toast('Hãy viết heading (từ 2 từ trở lên) rồi mới kiểm tra.'); return; }
    busy = true; btn.classList.add('busy'); btn.disabled = true;
    cur.checks = cur.checks || {}; cur.checks[secId] = (cur.checks[secId] || 0) + 1;
    saveStore();
    api(payload('check', { ids: ids, sec: secId }))
      .then(function (d) {
        if (!cur) return;
        cur.marks = cur.marks || {}; cur.fb = cur.fb || {};
        Object.keys(d.marks || {}).forEach(function (id) { cur.marks[id] = d.marks[id]; markOne(id, d.marks[id], CORE.isBlank(id, cur.answers[id]), null); });
        Object.keys(d.fb || {}).forEach(function (id) { cur.fb[id] = d.fb[id]; renderFb(id, d.fb[id]); });
        saveStore(); refreshFilled(); updCheckBar();
        var s = SEC[secId];
        if (!s.open) {
          var c = 0; s.ids.forEach(function (id) { if (cur.marks[id] === 1) c++; });
          toast(c === s.ids.length ? 'Tuyệt vời! Đúng hết ' + c + '/' + s.ids.length + ' câu.' : 'Đúng ' + c + '/' + s.ids.length + ' câu. Sửa các câu chưa đúng rồi kiểm tra lại nhé.', 4200);
        } else if (ids.length === 1) {
          var box = $('.fb[data-fb="' + ids[0] + '"]'); if (box) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
      .catch(function (err) { cur.checks[secId]--; toast('Không kiểm tra được: ' + (err.message || err), 5000); })
      .then(function () { busy = false; btn.classList.remove('busy'); btn.disabled = false; });
  }

  /* ---------- tô sáng (dùng chung mẫu HSG) ---------- */
  var HL = (function () {
    var tip = $('#hlTip'), pending = null;
    function okNode(n, root) {
      for (var p = n.parentNode; p && p !== root; p = p.parentNode) {
        if (/^(TEXTAREA|BUTTON|SCRIPT|STYLE|svg)$/i.test(p.nodeName)) return false;
        if (p.classList && (p.classList.contains('tkey') || p.classList.contains('mk'))) return false;
      }
      return true;
    }
    function textNodes(root) { var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), out = [], n; while ((n = w.nextNode())) if (okNode(n, root)) out.push(n); return out; }
    function rangeToOffsets(root, range) {
      var acc = 0, s = -1, e = -1;
      textNodes(root).forEach(function (n) {
        var len = n.nodeValue.length;
        if (range.intersectsNode(n)) {
          var a = n === range.startContainer ? range.startOffset : 0, b = n === range.endContainer ? range.endOffset : len;
          if (b > a) { if (s < 0) s = acc + a; e = acc + b; }
        }
        acc += len;
      });
      return s >= 0 && e > s ? [s, e] : null;
    }
    function clear(root) { $$('mark.hlm', root).forEach(function (m) { var p = m.parentNode; while (m.firstChild) p.insertBefore(m.firstChild, m); p.removeChild(m); }); root.normalize(); }
    function paint(root, segs) {
      clear(root);
      (segs || []).forEach(function (sg) {
        var acc = 0;
        textNodes(root).forEach(function (n) {
          var len = n.nodeValue.length, a = Math.max(sg[0] - acc, 0), b = Math.min(sg[1] - acc, len);
          acc += len;
          if (b <= a || (!n.nodeValue.slice(a, b).trim() && b - a < 2)) return;
          var mid = n; if (a > 0) mid = n.splitText(a);
          if (b - a < mid.nodeValue.length) mid.splitText(b - a);
          var m = document.createElement('mark'); m.className = 'hlm';
          mid.parentNode.insertBefore(m, mid); m.appendChild(mid);
        });
      });
    }
    function merge(segs) {
      segs.sort(function (x, y) { return x[0] - y[0]; }); var out = [];
      segs.forEach(function (s) { var l = out[out.length - 1]; if (l && s[0] <= l[1]) l[1] = Math.max(l[1], s[1]); else out.push([s[0], s[1]]); });
      return out;
    }
    function placeTip(rect, text, cls) { tip.textContent = text; tip.className = 'hltip ' + (cls || ''); tip.style.left = (rect.left + rect.width / 2) + 'px'; tip.style.top = rect.top + 'px'; tip.hidden = false; }
    function hide() { tip.hidden = true; pending = null; }
    function onSelect() {
      if (mode !== 'doing') return;
      var sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
      var range = sel.getRangeAt(0), cn = range.commonAncestorContainer;
      var root = (cn.nodeType === 1 ? cn : cn.parentNode).closest('.hl');
      if (!root) {
        var sn = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentNode;
        root = sn.closest && sn.closest('.hl'); if (!root) return;
        var r2 = document.createRange(); r2.setStart(range.startContainer, range.startOffset); r2.setEnd(root, root.childNodes.length); range = r2;
      }
      var off = rangeToOffsets(root, range); if (!off) return;
      pending = { kind: 'add', root: root, off: off };
      hideGloss();
      placeTip(range.getBoundingClientRect(), 'Tô sáng');
    }
    function removeAt(m) {
      var root = m.closest('.hl'), r = document.createRange(); r.selectNodeContents(m);
      apply({ kind: 'remove', root: root, off: rangeToOffsets(root, r) });
    }
    function apply(pd) {
      if (!cur) return;
      cur.hl = cur.hl || {};
      var id = pd.root.dataset.hid, segs = cur.hl[id] || [];
      if (pd.kind === 'add') segs = merge(segs.concat([pd.off]));
      else segs = segs.filter(function (s) { return !(pd.off && s[0] <= pd.off[0] && s[1] >= pd.off[1]); });
      if (segs.length) cur.hl[id] = segs; else delete cur.hl[id];
      paint(pd.root, segs); saveStore();
    }
    document.addEventListener('mouseup', function (e) { if (e.target === tip) return; setTimeout(onSelect, 10); });
    document.addEventListener('touchend', function (e) { if (e.target === tip) return; setTimeout(onSelect, 350); });
    document.addEventListener('selectionchange', function () {
      var s = window.getSelection();
      if (pending && pending.kind === 'add' && (!s || s.isCollapsed)) setTimeout(function () { if (pending && pending.kind === 'add' && window.getSelection().isCollapsed) hide(); }, 200);
    });
    document.addEventListener('click', function (e) {
      if (e.target === tip) return;
      var m = e.target.closest && e.target.closest('mark.hlm');
      if (m && mode === 'doing' && window.getSelection().isCollapsed && !e.target.closest('.vw')) {
        var r = document.createRange(); r.selectNodeContents(m);
        pending = { kind: 'remove', root: m.closest('.hl'), off: rangeToOffsets(m.closest('.hl'), r) };
        placeTip(m.getBoundingClientRect(), 'Bỏ tô sáng', 'remove');
      } else if (!tip.hidden && (!window.getSelection() || window.getSelection().isCollapsed)) hide();
    });
    document.addEventListener('scroll', function () { if (pending) hide(); }, { passive: true, capture: true });
    tip.addEventListener('mousedown', function (e) { e.preventDefault(); });
    tip.addEventListener('click', function () { if (!pending) return; apply(pending); window.getSelection().removeAllRanges(); hide(); });
    function applyAll(map) { $$('#examBody .hl').forEach(function (root) { if ((map && map[root.dataset.hid]) || root.querySelector('mark.hlm')) paint(root, map && map[root.dataset.hid]); }); }
    return { applyAll: applyAll, hide: hide, removeAt: removeAt };
  })();
  $('#btnClearHl').onclick = function () { if (!cur || mode !== 'doing') return; cur.hl = {}; HL.applyAll({}); saveStore(); toast('Đã xoá tất cả chỗ tô sáng.'); };

  /* ---------- ghi chú từ vựng ---------- */
  var gloss = $('#gloss'), glossFor = null;
  function showGloss(w) {
    var g = VOCAB_CONTENT.GLOSS[w.dataset.g]; if (!g) return;
    HL.hide();
    glossFor = w;
    var inMark = w.closest('mark.hlm') || w.querySelector('mark.hlm');
    gloss.innerHTML = '<button type="button" class="gx" aria-label="Đóng">&times;</button>' +
      '<div class="gw">' + esc(g[0]) + '</div><div class="gp"><span class="gipa">' + esc(g[1]) + '</span><span class="gpos">' + esc(g[2]) + '</span></div>' +
      '<div class="gd">' + esc(g[3]) + '</div>' + (inMark && mode === 'doing' ? '<button type="button" class="btn link gunhl">Bỏ tô sáng chỗ này</button>' : '');
    gloss.hidden = false;
    var r = w.getBoundingClientRect(), gw = gloss.offsetWidth, gh = gloss.offsetHeight;
    var left = Math.max(8, Math.min(window.innerWidth - gw - 8, r.left + r.width / 2 - gw / 2));
    var top = r.bottom + 8; if (top + gh > window.innerHeight - 8) top = r.top - gh - 8;
    gloss.style.left = left + 'px'; gloss.style.top = Math.max(8, top) + 'px';
    $$('.vw.on').forEach(function (x) { x.classList.remove('on'); }); w.classList.add('on');
  }
  function hideGloss() { gloss.hidden = true; if (glossFor) glossFor.classList.remove('on'); glossFor = null; }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.gx')) { hideGloss(); return; }
    if (e.target.closest('.gunhl')) { var m = glossFor && (glossFor.closest('mark.hlm') || glossFor.querySelector('mark.hlm')); if (m) HL.removeAt(m); hideGloss(); return; }
    if (e.target.closest('#gloss')) return;
    var w = e.target.closest && e.target.closest('.vw');
    if (w && window.getSelection().isCollapsed) { if (glossFor === w) hideGloss(); else showGloss(w); return; }
    if (!gloss.hidden) hideGloss();
  });
  document.addEventListener('scroll', function () { if (!gloss.hidden) hideGloss(); }, { passive: true, capture: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { hideGloss(); HL.hide(); } });

  /* ---------- màn hình bắt đầu ---------- */
  var inName = $('#inName'), inClass = $('#inClass');
  if (store.last && store.profiles[store.last]) { inName.value = store.profiles[store.last].name; inClass.value = store.profiles[store.last].cls; }
  function refreshStart() {
    var n = inName.value.trim(), c = inClass.value.trim(), p = n && c ? store.profiles[pidOf(n, c)] : null;
    $('#btnContinue').hidden = !(p && p.current);
    renderHistory($('#startHistory .histwrap'), p);
    $('#startHistory').hidden = !(p && p.history.length);
  }
  inName.addEventListener('input', refreshStart); inClass.addEventListener('input', refreshStart);
  function getProfile() {
    var n = inName.value.replace(/\s+/g, ' ').trim(), c = inClass.value.replace(/\s+/g, ' ').trim();
    if (n.length < 2 || !c) { $('#startErr').textContent = 'Nhập đầy đủ họ tên và lớp.'; return null; }
    $('#startErr').textContent = '';
    var id = pidOf(n, c);
    if (!store.profiles[id]) store.profiles[id] = { name: n, cls: c, current: null, history: [] };
    P = store.profiles[id]; P.name = n; P.cls = c; store.last = id; return P;
  }
  $('#startForm').addEventListener('submit', function (e) {
    e.preventDefault(); if (!getProfile()) return;
    if (P.current && CORE.ALL_IDS.some(function (id) { return !CORE.isBlank(id, P.current.answers[id]); }) &&
      !window.confirm('Bạn đang có một lần làm dở. Bắt đầu lần mới (lần dở vẫn được lưu trong file của thầy/cô)?')) return;
    P.current = { aid: uid(), startedAt: Date.now(), answers: {}, marks: {}, fb: {}, checks: {}, hl: {}, view: 0 };
    saveStore(); enterWork();
  });
  $('#btnContinue').onclick = function () { if (getProfile() && P.current) enterWork(); };

  function setTop(name, cls) { $('#tbName').textContent = name; $('#tbClass').textContent = cls; }
  function enterWork() {
    cur = P.current; mode = 'doing';
    document.body.classList.remove('reviewing', 'teacher');
    setTop(P.name, P.cls);
    $('#reviewTag').hidden = true; $('#reviewBanner').hidden = true; $('#btnSubmit').hidden = false; $('#btnCloseReview').hidden = true; $('#btnClearHl').hidden = false;
    $$('.wordbank .w').forEach(function (w) { w.classList.remove('used'); });
    setDisabled(false); writeAnswers(cur.answers); applyResults(cur.answers, cur.marks, cur.fb, null); HL.applyAll(cur.hl);
    show('examScreen'); showView(cur.view || 0);
  }

  /* ---------- nộp bài ---------- */
  $('#btnSubmit').onclick = function () {
    if (mode !== 'doing') return;
    var a = readAnswers(), left = CORE.ALL_IDS.filter(function (id) { return CORE.isBlank(id, a[id]); }).length;
    $('#cfText').innerHTML = (left ? 'Bạn còn <b>' + left + ' câu</b> chưa làm. ' : 'Bạn đã làm đủ tất cả các câu. ') + 'Nộp bài để gửi cho thầy/cô và xem kết quả?';
    $('#confirmModal').hidden = false; $('#cfYes').focus();
  };
  $('#cfNo').onclick = function () { $('#confirmModal').hidden = true; };
  $('#cfYes').onclick = function () { $('#confirmModal').hidden = true; submit(); };
  function submit() {
    if (mode !== 'doing' || !cur) return;
    cur.answers = readAnswers();
    var c = cur, e = { aid: c.aid, no: P.history.length + 1, startedAt: c.startedAt, at: Date.now(), answers: c.answers, checks: c.checks || {}, hl: c.hl || {}, fb: c.fb || {}, marks: c.marks || {}, result: null, sent: false };
    P.history.push(e); P.current = null; saveStore();
    mode = 'result'; HL.hide(); hideGloss();
    showResult(e); send(e);
  }
  function send(e) {
    var keepCur = cur; cur = { aid: e.aid, startedAt: e.startedAt, answers: e.answers, checks: e.checks, hl: e.hl };
    var body = payload('submit', { at: e.at }); cur = keepCur;
    e.err = null;
    return api(body).then(function (d) {
      e.result = { sum: d.sum }; e.marks = d.marks || e.marks; e.fb = d.fb || e.fb; if (d.attemptNo) e.no = d.attemptNo;
      e.sent = true; saveStore();
    }).catch(function (err) { e.err = 'Chưa gửi được bài: ' + (err.message || err) + '.'; saveStore(); })
      .then(function () { if (mode === 'result' && shownAid === e.aid) showResult(e); refreshHistory(); });
  }
  function retryPending() {
    Object.keys(store.profiles).forEach(function (k) {
      var p = store.profiles[k];
      p.history.forEach(function (e) { if (!e.sent) { var keep = P; P = p; send(e); P = keep; } });
    });
  }

  /* ---------- kết quả ---------- */
  var shownAid = null;
  function ring(score) {
    var r = 56, c = 2 * Math.PI * r, f = Math.max(0, Math.min(1, score / 10));
    return '<div class="ring"><svg viewBox="0 0 132 132"><circle cx="66" cy="66" r="' + r + '" fill="none" stroke="#e6edf6" stroke-width="12"/><circle cx="66" cy="66" r="' + r + '" fill="none" stroke="#1f3a5f" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + (c * f) + ' ' + c + '"/></svg><div class="val"><b>' + fmt1(score) + '</b><span>/ 10 điểm</span></div></div>';
  }
  function showResult(e) {
    shownAid = e.aid; mode = 'result'; show('resultScreen');
    var h = '';
    if (!e.result) {
      h = '<div class="rpending">' + (e.err ? '' : '<div class="spinner"></div>') + '<h2>' + (e.err ? 'Bài đã được lưu trên máy này' : 'Đang gửi bài…') + '</h2>' +
        (e.err ? '<p class="muted">' + esc(e.err) + ' Bài làm không bị mất. Kiểm tra mạng rồi bấm gửi lại.</p><div class="actions" style="justify-content:center"><button class="btn primary" id="btnResend">Gửi lại bài</button></div>' : '<p class="muted">Vui lòng chờ trong giây lát.</p>') + '</div>';
    } else {
      var S = e.result.sum;
      h += '<div class="rtop">' + ring(S.score) + '<div class="rinfo"><h2>Kết quả lần làm thứ ' + e.no + '</h2>' +
        '<p class="big">Số câu đúng: <b>' + S.correct + '/' + S.total + '</b>' + (S.half ? ' <span class="muted">+ ' + S.half + ' câu nửa điểm</span>' : '') + '</p>' +
        '<p class="big">Điểm: <b>' + fmt1(S.score) + '/10</b></p><p class="muted">Nộp lúc ' + fmtDate(e.at) + ' · bấm Kiểm tra ' + totalChecks(e.checks) + ' lần</p></div></div>';
      h += '<table class="secs">' + SECS.filter(function (s) { return !s.open && !s.study; }).map(function (s) {
        var x = S.secs[s.id];
        return '<tr><td>' + (s.short === s.title ? '' : s.short + ' – ') + esc(s.title) + '</td><td><div class="bar"><i style="width:' + Math.round(100 * x.points / x.total) + '%"></i></div></td><td class="n">' + fmtPts(x.points) + '/' + x.total + '</td></tr>';
      }).join('') + '</table>';
      var open = SECS.filter(function (s) { return s.open; }).map(function (s) { return s.short + ': ' + s.ids.filter(function (id) { return !CORE.isBlank(id, e.answers[id]); }).length + '/' + s.ids.length; });
      h += '<p class="rnote">Phần viết heading và đọc hiểu không tính điểm (' + open.join(' · ') + '); thầy/cô sẽ xem trực tiếp.</p>';
    }
    h += '<div class="actions"><button class="btn ghost" id="btnHome">Về trang đầu</button><button class="btn ghost" id="btnReview">Xem lại bài làm</button><button class="btn primary" id="btnRetry">Làm lần mới</button></div>';
    $('#resultCard').innerHTML = h;
    var rs = $('#btnResend'); if (rs) rs.onclick = function () { showResult(e); send(e); };
    $('#btnReview').onclick = function () { openReview(e); };
    $('#btnRetry').onclick = function () { P.current = { aid: uid(), startedAt: Date.now(), answers: {}, marks: {}, fb: {}, checks: {}, hl: {}, view: 0 }; saveStore(); enterWork(); };
    $('#btnHome').onclick = function () { mode = 'start'; refreshStart(); show('startScreen'); };
    renderHistory($('#resultHistory .histwrap'), P); $('#resultHistory').hidden = !P.history.length;
  }
  function totalChecks(ch) { var n = 0; for (var k in ch || {}) n += ch[k]; return n; }
  function renderHistory(box, p) {
    if (!p || !p.history.length) { box.innerHTML = ''; return; }
    box.innerHTML = '<table class="hist"><thead><tr><th>Lần</th><th>Nộp lúc</th><th>Câu đúng</th><th>Điểm</th><th></th></tr></thead><tbody>' +
      p.history.slice().reverse().map(function (e) {
        return '<tr><td class="num">' + e.no + '</td><td>' + fmtDate(e.at) + '</td><td class="num">' + (e.result ? e.result.sum.correct + '/' + e.result.sum.total : '–') + '</td>' +
          '<td>' + (e.result ? '<span class="sc">' + fmt1(e.result.sum.score) + '</span>/10' : '<span class="badge pending">Chưa gửi</span>') + '</td>' +
          '<td><button class="btn link" data-act="res" data-aid="' + e.aid + '">Kết quả</button> · <button class="btn link" data-act="rev" data-aid="' + e.aid + '">Xem lại</button></td></tr>';
      }).join('') + '</tbody></table>';
    box.onclick = function (ev) {
      var b = ev.target.closest('button[data-aid]'); if (!b) return;
      P = p; store.last = pidOf(p.name, p.cls);
      var e = p.history.filter(function (x) { return x.aid === b.dataset.aid; })[0]; if (!e) return;
      if (b.dataset.act === 'rev') openReview(e); else showResult(e);
    };
  }
  function refreshHistory() {
    if (!$('#startScreen').hidden) refreshStart();
    if (!$('#resultScreen').hidden && P) renderHistory($('#resultHistory .histwrap'), P);
  }

  /* ---------- HS xem lại một lần làm (không hiện đáp án) ---------- */
  var reviewFrom = null;
  function openReview(e) {
    reviewFrom = e; mode = 'review'; cur = null;
    document.body.classList.add('reviewing'); document.body.classList.remove('teacher');
    setTop(P.name, P.cls);
    $('#reviewTag').hidden = false; $('#reviewTag').textContent = 'Xem lại lần ' + e.no;
    $('#btnSubmit').hidden = true; $('#btnCloseReview').hidden = false; $('#btnClearHl').hidden = true;
    $('#reviewBanner').hidden = false;
    $('#reviewBanner').innerHTML = '<b>Lần ' + e.no + '</b> · nộp lúc ' + fmtDate(e.at) + (e.result ? ' · <b>' + fmt1(e.result.sum.score) + '/10</b> · ' + e.result.sum.correct + ' câu đúng' : '') +
      '<span class="legend2 rv"><i class="lg ok"></i>Đúng <i class="lg half"></i>Nửa điểm <i class="lg bad"></i>Chưa đúng</span><div class="muted rvnote">Đáp án đúng không được hiển thị. Muốn luyện tiếp, bấm Đóng xem lại → Làm lần mới.</div>';
    setDisabled(true); writeAnswers(e.answers); applyResults(e.answers, e.marks, e.fb, null); HL.applyAll(e.hl || {});
    navStats(e.answers, e.marks);
    show('examScreen'); showView(0);
  }
  $('#btnCloseReview').onclick = function () { document.body.classList.remove('reviewing'); if (reviewFrom) showResult(reviewFrom); };

  /* ---------- CHẾ ĐỘ GIÁO VIÊN: link "Xem bài" (#xem=...) ---------- */
  function b64urlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '=';
    var bin = atob(str), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }
  function teacherFromLink(b64) {
    mode = 'teacher';
    document.body.classList.add('reviewing', 'teacher');
    $('#btnSubmit').hidden = true; $('#btnClearHl').hidden = true; $('#btnCloseReview').hidden = true;
    $$('.tonly').forEach(function (b) { b.hidden = false; });
    $('#reviewTag').hidden = false; $('#reviewBanner').hidden = false;
    show('examScreen');
    try {
      var d = JSON.parse(b64urlDecode(b64));
      T = d; document.title = 'Bài làm – ' + d.n;
      setTop(d.n, d.c + ' · lần ' + d.no);
      setDisabled(true); writeAnswers(d.a || {}); applyResults(d.a || {}, d.m || {}, d.f || {}, d.y || {}); HL.applyAll(d.h || {});
      navStats(d.a || {}, d.m || {});
      var S = d.sum;
      $('#reviewTag').innerHTML = '<b>' + fmt1(S.score) + '</b>/10 · ' + S.correct + '/' + S.total + ' câu đúng';
      var ch = d.ch || {};
      $('#reviewBanner').innerHTML = '<div class="tb-row"><div><div class="tb-name">' + esc(d.n) + ' <span class="muted">– lần ' + esc(d.no) + '</span> <span class="stbadge ' + (d.st === 'Đã nộp' ? 'done' : '') + '">' + esc(d.st) + '</span></div>' +
        '<div class="muted">' + esc(d.c) + ' · bắt đầu ' + esc(d.t0) + ' · cập nhật ' + esc(d.t) + ' · bấm Kiểm tra ' + totalChecks(ch) + ' lần</div></div></div>' +
        '<div class="tb-parts">' + SECS.filter(function (s) { return !s.study; }).map(function (s) {
          var x = S.secs[s.id];
          return '<span class="chip">' + s.short + (x ? ': <b>' + fmtPts(x.points) + '</b>/' + x.total : ': ' + s.ids.filter(function (id) { return !CORE.isBlank(id, (d.a || {})[id]); }).length + '/' + s.ids.length + ' đã viết') + (ch[s.id] ? ' <span class="muted">· KT ' + ch[s.id] + ' lần</span>' : '') + '</span>';
        }).join('') + '</div>' +
        '<div class="tb-row2"><span class="legend2"><i class="lg ok"></i>Đúng <i class="lg half"></i>Nửa điểm <i class="lg bad"></i>Sai <i class="lg key"></i>Đáp án đúng <i class="lg hl"></i>HS tô sáng</span></div>';
      showView(0);
    } catch (err) {
      $('#reviewTag').textContent = 'Lỗi';
      $('#reviewBanner').innerHTML = '<b>Link "Xem bài" bị thiếu hoặc hỏng.</b> <span class="muted">Trong Google Sheet, chọn menu Từ vựng → Tạo lại link "Xem bài", rồi bấm lại.</span>';
    }
  }
  var wrongPtr = 0;
  $('#btnNextWrong').onclick = function () {
    if (!T) return;
    var list = CORE.SCORED.filter(function (id) { return (T.m || {})[id] !== 1; });
    if (!list.length) { toast('Không có câu sai.'); return; }
    goToItem(list[wrongPtr % list.length]); wrongPtr++;
  };

  /* ---------- khởi động ---------- */
  if (location.hash.indexOf('#xem=') === 0) teacherFromLink(location.hash.slice(5));
  else { refreshStart(); retryPending(); }
  window.addEventListener('pagehide', function () { if (mode === 'doing' && cur) { cur.answers = readAnswers(); saveStore(); } });
})();
