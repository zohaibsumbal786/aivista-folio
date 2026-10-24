import { motion, useInView } from "framer-motion";
import { lazy, useEffect, useRef, useState } from "react";
import { Brain, Cpu, Database, Sparkles } from "lucide-react";
import { LazyScene } from "./LazyScene";

const DataCubeScene = lazy(() => import("./DataCubeScene"));

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1600;
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setN(end * (1 - Math.pow(1 - p, 3)));
      if (p === 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, end]);
  const display = Number.isInteger(end) ? Math.round(n) : n.toFixed(2);
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { end: 10, suffix: "+", label: "Projects Built" },
  { end: 6, suffix: "", label: "Certifications" },
  { end: 3.1, suffix: "/4.0", label: "GPA" },
  { end: 4, suffix: "+", label: "Years Coding" },
];

const icons = [
  { Icon: Brain, color: "text-neon-blue", label: "Deep Learning" },
  { Icon: Cpu, color: "text-neon-purple", label: "Neural Nets" },
  { Icon: Database, color: "text-neon-teal", label: "Data Pipelines" },
  { Icon: Sparkles, color: "text-neon-blue", label: "Agentic AI" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm tracking-widest text-neon-blue uppercase mb-3">01 — About</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Who is <span className="text-gradient">Zohaib</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              A highly motivated{" "}
              <span className="text-foreground font-medium">Data Science graduate</span> passionate
              about programming, machine learning, deep learning, and AI. I love turning messy,
              real-world data into intelligent systems — from computer vision pipelines to IoT
              health devices.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              I'm seeking a challenging role in a well-reputed firm where I can apply my data
              science and machine learning skills to build products that create measurable impact.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {icons.map(({ Icon, color, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-3 animate-float"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <Icon className={color} size={22} />
                  <span className="text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="relative glass-strong rounded-2xl h-56 md:h-64 overflow-hidden">
              <LazyScene><DataCubeScene /></LazyScene>
              <div className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                data · models · agents
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-neon-blue">
                v.zak_2026
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-6 text-center hover:glow-blue transition"
                >
                  <Counter end={s.end} suffix={s.suffix} />
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
