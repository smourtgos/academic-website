#!/usr/bin/env python3
"""
build_data.py  —  generator for the Criminogenic Entropy dashboard.

Reads the canonical, code-generated CSV outputs of the JQC-submitted analysis
(Entropy_Revision_2026/) and emits `data.js` (window.ENTROPY_DATA = {...}) plus a
data/ copy of the source CSVs. NO hand-typed statistics: every number the dashboard
shows originates here, from the analysis outputs.

Stdlib only (no pandas/numpy). Run:
    python3 build_data.py [path/to/Entropy_Revision_2026]

Author-facing text (plain-language labels, units, descriptions, glossary) is the
only authored content; all quantities come from the CSVs.
"""

import csv, json, math, os, shutil, sys

# ----------------------------------------------------------------------------- paths
HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_SRC = "/Users/s.mourtgos/Documents/Projects/2026/Entropy Theory of Crime/Entropy_Revision_2026"
SRC = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SRC
OUT_JS = os.path.join(HERE, "data.js")
OUT_DATA_DIR = os.path.join(HERE, "data")

def p(*a): return os.path.join(SRC, *a)
def readcsv(rel):
    with open(p(rel), newline="") as f:
        return list(csv.DictReader(f))

def num(x):
    if x is None: return None
    s = str(x).strip()
    if s == "" or s.upper() == "NA" or s.upper() == "NAN": return None
    return float(s)

def r(x, sig=6):
    """round to sig figs for compact JSON; pass through None/ints."""
    if x is None: return None
    if x == 0: return 0
    from math import log10, floor
    return round(x, -int(floor(log10(abs(x)))) + (sig - 1))

# ----------------------------------------------------------------- indicator metadata
# group/sign/loading come from the data; label/unit/desc/decimals are authored.
META = {
  "geographic_mobility": dict(label="Residential mobility", unit="% moved/yr", dec=1,
     desc="Share of people who changed residence in the past year. High residential turnover weakens local ties and informal guardianship, widening the opportunity space for crime."),
  "firearm_fss": dict(label="Firearm prevalence", unit="FS/S proxy", dec=3,
     desc="Firearm availability, measured by the firearm share of suicides (a standard proxy). More lethal means in circulation; empirically the strongest single correlate of violent crime."),
  "unemployment_rate": dict(label="Unemployment", unit="%", dec=1,
     desc="Share of the labor force out of work. Economic instability enlarges the pool of motivated offenders and lowers the opportunity cost of crime."),
  "alcohol_per_capita": dict(label="Alcohol consumption", unit="gal ethanol/capita", dec=2,
     desc="Pure ethanol consumed per capita. Heavier population-level drinking raises disinhibition and conflict."),
  "poverty_rate": dict(label="Poverty", unit="%", dec=1,
     desc="Share of people below the poverty line. Concentrated economic strain increases motivation and desperation."),
  "pct_births_unmarried": dict(label="Family disruption", unit="% of births", dec=1,
     desc="Share of births to unmarried mothers — a proxy for family instability and weaker family-based supervision."),
  "gini": dict(label="Income inequality (Gini)", unit="Gini", dec=3,
     desc="Income inequality (0 = perfectly equal, 1 = maximally unequal). Wider gaps are linked to strain and relative deprivation."),
  "elite_polarization": dict(label="Elite polarization", unit="DW-NOMINATE", dec=3,
     desc="Distance between the parties in Congress (DW-NOMINATE). Political fragmentation erodes institutional legitimacy and collective problem-solving."),
  "affective_polarization": dict(label="Affective polarization", unit="thermometer gap", dec=1,
     desc="How coldly partisans feel toward the other side (feeling-thermometer gap). Social distrust reduces cohesion and collective efficacy."),
  "overdose_rate": dict(label="Drug overdose mortality", unit="deaths/100k", dec=1,
     desc="Drug-overdose deaths per 100,000. Included as a substance-supply signal; empirically it carries little unique national signal (near-zero loading)."),
  "incarceration_rate": dict(label="Incarceration", unit="per 100k", dec=0,
     desc="People incarcerated per 100,000. Incapacitation removes some motivated offenders from the community, compressing the opportunity space."),
  "voter_turnout_vep": dict(label="Voter turnout", unit="% eligible", dec=1,
     desc="Turnout as a share of the voting-eligible population — a proxy for civic engagement and social capital."),
  "homeownership_rate": dict(label="Homeownership", unit="%", dec=1,
     desc="Share of households that own their home. Ownership anchors residents, strengthening local networks and informal surveillance."),
  "police_per_capita": dict(label="Police presence", unit="per 1,000", dec=2,
     desc="Sworn officers per 1,000 residents — formal guardianship and enforcement capacity."),
  "trust_in_government": dict(label="Trust in government", unit="%", dec=1,
     desc="Share expressing trust in the federal government. Institutional legitimacy sustains voluntary compliance with the law."),
}

