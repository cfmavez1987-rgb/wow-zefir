"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";

interface ClientLayoutProps {
  locale: Locale;
  children: React.ReactNode;
}

export function ClientLayout({ locale, children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  const translations = locale === "kk"
    ? require("@/data/translations/kk.json")
    : ruTranslations;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header locale={locale} translations={translations} />

      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        {children}
      </main>

      <Footer locale={locale} translations={translations} />

      <WhatsAppButton translations={translations} />
    </>
  );
}
