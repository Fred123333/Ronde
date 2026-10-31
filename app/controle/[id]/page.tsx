"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconCircleCheck,
} from "@tabler/icons-react";
import { EQUIPMENTS, CHECKLIST_TEMPLATES } from "@/lib/data";
import { formatDate } from "@/lib/dates";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Field, TextInput, Textarea } from "@/components/ui/Field";
import { ChecklistItem } from "@/components/checklist/ChecklistItem";
import { SignaturePad } from "@/components/checklist/SignaturePad";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export default function ControlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const equipment = EQUIPMENTS.find((e) => e.id === id);
  if (!equipment) notFound();

  const template = CHECKLIST_TEMPLATES[equipment.category] ?? [];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const [technician, setTechnician] = useState("");
  const [signature, setSignature] = useState("");
  const [errors, setErrors] = useState<{
    technician?: string;
    signature?: string;
    checklist?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  const done = useMemo(
    () => template.filter((t) => checked[t.id]).length,
    [checked, template]
  );
  const progress = template.length
    ? Math.round((done / template.length) * 100)
    : 0;

  const submit = () => {
    const next: typeof errors = {};
    if (done < template.length) {
      next.checklist = "Cochez tous les points de contrôle avant de valider.";
    }
    if (technician.trim().length < 2) {
      next.technician = "Indiquez le nom du technicien.";
    }
    if (!signature) {
      next.signature = "La signature est obligatoire.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitted(true);
    setTimeout(() => router.push(`/equipements/${equipment.id}`), 1200);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage-50 text-sage-600"
        >
          <IconCircleCheck size={32} stroke={2} aria-hidden />
        </motion.span>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Contrôle enregistré
        </h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Le contrôle de {equipment.name} a bien été validé. Retour à la fiche
          équipement.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={`/equipements/${equipment.id}`}
        className="inline-flex items-center gap-2 self-start rounded-sm text-sm text-ink-soft transition-colors hover:text-petrol-600"
      >
        <IconArrowLeft size={16} stroke={1.75} aria-hidden />
        Retour à l'équipement
      </Link>

      <header>
        <p className="text-sm text-ink-soft">Checklist de contrôle</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {equipment.name}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Prévu le {formatDate(equipment.nextCheck)} · {equipment.location}
        </p>
      </header>

      <div className="rounded-lg border border-line bg-surface p-4 shadow-soft">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-soft">Progression</span>
          <span className="font-medium text-ink">
            <AnimatedNumber value={done} /> / {template.length}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-2 overflow-hidden rounded-sm bg-line"
        >
          <motion.div
            className="h-full rounded-sm bg-petrol-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Points de contrôle
        </h2>
        {errors.checklist ? (
          <p role="alert" className="mb-3 text-sm text-terra-600">
            {errors.checklist}
          </p>
        ) : null}
        <ul className="flex flex-col gap-2">
          {template.map((item) => (
            <ChecklistItem
              key={item.id}
              id={`${equipment.id}-${item.id}`}
              label={item.label}
              hint={item.hint}
              checked={Boolean(checked[item.id])}
              onChange={(v) =>
                setChecked((prev) => ({ ...prev, [item.id]: v }))
              }
            />
          ))}
        </ul>
      </section>

      <Card>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Remarques et signature
        </h2>
        <div className="flex flex-col gap-4">
          <Field label="Technicien" error={errors.technician}>
            {(fieldId, describedBy) => (
              <TextInput
                id={fieldId}
                describedBy={describedBy}
                invalid={Boolean(errors.technician)}
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder="Nom et prénom"
                autoComplete="name"
              />
            )}
          </Field>

          <Field
            label="Remarque générale"
            hint="Optionnel. Précisez une anomalie ou une intervention à prévoir."
          >
            {(fieldId, describedBy) => (
              <Textarea
                id={fieldId}
                describedBy={describedBy}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ex : joint remplacé, température stable."
              />
            )}
          </Field>

          <SignaturePad
            value={signature}
            onChange={setSignature}
            error={errors.signature}
          />

          <Button onClick={submit} className="self-start">
            Valider le contrôle
          </Button>
        </div>
      </Card>
    </div>
  );
}