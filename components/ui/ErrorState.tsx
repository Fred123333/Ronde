"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { Button } from "./Button";

export function ErrorState({
  title = "Une erreur est survenue",
  description = "Les données n'ont pas pu être chargées. Vérifiez votre connexion puis réessayez.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-lg border border-terra-100 bg-terra-50 px-6 py-12 text-center"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-surface text-terra-600">
        <IconAlertTriangle size={24} stroke={1.75} aria-hidden />
      </span>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry} className="mt-6">
          <IconRefresh size={16} stroke={1.75} aria-hidden />
          Réessayer
        </Button>
      ) : null}
    </div>
  );
}