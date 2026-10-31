"use client";

import { jsPDF } from "jspdf";
import type { ControlRecord, Equipment } from "./types";
import { FREQUENCY_LABEL, formatDate } from "./dates";

export function exportEquipmentHistoryPdf(
  equipment: Equipment,
  history: ControlRecord[]
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;

  doc.setFillColor(250, 248, 245);
  doc.rect(0, 0, pageW, doc.internal.pageSize.getHeight(), "F");

  doc.setTextColor(15, 92, 110);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Ronde, historique de contrôle", margin, 72);

  doc.setTextColor(42, 39, 36);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(equipment.name, margin, 108);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 101, 96);
  const meta = [
    `Emplacement : ${equipment.location}`,
    `Numéro de série : ${equipment.serial}`,
    `Fréquence : ${FREQUENCY_LABEL[equipment.frequency]}`,
    `Installé le : ${formatDate(equipment.installedAt)}`,
    `Prochain contrôle : ${formatDate(equipment.nextCheck)}`,
  ];
  let y = 128;
  meta.forEach((line) => {
    doc.text(line, margin, y);
    y += 16;
  });

  y += 12;
  doc.setDrawColor(231, 225, 217);
  doc.line(margin, y, pageW - margin, y);
  y += 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 92, 110);
  doc.text("Contrôles enregistrés", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(42, 39, 36);

  if (history.length === 0) {
    doc.text("Aucun contrôle enregistré pour cet équipement.", margin, y);
  }

  history.forEach((h) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${formatDate(h.date)}  ${h.technician}`, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 101, 96);
    const wrapped = doc.splitTextToSize(h.generalNote, pageW - margin * 2);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 13 + 18;
    doc.setTextColor(42, 39, 36);
    if (y > 760) {
      doc.addPage();
      y = 72;
    }
  });

  doc.setFontSize(9);
  doc.setTextColor(154, 147, 140);
  doc.text(
    `Document généré le ${new Date().toLocaleDateString("fr-FR")} par Ronde.`,
    margin,
    doc.internal.pageSize.getHeight() - 40
  );

  doc.save(`ronde-historique-${equipment.id}.pdf`);
}