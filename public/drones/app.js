"use strict";

const CATEGORY_LABELS = {
  correctional_contraband: "Prison contraband",
  drug_border_smuggling: "Drug / border smuggling",
  surveillance_stalking_voyeurism: "Surveillance, stalking, voyeurism",
  harassment_intimidation: "Harassment / intimidation",
  weaponized_attack_or_plot: "Weaponized attack or plot",
  aviation_disruption: "Airport / aircraft disruption",
  emergency_response_interference: "Emergency-response interference",
  critical_infrastructure: "Critical infrastructure",
  mass_gathering: "Mass gathering / event",
  criminal_counter_surveillance: "Counter-surveillance of police",
  burglary_theft_recon: "Burglary / theft reconnaissance",
  other: "Other",
};
const CD_LABELS = {
  none_reported: "None reported", detected_by_system: "Detected by system", jammed_or_spoofed: "Jammed / spoofed",
  cyber_takeover: "Cyber takeover", netted_or_captured: "Netted / captured", shot_down_or_kinetic: "Shot down / kinetic",
  drone_recovered_after_crash_or_landing: "Recovered after crash/landing", drone_seized: "Drone seized",
  operator_located: "Operator located", operator_arrested: "Operator arrested",
  airspace_closed_or_operations_halted: "Airspace closed / ops halted", other: "Other",
};
const LEGAL_LABELS = {
  none_reported: "None reported", under_investigation: "Under investigation", arrest: "Arrest", charged: "Charged",
  convicted_or_plea: "Convicted / plea", sentenced: "Sentenced", acquitted_or_dismissed: "Acquitted / dismissed",
};
const LEGAL_ORDER = Object.keys(LEGAL_LABELS);
const START_YEAR = 2020;
const PAGE = 50;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtPct = (x) => (Number.isFinite(x) ? `${Math.round(x * 100)}%` : "–");
const monthKey = (d) => (d && d.length >= 7 ? d.slice(0, 7) : null);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtMonth = (k) => `${MONTHS[+k.slice(5, 7) - 1]} ${k.slice(0, 4)}`;

let ALL = [];
let META = {};
let filtered = [];
let exceptCategory = [];  // all filters applied except category (for the per-category panels)
let sortKey = "event_date", sortDir = -1, page = 0;
let map, markerLayer;

function place(i) {
  return [i.facility_or_site, i.locality, i.admin1, i.country].filter(Boolean).join(", ");
}
function hasCounter(i) {
  return (i.counter_drone_response || []).some((x) => x !== "none_reported");
}

/* ---------- filters ---------- */
function readFilters() {
  return {
    category: $("f-category").value, country: $("f-country").value, from: $("f-from").value,
    to: $("f-to").value, intent: $("f-intent").value, cd: $("f-cd").value, legal: $("f-legal").value,
    conflict: $("f-conflict").value,
    q: $("f-q").value.trim().toLowerCase(),
  };
}
// Primary category only, so filter results match the per-category panel counts.
function inCategory(i, cat) {
  return i.category === cat;
}
function applyFilters() {
  const f = readFilters();
  exceptCategory = ALL.filter((i) => matches(i, f));
  filtered = f.category ? exceptCategory.filter((i) => inCategory(i, f.category)) : exceptCategory;
  page = 0;
  writeHash(f);
  render();
}
function writeHash(f) {
  const p = new URLSearchParams(Object.entries(f).filter(([, v]) => v));
  history.replaceState(null, "", p.toString() ? `#${p}` : location.pathname);
}
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  for (const [k, v] of p) {
    const el = $(`f-${k}`);
    if (el) el.value = v;
  }
}
function fillSelect(id, entries) {
  const sel = $(id);
  for (const [v, label] of entries) {
    const o = document.createElement("option");
    o.value = v; o.textContent = label;
    sel.appendChild(o);
  }
}
function setupFilters() {
  const catCounts = {};
  ALL.forEach((i) => (catCounts[i.category] = (catCounts[i.category] || 0) + 1));
  fillSelect("f-category", Object.keys(CATEGORY_LABELS).map((k) => [k, `${CATEGORY_LABELS[k]} (${catCounts[k] || 0})`]));
  const countries = [...new Set(ALL.map((i) => i.country).filter(Boolean))].sort();
  fillSelect("f-country", countries.map((c) => [c, c]));
  const thisYear = new Date().getFullYear();
  const years = [];
  for (let y = START_YEAR; y <= thisYear; y++) years.push(String(y));
  fillSelect("f-from", [["", "Any"], ...years.map((y) => [y, y])]);
  fillSelect("f-to", [["", "Any"], ...years.map((y) => [y, y])]);
  fillSelect("f-cd", Object.entries(CD_LABELS).filter(([k]) => k !== "none_reported"));
  fillSelect("f-legal", Object.entries(LEGAL_LABELS));
  readHash();
  document.querySelectorAll(".filters select").forEach((s) => s.addEventListener("change", applyFilters));
  let t;
  $("f-q").addEventListener("input", () => { clearTimeout(t); t = setTimeout(applyFilters, 200); });
  $("f-reset").addEventListener("click", () => {
    document.querySelectorAll(".filters select, .filters input").forEach((e) => (e.value = ""));
    applyFilters();
  });
}

