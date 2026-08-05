import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/section-title";
import { CTWhatsApp } from "@/components/sections/cta-whatsapp";
import { reviews } from "@/data/reviews";
import { createWhatsAppUrlForReview } from "@/lib/whatsapp";
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
    title: translations.seo.reviews.title,
    description: translations.seo.reviews.description,
    path: "/reviews",
    locale: locale as Locale,
  });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const whatsappReviewUrl = createWhatsAppUrlForReview();

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4">
              {translations.reviews.title}
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              {translations.reviews.subtitle}
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappReviewUrl}
              icon={<Icon name="whatsapp" size={20} />}
            >
              {translations.reviews.leaveReview}
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl p-6 sm:p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={18}
                      className={i < review.rating ? "text-yellow-400" : "text-neutral-200"}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-body text-neutral-700 mb-6">
                  &ldquo;{review.text[locale as Locale]}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft">
                    <span className="text-body-sm font-semibold text-primary">
                      {review.name[locale as Locale].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-body-sm font-semibold text-neutral-900">
                      {review.name[locale as Locale]}
                    </div>
                    <div className="text-caption text-neutral-400">
                      {new Date(review.date).toLocaleDateString(
                        locale === "ru" ? "ru-RU" : "kk-KZ",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTWhatsApp locale={locale as Locale} translations={translations} />
    </>
  );
}
