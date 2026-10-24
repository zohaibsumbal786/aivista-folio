import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectDetail } from "./projects-data";
import { ProjectModal } from "./ProjectModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ProjectCard({
  p,
  i,
  onOpen,
}: {
  p: ProjectDetail;
  i: number;
  onOpen: (p: ProjectDetail) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      ref={ref}
      type="button"
      onClick={() => onOpen(p)}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: reduced
          ? undefined
          : `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group glass rounded-2xl p-6 hover:border-neon-blue/40 relative overflow-hidden text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 via-neon-purple/0 to-neon-teal/0 group-hover:from-neon-blue/10 group-hover:via-neon-purple/5 group-hover:to-neon-teal/10 transition-all duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
          <ArrowUpRight
            size={20}
            className="text-muted-foreground group-hover:text-neon-blue group-hover:rotate-45 transition"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] rounded-md bg-white/5 border border-white/10 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 text-xs text-neon-blue opacity-0 group-hover:opacity-100 transition">
          Click for details →
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<ProjectDetail | null>(null);
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-sm tracking-widest text-neon-purple uppercase mb-3">
            05 — Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} onOpen={setSelected} />
          ))}
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
