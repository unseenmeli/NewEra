"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User } from "@instantdb/react";
import { db } from "@/lib/db";

/**
 * Renders children only for a signed-in user, otherwise redirects to /login.
 */
export function AuthGate({
  children,
}: {
  children: (user: User) => React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading, error, user } = db.useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <p className="p-8 text-sm text-zinc-500">Loading…</p>;
  }

  if (error) {
    return <p className="p-8 text-sm text-red-600">{error.message}</p>;
  }

  if (!user) {
    return null;
  }

  return <>{children(user)}</>;
}
