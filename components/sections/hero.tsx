import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

interface HeroProps {
  locale: Locale;
  translations: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      priceFrom: string;
    };
    common: {
      viewCatalog: string;
    };
  };
}

export function Hero({ locale, translations }: HeroProps) {
  const whatsappUrl = createWhatsAppUrl();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-cream to-accent-light" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4 animate-fade-in-up">
              {translations.hero.title}
            </h1>
            <p className="text-body-lg sm:text-xl text-primary-dark font-medium mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {translations.hero.subtitle}
            </p>
            <p className="text-body-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {translations.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button
                variant="primary"
                size="lg"
                href={`/${locale}/catalog`}
                icon={<Icon name="arrowRight" size={20} />}
                iconPosition="right"
              >
                {translations.common.viewCatalog}
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappUrl}
                icon={<Icon name="whatsapp" size={20} />}
              >
                {translations.hero.cta}
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="text-heading font-bold text-neutral-900">
                  {translations.hero.priceFrom}
                </div>
                <div className="text-body-sm text-neutral-400">
                  по городу
                </div>
              </div>
              <div className="w-px h-12 bg-neutral-200" />
              <div className="text-center">
                <div className="text-heading font-bold text-neutral-900">
                  15+
                </div>
                <div className="text-body-sm text-neutral-400">
                  видов букетов
                </div>
              </div>
              <div className="w-px h-12 bg-neutral-200" />
              <div className="text-center">
                <div className="text-heading font-bold text-neutral-900">
                  100%
                </div>
                <div className="text-body-sm text-neutral-400">
                  ручная работа
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
              <div className="relative bg-white rounded-3xl shadow-large overflow-hidden p-8">
                <div className="aspect-square relative bg-gradient-to-br from-primary-light to-accent-light rounded-2xl flex items-center justify-center">
                  {/* Placeholder SVG illustration */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-3/4 h-3/4"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="bouquetGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E8A0BF" />
                        <stop offset="100%" stopColor="#F9A8D4" />
                      </linearGradient>
                      <linearGradient id="bouquetGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C4B5FD" />
                        <stop offset="100%" stopColor="#E9D5FF" />
                      </linearGradient>
                      <linearGradient id="bouquetGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A7F3D0" />
                        <stop offset="100%" stopColor="#D1FAE5" />
                      </linearGradient>
                    </defs>
                    {/* Stems */}
                    <path d="M100 180 L100 120" stroke="#86EFAC" strokeWidth="3" fill="none" />
                    <path d="M80 180 L85 125" stroke="#86EFAC" strokeWidth="3" fill="none" />
                    <path d="M120 180 L115 125" stroke="#86EFAC" strokeWidth="3" fill="none" />
                    {/* Leaves */}
                    <ellipse cx="75" cy="150" rx="15" ry="8" fill="#86EFAC" transform="rotate(-30 75 150)" />
                    <ellipse cx="125" cy="145" rx="15" ry="8" fill="#86EFAC" transform="rotate(30 125 145)" />
                    {/* Flowers */}
                    <circle cx="100" cy="90" r="25" fill="url(#bouquetGrad1)" />
                    <circle cx="100" cy="90" r="15" fill="white" opacity="0.3" />
                    <circle cx="75" cy="100" r="20" fill="url(#bouquetGrad2)" />
                    <circle cx="75" cy="100" r="12" fill="white" opacity="0.3" />
                    <circle cx="125" cy="95" r="22" fill="url(#bouquetGrad3)" />
                    <circle cx="125" cy="95" r="13" fill="white" opacity="0.3" />
                    <circle cx="90" cy="70" r="18" fill="url(#bouquetGrad1)" />
                    <circle cx="90" cy="70" r="10" fill="white" opacity="0.3" />
                    <circle cx="110" cy="75" r="16" fill="url(#bouquetGrad2)" />
                    <circle cx="110" cy="75" r="9" fill="white" opacity="0.3" />
                    {/* Wrapping */}
                    <path d="M70 170 Q100 160 130 170 L125 190 Q100 185 75 190 Z" fill="#FDE68A" />
                    <path d="M75 175 Q100 168 125 175" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-medium p-4 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center">
                  <Icon name="check" size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-body-sm font-semibold text-neutral-900">3490+</div>
                  <div className="text-caption text-neutral-400">довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
