export default function PrivacySL() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-forest-900 mb-2">Politika zasebnosti</h1>
      <p className="text-forest-500 text-sm mb-10">Zadnja posodobitev: 8. maj 2026</p>

      <h2>Upravljavec osebnih podatkov</h2>
      <p>
        <strong>Tilen Godeša s.p.</strong><br />
        Unec 117, 1381 Rakek<br />
        Davčna številka: SI34826696 · Matična: 9199349000<br />
        E-pošta: <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>
      </p>
      <p>
        Ta politika zasebnosti pojasnjuje, kako Tilen Godeša s.p. (&quot;mi&quot;, &quot;Tilen Tours&quot;) zbira, uporablja in
        varuje vaše osebne podatke, kadar uporabljate spletno mesto tilen-tours.com ali rezervirate izlet.
      </p>

      <h2>1. Podatki, ki jih zbiramo</h2>
      <ul>
        <li><strong>Podatki o rezervaciji, ki jih posredujete:</strong> ime in priimek, e-poštni naslov, telefonska številka, datum izleta, velikost skupine, prehranske preference (število vegetarijanskih obrokov), neobvezne posebne želje, želja glede glasbe.</li>
        <li><strong>Plačilni podatki:</strong> obdeluje izključno Stripe Payments Europe Ltd. Nikoli ne vidimo ali shranjujemo številke vaše kartice. Stripe nam pošlje le potrditev uspešnega plačila in zadnje 4 številke kartice.</li>
        <li><strong>Tehnični podatki:</strong> IP-naslov, vrsta brskalnika, jezikovne nastavitve. Uporabljamo jih izključno za delovanje spletnega mesta. Ne uporabljamo orodij za analitiko, oglaševanje ali sledenje.</li>
      </ul>

      <h2>2. Zakaj jih zbiramo (pravna podlaga)</h2>
      <ul>
        <li>Za pripravo in izvedbo rezerviranega izleta - <em>izvajanje pogodbe</em>, 6. člen, prvi odstavek, točka (b) Splošne uredbe o varstvu podatkov (GDPR).</li>
        <li>Za pošiljanje potrdila o rezervaciji in informacij pred izletom po e-pošti - <em>izvajanje pogodbe</em>.</li>
        <li>Za izpolnjevanje davčnih in računovodskih obveznosti, ki zahtevajo hrambo računov 10 let - <em>zakonska obveznost</em>, 6. člen, prvi odstavek, točka (c) GDPR.</li>
      </ul>

      <h2>3. Komu posredujemo podatke</h2>
      <p>Uporabljamo naslednje obdelovalce, ki so vezani s pogodbami o obdelavi osebnih podatkov, skladnimi s pravom EU:</p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd</strong> - obdelava plačil</li>
        <li><strong>Resend, Inc.</strong> - pošiljanje transakcijskih e-poštnih sporočil</li>
        <li><strong>Neon, Inc.</strong> - gostovanje baze podatkov (regija EU)</li>
        <li><strong>Netlify, Inc.</strong> - gostovanje spletnega mesta</li>
      </ul>
      <p>Vaših podatkov ne prodajamo in jih ne posredujemo nikomur za namene trženja.</p>

      <h2>4. Koliko časa hranimo podatke</h2>
      <ul>
        <li>Podatki o rezervacijah in računi: 10 let (Zakon o davčnem postopku).</li>
        <li>E-poštna korespondenca: do 3 leta od zadnjega stika, nato izbrisana.</li>
        <li>Tehnični/strežniški dnevniki: 30 dni.</li>
      </ul>

      <h2>5. Vaše pravice po GDPR</h2>
      <ul>
        <li><strong>Pravica do dostopa</strong> - zahtevate kopijo podatkov, ki jih hranimo o vas.</li>
        <li><strong>Pravica do popravka</strong> - popravek netočnih podatkov.</li>
        <li><strong>Pravica do izbrisa</strong> - izbris podatkov, ki jih hranimo o vas (ob upoštevanju zgornjih zakonsko predpisanih rokov hrambe).</li>
        <li><strong>Pravica do omejitve ali ugovora</strong> obdelavi.</li>
        <li><strong>Pravica do prenosljivosti podatkov</strong> - prejmete svoje podatke v strukturirani in strojno berljivi obliki.</li>
        <li><strong>Pravica do pritožbe</strong> pri Informacijskem pooblaščencu RS (<a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer">www.ip-rs.si</a>).</li>
      </ul>
      <p>Za uveljavljanje katere koli pravice nam pišite na <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a>. Odgovorimo v 30 dneh.</p>

      <h2>6. Piškotki</h2>
      <p>Uporabljamo izključno nujno potrebne piškotke:</p>
      <ul>
        <li><strong>Jezikovna nastavitev</strong> - zapomni si izbrani jezik (nastavi next-intl).</li>
        <li><strong>Stripe seja za plačilo</strong> - nastavi checkout.stripe.com samo med postopkom plačila.</li>
        <li><strong>Avtentikacija skrbnika</strong> - uporabljena le pri pooblaščenih skrbniških uporabnikih.</li>
      </ul>
      <p>
        Ne uporabljamo piškotkov za sledenje, analitiko ali oglaševanje. V skladu z GDPR in direktivo o e-zasebnosti
        za nujno potrebne piškotke ni potrebno predhodno soglasje.
      </p>

      <h2>7. Spremembe te politike</h2>
      <p>Politiko lahko občasno posodobimo. Datum &quot;Zadnja posodobitev&quot; na vrhu odraža trenutno različico.</p>
    </>
  );
}
