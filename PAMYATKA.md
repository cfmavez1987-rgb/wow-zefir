# Памятка WOW Zefir

## Доступ

| Что | Где |
|-----|-----|
| Сайт | https://wow-zefir.vercel.app |
| Админка | https://wow-zefir.vercel.app/ru/admin |
| Пароль админки | wowzefir2024 |
| Supabase | https://supabase.com (ваш проект) |
| GitHub | https://github.com/cfmavez1987-rgb/wow-zefir |
| Vercel | https://vercel.com (ваш проект) |

---

## Админ-панель

### Товары
1. `/ru/admin` -> Товары -> Добавить товар
2. Заполнить: название (RU/KZ), описание, цена, категория
3. Загрузить фото (drag-and-drop или клик)
4. Сохранить

### Отзывы
1. `/ru/admin` -> Отзывы -> Добавить отзыв
2. Заполнить: имя, текст, оценка
3. Сохранить

### Редактирование
- Товары -> карточка товара -> Редактировать
- Изменить данные -> Сохранить

### Удаление
- Товары -> красная кнопка на карточке
- Подтвердить удаление (фото удаляются автоматически)

---

## Supabase

### Переменные окружения (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ADMIN_PASSWORD=wowzefir2024
NEXT_PUBLIC_BASE_URL=https://wowzefir.kz
```

### Таблицы (созданы)
- `products` -- товары
- `reviews` -- отзывы

### Storage
- Бакет: `product-images` (публичный)

---

## Локальная разработка

```bash
cd wow-zefir
npm install
npm run dev
# Открыть http://localhost:3000
```

---

## Деплой

Автоматический при пуше в GitHub:
```bash
git add -A
git commit -m "Описание изменений"
git push
```
Vercel деплоит автоматически за 1-2 минуты.

---

## Добавление товаров через код

Файл: `data/products.ts`

```typescript
{
  id: "16",
  slug: "new-bouquet",
  name: { ru: "Название", kk: "Атауы" },
  description: { ru: "Описание", kk: "Сипаттама" },
  price: 20000,
  sizes: { small: { price: 20000 }, medium: { price: 30000 } },
  colors: ["#F9A8D4", "#C4B5FD"],
  category: "popular", // popular | new | gifts
  tags: ["tag1"],
  images: ["/images/products/photo.jpg"],
  isHit: false,
  isNew: true,
}
```

---

## Переводы

- Русский: `data/translations/ru.json`
- Казахский: `data/translations/kk.json`

---

## Домен

1. Зарегистрировать wowzefir.kz на nic.kz
2. Vercel -> Settings -> Domains -> Add
3. Настроить DNS у регистратора:
   - A: 76.76.21.21
   - CNAME: cname.vercel-dns.com

---

## Частые задачи

| Задача | Действие |
|--------|----------|
| Добавить товар | Админка -> Товары -> Добавить |
| Изменить цену | Админка -> Товар -> Редактировать |
| Добавить отзыв | Админка -> Отзывы -> Добавить |
| Изменить текст на сайте | Изменить `data/translations/*.json` |
| Добавить фото | Админка -> Товар -> Редактировать -> Загрузить |
| Сменить пароль | Vercel -> Settings -> Environment Variables -> ADMIN_PASSWORD |

---

## Контакты (на сайте)

- WhatsApp: +7 702 319 32 19
- Instagram: @wow_zefir_aktau
- Город: Актау, Казахстан
