import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const alt = "UPIN — Advanced Materials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: { locale: string } }) {
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 20% 10%, rgba(47,139,255,0.45), transparent 55%), radial-gradient(circle at 80% 20%, rgba(24,74,156,0.55), transparent 50%), linear-gradient(180deg, #0b1020 0%, #111735 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "linear-gradient(135deg, #2f8bff 0%, #184a9c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            Y
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>UPIN</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            {t("title")}
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, maxWidth: 980 }}>
            {t("description")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 18, opacity: 0.7 }}>
          <span>ISO 9001</span>
          <span>·</span>
          <span>Global Supply</span>
          <span>·</span>
          <span>{locale.toUpperCase()}</span>
        </div>
      </div>
    ),
    size,
  );
}
