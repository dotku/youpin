import { NextResponse, type NextRequest } from "next/server";
import { desc } from "drizzle-orm";
import { createHash } from "node:crypto";
import { db, schema } from "@/db";
import { leadSubmitSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth0";
import { sendEmail, EMAIL_NOTIFY_TO, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot — bots fill this, humans don't see it
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 64)
    : null;

  const [inserted] = await db
    .insert(schema.leads)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
      locale: parsed.data.locale ?? null,
      userAgent,
      ipHash,
    })
    .returning({ id: schema.leads.id });

  // Fire-and-forget notify admin
  if (EMAIL_NOTIFY_TO) {
    sendEmail({
      to: EMAIL_NOTIFY_TO.split(",").map((s) => s.trim()),
      replyTo: parsed.data.email,
      subject: `[UPIN] New lead from ${parsed.data.name}`,
      html: `
        <h2>New lead #${inserted.id}</h2>
        <p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(parsed.data.phone ?? "")}</p>
        <p><strong>Company:</strong> ${escapeHtml(parsed.data.company ?? "")}</p>
        <p><strong>Locale:</strong> ${escapeHtml(parsed.data.locale ?? "")}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(parsed.data.message)}</pre>
      `,
    }).then((r) => {
      if (!r.ok) console.error("[brevo] notify failed", r.error);
    });
  }

  return NextResponse.json({ ok: true, id: inserted.id }, { status: 201 });
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(schema.leads)
    .orderBy(desc(schema.leads.createdAt))
    .limit(500);
  return NextResponse.json({ leads: rows });
}
