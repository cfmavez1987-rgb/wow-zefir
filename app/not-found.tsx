import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="font-display text-display-lg font-bold text-neutral-900 mb-4">
          404
        </h1>
        <p className="text-body-lg text-neutral-600 mb-8">
          Страница не найдена
        </p>
        <Link
          href="/ru"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
