import { ProductCard } from "@/components/shared/product-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/data/products";

interface FeaturedCatalogProps {
  locale: Locale;
  products: Product[];
  translations: {
    catalog: {
      title: string;
      subtitle: string;
    };
    common: {
      viewCatalog: string;
      from: string;
      currency: string;
      hit: string;
      new: string;
      order: string;
      viewDetails: string;
    };
  };
}

export function FeaturedCatalog({
  locale,
  products,
  translations,
}: FeaturedCatalogProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={translations.catalog.title}
          subtitle={translations.catalog.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              translations={{ common: translations.common }}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            href={`/${locale}/catalog`}
            icon={<Icon name="arrowRight" size={20} />}
            iconPosition="right"
          >
            {translations.common.viewCatalog}
          </Button>
        </div>
      </div>
    </section>
  );
}
