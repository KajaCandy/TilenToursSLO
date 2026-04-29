"use client";

import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

interface BookingDetails {
  date: string;
  numPeople: string;
  snackChoice: string;
  dogKennel: string;
  totalPrice: string;
}

function SuccessContent() {
  const t = useTranslations("success");
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;
    fetch(`/api/booking-details?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => setDetails(d))
      .catch(() => {});
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl text-forest-900 mb-3">{t("title")}</h1>
        <p className="text-forest-600 mb-8 leading-relaxed">{t("subtitle")}</p>

        {details && (
          <div className="bg-white rounded-2xl p-6 border border-beige-200 shadow-sm mb-8 text-left">
            <h2 className="font-semibold text-forest-900 mb-4">{t("details")}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-forest-500">{t("date")}</span>
                <span className="font-medium">{new Date(details.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-500">{t("people")}</span>
                <span className="font-medium">{details.numPeople}</span>
              </div>
              {details.snackChoice && (
                <div className="flex justify-between">
                  <span className="text-forest-500">{t("snack")}</span>
                  <span className="font-medium capitalize">{details.snackChoice}</span>
                </div>
              )}
              {details.dogKennel === "true" && (
                <div className="flex justify-between">
                  <span className="text-forest-500">{t("dog")}</span>
                  <span className="font-medium">✓</span>
                </div>
              )}
              <div className="flex justify-between border-t border-beige-100 pt-3">
                <span className="text-forest-500">{t("total")}</span>
                <span className="font-semibold text-forest-800">€{details.totalPrice}</span>
              </div>
            </div>
          </div>
        )}

        <Link href={`/${locale}`} className="inline-block bg-forest-700 hover:bg-forest-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-beige-50 flex items-center justify-center"><div className="text-forest-600">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
