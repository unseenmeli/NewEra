"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, user } = db.useAuth();
  const [sentEmail, setSentEmail] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm">
        {sentEmail ? (
          <CodeForm email={sentEmail} onBack={() => setSentEmail("")} />
        ) : (
          <EmailForm onSent={setSentEmail} />
        )}
      </div>
    </main>
  );
}

function EmailForm({ onSent }: { onSent: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setPending(true);
    setError("");
    try {
      await db.auth.sendMagicCode({ email: trimmed });
      onSent(trimmed);
    } catch (err) {
      setError(errorMessage(err) ?? "Could not send the code. Try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-zinc-500">
          We&apos;ll email you a one-time code.
        </p>
      </div>
      <input
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={pending}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? "Sending…" : "Send code"}
      </button>
    </form>
  );
}

function CodeForm({ email, onBack }: { email: string; onBack: () => void }) {
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setPending(true);
    setError("");
    try {
      await db.auth.signInWithMagicCode({ email, code: trimmed });
      // On success useAuth updates and the page redirects to "/".
    } catch (err) {
      setError(errorMessage(err) ?? "That code didn't work. Try again.");
      setCode("");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Enter code</h1>
        <p className="text-sm text-zinc-500">
          We sent a code to <span className="text-zinc-900 dark:text-zinc-100">{email}</span>.
        </p>
      </div>
      <input
        type="text"
        required
        autoFocus
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        disabled={pending}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:focus:border-zinc-100"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? "Verifying…" : "Verify"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        Use a different email
      </button>
    </form>
  );
}

function errorMessage(err: unknown): string | undefined {
  return (err as { body?: { message?: string } })?.body?.message;
}
