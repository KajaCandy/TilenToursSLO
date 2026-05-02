"""Replace single 'vegetarianLabel' with per-person count title + help."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

NEW = {
    "en": {
        "vegetarianTitle": "Vegetarian snacks",
        "vegetarianHelp": "How many in your group prefer vegetarian?",
    },
    "sl": {
        "vegetarianTitle": "Vegetarijanski prigrizki",
        "vegetarianHelp": "Koliko oseb v skupini želi vegetarijanski obrok?",
    },
    "it": {
        "vegetarianTitle": "Spuntini vegetariani",
        "vegetarianHelp": "Quante persone del gruppo preferiscono vegetariano?",
    },
    "de": {
        "vegetarianTitle": "Vegetarische Snacks",
        "vegetarianHelp": "Wie viele in Ihrer Gruppe möchten vegetarisch?",
    },
}

for loc, additions in NEW.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    booking = data.get("booking", {})
    booking.pop("vegetarianLabel", None)
    booking.update(additions)
    data["booking"] = booking
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
