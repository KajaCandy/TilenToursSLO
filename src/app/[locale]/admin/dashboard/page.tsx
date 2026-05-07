"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  date: string;
  numPeople: number;
  snackChoice: string | null;
  vegetarianCount: number;
  dogKennel: boolean;
  musicPreference: string | null;
  notes: string | null;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => {
        if (r.status === 401) { router.push("/en/admin"); return null; }
        return r.json();
      })
      .then((d) => d && setBookings(d))
      .finally(() => setLoading(false));
  }, [router]);

  async function deleteBooking(b: Booking) {
    const label = `${b.customerName} · ${new Date(b.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
    if (!confirm(t("deleteConfirm", { label }))) return;
    setDeletingId(b.id);
    try {
      const res = await fetch(`/api/admin/bookings/${b.id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/en/admin"); return; }
      if (!res.ok) throw new Error("Delete failed");
      setBookings((prev) => prev.filter((x) => x.id !== b.id));
    } catch {
      alert(t("deleteFailed"));
    } finally {
      setDeletingId(null);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter((b) => b.date >= today && b.status === "paid").length;
  const revenue = bookings.filter((b) => b.status === "paid").reduce((s, b) => s + b.totalPrice, 0);

  if (loading) return <div className="text-forest-500 py-10 text-center">Loading...</div>;

  return (
    <div>
      <h1 className="font-display text-3xl text-forest-900 mb-8">{t("bookings")}</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: t("totalBookings"), value: bookings.length },
          { label: t("revenue"), value: `€${revenue}` },
          { label: t("upcoming"), value: upcoming },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-beige-200 shadow-sm">
            <p className="text-forest-500 text-xs mb-1">{s.label}</p>
            <p className="font-display text-3xl text-forest-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {bookings.length === 0 ? (
        <p className="text-forest-500 py-8 text-center bg-white rounded-xl border border-beige-200">{t("noBookings")}</p>
      ) : (
        <div className="bg-white rounded-xl border border-beige-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-beige-100">
                {[t("bookingDate"), t("bookingPeople"), t("bookingCustomer"), t("bookingExtras"), t("bookingTotal"), t("bookingStatus")].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-forest-400 uppercase tracking-wider">{h}</th>
                ))}
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {bookings.map((b) => {
                const snackLabel = b.snackChoice
                  ? b.vegetarianCount === 0
                    ? `Snack: ${b.snackChoice}`
                    : b.vegetarianCount === b.numPeople
                      ? `Veg Snack: ${b.snackChoice}`
                      : `Snack: ${b.snackChoice} (${b.vegetarianCount} veg / ${b.numPeople - b.vegetarianCount} reg)`
                  : null;
                const extras = [
                  snackLabel,
                  b.dogKennel && "Dog",
                  b.musicPreference && `${t("bookingMusic")}: ${b.musicPreference}`,
                ].filter(Boolean).join(", ");
                return (
                  <tr key={b.id} className="hover:bg-beige-50/50 align-top">
                    <td className="px-4 py-4 font-medium text-forest-900">{new Date(b.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td className="px-4 py-4 text-forest-700">{b.numPeople}</td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-forest-900">{b.customerName}</p>
                      <p className="text-forest-400 text-xs">{b.customerEmail}</p>
                      <p className="text-forest-400 text-xs">{b.customerPhone}</p>
                    </td>
                    <td className="px-4 py-4 text-forest-600">
                      <div>{extras || "-"}</div>
                      {b.notes && (
                        <div className="mt-1 text-xs text-forest-500 italic max-w-xs whitespace-pre-wrap">{b.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium text-forest-900">€{b.totalPrice}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${b.status === "paid" ? "bg-forest-100 text-forest-700" : "bg-beige-100 text-beige-600"}`}>
                        {b.status === "paid" ? t("statusPaid") : t("statusPending")}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => deleteBooking(b)}
                        disabled={deletingId === b.id}
                        title={t("deleteButton")}
                        aria-label={t("deleteButton")}
                        className="text-forest-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
