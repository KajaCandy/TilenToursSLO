"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === `/${locale}/admin`;

  async function handleSignOut() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push(`/${locale}/admin`);
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-beige-50">
      <nav className="bg-forest-950 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-display text-lg text-beige-100">Tilen Tours: Admin</span>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}/admin/dashboard`} className={`${pathname.includes("dashboard") ? "text-white" : "text-beige-400 hover:text-beige-200"} transition-colors`}>{t("bookings")}</Link>
            <Link href={`/${locale}/admin/dates`} className={`${pathname.includes("dates") ? "text-white" : "text-beige-400 hover:text-beige-200"} transition-colors`}>{t("dates")}</Link>
          </div>
        </div>
        <button onClick={handleSignOut} className="text-sm text-beige-400 hover:text-beige-200 transition-colors">{t("signOut")}</button>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
