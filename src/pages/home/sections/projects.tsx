import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";
import { useTranslation } from "react-i18next";

interface Project {
  title: string;
  description: string;
  company: string;
  color: string;
  tags: string[];
  new?: boolean;
}

interface PersonalProject {
  title: string;
  description: string;
  color: string;
  tags: string[];
  url: string;
  new?: boolean;
}

export function Projects() {
  const { t } = useTranslation(["projects", "data"]);
  const projects = t("data:projects", { returnObjects: true }) as Project[];
  const personalProjects = t("data:personalProjects", { returnObjects: true }) as PersonalProject[];

  return (
    <section id="work">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER_CONTAINER}
      >
        <motion.h2 variants={FADE_UP} className="text-2xl font-semibold mb-10 tracking-tight">
          {t("projects:title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div key={index} variants={FADE_UP}>
              <div className="flex flex-col p-5 sm:p-8 rounded-2xl border border-card-border bg-card hover:bg-muted/30 transition-all relative overflow-hidden h-full">
                <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mb-2 block">@ {project.company}</span>
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter ${project.color}`}>{project.title}</h3>
                  {project.new && (
                    <span className="relative flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
                      New
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">{project.description}</p>
                <div className="mt-auto pt-4 sm:pt-6 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-background border border-border">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2 id="personal-projects" variants={FADE_UP} className="text-2xl font-semibold mb-10 mt-16 tracking-tight scroll-mt-20">
          {t("projects:personalTitle")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {personalProjects.map((project, index) => (
            <motion.div key={index} variants={FADE_UP}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-5 sm:p-8 rounded-2xl border border-card-border bg-card hover:bg-muted/30 transition-all cursor-pointer relative overflow-hidden h-full">
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-background border border-border opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter ${project.color}`}>{project.title}</h3>
                  {project.new && (
                    <span className="relative flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
                      New
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">{project.description}</p>
                <div className="mt-auto pt-4 sm:pt-6 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-background border border-border">{tag}</span>
                  ))}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
