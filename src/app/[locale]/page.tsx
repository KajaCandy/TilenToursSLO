"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChatWidget from "@/components/ChatWidget";
import HeroParallax from "@/components/HeroParallax";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Reviews from "@/components/Reviews";

export default function HomePage() {
  const t = useTranslations();
  const { locale } = useParams<{ locale: string }>();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-950/90 backdrop-blur-sm border-b border-forest-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-display text-lg text-beige-100 tracking-wide">Tilen Tours</span>
          <div className="flex items-center gap-6">
            <a href="#itinerary" className="hidden sm:block text-sm text-beige-300 hover:text-beige-100 transition-colors">{t("nav.itinerary")}</a>
            <a href="#reviews" className="hidden sm:block text-sm text-beige-300 hover:text-beige-100 transition-colors">{t("nav.reviews")}</a>
            <a href="#pricing" className="hidden sm:block text-sm text-beige-300 hover:text-beige-100 transition-colors">{t("nav.pricing")}</a>
            <LanguageSwitcher />
            <Link href={`/${locale}/book`} className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[150vh] bg-beige-50">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <HeroParallax />
          <div
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            style={{ textShadow: "0 2px 24px rgba(20,30,20,0.55), 0 1px 3px rgba(0,0,0,0.4)" }}
          >
            <div className="inline-block bg-forest-950/55 backdrop-blur-sm border border-beige-100/30 text-beige-100 text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              {t("hero.badge")}
            </div>
            <h1 className="font-display text-5xl sm:text-7xl text-white mb-6 leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
              {t("hero.tagline")}
            </h1>
            <p className="text-lg sm:text-xl text-beige-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {t("hero.subtitle")}
            </p>
            <Link
              href={`/${locale}/book`}
              className="inline-block bg-forest-500 hover:bg-forest-400 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:scale-105 shadow-xl"
              style={{ textShadow: "none" }}
            >
              {t("hero.cta")}
            </Link>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <svg className="w-6 h-6 text-beige-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Brush-stroke transition — sits below the 100vh sticky viewport,
            at the natural seam between the hero section and the next one. */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-20 sm:h-28 pointer-events-none block z-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,72 C180,38 380,96 600,60 C820,28 1020,86 1240,54 C1340,38 1400,58 1440,46 L1440,120 L0,120 Z"
            fill="#faf8f5"
          />
          <path
            d="M0,82 C200,52 400,98 620,72 C840,46 1040,92 1260,68 C1360,54 1410,72 1440,62 L1440,120 L0,120 Z"
            fill="#faf8f5"
            opacity="0.6"
          />
        </svg>
      </section>

      {/* Tour Story */}
      <section className="py-24 px-4 bg-beige-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl text-forest-900 mb-6">{t("tour.title")}</h2>
              <p className="text-forest-700 text-lg leading-relaxed mb-10">{t("tour.description")}</p>
              <div className="grid grid-cols-2 gap-6">
                {(["h1", "h2", "h3", "h4"] as const).map((k) => (
                  <div key={k} className="bg-white rounded-xl p-5 shadow-sm border border-beige-200">
                    <p className="font-semibold text-forest-900 mb-1 text-sm">{t(`tour.highlights.${k}`)}</p>
                    <p className="text-forest-600 text-xs leading-relaxed">{t(`tour.highlights.${k}desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/media/optimized/5B0A9D14-0896-4E23-9A84-70DAFA7F6D72_1_105_c.jpg"
                alt={t("tour.title")}
                className="bg-forest-800 rounded-2xl aspect-[3/4] object-cover w-full"
                loading="lazy"
              />
              <img
                src="/media/optimized/362BAB73-83F6-464C-9F22-6CCC35FF20B2_1_105_c.jpg"
                alt={t("tour.title")}
                className="bg-forest-600 rounded-2xl aspect-[3/4] object-cover w-full mt-8"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl text-forest-900 mb-16 text-center">{t("itinerary.title")}</h2>
          <ItineraryTimeline />
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-forest-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl text-white mb-4">{t("pricing.title")}</h2>
          <p className="text-beige-300 mb-12">{t("pricing.groupSize")}</p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Price card */}
            <div className="bg-forest-900 rounded-2xl p-8 border border-forest-700">
              <div className="mb-6">
                <span className="font-display text-6xl text-white">€130</span>
                <span className="text-beige-400 ml-2">{t("pricing.perPerson")}</span>
              </div>
              <p className="text-beige-300 text-sm mb-6">{t("pricing.groupSize")}</p>
              <div className="border-t border-forest-700 pt-6">
                <p className="text-beige-300 text-xs font-medium uppercase tracking-wider mb-3">{t("pricing.included")}</p>
                <ul className="space-y-2">
                  {(t.raw("pricing.includedItems") as string[]).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-beige-200 text-sm">
                      <span className="text-forest-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/${locale}/book`}
                className="mt-8 block text-center bg-forest-500 hover:bg-forest-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                {t("nav.bookNow")}
              </Link>
            </div>

            {/* Extras card */}
            <div className="bg-forest-900 rounded-2xl p-8 border border-forest-700">
              <p className="text-beige-300 text-xs font-medium uppercase tracking-wider mb-6">{t("pricing.extras")}</p>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{t("pricing.snack")}</p>
                    <p className="text-beige-400 text-sm mt-1">{t("pricing.snackDesc")}</p>
                  </div>
                  <span className="text-forest-400 font-medium text-sm whitespace-nowrap ml-4">{t("pricing.snackPrice")}</span>
                </div>
                <div className="flex justify-between items-start border-t border-forest-700 pt-6">
                  <div>
                    <p className="text-white font-medium">{t("pricing.dogKennel")}</p>
                    <p className="text-beige-400 text-sm mt-1">{t("pricing.dogKennelDesc")}</p>
                  </div>
                  <span className="text-forest-400 font-medium text-sm whitespace-nowrap ml-4">{t("pricing.dogKennelPrice")}</span>
                </div>
              </div>
              <div className="mt-8 bg-forest-800 rounded-xl p-4">
                <p className="text-beige-400 text-xs leading-relaxed">{t("pricing.note")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-display text-beige-100 text-lg">Tilen Tours Slovenia</p>
            <p className="text-beige-500 text-sm">{t("footer.tagline")}</p>
          </div>
          <p className="text-beige-600 text-xs">© {new Date().getFullYear()} {t("footer.rights")}</p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
