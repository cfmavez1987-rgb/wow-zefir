import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, products } from "@/data/products";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { generateMetadata as generateSEOMetadata, generateProductJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return generateSEOMetadata({
    title: product.name[locale as Locale],
    description: product.description[locale as Locale],
    path: `/catalog/${slug}`,
    locale: locale as Locale,
    image: product.images[0],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const translations = getTranslations(locale as Locale);
  const name = product.name[locale as Locale];
  const description = product.description[locale as Locale];
  const whatsappUrl = createWhatsAppUrl({ productName: name });

  const jsonLd = generateProductJsonLd({
    name,
    description,
    price: product.price,
    currency: "KZT",
    image: product.images[0],
    url: `/${locale}/catalog/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
              <Image
                src={product.images[0]}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.isHit && (
                  <Badge variant="primary" size="md">
                    {translations.common.hit}
                  </Badge>
                )}
                {product.isNew && (
                  <Badge variant="success" size="md">
                    {translations.common.new}
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="font-display text-display sm:text-display-lg font-bold text-neutral-900 mb-4">
                {name}
              </h1>

              <p className="text-body-lg text-neutral-600 mb-8">
                {description}
              </p>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="text-body font-semibold text-neutral-900 mb-3">
                  {translations.common.size}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(product.sizes).map(([size, data]) => (
                    <div
                      key={size}
                      className="flex-1 min-w-[120px] bg-neutral-100 rounded-xl p-4 text-center"
                    >
                      <div className="text-body-sm text-neutral-400 mb-1 capitalize">
                        {translations.common[size as keyof typeof translations.common]}
                      </div>
                      <div className="text-heading font-bold text-neutral-900">
                        {data.price.toLocaleString("ru-RU")} {translations.common.currency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="text-body font-semibold text-neutral-900 mb-3">
                  {translations.common.color}
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-neutral-200 shadow-soft"
                      style={{ backgroundColor: color }}
                      aria-label={`Цвет ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary-light to-accent-light rounded-xl p-6 mb-8">
                <div className="text-body-sm text-neutral-400 mb-1">
                  {translations.common.from}
                </div>
                <div className="text-display font-bold text-neutral-900">
                  {product.price.toLocaleString("ru-RU")} {translations.common.currency}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={whatsappUrl}
                  icon={<Icon name="whatsapp" size={24} />}
                  fullWidth
                >
                  {translations.common.orderViaWhatsApp}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href={`/${locale}/catalog`}
                  icon={<Icon name="arrowLeft" size={20} />}
                  fullWidth
                >
                  {translations.common.back}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
