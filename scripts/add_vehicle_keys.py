"""Add vehicle.* translation keys to all four locales (placed before admin block)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "messages"

VEHICLE = {
    "en": {
        "title": "Your Ride",
        "subtitle": "You'll travel in Tilen's DS7 Crossback — a premium French SUV with quiet leather interiors, climate control, and panoramic windows for the Soča valley views.",
        "feat1Title": "Premium SUV",
        "feat1Desc": "Smooth, quiet ride for the long drives between the mountains and the coast.",
        "feat2Title": "Plenty of space",
        "feat2Desc": "Comfortable seating for up to 4 guests with full-size luggage room.",
        "feat3Title": "Climate-controlled",
        "feat3Desc": "Cool in summer, warm in winter — the journey is part of the experience.",
        "altExterior": "DS7 SUV at the Soča river",
        "altSide": "DS7 SUV side view by the Soča",
        "altInterior": "DS7 SUV interior dashboard",
        "altSeats": "DS7 SUV leather seats"
    },
    "sl": {
        "title": "Vaše vozilo",
        "subtitle": "Po Sloveniji vas bo vozil Tilenov DS7 Crossback — prestižni francoski SUV s tihimi usnjenimi sedeži, klimatsko napravo in panoramskimi okni za poglede v dolino Soče.",
        "feat1Title": "Vrhunski SUV",
        "feat1Desc": "Mirna in udobna vožnja na daljših razdaljah med gorami in obalo.",
        "feat2Title": "Veliko prostora",
        "feat2Desc": "Udobje za do 4 goste in dovolj prostora za prtljago.",
        "feat3Title": "Klimatska naprava",
        "feat3Desc": "Hladno poleti, toplo pozimi — pot je del doživetja.",
        "altExterior": "DS7 SUV ob reki Soči",
        "altSide": "DS7 SUV od strani ob Soči",
        "altInterior": "Notranjost DS7 SUV-ja",
        "altSeats": "Usnjeni sedeži DS7 SUV-ja"
    },
    "it": {
        "title": "Il tuo veicolo",
        "subtitle": "Viaggerai sulla DS7 Crossback di Tilen — un SUV premium francese con interni in pelle silenziosi, climatizzatore e finestrini panoramici per ammirare la valle dell'Isonzo.",
        "feat1Title": "SUV premium",
        "feat1Desc": "Una guida fluida e silenziosa sui lunghi tragitti tra montagna e costa.",
        "feat2Title": "Tanto spazio",
        "feat2Desc": "Sedili comodi per un massimo di 4 ospiti con ampio spazio per i bagagli.",
        "feat3Title": "Climatizzato",
        "feat3Desc": "Fresco d'estate, caldo d'inverno — il viaggio è parte dell'esperienza.",
        "altExterior": "SUV DS7 al fiume Isonzo",
        "altSide": "SUV DS7 di profilo all'Isonzo",
        "altInterior": "Interno cruscotto del DS7",
        "altSeats": "Sedili in pelle del DS7"
    },
    "de": {
        "title": "Ihr Fahrzeug",
        "subtitle": "Sie reisen in Tilens DS7 Crossback — einem französischen Premium-SUV mit ruhigen Lederinterieurs, Klimaanlage und Panoramafenstern für die Aussicht auf das Soča-Tal.",
        "feat1Title": "Premium-SUV",
        "feat1Desc": "Ruhige, komfortable Fahrt auf den langen Strecken zwischen Bergen und Küste.",
        "feat2Title": "Viel Platz",
        "feat2Desc": "Bequeme Sitze für bis zu 4 Gäste mit großzügigem Gepäckraum.",
        "feat3Title": "Klimatisiert",
        "feat3Desc": "Im Sommer kühl, im Winter warm — die Fahrt ist Teil des Erlebnisses.",
        "altExterior": "DS7 SUV an der Soča",
        "altSide": "DS7 SUV von der Seite an der Soča",
        "altInterior": "Armaturenbrett des DS7",
        "altSeats": "Ledersitze des DS7"
    },
}

for locale, payload in VEHICLE.items():
    path = ROOT / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    # rebuild dict with `vehicle` inserted right before `admin`
    new = {}
    for k, v in data.items():
        if k == "admin":
            new["vehicle"] = payload
        new[k] = v
    if "vehicle" not in new:
        new["vehicle"] = payload
    path.write_text(json.dumps(new, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {path.name}")
