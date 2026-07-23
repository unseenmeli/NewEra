"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { db } from "@/lib/db";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-3 dark:border-zinc-800">
      <div className="flex gap-4 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? "font-medium text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }
          >
            {label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => db.auth.signOut()}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        Sign out
      </button>
    </nav>
  );
}
