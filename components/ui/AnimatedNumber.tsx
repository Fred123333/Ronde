"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  duration = 0.6,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(ref.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        ref.current = v;
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, duration, reduced]);

  return (
    <span aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}