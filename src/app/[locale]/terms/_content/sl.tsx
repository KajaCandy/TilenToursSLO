export default function TermsSL() {
  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl text-forest-900 mb-2">Splošni pogoji rezervacije</h1>
      <p className="text-forest-500 text-sm mb-10">Zadnja posodobitev: 8. maj 2026</p>

      <p>
        Ti pogoji urejajo rezervacijo in udeležbo na izletih, ki jih izvaja{" "}
        <strong>Tilen Godeša s.p.</strong>, Unec 117, 1381 Rakek
        (DDV SI34826696, matična 9199349000), pod blagovno znamko &quot;Tilen Tours&quot;.
      </p>

      <h2>1. Izlet</h2>
      <ul>
        <li>Celodnevni vodeni izlet po Sloveniji: Ljubljana → Soška dolina → jadranska obala → Ljubljana.</li>
        <li>Trajanje: približno 10 ur (07:00 - 17:15).</li>
        <li>Velikost skupine: 2 do 4 osebe.</li>
        <li>Cena: 130 € na osebo. Neobvezni domači prigrizek: 10 € na osebo. Pasji boks vključen brezplačno.</li>
        <li>Jezika vodenja: slovenski, angleški.</li>
      </ul>

      <h2>2. Kaj je vključeno / ni vključeno</h2>
      <p><strong>Vključeno:</strong> zasebno vodenje, ves prevoz med Ljubljano in navedenimi destinacijami, prevzem in odlog na dogovorjeni točki v Ljubljani, lokalni komentar.</p>
      <p><strong>Ni vključeno:</strong> kosilo (neobvezen postanek v restavraciji, naročilo posameznika), vstopnine za neobvezne znamenitosti (npr. Blejski grad), napitnine, potovalno zavarovanje.</p>

      <h2>3. Rezervacija in plačilo</h2>
      <p>
        Rezervacije potekajo prek tilen-tours.com. Plačilo se izvede v celoti ob rezervaciji prek storitve Stripe.
        Rezervacijo je treba opraviti najmanj 2 dni pred izletom.
      </p>

      <h2>4. Odpoved in vračilo kupnine</h2>
      <ul>
        <li><strong>4 dni ali več pred izletom:</strong> 100-odstotno vračilo.</li>
        <li><strong>Manj kot 4 dni pred izletom:</strong> 70-odstotno vračilo.</li>
        <li><strong>Odpoved s strani Tilen Tours</strong> (npr. bolezen, neugodne vremenske razmere, okvara vozila): 100-odstotno vračilo ali prestavitev termina po vaši izbiri.</li>
        <li>Vračila se izvršijo na isti način plačila, uporabljen ob rezervaciji, v 14 dneh.</li>
      </ul>

      <h2>5. Pravica do odstopa od pogodbe (potrošniki)</h2>
      <p>
        Gre za pogodbo o izvedbi storitve na določen datum in uro. V skladu z Zakonom o varstvu potrošnikov (ZVPot)
        in Direktivo EU 2011/83/EU se 14-dnevna pravica do odstopa ne nanaša na storitve prostočasnih dejavnosti,
        vezane na določen datum ali obdobje. Odpoved ureja izključno 4. točka zgoraj.
      </p>

      <h2>6. Odgovornost</h2>
      <p>
        Tilen Tours odgovarja izključno za neposredno škodo, povzročeno z veliko malomarnostjo ali namernim ravnanjem.
        Ne odgovarjamo za:
      </p>
      <ul>
        <li>posredno ali posledično škodo,</li>
        <li>izgubo osebnih predmetov,</li>
        <li>zamude zaradi vremena, prometa ali tretjih oseb,</li>
        <li>nesreče, ki niso posledica naše malomarnosti.</li>
      </ul>
      <p>Udeleženci sodelujejo na izletu na lastno odgovornost. Močno priporočamo osebno potovalno zavarovanje.</p>

      <h2>7. Obveznosti udeleženca</h2>
      <ul>
        <li>Biti na dogovorjenem mestu prevzema ob dogovorjenem času.</li>
        <li>Posredovati točne podatke za rezervacijo.</li>
        <li>Upoštevati razumna varnostna navodila vodnika.</li>
        <li>Plačati morebitno škodo, povzročeno namerno.</li>
      </ul>

      <h2>8. Izvensodno reševanje sporov</h2>
      <p>
        Zavezujemo se k mirnemu reševanju morebitnih sporov. Če sporazuma ne dosežemo, se lahko obrnete na
        evropsko platformo za spletno reševanje potrošniških sporov (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>9. Pravo in pristojnost</h2>
      <p>Za te pogoje velja slovensko pravo. Pristojno je sodišče v kraju sedeža Tilen Godeša s.p.</p>

      <h2>10. Kontakt</h2>
      <p>
        Tilen Godeša s.p.<br />
        Unec 117, 1381 Rakek<br />
        Davčna: SI34826696 · Matična: 9199349000<br />
        E-pošta: <a href="mailto:info@tilen-tours.com">info@tilen-tours.com</a><br />
        WhatsApp: <a href="https://wa.me/38640842594" target="_blank" rel="noopener noreferrer">+386 40 842 594</a>
      </p>
    </>
  );
}
