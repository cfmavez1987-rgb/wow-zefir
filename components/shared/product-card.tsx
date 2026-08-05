import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  translations: {
    common: {
      from: string;
      currency: string;
      hit: string;
      new: string;
      order: string;
      viewDetails: string;
    };
  };
}

export function ProductCard({ product, locale, translations }: ProductCardProps) {
  const name = product.name[locale];
  const description = product.description[locale];
  const whatsappUrl = createWhatsAppUrl({ productName: name });

  return (
    <article className="group bg-white rounded-xl border border-neutral-100 overflow-hidden transition-all duration-300 ease-out hover:shadow-medium hover:-translate-y-1">
      {/* Image */}
      <Link
        href={`/${locale}/catalog/${product.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-neutral-100"
      >
        <Image
          src={product.images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isHit && (
            <Badge variant="primary" size="sm">
              {translations.common.hit}
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="success" size="sm">
              {translations.common.new}
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <Link
          href={`/${locale}/catalog/${product.slug}`}
          className="block mb-2"
        >
          <h3 className="font-display text-subheading font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200">
            {name}
          </h3>
        </Link>

        <p className="text-body-sm text-neutral-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-body-sm text-neutral-400">
              {translations.common.from}{" "}
            </span>
            <span className="text-heading font-bold text-neutral-900">
              {product.price.toLocaleString("ru-RU")} {translations.common.currency}
            </span>
          </div>

          {/* Color dots */}
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-neutral-200"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            href={`/${locale}/catalog/${product.slug}`}
            className="flex-1"
          >
            {translations.common.viewDetails}
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            href={whatsappUrl}
            icon={<Icon name="whatsapp" size={16} />}
            className="flex-1"
          >
            {translations.common.order}
          </Button>
        </div>
      </div>
    </article>
  );
}
