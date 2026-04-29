"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const t = useTranslations("admin");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(`/${locale}/admin/dashboard`);
    } else {
      setError(t("wrongPassword"));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="font-display text-2xl text-forest-900 mb-6">{t("login")}</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-forest-600 mb-1">{t("password")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-500"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-700 hover:bg-forest-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            {loading ? "..." : t("signIn")}
          </button>
        </form>
      </div>
    </div>
  );
}
