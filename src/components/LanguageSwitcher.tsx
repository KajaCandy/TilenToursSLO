"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LABELS: Record<string, string> = { en: "EN", sl: "SL", it: "IT", de: "DE" };
const LOCALES = ["en", "sl", "it", "de"];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex gap-1">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            l === locale
              ? "bg-forest-600 text-white"
              : "text-beige-400 hover:text-beige-200"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
