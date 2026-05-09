"""Add booking.phoneInvalid to all four locales."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "messages"
TRANSLATIONS = {
    "en": "Please enter a valid phone number.",
    "sl": "Vnesite veljavno telefonsko številko.",
    "it": "Inserisci un numero di telefono valido.",
    "de": "Bitte geben Sie eine gültige Telefonnummer ein.",
}
for locale, txt in TRANSLATIONS.items():
    path = ROOT / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["booking"]["phoneInvalid"] = txt
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {path.name}")
