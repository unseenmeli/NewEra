"use client";

import { AuthGate } from "@/components/AuthGate";
import { Nav } from "@/components/Nav";

export default function HomePage() {
  return (
    <AuthGate>
      {(user) => (
        <>
          <Nav />
          <main className="p-6">
            <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Signed in as {user.email}.
            </p>
          </main>
        </>
      )}
    </AuthGate>
  );
}
