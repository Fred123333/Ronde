"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconFileText,
  IconMapPin,
  IconRepeat,
  IconTool,
} from "@tabler/icons-react";
import { EQUIPMENTS, HISTORY } from "@/lib/data";
import {
  FREQUENCY_LABEL,
  formatDate,
  getStatus,
} from "@/lib/dates";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

export default function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const equipment = EQUIPMENTS.find((e) => e.id === id);
  if (!equipment) notFound();

  const status = getStatus(equipment);
  const history = HISTORY.filter((h) => h.equipmentId === equipment.id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 self-start rounded-sm text-sm text-ink-soft transition-colors hover:text-petrol-600"
      >
        <IconArrowLeft size={16} stroke={1.75} aria-hidden />
        Retour aux équipements
      </Link>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-ink-soft">{equipment.category}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {equipment.name}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
            <IconMapPin size={14} stroke={1.75} aria-hidden />
            {equipment.location}
          </p>
        </div>
        <span className="self-start rounded-full bg-surface px-3 py-1 text-sm font-medium text-ink">
          {String(status)}
        </span>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-display text-base font-semibold text-ink">
            Caractéristiques
          </h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink-soft">Numéro de série</dt>
              <dd className="font-medium text-ink">{equipment.serial}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-ink-soft">
                <IconRepeat size={14} stroke={1.75} aria-hidden />
                Fréquence
              </dt>
              <dd className="font-medium text-ink">
                {FREQUENCY_LABEL[equipment.frequency]}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-soft">Installé le</dt>
              <dd className="font-medium text-ink">
                {formatDate(equipment.installedAt)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-ink-soft">
                <IconCalendarEvent size={14} stroke={1.75} aria-hidden />
                Prochain contrôle
              </dt>
              <dd className="font-medium text-ink">
                {formatDate(equipment.nextCheck)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-soft">Dernier contrôle</dt>
              <dd className="font-medium text-ink">
                {equipment.lastCheck ? formatDate(equipment.lastCheck) : "Aucun"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="flex flex-col justify-between gap-4">
          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-ink">
              Actions
            </h2>
            <p className="text-sm text-ink-soft">
              Lancez la checklist de contrôle sur mobile ou exportez
              l'historique pour un audit.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <LinkButton href={`/controle/${equipment.id}`}>
              <IconTool size={16} stroke={1.75} aria-hidden />
              Démarrer le contrôle
            </LinkButton>
            <LinkButton
              href={`/historique/${equipment.id}`}
              variant="secondary"
            >
              <IconFileText size={16} stroke={1.75} aria-hidden />
              Voir l'historique
            </LinkButton>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Derniers contrôles
        </h2>
        {history.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-6 text-center text-sm text-ink-soft">
            Aucun contrôle enregistré pour cet équipement.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {history.map((h) => (
              <li key={h.id}>
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {h.technician}
                      </p>
                      <p className="mt-1 text-xs text-ink-soft">
                        {formatDate(h.date)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">{h.generalNote}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}