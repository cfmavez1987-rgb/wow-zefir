# WOW Zefir -- Зефирные букеты в Актау

Сайт-каталог зефирных букетов с заказом через WhatsApp.

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Скопируйте `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:

```env
# Базовый URL сайта
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Номер WhatsApp (без +)
NEXT_PUBLIC_WHATSAPP_NUMBER=77023193219

# Пароль админ-панели
ADMIN_PASSWORD=ваш_пароль

# Supabase (для хранения данных)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Запуск

```bash
npm run dev
```

Откройте http://localhost:3000

---

## Структура проекта

```
wow-zefir/
├── app/
│   ├── [locale]/           # Страницы с i18n (ru, kk)
│   │   ├── page.tsx        # Главная
│   │   ├── catalog/        # Каталог
│   │   ├── about/          # О нас
│   │   ├── delivery/       # Доставка
│   │   ├── reviews/        # Отзывы
│   │   ├── contacts/       # Контакты
│   │   └── blog/           # Блог
│   ├── admin/              # Панель админа
│   │   ├── products/       # Управление товарами
│   │   └── reviews/        # Управление отзывами
│   └── api/                # API маршруты
├── components/
│   ├── ui/                 # Базовые компоненты
│   ├── layout/             # Header, Footer, Menu
│   ├── sections/           # Секции страниц
│   └── shared/             # Общие компоненты
├── data/
│   ├── products.ts         # Товары (статичные)
│   ├── reviews.ts          # Отзывы (статичные)
│   └── translations/       # Переводы ru, kk
├── lib/
│   ├── i18n.ts             # Утилиты i18n
│   ├── whatsapp.ts         # WhatsApp ссылки
│   ├── seo.ts              # SEO метаданные
│   ├── supabase.ts         # Клиент Supabase
│   └── admin-auth.ts       # Авторизация админа
└── public/
    └── images/             # Изображения
        ├── products/       # Фото букетов
        └── logo.jpeg       # Логотип
```

---

## Добавление товаров

### Вариант 1: Через код (текущий способ)

Откройте `data/products.ts` и добавьте новый объект:

```typescript
{
  id: "16",
  slug: "new-bouquet-name",
  name: {
    ru: "Название букета",
    kk: "Букет атауы",
  },
  description: {
    ru: "Описание на русском",
    kk: "Қазақша сипаттама",
  },
  price: 20000,
  sizes: {
    small: { price: 20000 },
    medium: { price: 30000 },
    large: { price: 40000 },
  },
  colors: ["#F9A8D4", "#C4B5FD"],
  category: "popular", // popular | new | gifts
  tags: ["tag1", "tag2"],
  images: ["/images/products/photo.jpg"],
  isHit: false,
  isNew: true,
}
```

### Вариант 2: Через админ-панель

1. Зайдите на `/{locale}/admin` (например, `/ru/admin`)
2. Введите пароль
3. Перейдите в "Товары" -> "Добавить товар"
4. Заполните форму и сохраните

---

## Добавление фотографий

1. Положите фото в `public/images/products/`
2. Назовите файл (например, `my-bouquet.jpg`)
3. В данных товара укажите путь: `images: ["/images/products/my-bouquet.jpg"]`

**Рекомендации:**
- Формат: JPG, PNG, WebP
- Размер: 800x600 px или больше
- Соотношение сторон: 4:3

---

## Настройка Supabase (для админ-панели)

### 1. Создайте проект

1. Зайдите на https://supabase.com
2. Создайте новый проект
3. Скопируйте URL и Anon Key в `.env.local`

### 2. Создайте таблицы

Выполните SQL в Supabase Dashboard -> SQL Editor:

```sql
-- Таблица товаров
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_ru TEXT NOT NULL,
  name_kk TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_kk TEXT NOT NULL,
  price INTEGER NOT NULL,
  sizes JSONB DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'popular',
  tags TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_hit BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица отзывов
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ru TEXT NOT NULL,
  name_kk TEXT NOT NULL,
  text_ru TEXT NOT NULL,
  text_kk TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включите Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Политики для анонимного чтения
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON reviews FOR SELECT USING (true);

-- Политики для вставки/обновления (только авторизованные)
CREATE POLICY "Allow insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON products FOR DELETE USING (true);

CREATE POLICY "Allow insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON reviews FOR DELETE USING (true);
```

### 3. Настройте Storage (для загрузки фото)

1. В Supabase Dashboard -> Storage
2. Создайте бакет `product-images`
3. Сделайте его публичным

---

## Домен и деплой на Vercel

### 1. Регистрация домена

Зарегистрируйте домен (например, `wowzefir.kz`) на:
- https://www.nic.kz (для .kz доменов)
- https://reg.ru
- https://namecheap.com

### 2. Деплой на Vercel

1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "New Project"
4. Импортируйте репозиторий
5. Настройте переменные окружения:
   - `NEXT_PUBLIC_BASE_URL` = `https://wowzefir.kz`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `77023193219`
   - `ADMIN_PASSWORD` = `ваш_пароль`
   - `NEXT_PUBLIC_SUPABASE_URL` = `your_url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your_key`
6. Нажмите "Deploy"

### 3. Привязка домена

1. В Vercel -> Project -> Settings -> Domains
2. Добавьте ваш домен
3. Скопируйте DNS-записи
4. Настройте DNS у регистратора домена:
   - A-запись: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

---

## Админ-панель

**URL:** `/{locale}/admin` (например, `/ru/admin` или `/kk/admin`)
**Пароль:** задается в `ADMIN_PASSWORD` (по умолчанию `wowzefir2024`)

### Функции:
- Просмотр статистики
- Добавление/редактирование товаров
- Управление отзывами
- Загрузка фотографий (при подключенном Supabase)

---

## i18n (Мультиязычность)

Сайт поддерживает два языка:
- Русский: `/ru/...`
- Казахский: `/kk/...`

Переводы находятся в `data/translations/ru.json` и `data/translations/kk.json`.

---

## Технологии

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Supabase** (база данных, хранение файлов)
- **Vercel** (хостинг)

---

## Команды

```bash
npm run dev      # Запуск разработки
npm run build    # Сборка для продакшена
npm run start    # Запуск продакшена
npm run lint     # Проверка кода
```

---

## SEO

Сайт оптимизирован для поисковых систем:
- SSG (статическая генерация страниц)
- Meta теги (Open Graph, Twitter Cards)
- JSON-LD структурированные данные
- Sitemap.xml
- Robots.txt
- Мультиязычные URL

---

## Контакты

- WhatsApp: +7 702 319 32 19
- Instagram: @wow_zefir_aktau
