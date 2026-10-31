"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { IconEraser, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";

export function SignaturePad({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(Boolean(value));

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.strokeStyle = "#0F5C6E";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasInk) setHasInk(true);
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">
          Signature du technicien
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clear}
          aria-label="Effacer la signature"
        >
          <IconEraser size={16} stroke={1.75} aria-hidden />
          Effacer
        </Button>
      </div>
      <div
        className={`relative rounded-sm border bg-surface ${
          error ? "border-terra-500" : "border-line"
        }`}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="h-32 w-full touch-none rounded-sm"
          aria-label="Zone de signature, dessinez avec le doigt ou la souris"
          role="img"
        />
        {!hasInk ? (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-ink-faint">
            Signez ici
          </p>
        ) : (
          <span className="pointer-events-none absolute right-2 top-2 text-petrol-600">
            <IconCheck size={16} stroke={2} aria-hidden />
          </span>
        )}
      </div>
      {error ? (
        <p role="alert" className="text-sm text-terra-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}