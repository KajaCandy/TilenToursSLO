"""Add expandable 'more' descriptions to each itinerary step + Read more / Show less labels."""
import json
from pathlib import Path

MESSAGES_DIR = Path(r"E:/Projects/Tilen Tours Slovenia/messages")

# 9 extended descriptions per locale, in step order.
MORE_TEXT = {
    "en": [
        "Ljubljana means 'the beloved' in Slovenian - a small, walkable capital wrapped around a winding river and watched over by a 12th-century hilltop castle. Its symbol is the dragon: legend says Jason of the Argonauts slew one here on his way home from Colchis. You'll find dragons on every corner of the famous Dragon Bridge.",
        "The deepest, southernmost gorges of Triglav National Park - 60 meters carved through limestone by two clear rivers, the Tolminka and the Zadlaščica. Dante is said to have visited in 1319 and used a cave near the Devil's Bridge as inspiration for his Inferno. Look up for the wedged 'Bear's Head' boulder, suspended between the canyon walls since the last ice age.",
        "Slovenes call the Soča the 'Emerald Beauty' - its impossible blue-green comes from limestone particles suspended in glacial meltwater. This was the front line of WWI's brutal Isonzo battles, where over 300,000 soldiers died. Ernest Hemingway drove ambulances here in 1918 and later turned the experience into A Farewell to Arms.",
        "Slovenes have a phrase for slowing down: 'pridi na kavo' - come for a coffee. Out here, that means sitting with your feet in 8°C water and listening to the river. Local custom says to drop a small stone into the Soča when you visit - the river will call you back.",
        "Slovenian food sits at a crossroads: alpine, Mediterranean, and Pannonian. Try jota (sauerkraut and bean stew), štruklji (rolled dumplings - sweet or savory), or kranjska klobasa with žganci (Carniolan sausage and buckwheat polenta). Wash it down with teran, a deep ruby wine grown only on the Karst plateau's iron-rich soil.",
        "We cross the Karst - the limestone plateau that gave its name to every cave system on Earth. Geologists worldwide call this kind of terrain 'karst' after this exact region. It hides over 11,000 cataloged caves, deep sinkholes called dolines, and the burja, a cold wind that can hit 200 km/h.",
        "Two coastal cities, your pick. Koper, Slovenia's only port, was Venetian for 500 years and still wears it: the central square is a near-perfect miniature of Venice's San Marco. Trieste, just over the Italian border, is where James Joyce wrote most of Ulysses, and where Italian, Slavic, and Habsburg cultures still tangle in every café.",
        "The drive back follows the old Roman road from Aquileia to Emona - Ljubljana's Roman name, still used on local manhole covers and craft-beer labels. On clear afternoons you can glimpse the Julian Alps to the north and the Adriatic foothills to the south from the same stretch of highway - a reminder of how compact Slovenia really is.",
        "If you still have energy: the riverside between Triple Bridge and Cobblers' Bridge fills with locals after work - open-air bars, street musicians, late-night talks until the cafés close. For something quieter, Tivoli Park is two minutes from the center, with a forested hill and a 19th-century mansion at the top.",
    ],
    "sl": [
        "Ljubljana je ena najmanjših in najbolj prijaznih prestolnic Evrope - staro mesto se vije ob reki Ljubljanici, nad njim pa bdi grad iz 12. stoletja. Njen simbol je zmaj: legenda pravi, da je Jazon z Argonavti enega od njih ubil prav tu, na poti domov iz Kolhide. Zmaje boste našli na vsakem vogalu znamenitega Zmajskega mostu.",
        "Najgloblja in najjužnejša soteska Triglavskega narodnega parka - reki Tolminka in Zadlaščica sta tu skozi apnenec izdolbli 60 metrov globoko grlo. Dante naj bi leta 1319 obiskal jamo blizu Hudičevega mostu in jo uporabil kot navdih za svoj Pekel. Poglejte gor in zagledali boste 'Medvedovo glavo', ogromno skalo, ki visi med stenami soteske že od zadnje ledene dobe.",
        "Slovenci Soči pravijo 'smaragdna lepotica' - njena neverjetna modrozelena barva izvira iz drobnih apnenčastih delcev v ledeniški vodi. Tu je potekala soška fronta prve svetovne vojne, ena najbolj krvavih front v zgodovini, kjer je padlo več kot 300.000 vojakov. Ernest Hemingway je tu leta 1918 vozil reševalna vozila in svoje izkušnje pretvoril v roman Zbogom orožje.",
        "Slovenci imamo izraz za umiritev: 'pridi na kavo'. Tukaj v dolini to pomeni, da z nogami v 8 °C mrzli vodi prisluhneš reki. Po lokalni navadi naj v Sočo vržeš majhen kamenček - pravijo, da te bo reka vedno priklicala nazaj.",
        "Slovenska kuhinja stoji na križišču: alpska, sredozemska in panonska. Poskusite joto (kislo zelje s fižolom in krompirjem), štruklje (slane ali sladke), ali kranjsko klobaso z žganci. Vse skupaj zalijte s teranom - globoko rdečim vinom, ki raste samo na železu bogati zemlji Krasa.",
        "Pot nas vodi čez Kras - apnenčasto planoto, po kateri so geologi po vsem svetu poimenovali tovrstno pokrajino. 'Kras' je danes mednarodni geološki izraz, izvira pa prav iz tega kotička Slovenije. V njem se skriva več kot 11.000 raziskanih jam, globoke vrtače in burja - mrzel veter, ki lahko doseže 200 km/h.",
        "Dve obalni mesti, vaša izbira. Koper, edino slovensko pristanišče, je bil pet stoletij beneški in to še danes nosi: osrednji trg je skoraj popolna pomanjšana kopija beneškega trga svetega Marka. Trst, takoj čez italijansko mejo, je kraj, kjer je James Joyce napisal večji del Uliksesa, italijanske, slovanske in habsburške korenine pa se prepletajo v vsaki kavarni.",
        "Pot nazaj sledi stari rimski cesti, ki je vodila iz Akvileje v Emono - rimsko ime za Ljubljano, ki ga še danes najdete na pokrovih kanalov in nalepkah piva. Ob jasnih popoldnevih lahko z istega odseka avtoceste hkrati zagledate Julijske Alpe na severu in jadranske hribe na jugu - opomnik, kako majhna Slovenija pravzaprav je.",
        "Če vam še ni dovolj: nabrežje med Tromostovjem in Čevljarskim mostom se po koncu dneva napolni z domačini - odprti bari, ulični glasbeniki, pogovori pozno v noč. Če iščete kaj bolj umirjenega, je park Tivoli le dve minuti stran od središča, z gozdnatim gričem in dvorcem iz 19. stoletja na vrhu.",
    ],
    "it": [
        "Lubiana significa 'l'amata' in sloveno - una piccola capitale percorribile a piedi, raccolta intorno a un fiume sinuoso e dominata da un castello del XII secolo. Il suo simbolo è il drago: la leggenda narra che Giasone, di ritorno dalla Colchide, ne uccise uno proprio qui. Li troverete agli angoli del celebre Ponte dei Draghi.",
        "Le gole più profonde e meridionali del Parco Nazionale del Triglav - 60 metri scavati nella roccia calcarea da due fiumi limpidi, il Tolminka e lo Zadlaščica. Si dice che Dante le abbia visitate nel 1319 e abbia tratto ispirazione per il suo Inferno da una grotta vicino al Ponte del Diavolo. Alzando lo sguardo si vede la 'Testa d'Orso', un masso incastrato fra le pareti dalla fine dell'ultima era glaciale.",
        "Gli sloveni chiamano l'Isonzo (Soča) la 'Bellezza Smeraldo' - il suo impossibile colore blu-verde nasce da microparticelle calcaree sospese nelle acque di fusione glaciale. Qui correva il fronte dell'Isonzo nella Prima guerra mondiale, dove caddero oltre 300.000 soldati. Ernest Hemingway guidò ambulanze in questa valle nel 1918 e ne trasse Addio alle armi.",
        "Gli sloveni hanno un'espressione per rallentare: 'pridi na kavo' - vieni a prendere un caffè. Qui in valle significa sedersi con i piedi nell'acqua a 8 °C ad ascoltare il fiume. La tradizione locale vuole che si lasci cadere un sassolino nell'Isonzo: il fiume vi richiamerà.",
        "La cucina slovena vive a un crocevia: alpina, mediterranea e pannonica. Provate la jota (zuppa di crauti e fagioli), gli štruklji (involtini di pasta dolci o salati) o la kranjska klobasa con žganci (salsiccia carniolina con polenta di grano saraceno). Da accompagnare con il terrano, un vino rosso rubino che cresce solo sui suoli ferrosi del Carso.",
        "Attraversiamo il Carso - l'altopiano calcareo che ha dato il nome a ogni sistema di grotte sulla Terra. I geologi di tutto il mondo chiamano 'carsico' questo tipo di terreno proprio per questa regione. Nasconde oltre 11.000 grotte censite, grandi doline e la bora, un vento freddo che può sfiorare i 200 km/h.",
        "Due città costiere, scegliete voi. Capodistria, l'unico porto sloveno, è stata veneziana per 500 anni e si vede ancora: la piazza centrale è una miniatura quasi perfetta di Piazza San Marco. Trieste, appena oltre il confine, è la città dove James Joyce scrisse gran parte dell'Ulisse e dove culture italiane, slave e asburgiche si intrecciano in ogni caffè.",
        "Il viaggio di ritorno segue l'antica via romana da Aquileia a Emona - il nome romano di Lubiana, ancora oggi inciso sui tombini e sulle etichette delle birre artigianali. In un pomeriggio limpido, dallo stesso tratto di autostrada, si scorgono le Alpi Giulie a nord e le colline adriatiche a sud - un promemoria di quanto sia compatta la Slovenia.",
        "Se avete ancora energie: il lungofiume tra il Triplo Ponte e il Ponte dei Calzolai si riempie di gente del posto dopo il lavoro - bar all'aperto, musicisti di strada, conversazioni che durano fino alla chiusura dei caffè. Per qualcosa di più tranquillo, il Parco Tivoli è a due minuti dal centro, con una collina boscosa e una villa ottocentesca in cima.",
    ],
    "de": [
        "Ljubljana bedeutet auf Slowenisch 'die Geliebte' - eine der kleinsten und am besten zu Fuß erkundbaren Hauptstädte Europas, an einem geschwungenen Fluss gelegen und überragt von einer Burg aus dem 12. Jahrhundert. Ihr Wahrzeichen ist der Drache: Der Legende nach erschlug Jason auf der Heimreise von Kolchis hier einen. Drachen finden sich an jeder Ecke der berühmten Drachenbrücke.",
        "Die tiefsten und südlichsten Schluchten des Nationalparks Triglav - 60 Meter, von den klaren Flüssen Tolminka und Zadlaščica durch den Kalkstein gegraben. Dante soll 1319 hier gewesen sein und eine Höhle nahe der Teufelsbrücke als Inspiration für sein Inferno verwendet haben. Schauen Sie nach oben: der eingeklemmte 'Bärenkopf'-Felsen hängt seit der letzten Eiszeit zwischen den Schluchtwänden.",
        "Die Slowenen nennen die Soča die 'Smaragdene Schönheit' - ihre unmögliche Blaugrünfärbung entsteht durch Kalksteinpartikel im Gletscherwasser. Hier verlief im Ersten Weltkrieg die Isonzofront, wo über 300.000 Soldaten fielen. Ernest Hemingway fuhr 1918 in diesem Tal Krankenwagen und verarbeitete die Erlebnisse später in In einem anderen Land.",
        "Die Slowenen haben einen Ausdruck fürs Entschleunigen: 'pridi na kavo' - komm auf einen Kaffee. Hier draußen heißt das: die Füße ins 8 °C kalte Wasser und dem Fluss zuhören. Lokaler Brauch: einen kleinen Stein in die Soča werfen - der Fluss ruft dich zurück.",
        "Slowenische Küche steht an einem Kreuzweg: alpin, mediterran und pannonisch. Probieren Sie Jota (Sauerkrauteintopf mit Bohnen), Štruklji (gefüllte Teigrollen, süß oder herzhaft), oder Krainer Wurst mit Žganci (Buchweizenpolenta). Dazu Teran - ein tiefroter Wein, der nur auf den eisenreichen Böden des Karst gedeiht.",
        "Wir queren den Karst - jene Kalksteinhochebene, die jedem Höhlensystem der Welt ihren Namen gegeben hat. Geologen weltweit nennen solche Landschaften 'Karst' nach genau dieser Region. Sie verbirgt über 11.000 dokumentierte Höhlen, tiefe Dolinen und die Bora - einen kalten Wind, der bis zu 200 km/h erreichen kann.",
        "Zwei Küstenstädte, Ihre Wahl. Koper, Sloweniens einziger Hafen, war 500 Jahre lang venezianisch und trägt es bis heute: der Hauptplatz ist eine fast perfekte Miniatur des Markusplatzes. Triest, gleich hinter der italienischen Grenze, ist die Stadt, in der James Joyce den Großteil des Ulysses schrieb und in der italienische, slawische und habsburgische Kulturen in jedem Café aufeinandertreffen.",
        "Die Rückfahrt folgt der alten römischen Straße von Aquileia nach Emona - dem römischen Namen Ljubljanas, der heute noch auf Kanaldeckeln und Craft-Beer-Etiketten zu finden ist. An klaren Nachmittagen sieht man von derselben Autobahn aus die Julischen Alpen im Norden und die Adria-Vorberge im Süden - ein Hinweis darauf, wie kompakt Slowenien tatsächlich ist.",
        "Wenn Sie noch Energie haben: das Flussufer zwischen Drei-Brücken und Schustersteg füllt sich nach Feierabend mit Einheimischen - Open-Air-Bars, Straßenmusiker, Gespräche bis die Cafés schließen. Wenn Sie es ruhiger mögen: der Tivoli-Park ist zwei Minuten vom Zentrum entfernt, mit einem bewaldeten Hügel und einer Villa aus dem 19. Jahrhundert auf der Spitze.",
    ],
}

UI_LABELS = {
    "en": {"readMore": "Read more", "showLess": "Show less"},
    "sl": {"readMore": "Več o tem", "showLess": "Skrij"},
    "it": {"readMore": "Scopri di più", "showLess": "Nascondi"},
    "de": {"readMore": "Mehr erfahren", "showLess": "Ausblenden"},
}

for loc, more_list in MORE_TEXT.items():
    fp = MESSAGES_DIR / f"{loc}.json"
    data = json.loads(fp.read_text(encoding="utf-8"))
    steps = data["itinerary"]["steps"]
    assert len(steps) == len(more_list), f"{loc}: step count mismatch ({len(steps)} vs {len(more_list)})"
    for step, extra in zip(steps, more_list):
        step["more"] = extra
    data["itinerary"].update(UI_LABELS[loc])
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {fp.name} (added 'more' to {len(steps)} steps)")