/* ---------- tiles ---------- */
function renderTiles() {
  const n = filtered.length;
  $("t-n").textContent = n.toLocaleString();
  $("t-n-note").textContent = n === ALL.length ? "all records" : `of ${ALL.length.toLocaleString()} total`;
  $("t-countries").textContent = new Set(filtered.map((i) => i.country).filter(Boolean)).size;
  $("t-cd").textContent = n ? fmtPct(filtered.filter(hasCounter).length / n) : "–";
  const arrestIdx = LEGAL_ORDER.indexOf("arrest");
  $("t-legal").textContent = n ? fmtPct(filtered.filter((i) => LEGAL_ORDER.indexOf(i.legal_stage) >= arrestIdx).length / n) : "–";
}

/* ---------- bar chart (single series, SVG) ---------- */
const tip = $("tooltip");
function showTip(evt, html) {
  tip.innerHTML = html;
  tip.style.display = "block";
  const pad = 12, w = tip.offsetWidth, h = tip.offsetHeight;
  let x = evt.pageX + pad, y = evt.pageY - h - pad;
  if (x + w > window.scrollX + document.documentElement.clientWidth - 8) x = evt.pageX - w - pad;
  if (y < window.scrollY + 4) y = evt.pageY + pad;
  tip.style.left = `${x}px`; tip.style.top = `${y}px`;
}
function hideTip() { tip.style.display = "none"; }

function niceMax(v) {
  if (v <= 4) return Math.max(v, 1);
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
  return v;
}

function barChart(el, keys, values, opts) {
  const W = opts.width, H = opts.height;
  const m = { t: 8, r: 6, b: opts.xLabelEvery ? 22 : 18, l: 30 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const max = niceMax(Math.max(0, ...values));
  const ticks = max <= 4 ? Array.from({ length: max + 1 }, (_, i) => i) : [0, max / 2, max];
  const step = iw / keys.length, gap = keys.length > 40 ? 1 : 2, bw = Math.max(1, step - gap);
  const y = (v) => m.t + ih - (v / max) * ih;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label)}">`;
  for (const t of ticks) {
    s += `<line class="${t === 0 ? "baseline" : "gridline"}" x1="${m.l}" x2="${W - m.r}" y1="${y(t)}" y2="${y(t)}"/>`;
    s += `<text class="tick" x="${m.l - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`;
  }
  keys.forEach((k, i) => {
    const v = values[i], x = m.l + i * step + gap / 2, top = y(v), hgt = m.t + ih - top;
    if (v > 0) {
      const r = Math.min(4, bw / 2, hgt);
      // rounded top, square baseline
      s += `<path class="bar" data-i="${i}" d="M${x},${m.t + ih} V${top + r} Q${x},${top} ${x + r},${top} H${x + bw - r} Q${x + bw},${top} ${x + bw},${top + r} V${m.t + ih} Z"/>`;
    }
    s += `<rect class="hit" data-i="${i}" x="${m.l + i * step}" y="${m.t}" width="${step}" height="${ih}"/>`;
    const lab = opts.xLabel(k, i);
    if (lab) s += `<text class="tick" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${esc(lab)}</text>`;
  });
  s += "</svg>";
  el.innerHTML = s;
  el.querySelectorAll(".hit").forEach((r) => {
    const i = +r.dataset.i;
    const bar = el.querySelector(`.bar[data-i="${i}"]`);
    r.addEventListener("mousemove", (e) => { bar?.classList.add("hover"); showTip(e, opts.tip(keys[i], values[i])); });
    r.addEventListener("mouseleave", () => { bar?.classList.remove("hover"); hideTip(); });
    if (opts.onClick) r.addEventListener("click", () => opts.onClick(keys[i]));
  });
}

function monthRange() {
  const now = new Date();
  const out = [];
  for (let y = START_YEAR; y <= now.getFullYear(); y++)
    for (let mo = 1; mo <= 12; mo++) {
      if (y === now.getFullYear() && mo > now.getMonth() + 1) break;
      out.push(`${y}-${String(mo).padStart(2, "0")}`);
    }
  return out;
}

