"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconClipboardCheck,
  IconCalendarEvent,
  IconAlertTriangle,
  IconArrowRight,
} from "@tabler/icons-react";
import { LinkButton } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="flex flex-col gap-6 pt-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Les contrôles réguliers de la clinique, sans oubli et sans paperasse.
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft sm:text-lg">
            Ronde suit les extincteurs, les autoclaves, le groupe électrogène et
            la climatisation des blocs. Un technicien ouvre l'application sur
            son téléphone, coche la checklist, signe, et l'historique est prêt
            pour l'audit.
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center gap-3">
          <LinkButton href="/connexion">
            Se connecter
            <IconArrowRight size={16} stroke={1.75} aria-hidden />
          </LinkButton>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center gap-2 rounded-sm px-4 text-sm font-medium text-ink-soft transition-colors hover:text-petrol-600"
          >
            Voir la démo sans compte
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <FeatureCard
          icon={<IconAlertTriangle size={20} stroke={1.75} aria-hidden />}
          title="Alertes de retard"
          description="Chaque contrôle en retard apparaît en terracotta sur le tableau de bord. Impossible de le manquer."
          tone="terra"
        />
        <FeatureCard
          icon={<IconCalendarEvent size={20} stroke={1.75} aria-hidden />}
          title="Calendrier préventif"
          description="Vue semaine ou mois, glissement fluide, codes clairs. Le planning se lit d'un coup d'œil."
          tone="petrol"
        />
        <FeatureCard
          icon={<IconClipboardCheck size={20} stroke={1.75} aria-hidden />}
          title="Checklist signée"
          description="Cochez sur mobile, ajoutez une remarque, signez au doigt. L'historique est exportable en PDF."
          tone="sage"
        />
      </section>

      <section className="rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Un audit dans deux semaines ?
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Exportez l'historique complet d'un équipement en PDF, prêt à être
              présenté. Les noms, dates et signatures sont déjà dedans.
            </p>
          </div>
          <LinkButton href="/connexion" variant="secondary">
            Essayer Ronde
            <IconArrowRight size={16} stroke={1.75} aria-hidden />
          </LinkButton>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tone: "terra" | "petrol" | "sage";
}) {
  const tones = {
    terra: "bg-terra-50 text-terra-600",
    petrol: "bg-petrol-50 text-petrol-600",
    sage: "bg-sage-50 text-sage-600",
  } as const;
  return (
    <div className="rounded-lg border border-line bg-surface p-6 shadow-soft transition-all duration-200 ease-ease hover:-translate-y-0.5 hover:shadow-lifted">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-sm ${tones[tone]}`}
      >
        {icon}
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </div>
  );
}