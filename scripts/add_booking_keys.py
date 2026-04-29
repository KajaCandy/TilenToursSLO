"""Add new booking translation keys for vegetarian, notes, advance notice."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

NEW_KEYS = {
    "en": {
        "advanceNotice": "Bookings must be made at least 2 days in advance.",
        "vegetarianLabel": "Make it vegetarian",
        "notesTitle": "Special requests (optional)",
        "notesPlaceholder": "Allergies, food preferences, or anything else we should know.",
    },
    "sl": {
        "advanceNotice": "Rezervacije morajo biti opravljene vsaj 2 dni vnaprej.",
        "vegetarianLabel": "Naredite vegetarijansko",
        "notesTitle": "Posebne želje (izbirno)",
        "notesPlaceholder": "Alergije, prehranske preference ali kar koli drugega, kar bi morali vedeti.",
    },
    "it": {
        "advanceNotice": "Le prenotazioni devono essere effettuate almeno 2 giorni in anticipo.",
        "vegetarianLabel": "Rendilo vegetariano",
        "notesTitle": "Richieste speciali (opzionale)",
        "notesPlaceholder": "Allergie, preferenze alimentari o qualsiasi altra cosa che dovremmo sapere.",
    },
    "de": {
        "advanceNotice": "Buchungen müssen mindestens 2 Tage im Voraus erfolgen.",
        "vegetarianLabel": "Vegetarisch machen",
        "notesTitle": "Besondere Wünsche (optional)",
        "notesPlaceholder": "Allergien, Essenspräferenzen oder andere Anmerkungen.",
    },
}

for loc, additions in NEW_KEYS.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data.setdefault("booking", {}).update(additions)
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