function renderTrend() {
  const keys = monthRange();
  const counts = Object.fromEntries(keys.map((k) => [k, 0]));
  let yearOnly = 0, before = 0;
  for (const i of filtered) {
    const k = monthKey(i.event_date);
    if (k && k in counts) counts[k]++;
    else if (k && k < keys[0]) before++;
    else yearOnly++;   // year-level or missing date
  }
  const el = $("chart-month");
  const W = Math.max(320, el.clientWidth);
  barChart(el, keys, keys.map((k) => counts[k]), {
    width: W, height: 220, label: "Incidents by month",
    xLabel: (k) => (k.endsWith("-01") ? k.slice(0, 4) : ""), xLabelEvery: true,
    tip: (k, v) => `${fmtMonth(k)}: <b>${v}</b> incident${v === 1 ? "" : "s"}`,
  });
  const notes = [];
  if (yearOnly) notes.push(`${yearOnly} with only a year-level date (or none)`);
  if (before) notes.push(`${before} that occurred before 2020 but were reported later`);
  if (notes.length) el.insertAdjacentHTML("beforeend", `<p class="desc" style="margin:6px 0 0">Not shown in this chart: ${notes.join("; ")}.</p>`);
}

function renderMultiples() {
  const thisYear = new Date().getFullYear();
  const years = [];
  for (let y = START_YEAR; y <= thisYear; y++) years.push(String(y));
  // Panels ignore the category filter so every category stays visible; other filters apply.
  const f = readFilters();
  const base = exceptCategory;
  const box = $("multiples");
  box.innerHTML = "";
  const totals = Object.keys(CATEGORY_LABELS).map((c) => [c, base.filter((i) => i.category === c).length]);
  totals.sort((a, b) => (a[0] === "other") - (b[0] === "other") || b[1] - a[1]);
  for (const [cat, n] of totals) {
    const div = document.createElement("div");
    div.className = `multiple${f.category === cat ? " active" : ""}`;
    div.innerHTML = `<button class="pick" type="button" aria-label="Filter to ${esc(CATEGORY_LABELS[cat])}"><h3>${esc(CATEGORY_LABELS[cat])}</h3><div class="n">${n.toLocaleString()} incident${n === 1 ? "" : "s"}</div><div class="chart"></div></button>`;
    box.appendChild(div);
    const counts = years.map((y) => base.filter((i) => i.category === cat && i.year === y).length);
    barChart(div.querySelector(".chart"), years, counts, {
      width: 320, height: 110, label: `${CATEGORY_LABELS[cat]} by year`,
      xLabel: (k, i) => (i === 0 || i === years.length - 1 ? k : ""),
      tip: (k, v) => `${esc(CATEGORY_LABELS[cat])}, ${k}: <b>${v}</b>`,
    });
    div.querySelector("button").addEventListener("click", () => {
      $("f-category").value = f.category === cat ? "" : cat;
      applyFilters();
    });
  }
}
function matches(i, f) {
  if (f.country === "__US" && i.country !== "United States") return false;
  if (f.country === "__nonUS" && i.country === "United States") return false;
  if (f.country && !f.country.startsWith("__") && i.country !== f.country) return false;
  const y = i.year || "";
  if (f.from && y < f.from) return false;
  if (f.to && y > f.to) return false;
  if (f.intent && i.intent !== f.intent) return false;
  if (f.cd === "__any" && !hasCounter(i)) return false;
  if (f.cd && f.cd !== "__any" && !(i.counter_drone_response || []).includes(f.cd)) return false;
  if (f.legal && i.legal_stage !== f.legal) return false;
  if (f.conflict === "exclude" && i.conflict_linked) return false;
  if (f.conflict === "only" && !i.conflict_linked) return false;
  if (f.q) {
    const hay = `${place(i)} ${i.summary} ${i.actor_description} ${i.counter_drone_technology}`.toLowerCase();
    if (!hay.includes(f.q)) return false;
  }
  return true;
}

