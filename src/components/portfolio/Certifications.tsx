import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  {
    title: "Foundations of Data Science",
    issuer: "Google",
    desc: "Core concepts of data science workflow, roles, and analytical thinking.",
  },
  {
    title: "Data Analysis with R Programming",
    issuer: "Google",
    desc: "Statistical analysis, cleaning, and visualization using R and tidyverse.",
  },
  {
    title: "Intro to IoT & Embedded Systems",
    issuer: "UC Irvine",
    desc: "Fundamentals of IoT architectures, microcontrollers, and embedded design.",
  },
  {
    title: "Discover Data Analysis",
    issuer: "Microsoft",
    desc: "End-to-end data exploration and insight generation techniques.",
  },
  {
    title: "Error Handling with Transact-SQL",
    issuer: "Microsoft",
    desc: "TRY/CATCH patterns, custom errors, and robust SQL Server code.",
  },
  {
    title: "End-to-End Analytics with Microsoft Fabric",
    issuer: "Microsoft",
    desc: "Building unified analytics pipelines using the Fabric platform.",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-sm tracking-widest text-neon-blue uppercase mb-3">
            04 — Certifications
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Verified <span className="text-gradient">Credentials</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-6 hover:glow-purple transition relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue opacity-10 group-hover:opacity-30 blur-2xl transition" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-white/10 flex items-center justify-center mb-4">
                  <Award className="text-neon-blue" size={22} />
                </div>
                <div className="text-xs uppercase tracking-wider text-neon-purple mb-1">
                  {c.issuer}
                </div>
                <h3 className="text-lg font-semibold leading-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
