"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { products as staticProducts, type Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";

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

interface FeaturedCatalogDynamicProps {
  locale: Locale;
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

export function FeaturedCatalogDynamic({
  locale,
  translations,
}: FeaturedCatalogDynamicProps) {
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data: SupabaseProduct[] = await res.json();
        const converted: Product[] = data
          .filter((p) => p.is_hit)
          .map((p) => ({
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
        setDynamicProducts(converted);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Get hit products: dynamic first, then static
  const hitProducts = dynamicProducts.length > 0
    ? dynamicProducts.slice(0, 6)
    : staticProducts.filter((p) => p.isHit).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={translations.catalog.title}
          subtitle={translations.catalog.subtitle}
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {hitProducts.map((product) => (
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
          </>
        )}
      </div>
    </section>
  );
}
