"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReplyComposer({ id }: { id: number }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (body.trim().length < 1) return;
    setStatus("sending");
    setError(null);
    const res = await fetch(`/api/leads/${id}/reply`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ body }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Send failed");
      setStatus("error");
      return;
    }
    setBody("");
    setStatus("idle");
    router.refresh();
  }

  return (
    <div className="mt-3 space-y-3">
      <textarea
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your reply…"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {error}
        </div>
      )}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={submit}
          disabled={status === "sending" || body.trim().length < 1}
          className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send reply"}
        </button>
      </div>
    </div>
  );
}
