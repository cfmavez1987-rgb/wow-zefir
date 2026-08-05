"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  translations: {
    header: {
      home: string;
      catalog: string;
      about: string;
      delivery: string;
      reviews: string;
      contacts: string;
      blog: string;
      menu: string;
      closeMenu: string;
    };
    common: {
      orderViaWhatsApp: string;
    };
  };
}

export function Header({ locale, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: `/${locale}`, label: translations.header.home },
    { href: `/${locale}/catalog`, label: translations.header.catalog },
    { href: `/${locale}/about`, label: translations.header.about },
    { href: `/${locale}/delivery`, label: translations.header.delivery },
    { href: `/${locale}/reviews`, label: translations.header.reviews },
    { href: `/${locale}/contacts`, label: translations.header.contacts },
    { href: `/${locale}/blog`, label: translations.header.blog },
  ];

  const whatsappUrl = createWhatsAppUrl();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к основному контенту
      </a>

      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-soft"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 shrink-0"
              aria-label="WOW Zefir - Главная"
            >
              <Image
                src="/images/logo.jpeg"
                alt="WOW Zefir логотип"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                priority
              />
              <span className="font-brand text-lg sm:text-xl text-neutral-900 leading-none">
                wow Zefir
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== `/${locale}` && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "px-3 py-2 text-body-sm font-medium rounded-lg transition-colors duration-200",
                      isActive
                        ? "text-primary bg-primary-light"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher locale={locale} />

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-caption font-medium bg-[#25D366] text-white rounded hover:bg-[#128C7E] transition-colors"
                aria-label={translations.common.orderViaWhatsApp}
              >
                <Icon name="whatsapp" size={12} />
                <span>{translations.common.orderViaWhatsApp}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center justify-center w-8 h-8 bg-[#25D366] text-white rounded-full hover:bg-[#128C7E] transition-colors"
                aria-label={translations.common.orderViaWhatsApp}
              >
                <Icon name="whatsapp" size={14} />
              </a>

              <button
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label={translations.header.menu}
                aria-expanded={isMobileMenuOpen}
              >
                <Icon name="menu" size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        locale={locale}
        translations={translations}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
