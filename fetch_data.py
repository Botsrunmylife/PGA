"""
PGA Fantasy Model — Automated Data Fetcher
===========================================
Fetches real PGA Tour player stats from ESPN's public API and
generates data.js for the dashboard.

Usage:
    python fetch_data.py

What it fetches (all from ESPN public endpoints, no API key needed):
  - Top 40 PGA Tour players by FedEx Cup points
  - Season stats: driving distance, accuracy, GIR%, scrambling, birdies/round, scoring avg
  - Last 10 tournament results (form) for each player
  - Event-by-event finish positions

The script also estimates strokes gained from available stats since
ESPN doesn't provide SG splits directly.

Run this weekly before each tournament, then push to GitHub.
"""

import requests
import json
import time
import sys
from datetime import datetime

# ── Configuration ──────────────────────────────────────────────
SEASON = 2026
TOP_N_PLAYERS = 40  # How many players to include
REQUEST_DELAY = 0.3  # Seconds between API calls (be polite)

# Known top PGA player ESPN IDs (manually curated — ESPN doesn't rank by OWGR)
# Format: (espn_id, name) — used as seed list, supplemented by current event fields
TOP_PLAYER_IDS = [
    (9478,    "Scottie Scheffler"),
    (10140,   "Xander Schauffele"),
    (3470,    "Rory McIlroy"),
    (10592,   "Collin Morikawa"),
    (4375972, "Ludvig Aberg"),
    (9780,    "Jon Rahm"),
    (11119,   "Wyndham Clark"),
    (4364873, "Viktor Hovland"),
    (6007,    "Patrick Cantlay"),
    (5539,    "Tommy Fleetwood"),
    (5860,    "Hideki Matsuyama"),
    (10980,   "Sahith Theegala"),
    (4587,    "Shane Lowry"),
    (2230,    "Tony Finau"),
    (8973,    "Max Homa"),
    (5409,    "Russell Henley"),
    (11382,   "Sungjae Im"),
    (4848,    "Justin Thomas"),
    (9938,    "Sam Burns"),
    (4602673, "Tom Kim"),
    (4513,    "Keegan Bradley"),
    (9126,    "Corey Conners"),
    (1225,    "Brian Harman"),
    (4419142, "Akshay Bhatia"),
    (4410932, "Min Woo Lee"),
    (4425906, "Cameron Young"),
    (9037,    "Matt Fitzpatrick"),
    (8961,    "Sepp Straka"),
    (10054,   "Denny McCarthy"),
    (1651,    "Billy Horschel"),
    (11378,   "Robert MacIntyre"),
    (10906,   "Aaron Rai"),
    (3449,    "Chris Kirk"),
    (9658,    "Taylor Pendrith"),
    (4602218, "Davis Thompson"),
    (388,     "Adam Scott"),
    (1680,    "Jason Day"),
    (9530,    "Maverick McNealy"),
    (9877,    "Will Zalatoris"),
    (4425898, "Austin Eckroat"),
]

