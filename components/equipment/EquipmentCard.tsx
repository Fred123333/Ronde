"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconMapPin, IconRepeat } from "@tabler/icons-react";
import type { Equipment } from "@/lib/types";
import { FREQUENCY_LABEL, formatDate, getStatus } from "@/lib/dates";
import { StatusPill } from "./StatusPill";
import { Card } from "@/components/ui/Card";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const status = getStatus(equipment);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/equipements/${equipment.id}`} className="block">
        <Card className="transition-all duration-200 ease-ease hover:-translate-y-0.5 hover:shadow-lifted">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold text-ink">
              {equipment.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
              <IconMapPin size={14} stroke={1.75} aria-hidden />
              <span className="truncate">{equipment.location}</span>
            </p>
          </div>
          <StatusPill status={status} nextCheck={equipment.nextCheck} />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
          <div>
            <dt className="text-ink-faint">Fréquence</dt>
            <dd className="mt-1 flex items-center gap-1 text-ink">
              <IconRepeat size={14} stroke={1.75} aria-hidden />
              {FREQUENCY_LABEL[equipment.frequency]}
            </dd>
          </div>
          <div>
            <dt className="text-ink-faint">Dernier contrôle</dt>
            <dd className="mt-1 text-ink">
              {equipment.lastCheck ? formatDate(equipment.lastCheck) : "Aucun"}
            </dd>
          </div>
        </dl>
        </Card>
      </Link>
    </motion.div>
  );
}