import { motion, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees (pointer-driven) */
  maxTilt?: number;
  perspective?: number;
};

/**
 * Pointer-based 3D tilt using CSS perspective + rotateX/Y springs.
 * Disabled when prefers-reduced-motion is set.
 */
export function Tilt3D({
  children,
  className,
  maxTilt = 11,
  perspective = 1100,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotX = useSpring(0, { stiffness: 320, damping: 30, mass: 0.4 });
  const rotY = useSpring(0, { stiffness: 320, damping: 30, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY.set(px * 2 * maxTilt);
    rotX.set(-py * 2 * maxTilt);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ perspective: reduce ? undefined : perspective }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: "preserve-3d",
              }
        }
        className="h-full [transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </div>
  );
}
