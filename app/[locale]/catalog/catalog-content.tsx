"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";

type Category = "all" | "popular" | "new" | "gifts";

interface CatalogContentProps {
  locale: Locale;
  translations: typeof ruTranslations;
  products: Product[];
}

export function CatalogContent({
  locale,
  translations,
  products,
}: CatalogContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: translations.catalog.filterAll },
    { key: "popular", label: translations.catalog.filterPopular },
    { key: "new", label: translations.catalog.filterNew },
    { key: "gifts", label: translations.catalog.filterGifts },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={translations.catalog.title}
          subtitle={translations.catalog.subtitle}
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "primary" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                translations={{ common: translations.common }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="filter" size={24} className="text-neutral-400" />
            </div>
            <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
              {translations.catalog.noProducts}
            </h3>
            <p className="text-body text-neutral-600">
              {translations.catalog.tryDifferentFilter}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
