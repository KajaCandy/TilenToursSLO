"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function DatesPage() {
  const t = useTranslations("admin");
  const router = useRouter();

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/dates")
      .then((r) => {
        if (r.status === 401) { router.push("/en/admin"); return null; }
        return r.json();
      })
      .then((d) => d && setBlockedDates(d));
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => setBookedDates(d.bookedDates ?? []));
  }, [router]);

  async function toggleDate(dateStr: string) {
    if (bookedDates.includes(dateStr)) return;
    setToggling(dateStr);
    const shouldBlock = !blockedDates.includes(dateStr);
    await fetch("/api/admin/dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr, block: shouldBlock }),
    });
    setBlockedDates((prev) => shouldBlock ? [...prev, dateStr] : prev.filter((d) => d !== dateStr));
    setToggling(null);
  }

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div>
      <h1 className="font-display text-3xl text-forest-900 mb-4">{t("dates")}</h1>
      <p className="text-forest-500 text-sm mb-8">{t("blockDate")}</p>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-xs">
        {[
          { color: "bg-white border-beige-300", label: t("available") },
          { color: "bg-red-100 border-red-300 text-red-700", label: t("blocked") },
          { color: "bg-forest-100 border-forest-400 text-forest-700", label: t("booked") },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded border ${l.color}`} />
            <span className="text-forest-600">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-beige-200 shadow-sm max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); }} className="p-2 rounded-lg hover:bg-beige-100 text-forest-700">‹</button>
          <span className="font-semibold text-forest-900">{MONTHS[calMonth]} {calYear}</span>
          <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); }} className="p-2 rounded-lg hover:bg-beige-100 text-forest-700">›</button>
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
            const isPast = new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isBlocked = blockedDates.includes(dateStr);
            const isBooked = bookedDates.includes(dateStr);
            const isToggling = toggling === dateStr;
            return (
              <button
                key={day}
                disabled={isPast || isBooked || isToggling}
                onClick={() => toggleDate(dateStr)}
                className={`aspect-square rounded-lg text-sm font-medium border transition-all ${
                  isBooked ? "bg-forest-100 border-forest-400 text-forest-700 cursor-default" :
                  isBlocked ? "bg-red-100 border-red-300 text-red-700 hover:bg-red-200" :
                  isPast ? "text-beige-200 border-beige-100 cursor-not-allowed" :
                  "border-beige-300 text-forest-900 hover:bg-beige-100"
                } ${isToggling ? "opacity-50" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
