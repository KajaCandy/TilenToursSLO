"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppButton from "@/components/WhatsAppButton";

type SnackChoice = "tortillas" | "sandwiches" | "yogurt" | null;
type MusicChoice = "chill" | "upbeat" | "slovenian" | "surprise" | "silence" | null;
const MUSIC_OPTIONS: Exclude<MusicChoice, null>[] = ["chill", "upbeat", "slovenian", "surprise", "silence"];

interface Availability {
  blockedDates: string[];
  bookedDates: string[];
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function BookPage() {
  const t = useTranslations();
  const { locale } = useParams<{ locale: string }>();

  const today = new Date();
  const minBookable = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [numPeople, setNumPeople] = useState(2);
  const [snackChoice, setSnackChoice] = useState<SnackChoice>(null);
  const [vegetarianCount, setVegetarianCount] = useState(0);
  const [dogKennel, setDogKennel] = useState(false);
  const [musicChoice, setMusicChoice] = useState<MusicChoice>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState(false);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loadingAv, setLoadingAv] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => setAvailability(d))
      .finally(() => setLoadingAv(false));
  }, []);

  // Keep vegetarianCount in valid range when numPeople or snackChoice changes
  useEffect(() => {
    if (!snackChoice) {
      if (vegetarianCount !== 0) setVegetarianCount(0);
    } else if (vegetarianCount > numPeople) {
      setVegetarianCount(numPeople);
    }
  }, [numPeople, snackChoice, vegetarianCount]);

  const basePrice = numPeople * 130;
  const snackPrice = snackChoice ? numPeople * 10 : 0;
  const total = basePrice + snackPrice;

  function isDateUnavailable(dateStr: string) {
    if (!availability) return true;
    return availability.blockedDates.includes(dateStr) || availability.bookedDates.includes(dateStr);
  }

  function isDateTooSoon(year: number, month: number, day: number) {
    const d = new Date(year, month, day);
    return d < minBookable;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !name || !email || !phone) return;
    if (!isValidPhoneNumber(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          numPeople,
          snackChoice,
          vegetarianCount: snackChoice ? vegetarianCount : 0,
          dogKennel,
          musicPreference: musicChoice,
          notes: notes.trim() || null,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Nav */}
      <nav className="bg-forest-950 border-b border-forest-900">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-display text-lg text-beige-100">Tilen Tours</Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl text-forest-900 mb-2">{t("booking.title")}</h1>
        <p className="text-forest-600 mb-10">Ljubljana → Soča Valley → Coast → Ljubljana</p>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            {/* Date picker */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200">
              <h2 className="font-semibold text-forest-900 mb-4">{t("booking.selectDate")}</h2>
              {loadingAv ? (
                <p className="text-forest-500 text-sm">{t("booking.loading")}</p>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button type="button" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); }} className="p-2 rounded-lg hover:bg-beige-100 text-forest-700">‹</button>
                    <span className="font-medium text-forest-900">{MONTHS[calMonth]} {calYear}</span>
                    <button type="button" onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); }} className="p-2 rounded-lg hover:bg-beige-100 text-forest-700">›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (
                      <div key={d} className="text-center text-xs text-forest-400 font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: adjustedFirst }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = toDateStr(calYear, calMonth, day);
                      const tooSoon = isDateTooSoon(calYear, calMonth, day);
                      const unavailable = isDateUnavailable(dateStr);
                      const selected = selectedDate === dateStr;
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={tooSoon || unavailable}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                            selected ? "bg-forest-700 text-white" :
                            tooSoon || unavailable ? "text-beige-300 cursor-not-allowed" :
                            "hover:bg-forest-100 text-forest-900"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDate && (
                    <p className="mt-4 text-sm text-forest-700 bg-forest-50 rounded-lg px-3 py-2">
                      Selected: <strong>{new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong>
                    </p>
                  )}
                  <p className="mt-3 text-xs text-forest-500">{t("booking.advanceNotice")}</p>
                </div>
              )}
            </div>

            {/* Group size */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200">
              <h2 className="font-semibold text-forest-900 mb-4">{t("booking.groupSize")}</h2>
              <div className="flex gap-3">
                {[2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNumPeople(n)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      numPeople === n ? "border-forest-700 bg-forest-700 text-white" : "border-beige-300 text-forest-700 hover:border-forest-400"
                    }`}
                  >
                    {n} {t("booking.people")}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200">
              <h2 className="font-semibold text-forest-900 mb-4">{t("booking.extras")}</h2>
              {/* Snack */}
              <p className="text-sm text-forest-700 font-medium mb-2">{t("booking.snackTitle")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {(["none", "tortillas", "sandwiches", "yogurt"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSnackChoice(opt === "none" ? null : opt)}
                    className={`py-2 px-3 rounded-xl text-sm border-2 transition-all ${
                      (opt === "none" && snackChoice === null) || (opt !== "none" && snackChoice === opt)
                        ? "border-forest-700 bg-forest-700 text-white"
                        : "border-beige-300 text-forest-700 hover:border-forest-400"
                    }`}
                  >
                    {t(`booking.snack${opt.charAt(0).toUpperCase() + opt.slice(1)}` as "snackNone" | "snackTortillas" | "snackSandwiches" | "snackYogurt")}
                  </button>
                ))}
              </div>
              {snackChoice && (
                <div className="mb-6">
                  <p className="text-sm text-forest-700 font-medium mb-1">{t("booking.vegetarianTitle")}</p>
                  <p className="text-xs text-forest-500 mb-2">{t("booking.vegetarianHelp")}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: numPeople + 1 }, (_, n) => n).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setVegetarianCount(n)}
                        className={`min-w-[3rem] py-2 px-3 rounded-xl text-sm border-2 transition-all ${
                          vegetarianCount === n
                            ? "border-forest-700 bg-forest-700 text-white"
                            : "border-beige-300 text-forest-700 hover:border-forest-400"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Dog */}
              <p className="text-sm text-forest-700 font-medium mb-2">{t("booking.dogTitle")}</p>
              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  checked={dogKennel}
                  onChange={(e) => setDogKennel(e.target.checked)}
                  className="w-5 h-5 accent-forest-700 rounded"
                />
                <span className="text-sm text-forest-700">{t("booking.dogLabel")}</span>
              </label>
              {/* Music vibe */}
              <p className="text-sm text-forest-700 font-medium mb-1">{t("booking.musicTitle")}</p>
              <p className="text-xs text-forest-500 mb-2">{t("booking.musicDesc")}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {MUSIC_OPTIONS.map((opt) => {
                  const selected = musicChoice === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMusicChoice(selected ? null : opt)}
                      className={`py-2 px-3 rounded-xl text-sm border-2 transition-all ${
                        selected
                          ? "border-forest-700 bg-forest-700 text-white"
                          : "border-beige-300 text-forest-700 hover:border-forest-400"
                      }`}
                    >
                      {t(`booking.music${opt.charAt(0).toUpperCase() + opt.slice(1)}` as
                        | "musicChill"
                        | "musicUpbeat"
                        | "musicSlovenian"
                        | "musicSurprise"
                        | "musicSilence")}
                    </button>
                  );
                })}
              </div>
              {/* Notes */}
              <p className="text-sm text-forest-700 font-medium mb-2">{t("booking.notesTitle")}</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 480))}
                rows={3}
                placeholder={t("booking.notesPlaceholder")}
                className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500 resize-none"
              />
              <p className="text-xs text-forest-400 mt-1">{notes.length}/480</p>
            </div>

            {/* Customer details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200">
              <h2 className="font-semibold text-forest-900 mb-4">{t("booking.yourDetails")}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="block text-sm text-forest-600 mb-1">{t("booking.name")}</label>
                  <input
                    id="customer-name"
                    name="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500"
                  />
                </div>
                <div>
                  <label htmlFor="customer-email" className="block text-sm text-forest-600 mb-1">{t("booking.email")}</label>
                  <input
                    id="customer-email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500"
                  />
                </div>
                <div>
                  <label htmlFor="customer-phone" className="block text-sm text-forest-600 mb-1">{t("booking.phone")}</label>
                  <PhoneInput
                    id="customer-phone"
                    international
                    defaultCountry="SI"
                    value={phone}
                    onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false); }}
                    numberInputProps={{
                      name: "tel",
                      autoComplete: "tel",
                      required: true,
                      className: "w-full bg-transparent text-sm focus:outline-none",
                    }}
                    className={`tt-phone-input flex items-center gap-2 border ${phoneError ? "border-red-400" : "border-beige-300"} rounded-xl px-3 py-3 focus-within:border-forest-500`}
                  />
                  {phoneError && (
                    <p className="text-xs text-red-500 mt-1">{t("booking.phoneInvalid")}</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-forest-400 mt-4">{t("booking.privacyNote")}</p>
            </div>
          </div>

          {/* Sidebar summary */}
          <div>
            <div className="bg-forest-950 rounded-2xl p-6 text-white sticky top-24">
              <h2 className="font-display text-xl mb-6">{t("booking.summary")}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-beige-300">{t("booking.base")} × {numPeople}</span>
                  <span>€{basePrice}</span>
                </div>
                {snackChoice && (
                  <div className="flex justify-between">
                    <span className="text-beige-300">Snack × {numPeople}</span>
                    <span>€{snackPrice}</span>
                  </div>
                )}
                {dogKennel && (
                  <div className="flex justify-between">
                    <span className="text-beige-300">Dog kennel</span>
                    <span>€0</span>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between pt-2 border-t border-forest-800">
                    <span className="text-beige-300">Date</span>
                    <span>{new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-forest-700 mt-6 pt-6 flex justify-between items-center">
                <span className="text-beige-200">{t("booking.total")}</span>
                <span className="font-display text-3xl">€{total}</span>
              </div>
              <button
                type="submit"
                disabled={!selectedDate || submitting}
                className="mt-6 w-full bg-forest-500 hover:bg-forest-400 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-colors"
              >
                {submitting ? "..." : t("booking.proceedPayment")}
              </button>
              {!selectedDate && (
                <p className="text-center text-xs text-beige-500 mt-3">Select a date to continue</p>
              )}
            </div>
          </div>
        </form>
      </div>
      <footer className="mt-16 border-t border-beige-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-forest-500">
          <p>{t("footer.business")}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-forest-700 transition-colors">{t("footer.privacy")}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-forest-700 transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
