"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendarWeek,
  IconCalendarMonth,
} from "@tabler/icons-react";
import type { Equipment } from "@/lib/types";
import {
  getStatus,
  isSameDay,
  monthMatrix,
  weekDays,
  startOfDay,
} from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CalendarEvent } from "./CalendarEvent";

type View = "semaine" | "mois";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function CalendarView({ equipments }: { equipments: Equipment[] }) {
  const [view, setView] = useState<View>("semaine");
  const [cursor, setCursor] = useState<Date>(startOfDay(new Date()));

  const byDay = useMemo(() => {
    const map = new Map<string, Equipment[]>();
    equipments.forEach((eq) => {
      const key = startOfDay(new Date(eq.nextCheck)).toISOString();
      const list = map.get(key) ?? [];
      list.push(eq);
      map.set(key, list);
    });
    return map;
  }, [equipments]);

  const shift = (dir: -1 | 1) => {
    const next = new Date(cursor);
    if (view === "semaine") next.setDate(next.getDate() + dir * 7);
    else next.setMonth(next.getMonth() + dir);
    setCursor(next);
  };

  const today = startOfDay(new Date());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => shift(-1)}
            aria-label="Période précédente"
          >
            <IconChevronLeft size={16} stroke={1.75} aria-hidden />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCursor(today)}
          >
            Aujourd'hui
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => shift(1)}
            aria-label="Période suivante"
          >
            <IconChevronRight size={16} stroke={1.75} aria-hidden />
          </Button>
        </div>

        <div
          role="tablist"
          aria-label="Vue du calendrier"
          className="inline-flex rounded-sm border border-line bg-surface p-1 shadow-soft"
        >
          {(
            [
              { key: "semaine", label: "Semaine", icon: IconCalendarWeek },
              { key: "mois", label: "Mois", icon: IconCalendarMonth },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              role="tab"
              aria-selected={view === key}
              onClick={() => setView(key)}
              className={cn(
                "flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-ease",
                view === key
                  ? "bg-petrol-600 text-surface shadow-soft"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              <Icon size={16} stroke={1.75} aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === "semaine" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: view === "semaine" ? 16 : -16 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "semaine" ? (
              <WeekView cursor={cursor} byDay={byDay} today={today} />
            ) : (
              <MonthView cursor={cursor} byDay={byDay} today={today} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WeekView({
  cursor,
  byDay,
  today,
}: {
  cursor: Date;
  byDay: Map<string, Equipment[]>;
  today: Date;
}) {
  const days = weekDays(cursor);
  return (
    <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-7 sm:divide-x sm:divide-y-0">
      {days.map((day) => {
        const key = startOfDay(day).toISOString();
        const items = byDay.get(key) ?? [];
        const isToday = isSameDay(day, today);
        return (
          <div key={key} className="min-h-[120px] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                {WEEKDAYS[(day.getDay() + 6) % 7]}
              </span>
              <span
                className={cn(
                  "inline-flex h-6 min-w-6 items-center justify-center rounded-sm px-1.5 text-xs font-semibold",
                  isToday ? "bg-petrol-600 text-surface" : "text-ink-soft"
                )}
              >
                {day.getDate()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {items.length === 0 ? (
                <p className="text-xs text-ink-faint">Aucun contrôle</p>
              ) : (
                items.map((eq) => (
                  <CalendarEvent
                    key={eq.id}
                    equipment={eq}
                    status={getStatus(eq)}
                    compact
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MonthView({
  cursor,
  byDay,
  today,
}: {
  cursor: Date;
  byDay: Map<string, Equipment[]>;
  today: Date;
}) {
  const weeks = monthMatrix(cursor.getFullYear(), cursor.getMonth());
  const monthLabel = cursor.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="border-b border-line px-4 py-3">
        <h2 className="font-display text-base font-semibold capitalize text-ink">
          {monthLabel}
        </h2>
      </div>
      <div className="grid grid-cols-7 border-b border-line bg-canvas">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wide text-ink-faint"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {weeks.flat().map((day) => {
          const key = startOfDay(day).toISOString();
          const items = byDay.get(key) ?? [];
          const inMonth = day.getMonth() === cursor.getMonth();
          const isToday = isSameDay(day, today);
          return (
            <div
              key={key}
              className={cn(
                "min-h-[80px] border-b border-r border-line p-1.5 text-xs sm:min-h-[100px]",
                !inMonth && "bg-canvas/60"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-sm px-1 font-semibold",
                  isToday
                    ? "bg-petrol-600 text-surface"
                    : inMonth
                      ? "text-ink"
                      : "text-ink-faint"
                )}
              >
                {day.getDate()}
              </span>
              <div className="mt-1 flex flex-col gap-0.5">
                {items.slice(0, 2).map((eq) => (
                  <CalendarEvent
                    key={eq.id}
                    equipment={eq}
                    status={getStatus(eq)}
                    compact
                  />
                ))}
                {items.length > 2 ? (
                  <span className="px-2 text-[11px] text-ink-faint">
                    +{items.length - 2}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}