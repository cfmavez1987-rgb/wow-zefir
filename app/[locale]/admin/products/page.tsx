"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface Product {
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

export default function AdminProductsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "popular" | "new" | "gifts" | "hit">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить этот товар?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "hit" && product.is_hit) ||
      (filter === "new" && product.is_new) ||
      (filter !== "hit" && filter !== "new" && product.category === filter);

    const matchesSearch =
      searchQuery === "" ||
      product.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_kk.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filters = [
    { key: "all", label: "Все", count: products.length },
    { key: "popular", label: "Популярные", count: products.filter((p) => p.category === "popular").length },
    { key: "new", label: "Новинки", count: products.filter((p) => p.category === "new").length },
    { key: "gifts", label: "Подарки", count: products.filter((p) => p.category === "gifts").length },
    { key: "hit", label: "Хиты", count: products.filter((p) => p.is_hit).length },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-display font-bold text-neutral-900">
            Товары
          </h1>
          <p className="text-body text-neutral-600 mt-1">
            Управление каталогом букетов ({products.length})
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
                className="w-full pl-10 pr-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name_ru}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Icon name="gift" size={48} className="text-neutral-300" />
                </div>
              )}
              <div className="absolute top-2 left-2 flex gap-1">
                {product.is_hit && (
                  <Badge variant="primary" size="sm">Хит</Badge>
                )}
                {product.is_new && (
                  <Badge variant="success" size="sm">Новинка</Badge>
                )}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-1">
                {product.name_ru}
              </h3>
              <p className="text-body-sm text-neutral-600 mb-3 line-clamp-2">
                {product.description_ru}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-heading font-bold text-neutral-900">
                  {product.price?.toLocaleString("ru-RU")} ₸
                </div>
                <div className="flex gap-1">
                  {product.colors?.slice(0, 3).map((color, i) => (
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
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-error-light text-error rounded-lg hover:bg-error hover:text-white transition-colors text-body-sm"
                >
                  <Icon name="close" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <Icon name="gift" size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
            {searchQuery || filter !== "all" ? "Товары не найдены" : "Нет товаров"}
          </h3>
          <p className="text-body text-neutral-600 mb-4">
            {searchQuery || filter !== "all"
              ? "Попробуйте изменить фильтры или поиск"
              : "Добавьте первый товар в каталог"}
          </p>
          <Link
            href={`/${locale}/admin/products/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Icon name="gift" size={18} />
            Добавить товар
          </Link>
        </div>
      )}
    </div>
  );
}
