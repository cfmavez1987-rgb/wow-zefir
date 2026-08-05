"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* 3D Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[50ms] ease-out will-change-transform"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          transform: `scale(1.1) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h1
            className="font-display text-display-lg sm:text-[4.5rem] font-bold text-white mb-4 animate-fade-in-up"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 100ms ease-out",
            }}
          >
            {translations.hero.title}
          </h1>
          <p
            className="text-body-lg sm:text-xl text-white/90 font-medium mb-6 animate-fade-in-up"
            style={{
              animationDelay: "0.1s",
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
              transition: "transform 100ms ease-out",
            }}
          >
            {translations.hero.subtitle}
          </p>
          <p
            className="text-body-lg text-white/80 mb-8 max-w-lg animate-fade-in-up"
            style={{
              animationDelay: "0.2s",
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: "transform 100ms ease-out",
            }}
          >
            {translations.hero.description}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{
              animationDelay: "0.3s",
              transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
              transition: "transform 100ms ease-out",
            }}
          >
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

          <div
            className="mt-8 flex items-center gap-6 animate-fade-in-up"
            style={{
              animationDelay: "0.4s",
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
              transition: "transform 100ms ease-out",
            }}
          >
            <div className="text-center">
              <div className="text-heading font-bold text-white">
                {translations.hero.priceFrom}
              </div>
              <div className="text-body-sm text-white/60">
                по городу
              </div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-heading font-bold text-white">
                15+
              </div>
              <div className="text-body-sm text-white/60">
                видов букетов
              </div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-heading font-bold text-white">
                100%
              </div>
              <div className="text-body-sm text-white/60">
                ручная работа
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
