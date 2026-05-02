"use client";

import { useTranslations } from "next-intl";

interface Review {
  slug: string;
  name: string;
  country: string;
  text: string;
  // tunes the framing of the cropped photo (object-position)
  focus: string;
}

const REVIEWS: Review[] = [
  {
    slug: "maddy-charles",
    name: "Maddy & Charles",
    country: "Australia",
    focus: "center 18%",
    text: "Tilen is one of the best experiences I've had and I honestly believe that my life is richer because we met. He is a kind and genuine person who was willing to help, chill, hangout or just give local knowledge. His family was also kind and welcoming, and they (including Nala) are all part of the reason me and my partner enjoyed Slovenia so much.\n\nDuring the days we explored local attractions, chatted about anything from music to politics, and during the night we all chilled out together playing video games and reading.",
  },
  {
    slug: "nav-shish",
    name: "Nav & Shish",
    country: "India",
    focus: "center 35%",
    text: "Tilen is such a wonderful person.\n\nHe really made our time in Slovenia very special and memorable. He showed us a part of his homeland which we'd have never otherwise experienced — and taught us things about Slovenia, which, we as visitors, would have easily missed. He is kind, fun and very friendly. He also brought us to taste some delicious local food very thoughtfully and we enjoyed having fun conversations on so many topics. He's intelligent, aware of so many things, and very open to the world.\n\nWe're super grateful for spending some good time with you, Tilen. Glad to have made friends with you, and we look forward to seeing you in another part of the world, soon.",
  },
  {
    slug: "saby",
    name: "Saby",
    country: "Peru",
    focus: "70% 60%",
    text: "Tilen is so kind and generous. He hosted me in his charming town, picked me up at the bus station and treated me to dinner. He's so friendly — you can feel his positive energy from the very first moment.\n\nHe took me on a trip to Bled, a truly wonderful town surrounded by mountains and a lake. He invited me to Bled Castle, and it was an amazing experience. He even gave me a portable charger, which was exactly what I needed — such a sweet gesture.\n\nHe has a great passion for travel and knows so many incredible places. He gave me invaluable information for my trip. The best host in the galaxy.",
  },
  {
    slug: "zoe",
    name: "Zoé",
    country: "France",
    focus: "center 30%",
    text: "What a wonderful experience. I was so warmly welcomed — he's a passionate and joyful person.\n\nI hope our paths cross again someday.",
  },
];

export default function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section id="reviews" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-forest-500 text-xs tracking-widest uppercase mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-4xl text-forest-900 mb-4">{t("title")}</h2>
          <p className="text-forest-600 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <article
              key={r.slug}
              className="bg-beige-50 rounded-2xl border border-beige-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7 flex flex-col"
            >
              <header className="flex items-center gap-4 mb-4">
                <img
                  src={`/media/reviews/${r.slug}.webp`}
                  alt={`${r.name} from ${r.country}`}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                  style={{ objectPosition: r.focus }}
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg text-forest-900 truncate">{r.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-xs text-forest-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {r.country}
                    </span>
                    <span className="text-forest-300">·</span>
                    <span className="inline-flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                </div>
              </header>
              <blockquote className="text-forest-700 text-sm leading-relaxed whitespace-pre-line flex-1">
                {r.text}
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
