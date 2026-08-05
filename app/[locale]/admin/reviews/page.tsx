"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";

interface Review {
  id: string;
  name_ru: string;
  name_kk: string;
  text_ru: string;
  text_kk: string;
  rating: number;
  date: string;
}

export default function AdminReviewsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить этот отзыв?")) return;

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  }

  const filteredReviews = reviews.filter((review) => {
    return (
      searchQuery === "" ||
      review.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text_ru.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display font-bold text-neutral-900">
            Отзывы
          </h1>
          <p className="text-body text-neutral-600 mt-1">
            Управление отзывами клиентов ({reviews.length})
          </p>
        </div>
        <Link
          href={`/${locale}/admin/reviews/new`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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
            className="w-full pl-10 pr-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-soft p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                    <span className="text-body-sm font-semibold text-primary">
                      {review.name_ru?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <div className="text-body font-semibold text-neutral-900">
                      {review.name_ru}
                    </div>
                    <div className="text-caption text-neutral-400">
                      {review.date
                        ? new Date(review.date).toLocaleDateString("ru-RU", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
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
                  {review.text_ru}
                </p>
              </div>

              <button
                onClick={() => handleDelete(review.id)}
                className="self-start p-2 text-neutral-400 hover:text-error hover:bg-error-light rounded-lg transition-colors"
                title="Удалить"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <Icon name="star" size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
            {searchQuery ? "Отзывы не найдены" : "Нет отзывов"}
          </h3>
          <p className="text-body text-neutral-600 mb-4">
            {searchQuery
              ? "Попробуйте изменить поиск"
              : "Добавьте первый отзыв от клиента"}
          </p>
          <Link
            href={`/${locale}/admin/reviews/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Icon name="star" size={18} />
            Добавить отзыв
          </Link>
        </div>
      )}
    </div>
  );
}
