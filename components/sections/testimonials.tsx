import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/shared/section-title";
import type { Locale } from "@/lib/i18n";
import type { Review } from "@/data/reviews";

interface TestimonialsProps {
  locale: Locale;
  reviews: Review[];
  translations: {
    reviews: {
      title: string;
      subtitle: string;
    };
  };
}

export function Testimonials({ locale, reviews, translations }: TestimonialsProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={translations.reviews.title}
          subtitle={translations.reviews.subtitle}
        />

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
              <p className="text-body text-neutral-700 mb-6 line-clamp-4">
                &ldquo;{review.text[locale]}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft">
                  <span className="text-body-sm font-semibold text-primary">
                    {review.name[locale].charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-body-sm font-semibold text-neutral-900">
                    {review.name[locale]}
                  </div>
                  <div className="text-caption text-neutral-400">
                    {new Date(review.date).toLocaleDateString(locale === "ru" ? "ru-RU" : "kk-KZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
