"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";

interface SupabaseProduct {
  id: string;
  slug: string;
  name_ru: string;
  name_kk: string;
  description_ru: string;
  description_kk: string;
  price: number;
  sizes: Record<string, { price: number }>;
  colors: string[];
  category: string;
  images: string[];
  is_hit: boolean;
  is_new: boolean;
}

interface ProductContentProps {
  locale: Locale;
  slug: string;
}

export function ProductContent({ locale, slug }: ProductContentProps) {
  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const translations = locale === "kk"
    ? require("@/data/translations/kk.json")
    : ruTranslations;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const products: SupabaseProduct[] = await res.json();
        const found = products.find((p) => p.slug === slug);
        if (found) {
          setProduct(found);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-24">
        <Icon name="gift" size={48} className="mx-auto text-neutral-300 mb-4" />
        <h2 className="font-display text-heading font-semibold text-neutral-900 mb-2">
          Товар не найден
        </h2>
        <Link
          href={`/${locale}/catalog`}
          className="text-primary hover:text-primary-dark"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const name = locale === "kk" ? product.name_kk : product.name_ru;
  const description = locale === "kk" ? product.description_kk : product.description_ru;
  const whatsappUrl = createWhatsAppUrl({ productName: name });

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-body-sm text-neutral-400">
            <li>
              <Link href={`/${locale}`} className="hover:text-neutral-600">
                {translations.header.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/catalog`} className="hover:text-neutral-600">
                {translations.header.catalog}
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900">{name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Icon name="gift" size={64} className="text-neutral-300" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.is_hit && (
                <Badge variant="primary" size="md">
                  {translations.common.hit}
                </Badge>
              )}
              {product.is_new && (
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

            {/* Price */}
            <div className="bg-gradient-to-r from-primary-light to-accent-light rounded-xl p-6 mb-8">
              <div className="text-body-sm text-neutral-400 mb-1">
                {translations.common.from}
              </div>
              <div className="text-display font-bold text-neutral-900">
                {product.price?.toLocaleString("ru-RU")} {translations.common.currency}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
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
            )}

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
  );
}
