import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/shared/section-title";
import { CTWhatsApp } from "@/components/sections/cta-whatsapp";
import { generateMetadata as generateSEOMetadata, generateLocalBusinessJsonLd } from "@/lib/seo";
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
    title: translations.seo.about.title,
    description: translations.seo.about.description,
    path: "/about",
    locale: locale as Locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const jsonLd = generateLocalBusinessJsonLd();

  const features = [
    {
      icon: "sparkle",
      title: translations.about.features.handmade.title,
      description: translations.about.features.handmade.description,
      color: "bg-primary-light text-primary",
    },
    {
      icon: "leaf",
      title: translations.about.features.quality.title,
      description: translations.about.features.quality.description,
      color: "bg-mint-light text-green-600",
    },
    {
      icon: "truck",
      title: translations.about.features.delivery.title,
      description: translations.about.features.delivery.description,
      color: "bg-accent-light text-purple-600",
    },
    {
      icon: "gift",
      title: translations.about.features.custom.title,
      description: translations.about.features.custom.description,
      color: "bg-warning-light text-yellow-600",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4">
              {translations.about.title}
            </h1>
            <p className="text-body-lg text-primary-dark font-medium mb-4">
              {translations.about.subtitle}
            </p>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              {translations.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl p-6 sm:p-8 text-center"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-display font-bold text-neutral-900 text-center mb-8">
              Наша история
            </h2>
            <p className="text-body-lg text-neutral-600 mb-6">
              WOW Zefir начался с простой идеи: создать подарок, который будет не только красивым, но и вкусным. Мы хотели предложить альтернативу обычным цветочным букетам, которые вянут через несколько дней.
            </p>
            <p className="text-body-lg text-neutral-600 mb-6">
              Каждый наш букет — это произведение искусства. Наши мастера вручную вылепливают каждый цветок из натурального зефира, тщательно подбирая цвета и формы. Результат — букет, который невозможно отличить от настоящего, пока вы его не попробуете.
            </p>
            <p className="text-body-lg text-neutral-600">
              Мы верим, что подарок должен быть особенным. Поэтому каждый наш букет создаётся с любовью и вниманием к деталям, чтобы принести радость и удивление.
            </p>
          </div>
        </div>
      </section>

      <CTWhatsApp locale={locale as Locale} translations={translations} />
    </>
  );
}
