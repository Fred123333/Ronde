export type Frequency = "mensuel" | "trimestriel" | "semestriel" | "annuel";

export type EquipmentStatus = "a_jour" | "aujourdhui" | "en_retard";

export interface Equipment {
  id: string;
  name: string;
  category: "Sécurité incendie" | "Stérilisation" | "Énergie" | "Climatisation";
  location: string;
  installedAt: string;
  frequency: Frequency;
  lastCheck: string | null;
  nextCheck: string;
  serial: string;
}

export interface ChecklistTemplateItem {
  id: string;
  label: string;
  hint?: string;
}

export interface ControlRecord {
  id: string;
  equipmentId: string;
  date: string;
  technician: string;
  items: { id: string; label: string; checked: boolean; note?: string }[];
  generalNote: string;
  signature: string;
}

export interface StatusMeta {
  label: string;
  tone: "petrol" | "terra" | "sage";
}