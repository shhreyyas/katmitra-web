import { motion, useReducedMotion } from "framer-motion";

type Props = {
  theme: "light" | "dark";
};

/**
 * Lightweight decorative “3D” layers (conic torus + orb) — no WebGL.
 */
export function Floating3DShapes({ theme }: Props) {
  const reduce = useReducedMotion();
  const accent =
    theme === "dark"
      ? "rgba(251, 191, 36, 0.22)"
      : "rgba(59, 180, 184, 0.2)";
  const soft =
    theme === "dark"
      ? "rgba(251, 191, 36, 0.08)"
      : "rgba(139, 92, 246, 0.12)";

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-[12%] -translate-x-1/2 w-full max-w-4xl h-[min(70vw,520px)]"
        style={{ perspective: reduce ? undefined : 900 }}
      >
        <motion.div
          className="absolute left-[8%] top-[10%] w-[min(42vw,380px)] h-[min(42vw,380px)] rounded-[42%] border-2 opacity-80"
          style={{
            borderColor: accent,
            transformStyle: "preserve-3d",
            background: `radial-gradient(circle at 30% 30%, ${soft}, transparent 55%)`,
          }}
          animate={
            reduce
              ? {}
              : {
                  rotateX: [12, 22, 12],
                  rotateY: [0, 360],
                  rotateZ: [-4, 4, -4],
                }
          }
          transition={{
            rotateY: { duration: 32, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute right-[-5%] bottom-[5%] w-[min(38vw,320px)] h-[min(38vw,320px)] rounded-full"
          style={{
            background: `conic-gradient(from 90deg, transparent, ${accent}, transparent, ${soft}, transparent)`,
            transformStyle: "preserve-3d",
            maskImage: "radial-gradient(circle, black 35%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 35%, transparent 72%)",
          }}
          animate={
            reduce
              ? {}
              : {
                  rotateY: [0, -360],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            rotateY: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute right-[18%] top-[28%] w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-primary/25 shadow-lg"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(145deg, hsl(43 96% 56% / 0.15), transparent)"
                : "linear-gradient(145deg, hsl(180 70% 40% / 0.18), transparent)",
            transformStyle: "preserve-3d",
          }}
          animate={
            reduce
              ? {}
              : {
                  y: [0, -18, 0],
                  rotateX: [18, 28, 18],
                  rotateZ: [6, -6, 6],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
