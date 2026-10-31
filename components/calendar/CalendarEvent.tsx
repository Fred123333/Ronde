"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Equipment, EquipmentStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

const DOT: Record<EquipmentStatus, string> = {
  a_jour: "bg-sage-500",
  aujourdhui: "bg-petrol-600",
  en_retard: "bg-terra-500",
};

export function CalendarEvent({
  equipment,
  status,
  compact,
}: {
  equipment: Equipment;
  status: EquipmentStatus;
  compact?: boolean;
}) {
  return (
    <motion.div layout="position" transition={{ duration: 0.2 }}>
      <Link
        href={`/controle/${equipment.id}`}
        className={cn(
          "flex items-center gap-2 rounded-sm px-2 py-1 text-xs transition-colors duration-150 ease-ease",
          "hover:bg-petrol-50 focus-visible:bg-petrol-50",
          compact && "truncate"
        )}
        title={equipment.name}
      >
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[status])}
        />
        <span className="truncate text-ink">{equipment.name}</span>
      </Link>
    </motion.div>
  );
}