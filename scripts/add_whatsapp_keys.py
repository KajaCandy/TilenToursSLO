"""Add WhatsApp button translation keys."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

KEYS = {
    "en": {
        "tooltip": "Questions? Chat with us",
        "aria": "Chat with us on WhatsApp",
        "prefill": "Hi! I have a question about the Tilen Tours day trip.",
    },
    "sl": {
        "tooltip": "Vprašanja? Pišite nam",
        "aria": "Klepetajte z nami na WhatsAppu",
        "prefill": "Pozdravljeni! Imam vprašanje glede izleta s Tilen Tours.",
    },
    "it": {
        "tooltip": "Domande? Scrivici",
        "aria": "Chatta con noi su WhatsApp",
        "prefill": "Ciao! Ho una domanda sul tour di Tilen Tours.",
    },
    "de": {
        "tooltip": "Fragen? Schreiben Sie uns",
        "aria": "Chatten Sie mit uns auf WhatsApp",
        "prefill": "Hallo! Ich habe eine Frage zur Tagestour von Tilen Tours.",
    },
}

for loc, additions in KEYS.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data["whatsapp"] = additions
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
