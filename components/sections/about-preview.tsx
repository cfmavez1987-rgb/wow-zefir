import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

interface AboutPreviewProps {
  locale: Locale;
  translations: {
    about: {
      title: string;
      subtitle: string;
      description: string;
      features: {
        handmade: { title: string; description: string };
        quality: { title: string; description: string };
        delivery: { title: string; description: string };
        custom: { title: string; description: string };
      };
    };
    common: {
      learnMore: string;
    };
  };
}

export function AboutPreview({ locale, translations }: AboutPreviewProps) {
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
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-display sm:text-display-lg font-bold text-neutral-900 mb-4">
            {translations.about.title}
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
            {translations.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon name={feature.icon} size={24} />
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

        <div className="text-center">
          <Button
            variant="secondary"
            size="lg"
            href={`/${locale}/about`}
            icon={<Icon name="arrowRight" size={20} />}
            iconPosition="right"
          >
            {translations.common.learnMore}
          </Button>
        </div>
      </div>
    </section>
  );
}
