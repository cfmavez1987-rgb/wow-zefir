import type { Metadata } from "next";
import type { Locale } from "./i18n";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  locale,
  image = "/images/og-default.jpg",
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wowzefir.kz";
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "ru": `${baseUrl}/ru${path}`,
        "kk": `${baseUrl}/kk${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "WOW Zefir",
      locale: locale === "ru" ? "ru_RU" : "kk_KZ",
      type: "website",
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateProductJsonLd(product: {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "WOW Zefir",
      },
    },
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WOW Zefir",
    description: "Авторские букеты из ручного зефира в Актау",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://wowzefir.kz",
    telephone: "+77023193219",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Актау",
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6532,
      longitude: 51.1464,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: [
      "https://www.instagram.com/wow_zefir_aktau",
    ],
  };
}
