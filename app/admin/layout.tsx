import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth0, isAdminEmail } from "@/lib/auth0";
import "../globals.css";

export const metadata = {
  title: "UPIN Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=/admin");
  if (!isAdminEmail(session.user?.email)) {
    return (
      <html lang="en">
        <body>
          <div className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow">
              <h1 className="text-xl font-semibold text-slate-900">Access denied</h1>
              <p className="mt-2 text-sm text-slate-600">
                {session.user?.email} is not on the admin whitelist.
              </p>
              <a
                href="/auth/logout"
                className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign out
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/admin" className="flex items-center gap-2.5 font-semibold">
              <img src="/images/logomark.svg" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="tracking-[0.16em]">UPIN Admin</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-slate-500 sm:inline">{session.user?.email}</span>
              <a
                href="/auth/logout"
                className="rounded-full border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-100"
              >
                Sign out
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