# ----------------------------------------------------------------------------- load
load = {row["indicator"]: row for row in readcsv("results/model/factor_loadings.csv")}
std  = {row["variable"]: row for row in readcsv("results/model/standardization_params.csv")}
keys = list(load.keys())
assert len(keys) == 15, "expected 15 indicators, got %d" % len(keys)

ds = readcsv("data/clean/analysis_dataset_expanded.csv")
years = [int(num(row["year"])) for row in ds]
years.sort()
YMIN, YMAX = years[0], years[-1]

def series_from_dataset(col):
    d = {int(num(row["year"])): num(row.get(col)) for row in ds}
    return [d.get(y) for y in years]

def interpolate(vals):
    """linear-interpolate interior None; carry nearest for endpoints."""
    v = list(vals); n = len(v)
    idx = [i for i in range(n) if v[i] is not None]
    if not idx: return v
    for i in range(n):
        if v[i] is None:
            lo = max([j for j in idx if j < i], default=None)
            hi = min([j for j in idx if j > i], default=None)
            if lo is None: v[i] = v[hi]
            elif hi is None: v[i] = v[lo]
            else:
                f = (i - lo) / (hi - lo); v[i] = v[lo] + f * (v[hi] - v[lo])
    return v

# raw (interpolated) indicator values per year
raw = {k: interpolate(series_from_dataset(k)) for k in keys}

# standardized values & signed contributions (loading * z) per indicator/year
zmat, contrib = {}, {}
for k in keys:
    mu, sd = num(std[k]["mean"]), num(std[k]["sd"])
    lam = num(load[k]["posterior_mean"])
    z = [(x - mu) / sd for x in raw[k]]
    zmat[k] = z
    contrib[k] = [lam * zi for zi in z]

# total structural signal S_t = sum_j lambda_j z_j
S = [sum(contrib[k][i] for k in keys) for i in range(len(years))]

# ------------------------------------------------- published latent entropy (truth)
ent = {int(num(row["year"])): row for row in readcsv("results/model/latent_entropy_series.csv")}
E = [num(ent[y]["E_mean"]) for y in years]
Elo = [num(ent[y]["E_q025"]) for y in years]
Ehi = [num(ent[y]["E_q975"]) for y in years]

# -------------------------------------------------------------- variance-matched a,b
def mean(a): return sum(a) / len(a)
def pstd(a):
    m = mean(a); return math.sqrt(sum((x - m) ** 2 for x in a) / len(a))
sdE, sdS = pstd(E), pstd(S)
b = sdE / sdS
a = mean(E) - b * mean(S)
# pearson corr(S, E)
mS, mE = mean(S), mean(E)
cov = sum((S[i]-mS)*(E[i]-mE) for i in range(len(S))) / len(S)
corr = cov / (sdS * sdE)

# ----------------------------------------------------------------------- crime betas
beta = {}
for row in readcsv("results/model/crime_loadings.csv"):
    beta[row["outcome"]] = num(row["beta_mean"])

# ----------------------------------------------------- observed crime (rate levels)
crime = {c: {int(num(row["year"])): num(row.get(c)) for row in ds}
         for c in ["violent_crime_rate", "property_crime_rate", "murder_rate"]}

# --------------------------------------------- prediction metrics (Entropy Model ONLY)
# Author preference: NO ARIMA / covariate-regression benchmarks shown.
# Homicide is EXCLUDED from reported results (dropped from the paper's quantitative results).
REPORTED = ("property_crime_rate", "violent_crime_rate")
metrics = {}
for row in readcsv("tables/table3_prediction_metrics.csv"):
    if row["method"] == "Entropy Model" and row["crime_type"] in REPORTED:
        metrics[row["crime_type"]] = dict(mape=num(row["MAPE"]), corr=num(row["correlation"]),
                                           rmse=num(row["RMSE"]), mae=num(row["MAE"]))
for row in readcsv("tables/table5b_direction_accuracy.csv"):
    if row["method"] == "Entropy Model" and row["crime_type"] in REPORTED:
        metrics.setdefault(row["crime_type"], {})["dir"] = num(row["direction_accuracy"])

# ------------------------------------------------------------------ 2024 validation
val2024 = []
for row in readcsv("results/forecasting/forecast_validation_2024.csv"):
    if row["crime_type"] not in REPORTED: continue   # exclude homicide
    val2024.append(dict(crime=row["crime_type"], actual=num(row["actual_2024"]),
                        pred=num(row["predicted_mean"]), lo=num(row["predicted_q025"]),
                        hi=num(row["predicted_q975"]), inCI=row["in_95_ci"].strip().upper()=="TRUE",
                        pctErr=num(row["pct_error"])))

