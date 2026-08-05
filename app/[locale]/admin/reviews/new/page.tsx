"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export default function NewReviewPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nameRu: "",
    nameKk: "",
    textRu: "",
    textKk: "",
    rating: 5,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка сохранения");
      }

      router.push(`/${locale}/admin/reviews`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения отзыва");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-body-sm text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <Icon name="arrowLeft" size={16} />
          Назад
        </button>
        <h1 className="font-display text-display font-bold text-neutral-900">
          Новый отзыв
        </h1>
        <p className="text-body text-neutral-600 mt-1">
          Добавление отзыва от клиента
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Информация об отзыве
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Имя (RU) *
              </label>
              <input
                type="text"
                value={formData.nameRu}
                onChange={(e) => setFormData({ ...formData, nameRu: e.target.value })}
                className="w-full px-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Айгуль"
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Имя (KZ) *
              </label>
              <input
                type="text"
                value={formData.nameKk}
                onChange={(e) => setFormData({ ...formData, nameKk: e.target.value })}
                className="w-full px-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Айгүл"
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Текст отзыва (RU) *
              </label>
              <textarea
                value={formData.textRu}
                onChange={(e) => setFormData({ ...formData, textRu: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Заказывала букет на 8 марта..."
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Текст отзыва (KZ) *
              </label>
              <textarea
                value={formData.textKk}
                onChange={(e) => setFormData({ ...formData, textKk: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="8 наурызға букетке тапсырыс бердім..."
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-2">
                Оценка
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1"
                  >
                    <Icon
                      name="star"
                      size={24}
                      className={
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-neutral-200"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-body-sm text-neutral-600">
                  {formData.rating} из 5
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-error-light text-error p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Icon name="check" size={18} />
                Сохранить отзыв
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
