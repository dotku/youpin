import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import StatusBadge from "@/components/admin/StatusBadge";
import LeadActions from "@/components/admin/LeadActions";
import ReplyComposer from "@/components/admin/ReplyComposer";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isFinite(leadId)) notFound();

  const [lead] = await db
    .select()
    .from(schema.leads)
    .where(eq(schema.leads.id, leadId))
    .limit(1);
  if (!lead) notFound();

  const replies = await db
    .select()
    .from(schema.replies)
    .where(eq(schema.replies.leadId, leadId))
    .orderBy(asc(schema.replies.createdAt));

  return (
    <>
      <div className="mb-4 text-sm">
        <Link href="/admin" className="text-slate-500 hover:text-slate-900">
          ← All leads
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{lead.name}</h1>
            <div className="mt-1 text-sm text-slate-600">
              <a href={`mailto:${lead.email}`} className="hover:text-brand-700">
                {lead.email}
              </a>
              {lead.phone && <> · {lead.phone}</>}
              {lead.company && <> · {lead.company}</>}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Received {new Date(lead.createdAt).toLocaleString()} · locale {lead.locale ?? "—"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={lead.status} />
            <LeadActions id={lead.id} status={lead.status} />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Original message
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {lead.message}
          </p>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Replies ({replies.length})
          </h2>
          {replies.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5"
            >
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>
                  <strong>{r.sentByName ?? r.sentByEmail}</strong> · {r.sentByEmail}
                </span>
                <span>{new Date(r.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Reply to {lead.name}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Sends from your Resend sender. Replies go to their inbox; their replies go to you.
        </p>
        <ReplyComposer id={lead.id} />
      </div>
    </>
  );
}
