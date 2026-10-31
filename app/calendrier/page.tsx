"use client";

import { useEffect, useState } from "react";
import { EQUIPMENTS } from "@/lib/data";
import { CalendarView } from "@/components/calendar/CalendarView";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CalendrierPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Calendrier préventif
        </h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">
          Vue semaine ou mois des contrôles à venir. Un point vert indique un
          contrôle à jour, un point bleu un contrôle aujourd'hui, un point
          terracotta un contrôle en retard.
        </p>
      </header>

      {loading ? (
        <div className="rounded-lg border border-line bg-surface p-4 shadow-soft">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="mt-4 h-48 w-full" />
        </div>
      ) : (
        <CalendarView equipments={EQUIPMENTS} />
      )}
    </div>
  );
}