export const locales = ["ru", "kk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const locale = segments[1];
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return defaultLocale;
}

export function getTranslations(locale: Locale) {
  try {
    return require(`@/data/translations/${locale}.json`);
  } catch {
    return require(`@/data/translations/${defaultLocale}.json`);
  }
}
