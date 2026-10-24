import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import type { ProjectDetail } from "./projects-data";

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-strong rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-neon-blue/10 border border-neon-blue/30 text-neon-blue"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3
              id="project-modal-title"
              className="text-2xl md:text-3xl font-bold leading-tight pr-10"
            >
              {project.title}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{project.desc}</p>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-wider text-neon-purple mb-3">
                Key highlights
              </div>
              <ul className="space-y-2">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:border-neon-blue/40 text-sm transition"
                  >
                    {l.label} <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
