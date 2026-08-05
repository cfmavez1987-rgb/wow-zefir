"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { href: string; label: string }[];
  locale: Locale;
  translations: {
    header: {
      closeMenu: string;
    };
    common: {
      orderViaWhatsApp: string;
    };
  };
  whatsappUrl: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  locale,
  translations,
  whatsappUrl,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-large animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3"
              onClick={onClose}
              aria-label="WOW Zefir - Главная"
            >
              <Image
                src="/images/logo.jpeg"
                alt="WOW Zefir логотип"
                width={80}
                height={80}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="font-brand text-2xl text-neutral-900">
                wow Zefir
              </span>
            </Link>

            <button
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={onClose}
              aria-label={translations.header.closeMenu}
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Мобильная навигация">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-3 text-body font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-100">
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              icon={<Icon name="whatsapp" size={20} />}
              fullWidth
            >
              {translations.common.orderViaWhatsApp}
            </Button>

            <div className="flex items-center justify-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/wow_zefir_aktau"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={24} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-400 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