# ------------------------------------------------------------------------- scenarios
scen_names = {}
scen_E = {}        # scenario -> [{year,mean,lo,hi}]
scen_crime = {}    # scenario -> crime_type -> [{year,mean,lo,hi}]
for row in readcsv("results/forecasting/scenario_entropy_projections.csv"):
    s = row["scenario"]; scen_names[s] = row["scenario_name"]
    scen_E.setdefault(s, []).append(dict(year=int(num(row["year"])), mean=num(row["E_mean"]),
                                         lo=num(row["E_q025"]), hi=num(row["E_q975"])))
for row in readcsv("results/forecasting/scenario_crime_projections.csv"):
    s = row["scenario"]; ct = row["crime_type"]
    scen_crime.setdefault(s, {}).setdefault(ct, []).append(
        dict(year=int(num(row["year"])), mean=num(row["pred_mean"]),
             lo=num(row["pred_q025"]), hi=num(row["pred_q975"])))


# ----------------------------------------------------------------- indicator objects
def nice_range(vals, dec):
    lo, hi = min(vals), max(vals); span = hi - lo or abs(hi) or 1.0
    smin = max(0.0, lo - 0.4 * span)
    smax = hi + 0.4 * span
    step = (smax - smin) / 300.0
    return round(smin, dec + 2), round(smax, dec + 2), step

indicators = []
for k in keys:
    lam = num(load[k]["posterior_mean"])
    grp = "expanding" if lam > 0 else "compressing"
    smin, smax, step = nice_range(raw[k], META[k]["dec"])
    indicators.append(dict(
        key=k, label=META[k]["label"], unit=META[k]["unit"], dec=META[k]["dec"],
        desc=META[k]["desc"], group=grp, sign=1 if lam > 0 else -1,
        loading=r(lam), loading_lo=r(num(load[k]["q025"])), loading_hi=r(num(load[k]["q975"])),
        mean=r(num(std[k]["mean"])), sd=r(num(std[k]["sd"])),
        sliderMin=smin, sliderMax=smax, step=r(step, 4),
        values=[r(x, 6) for x in raw[k]],
    ))
# order: expanding (strongest first), then compressing (strongest first)
indicators.sort(key=lambda d: (0 if d["group"] == "expanding" else 1, -abs(d["loading"])))

# --------------------------------------------------------------------------- assemble
DATA = dict(
    meta=dict(yearMin=YMIN, yearMax=YMAX, source="Entropy_Revision_2026 (JQC-submitted analysis)",
              calibration=dict(a=r(a), b=r(b), corr=r(corr), sdE=r(sdE), sdS=r(sdS)),
              note="Historical entropy/crime/contribution series are the published Bayesian model outputs. "
                   "The interactive simulator is a transparent, sign-constrained linear emulator calibrated "
                   "(variance-matched) to the published entropy scale; it illustrates structural sensitivity, "
                   "not the full posterior."),
    years=years,
    indicators=indicators,
    entropy=[dict(year=years[i], mean=r(E[i]), lo=r(Elo[i]), hi=r(Ehi[i])) for i in range(len(years))],
    crime={c: [r(crime[c][y]) for y in years] for c in crime},
    betas={k: r(v) for k, v in beta.items()},
    metrics=metrics,
    validation2024=val2024,
    contributions={k: [r(contrib[k][i], 6) for i in range(len(years))] for k in keys},
    scenarios=dict(names=scen_names, entropy=scen_E, crime=scen_crime),
)

with open(OUT_JS, "w") as f:
    f.write("// AUTO-GENERATED by build_data.py — do not edit by hand. Source: %s\n" % DATA["meta"]["source"])
    f.write("window.ENTROPY_DATA = ")
    json.dump(DATA, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")

# NOTE: source CSVs are intentionally NOT copied into a public data/ folder — the raw
# analysis CSVs are not to be exposed publicly yet (pre-publication). The dashboard runs
# entirely off the embedded data.js. (Re-add a copy step here if downloads are wanted later.)

# --------------------------------------------------------------------- self-checks
print("data.js written:", OUT_JS, "(%d bytes)" % os.path.getsize(OUT_JS))
print("years %d-%d (n=%d), 15 indicators" % (YMIN, YMAX, len(years)))
print("calibration: a=%.5f b=%.6f corr(S,E)=%.4f  sdE=%.4f sdS=%.3f" % (a, b, corr, sdE, sdS))
for ct, bk in [("violent_crime_rate", "violent"), ("property_crime_rate", "property")]:
    bb = beta[ct]
    print("  %-9s beta=%.3f  -> per +1SD entropy x%.3f (+%.0f%%) ; over range x%.2f"
          % (bk, bb, math.exp(bb*sdE), 100*(math.exp(bb*sdE)-1), math.exp(bb*(max(E)-min(E)))))
print("Entropy-Model metrics:", {k: v.get("mape") for k, v in metrics.items()})
print("scenarios:", scen_names)
peak_year = years[E.index(max(E))]
print("entropy peak year:", peak_year, "min year:", years[E.index(min(E))])
