import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export async function requireAdmin() {
  const session = await auth0.getSession();
  const email = session?.user?.email;
  if (!session || !isAdminEmail(email)) {
    return { ok: false as const, email };
  }
  return { ok: true as const, email: email as string, name: session.user?.name as string | undefined };
}
