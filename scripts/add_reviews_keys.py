"""Add Reviews section translation keys."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

REVIEWS_KEYS = {
    "en": {
        "eyebrow": "Real guests, real words",
        "title": "Stories from the road",
        "subtitle": "A few of the people Tilen has hosted and shown around Slovenia, in their own words.",
        "badge": "Would Stay Again",
        "source": "All reviews originally posted on Couchsurfing.",
    },
    "sl": {
        "eyebrow": "Pravi gostje, pravi občutki",
        "title": "Zgodbe s poti",
        "subtitle": "Nekaj ljudi, ki jih je Tilen gostil in popeljal po Sloveniji - povedano z njihovimi besedami.",
        "badge": "Bi spet ostal",
        "source": "Vsi komentarji so bili prvotno objavljeni na Couchsurfingu.",
    },
    "it": {
        "eyebrow": "Ospiti veri, parole vere",
        "title": "Storie dalla strada",
        "subtitle": "Alcune persone che Tilen ha ospitato e accompagnato in giro per la Slovenia, nelle loro parole.",
        "badge": "Tornerei di nuovo",
        "source": "Tutte le recensioni sono state originariamente pubblicate su Couchsurfing.",
    },
    "de": {
        "eyebrow": "Echte Gäste, echte Worte",
        "title": "Geschichten von unterwegs",
        "subtitle": "Ein paar Menschen, die Tilen beherbergt und durch Slowenien geführt hat - in ihren eigenen Worten.",
        "badge": "Würde wiederkommen",
        "source": "Alle Bewertungen wurden ursprünglich auf Couchsurfing veröffentlicht.",
    },
}

NAV_KEYS = {
    "en": {"reviews": "Reviews"},
    "sl": {"reviews": "Mnenja"},
    "it": {"reviews": "Recensioni"},
    "de": {"reviews": "Bewertungen"},
}

for loc, additions in REVIEWS_KEYS.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data["reviews"] = additions
    data.setdefault("nav", {}).update(NAV_KEYS[loc])
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
