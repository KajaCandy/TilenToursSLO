export default function PrivacyDE() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-forest-900 mb-2">Datenschutzerklärung</h1>
      <p className="text-forest-500 text-sm mb-10">Letzte Aktualisierung: 8. Mai 2026</p>

      <h2>Verantwortlicher</h2>
      <p>
        <strong>Tilen Godeša s.p.</strong><br />
        Unec 117, 1381 Rakek, Slowenien<br />
        USt-IdNr.: SI34826696 · Reg.-Nr.: 9199349000<br />
        E-Mail: <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>
      </p>
      <p>
        Diese Datenschutzerklärung erklärt, wie Tilen Godeša s.p. (&quot;wir&quot;, &quot;Tilen Tours&quot;) Ihre personenbezogenen
        Daten erhebt, verwendet und schützt, wenn Sie die Website tilen-tours.com nutzen oder eine Tour buchen.
      </p>

      <h2>1. Erhobene Daten</h2>
      <ul>
        <li><strong>Buchungsdaten:</strong> Name, E-Mail, Telefonnummer, Tour-Datum, Gruppengröße, Ernährungswünsche (Anzahl vegetarischer Mahlzeiten), optionale Sonderwünsche, Musikwunsch.</li>
        <li><strong>Zahlungsdaten:</strong> ausschließlich von Stripe Payments Europe Ltd verarbeitet. Wir sehen oder speichern keine Kartennummern; Stripe übermittelt uns nur die Zahlungsbestätigung und die letzten 4 Stellen der Karte.</li>
        <li><strong>Technische Daten:</strong> IP-Adresse, Browsertyp, Spracheinstellung. Werden nur zur Auslieferung der Website verwendet. Wir setzen keine Analyse-, Werbe- oder Tracking-Tools ein.</li>
      </ul>

      <h2>2. Verarbeitungszwecke (Rechtsgrundlage)</h2>
      <ul>
        <li>Vorbereitung und Durchführung der gebuchten Tour — <em>Vertragserfüllung</em>, Art. 6 Abs. 1 lit. b DSGVO.</li>
        <li>Versand von Buchungsbestätigungen und Vor-Tour-Informationen per E-Mail — <em>Vertragserfüllung</em>.</li>
        <li>Erfüllung slowenischer Steuer- und Buchhaltungspflichten (10 Jahre Aufbewahrung von Rechnungen) — <em>rechtliche Verpflichtung</em>, Art. 6 Abs. 1 lit. c DSGVO.</li>
      </ul>

      <h2>3. Empfänger der Daten</h2>
      <p>Wir nutzen folgende Auftragsverarbeiter mit DSGVO-konformen Verarbeitungsverträgen:</p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd</strong> — Zahlungsabwicklung</li>
        <li><strong>Resend, Inc.</strong> — Versand transaktionaler E-Mails</li>
        <li><strong>Neon, Inc.</strong> — Datenbank-Hosting (EU-Region)</li>
        <li><strong>Netlify, Inc.</strong> — Website-Hosting</li>
      </ul>
      <p>Wir verkaufen Ihre Daten nicht und geben sie nicht zu Marketingzwecken weiter.</p>

      <h2>4. Speicherdauer</h2>
      <ul>
        <li>Buchungs- und Rechnungsdaten: 10 Jahre (slowenisches Steuerrecht).</li>
        <li>E-Mail-Korrespondenz: bis zu 3 Jahre nach letztem Kontakt, danach gelöscht.</li>
        <li>Technische Logs: 30 Tage.</li>
      </ul>

      <h2>5. Ihre Rechte nach DSGVO</h2>
      <ul>
        <li><strong>Auskunftsrecht</strong> — Kopie der über Sie gespeicherten Daten.</li>
        <li><strong>Recht auf Berichtigung</strong> unrichtiger Daten.</li>
        <li><strong>Recht auf Löschung</strong> (vorbehaltlich der oben genannten gesetzlichen Aufbewahrungsfristen).</li>
        <li><strong>Recht auf Einschränkung oder Widerspruch</strong> der Verarbeitung.</li>
        <li><strong>Recht auf Datenübertragbarkeit</strong>.</li>
        <li><strong>Beschwerderecht</strong> bei der slowenischen Datenschutzbehörde (<a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer">www.ip-rs.si</a>).</li>
      </ul>
      <p>Bitte richten Sie jede Anfrage an <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>. Wir antworten innerhalb von 30 Tagen.</p>

      <h2>6. Cookies</h2>
      <p>Wir setzen ausschließlich technisch notwendige Cookies:</p>
      <ul>
        <li><strong>Spracheinstellung</strong> — speichert die gewählte Sprache (gesetzt durch next-intl).</li>
        <li><strong>Stripe-Checkout-Sitzung</strong> — wird ausschließlich während des Bezahlvorgangs von checkout.stripe.com gesetzt.</li>
        <li><strong>Admin-Authentifizierung</strong> — nur für berechtigte Admin-Nutzer.</li>
      </ul>
      <p>Wir verwenden keine Tracking-, Analyse- oder Werbe-Cookies. Für technisch notwendige Cookies ist nach DSGVO und ePrivacy-Richtlinie keine vorherige Einwilligung erforderlich.</p>

      <h2>7. Änderungen</h2>
      <p>Diese Erklärung kann gelegentlich aktualisiert werden. Das Datum &quot;Letzte Aktualisierung&quot; oben gibt die aktuelle Fassung wieder.</p>
    </>
  );
}
