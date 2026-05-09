import Link from "next/link";
import type { ReactNode } from "react";

const BACK = {
  en: "Back to home",
  sl: "Nazaj na začetno stran",
  it: "Torna alla home",
  de: "Zurück zur Startseite",
};

export default function LegalLayout({ locale, children }: { locale: string; children: ReactNode }) {
  const back = BACK[locale as keyof typeof BACK] ?? BACK.en;
  return (
    <div className="min-h-screen bg-beige-50">
      <nav className="bg-forest-950 border-b border-forest-900">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Link href={`/${locale}`} className="font-display text-lg text-beige-100">Tilen Tours</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link href={`/${locale}`} className="text-forest-600 hover:text-forest-800 text-sm inline-flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {back}
        </Link>
        <article className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-beige-200 prose-legal">
          {children}
        </article>
      </main>
    </div>
  );
}
