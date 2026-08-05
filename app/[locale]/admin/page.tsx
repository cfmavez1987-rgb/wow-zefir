"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Stats {
  totalProducts: number;
  hitProducts: number;
  newProducts: number;
  totalReviews: number;
}

export default function AdminDashboard() {
  const params = useParams();
  const locale = params.locale as string;
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    hitProducts: 0,
    newProducts: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  }

  const statCards = [
    {
      title: "Всего товаров",
      value: stats.totalProducts,
      icon: "gift",
      color: "bg-primary-light text-primary",
      href: `/${locale}/admin/products`,
    },
    {
      title: "Хиты продаж",
      value: stats.hitProducts,
      icon: "star",
      color: "bg-warning-light text-yellow-600",
      href: `/${locale}/admin/products?filter=hit`,
    },
    {
      title: "Новинки",
      value: stats.newProducts,
      icon: "sparkle",
      color: "bg-success-light text-green-600",
      href: `/${locale}/admin/products?filter=new`,
    },
    {
      title: "Отзывов",
      value: stats.totalReviews,
      icon: "heart",
      color: "bg-accent-light text-purple-600",
      href: `/${locale}/admin/reviews`,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-display font-bold text-neutral-900">
          Дашборд
        </h1>
        <p className="text-body text-neutral-600 mt-1">
          Управление каталогом WOW Zefir
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <Icon name={card.icon} size={24} />
              </div>
            </div>
            <div className="text-display font-bold text-neutral-900">
              {card.value}
            </div>
            <div className="text-body-sm text-neutral-600">
              {card.title}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-soft">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Быстрые действия
          </h2>
          <div className="space-y-3">
            <Link
              href={`/${locale}/admin/products/new`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Icon name="gift" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-body-sm font-medium text-neutral-900">Добавить товар</div>
                <div className="text-caption text-neutral-400">Создать новую карточку букета</div>
              </div>
            </Link>
            <Link
              href={`/${locale}/admin/reviews/new`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center">
                <Icon name="star" size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-body-sm font-medium text-neutral-900">Добавить отзыв</div>
                <div className="text-caption text-neutral-400">Новый отзыв от клиента</div>
              </div>
            </Link>
            <a
              href={`/${locale}/catalog`}
              target="_blank"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                <Icon name="arrowRight" size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-body-sm font-medium text-neutral-900">Просмотреть сайт</div>
                <div className="text-caption text-neutral-400">Открыть каталог в новой вкладке</div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Информация
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-cream rounded-lg">
              <h3 className="text-body-sm font-medium text-neutral-900 mb-1">Supabase</h3>
              <p className="text-caption text-neutral-600">
                Подключите Supabase для хранения данных товаров и отзывов.
                Добавьте переменные окружения в .env.local:
              </p>
              <code className="block mt-2 p-2 bg-neutral-100 rounded text-caption">
                NEXT_PUBLIC_SUPABASE_URL=your_url<br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
              </code>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <h3 className="text-body-sm font-medium text-neutral-900 mb-1">Пароль админа</h3>
              <p className="text-caption text-neutral-600">
                Измените пароль в переменной окружения ADMIN_PASSWORD.
                По умолчанию: wowzefir2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
