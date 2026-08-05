import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { locales, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const translations = getTranslations(locale);

  return (
    <div
      lang={locale}
      className="min-h-full flex flex-col"
      style={{
        fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
      }}
    >
      <Header locale={locale} translations={translations} />

      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        {children}
      </main>

      <Footer locale={locale} translations={translations} />

      <WhatsAppButton translations={translations} />
    </div>
  );
}
