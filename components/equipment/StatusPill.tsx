import { Badge } from "@/components/ui/Badge";
import type { EquipmentStatus } from "@/lib/types";
import { daysUntil } from "@/lib/dates";

const META: Record<
  EquipmentStatus,
  { label: string; tone: "petrol" | "terra" | "sage" }
> = {
  a_jour: { label: "À jour", tone: "sage" },
  aujourdhui: { label: "Aujourd'hui", tone: "petrol" },
  en_retard: { label: "En retard", tone: "terra" },
};

export function StatusPill({
  status,
  nextCheck,
}: {
  status: EquipmentStatus;
  nextCheck: string;
}) {
  const { label, tone } = META[status];
  const d = daysUntil(nextCheck);
  const detail =
    status === "en_retard"
      ? `de ${Math.abs(d)} j`
      : status === "aujourdhui"
        ? ""
        : `dans ${d} j`;

  return (
    <Badge tone={tone}>
      {label}
      {detail ? <span className="ml-1 opacity-80">{detail}</span> : null}
    </Badge>
  );
}