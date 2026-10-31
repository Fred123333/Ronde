"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IconAlertTriangle, IconChecks } from "@tabler/icons-react";
import { EQUIPMENTS } from "@/lib/data";
import { getStatus } from "@/lib/dates";
import type { EquipmentStatus } from "@/lib/types";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { EquipmentListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Filter = "tous" | EquipmentStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "en_retard", label: "En retard" },
  { key: "aujourdhui", label: "Aujourd'hui" },
  { key: "a_jour", label: "À jour" },
];

export default function EquipementsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("tous");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const counts = useMemo(() => {
    const c = { a_jour: 0, aujourdhui: 0, en_retard: 0 };
    EQUIPMENTS.forEach((eq) => {
      c[getStatus(eq)] += 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    if (filter === "tous") return EQUIPMENTS;
    return EQUIPMENTS.filter((eq) => getStatus(eq) === filter);
  }, [filter]);

  if (error) {
    return (
      <ErrorState
        onRetry={() => {
          setError(false);
          setLoading(true);
          setTimeout(() => setLoading(false), 450);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Contrôles réguliers
        </h1>
        <p className="max-w-xl text-sm text-ink-soft">
          Suivi des extincteurs, autoclaves, groupe électrogène et climatisation
          de la clinique. Ouvrez un équipement pour lancer un contrôle.
        </p>
      </header>

      <section
        aria-label="Synthèse des contrôles"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <SummaryCard
          tone="terra"
          label="En retard"
          value={counts.en_retard}
          icon={<IconAlertTriangle size={18} stroke={1.75} aria-hidden />}
        />
        <SummaryCard
          tone="petrol"
          label="Aujourd'hui"
          value={counts.aujourdhui}
          icon={<IconChecks size={18} stroke={1.75} aria-hidden />}
        />
        <SummaryCard
          tone="sage"
          label="À jour"
          value={counts.a_jour}
          icon={<IconChecks size={18} stroke={1.75} aria-hidden />}
        />
      </section>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-ease",
              "hover:-translate-y-px hover:shadow-soft",
              filter === f.key
                ? "border-petrol-600 bg-petrol-600 text-surface"
                : "border-line bg-surface text-ink-soft hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <EquipmentListSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Aucun équipement dans ce filtre"
          description="Changez de filtre pour voir les autres équipements ou ajoutez un nouvel équipement."
          action={
            <Button variant="secondary" onClick={() => setFilter("tous")}>
              Voir tous les équipements
            </Button>
          }
        />
      ) : (
        <motion.ul layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((eq) => (
            <li key={eq.id}>
              <EquipmentCard equipment={eq} />
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "terra" | "petrol" | "sage";
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
        <AnimatedNumber value={value} />
      </p>
    </div>
  );
}