"""Add music preference booking translation keys."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

NEW_KEYS = {
    "en": {
        "musicTitle": "Pick the vibe",
        "musicDesc": "What should the soundtrack be?",
        "musicChill": "Chill & acoustic",
        "musicUpbeat": "Upbeat & fun",
        "musicSlovenian": "Slovenian classics",
        "musicSurprise": "Surprise me",
        "musicSilence": "No music, please",
    },
    "sl": {
        "musicTitle": "Izberi vzdušje",
        "musicDesc": "Kakšno glasbo bi radi poslušali?",
        "musicChill": "Sproščujoče in akustično",
        "musicUpbeat": "Živahno in zabavno",
        "musicSlovenian": "Slovenske klasike",
        "musicSurprise": "Presenetite me",
        "musicSilence": "Brez glasbe, prosim",
    },
    "it": {
        "musicTitle": "Scegli l'atmosfera",
        "musicDesc": "Quale dovrebbe essere la colonna sonora?",
        "musicChill": "Rilassante e acustica",
        "musicUpbeat": "Allegra e divertente",
        "musicSlovenian": "Classici sloveni",
        "musicSurprise": "Sorprendimi",
        "musicSilence": "Niente musica, per favore",
    },
    "de": {
        "musicTitle": "Wähle die Stimmung",
        "musicDesc": "Welcher Soundtrack soll es sein?",
        "musicChill": "Entspannt & akustisch",
        "musicUpbeat": "Schwungvoll & lustig",
        "musicSlovenian": "Slowenische Klassiker",
        "musicSurprise": "Überrasche mich",
        "musicSilence": "Bitte keine Musik",
    },
}

ADMIN_KEYS = {
    "en": {"bookingMusic": "Music"},
    "sl": {"bookingMusic": "Glasba"},
    "it": {"bookingMusic": "Musica"},
    "de": {"bookingMusic": "Musik"},
}

for loc, additions in NEW_KEYS.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    data.setdefault("booking", {}).update(additions)
    data.setdefault("admin", {}).update(ADMIN_KEYS[loc])
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name}")
