import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WOW Zefir — Зефирные букеты в Актау",
    template: "%s | WOW Zefir",
  },
  description:
    "Авторские букеты из ручного зефира в Актау. Выглядят как настоящие цветы, но полностью съедобны. Доставка по городу. Заказ через WhatsApp.",
  keywords: [
    "зефирные букеты",
    "букеты из зефира",
    "Актау",
    "подарок",
    "зефир",
    "птичье молоко",
    "доставка букетов",
  ],
  authors: [{ name: "WOW Zefir" }],
  creator: "WOW Zefir",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://wowzefir.kz"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "ru": "/ru",
      "kk": "/kk",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "WOW Zefir",
    title: "WOW Zefir — Зефирные букеты в Актау",
    description:
      "Авторские букеты из ручного зефира в Актау. Выглядят как настоящие цветы, но полностью съедобны.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "WOW Zefir — Зефирные букеты",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WOW Zefir — Зефирные букеты в Актау",
    description:
      "Авторские букеты из ручного зефира в Актау. Выглядят как настоящие цветы, но полностью съедобны.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}
