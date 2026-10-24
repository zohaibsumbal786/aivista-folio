import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const items = [
  {
    school: "MNS University of Agriculture Multan (MNSUAM)",
    degree: "BS in Data Science",
    year: "2022 — 2026",
    grade: "CGPA 3.10/4.0",
  },
  {
    school: "Sardar Kaurey Khan Public Higher Secondary School",
    degree: "HSSC (Pre-Engineering)",
    year: "2020 — 2022",
    grade: "70%",
  },
  {
    school: "Sardar Kaurey Khan Public Higher Secondary School",
    degree: "SSC (Matriculation)",
    year: "2018 — 2020",
    grade: "72%",
  },
];

export function Education() {
  return (
    <section id="education" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-sm tracking-widest text-neon-teal uppercase mb-3">
            03 — Education
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-teal" />
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              <div className="absolute -left-8 md:-left-11 top-4 w-4 h-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple glow-blue" />
              <div className="glass rounded-2xl p-6 hover:border-neon-blue/30 transition">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-neon-blue text-sm">
                      <GraduationCap size={16} />
                      <span>{it.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold mt-1">{it.degree}</h3>
                    <p className="text-muted-foreground mt-1">{it.school}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    {it.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
