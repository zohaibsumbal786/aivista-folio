import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Bot,
  Database,
  Wrench,
  Server,
  Cloud,
  Terminal,
} from "lucide-react";

const groups = [
  {
    title: "Programming Languages",
    Icon: Code2,
    color: "from-neon-blue to-neon-teal",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "R", "SQL"],
  },
  {
    title: "Machine Learning & Deep Learning",
    Icon: Brain,
    color: "from-neon-purple to-neon-blue",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "ANN",
      "CNN",
      "Computer Vision",
      "NLP",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Keras",
      "OpenCV",
      "Hugging Face",
    ],
  },
  {
    title: "Agentic AI & LLMs",
    Icon: Bot,
    color: "from-neon-teal to-neon-purple",
    skills: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Agentic Scope",
      "AutoGen",
      "OpenAI API",
      "Anthropic API",
      "RAG",
      "Vector DBs",
      "Prompt Engineering",
      "MCP",
    ],
  },
  {
    title: "Backend & APIs",
    Icon: Server,
    color: "from-neon-blue to-neon-purple",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "REST APIs",
      "WebSockets",
      "GraphQL",
    ],
  },
  {
    title: "Databases",
    Icon: Database,
    color: "from-neon-purple to-neon-teal",
    skills: [
      "PostgreSQL",
      "Supabase",
      "SQLite",
      "MySQL",
      "MongoDB",
      "Redis",
      "Pinecone",
      "ChromaDB",
    ],
  },
  {
    title: "Data & Visualization",
    Icon: Wrench,
    color: "from-neon-teal to-neon-blue",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Power BI",
      "Tableau",
      "Excel",
    ],
  },
  {
    title: "DevOps & Cloud",
    Icon: Cloud,
    color: "from-neon-blue to-neon-teal",
    skills: [
      "Docker",
      "Git",
      "GitHub Actions",
      "Linux",
      "AWS (basics)",
      "Vercel",
      "Cloudflare",
    ],
  },
  {
    title: "Tools & AI Copilots",
    Icon: Terminal,
    color: "from-neon-purple to-neon-blue",
    skills: [
      "Jupyter",
      "VS Code",
      "Cursor",
      "Kiro",
      "Codex",
      "Claude",
      "ChatGPT",
      "GitHub Copilot",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-sm tracking-widest text-neon-purple uppercase mb-3">02 — Skills</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            A full-stack AI toolkit — from classical ML and deep learning to modern agentic
            frameworks, production APIs, and cloud data infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 hover:border-white/20 transition relative overflow-hidden"
            >
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${g.color} opacity-10 group-hover:opacity-30 blur-2xl transition`}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <g.Icon className="text-neon-blue" size={18} />
                  </div>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 hover:border-neon-blue/60 hover:text-neon-blue transition cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
