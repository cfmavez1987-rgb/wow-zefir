"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { products as staticProducts, type Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";

type Category = "all" | "popular" | "new" | "gifts";

interface SupabaseProduct {
  id: string;
  slug: string;
  name_ru: string;
  name_kk: string;
  description_ru: string;
  description_kk: string;
  price: number;
  category: string;
  colors: string[];
  images: string[];
  is_hit: boolean;
  is_new: boolean;
}

interface CatalogContentProps {
  locale: Locale;
  translations: typeof ruTranslations;
}

export function CatalogContent({
  locale,
  translations,
}: CatalogContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    console.log("Loading products from API...");
    try {
      const res = await fetch("/api/admin/products");
      console.log("API response status:", res.status);
      if (res.ok) {
        const data: SupabaseProduct[] = await res.json();
        console.log("Received products count:", data.length);
        console.log("Products data:", data);
        const converted: Product[] = data.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: { ru: p.name_ru, kk: p.name_kk },
          description: { ru: p.description_ru, kk: p.description_kk },
          price: p.price,
          sizes: {},
          colors: p.colors || [],
          category: (p.category as Product["category"]) || "popular",
          tags: [],
          images: p.images || [],
          isHit: p.is_hit,
          isNew: p.is_new,
        }));
        console.log("Converted products:", converted);
        setDynamicProducts(converted);
      } else {
        const errorData = await res.json();
        console.error("API error:", errorData);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Merge: dynamic products first, then static (avoid duplicates by slug)
  const allProducts = [
    ...dynamicProducts,
    ...staticProducts.filter(
      (sp) => !dynamicProducts.some((dp) => dp.slug === sp.slug)
    ),
  ];

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: translations.catalog.filterAll },
    { key: "popular", label: translations.catalog.filterPopular },
    { key: "new", label: translations.catalog.filterNew },
    { key: "gifts", label: translations.catalog.filterGifts },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 ? (
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
        ) : !loading ? (
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
        ) : null}
      </div>
    </section>
  );
}
