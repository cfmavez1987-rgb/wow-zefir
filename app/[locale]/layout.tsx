import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { ClientLayout } from "./client-layout";

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

  return (
    <div
      lang={locale}
      className="min-h-full flex flex-col"
      style={{
        fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
      }}
    >
      <ClientLayout locale={locale as Locale}>
        {children}
      </ClientLayout>
    </div>
  );
}
