import { Hero } from "@/components/sections/hero";
import { FeaturedCatalog } from "@/components/sections/featured-catalog";
import { AboutPreview } from "@/components/sections/about-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTWhatsApp } from "@/components/sections/cta-whatsapp";
import { getHitProducts } from "@/data/products";
import { getLatestReviews } from "@/data/reviews";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const hitProducts = getHitProducts().slice(0, 6);
  const latestReviews = getLatestReviews(3);

  return (
    <>
      <Hero locale={locale as Locale} translations={translations} />
      <FeaturedCatalog
        locale={locale as Locale}
        products={hitProducts}
        translations={translations}
      />
      <AboutPreview locale={locale as Locale} translations={translations} />
      <Testimonials
        locale={locale as Locale}
        reviews={latestReviews}
        translations={translations}
      />
      <CTWhatsApp locale={locale as Locale} translations={translations} />
    </>
  );
}
