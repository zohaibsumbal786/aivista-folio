import { motion } from "framer-motion";
import { Activity, Cpu, FileText, Zap } from "lucide-react";

const metrics = [
  { value: "87%", label: "Clarke Zone A+B Accuracy", Icon: Activity },
  { value: "3.2", label: "HR MAE (BPM) · r = 0.961", Icon: Zap },
  { value: "1.4%", label: "SpO₂ MAE", Icon: Activity },
  { value: "$38", label: "Prototype Cost", Icon: Cpu },
];

export function Research() {
  return (
    <section id="research" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-sm tracking-widest text-neon-teal uppercase mb-3">
            06 — Research
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Published <span className="text-gradient">Research</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Circuit-style graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 30 L20 30 L20 10 L40 10 L40 50 L60 50"
                    fill="none"
                    stroke="url(#gradLine)"
                    strokeWidth="0.7"
                  />
                  <circle cx="20" cy="10" r="2" fill="#7dd3fc" />
                  <circle cx="40" cy="50" r="2" fill="#a78bfa" />
                </pattern>
                <linearGradient id="gradLine" x1="0" x2="1">
                  <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#a78bfa" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-4">
                <FileText size={12} className="text-neon-teal" />
                Research Paper
              </div>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                An Intelligent IoT-Based{" "}
                <span className="text-gradient">Non-Invasive Glucose Monitoring System</span> Using
                Machine Learning
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Designed a multi-parameter biometric health kiosk using ESP32-S3, MAX30102, and
                MLX90614 sensors. Developed a five-state FSM firmware with FreeRTOS dual-core
                scheduling and a context-aware glucose estimation algorithm.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["ESP32-S3", "FreeRTOS", "MAX30102", "MLX90614", "ML", "IoT Health"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[11px] rounded-md bg-neon-teal/10 border border-neon-teal/30 text-neon-teal"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 hover:glow-blue transition"
                >
                  <m.Icon className="text-neon-blue mb-3" size={20} />
                  <div className="text-3xl md:text-4xl font-bold text-gradient tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-snug">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
