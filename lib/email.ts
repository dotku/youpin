const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "noreply@example.com";
export const EMAIL_NOTIFY_TO = process.env.EMAIL_NOTIFY_TO ?? "";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Address = { email: string; name?: string };

function parseAddress(raw: string): Address {
  // Accepts "Name <email@x.com>" or just "email@x.com"
  const match = raw.match(/^\s*(.+?)\s*<\s*([^>]+)\s*>\s*$/);
  if (match) return { name: match[1], email: match[2] };
  return { email: raw.trim() };
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string };

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  if (!BREVO_API_KEY) {
    return { ok: false, error: "BREVO_API_KEY is not configured" };
  }

  const recipients = (Array.isArray(to) ? to : [to])
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  if (recipients.length === 0) {
    return { ok: false, error: "No recipients" };
  }

  const payload: Record<string, unknown> = {
    sender: parseAddress(EMAIL_FROM),
    to: recipients,
    subject,
    htmlContent: html,
  };
  if (replyTo) payload.replyTo = parseAddress(replyTo);

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      messageId?: string;
      message?: string;
      code?: string;
    };
    if (!res.ok) {
      return {
        ok: false,
        error: data.message ?? `Brevo HTTP ${res.status}`,
      };
    }
    return { ok: true, messageId: data.messageId };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Brevo request failed",
    };
  }
}
