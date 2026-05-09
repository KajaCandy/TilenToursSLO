"""Add seo.* keys (title, description, descriptionShort) to all four locales."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "messages"

SEO = {
    "en": {
        "title": "Tilen Tours Slovenia: One Day, Three Worlds",
        "description": "Private guided day tour from Ljubljana through the Soča Valley to the Adriatic coast. Small group, local guide, maximum 4 people.",
        "descriptionShort": "Private day tour: Ljubljana, Soča Valley, Adriatic. Max 4 people."
    },
    "sl": {
        "title": "Tilen Tours Slovenija: Trije svetovi v enem dnevu",
        "description": "Zasebni vodeni izlet iz Ljubljane skozi dolino Soče do jadranske obale. Manjša skupina, lokalni vodnik, največ 4 osebe.",
        "descriptionShort": "Zasebni izlet: Ljubljana, dolina Soče, Jadran. Največ 4 osebe."
    },
    "it": {
        "title": "Tilen Tours Slovenia: Tre mondi in un giorno",
        "description": "Tour privato guidato di un giorno da Lubiana attraverso la valle dell'Isonzo fino alla costa adriatica. Piccolo gruppo, guida locale, massimo 4 persone.",
        "descriptionShort": "Tour privato: Lubiana, valle Isonzo, Adriatico. Max 4 persone."
    },
    "de": {
        "title": "Tilen Tours Slowenien: Drei Welten an einem Tag",
        "description": "Private geführte Tagestour von Ljubljana durch das Soča-Tal bis zur Adriaküste. Kleine Gruppe, lokaler Guide, maximal 4 Personen.",
        "descriptionShort": "Private Tagestour: Ljubljana, Soča-Tal, Adria. Max. 4 Personen."
    },
}

for locale, payload in SEO.items():
    path = ROOT / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["seo"] = payload
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {path.name}")
