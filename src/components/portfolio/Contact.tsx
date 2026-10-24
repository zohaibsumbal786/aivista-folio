import { motion, AnimatePresence } from "framer-motion";
import { lazy, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { LazyScene } from "./LazyScene";

const WireframeGlobe = lazy(() => import("./WireframeGlobe"));

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      // FormSubmit.co — no signup, sends messages straight to the email below.
      // First submission triggers a one-time confirmation email to activate.
      const res = await fetch("https://formsubmit.co/ajax/zohaibsumbal8@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json().catch(() => ({}));
      if (data && data.success === "false") throw new Error(data.message || "Send failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <LazyScene><WireframeGlobe /></LazyScene>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="text-sm tracking-widest text-neon-blue uppercase mb-3">07 — Contact</div>
          <h2 className="text-4xl md:text-6xl font-bold">
            Let's build <span className="text-gradient">something</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Have a role, a project idea, or a research collaboration in mind? Drop a message.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              {
                Icon: Mail,
                label: "Email",
                value: "zohaibsumbal8@gmail.com",
                href: "mailto:zohaibsumbal8@gmail.com",
              },
              { Icon: Phone, label: "Phone", value: "+92 306 1032323", href: "tel:+923061032323" },
              { Icon: MapPin, label: "Location", value: "Muzaffargarh, Pakistan" },
            ].map(({ Icon, label, value, href }) => {
              const inner = (
                <div className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-neon-blue/40 transition">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-white/10 flex items-center justify-center">
                    <Icon className="text-neon-blue" size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href}>
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/zohaib-ahmad-khan-sumbal"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass w-11 h-11 rounded-xl flex items-center justify-center hover:glow-blue hover:text-neon-blue transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/zohaibsumbal"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass w-11 h-11 rounded-xl flex items-center justify-center hover:glow-purple hover:text-neon-purple transition"
              >
                <Github size={18} />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={submit}
            className="lg:col-span-3 glass-strong rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </label>
                <input
                  id="c-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  id="c-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="text-xs uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                id="c-msg"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition resize-none"
                placeholder="Tell me about the opportunity…"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground font-medium glow-blue hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-sm text-neon-teal"
                    role="status"
                  >
                    <CheckCircle2 size={16} /> Message sent — I'll reply soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-sm text-destructive"
                    role="alert"
                  >
                    <AlertCircle size={16} /> {errorMsg || "Couldn't send. Try email directly."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
