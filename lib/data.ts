import type { Equipment, ChecklistTemplateItem, ControlRecord } from "./types";

export const EQUIPMENTS: Equipment[] = [
  {
    id: "eq-ext-01",
    name: "Extincteur CO2, couloir A",
    category: "Sécurité incendie",
    location: "Bâtiment A, niveau 1, couloir",
    installedAt: "2021-03-14",
    frequency: "annuel",
    lastCheck: "2024-05-02",
    nextCheck: shift(-12),
    serial: "EXT-CO2-A12",
  },
  {
    id: "eq-ext-02",
    name: "Extincteur poudre, réserve",
    category: "Sécurité incendie",
    location: "Bâtiment A, sous-sol, réserve",
    installedAt: "2020-11-08",
    frequency: "annuel",
    lastCheck: "2024-02-18",
    nextCheck: shift(-3),
    serial: "EXT-PDR-R03",
  },
  {
    id: "eq-aut-01",
    name: "Autoclave bloc 2",
    category: "Stérilisation",
    location: "Bloc opératoire 2, salle stérilisation",
    installedAt: "2022-01-20",
    frequency: "mensuel",
    lastCheck: shift(-28),
    nextCheck: shift(0),
    serial: "AUT-B2-0041",
  },
  {
    id: "eq-aut-02",
    name: "Autoclave consultation",
    category: "Stérilisation",
    location: "Consultations, local technique",
    installedAt: "2021-09-05",
    frequency: "mensuel",
    lastCheck: shift(-20),
    nextCheck: shift(9),
    serial: "AUT-CONS-0012",
  },
  {
    id: "eq-gen-01",
    name: "Groupe électrogène principal",
    category: "Énergie",
    location: "Local technique, rez-de-chaussée",
    installedAt: "2019-06-12",
    frequency: "trimestriel",
    lastCheck: shift(-80),
    nextCheck: shift(11),
    serial: "GEN-450KVA-01",
  },
  {
    id: "eq-cli-01",
    name: "Climatisation bloc 1",
    category: "Climatisation",
    location: "Bloc opératoire 1, plafond",
    installedAt: "2022-04-30",
    frequency: "trimestriel",
    lastCheck: shift(-95),
    nextCheck: shift(-5),
    serial: "CLI-B1-2200",
  },
  {
    id: "eq-cli-02",
    name: "Climatisation salle de réveil",
    category: "Climatisation",
    location: "Salle de réveil, mur nord",
    installedAt: "2023-02-15",
    frequency: "semestriel",
    lastCheck: shift(-140),
    nextCheck: shift(40),
    serial: "CLI-REV-1100",
  },
  {
    id: "eq-ext-03",
    name: "Extincteur eau pulvérisée, accueil",
    category: "Sécurité incendie",
    location: "Hall d'accueil, mur est",
    installedAt: "2022-07-01",
    frequency: "annuel",
    lastCheck: shift(-330),
    nextCheck: shift(35),
    serial: "EXT-EAU-ACC1",
  },
];

function shift(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const CHECKLIST_TEMPLATES: Record<string, ChecklistTemplateItem[]> = {
  "Sécurité incendie": [
    { id: "i1", label: "Étiquette de contrôle lisible et à jour" },
    { id: "i2", label: "Goupille et joint de sécurité intacts" },
    { id: "i3", label: "Pression dans le vert (manomètre)" },
    { id: "i4", label: "Accès dégagé, support fixé au mur" },
    { id: "i5", label: "Aucune trace de corrosion ou de choc" },
  ],
  Stérilisation: [
    { id: "i1", label: "Cycle à vide conforme (test Bowie-Dick)" },
    { id: "i2", label: "Joint de porte sans fissure" },
    { id: "i3", label: "Relevé de température et pression archivé" },
    { id: "i4", label: "Traçabilité des instruments complète" },
    { id: "i5", label: "Nettoyage du filtre de chambre terminé" },
  ],
  Énergie: [
    { id: "i1", label: "Niveau d'huile et de liquide de refroidissement" },
    { id: "i2", label: "Démarrage automatique testé" },
    { id: "i3", label: "Batteries de démarrage en bon état" },
    { id: "i4", label: "Absence de fuite visible" },
    { id: "i5", label: "Compteur horaire relevé et noté" },
  ],
  Climatisation: [
    { id: "i1", label: "Filtres propres, remplacés si besoin" },
    { id: "i2", label: "Température de soufflage conforme" },
    { id: "i3", label: "Absence de bruit anormal ou vibration" },
    { id: "i4", label: "Évacuation des condensats fonctionnelle" },
    { id: "i5", label: "Télécommande et sondes opérationnelles" },
  ],
};

export const HISTORY: ControlRecord[] = [
  {
    id: "h1",
    equipmentId: "eq-ext-01",
    date: shift(-342),
    technician: "Nadia Kherbache",
    items: [],
    generalNote: "Contrôle annuel conforme. Aucune anomalie.",
    signature: "Nadia Kherbache",
  },
  {
    id: "h2",
    equipmentId: "eq-aut-01",
    date: shift(-58),
    technician: "Malik Haddad",
    items: [],
    generalNote: "Test Bowie-Dick conforme, joint remplacé préventivement.",
    signature: "Malik Haddad",
  },
  {
    id: "h3",
    equipmentId: "eq-cli-01",
    date: shift(-95),
    technician: "Sofia Renard",
    items: [],
    generalNote: "Filtres encrassés, remplacés. Température revenue à 19,5 °C.",
    signature: "Sofia Renard",
  },
];