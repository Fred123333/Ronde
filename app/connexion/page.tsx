"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconArrowLeft, IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { saveSession } from "@/lib/auth";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Entrez une adresse email valide.";
    }
    if (password.length < 4) {
      next.password = "Le mot de passe doit contenir au moins 4 caractères.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const name = email.split("@")[0].replace(/[._-]/g, " ");
      saveSession({
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
      });
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-sm text-sm text-ink-soft transition-colors hover:text-petrol-600"
        >
          <IconArrowLeft size={16} stroke={1.75} aria-hidden />
          Retour
        </Link>

        <div className="rounded-lg border border-line bg-surface p-6 shadow-soft sm:p-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-petrol-50 text-petrol-600">
            <IconLock size={20} stroke={1.75} aria-hidden />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
            Connexion
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Accédez au suivi des contrôles de la clinique.
          </p>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-4" noValidate>
            <Field label="Adresse email" error={errors.email}>
              {(id, describedBy) => (
                <TextInput
                  id={id}
                  describedBy={describedBy}
                  invalid={Boolean(errors.email)}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="technicien@clinique.fr"
                  autoComplete="email"
                />
              )}
            </Field>

            <Field label="Mot de passe" error={errors.password}>
              {(id, describedBy) => (
                <TextInput
                  id={id}
                  describedBy={describedBy}
                  invalid={Boolean(errors.password)}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              )}
            </Field>

            <Button type="submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-ink-faint">
            Démo : n'importe quel email valide et mot de passe de 4 caractères
            minimum.
          </p>
        </div>
      </motion.div>
    </div>
  );
}