/* ---------- map ---------- */
function setupMap() {
  map = L.map("map", { worldCopyJump: true, scrollWheelZoom: false }).setView([25, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12, attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
}
function renderMap() {
  markerLayer.clearLayers();
  const color = getComputedStyle(document.documentElement).getPropertyValue("--series").trim();
  const ring = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim();
  for (const i of filtered) {
    if (i.lat == null || i.lon == null) continue;
    const approx = i.geo_precision !== "locality";
    L.circleMarker([i.lat, i.lon], {
      radius: 5, color: ring, weight: 2, fillColor: color, fillOpacity: approx ? 0.45 : 0.9,
    }).bindPopup(
      `<h4>${esc(CATEGORY_LABELS[i.category] || i.category)} · ${esc(i.event_date || "")}</h4>` +
      `<div>${esc(place(i))}${approx ? ` <em>(placed at ${esc(i.geo_precision)} level)</em>` : ""}</div>` +
      `<p style="margin:6px 0">${esc(i.summary)}</p>` +
      sourcesHtml(i)
    ).addTo(markerLayer);
  }
}
function sourcesHtml(i) {
  return (i.sources || []).slice(0, 5).map((s) =>
    `<div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.outlet || "source")}</a> <span style="color:var(--muted)">${esc(s.pub_date || "")}</span></div>`
  ).join("") + ((i.sources || []).length > 5 ? `<div>+${i.sources.length - 5} more</div>` : "");
}

/* ---------- table ---------- */
function sortVal(i, k) {
  if (k === "place") return place(i);
  if (k === "counter") return (i.counter_drone_response || []).join(",");
  if (k === "legal_stage") return LEGAL_ORDER.indexOf(i.legal_stage);
  return i[k] ?? "";
}
function renderTable() {
  const rows = [...filtered].sort((a, b) => {
    const x = sortVal(a, sortKey), y = sortVal(b, sortKey);
    return (x > y ? 1 : x < y ? -1 : 0) * sortDir;
  });
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  page = Math.min(page, pages - 1);
  const slice = rows.slice(page * PAGE, page * PAGE + PAGE);
  $("tbl").querySelector("tbody").innerHTML = slice.map((i) => `<tr>
    <td class="date">${esc(i.event_date || "")}</td>
    <td>${esc(place(i))}</td>
    <td>${esc(CATEGORY_LABELS[i.category] || i.category)}</td>
    <td>${esc(i.summary)}${i.conflict_linked ? ` <span class="status" title="${esc(i.conflict_link_basis)}">[suspected state/war link]</span>` : ""}${i.review_status === "auto" ? "" : ` <span class="status">[${esc(i.review_status)}]</span>`}</td>
    <td>${(i.counter_drone_response || []).map((c) => `<span class="chip">${esc(CD_LABELS[c] || c)}</span>`).join("")}</td>
    <td>${esc(LEGAL_LABELS[i.legal_stage] || i.legal_stage || "")}</td>
    <td>${sourcesHtml(i)}</td>
  </tr>`).join("");
  $("table-count").textContent = `${rows.length.toLocaleString()} incident${rows.length === 1 ? "" : "s"}`;
  $("pg-info").textContent = `Page ${page + 1} of ${pages}`;
  $("pg-prev").disabled = page === 0;
  $("pg-next").disabled = page >= pages - 1;
  document.querySelectorAll("#tbl th").forEach((th) =>
    th.setAttribute("aria-sort", th.dataset.k === sortKey ? (sortDir > 0 ? "ascending" : "descending") : "none"));
}
function setupTable() {
  document.querySelectorAll("#tbl th").forEach((th) => th.addEventListener("click", () => {
    const k = th.dataset.k;
    sortDir = k === sortKey ? -sortDir : (k === "event_date" || k === "n_sources" ? -1 : 1);
    sortKey = k;
    renderTable();
  }));
  $("pg-prev").addEventListener("click", () => { page--; renderTable(); });
  $("pg-next").addEventListener("click", () => { page++; renderTable(); });
  $("dl-filtered").addEventListener("click", (e) => { e.preventDefault(); downloadCsv(filtered); });
}

const CSV_COLS = ["id", "event_date", "date_precision", "country", "admin1", "locality", "facility_or_site", "lat", "lon",
  "geo_precision", "category", "secondary_categories", "intent", "actor_type", "target_type", "payload", "drone_count",
  "deaths", "injuries", "operational_disruption", "detection_method", "counter_drone_response", "counter_drone_technology",
  "legal_stage", "charges_or_statutes", "sentence", "conflict_linked", "conflict_link_basis", "summary", "confidence",
  "review_status", "n_sources", "source_urls"];
function downloadCsv(rows) {
  const cell = (v) => {
    const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [CSV_COLS.join(",")].concat(rows.map((i) => CSV_COLS.map((c) =>
    cell(c === "source_urls" ? (i.sources || []).map((s) => s.url).join(" | ") : i[c])).join(",")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `drone_incidents_filtered_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- main ---------- */
function render() {
  renderTiles();
  renderTrend();
  renderMultiples();
  renderMap();
  renderTable();
}

async function init() {
  try {
    const res = await fetch("data/incidents.json", { cache: "no-cache" });
    const data = await res.json();
    ALL = data.incidents || [];
    META = data.meta || {};
  } catch (e) {
    $("meta").textContent = "Could not load data/incidents.json";
    return;
  }
  const upd = META.generated_at ? new Date(META.generated_at).toISOString().slice(0, 10) : "?";
  $("meta").textContent = `${ALL.length.toLocaleString()} incidents · updated ${upd}`;
  setupFilters();
  setupMap();
  setupTable();
  applyFilters();
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(renderTrend, 150); });
}
init();
