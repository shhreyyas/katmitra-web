import { motion, useReducedMotion } from "framer-motion";
import { revealViewport, revealTransition } from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

const distance = 36;

function offsetFor(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: distance };
  }
}

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra delay after entering view */
  delay?: number;
  direction?: Direction;
  /** Motion duration in seconds */
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView">;

/**
 * Single block: fades in when scrolled into view. Respects reduced motion.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.55,
  ...rest
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = offsetFor(direction);
  const initial =
    reduce === true
      ? { opacity: 0 }
      : { opacity: 0, x, y };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={revealViewport}
      transition={revealTransition(reduce, duration, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
