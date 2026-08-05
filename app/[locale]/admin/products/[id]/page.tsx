"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { ImageUpload } from "@/components/ui/image-upload";
import { products, type Product } from "@/data/products";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    nameRu: "",
    nameKk: "",
    descriptionRu: "",
    descriptionKk: "",
    price: 0,
    category: "popular" as "popular" | "new" | "gifts",
    isHit: false,
    isNew: false,
    colors: [] as string[],
    tags: [] as string[],
    images: [] as string[],
  });
  const [newTag, setNewTag] = useState("");
  const [newColor, setNewColor] = useState("#E8A0BF");

  useEffect(() => {
    const found = products.find((p) => p.id === params.id);
    if (found) {
      setProduct(found);
      setFormData({
        nameRu: found.name.ru,
        nameKk: found.name.kk,
        descriptionRu: found.description.ru,
        descriptionKk: found.description.kk,
        price: found.price,
        category: found.category,
        isHit: found.isHit || false,
        isNew: found.isNew || false,
        colors: found.colors,
        tags: found.tags,
        images: found.images,
      });
    }
  }, [params.id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      alert("Товар обновлён! (В реальной версии данные сохраняются в Supabase)");
      router.push(`/${locale}/admin/products`);
    }, 500);
  }

  function addTag() {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag("");
    }
  }

  function removeTag(tag: string) {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  }

  function addColor() {
    if (!formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
    }
  }

  function removeColor(color: string) {
    setFormData({ ...formData, colors: formData.colors.filter((c) => c !== color) });
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <Icon name="gift" size={48} className="mx-auto text-neutral-300 mb-4" />
        <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
          Товар не найден
        </h3>
        <button
          onClick={() => router.push(`/${locale}/admin/products`)}
          className="text-primary hover:text-primary-dark"
        >
          Вернуться к списку
        </button>
      </div>
    );
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
          Редактирование товара
        </h1>
        <p className="text-body text-neutral-600 mt-1">
          {product.name.ru}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Основная информация
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Название (RU) *
              </label>
              <input
                type="text"
                value={formData.nameRu}
                onChange={(e) => setFormData({ ...formData, nameRu: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Название (KZ) *
              </label>
              <input
                type="text"
                value={formData.nameKk}
                onChange={(e) => setFormData({ ...formData, nameKk: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Описание (RU) *
              </label>
              <textarea
                value={formData.descriptionRu}
                onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Описание (KZ) *
              </label>
              <textarea
                value={formData.descriptionKk}
                onChange={(e) => setFormData({ ...formData, descriptionKk: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Цена и категория
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Цена (₸) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min={0}
                step={1000}
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-700 mb-1">
                Категория
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof formData.category })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="popular">Популярные</option>
                <option value="new">Новинки</option>
                <option value="gifts">Подарочные наборы</option>
              </select>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHit}
                  onChange={(e) => setFormData({ ...formData, isHit: e.target.checked })}
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                />
                <span className="text-body-sm text-neutral-700">Хит продаж</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                />
                <span className="text-body-sm text-neutral-700">Новинка</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Цвета
          </h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color) => (
                <div
                  key={color}
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg"
                >
                  <div
                    className="w-5 h-5 rounded-full border border-neutral-200"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-body-sm text-neutral-700">{color}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-neutral-400 hover:text-error"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-10 h-10 border border-neutral-200 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-body-sm"
              >
                Добавить цвет
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Теги
          </h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary-light text-primary rounded-lg"
                >
                  <span className="text-body-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-primary hover:text-primary-dark"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Новый тег"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-body-sm"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="font-display text-subheading font-semibold text-neutral-900 mb-4">
            Фотографии
          </h2>

          <ImageUpload
            value={formData.images}
            onChange={(urls) => setFormData({ ...formData, images: urls })}
            maxFiles={5}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Icon name="check" size={18} />
                Сохранить изменения
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
