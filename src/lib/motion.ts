import type { Variant } from "framer-motion";

/** Shared viewport for scroll-triggered reveals */
export const revealViewport = {
  once: true,
  margin: "-80px 0px -60px 0px",
} as const;

export function revealTransition(
  prefersReducedMotion: boolean | null,
  duration = 0.55,
  delay = 0,
) {
  const reduce = Boolean(prefersReducedMotion);
  return {
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: "easeOut" as const,
  };
}

export function staggerContainerVariants(
  prefersReducedMotion: boolean | null,
  stagger = 0.1,
  delayChildren = 0.06,
): { hidden: Variant; visible: Variant } {
  const reduce = Boolean(prefersReducedMotion);
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
}

export function staggerItemVariants(
  prefersReducedMotion: boolean | null,
  options: { y?: number; x?: number } = {},
): { hidden: Variant; visible: Variant } {
  const reduce = Boolean(prefersReducedMotion);
  const y = options.y ?? 28;
  const x = options.x;
  return {
    hidden: reduce
      ? { opacity: 0 }
      : x != null && x !== 0
        ? { opacity: 0, x, y: 0, rotateX: 6 }
        : { opacity: 0, y, x: 0, rotateX: 8 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: "spring", stiffness: 380, damping: 28, mass: 0.35 },
    },
  };
}
