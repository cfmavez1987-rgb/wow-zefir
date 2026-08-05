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

## Редактирование текста на страницах

Все тексты на сайте находятся в файлах:
- `data/translations/ru.json` (русский)
- `data/translations/kk.json` (казахский)

### Главная страница (`/`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок "Зефирные букеты" | `hero.title` |
| Подзаголовок | `hero.subtitle` |
| Описание | `hero.description` |
| Кнопка "Выбрать букет" | `hero.cta` |
| Цена "от 15 000" | `hero.priceFrom` |

### Каталог (`/catalog`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок "Каталог букетов" | `catalog.title` |
| Подзаголовок | `catalog.subtitle` |
| Фильтр "Все" | `catalog.filterAll` |
| Фильтр "Популярные" | `catalog.filterPopular` |
| Фильтр "Новинки" | `catalog.filterNew` |
| Фильтр "Подарочные наборы" | `catalog.filterGifts` |

### О нас (`/about`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок | `about.title` |
| Подзаголовок | `about.subtitle` |
| Описание компании | `about.description` |
| Блок "Ручная работа" | `about.features.handmade.title` / `.description` |
| Блок "Натуральные ингредиенты" | `about.features.quality.title` / `.description` |
| Блок "Доставка по Актау" | `about.features.delivery.title` / `.description` |
| Блок "Индивидуальный подход" | `about.features.custom.title` / `.description` |

### Доставка и оплата (`/delivery`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок | `delivery.title` |
| Подзаголовок | `delivery.subtitle` |
| Блок "Доставка" | `delivery.methods.delivery.title` / `.description` |
| Блок "Самовывоз" | `delivery.methods.pickup.title` / `.description` |
| Заголовок оплаты | `delivery.payment.title` |
| Способы оплаты | `delivery.payment.methods[]` (массив) |

### Отзывы (`/reviews`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок | `reviews.title` |
| Подзаголовок | `reviews.subtitle` |
| Кнопка "Оставить отзыв" | `reviews.leaveReview` |

**Отзывы добавляются через админку** (`/ru/admin/reviews`)

### Контакты (`/contacts`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок | `contacts.title` |
| Подзаголовок | `contacts.subtitle` |
| Описание WhatsApp | `contacts.whatsappDescription` |
| Описание Instagram | `contacts.instagramDescription` |
| Описание телефона | `contacts.phoneDescription` |
| Адрес | `contacts.addressValue` |
| Режим работы | `contacts.workHoursValue` |

### Блог (`/blog`)

| Текст | Ключ в JSON |
|-------|-------------|
| Заголовок | `blog.title` |
| Подзаголовок | `blog.subtitle` |

**Статьи блога** -- в файле `app/[locale]/blog/page.tsx` (массив `blogPosts`)

### Шапка (Header)

| Текст | Ключ в JSON |
|-------|-------------|
| Главная | `header.home` |
| Каталог | `header.catalog` |
| О нас | `header.about` |
| Доставка и оплата | `header.delivery` |
| Отзывы | `header.reviews` |
| Контакты | `header.contacts` |
| Блог | `header.blog` |

### Подвал (Footer)

| Текст | Ключ в JSON |
|-------|-------------|
| Описание компании | `footer.description` |
| Копирайт | `footer.copyright` |

### Общие тексты (кнопки, элементы)

| Текст | Ключ в JSON |
|-------|-------------|
| "Заказать через WhatsApp" | `common.orderViaWhatsApp` |
| "Смотреть каталог" | `common.viewCatalog` |
| "Узнать больше" | `common.learnMore` |
| "Подробнее" | `common.viewDetails` |
| "Заказать" | `common.order` |
| "Назад" | `common.back` |
| Номер телефона | `common.phone` |

### SEO-заголовки и описания

| Страница | Ключ title | Ключ description |
|----------|------------|------------------|
| Главная | `seo.home.title` | `seo.home.description` |
| Каталог | `seo.catalog.title` | `seo.catalog.description` |
| О нас | `seo.about.title` | `seo.about.description` |
| Доставка | `seo.delivery.title` | `seo.delivery.description` |
| Отзывы | `seo.reviews.title` | `seo.reviews.description` |
| Контакты | `seo.contacts.title` | `seo.contacts.description` |
| Блог | `seo.blog.title` | `seo.blog.description` |

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
| Изменить статьи блога | Файл `app/[locale]/blog/page.tsx` (массив `blogPosts`) |
| Изменить логотип | Заменить файл `public/images/logo.jpeg` |
| Изменить фон главной | Заменить файл `public/images/hero-bg.jpg` |

---

## Контакты (на сайте)

- WhatsApp: +7 702 319 32 19
- Instagram: @wow_zefir_aktau
- Город: Актау, Казахстан
