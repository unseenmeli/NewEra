"use client";

import { AuthGate } from "@/components/AuthGate";
import { Nav } from "@/components/Nav";

export default function ProfilePage() {
  return (
    <AuthGate>
      {(user) => (
        <>
          <Nav />
          <main className="p-6">
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <dl className="mt-4 max-w-md space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <dt className="text-zinc-500">Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <dt className="text-zinc-500">User ID</dt>
                <dd className="font-mono text-xs">{user.id}</dd>
              </div>
            </dl>
          </main>
        </>
      )}
    </AuthGate>
  );
}
