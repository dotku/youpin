import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, schema } from "@/db";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await db
    .select()
    .from(schema.leads)
    .orderBy(desc(schema.leads.createdAt))
    .limit(500);

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-sm text-slate-600">
            Messages from the contact form. Reply from the detail view.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          {["new", "in_progress", "replied", "closed", "spam"].map((s) => (
            <span
              key={s}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1"
            >
              {s}: <strong>{counts[s] ?? 0}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Locale</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No leads yet.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3 text-slate-700">{l.email}</td>
                <td className="px-4 py-3 text-slate-600">{l.company ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{l.locale ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={l.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/${l.id}`}
                    className="font-semibold text-brand-700 hover:text-brand-600"
                  >
                    Open →
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
