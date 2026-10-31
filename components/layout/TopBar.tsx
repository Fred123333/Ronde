"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconCalendarEvent,
  IconListCheck,
  IconLayoutDashboard,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { clearSession, getSession, type Session } from "@/lib/auth";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/dashboard", label: "Tableau", icon: IconLayoutDashboard },
  { href: "/equipements", label: "Équipements", icon: IconListCheck },
  { href: "/calendrier", label: "Calendrier", icon: IconCalendarEvent },
];

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, [pathname]);

  const logout = () => {
    clearSession();
    router.push("/");
  };

  const isLanding = pathname === "/";
  const isAuth = pathname === "/connexion";

  return (
    <header className="border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link
          href={session ? "/dashboard" : "/"}
          className="flex items-center gap-2 rounded-sm font-display text-lg font-semibold text-petrol-600"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-petrol-600 text-surface"
          >
            R
          </span>
          Ronde
        </Link>

        {session ? (
          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-1">
              {LINKS.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-2.5 py-2 text-sm font-medium transition-all duration-200 ease-ease",
                        "hover:-translate-y-px hover:shadow-soft sm:px-3",
                        active
                          ? "bg-petrol-50 text-petrol-700"
                          : "text-ink-soft hover:text-ink"
                      )}
                    >
                      <Icon size={18} stroke={1.75} aria-hidden />
                      <span className="hidden sm:inline">{label}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={logout}
                  aria-label="Se déconnecter"
                  className="flex items-center gap-2 rounded-sm px-2.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-terra-600 sm:px-3"
                >
                  <IconLogout size={18} stroke={1.75} aria-hidden />
                  <span className="hidden sm:inline">Quitter</span>
                </button>
              </li>
            </ul>
          </nav>
        ) : isLanding || isAuth ? (
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-petrol-700 transition-colors hover:text-petrol-600"
          >
            <IconLogin size={18} stroke={1.75} aria-hidden />
            Se connecter
          </Link>
        ) : null}
      </div>
    </header>
  );
}