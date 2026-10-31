import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionConfig";
import { PageTransition } from "@/components/motion/PageTransition";
import { AppShell } from "@/components/layout/AppShell";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const work = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ronde, contrôles réguliers de la clinique",
  description:
    "Suivi des contrôles réguliers des équipements de la clinique : extincteurs, autoclaves, groupe électrogène, climatisation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${work.variable}`}>
      <body>
        <MotionProvider>
          <AppShell>
            <PageTransition>{children}</PageTransition>
          </AppShell>
        </MotionProvider>
      </body>
    </html>
  );
}