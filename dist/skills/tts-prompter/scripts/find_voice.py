#!/usr/bin/env python3
"""Find TTS voices in references/voice_library.tsv without loading the whole catalog into context.

Search (default; prints at most --limit compact lines):
  find_voice.py --language en-GB --gender female --use-case storyteller --search "calm warm"
Facets (which filter values exist; use before searching an unfamiliar language):
  find_voice.py --facets --language en
Check IDs before calling generate_speech:
  find_voice.py --check Kore en-gb-storyteller-3

Filters: --language (full code like en-GB, or primary subtag like en), --gender, --pitch,
--accent (substring), --use-case (words matched against persona and context). --search ranks by words
found in accent, context, persona, display name and description. --include-studio adds the 30 studio
voices, which work in every language. Standard library only; Python 3.8+.
"""
import argparse
import collections
import difflib
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "references", "voice_library.tsv")
NO_LIBRARY_HINT = ("No library voices for '{lang}'. Library language codes: {codes}. "
                   "If the language is not listed, use one of the 30 studio voices in "
                   "references/voice_catalog.md.")


def no_library(rows, lang):
    codes = sorted({r["language"] for r in rows if r["kind"] == "library"})
    base = lang.lower().replace("_", "-").split("-")[0]
    same = [c for c in codes if c.lower().split("-")[0] == base]
    if same:
        print(f"No library voices for '{lang}'. Same language in other regions: {', '.join(same)}. "
              f"Retry with one of these, or with --language {base}.")
        return 0
    print(NO_LIBRARY_HINT.format(lang=lang, codes=", ".join(codes)))
    return 0


def load():
    rows = []
    with open(DATA, encoding="utf-8") as f:
        header = None
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            parts = line.rstrip("\n").split("\t")
            if header is None:
                header = parts
                continue
            rows.append(dict(zip(header, parts)))
    return rows


def words(s):
    return [w for w in re.split(r"[^a-z0-9]+", (s or "").lower()) if len(w) > 1]


def lang_match(row_lang, want):
    if not want:
        return True
    rl, w = row_lang.lower(), want.lower().replace("_", "-")
    return rl == w if "-" in w else rl.split("-")[0] == w


def fmt(r, width=150):
    desc = r["description"]
    if len(desc) > width:
        desc = desc[: width - 1].rstrip() + "…"
    return f"{r['id']} | {r['gender']}, {r['pitch']} | {r['accent']} | {r['persona']} | {desc}"


def search(rows, a):
    pool = [r for r in rows if r["kind"] == "library" and lang_match(r["language"], a.language)]
    if a.language and not pool and not a.include_studio:
        return no_library(rows, a.language)
    if a.include_studio:
        pool += [r for r in rows if r["kind"] == "studio"]
    filters = [
        ("gender", lambda r: not a.gender or r["gender"].lower() == a.gender.lower()),
        ("pitch", lambda r: not a.pitch or r["pitch"].lower() == a.pitch.lower()),
        ("accent", lambda r: not a.accent or a.accent.lower() in r["accent"].lower()),
        ("use-case", lambda r: not a.use_case or any(
            w in (r["persona"] + " " + r["context"]).lower() for w in words(a.use_case))),
    ]
    relaxed = []
    active = list(filters)
    while True:
        hits = [r for r in pool if all(f(r) for _, f in active)]
        if hits or not active:
            break
        # Relax the most specific remaining filter first, keeping language and gender longest.
        for name in ("pitch", "accent", "use-case", "gender"):
            idx = next((i for i, (n, _) in enumerate(active) if n == name), None)
            if idx is not None:
                relaxed.append(active.pop(idx)[0])
                break
    q = words(a.search)

    def score(r):
        text = " ".join([r["accent"], r["context"], r["persona"], r["display_name"], r["description"]]).lower()
        return sum(1 for w in q if w in text)

    def natural(r):
        m = re.match(r"(.*?)(\d+)$", r["id"])
        return (m.group(1), int(m.group(2))) if m else (r["id"], 0)

    hits.sort(key=lambda r: (-score(r), natural(r)))
    # Keep score order; inside each score tier, show varied (accent, gender, pitch) combinations first.
    tiers = collections.OrderedDict()
    for r in hits:
        tiers.setdefault(score(r), []).append(r)
    picked = []
    for tier in tiers.values():
        seen, first, rest = set(), [], []
        for r in tier:
            key = (r["accent"], r["gender"], r["pitch"])
            (rest if key in seen else first).append(r)
            seen.add(key)
        picked.extend(first + rest)
        if len(picked) >= a.limit:
            break
    picked = picked[: a.limit]
    note = f" (relaxed: {', '.join(relaxed)})" if relaxed else ""
    print(f"{len(hits)} match{note}; showing {len(picked)}. Copy the id exactly into voice_name; "
          "for a library voice, set language_code to that voice's locale.")
    for r in picked:
        print(fmt(r))
    return 0


