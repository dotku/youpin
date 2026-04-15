import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth0";
import { replySchema } from "@/lib/validation";
import { sendEmail, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const leadId = Number(id);
  if (!Number.isFinite(leadId)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = replySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reply" }, { status: 400 });
  }

  const [lead] = await db
    .select()
    .from(schema.leads)
    .where(eq(schema.leads.id, leadId))
    .limit(1);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const subject = `Re: Your message to UPIN`;
  const html = `
    <p>Hi ${escapeHtml(lead.name)},</p>
    <div style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(parsed.data.body)}</div>
    <hr/>
    <blockquote style="color:#666; border-left:3px solid #ddd; padding-left:12px;">
      <strong>Your original message:</strong><br/>
      <span style="white-space: pre-wrap;">${escapeHtml(lead.message)}</span>
    </blockquote>
  `;

  const sendResult = await sendEmail({
    to: lead.email,
    replyTo: admin.email,
    subject,
    html,
  });

  if (!sendResult.ok) {
    return NextResponse.json({ error: sendResult.error }, { status: 502 });
  }

  await db.insert(schema.replies).values({
    leadId,
    body: parsed.data.body,
    sentByEmail: admin.email,
    sentByName: admin.name ?? null,
    providerMessageId: sendResult.messageId ?? null,
  });

  await db
    .update(schema.leads)
    .set({ status: "replied", updatedAt: new Date() })
    .where(eq(schema.leads.id, leadId));

  return NextResponse.json({ ok: true });
}
