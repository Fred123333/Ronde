"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconAlertTriangle,
  IconCalendarEvent,
  IconChecks,
  IconArrowRight,
} from "@tabler/icons-react";
import { EQUIPMENTS } from "@/lib/data";
import { formatDate, getStatus } from "@/lib/dates";
import type { Equipment, EquipmentStatus } from "@/lib/types";
import { getSession, type Session } from "@/lib/auth";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { StatusPill } from "@/components/equipment/StatusPill";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    a_jour: 0,
    aujourdhui: 0,
    en_retard: 0,
  });
  const [upcoming, setUpcoming] = useState<Equipment[]>([]);
  const [late, setLate] = useState<Equipment[]>([]);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/connexion");
      return;
    }
    setSession(s);
    const t = setTimeout(() => {
      const c = { a_jour: 0, aujourdhui: 0, en_retard: 0 };
      EQUIPMENTS.forEach((eq) => {
        c[getStatus(eq)] += 1;
      });
      setCounts(c);
      const next = [...EQUIPMENTS]
        .filter((eq) => getStatus(eq) !== "en_retard")
        .sort(
          (a, b) =>
            new Date(a.nextCheck).getTime() - new Date(b.nextCheck).getTime()
        )
        .slice(0, 4);
      setUpcoming(next);
      const l = EQUIPMENTS.filter((eq) => getStatus(eq) === "en_retard");
      setLate(l);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [router]);

  if (!session) return null;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-ink-soft">Bonjour, {session.name}</p>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Tableau de bord
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard
          tone="terra"
          label="En retard"
          value={counts.en_retard}
          icon={<IconAlertTriangle size={18} stroke={1.75} aria-hidden />}
          loading={loading}
        />
        <MetricCard
          tone="petrol"
          label="Aujourd'hui"
          value={counts.aujourdhui}
          icon={<IconCalendarEvent size={18} stroke={1.75} aria-hidden />}
          loading={loading}
        />
        <MetricCard
          tone="sage"
          label="À jour"
          value={counts.a_jour}
          icon={<IconChecks size={18} stroke={1.75} aria-hidden />}
          loading={loading}
        />
      </section>

      {late.length > 0 ? (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Contrôles en retard
            </h2>
            <Link
              href="/equipements"
              className="text-sm text-petrol-600 hover:underline"
            >
              Voir tout
            </Link>
          </div>
          <ul className="flex flex-col gap-2">
            {late.map((eq) => (
              <li key={eq.id}>
                <Link
                  href={`/controle/${eq.id}`}
                  className="flex items-center justify-between rounded-lg border border-terra-100 bg-terra-50 p-4 transition-all duration-200 ease-ease hover:-translate-y-px hover:shadow-soft"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{eq.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      Prévu le {formatDate(eq.nextCheck)}
                    </p>
                  </div>
                  <StatusPill
                    status="en_retard"
                    nextCheck={eq.nextCheck}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Prochains contrôles
          </h2>
          <Link
            href="/calendrier"
            className="text-sm text-petrol-600 hover:underline"
          >
            Calendrier
          </Link>
        </div>
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <motion.ul layout className="flex flex-col gap-2">
            {upcoming.map((eq) => (
              <li key={eq.id}>
                <Link
                  href={`/equipements/${eq.id}`}
                  className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 shadow-soft transition-all duration-200 ease-ease hover:-translate-y-px hover:shadow-lifted"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{eq.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {formatDate(eq.nextCheck)} · {eq.location}
                    </p>
                  </div>
                  <IconArrowRight
                    size={16}
                    stroke={1.75}
                    className="text-ink-faint"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  tone,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "terra" | "petrol" | "sage";
  loading: boolean;
}) {
  const tones = {
    terra: "bg-terra-50 text-terra-600",
    petrol: "bg-petrol-50 text-petrol-600",
    sage: "bg-sage-50 text-sage-600",
  } as const;
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-soft transition-all duration-200 ease-ease hover:-translate-y-0.5 hover:shadow-lifted">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-soft">{label}</span>
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-sm",
            tones[tone]
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">
        {loading ? (
          <span className="inline-block h-8 w-10 animate-pulse rounded-sm bg-line" />
        ) : (
          <AnimatedNumber value={value} />
        )}
      </p>
    </div>
  );
}