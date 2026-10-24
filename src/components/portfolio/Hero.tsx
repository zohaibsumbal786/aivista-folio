import { motion } from "framer-motion";
import { lazy, useEffect, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LazyScene } from "./LazyScene";


const NeuralSphere = lazy(() => import("./NeuralSphere"));

const titles = ["Data Scientist", "Machine Learning Engineer", "AI Researcher"];

export function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(titles[0]);
      return;
    }
    const current = titles[idx];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), 1400);
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1));
        else {
          setDel(false);
          setIdx((idx + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center overflow-hidden grid-bg pt-24 pb-16"
    >
      {/* Background 3D scene fills entire hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reduced ? undefined : `translate(${parallax.x}px, ${parallax.y}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <LazyScene><NeuralSphere /></LazyScene>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
        {/* Left: Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-wider uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neon-teal animate-glow-pulse" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            Zohaib Ahmad
            <br />
            <span className="text-gradient">Khan Sumbal</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-2xl font-mono text-muted-foreground min-h-8"
          >
            <span className="text-neon-blue">&gt;</span> {text}
            <span className="inline-block w-0.5 h-6 bg-neon-blue ml-1 animate-glow-pulse align-middle" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Turning data into intelligence — building ML, deep learning, and AI systems that solve
            real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground font-medium glow-blue hover:scale-105 transition"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-white/5 transition"
            >
              <Mail size={18} /> Contact Me
            </a>
            <a
              href="/Zohaib_Ahmad_Resume.pdf"
              download="Zohaib_Ahmad_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-white/5 transition"
            >
              <Download size={18} /> Resume
            </a>
          </motion.div>
        </div>

        {/* Right: 3D portrait with layered gradient rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex items-center justify-center"
          style={{
            transform: reduced
              ? undefined
              : `translate(${parallax.x * -0.5}px, ${parallax.y * -0.5}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px]">
            {/* Rotating gradient ring */}
            <div
              className={`absolute -inset-3 rounded-full opacity-70 blur-[1px] ${
                reduced ? "" : "animate-[spin_18s_linear_infinite]"
              }`}
              style={{
                background:
                  "conic-gradient(from 0deg, #7dd3fc, #a78bfa, #22d3ee, #7dd3fc)",
                mask: "radial-gradient(circle, transparent 62%, black 63%)",
                WebkitMask: "radial-gradient(circle, transparent 62%, black 63%)",
              }}
            />
            {/* Outer glow */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-neon-blue/30 via-neon-purple/30 to-neon-teal/30 blur-3xl animate-glow-pulse" />
            {/* Inner ring */}
            <div className="absolute inset-0 rounded-full glass-strong overflow-hidden">
              <img
                src="/zohaib-portrait.png"
                alt="Portrait of Zohaib Ahmad Khan Sumbal"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Color grade overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/15 via-transparent to-neon-purple/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
            </div>
            {/* Floating badges */}
            <motion.div
              animate={reduced ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-8 md:-left-8 glass-strong rounded-xl px-3 py-2 text-xs flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-neon-teal animate-glow-pulse" />
              <span className="font-mono">ML Engineer</span>
            </motion.div>
            <motion.div
              animate={reduced ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-1/2 md:-right-6 glass-strong rounded-xl px-3 py-2 text-xs"
            >
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Focus
              </div>
              <div className="font-semibold text-gradient">Agentic AI</div>
            </motion.div>
            <motion.div
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 -right-2 md:-right-10 glass-strong rounded-xl px-3 py-2 text-xs flex items-center gap-3"
            >
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">GPA</div>
                <div className="font-bold text-neon-blue">3.10</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase">Projects</div>
                <div className="font-bold text-neon-purple">10+</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground tracking-widest hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          SCROLL
          <div className="w-px h-8 bg-gradient-to-b from-neon-blue to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
