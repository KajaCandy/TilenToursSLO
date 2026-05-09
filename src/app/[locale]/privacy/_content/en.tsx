export default function PrivacyEN() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-forest-900 mb-2">Privacy Policy</h1>
      <p className="text-forest-500 text-sm mb-10">Last updated: 8 May 2026</p>

      <h2>Data controller</h2>
      <p>
        <strong>Tilen Godeša s.p.</strong><br />
        Unec 117, 1381 Rakek, Slovenia<br />
        VAT ID: SI34826696 · Registration: 9199349000<br />
        Email: <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>
      </p>
      <p>
        This privacy policy explains how Tilen Godeša s.p. (&quot;we&quot;, &quot;us&quot;, &quot;Tilen Tours&quot;) collects,
        uses and protects your personal data when you use the website tilen-tours.com or book a tour.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li><strong>Booking information you submit:</strong> full name, email address, phone number, tour date, group size, dietary preferences (vegetarian count), optional notes / special requests, music preference.</li>
        <li><strong>Payment information:</strong> handled entirely by Stripe Payments Europe Ltd. We never see or store your full card number; Stripe sends us only confirmation that payment succeeded plus the last 4 digits of the card.</li>
        <li><strong>Technical data:</strong> IP address, browser type, language preference. Used only to deliver the site. We do not run analytics, advertising or tracking tools.</li>
      </ul>

      <h2>2. Why we collect it (legal basis)</h2>
      <ul>
        <li>To prepare and deliver the tour you booked - <em>performance of contract</em>, GDPR Art. 6(1)(b).</li>
        <li>To send booking confirmation and pre-tour information by email - <em>performance of contract</em>.</li>
        <li>To comply with Slovenian tax and accounting law, which requires retention of invoice records for 10 years - <em>legal obligation</em>, GDPR Art. 6(1)(c).</li>
      </ul>

      <h2>3. Who we share data with</h2>
      <p>We use the following processors, all bound by EU-compatible Data Processing Agreements:</p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd</strong> - payment processing</li>
        <li><strong>Resend, Inc.</strong> - transactional email delivery</li>
        <li><strong>Neon, Inc.</strong> - database hosting (EU region)</li>
        <li><strong>Netlify, Inc.</strong> - website hosting</li>
      </ul>
      <p>We never sell your data and we never share it with anyone for marketing purposes.</p>

      <h2>4. How long we keep it</h2>
      <ul>
        <li>Booking and invoice records: 10 years (Slovenian Tax Procedure Act).</li>
        <li>Email correspondence: up to 3 years from last contact, then deleted.</li>
        <li>Technical/server logs: 30 days.</li>
      </ul>

      <h2>5. Your rights under GDPR</h2>
      <ul>
        <li><strong>Right of access</strong> - request a copy of the data we hold about you.</li>
        <li><strong>Right of rectification</strong> - correct inaccurate data.</li>
        <li><strong>Right of erasure</strong> - delete data we hold about you (subject to legal retention obligations above).</li>
        <li><strong>Right to restrict or object</strong> to processing.</li>
        <li><strong>Right of data portability</strong> - receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to lodge a complaint</strong> with the Slovenian Information Commissioner (<a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer">Informacijski pooblaščenec</a>).</li>
      </ul>
      <p>To exercise any of these rights, email <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>. We respond within 30 days.</p>

      <h2>6. Cookies</h2>
      <p>We use only strictly necessary cookies:</p>
      <ul>
        <li><strong>Locale preference</strong> - remembers your chosen language (set by next-intl).</li>
        <li><strong>Stripe checkout session</strong> - set by checkout.stripe.com only during the payment flow.</li>
        <li><strong>Admin authentication</strong> - used only for authorised admin users.</li>
      </ul>
      <p>
        We do not use any tracking, analytics or advertising cookies. Under GDPR and the ePrivacy Directive,
        strictly necessary cookies do not require prior consent.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>We may update this policy occasionally. The &quot;Last updated&quot; date at the top reflects the current version.</p>
    </>
  );
}
