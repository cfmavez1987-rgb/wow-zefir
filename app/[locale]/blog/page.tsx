import { SectionTitle } from "@/components/shared/section-title";
import { CTWhatsApp } from "@/components/sections/cta-whatsapp";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return generateSEOMetadata({
    title: translations.seo.blog.title,
    description: translations.seo.blog.description,
    path: "/blog",
    locale: locale as Locale,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  const blogPosts = [
    {
      id: "1",
      title: "Как выбрать зефирный букет",
      excerpt: "Советы по выбору идеального зефирного букета для разных поводов и праздников.",
      date: "2024-03-15",
      slug: "how-to-choose",
    },
    {
      id: "2",
      title: "Уход за зефирным букетом",
      excerpt: "Как сохранить красоту и свежесть зефирного букета на долгое время.",
      date: "2024-03-10",
      slug: "care-tips",
    },
    {
      id: "3",
      title: "Зефирные букеты vs живые цветы",
      excerpt: "Сравнение зефирных букетов с обычными цветочными композициями.",
      date: "2024-03-05",
      slug: "comparison",
    },
    {
      id: "4",
      title: "Идеи подарков на 8 марта",
      excerpt: "Лучшие идеи подарков для женщин к Международному женскому дню.",
      date: "2024-02-28",
      slug: "march-8-gifts",
    },
    {
      id: "5",
      title: "Сертификат WOW Zefir",
      excerpt: "Обучение изготовлению зефирных букетов — новый навык для творческих людей.",
      date: "2024-02-20",
      slug: "certificate",
    },
    {
      id: "6",
      title: "Зефирное «птичье молоко»",
      excerpt: "История создания и секреты приготовления нашего фирменного десерта.",
      date: "2024-02-15",
      slug: "bird-milk",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4">
              {translations.blog.title}
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              {translations.blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl overflow-hidden group"
              >
                {/* Placeholder Image */}
                <div className="aspect-video bg-white/50 flex items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-24 h-16 opacity-30" aria-hidden="true">
                    <rect x="10" y="10" width="180" height="100" rx="8" fill="currentColor" />
                    <circle cx="60" cy="50" r="20" fill="white" opacity="0.5" />
                    <path d="M10 90 L60 60 L100 75 L140 50 L190 80 L190 110 Q190 110 10 110 Z" fill="white" opacity="0.3" />
                  </svg>
                </div>

                <div className="p-6">
                  <time className="text-caption text-neutral-400">
                    {new Date(post.date).toLocaleDateString(locale === "ru" ? "ru-RU" : "kk-KZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="font-display text-subheading font-semibold text-neutral-900 mt-2 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-neutral-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTWhatsApp locale={locale as Locale} translations={translations} />
    </>
  );
}