# ESPN event IDs for major/signature events (for course history)
# Updated for 2025 season — you can find these from the ESPN schedule
TRACKED_EVENTS = {
    "masters":       {"name": "The Masters", "course": "Augusta National GC", "par": 72, "yds": 7545,
                      "type": "Major", "purse": "$20M", "sz": 87,
                      "emph": {"ott": 0.25, "app": 0.28, "atg": 0.27, "put": 0.20},
                      "traits": {"length": 92, "precision": 78, "scrambling": 90, "putting": 82, "iron_play": 85, "experience": 96, "course_history": 92}},
    "players":       {"name": "THE PLAYERS Championship", "course": "TPC Sawgrass", "par": 72, "yds": 7245,
                      "type": "Signature", "purse": "$25M", "sz": 144,
                      "emph": {"ott": 0.15, "app": 0.35, "atg": 0.25, "put": 0.25},
                      "traits": {"length": 68, "precision": 94, "scrambling": 82, "putting": 88, "iron_play": 96, "experience": 84, "course_history": 80}},
    "us_open":       {"name": "U.S. Open", "course": "Oakmont CC", "par": 70, "yds": 7255,
                      "type": "Major", "purse": "$21.5M", "sz": 156,
                      "emph": {"ott": 0.20, "app": 0.35, "atg": 0.20, "put": 0.25},
                      "traits": {"length": 85, "precision": 96, "scrambling": 78, "putting": 80, "iron_play": 94, "experience": 90, "course_history": 75}},
    "open":          {"name": "The Open Championship", "course": "Royal Troon", "par": 71, "yds": 7190,
                      "type": "Major", "purse": "$17M", "sz": 156,
                      "emph": {"ott": 0.30, "app": 0.22, "atg": 0.28, "put": 0.20},
                      "traits": {"length": 78, "precision": 70, "scrambling": 94, "putting": 76, "iron_play": 78, "experience": 88, "course_history": 82}},
    "pga":           {"name": "PGA Championship", "course": "Quail Hollow Club", "par": 71, "yds": 7600,
                      "type": "Major", "purse": "$18.5M", "sz": 156,
                      "emph": {"ott": 0.30, "app": 0.28, "atg": 0.20, "put": 0.22},
                      "traits": {"length": 96, "precision": 80, "scrambling": 74, "putting": 82, "iron_play": 86, "experience": 82, "course_history": 78}},
    "memorial":      {"name": "The Memorial Tournament", "course": "Muirfield Village GC", "par": 72, "yds": 7535,
                      "type": "Signature", "purse": "$20M", "sz": 120,
                      "emph": {"ott": 0.22, "app": 0.32, "atg": 0.22, "put": 0.24},
                      "traits": {"length": 88, "precision": 86, "scrambling": 80, "putting": 85, "iron_play": 92, "experience": 80, "course_history": 85}},
    "arnold_palmer": {"name": "Arnold Palmer Invitational", "course": "Bay Hill Club & Lodge", "par": 72, "yds": 7466,
                      "type": "Invitational", "purse": "$20M", "sz": 120,
                      "emph": {"ott": 0.28, "app": 0.28, "atg": 0.22, "put": 0.22},
                      "traits": {"length": 90, "precision": 78, "scrambling": 82, "putting": 80, "iron_play": 82, "experience": 76, "course_history": 80}},
    "genesis":       {"name": "Genesis Invitational", "course": "Riviera CC", "par": 71, "yds": 7322,
                      "type": "Signature", "purse": "$20M", "sz": 120,
                      "emph": {"ott": 0.20, "app": 0.35, "atg": 0.20, "put": 0.25},
                      "traits": {"length": 82, "precision": 90, "scrambling": 78, "putting": 86, "iron_play": 94, "experience": 82, "course_history": 88}},
}

# Event name substrings to match ESPN event names → our event keys
EVENT_NAME_MAP = {
    "Masters": "masters",
    "PLAYERS": "players",
    "U.S. Open": "us_open",
    "Open Championship": "open",
    "PGA Championship": "pga",
    "Memorial": "memorial",
    "Arnold Palmer": "arnold_palmer",
    "Genesis": "genesis",
}


def api_get(url, retries=2):
    """Make a GET request with retry logic."""
    for attempt in range(retries + 1):
        try:
            r = requests.get(url, timeout=15)
            if r.status_code == 200:
                return r.json()
            if r.status_code == 404:
                return None
        except (requests.Timeout, requests.ConnectionError):
            if attempt < retries:
                time.sleep(1)
                continue
        time.sleep(REQUEST_DELAY)
    return None


def get_season_stats(player_id):
    """Fetch season-level stats for a player. Tries current, then previous seasons as fallback."""
    data = None
    for season in [2026, 2025, 2024]:
        url = f"https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/seasons/{season}/types/1/athletes/{player_id}/statistics/0"
        data = api_get(url)
        if data and "splits" in data:
            # Extract stats to check quality
            tmp_stats = {}
            for cat in data["splits"]["categories"]:
                for s in cat["stats"]:
                    if "value" in s:
                        tmp_stats[s["name"]] = s["value"]
            # Must have tournaments played AND non-zero key stats (driving, GIR)
            has_events = tmp_stats.get("tournamentsPlayed", 0) > 0
            has_real_stats = tmp_stats.get("yardsPerDrive", 0) > 100 and tmp_stats.get("greensInRegPct", 0) > 10
            if has_events and has_real_stats:
                break
            data = None
        time.sleep(REQUEST_DELAY)
    if not data or "splits" not in data:
        return {}

    stats = {}
    for cat in data["splits"]["categories"]:
        for s in cat["stats"]:
            if "value" in s:
                stats[s["name"]] = s["value"]
            elif "displayValue" in s:
                stats[s["name"]] = s["displayValue"]
    return stats


