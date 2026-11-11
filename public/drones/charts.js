"use strict";
/* Hand-rolled SVG graphics for the tracker. Each function takes (el, data, opts), writes an SVG
   into el, and wires hover and click. Everything drawn is computed from the data file; the
   annotations are the highest values, not editorial picks. Colours and fonts come from style.css
   through class names, so the graphics follow the page's tokens. */
const Charts = (() => {
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (n) => Number(n).toLocaleString();
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtMonth = (k) => `${MONTHS[+k.slice(5, 7) - 1]} ${k.slice(0, 4)}`;
  const plural = (n, w) => `${fmt(n)} ${w}${n === 1 ? "" : "s"}`;

  /* ---------- tooltip (shared with app.js) ---------- */
  let tipEl = null;
  function showTip(evt, html) {
    tipEl = tipEl || document.getElementById("tooltip");
    tipEl.innerHTML = html;
    tipEl.style.display = "block";
    const pad = 12, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let x = evt.pageX + pad, y = evt.pageY - h - pad;
    if (x + w > window.scrollX + document.documentElement.clientWidth - 8) x = evt.pageX - w - pad;
    if (y < window.scrollY + 4) y = evt.pageY + pad;
    tipEl.style.left = `${x}px`;
    tipEl.style.top = `${y}px`;
  }
  function hideTip() { if (tipEl) tipEl.style.display = "none"; }

  /* ---------- helpers ---------- */
  function niceMax(v) {
    if (v <= 4) return Math.max(v, 1);
    const p = 10 ** Math.floor(Math.log10(v));
    for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
    return v;
  }
  const yTicks = (max) => (max <= 4 ? Array.from({ length: max + 1 }, (_, i) => i) : [0, max / 2, max]);
  const width = (el, min = 320) => Math.max(min, el.clientWidth || 0);
  const open = (W, H, label, cls = "") => `<svg viewBox="0 0 ${W} ${H}" class="${cls}" role="img" aria-label="${esc(label)}">`;
  const f1 = (x) => (Math.round(x * 10) / 10).toString();
  const textW = (s, px = 12) => s.length * px * 0.53;
  // Spread label centres so neighbours sit at least `gap` apart, staying within [lo, hi].
  function spread(ys, gap, lo, hi) {
    const out = ys.slice();
    for (let i = 1; i < out.length; i++) out[i] = Math.max(out[i], out[i - 1] + gap);
    const over = out[out.length - 1] - hi;
    if (over > 0) for (let i = out.length - 1; i >= 0; i--) out[i] = Math.min(out[i], (i === out.length - 1 ? hi : out[i + 1] - gap));
    for (let i = 0; i < out.length; i++) out[i] = Math.max(out[i], lo + i * gap);
    return out;
  }
  function onKey(fn) { return (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } }; }

  /* ---------- 1. lede: monthly columns, trailing three-month mean, two labelled peaks ---------- */
  function ledeChart(el, { keys, values, annotate }, opts = {}) {
    const W = width(el), H = opts.height || 270;
    const m = { t: 34, r: 12, b: 24, l: 34 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b, n = keys.length, step = iw / n;
    const smooth = values.map((_, i) => { const a = values.slice(Math.max(0, i - 2), i + 1); return a.reduce((p, q) => p + q, 0) / a.length; });
    const max = niceMax(Math.max(1, ...values));
    const y = (v) => m.t + ih - (v / max) * ih;
    const xc = (i) => m.l + i * step + step / 2;
    let s = open(W, H, opts.label || "Reported incidents by month");
    for (const t of yTicks(max)) s += `<line class="${t === 0 ? "baseline" : "gridline"}" x1="${m.l}" x2="${W - m.r}" y1="${f1(y(t))}" y2="${f1(y(t))}"/><text class="tick" x="${m.l - 6}" y="${f1(y(t) + 4)}" text-anchor="end">${t}</text>`;
    keys.forEach((k, i) => {
      if (values[i] > 0) s += `<rect class="col" x="${f1(m.l + i * step + 0.5)}" y="${f1(y(values[i]))}" width="${f1(Math.max(1, step - 1))}" height="${f1(m.t + ih - y(values[i]))}"/>`;
      if (k.endsWith("-01")) s += `<text class="tick" x="${f1(m.l + i * step)}" y="${H - 6}">${k.slice(0, 4)}</text>`;
    });
    const line = smooth.map((v, i) => `${i ? "L" : "M"}${f1(xc(i))},${f1(y(v))}`).join("");
    s += `<path class="area" d="${line}L${f1(xc(n - 1))},${m.t + ih}L${f1(xc(0))},${m.t + ih}Z"/><path class="line" d="${line}"/>`;
    // The two highest months, at least six months apart.
    const order = values.map((v, i) => [v, i]).filter(([v]) => v > 0).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    const picks = [];
    for (const [, i] of order) { if (picks.every((j) => Math.abs(i - j) >= 6)) picks.push(i); if (picks.length === 2) break; }
    const placed = [];
    for (const i of picks.sort((a, b) => a - b)) {
      const text = annotate ? annotate(keys[i], values[i]) : `${fmtMonth(keys[i])} · ${values[i]}`;
      const px = xc(i), py = y(values[i]), tw = textW(text);
      let left = px > W / 2;
      if (!left && px + 18 + tw > W - 2) left = true;
      if (left && px - 18 - tw < 2) left = false;
      let ly = Math.max(13, py - 28);
      for (const q of placed) if (Math.abs(q.ly - ly) < 16 && Math.abs(q.px - px) < tw + 40) ly = Math.max(13, q.ly - 16) === q.ly ? q.ly + 16 : q.ly - 16;
      placed.push({ px, ly });
      const lx = left ? px - 14 : px + 14;
      s += `<line class="leader" x1="${f1(px)}" y1="${f1(py - 6)}" x2="${f1(lx)}" y2="${ly + 3}"/><circle class="peak" cx="${f1(px)}" cy="${f1(py)}" r="4"/><text class="anno" x="${f1(lx + (left ? -4 : 4))}" y="${ly}" text-anchor="${left ? "end" : "start"}">${esc(text)}</text>`;
    }
    keys.forEach((k, i) => { s += `<rect class="hit" data-i="${i}" x="${f1(m.l + i * step)}" y="${m.t}" width="${f1(step)}" height="${ih}"/>`; });
    s += "</svg>";
    el.innerHTML = s;
    el.querySelectorAll(".hit").forEach((r) => {
      const i = +r.dataset.i;
      r.addEventListener("mousemove", (e) => showTip(e, `${fmtMonth(keys[i])}: <b>${plural(values[i], "report")}</b><br><span class="dim">three-month mean ${smooth[i].toFixed(1)}</span>`));
      r.addEventListener("mouseleave", hideTip);
    });
  }

  /* ---------- small area sparkline ---------- */
  function sparkline(el, { keys, values, partialLast }, opts = {}) {
    const W = 260, H = 72, m = { t: 16, r: 4, b: 16, l: 4 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b, n = keys.length, step = iw / Math.max(1, n - 1);
    const peak = Math.max(...values, 0), max = Math.max(1, peak);
    const y = (v) => m.t + ih - (v / max) * ih, x = (i) => m.l + i * step;
    const line = values.map((v, i) => `${i ? "L" : "M"}${f1(x(i))},${f1(y(v))}`).join("");
    let s = open(W, H, opts.label || "", "spark");
    s += `<line class="baseline" x1="${m.l}" x2="${W - m.r}" y1="${m.t + ih}" y2="${m.t + ih}"/>`;
    s += `<path class="area" d="${line}L${f1(x(n - 1))},${m.t + ih}L${f1(x(0))},${m.t + ih}Z"/><path class="line" d="${line}"/>`;
    if (partialLast && n > 1) s += `<circle class="partial" cx="${f1(x(n - 1))}" cy="${f1(y(values[n - 1]))}" r="3"/>`;
    s += `<text class="tick" x="${m.l}" y="${H - 4}">${esc(opts.firstLabel || keys[0])}</text><text class="tick" x="${W - m.r}" y="${H - 4}" text-anchor="end">${esc(opts.lastLabel || keys[n - 1])}</text>`;
    s += `<text class="tick" x="${W - m.r}" y="11" text-anchor="end">peak ${peak}</text>`;
    keys.forEach((k, i) => { s += `<rect class="hit" data-i="${i}" x="${f1(x(i) - step / 2)}" y="${m.t}" width="${f1(step)}" height="${ih}"/>`; });
    s += "</svg>";
    el.innerHTML = s;
    el.querySelectorAll(".hit").forEach((r) => {
      const i = +r.dataset.i;
      r.addEventListener("mousemove", (e) => showTip(e, opts.tip ? opts.tip(keys[i], values[i]) : `${esc(keys[i])}: <b>${values[i]}</b>`));
      r.addEventListener("mouseleave", hideTip);
    });
  }

  /* ---------- 2. bump chart: rank per year ---------- */
  function bumpChart(el, { years, series, highlight, lead }, opts = {}) {
    const n = series.length, W = width(el, 600), rowH = 26;
    const m = { t: 16, r: 250, b: 28, l: 16 };
    const H = m.t + Math.max(0, n - 1) * rowH + m.b + 8;
    const iw = W - m.l - m.r, cw = iw / Math.max(1, years.length - 1);
    const x = (i) => m.l + i * cw, y = (rank) => m.t + (rank - 1) * rowH;
    let s = open(W, H, opts.label || "Category rank by year");
    years.forEach((yr, i) => { s += `<text class="tick" x="${f1(x(i))}" y="${H - 8}" text-anchor="middle">${yr}</text>`; });
    const order = [...series].sort((a, b) => (a.key === lead) - (b.key === lead) || (a.key === highlight) - (b.key === highlight));
    for (const sr of order) {
      const cls = sr.key === highlight ? "hi" : sr.key === lead ? "lead" : "";
      const d = sr.ranks.map((r, i) => `${i ? "L" : "M"}${f1(x(i))},${y(r)}`).join("");
      const last = sr.ranks[sr.ranks.length - 1], lastCount = sr.counts[sr.counts.length - 1];
      s += `<g class="bump ${cls}" data-key="${esc(sr.key)}" tabindex="0" role="button" aria-label="${esc(sr.label)}, rank ${last} in ${years[years.length - 1]}">`;
      s += `<path class="hit-line" d="${d}"/><path class="bump-line" d="${d}"/>`;
      sr.ranks.forEach((r, i) => { s += `<circle class="dot" cx="${f1(x(i))}" cy="${y(r)}" r="4"/>`; });
      s += `<text class="blabel" x="${f1(x(years.length - 1) + 12)}" y="${y(last) + 4}">${esc(sr.label)} <tspan class="bcount">${fmt(lastCount)}</tspan></text></g>`;
    }
    s += "</svg>";
    el.innerHTML = s;
    const svg = el.querySelector("svg");
    const byKey = Object.fromEntries(series.map((q) => [q.key, q]));
    const nearest = (e) => {
      const b = svg.getBoundingClientRect();
      const px = (e.clientX - b.left) * (W / b.width);
      return Math.max(0, Math.min(years.length - 1, Math.round((px - m.l) / cw)));
    };
    // One hovered line at a time, tracked here rather than per element: the hovered group is
    // moved to the front of the drawing, and a moved element does not get a mouseleave event.
    let cur = null;
    const setHover = (g) => {
      if (g === cur) return;
      if (cur) cur.classList.remove("hover");
      cur = g;
      if (g) { g.classList.add("hover"); svg.appendChild(g); }
    };
    svg.addEventListener("mousemove", (e) => {
      const g = e.target.closest ? e.target.closest("g.bump") : null;
      setHover(g);
      if (!g) { hideTip(); return; }
      const sr = byKey[g.dataset.key], i = nearest(e);
      showTip(e, `<b>${esc(sr.label)}</b>, ${years[i]}: rank ${sr.ranks[i]} of ${n}<br><span class="dim">${plural(sr.counts[i], "incident")}</span>`);
    });
    svg.addEventListener("mouseleave", () => { setHover(null); hideTip(); });
    if (opts.onClick) el.querySelectorAll("g.bump").forEach((g) => {
      g.addEventListener("click", () => opts.onClick(g.dataset.key));
      g.addEventListener("keydown", onKey(() => opts.onClick(g.dataset.key)));
    });
  }

  /* ---------- 3. flow: category (left) to legal stage (right) ---------- */
  function flowChart(el, { left, right, links }, opts = {}) {
    const W = width(el, 600), H = opts.height || 400;
    const m = { t: 8, b: 8 }, gap = 10, NW = 10, LX = 232, RX = W - 236;
    const lt = left.reduce((p, q) => p + q.count, 0) || 1, rt = right.reduce((p, q) => p + q.count, 0) || 1;
    const scale = Math.min((H - m.t - m.b - gap * (left.length - 1)) / lt, (H - m.t - m.b - gap * (right.length - 1)) / rt);
    let yy = m.t; const ly = left.map((nd) => { const v = yy; yy += nd.count * scale + gap; return v; });
    yy = m.t; const ry = right.map((nd) => { const v = yy; yy += nd.count * scale + gap; return v; });
    const li = Object.fromEntries(left.map((nd, i) => [nd.key, i])), ri = Object.fromEntries(right.map((nd, i) => [nd.key, i]));
    const ls = links.filter((l) => l.count > 0 && l.s in li && l.t in ri).sort((a, b) => li[a.s] - li[b.s] || ri[a.t] - ri[b.t]);
    const lo = ly.slice(), ro = ry.slice(), roff = new Map();
    [...ls].sort((a, b) => ri[a.t] - ri[b.t] || li[a.s] - li[b.s]).forEach((l) => { roff.set(l, ro[ri[l.t]]); ro[ri[l.t]] += l.count * scale; });
    const mx = (LX + NW + RX) / 2;
    let s = open(W, H, opts.label || "Flow from category to legal stage");
    ls.forEach((l, idx) => {
      const h = l.count * scale, y0 = lo[li[l.s]], y1 = roff.get(l);
      lo[li[l.s]] += h;
      const em = opts.emphasis && opts.emphasis(l.t);
      const pk = opts.pick ? (l.s === opts.pick ? " pick" : " dim") : "";
      s += `<path class="ribbon${em ? " em" : ""}${pk}" data-i="${idx}" d="M${LX + NW},${f1(y0)} C${f1(mx)},${f1(y0)} ${f1(mx)},${f1(y1)} ${RX},${f1(y1)} v${f1(h)} C${f1(mx)},${f1(y1 + h)} ${f1(mx)},${f1(y0 + h)} ${LX + NW},${f1(y0 + h)} Z"/>`;
    });
    const lLab = spread(left.map((nd, i) => ly[i] + nd.count * scale / 2), 14, m.t + 6, H - m.b - 6);
    const rLab = spread(right.map((nd, i) => ry[i] + nd.count * scale / 2), 14, m.t + 6, H - m.b - 6);
    left.forEach((nd, i) => {
      const h = Math.max(1, nd.count * scale);
      s += `<g class="node left${opts.pick === nd.key ? " pick" : ""}" data-key="${esc(nd.key)}" role="button" tabindex="0" aria-label="Isolate ${esc(nd.label)}"><rect x="${LX}" y="${f1(ly[i])}" width="${NW}" height="${f1(h)}"/><text x="${LX - 8}" y="${f1(lLab[i] + 4)}" text-anchor="end">${esc(nd.label)} <tspan class="pct">${fmt(nd.count)}</tspan></text></g>`;
    });
    right.forEach((nd, i) => {
      const h = Math.max(1, nd.count * scale), em = opts.emphasis && opts.emphasis(nd.key);
      s += `<g class="node right${em ? " em" : ""}"><rect x="${RX}" y="${f1(ry[i])}" width="${NW}" height="${f1(h)}"/><text x="${RX + NW + 8}" y="${f1(rLab[i] + 4)}">${esc(nd.label)} <tspan class="pct">${nd.count && Math.round(100 * nd.count / rt) === 0 ? "<1" : Math.round(100 * nd.count / rt)}%</tspan></text></g>`;
    });
    s += "</svg>";
    el.innerHTML = s;
    el.querySelectorAll(".ribbon").forEach((p) => {
      const l = ls[+p.dataset.i], src = left[li[l.s]], tgt = right[ri[l.t]];
      p.addEventListener("mousemove", (e) => { p.classList.add("hover"); showTip(e, `${esc(src.label)} → ${esc(tgt.label)}: <b>${plural(l.count, "incident")}</b><br><span class="dim">${Math.round(100 * l.count / src.count)}% of ${esc(src.label.toLowerCase())}</span>`); });
      p.addEventListener("mouseleave", () => { p.classList.remove("hover"); hideTip(); });
    });
    if (opts.onClick) el.querySelectorAll(".node.left").forEach((g) => {
      g.addEventListener("click", () => opts.onClick(g.dataset.key));
      g.addEventListener("keydown", onKey(() => opts.onClick(g.dataset.key)));
    });
  }

  /* ---------- 5. coverage timeline: one dot per incident, swarmed around a time axis ---------- */
  // Centred beeswarm: each circle takes the spot nearest the axis, above or below, that clears
  // every earlier circle within reach. Circles arrive sorted by x, so only a sliding window of
  // earlier circles can touch the new one. Returns the half-height of the swarm.
  function swarm(pts, pad) {
    const maxR = Math.max(0, ...pts.map((c) => c.r));
    let head = null, tail = null;
    const intersects = (cx, cy, r) => { let a = head; while (a) { const dr = r + a.r + pad; if (dr * dr - 1e-3 > (a.x - cx) ** 2 + (a.y - cy) ** 2) return true; a = a.next; } return false; };
    for (const b of pts) {
      while (head && head.x < b.x - (b.r + maxR + pad)) head = head.next;
      b.y = 0;
      if (intersects(b.x, 0, b.r)) {
        let a = head, best = Infinity;
        do {
          const dx = b.x - a.x, dr = a.r + b.r + pad, dy = Math.sqrt(Math.max(0, dr * dr - dx * dx));
          for (const yy of [a.y + dy, a.y - dy]) if (Math.abs(yy) < Math.abs(best) && !intersects(b.x, yy, b.r)) best = yy;
          a = a.next;
        } while (a);
        b.y = best;
      }
      b.next = null;
      if (!head) head = tail = b; else tail = tail.next = b;
    }
    return Math.max(0, ...pts.map((c) => Math.abs(c.y) + c.r));
  }
  function coverageChart(el, { points, t0, t1 }, opts = {}) {
    const W = width(el), m = { l: 10, r: 10, t: 62, b: 30 }, iw = W - m.l - m.r, pad = 0.7;
    const x = (t) => m.l + ((t - t0) / (t1 - t0)) * iw;
    const pts = points.map((p) => ({ x: x(p.t), r0: p.r, r: p.r, p })).sort((a, b) => a.x - b.x);
    // Shrink all dots together until the swarm fits the band; sizes stay proportional.
    let k = 1, half = 0;
    for (let it = 0; it < 8; it++) {
      pts.forEach((c) => { c.r = c.r0 * k; c.next = null; });
      half = swarm(pts, pad);
      if (half * 2 <= (opts.maxBand || 420)) break;
      k *= 0.88;
    }
    const H = Math.ceil(m.t + 2 * half + m.b), mid = m.t + half, base = m.t + 2 * half + 10;
    const sy = (c) => mid - c.y;
    let s = open(W, H, opts.label || "Incidents by date, sized by number of reports");
    s += `<line class="baseline" x1="${m.l}" x2="${W - m.r}" y1="${f1(base)}" y2="${f1(base)}"/>`;
    for (let yr = new Date(t0).getUTCFullYear(); yr <= new Date(t1).getUTCFullYear(); yr++) {
      const t = Date.UTC(yr, 0, 1);
      if (t >= t0 && t <= t1) s += `<line class="gridline" x1="${f1(x(t))}" x2="${f1(x(t))}" y1="${f1(base - 4)}" y2="${f1(base + 4)}"/><text class="tick" x="${f1(x(t) + 4)}" y="${H - 8}">${yr}</text>`;
    }
    const top = [...pts].sort((a, b) => b.r - a.r || b.x - a.x).slice(0, opts.labelCount ?? 3);
    const topSet = new Set(top);
    pts.forEach((c, i) => {
      s += `<circle class="dot${topSet.has(c) ? " top" : ""}" data-i="${i}" cx="${f1(c.x)}" cy="${f1(sy(c))}" r="${f1(c.r)}"/>`;
      if (c.r < 4.5) s += `<circle class="hit-dot" data-i="${i}" cx="${f1(c.x)}" cy="${f1(sy(c))}" r="5"/>`;
    });
    top.sort((a, b) => a.x - b.x).forEach((c, kk) => {
      const text = opts.labelFor ? opts.labelFor(c.p) : "";
      const tw = textW(text);
      const lx = Math.max(m.l, Math.min(W - m.r - tw, c.x - tw / 2));
      const ly = 14 + kk * 17;
      s += `<line class="leader" x1="${f1(c.x)}" y1="${f1(sy(c) - c.r - 1)}" x2="${f1(Math.max(lx + 4, Math.min(lx + tw - 4, c.x)))}" y2="${ly + 4}"/><text class="anno" x="${f1(lx)}" y="${ly}">${esc(text)}</text>`;
    });
    s += "</svg>";
    el.innerHTML = s;
    el.querySelectorAll(".dot, .hit-dot").forEach((d) => {
      const c = pts[+d.dataset.i];
      d.addEventListener("mousemove", (e) => showTip(e, opts.tip ? opts.tip(c.p) : ""));
      d.addEventListener("mouseleave", hideTip);
      if (opts.onClick) d.addEventListener("click", () => opts.onClick(c.p));
    });
    return { n: pts.length, scale: k };
  }

  return { showTip, hideTip, niceMax, ledeChart, sparkline, bumpChart, flowChart, coverageChart, fmtMonth };
})();
