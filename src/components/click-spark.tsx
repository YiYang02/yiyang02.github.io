"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ClickSparkProps {
  frames: readonly string[];
  labels: readonly string[];
  suffix: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  label: string;
  flip: boolean;
}

const FRAME_MS = 90;
const LIFETIME_MS = 900;
const MAX_SPARKS = 5;
const DRAG_TOLERANCE_PX = 6;
const LABEL_ROOM_PX = 150;
const IGNORED_TARGETS = "input, textarea, select, [contenteditable], [data-no-spark]";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** · ✢ ✳ ✶ ✻ ✽ ✻ ✶ ✳ ✢ · … — one full ping-pong per 900 ms lifetime. */
function pingPong(step: number, length: number) {
  if (length < 2) return 0;
  const period = 2 * (length - 1);
  const index = step % period;
  return index < length ? index : period - index;
}

interface SparkMarkProps {
  spark: Spark;
  frames: readonly string[];
  onDone: (id: number) => void;
}

/** One spark. Owns its frame interval and lifetime timer, so unmounting always cleans them up. */
function SparkMark({ spark, frames, onDone }: SparkMarkProps) {
  const [step, setStep] = useState(0);
  const { id } = spark;

  useEffect(() => {
    const interval = window.setInterval(() => setStep((current) => current + 1), FRAME_MS);
    const timeout = window.setTimeout(() => onDone(id), LIFETIME_MS);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [id, onDone]);

  return (
    <span className="spark" style={{ left: spark.x, top: spark.y }} data-flip={spark.flip ? "" : undefined}>
      {/* U+FE0E keeps emoji-capable glyphs (✳) in text presentation so they take the accent color. */}
      <span className="spark-glyph font-mono text-accent">{`${frames[pingPong(step, frames.length)]}\ufe0e`}</span>
      <span className="spark-label font-mono text-muted">{spark.label}</span>
    </span>
  );
}

/**
 * Decorative feedback for completed primary clicks. Purely additive: it never prevents
 * default behavior or stops propagation, and the overlay ignores pointer events.
 */
export function ClickSpark({ frames, labels, suffix }: ClickSparkProps) {
  const [sparks, setSparks] = useState<readonly Spark[]>([]);
  const nextId = useRef(0);

  const remove = useCallback((id: number) => {
    setSparks((current) => current.filter((spark) => spark.id !== id));
  }, []);

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION);
    // The active primary press: where it started, and whether it ever travelled past the tolerance.
    let press: { id: number; x: number; y: number; moved: boolean } | null = null;

    const onPointerDown = (event: PointerEvent) => {
      press = event.isPrimary ? { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false } : null;
    };

    // Latch on any excursion, so an out-and-back drag that ends near its origin still counts as a drag.
    const onPointerMove = (event: PointerEvent) => {
      if (press === null || press.moved || event.pointerId !== press.id) return;
      if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > DRAG_TOLERANCE_PX) press.moved = true;
    };

    const onPointerCancel = () => {
      press = null;
    };

    const onClick = (event: MouseEvent) => {
      const start = press;
      press = null;

      // detail === 0 means keyboard or synthetic activation, which has no meaningful position.
      if (event.button !== 0 || event.detail === 0 || start === null || start.moved || motion.matches) return;
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > DRAG_TOLERANCE_PX) return;
      if (window.getSelection()?.toString()) return;
      if (event.target instanceof Element && event.target.closest(IGNORED_TARGETS)) return;

      const spark: Spark = {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
        label: `${labels[Math.floor(Math.random() * labels.length)]}${suffix}`,
        flip: event.clientX > window.innerWidth - LABEL_ROOM_PX,
      };
      // Dropping the oldest unmounts it, which clears its timers.
      setSparks((current) => [...current, spark].slice(-MAX_SPARKS));
    };

    const onMotionChange = () => {
      if (motion.matches) setSparks([]);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    document.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
    document.addEventListener("pointercancel", onPointerCancel, { capture: true, passive: true });
    document.addEventListener("click", onClick, { capture: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("pointermove", onPointerMove, { capture: true });
      document.removeEventListener("pointercancel", onPointerCancel, { capture: true });
      document.removeEventListener("click", onClick, { capture: true });
      motion.removeEventListener("change", onMotionChange);
    };
  }, [labels, suffix]);

  return (
    <div aria-hidden="true" className="spark-layer pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparks.map((spark) => (
        <SparkMark key={spark.id} spark={spark} frames={frames} onDone={remove} />
      ))}
    </div>
  );
}
