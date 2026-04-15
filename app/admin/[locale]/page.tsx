import Link from "next/link";
import { desc } from "drizzle-orm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { routing } from "@/i18n/routing";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "admin" });

  const leads = await db
    .select()
    .from(schema.leads)
    .orderBy(desc(schema.leads.createdAt))
    .limit(500);

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  const statuses = ["new", "in_progress", "replied", "closed", "spam"] as const;

  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("leads.title")}</h1>
          <p className="text-sm text-slate-600">{t("leads.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          {statuses.map((s) => (
            <span
              key={s}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1"
            >
              {t(`status.${s}`)}: <strong>{counts[s] ?? 0}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-start text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">{t("leads.received")}</th>
              <th className="px-4 py-3 text-start">{t("leads.name")}</th>
              <th className="px-4 py-3 text-start">{t("leads.email")}</th>
              <th className="px-4 py-3 text-start">{t("leads.company")}</th>
              <th className="px-4 py-3 text-start">{t("leads.locale")}</th>
              <th className="px-4 py-3 text-start">{t("leads.status")}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  {t("leads.empty")}
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                  {new Date(l.createdAt).toLocaleString(locale)}
                </td>
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3 text-slate-700">{l.email}</td>
                <td className="px-4 py-3 text-slate-600">{l.company ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{l.locale ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={l.status} label={t(`status.${l.status}`)} />
                </td>
                <td className="px-4 py-3 text-end">
                  <Link
                    href={`/admin/${locale}/${l.id}`}
                    className="font-semibold text-brand-700 hover:text-brand-600"
                  >
                    {t("leads.open")} →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