def facets(rows, a):
    pool = [r for r in rows if r["kind"] == "library" and lang_match(r["language"], a.language)]
    if a.language and not pool:
        return no_library(rows, a.language)
    if not a.language:
        langs = collections.Counter(r["language"] for r in pool)
        print("library languages:", ", ".join(f"{k} {v}" for k, v in sorted(langs.items())))
    acc = collections.Counter(f"{r['language']} {r['accent']}" for r in pool)
    ctx = collections.Counter(c.strip() for r in pool for c in r["context"].split(";") if c.strip())
    fam = collections.Counter(r["persona"].split(" (")[0] for r in pool)
    gen = collections.Counter(r["gender"] for r in pool)
    print(f"{len(pool)} library voices")
    print("accents:", "; ".join(f"{k} ({v})" for k, v in acc.most_common(40 if a.language else 60)))
    print("contexts:", "; ".join(f"{k} ({v})" for k, v in ctx.most_common()))
    print("use cases:", "; ".join(f"{k} ({v})" for k, v in fam.most_common()))
    print("genders:", ", ".join(f"{k} {v}" for k, v in gen.most_common()))
    return 0


def check(rows, ids):
    exact = {r["id"]: r for r in rows}
    lower = {r["id"].lower(): r for r in rows}
    bad, library_locales = 0, set()
    for i in ids:
        if i in exact:
            r = exact[i]
            if r["kind"] == "studio":
                where = "any language_code"
            else:
                where = f"language_code must be {r['language']}"
                library_locales.add(r["language"])
            print(f"OK  {i} | {r['kind']} | {where} | {r['accent']} | {r['gender']}, {r['pitch']}")
        elif i.lower() in lower:
            print(f"FIX {i} -> use '{lower[i.lower()]['id']}' exactly")
            bad += 1
        else:
            near = difflib.get_close_matches(i, list(exact), n=3, cutoff=0.6)
            print(f"NO  {i} is not a known voice" + (f"; closest: {', '.join(near)}" if near else ""))
            bad += 1
    if len(library_locales) > 1:
        print(f"FIX library voices from different locales ({', '.join(sorted(library_locales))}) "
              "cannot share one request; pick both from one locale, or pair one library voice with a studio voice")
        bad += 1
    return 1 if bad else 0


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--language")
    p.add_argument("--gender", choices=["female", "male", "neutral"])
    p.add_argument("--pitch", choices=["low", "medium", "high"])
    p.add_argument("--accent")
    p.add_argument("--use-case", nargs="+")
    p.add_argument("--search", nargs="+")
    p.add_argument("--limit", type=int, default=5)
    p.add_argument("--include-studio", action="store_true")
    p.add_argument("--facets", action="store_true")
    p.add_argument("--check", nargs="+", metavar="ID")
    a = p.parse_args()
    a.use_case = " ".join(a.use_case) if a.use_case else None
    a.search = " ".join(a.search) if a.search else None
    a.limit = max(1, min(a.limit, 15))
    rows = load()
    if a.check:
        return check(rows, a.check)
    if a.facets:
        return facets(rows, a)
    return search(rows, a)


if __name__ == "__main__":
    sys.exit(main())
