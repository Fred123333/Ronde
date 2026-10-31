"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import { EQUIPMENTS, HISTORY } from "@/lib/data";
import { formatDate } from "@/lib/dates";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { exportEquipmentHistoryPdf } from "@/lib/pdf";

export default function HistoriquePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const equipment = EQUIPMENTS.find((e) => e.id === id);
  if (!equipment) notFound();

  const history = HISTORY.filter((h) => h.equipmentId === equipment.id);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      exportEquipmentHistoryPdf(equipment, history);
    } finally {
      setTimeout(() => setExporting(false), 400);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={`/equipements/${equipment.id}`}
        className="inline-flex items-center gap-2 self-start rounded-sm text-sm text-ink-soft transition-colors hover:text-petrol-600"
      >
        <IconArrowLeft size={16} stroke={1.75} aria-hidden />
        Retour à l'équipement
      </Link>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-ink-soft">Historique de contrôle</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {equipment.name}
          </h1>
        </div>
        <Button onClick={handleExport} disabled={exporting}>
          <IconDownload size={16} stroke={1.75} aria-hidden />
          {exporting ? "Export en cours..." : "Exporter en PDF"}
        </Button>
      </header>

      {history.length === 0 ? (
        <EmptyState
          title="Aucun contrôle enregistré"
          description="Lancez le premier contrôle de cet équipement pour constituer l'historique."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((h) => (
            <li key={h.id}>
              <Card>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium text-ink">{h.technician}</p>
                  <p className="text-sm text-ink-soft">{formatDate(h.date)}</p>
                </div>
                <p className="mt-3 text-sm text-ink-soft">{h.generalNote}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}