import Link from "next/link";
import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth0, isAdminEmail } from "@/lib/auth0";
import { routing, type Locale } from "@/i18n/routing";
import AdminLocaleSwitcher from "@/components/admin/AdminLocaleSwitcher";
import "../../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "admin" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function AdminLocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await auth0.getSession();
  if (!session) redirect(`/auth/login?returnTo=/admin/${locale}`);

  const t = await getTranslations({ locale, namespace: "admin" });

  if (!isAdminEmail(session.user?.email)) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow">
          <h1 className="text-xl font-semibold text-slate-900">
            {t("accessDeniedTitle")}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {t("accessDeniedBody", { email: session.user?.email ?? "" })}
          </p>
          <a
            href="/auth/logout"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t("signOut")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider>
      <div className="bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link
              href={`/admin/${locale}`}
              className="flex items-center gap-2.5 font-semibold"
            >
              <img
                src="/images/logomark.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="tracking-[0.16em]">{t("title")}</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <AdminLocaleSwitcher currentLocale={locale as Locale} />
              <span className="hidden text-slate-500 sm:inline">
                {session.user?.email}
              </span>
              <a
                href="/auth/logout"
                className="rounded-full border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-100"
              >
                {t("signOut")}
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
