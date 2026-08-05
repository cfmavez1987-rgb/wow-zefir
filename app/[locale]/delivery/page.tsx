import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/shared/section-title";
import { CTWhatsApp } from "@/components/sections/cta-whatsapp";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return generateSEOMetadata({
    title: translations.seo.delivery.title,
    description: translations.seo.delivery.description,
    path: "/delivery",
    locale: locale as Locale,
  });
}

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4">
              {translations.delivery.title}
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              {translations.delivery.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-16">
            {/* Delivery */}
            <div className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl p-8">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Icon name="truck" size={28} className="text-white" />
              </div>
              <h3 className="font-display text-heading font-semibold text-neutral-900 mb-4">
                {translations.delivery.methods.delivery.title}
              </h3>
              <p className="text-body text-neutral-600">
                {translations.delivery.methods.delivery.description}
              </p>
            </div>

            {/* Pickup */}
            <div className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl p-8">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
                <Icon name="mapPin" size={28} className="text-white" />
              </div>
              <h3 className="font-display text-heading font-semibold text-neutral-900 mb-4">
                {translations.delivery.methods.pickup.title}
              </h3>
              <p className="text-body text-neutral-600">
                {translations.delivery.methods.pickup.description}
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-cream rounded-xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-warning rounded-xl flex items-center justify-center mx-auto mb-6">
                <Icon name="shield" size={28} className="text-white" />
              </div>
              <h3 className="font-display text-heading font-semibold text-neutral-900 mb-4">
                {translations.delivery.payment.title}
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {translations.delivery.payment.methods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-soft"
                >
                  <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="check" size={20} className="text-green-600" />
                  </div>
                  <p className="text-body font-medium text-neutral-900">
                    {method}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTWhatsApp locale={locale as Locale} translations={translations} />
    </>
  );
}
