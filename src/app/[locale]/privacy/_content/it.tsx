export default function PrivacyIT() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-forest-900 mb-2">Informativa sulla privacy</h1>
      <p className="text-forest-500 text-sm mb-10">Ultimo aggiornamento: 8 maggio 2026</p>

      <h2>Titolare del trattamento</h2>
      <p>
        <strong>Tilen Godeša s.p.</strong><br />
        Unec 117, 1381 Rakek, Slovenia<br />
        P. IVA: SI34826696 · Reg.: 9199349000<br />
        E-mail: <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>
      </p>
      <p>
        La presente informativa spiega come Tilen Godeša s.p. (&quot;noi&quot;, &quot;Tilen Tours&quot;) raccoglie, utilizza e
        protegge i suoi dati personali quando utilizza il sito tilen-tours.com o prenota un tour.
      </p>

      <h2>1. Dati raccolti</h2>
      <ul>
        <li><strong>Dati di prenotazione:</strong> nome e cognome, e-mail, telefono, data del tour, dimensione del gruppo, preferenze alimentari (numero di pasti vegetariani), eventuali richieste particolari, preferenza musicale.</li>
        <li><strong>Dati di pagamento:</strong> gestiti integralmente da Stripe Payments Europe Ltd. Non vediamo né conserviamo il numero della carta; Stripe ci invia solo conferma del pagamento riuscito e le ultime 4 cifre della carta.</li>
        <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, lingua. Utilizzati esclusivamente per il funzionamento del sito. Non utilizziamo strumenti di analisi, pubblicità o tracciamento.</li>
      </ul>

      <h2>2. Perché li raccogliamo (base giuridica)</h2>
      <ul>
        <li>Per organizzare ed erogare il tour prenotato — <em>esecuzione di un contratto</em>, art. 6(1)(b) GDPR.</li>
        <li>Per inviare conferme di prenotazione e informazioni pre-tour via e-mail — <em>esecuzione di un contratto</em>.</li>
        <li>Per adempiere agli obblighi fiscali e contabili sloveni, che richiedono la conservazione dei documenti contabili per 10 anni — <em>obbligo di legge</em>, art. 6(1)(c) GDPR.</li>
      </ul>

      <h2>3. Destinatari dei dati</h2>
      <p>Utilizziamo i seguenti responsabili del trattamento, tutti vincolati da accordi conformi al GDPR:</p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd</strong> — elaborazione dei pagamenti</li>
        <li><strong>Resend, Inc.</strong> — invio di e-mail transazionali</li>
        <li><strong>Neon, Inc.</strong> — hosting del database (regione UE)</li>
        <li><strong>Netlify, Inc.</strong> — hosting del sito web</li>
      </ul>
      <p>Non vendiamo i suoi dati né li condividiamo per fini di marketing.</p>

      <h2>4. Tempi di conservazione</h2>
      <ul>
        <li>Prenotazioni e fatture: 10 anni (legge fiscale slovena).</li>
        <li>Corrispondenza e-mail: fino a 3 anni dall&apos;ultimo contatto, poi cancellata.</li>
        <li>Log tecnici: 30 giorni.</li>
      </ul>

      <h2>5. I suoi diritti ai sensi del GDPR</h2>
      <ul>
        <li><strong>Diritto di accesso</strong> ai propri dati.</li>
        <li><strong>Diritto di rettifica</strong> dei dati inesatti.</li>
        <li><strong>Diritto alla cancellazione</strong> (entro i limiti degli obblighi legali sopra indicati).</li>
        <li><strong>Diritto di limitare od opporsi</strong> al trattamento.</li>
        <li><strong>Diritto alla portabilità</strong> dei dati.</li>
        <li><strong>Diritto di reclamo</strong> presso l&apos;Autorità slovena per la protezione dei dati (<a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer">www.ip-rs.si</a>).</li>
      </ul>
      <p>Per esercitare un diritto, scriva a <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>. Rispondiamo entro 30 giorni.</p>

      <h2>6. Cookie</h2>
      <p>Utilizziamo solo cookie strettamente necessari:</p>
      <ul>
        <li><strong>Preferenza di lingua</strong> — memorizza la lingua scelta (impostato da next-intl).</li>
        <li><strong>Sessione di pagamento Stripe</strong> — impostato da checkout.stripe.com solo durante il pagamento.</li>
        <li><strong>Autenticazione amministratore</strong> — solo per utenti amministratori autorizzati.</li>
      </ul>
      <p>Non utilizziamo cookie di tracciamento, analisi o pubblicità. I cookie strettamente necessari non richiedono consenso preventivo ai sensi del GDPR e della direttiva ePrivacy.</p>

      <h2>7. Modifiche</h2>
      <p>L&apos;informativa può essere aggiornata. La data &quot;Ultimo aggiornamento&quot; in alto riflette la versione attuale.</p>
    </>
  );
}
