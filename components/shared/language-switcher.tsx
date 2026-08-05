"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
}

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "kk", label: "Қазақша", flag: "KZ" },
];

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLanguage(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1.5 px-3 py-2 text-body-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать язык"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon name="globe" size={18} />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <Icon name="chevronDown" size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-medium border border-neutral-100 py-1 animate-scale-in z-50"
          role="listbox"
          aria-label="Выбор языка"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              className={[
                "w-full flex items-center gap-2 px-4 py-2 text-body-sm transition-colors",
                language.code === locale
                  ? "text-primary bg-primary-light font-medium"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
              ].join(" ")}
              onClick={() => switchLanguage(language.code)}
              role="option"
              aria-selected={language.code === locale}
            >
              <span className="font-medium">{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