def get_player_info(player_id):
    """Fetch basic player info."""
    url = f"https://sports.core.api.espn.com/v2/sports/golf/athletes/{player_id}"
    data = api_get(url)
    if not data:
        return None
    country = "USA"
    if "flag" in data:
        alt = data["flag"].get("alt", "")
        country = COUNTRY_MAP.get(alt, alt[:3].upper())
    elif "citizenship" in data:
        country = data["citizenship"][:3].upper()
    return {
        "name": data.get("displayName", data.get("fullName", "Unknown")),
        "country": country,
    }


# Country name → code mapping
COUNTRY_MAP = {
    "United States": "USA", "United States of America": "USA",
    "Northern Ireland": "NIR", "England": "ENG", "Scotland": "SCO",
    "Ireland": "IRL", "Spain": "ESP", "Norway": "NOR",
    "Sweden": "SWE", "South Korea": "KOR", "Korea": "KOR",
    "Japan": "JPN", "Canada": "CAN", "Australia": "AUS",
    "Austria": "AUT", "South Africa": "RSA", "Germany": "GER",
    "France": "FRA", "Italy": "ITA", "Belgium": "BEL",
    "Denmark": "DEN", "Colombia": "COL", "Chile": "CHI",
    "Argentina": "ARG", "China": "CHN", "India": "IND",
    "Thailand": "THA", "Chinese Taipei": "TPE", "New Zealand": "NZL",
    "Wales": "WAL", "Fiji": "FIJ", "Zimbabwe": "ZIM",
    "Netherlands": "NED", "Finland": "FIN", "Philippines": "PHI",
    "Mexico": "MEX", "Puerto Rico": "PUR", "Venezuela": "VEN",
    "Paraguay": "PAR",
}


def get_recent_results(player_id, max_events=10):
    """Fetch last N tournament results for a player across recent seasons."""
    results = []
    course_history = {k: [] for k in TRACKED_EVENTS}

    # Check multiple seasons (current + previous) for more results and course history
    all_items = []
    for season in [2026, 2025, 2024]:
        url = f"https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/seasons/{season}/athletes/{player_id}/eventlog"
        data = api_get(url)
        if data and "events" in data:
            items = data["events"].get("items", [])
            all_items.extend(items)
        time.sleep(REQUEST_DELAY)

    # Process most recent first
    for item in reversed(all_items):
        if not item.get("played", False):
            continue

        # Get finish position
        comp_ref = item.get("competitor", {}).get("$ref")
        ev_ref = item.get("event", {}).get("$ref")

        if not comp_ref:
            continue

        # First get the competitor object, which has a $ref link to status with proper query params
        comp_data = api_get(comp_ref)
        time.sleep(REQUEST_DELAY)
        if not comp_data:
            continue

        # Follow the status $ref link (includes ?lang=en&region=us which is required)
        status_ref = comp_data.get("status", {}).get("$ref")
        if not status_ref:
            continue

        status = api_get(status_ref)
        time.sleep(REQUEST_DELAY)

        if not status:
            continue

        pos_data = status.get("position", {})
        pos_name = pos_data.get("displayName", "")
        # Parse position: "T9" → 9, "1" → 1, "CUT" → skip
        pos_num = None
        if pos_name:
            cleaned = pos_name.replace("T", "").strip()
            try:
                pos_num = int(cleaned)
            except ValueError:
                continue  # Skip WD, CUT, DQ, etc. for form

        if pos_num is not None and len(results) < max_events:
            results.append(pos_num)

        # Check if this is a tracked event for course history
        if ev_ref and pos_num is not None:
            ev_data = api_get(ev_ref)
            time.sleep(REQUEST_DELAY)
            if ev_data:
                ev_name = ev_data.get("name", "")
                for substr, key in EVENT_NAME_MAP.items():
                    if substr.lower() in ev_name.lower():
                        course_history[key].append(pos_num)
                        break

    return results, course_history


