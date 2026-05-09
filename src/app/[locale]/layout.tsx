import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieBanner from "@/components/CookieBanner";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tilen-tours.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tilen Tours Slovenia: One Day, Three Worlds",
  description: "Private guided day tour from Ljubljana through the Soča Valley to the Adriatic coast. Small group, local guide, maximum 4 people.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Tilen Tours Slovenia",
    title: "Tilen Tours Slovenia: One Day, Three Worlds",
    description: "Private guided day tour from Ljubljana through the Soča Valley to the Adriatic coast. Small group, max 4 people.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Tilen Tours DS7 SUV at the Soča river" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tilen Tours Slovenia: One Day, Three Worlds",
    description: "Private guided day tour: Ljubljana → Soča Valley → Adriatic coast. Max 4 people.",
    images: ["/og-image.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "sl" | "it" | "de")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-beige-50 text-forest-950 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
