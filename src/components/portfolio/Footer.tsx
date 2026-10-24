export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {year}{" "}
          <span className="text-foreground font-medium">Zohaib Ahmad Khan Sumbal</span>. Crafted
          with data & code.
        </div>
        <div className="flex gap-6 text-xs uppercase tracking-wider text-muted-foreground">
          <a href="#about" className="hover:text-neon-blue transition">
            About
          </a>
          <a href="#projects" className="hover:text-neon-blue transition">
            Projects
          </a>
          <a href="#research" className="hover:text-neon-blue transition">
            Research
          </a>
          <a href="#contact" className="hover:text-neon-blue transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
