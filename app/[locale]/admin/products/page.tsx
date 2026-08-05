"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";

export default function AdminProductsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [filter, setFilter] = useState<"all" | "popular" | "new" | "gifts" | "hit">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "hit" && product.isHit) ||
      product.category === filter;

    const matchesSearch =
      searchQuery === "" ||
      product.name.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.kk.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filters = [
    { key: "all", label: "Все", count: products.length },
    { key: "popular", label: "Популярные", count: products.filter((p) => p.category === "popular").length },
    { key: "new", label: "Новинки", count: products.filter((p) => p.category === "new").length },
    { key: "gifts", label: "Подарки", count: products.filter((p) => p.category === "gifts").length },
    { key: "hit", label: "Хиты", count: products.filter((p) => p.isHit).length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-display font-bold text-neutral-900">
            Товары
          </h1>
          <p className="text-body text-neutral-600 mt-1">
            Управление каталогом букетов
          </p>
        </div>
        <Link
          href={`/${locale}/admin/products/new`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Icon name="gift" size={18} />
          Добавить товар
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon
                name="filter"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                className={[
                  "px-3 py-1.5 rounded-lg text-body-sm font-medium transition-colors",
                  filter === f.key
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                ].join(" ")}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-soft overflow-hidden"
          >
            <div className="relative aspect-video bg-neutral-100">
              <Image
                src={product.images[0]}
                alt={product.name.ru}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                {product.isHit && (
                  <Badge variant="primary" size="sm">Хит</Badge>
                )}
                {product.isNew && (
                  <Badge variant="success" size="sm">Новинка</Badge>
                )}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-1">
                {product.name.ru}
              </h3>
              <p className="text-body-sm text-neutral-600 mb-3 line-clamp-2">
                {product.description.ru}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-heading font-bold text-neutral-900">
                  {product.price.toLocaleString("ru-RU")} ₸
                </div>
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-neutral-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/${locale}/admin/products/${product.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-body-sm"
                >
                  <Icon name="filter" size={14} />
                  Редактировать
                </Link>
                <Link
                  href={`/${locale}/catalog/${product.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-body-sm"
                >
                  <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <Icon name="gift" size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
            Товары не найдены
          </h3>
          <p className="text-body text-neutral-600 mb-4">
            Попробуйте изменить фильтры или поиск
          </p>
          <Link
            href={`/${locale}/admin/products/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Icon name="gift" size={18} />
            Добавить первый товар
          </Link>
        </div>
      )}
    </div>
  );
}
