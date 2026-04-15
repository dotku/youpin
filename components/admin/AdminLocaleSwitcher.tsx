"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  routing,
  localeLabels,
  localeFlags,
  type Locale,
} from "@/i18n/routing";

export default function AdminLocaleSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === currentLocale) return;
    // pathname looks like /admin/<locale>/... — swap the locale segment
    const parts = pathname.split("/");
    if (parts[1] === "admin" && parts[2]) {
      parts[2] = next;
    }
    startTransition(() => router.replace(parts.join("/")));
  }

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchTo(e.target.value)}
      aria-label="Language"
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs hover:bg-slate-50"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {localeFlags[l]} {localeLabels[l]}
        </option>
      ))}
    </select>
  );
}
