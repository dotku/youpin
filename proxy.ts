import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { auth0 } from "./lib/auth0";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Auth0 owns /auth/* (login, logout, callback, access-token)
  if (pathname.startsWith("/auth")) {
    return auth0.middleware(req);
  }

  // /admin requires an authenticated admin
  if (pathname.startsWith("/admin")) {
    const authRes = await auth0.middleware(req);
    const session = await auth0.getSession(req);

    if (!session) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdminEmail(session.user?.email)) {
      return new NextResponse("Forbidden — this account is not an admin.", {
        status: 403,
      });
    }
    return authRes;
  }

  // Everything else: locale routing
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // skip _next, _vercel, api, and files with an extension
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
