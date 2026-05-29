import { Navbar } from "./sections/navbar";
import { Hero } from "./sections/hero";
import { Experience } from "./sections/experience";
import { Projects } from "./sections/projects";
import { Contact } from "./sections/contact";
import { Footer } from "./sections/footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/30 font-sans dark">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-22 md:pt-24 pb-12 sm:pb-16 md:pb-24 space-y-16 sm:space-y-24 md:space-y-32">
        <Hero />
        <hr className="border-border" />
        <Experience />
        <hr className="border-border" />
        <Projects />
        <hr className="border-border" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
