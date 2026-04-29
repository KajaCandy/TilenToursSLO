"""Strip em dashes and add clock-time estimates to itinerary in all locales."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

CLOCK_TIMES = [
    "07:00",
    "08:30",
    "09:45",
    "11:15",
    "12:15",
    "13:15",
    "14:45",
    "15:45",
    "17:15",
]

def fix_em_dashes(s: str) -> str:
    return s.replace(" — ", ", ").replace("—", ",")

def walk_strings(obj, fn):
    if isinstance(obj, dict):
        return {k: walk_strings(v, fn) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk_strings(v, fn) for v in obj]
    if isinstance(obj, str):
        return fn(obj)
    return obj

for fp in MESSAGES_DIR.glob("*.json"):
    data = json.loads(fp.read_text(encoding="utf-8"))
    data = walk_strings(data, fix_em_dashes)
    steps = data.get("itinerary", {}).get("steps", [])
    for i, step in enumerate(steps):
        if i < len(CLOCK_TIMES):
            step["time"] = CLOCK_TIMES[i]
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
