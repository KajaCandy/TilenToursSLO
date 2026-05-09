"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const STORAGE_KEY = "tt-cookie-notice-dismissed-v1";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  if (!show) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[60] bg-white border border-beige-300 rounded-2xl shadow-xl p-5 sm:p-6"
    >
      <p className="text-sm text-forest-800 leading-relaxed mb-3">
        {t("body")}{" "}
        <Link href={`/${locale}/privacy`} className="text-forest-700 underline decoration-forest-300 underline-offset-2 hover:decoration-forest-700">
          {t("learnMore")}
        </Link>
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={dismiss}
          className="bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
        >
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
}
