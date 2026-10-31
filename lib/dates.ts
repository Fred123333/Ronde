import type { Equipment, Frequency, EquipmentStatus } from "./types";

export const FREQUENCY_LABEL: Record<Frequency, string> = {
  mensuel: "Mensuel",
  trimestriel: "Trimestriel",
  semestriel: "Semestriel",
  annuel: "Annuel",
};

const FREQ_DAYS: Record<Frequency, number> = {
  mensuel: 30,
  trimestriel: 90,
  semestriel: 180,
  annuel: 365,
};

export function addFrequency(date: Date, frequency: Frequency): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + FREQ_DAYS[frequency]);
  return d;
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

export function getStatus(eq: Equipment, today = new Date()): EquipmentStatus {
  const next = startOfDay(new Date(eq.nextCheck));
  const now = startOfDay(today);
  if (next.getTime() === now.getTime()) return "aujourdhui";
  if (next.getTime() < now.getTime()) return "en_retard";
  return "a_jour";
}

export function daysUntil(iso: string, today = new Date()): number {
  const target = startOfDay(new Date(iso)).getTime();
  const now = startOfDay(today).getTime();
  return Math.round((target - now) / 86_400_000);
}

export function monthMatrix(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  const offset = (first.getDay() + 6) % 7; // lundi = 0
  start.setDate(first.getDate() - offset);

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + w * 7 + d);
      week.push(day);
    }
    weeks.push(week);
  }
  return weeks;
}

export function weekDays(reference: Date): Date[] {
  const d = startOfDay(reference);
  const offset = (d.getDay() + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - offset);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return day;
  });
}