def estimate_strokes_gained(stats):
    """
    Estimate strokes gained splits from available ESPN stats.

    ESPN doesn't provide SG directly, so we estimate from:
    - Scoring average vs field (SG Total proxy)
    - Driving distance + accuracy (SG OTT proxy)
    - GIR% (SG Approach proxy)
    - Scrambling% (SG Around-the-Green proxy)
    - Putts per GIR (SG Putting proxy)
    """
    scoring_avg = stats.get("adjustedScoringAverage", 71.0)
    if isinstance(scoring_avg, str):
        try:
            scoring_avg = float(scoring_avg)
        except ValueError:
            scoring_avg = 71.0
    # Guard against 0 or missing values
    if scoring_avg == 0 or scoring_avg > 80:
        scoring_avg = stats.get("scoringAverage", 71.0)
        if isinstance(scoring_avg, str):
            try:
                scoring_avg = float(scoring_avg)
            except ValueError:
                scoring_avg = 71.0
        if scoring_avg == 0 or scoring_avg > 80:
            scoring_avg = 71.0

    drive_dist = stats.get("yardsPerDrive", 295.0)
    if drive_dist == 0:
        drive_dist = 295.0
    drive_acc = stats.get("driveAccuracyPct", 62.0)
    if drive_acc == 0:
        drive_acc = 62.0
    gir_pct = stats.get("greensInRegPct", 67.0)
    if gir_pct == 0:
        gir_pct = 67.0
    save_pct = stats.get("savePct", 55.0)
    if save_pct == 0:
        save_pct = 55.0
    putts_gir = stats.get("puttsGirAvg", 1.75)
    if putts_gir == 0:
        putts_gir = 1.75
    birdies_rd = stats.get("birdiesPerRound", 3.8)
    if birdies_rd == 0:
        birdies_rd = 3.8

    # Normalize to SG-like scale (centered around 0 for average tour player)
    # Tour averages (approx): scoring 71.0, dist 295, acc 62%, GIR 67%, save 55%, putts_gir 1.77
    sg_total = (71.0 - scoring_avg) * 0.8  # Lower scoring = positive SG
    sg_ott = (drive_dist - 295) * 0.008 + (drive_acc - 62) * 0.015
    sg_app = (gir_pct - 67) * 0.06
    sg_atg = (save_pct - 55) * 0.02
    sg_put = (1.77 - putts_gir) * 2.5

    return {
        "tot": round(sg_total, 2),
        "ott": round(sg_ott, 2),
        "app": round(sg_app, 2),
        "atg": round(sg_atg, 2),
        "put": round(sg_put, 2),
    }


def estimate_dk_salary(scoring_avg, wins, top_tens, rank_index):
    """Estimate a DraftKings-style salary based on performance."""
    if isinstance(scoring_avg, str):
        try:
            scoring_avg = float(scoring_avg)
        except ValueError:
            scoring_avg = 71.0

    base = 7000
    # Better scoring average = higher salary
    base += int((71.5 - scoring_avg) * 2000)
    # Wins bonus
    base += int(wins) * 800
    # Top 10s bonus
    base += int(top_tens) * 200
    # Rank-based adjustment (higher ranked = higher salary)
    base += max(0, (40 - rank_index) * 50)
    # Clamp
    return max(5000, min(12500, round(base / 100) * 100))


def estimate_ownership(salary, rank_index):
    """Estimate projected ownership% based on salary and rank."""
    # Higher salary/rank = higher ownership
    base = max(2, 35 - rank_index * 0.8)
    # Salary modifier
    base *= (salary / 8000)
    return round(min(35, max(2, base)), 1)


