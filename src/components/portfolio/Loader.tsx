import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Loader() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 200 : 1400);
    return () => clearTimeout(t);
  }, [reduced]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative w-24 h-24">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-neon-purple/40 border-t-transparent"
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple"
              animate={reduced ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
          <div className="absolute bottom-10 text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Initializing
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
