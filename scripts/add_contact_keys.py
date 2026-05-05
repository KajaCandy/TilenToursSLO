"""Add Contact CTA translation keys + drop the obsolete chat keys."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

CONTACT = {
    "en": {
        "title": "Contact Tilen for more info",
        "subtitle": "Custom dates, dietary needs, group questions — Tilen will reply personally, usually within a few hours.",
        "whatsapp": "Message on WhatsApp",
        "email": "Send an email",
    },
    "sl": {
        "title": "Vprašajte Tilna za več informacij",
        "subtitle": "Drugi datumi, prehranske posebnosti, vprašanja o skupini — Tilen vam osebno odgovori, običajno v nekaj urah.",
        "whatsapp": "Sporočilo prek WhatsAppa",
        "email": "Pošlji e-pošto",
    },
    "it": {
        "title": "Contatta Tilen per maggiori informazioni",
        "subtitle": "Date personalizzate, esigenze alimentari, domande sul gruppo — Tilen risponde personalmente, di solito in poche ore.",
        "whatsapp": "Scrivi su WhatsApp",
        "email": "Invia un'email",
    },
    "de": {
        "title": "Kontaktieren Sie Tilen für mehr Infos",
        "subtitle": "Andere Termine, Ernährungswünsche, Gruppenfragen — Tilen antwortet persönlich, meist innerhalb weniger Stunden.",
        "whatsapp": "WhatsApp-Nachricht",
        "email": "E-Mail senden",
    },
}

for loc, additions in CONTACT.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data["contact"] = additions
    # The Anthropic-powered chat widget has been removed.
    data.pop("chat", None)
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
