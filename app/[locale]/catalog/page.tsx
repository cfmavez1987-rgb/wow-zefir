import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";
import type { Locale } from "@/lib/i18n";
import { CatalogContent } from "./catalog-content";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return (
    <CatalogContent
      locale={locale as Locale}
      translations={translations}
    />
  );
}
