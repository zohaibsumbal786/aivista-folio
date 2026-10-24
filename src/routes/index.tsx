import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Projects } from "@/components/portfolio/Projects";
import { Research } from "@/components/portfolio/Research";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Loader } from "@/components/portfolio/Loader";
import { PerfOverlay } from "@/components/portfolio/PerfOverlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zohaib Ahmad Khan Sumbal — Data Scientist & ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Zohaib Ahmad Khan Sumbal — Data Scientist & Machine Learning Engineer building AI, computer vision, and IoT systems.",
      },
      {
        property: "og:title",
        content: "Zohaib Ahmad Khan Sumbal — Data Scientist & ML Engineer",
      },
      {
        property: "og:description",
        content:
          "AI, ML, deep learning, computer vision and IoT projects — including published non-invasive glucose monitoring research.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-background text-foreground antialiased">
        <Loader />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Certifications />
          <Projects />
          <Research />
          <Contact />
        </main>
        <Footer />
        <Toaster />
        <PerfOverlay />
      </div>
    </MotionConfig>
  );
}