def build_player_data(player_id, name_hint, rank_index):
    """Build complete player data object."""
    print(f"  [{rank_index+1}/{TOP_N_PLAYERS}] Fetching {name_hint}...", end=" ", flush=True)

    # Get player info
    info = get_player_info(player_id)
    if not info:
        info = {"name": name_hint, "country": "USA"}
    time.sleep(REQUEST_DELAY)

    # Get season stats
    stats = get_season_stats(player_id)
    time.sleep(REQUEST_DELAY)

    if not stats:
        print("SKIP (no stats)")
        return None

    # Get recent results and course history
    print("results...", end=" ", flush=True)
    form, course_hist = get_recent_results(player_id, max_events=10)

    if not form:
        # If no form data, create placeholder
        form = [20] * 10

    # Pad form to 10 entries if needed
    while len(form) < 10:
        form.append(30)

    form = form[:10]

    # Extract stats
    drive_dist = round(stats.get("yardsPerDrive", 295.0), 1)
    drive_acc = round(stats.get("driveAccuracyPct", 62.0), 1)
    gir_pct = round(stats.get("greensInRegPct", 67.0), 1)
    scramble = round(stats.get("savePct", 55.0), 1)
    birdies_rd = round(stats.get("birdiesPerRound", 3.8), 1)
    scoring_avg = stats.get("adjustedScoringAverage", 71.0)
    wins = stats.get("wins", 0)
    top_tens = stats.get("topTenFinishes", 0)
    rounds = stats.get("roundsPlayed", 0)

    # Estimate SG splits
    sg = estimate_strokes_gained(stats)

    # Estimate par 3/5 averages from available data
    # ESPN doesn't give these directly, estimate from scoring
    if isinstance(scoring_avg, (int, float)):
        par3_est = round(3.05 - sg["tot"] * 0.02, 2)
        par5_est = round(4.50 - sg["tot"] * 0.03, 2)
    else:
        par3_est = 3.05
        par5_est = 4.50

    # DK salary and ownership
    salary = estimate_dk_salary(scoring_avg, wins, top_tens, rank_index)
    ownership = estimate_ownership(salary, rank_index)

    player = {
        "id": rank_index + 1,
        "n": info["name"],
        "c": info["country"],
        "dk": salary,
        "own": ownership,
        "form": form,
        "ch": course_hist,
        "sg": sg,
        "dr": {"dist": round(drive_dist), "acc": drive_acc},
        "gir": gir_pct,
        "scr": scramble,
        "brd": birdies_rd,
        "par3": par3_est,
        "par5": par5_est,
    }

    events_played = stats.get("tournamentsPlayed", "?")
    print(f"OK ({events_played} events, {len(form)} results, SG:{sg['tot']:+.2f})")
    return player


def generate_data_js(players):
    """Generate the data.js file content."""
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    lines = []
    lines.append(f"// PGA Fantasy Model — Auto-generated from ESPN data")
    lines.append(f"// Generated: {now}")
    lines.append(f"// Players: {len(players)}")
    lines.append(f"//")
    lines.append(f"// Strokes gained values are ESTIMATED from available ESPN stats.")
    lines.append(f"// For precise SG data, supplement with DataGolf or PGA Tour stats.")
    lines.append(f"// DraftKings salaries are estimated — replace with real DK CSV export")
    lines.append(f"// before setting lineups. Download from DraftKings lobby → Export CSV.")
    lines.append(f"//")
    lines.append(f"// To manually adjust any values, edit them below and save.")
    lines.append(f"")
    lines.append(f"const PLAYERS = {json.dumps(players, indent=2)};")
    lines.append(f"")
    lines.append(f"const EVENTS = {json.dumps(TRACKED_EVENTS, indent=2)};")

    return "\n".join(lines)


def main():
    print("=" * 60)
    print("PGA Fantasy Model — Data Fetcher")
    print(f"Season: {SEASON} | Players: {TOP_N_PLAYERS}")
    print("=" * 60)
    print()

    players = []
    failed = []

    for i, (pid, name) in enumerate(TOP_PLAYER_IDS[:TOP_N_PLAYERS]):
        try:
            player = build_player_data(pid, name, i)
            if player:
                players.append(player)
            else:
                failed.append(name)
        except Exception as e:
            print(f"ERROR: {e}")
            failed.append(name)

    if not players:
        print("\nERROR: No player data fetched. Check your internet connection.")
        sys.exit(1)

    print(f"\n{'=' * 60}")
    print(f"Fetched {len(players)} players successfully")
    if failed:
        print(f"Failed: {', '.join(failed)}")

    # Write data.js
    output = generate_data_js(players)
    output_path = "data.js"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"Written to {output_path}")
    print(f"\nNext steps:")
    print(f"  1. Open the dashboard to verify: index.html")
    print(f"  2. (Optional) Replace dk/own values with real DraftKings CSV data")
    print(f"  3. Push to GitHub: git add data.js && git commit -m 'Weekly update' && git push")
    print()


if __name__ == "__main__":
    main()
