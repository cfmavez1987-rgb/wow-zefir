"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    checkAuth();
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка авторизации");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    router.push(`/${locale}/admin`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-medium p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="font-display text-heading font-bold text-neutral-900">
              WOW Zefir Admin
            </h1>
            <p className="text-body-sm text-neutral-600 mt-1">
              Введите пароль для доступа
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-body-sm font-medium text-neutral-700 mb-1">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
            </div>

            {error && (
              <p className="text-body-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: `/${locale}/admin`, label: "Дашборд", icon: "sparkle" },
    { href: `/${locale}/admin/products`, label: "Товары", icon: "gift" },
    { href: `/${locale}/admin/reviews`, label: "Отзывы", icon: "star" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}/admin`} className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-neutral-900">
            WOW Zefir
          </span>
          <span className="text-body-sm text-neutral-400">Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
          aria-label="Меню"
        >
          <Icon name={sidebarOpen ? "close" : "menu"} size={24} />
        </button>
      </div>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed top-0 bottom-0 w-64 bg-white border-r border-neutral-200 z-50 transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="p-6 hidden lg:block">
          <Link href={`/${locale}/admin`} className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-neutral-900">
              WOW Zefir
            </span>
            <span className="text-body-sm text-neutral-400">Admin</span>
          </Link>
        </div>

        <nav className="px-4 pt-4 lg:pt-0 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-body-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-light text-primary"
                    : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 px-4 py-2 text-body-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors mb-2"
          >
            <Icon name="arrowRight" size={18} />
            На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-body-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Icon name="arrowLeft" size={18} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
