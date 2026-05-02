"""Drop Couchsurfing-specific keys; keep only what the new UI uses."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

REVIEWS_KEYS = {
    "en": {
        "eyebrow": "Real guests, real words",
        "title": "Stories from the road",
        "subtitle": "A few of the people Tilen has shown around Slovenia, in their own words.",
    },
    "sl": {
        "eyebrow": "Pravi gostje, pravi občutki",
        "title": "Zgodbe s poti",
        "subtitle": "Nekaj ljudi, ki jih je Tilen popeljal po Sloveniji - povedano z njihovimi besedami.",
    },
    "it": {
        "eyebrow": "Ospiti veri, parole vere",
        "title": "Storie dalla strada",
        "subtitle": "Alcune persone che Tilen ha accompagnato in giro per la Slovenia, nelle loro parole.",
    },
    "de": {
        "eyebrow": "Echte Gäste, echte Worte",
        "title": "Geschichten von unterwegs",
        "subtitle": "Ein paar Menschen, die Tilen durch Slowenien geführt hat - in ihren eigenen Worten.",
    },
}

for loc, additions in REVIEWS_KEYS.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data["reviews"] = additions
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
