"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { reviews } from "@/data/reviews";

export default function AdminReviewsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = reviews.filter((review) => {
    return (
      searchQuery === "" ||
      review.name.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.ru.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  function handleDelete(id: string) {
    if (confirm("Удалить этот отзыв?")) {
      alert("Отзыв удалён! (В реальной версии данные удаляются из Supabase)");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-display font-bold text-neutral-900">
            Отзывы
          </h1>
          <p className="text-body text-neutral-600 mt-1">
            Управление отзывами клиентов
          </p>
        </div>
        <Link
          href={`/${locale}/admin/reviews/new`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Icon name="star" size={18} />
          Добавить отзыв
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
        <div className="relative">
          <Icon
            name="filter"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Поиск по имени или тексту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <span className="text-body-sm font-semibold text-primary">
                      {review.name.ru.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-body font-semibold text-neutral-900">
                      {review.name.ru}
                    </div>
                    <div className="text-caption text-neutral-400">
                      {new Date(review.date).toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={16}
                      className={i < review.rating ? "text-yellow-400" : "text-neutral-200"}
                    />
                  ))}
                </div>

                <p className="text-body text-neutral-700">
                  {review.text.ru}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-neutral-400 hover:text-error hover:bg-error-light rounded-lg transition-colors"
                  title="Удалить"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <Icon name="star" size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
            Отзывы не найдены
          </h3>
          <p className="text-body text-neutral-600 mb-4">
            Попробуйте изменить поиск или добавьте новый отзыв
          </p>
          <Link
            href={`/${locale}/admin/reviews/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Icon name="star" size={18} />
            Добавить первый отзыв
          </Link>
        </div>
      )}
    </div>
  );
}
