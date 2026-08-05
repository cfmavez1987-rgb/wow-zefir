import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  translations: {
    footer: {
      description: string;
      navigation: string;
      contacts: string;
      social: string;
      copyright: string;
    };
    header: {
      home: string;
      catalog: string;
      about: string;
      delivery: string;
      reviews: string;
      contacts: string;
      blog: string;
    };
    common: {
      phone: string;
    };
  };
}

export function Footer({ locale, translations }: FooterProps) {
  const whatsappUrl = createWhatsAppUrl();

  const navLinks = [
    { href: `/${locale}`, label: translations.header.home },
    { href: `/${locale}/catalog`, label: translations.header.catalog },
    { href: `/${locale}/about`, label: translations.header.about },
    { href: `/${locale}/delivery`, label: translations.header.delivery },
    { href: `/${locale}/reviews`, label: translations.header.reviews },
    { href: `/${locale}/contacts`, label: translations.header.contacts },
    { href: `/${locale}/blog`, label: translations.header.blog },
    { href: `/${locale}/admin`, label: "Admin" },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 mb-4"
              aria-label="WOW Zefir - Главная"
            >
              <Image
                src="/images/logo.jpeg"
                alt="WOW Zefir логотип"
                width={80}
                height={80}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="font-brand text-2xl text-white">
                wow Zefir
              </span>
            </Link>
            <p className="text-body-sm text-neutral-400 max-w-xs">
              {translations.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-subheading font-semibold text-white mb-4">
              {translations.footer.navigation}
            </h3>
            <nav aria-label="Навигация в подвале">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display text-subheading font-semibold text-white mb-4">
              {translations.footer.contacts}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+77023193219"
                  className="flex items-center gap-2 text-body-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Icon name="phone" size={16} />
                  <span>{translations.common.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-neutral-400 hover:text-[#25D366] transition-colors duration-200"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/wow_zefir_aktau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Icon name="instagram" size={16} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-body-sm text-neutral-400">
                  <Icon name="mapPin" size={16} />
                  <span>г. Актау, Казахстан</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-body-sm text-neutral-400">
                  <Icon name="clock" size={16} />
                  <span>Ежедневно 9:00 - 21:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-subheading font-semibold text-white mb-4">
              {translations.footer.social}
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/wow_zefir_aktau"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={20} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-[#25D366] hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-body-sm text-neutral-500 text-center">
            {translations.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
