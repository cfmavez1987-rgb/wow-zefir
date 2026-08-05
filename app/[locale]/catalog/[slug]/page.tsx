import { ProductContent } from "./product-content";
import type { Locale } from "@/lib/i18n";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <ProductContent locale={locale as Locale} slug={slug} />;
}
