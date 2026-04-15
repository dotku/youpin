"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional(),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(5000),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submit failed");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submit failed");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white backdrop-blur">
        <div className="text-lg font-semibold">{t("successTitle")}</div>
        <p className="mt-2 text-sm text-white/80">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-3 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
    >
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        {...register("website")}
        className="absolute left-[-9999px] h-0 w-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label={t("name")}
          error={errors.name?.message}
          required
          input={<input type="text" {...register("name")} className={inputCls} />}
        />
        <Field
          label={t("email")}
          error={errors.email?.message}
          required
          input={<input type="email" {...register("email")} className={inputCls} />}
        />
        <Field
          label={t("phone")}
          error={errors.phone?.message}
          input={<input type="tel" {...register("phone")} className={inputCls} />}
        />
        <Field
          label={t("company")}
          error={errors.company?.message}
          input={<input type="text" {...register("company")} className={inputCls} />}
        />
      </div>
      <Field
        label={t("message")}
        error={errors.message?.message}
        required
        input={
          <textarea
            rows={4}
            {...register("message")}
            className={`${inputCls} resize-y`}
          />
        }
      />

      {status === "error" && (
        <div className="rounded-md border border-red-300/40 bg-red-500/15 p-2 text-xs text-red-100">
          {errorMsg ?? "Submit failed"}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-lg hover:bg-brand-50 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none ring-offset-0 focus:border-brand-300 focus:ring-2 focus:ring-brand-300/40";

function Field({
  label,
  required,
  input,
  error,
}: {
  label: string;
  required?: boolean;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/70">
        {label} {required && <span className="text-brand-300">*</span>}
      </span>
      {input}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
