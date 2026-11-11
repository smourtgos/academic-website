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
const INTENT_LABELS = { malicious: "Malicious", reckless: "Reckless", unknown: "Unknown" };
const LEGAL_ORDER = Object.keys(LEGAL_LABELS);
const START_YEAR = 2020;
const PAGE = 50;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtPct = (x) => (Number.isFinite(x) ? `${Math.round(x * 100)}%` : "–");
const monthKey = (d) => (d && d.length >= 7 ? d.slice(0, 7) : null);
const quarterKey = (d) => (d && d.length >= 7 ? `${d.slice(0, 4)}Q${Math.floor((+d.slice(5, 7) - 1) / 3) + 1}` : null);
const { showTip, hideTip, fmtMonth } = Charts;
const plural = (n, w) => `${n.toLocaleString()} ${w}${n === 1 ? "" : "s"}`;
const trunc = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1)}…` : s || "");

let ALL = [];
let META = {};
let BY_ID = new Map();
let filtered = [];
let exceptCategory = [];  // all filters applied except category (for the category graphics)
let sortKey = "event_date", sortDir = -1, page = 0;
let map, markerLayer, placeMarkers = [];

function place(i) {
  return [i.facility_or_site, i.locality, i.admin1, i.country].filter(Boolean).join(", ");
}
const shortPlace = (i) => i.locality || i.admin1 || i.country || "Place not stated";
function hasCounter(i) {
  return (i.counter_drone_response || []).some((x) => x !== "none_reported");
}
function nSources(i) {
  return Math.max(1, i.n_sources || (i.sources || []).length || 1);
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
function applyFilters() {
  const f = readFilters();
  exceptCategory = ALL.filter((i) => matches(i, f));
  filtered = f.category ? exceptCategory.filter((i) => i.category === f.category) : exceptCategory;
  page = 0;
  writeHash(f);
  render();
}
function setCategory(cat) {
  $("f-category").value = $("f-category").value === cat ? "" : cat;
  applyFilters();
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
function yearsList() {
  const out = [];
  for (let y = START_YEAR; y <= new Date().getFullYear(); y++) out.push(String(y));
  return out;
}
function setupFilters() {
  const catCounts = {};
  ALL.forEach((i) => (catCounts[i.category] = (catCounts[i.category] || 0) + 1));
  fillSelect("f-category", Object.keys(CATEGORY_LABELS).map((k) => [k, `${CATEGORY_LABELS[k]} (${catCounts[k] || 0})`]));
  const countries = [...new Set(ALL.map((i) => i.country).filter(Boolean))].sort();
  fillSelect("f-country", countries.map((c) => [c, c]));
  const years = yearsList();
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

/* ---------- headline band ---------- */
function renderTiles() {
  const n = filtered.length;
  $("t-n").textContent = n.toLocaleString();
  $("t-n-note").textContent = n === ALL.length ? "all records" : `of ${ALL.length.toLocaleString()} in the dataset, under the current filters`;
  $("t-countries").textContent = new Set(filtered.map((i) => i.country).filter(Boolean)).size;
  $("t-cd").textContent = n ? fmtPct(filtered.filter(hasCounter).length / n) : "–";
  const arrestIdx = LEGAL_ORDER.indexOf("arrest");
  $("t-legal").textContent = n ? fmtPct(filtered.filter((i) => LEGAL_ORDER.indexOf(i.legal_stage) >= arrestIdx).length / n) : "–";
}

/* ---------- 1. lede ---------- */
function monthRange() {
  const now = new Date(), out = [];
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
  const cats = Object.fromEntries(keys.map((k) => [k, {}]));
  let yearOnly = 0, before = 0;
  for (const i of filtered) {
    const k = monthKey(i.event_date);
    if (k && k in counts) { counts[k]++; cats[k][i.category] = (cats[k][i.category] || 0) + 1; }
    else if (k && k < keys[0]) before++;
    else yearOnly++;   // year-level or missing date
  }
  const el = $("chart-month");
  Charts.ledeChart(el, {
    keys, values: keys.map((k) => counts[k]),
    annotate: (k, n) => {
      const top = Object.entries(cats[k]).sort((a, b) => b[1] - a[1])[0];
      const what = top ? `, led by ${(CATEGORY_LABELS[top[0]] || top[0]).toLowerCase()} (${top[1]})` : "";
      return `${fmtMonth(k)} · ${plural(n, "report")}${what}`;
    },
  }, { label: "Reported incidents by month, with a trailing three-month mean and the two highest months labelled" });
  const notes = [];
  if (yearOnly) notes.push(`${yearOnly} with only a year-level date (or none)`);
  if (before) notes.push(`${before} that occurred before 2020 but were reported later`);
  if (notes.length) el.insertAdjacentHTML("beforeend", `<p class="source">Not shown in this chart: ${notes.join("; ")}.</p>`);
}

/* ---------- 2. bump chart ---------- */
function renderBump() {
  const years = yearsList(), f = readFilters(), keys = Object.keys(CATEGORY_LABELS);
  const yi = Object.fromEntries(years.map((y, i) => [y, i]));
  const counts = Object.fromEntries(keys.map((c) => [c, years.map(() => 0)]));
  for (const i of exceptCategory) if (i.category in counts && i.year in yi) counts[i.category][yi[i.year]]++;
  const ranks = Object.fromEntries(keys.map((c) => [c, []]));
  years.forEach((_, j) => {
    [...keys].sort((a, b) => counts[b][j] - counts[a][j] || CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b]))
      .forEach((c, r) => (ranks[c][j] = r + 1));
  });
  const lead = keys.map((c) => [c, counts[c].reduce((p, q) => p + q, 0)]).sort((a, b) => b[1] - a[1])[0][0];
  Charts.bumpChart($("chart-bump"), {
    years, highlight: f.category || null, lead,
    series: keys.map((c) => ({ key: c, label: CATEGORY_LABELS[c], ranks: ranks[c], counts: counts[c] })),
  }, { label: "Each category's rank among the twelve, by year; click a line to filter", onClick: setCategory });
}

/* ---------- sparklines by quarter ---------- */
function quarterRange() {
  const now = new Date(), out = [], curQ = Math.floor(now.getMonth() / 3) + 1;
  for (let y = START_YEAR; y <= now.getFullYear(); y++)
    for (let q = 1; q <= 4; q++) {
      if (y === now.getFullYear() && q > curQ) break;
      out.push(`${y}Q${q}`);
    }
  return out;
}
function renderMultiples() {
  const qs = quarterRange(), f = readFilters(), box = $("multiples");
  const qi = Object.fromEntries(qs.map((q, i) => [q, i]));
  const per = {};
  for (const c of Object.keys(CATEGORY_LABELS)) per[c] = { total: 0, q: qs.map(() => 0) };
  for (const i of exceptCategory) {
    const p = per[i.category];
    if (!p) continue;
    p.total++;
    const q = quarterKey(i.event_date);
    if (q && q in qi) p.q[qi[q]]++;
  }
  box.innerHTML = "";
  const order = Object.keys(CATEGORY_LABELS).sort((a, b) => (a === "other") - (b === "other") || per[b].total - per[a].total);
  for (const cat of order) {
    const div = document.createElement("div");
    div.className = `multiple${f.category === cat ? " active" : ""}`;
    div.innerHTML = `<button class="pick" type="button" aria-label="Filter to ${esc(CATEGORY_LABELS[cat])}"><h3>${esc(CATEGORY_LABELS[cat])}</h3><div class="n">${plural(per[cat].total, "incident")}</div><div class="chart"></div></button>`;
    box.appendChild(div);
    Charts.sparkline(div.querySelector(".chart"), { keys: qs, values: per[cat].q, partialLast: true }, {
      label: `${CATEGORY_LABELS[cat]} by quarter`, firstLabel: qs[0].slice(0, 4), lastLabel: qs[qs.length - 1].slice(0, 4),
      tip: (k, v) => `${esc(CATEGORY_LABELS[cat])}, ${k.replace("Q", " Q")}: <b>${v}</b>`,
    });
    div.querySelector("button").addEventListener("click", () => setCategory(cat));
  }
}

/* ---------- 3. flow ---------- */
function renderFlow() {
  const el = $("chart-flow");
  if (!filtered.length) { el.innerHTML = `<p class="empty">No incidents match the current filters.</p>`; return; }
  const byCat = {};
  for (const i of filtered) byCat[i.category] = (byCat[i.category] || 0) + 1;
  const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const fold = new Set(cats.slice(8).map(([c]) => c));
  const left = cats.slice(0, 8).map(([c, n]) => ({ key: c, label: CATEGORY_LABELS[c] || c, count: n }));
  if (fold.size) left.push({ key: "__other", label: `${fold.size} smaller categories`, count: cats.slice(8).reduce((p, [, n]) => p + n, 0) });
  const stage = (i) => (LEGAL_ORDER.includes(i.legal_stage) ? i.legal_stage : "none_reported");
  const byStage = {}, linkMap = {};
  for (const i of filtered) {
    const s = stage(i), c = fold.has(i.category) ? "__other" : i.category, k = `${c}|${s}`;
    byStage[s] = (byStage[s] || 0) + 1;
    linkMap[k] = (linkMap[k] || 0) + 1;
  }
  const right = LEGAL_ORDER.filter((s) => byStage[s]).map((s) => ({ key: s, label: LEGAL_LABELS[s], count: byStage[s] }));
  const links = Object.entries(linkMap).map(([k, n]) => { const [s, t] = k.split("|"); return { s, t, count: n }; });
  Charts.flowChart(el, { left, right, links }, {
    label: "Incidents by category and the furthest legal stage their reports describe",
    emphasis: (t) => t === "convicted_or_plea" || t === "sentenced",
    onClick: (c) => { if (c !== "__other") setCategory(c); },
  });
}

/* ---------- 5. coverage timeline ---------- */
function midDate(i) {
  const d = i.event_date || "";
  const y = +d.slice(0, 4);
  if (!y) return null;
  const prec = i.date_precision || (d.length >= 10 ? "day" : d.length >= 7 ? "month" : "year");
  if (prec === "year" || d.length < 7) return Date.UTC(y, 6, 1);
  const mo = +d.slice(5, 7) - 1;
  if (prec === "month" || d.length < 10) return Date.UTC(y, mo, 15);
  return Date.UTC(y, mo, +d.slice(8, 10) || 15);
}
function renderCoverage() {
  const el = $("chart-coverage"), note = $("coverage-note");
  const t0 = Date.UTC(START_YEAR, 0, 1), t1 = Date.now();
  const points = [];
  let undated = 0, before = 0;
  for (const i of filtered) {
    const t = midDate(i);
    if (t == null) { undated++; continue; }
    if (t < t0) { before++; continue; }
    points.push({ t: Math.min(t, t1), r: Math.min(10, 1.0 + 1.2 * Math.sqrt(nSources(i))), i });
  }
  if (!points.length) { el.innerHTML = `<p class="empty">No dated incidents match the current filters.</p>`; note.textContent = ""; return; }
  Charts.coverageChart(el, { points, t0, t1 }, {
    label: "One dot per incident by event date, sized by the number of reports; the three most-reported are named",
    labelFor: (p) => `${shortPlace(p.i)} · ${CATEGORY_LABELS[p.i.category] || p.i.category} · ${plural(nSources(p.i), "report")}`,
    tip: (p) => `<b>${esc(p.i.event_date || "undated")}</b> · ${esc(shortPlace(p.i))}<br>${esc(trunc(p.i.summary, 150))}<br><span class="dim">${plural(nSources(p.i), "report")} · click for the record</span>`,
    onClick: (p) => openRecord(p.i),
  });
  const parts = [];
  if (undated) parts.push(`${undated} undated`);
  if (before) parts.push(`${before} that occurred before 2020`);
  note.textContent = `Source: Drone Crime and Incident Tracker. Dot area follows the number of reports, scaled to fit the page; month- and year-level dates are placed mid-period.${parts.length ? ` Not shown: ${parts.join("; ")}.` : ""}`;
}

/* ---------- 6. map and country list ---------- */
function setupMap() {
  map = L.map("map", { worldCopyJump: true, scrollWheelZoom: false }).setView([25, 0], 2);
  // Esri's light grey canvas: a muted basemap that needs no API key (CARTO's now watermarks).
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 12, attribution: "Tiles © Esri — Esri, DeLorme, NAVTEQ",
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  map.on("popupopen", (e) => {
    const node = e.popup.getElement();
    node.querySelectorAll(".pp-open").forEach((a) => a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const inc = BY_ID.get(a.dataset.id);
      if (inc) openRecord(inc);
    }));
    const t = node.querySelector(".pp-table");
    if (t) t.addEventListener("click", (ev) => {
      ev.preventDefault();
      $("f-q").value = t.dataset.q;
      applyFilters();
      $("table-card").scrollIntoView({ behavior: "smooth" });
    });
  });
}
function placeKey(i) {
  if (i.geo_precision === "locality") return [i.locality, i.admin1, i.country].filter(Boolean).join(", ");
  if (i.geo_precision === "admin1") return [i.admin1, i.country].filter(Boolean).join(", ");
  return i.country || "Unknown";
}
function renderMap() {
  markerLayer.clearLayers();
  placeMarkers = [];
  const groups = new Map();
  for (const i of filtered) {
    if (i.lat == null || i.lon == null) continue;
    const k = placeKey(i);
    let g = groups.get(k);
    if (!g) { g = { key: k, items: [], lat: 0, lon: 0, approx: true, country: i.country }; groups.set(k, g); }
    g.items.push(i); g.lat += i.lat; g.lon += i.lon;
    if (i.geo_precision === "locality") g.approx = false;
  }
  // Largest first, so small circles sit on top and stay clickable.
  for (const g of [...groups.values()].sort((a, b) => b.items.length - a.items.length)) {
    const n = g.items.length;
    const mk = L.circleMarker([g.lat / n, g.lon / n], {
      radius: Math.min(18, 3 + 2.2 * Math.sqrt(n)), color: "#ffffff", weight: 1.5,
      fillColor: "#121212", fillOpacity: g.approx ? 0.3 : 0.55,
    });
    mk.bindTooltip(`${esc(g.key)} · ${plural(n, "incident")}${g.approx ? ` (placed at ${esc(g.items[0].geo_precision)} level)` : ""}`, { direction: "top", offset: [0, -4] });
    mk.on("click", () => mk.bindPopup(placePopup(g), { maxWidth: 340 }).openPopup());
    mk.on("mouseover", () => highlightCountry(g.country, true));
    mk.on("mouseout", () => highlightCountry(null, false));
    mk.country = g.country;
    mk.addTo(markerLayer);
    placeMarkers.push(mk);
  }
}
function placePopup(g) {
  const items = [...g.items].sort((a, b) => (b.event_date || "").localeCompare(a.event_date || ""));
  const rows = items.slice(0, 8).map((i) =>
    `<div class="pp-row"><a href="#" data-id="${esc(i.id)}" class="pp-open">${esc(i.event_date || "undated")}</a> · ${esc(CATEGORY_LABELS[i.category] || i.category)}<div class="pp-sum">${esc(trunc(i.summary, 120))}</div></div>`).join("");
  const more = items.length > 8 ? `<div class="pp-more">+${items.length - 8} more</div>` : "";
  const q = g.key.split(",")[0];
  return `<h4>${esc(g.key)}</h4><div class="pp-n">${plural(items.length, "incident")}${g.approx ? ` · placed at ${esc(items[0].geo_precision)} level` : ""} · <a href="#" class="pp-table" data-q="${esc(q)}">show in the table</a></div>${rows}${more}`;
}
function renderCountries() {
  const by = {};
  for (const i of filtered) if (i.country) by[i.country] = (by[i.country] || 0) + 1;
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]);
  const top = rows.slice(0, 10), max = top.length ? top[0][1] : 1, f = readFilters();
  const list = $("country-list");
  list.innerHTML = top.map(([c, n]) =>
    `<li data-country="${esc(c)}" class="${f.country === c ? "active" : ""}"><button type="button" aria-label="Filter to ${esc(c)}"><span class="cname">${esc(c)}</span><span class="cbar"><i style="width:${(100 * n / max).toFixed(1)}%"></i></span><span class="cn">${n.toLocaleString()}</span></button></li>`).join("")
    + (rows.length > 10 ? `<li class="more">${rows.length - 10} more ${rows.length - 10 === 1 ? "country" : "countries"}</li>` : "")
    + (rows.length === 0 ? `<li class="more">No incidents match the current filters.</li>` : "");
  list.querySelectorAll("li[data-country]").forEach((li) => {
    li.addEventListener("mouseenter", () => highlightCountry(li.dataset.country, true));
    li.addEventListener("mouseleave", () => highlightCountry(null, false));
    li.querySelector("button").addEventListener("click", () => {
      $("f-country").value = f.country === li.dataset.country ? "" : li.dataset.country;
      applyFilters();
    });
  });
}
function highlightCountry(country, on) {
  for (const mk of placeMarkers) mk.setStyle({ fillColor: on && mk.country === country ? "#b3261e" : "#121212" });
  $("country-list").querySelectorAll("li[data-country]").forEach((li) => li.classList.toggle("hover", on && li.dataset.country === country));
}

/* ---------- record dialog ---------- */
function sourcesHtml(i, limit = 5) {
  const srcs = i.sources || [];
  return srcs.slice(0, limit).map((s) =>
    `<div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.outlet || "source")}</a> <span class="pub">${esc(s.pub_date || "")}</span></div>`
  ).join("") + (srcs.length > limit ? `<div class="pub">+${srcs.length - limit} more</div>` : "");
}
function openRecord(i) {
  const dlg = $("record"), body = $("record-body");
  const list = (arr, labels) => (arr || []).map((x) => labels[x] || x).join(", ") || "None reported";
  const flags = (i.review_flags || []).join(", ");
  body.innerHTML = `
    <p class="r-kicker">${esc(CATEGORY_LABELS[i.category] || i.category)} · ${esc(i.event_date || "undated")}${i.date_precision && i.date_precision !== "day" ? ` (${esc(i.date_precision)}-level date)` : ""}</p>
    <h3 id="record-title">${esc(place(i) || "Place not stated")}</h3>
    <p class="r-sum">${esc(i.summary)}</p>
    <dl>
      <dt>Intent</dt><dd>${esc(INTENT_LABELS[i.intent] || i.intent || "Unknown")}</dd>
      <dt>Counter-drone response</dt><dd>${esc(list(i.counter_drone_response, CD_LABELS))}</dd>
      <dt>Legal stage</dt><dd>${esc(LEGAL_LABELS[i.legal_stage] || i.legal_stage || "None reported")}</dd>
      ${i.conflict_linked ? `<dt>Suspected state or war link</dt><dd>${esc(i.conflict_link_basis || "flagged")}</dd>` : ""}
      <dt>Review status</dt><dd>${esc(i.review_status || "auto")}${flags ? ` · flags: ${esc(flags)}` : ""}</dd>
      <dt>Record</dt><dd>${esc(i.id)}</dd>
    </dl>
    <h4>Sources</h4><div class="srcs">${sourcesHtml(i, 20)}</div>`;
  if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
}
function setupRecord() {
  const dlg = $("record");
  $("record-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
}

/* ---------- table ---------- */
function sortVal(i, k) {
  if (k === "place") return place(i);
  if (k === "legal_stage") return LEGAL_ORDER.indexOf(i.legal_stage);
  if (k === "n_sources") return nSources(i);
  return i[k] ?? "";
}
function cdText(i) {
  const r = (i.counter_drone_response || []).filter((c) => c !== "none_reported").map((c) => CD_LABELS[c] || c);
  return r.length ? ` · ${esc(r.join(", "))}` : "";
}
function renderTable() {
  const rows = [...filtered].sort((a, b) => {
    const x = sortVal(a, sortKey), y = sortVal(b, sortKey);
    return (x > y ? 1 : x < y ? -1 : 0) * sortDir;
  });
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  page = Math.min(page, pages - 1);
  const slice = rows.slice(page * PAGE, page * PAGE + PAGE);
  $("tbl").querySelector("tbody").innerHTML = slice.map((i) => `<tr data-id="${esc(i.id)}" tabindex="0">
    <td class="date">${esc(i.event_date || "")}</td>
    <td class="place">${esc(place(i))}</td>
    <td class="inc"><div class="sum">${esc(i.summary)}</div><div class="meta">${esc(CATEGORY_LABELS[i.category] || i.category)}${cdText(i)}${i.conflict_linked ? ` · <span class="flag" title="${esc(i.conflict_link_basis)}">suspected state/war link</span>` : ""}${i.review_status === "auto" ? "" : ` · <span class="flag">${esc(i.review_status)}</span>`}</div></td>
    <td class="legal">${esc(LEGAL_LABELS[i.legal_stage] || i.legal_stage || "")}</td>
    <td class="src">${sourcesHtml(i)}</td>
  </tr>`).join("");
  $("table-count").textContent = plural(rows.length, "incident");
  $("pg-info").textContent = `Page ${page + 1} of ${pages}`;
  $("pg-prev").disabled = page === 0;
  $("pg-next").disabled = page >= pages - 1;
  document.querySelectorAll("#tbl th[data-k]").forEach((th) =>
    th.setAttribute("aria-sort", th.dataset.k === sortKey ? (sortDir > 0 ? "ascending" : "descending") : "none"));
}
function setupTable() {
  document.querySelectorAll("#tbl th[data-k]").forEach((th) => th.addEventListener("click", () => {
    const k = th.dataset.k;
    sortDir = k === sortKey ? -sortDir : (k === "event_date" || k === "n_sources" ? -1 : 1);
    sortKey = k;
    renderTable();
  }));
  $("pg-prev").addEventListener("click", () => { page--; renderTable(); });
  $("pg-next").addEventListener("click", () => { page++; renderTable(); });
  $("dl-filtered").addEventListener("click", (e) => { e.preventDefault(); downloadCsv(filtered); });
  const body = $("tbl").querySelector("tbody");
  const openRow = (tr) => { const inc = BY_ID.get(tr.dataset.id); if (inc) openRecord(inc); };
  body.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const tr = e.target.closest("tr[data-id]");
    if (tr) openRow(tr);
  });
  body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.target.tagName === "A") return;
    const tr = e.target.closest("tr[data-id]");
    if (tr) openRow(tr);
  });
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
  const t0 = performance.now();
  renderTiles();
  renderTrend();
  renderBump();
  renderMultiples();
  renderFlow();
  renderCoverage();
  renderMap();
  renderCountries();
  renderTable();
  if (location.search.includes("timing")) console.log(`render: ${(performance.now() - t0).toFixed(0)} ms for ${filtered.length} incidents`);
}
function renderResponsive() {
  renderTrend(); renderBump(); renderFlow(); renderCoverage();
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
  BY_ID = new Map(ALL.map((i) => [i.id, i]));
  const upd = META.generated_at ? new Date(META.generated_at).toISOString().slice(0, 10) : "?";
  $("meta").textContent = `${ALL.length.toLocaleString()} incidents · updated ${upd}`;
  setupFilters();
  setupMap();
  setupTable();
  setupRecord();
  applyFilters();
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(renderResponsive, 150); });
  window.addEventListener("hashchange", () => {
    document.querySelectorAll(".filters select, .filters input").forEach((e) => (e.value = ""));
    readHash();
    applyFilters();
  });
}
init();
