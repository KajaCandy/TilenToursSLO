"""Add faq.* keys (used by FAQPage JSON-LD) to all four locales."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "messages"

FAQ = {
    "en": {
        "title": "Frequently asked questions",
        "items": [
            {"q": "How long does the tour take?", "a": "Approximately 10 hours, from 07:00 pickup in Ljubljana until 17:15 return."},
            {"q": "Where does the tour start and end?", "a": "Tilen picks you up at an agreed Ljubljana meeting point and returns you there at the end of the day."},
            {"q": "What is the maximum group size?", "a": "Maximum 4 guests. The tour is always private; you will not be combined with other groups."},
            {"q": "What does the tour cost?", "a": "€130 per person. The optional homemade snack is +€10 per person. The dog kennel is free."},
            {"q": "What languages does the guide speak?", "a": "Slovenian and English."},
            {"q": "Is lunch included?", "a": "No. We stop at a local restaurant where guests order individually. The optional homemade snack at €10/person is separate."},
            {"q": "Can I bring a dog?", "a": "Yes, a dog transport kennel is provided free of charge. Please mention the dog at booking."},
            {"q": "What is the cancellation policy?", "a": "4 or more days before the tour: 100% refund. Less than 4 days before: 70% refund. If Tilen Tours has to cancel (e.g. severe weather, vehicle issue), you receive a full refund or can reschedule."},
            {"q": "How far in advance must I book?", "a": "Bookings must be made at least 2 days in advance through tilen-tours.com."}
        ]
    },
    "sl": {
        "title": "Pogosta vprašanja",
        "items": [
            {"q": "Koliko časa traja izlet?", "a": "Približno 10 ur, od prevzema v Ljubljani ob 07:00 do vrnitve ob 17:15."},
            {"q": "Kje se izlet začne in konča?", "a": "Tilen vas prevzame na dogovorjeni lokaciji v Ljubljani in vas tja na koncu dneva tudi vrne."},
            {"q": "Kakšno je največje število potnikov?", "a": "Največ 4 gostje. Izlet je vedno zaseben; ne združujemo vas z drugimi skupinami."},
            {"q": "Koliko stane izlet?", "a": "130 EUR na osebo. Domač prigrizek po izbiri stane dodatnih 10 EUR na osebo. Pasja kletka je brezplačna."},
            {"q": "V katerih jezikih govori vodnik?", "a": "Slovensko in angleško."},
            {"q": "Je kosilo vključeno?", "a": "Ne. Ustavimo se v lokalni restavraciji, kjer vsak gost naroči po svoji izbiri. Domač prigrizek po 10 EUR/osebo je ločeno na voljo."},
            {"q": "Lahko pripeljem psa?", "a": "Da, na voljo je brezplačna pasja transportna kletka. Prosimo, da psa omenite ob rezervaciji."},
            {"q": "Kakšen je rok za odpoved?", "a": "Štiri dni ali več pred izletom: 100 % vračilo. Manj kot 4 dni pred izletom: 70 % vračilo. Če izlet odpove Tilen Tours (npr. neurje, okvara vozila), prejmete polno vračilo ali drug termin."},
            {"q": "Koliko vnaprej moram rezervirati?", "a": "Rezervacije so možne najmanj 2 dni vnaprej prek tilen-tours.com."}
        ]
    },
    "it": {
        "title": "Domande frequenti",
        "items": [
            {"q": "Quanto dura il tour?", "a": "Circa 10 ore, dal ritiro a Lubiana alle 07:00 fino al rientro alle 17:15."},
            {"q": "Dove inizia e finisce il tour?", "a": "Tilen ti viene a prendere in un punto concordato a Lubiana e ti riaccompagna lì alla fine della giornata."},
            {"q": "Qual è la dimensione massima del gruppo?", "a": "Massimo 4 ospiti. Il tour è sempre privato; non sarete uniti ad altri gruppi."},
            {"q": "Quanto costa il tour?", "a": "130 EUR a persona. Lo snack fatto in casa opzionale costa 10 EUR a persona in più. Il trasportino per cani è gratuito."},
            {"q": "Che lingue parla la guida?", "a": "Sloveno e inglese."},
            {"q": "Il pranzo è incluso?", "a": "No. Ci fermiamo in un ristorante locale dove ogni ospite ordina individualmente. Lo snack fatto in casa a 10 EUR/persona è opzionale e separato."},
            {"q": "Posso portare un cane?", "a": "Sì, un trasportino per cani è fornito gratuitamente. Si prega di indicare il cane al momento della prenotazione."},
            {"q": "Qual è la politica di cancellazione?", "a": "4 o più giorni prima del tour: rimborso del 100%. Meno di 4 giorni prima: rimborso del 70%. Se Tilen Tours deve cancellare (maltempo, problemi al veicolo), riceverai un rimborso completo o potrai riprogrammare."},
            {"q": "Con quanto anticipo devo prenotare?", "a": "Le prenotazioni devono essere effettuate almeno 2 giorni prima tramite tilen-tours.com."}
        ]
    },
    "de": {
        "title": "Häufig gestellte Fragen",
        "items": [
            {"q": "Wie lange dauert die Tour?", "a": "Etwa 10 Stunden, von der Abholung in Ljubljana um 07:00 Uhr bis zur Rückkehr um 17:15 Uhr."},
            {"q": "Wo beginnt und endet die Tour?", "a": "Tilen holt Sie an einem vereinbarten Treffpunkt in Ljubljana ab und bringt Sie am Ende des Tages dorthin zurück."},
            {"q": "Wie groß ist die maximale Gruppe?", "a": "Maximal 4 Gäste. Die Tour ist immer privat; Sie werden nicht mit anderen Gruppen zusammengelegt."},
            {"q": "Was kostet die Tour?", "a": "130 EUR pro Person. Der optionale hausgemachte Snack kostet zusätzlich 10 EUR pro Person. Die Hundebox ist kostenlos."},
            {"q": "Welche Sprachen spricht der Guide?", "a": "Slowenisch und Englisch."},
            {"q": "Ist Mittagessen inbegriffen?", "a": "Nein. Wir halten an einem lokalen Restaurant, wo jeder Gast individuell bestellt. Der optionale hausgemachte Snack zu 10 EUR/Person ist separat erhältlich."},
            {"q": "Darf ich einen Hund mitbringen?", "a": "Ja, eine Hundetransportbox wird kostenlos bereitgestellt. Bitte erwähnen Sie den Hund bei der Buchung."},
            {"q": "Wie sind die Stornierungsbedingungen?", "a": "4 oder mehr Tage vor der Tour: 100 % Rückerstattung. Weniger als 4 Tage davor: 70 % Rückerstattung. Wenn Tilen Tours absagen muss (z. B. Unwetter, Fahrzeugproblem), erhalten Sie eine vollständige Rückerstattung oder können umbuchen."},
            {"q": "Wie weit im Voraus muss ich buchen?", "a": "Buchungen müssen mindestens 2 Tage im Voraus über tilen-tours.com erfolgen."}
        ]
    },
}

for locale, payload in FAQ.items():
    path = ROOT / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["faq"] = payload
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {path.name}")
