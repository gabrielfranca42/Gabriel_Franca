import { motion } from "framer-motion";
import { Github, Linkedin, Boxes } from "lucide-react";
import { SiSpringboot, SiMysql, SiPostgresql, SiApachekafka, SiRedis, SiDocker } from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation, Trans } from "react-i18next";

interface Job {
  startDate: string;
  endDate: string | null;
}

function calcYearsOfExperience(jobs: Job[]): number {
  const now = new Date();
  let totalMonths = 0;
  for (const job of jobs) {
    const [sy, sm] = job.startDate.split("-").map(Number);
    const [ey, em] = job.endDate
      ? job.endDate.split("-").map(Number)
      : [now.getFullYear(), now.getMonth() + 1];
    totalMonths += (ey - sy) * 12 + (em - sm);
  }
  return Math.floor(totalMonths / 12);
}

export function Hero() {
  const { t } = useTranslation(["hero", "data"]);
  const jobs = t("data:experience", { returnObjects: true }) as Job[];

  return (
    <section id="about" className="relative pt-8 sm:pt-12 md:pt-24">
      <motion.div
        initial="hidden"
        animate="show"
        variants={STAGGER_CONTAINER}
        className="max-w-4xl relative z-10"
      >
        <motion.div variants={FADE_UP} className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t("hero:badge")}
          </div>
        </motion.div>

        <motion.h1
          variants={FADE_UP}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6 sm:mb-8"
        >
          {t("hero:heading1")}<br />
          <span className="text-muted-foreground/60">{t("hero:heading2")}</span><br />
          {t("hero:heading3")}
        </motion.h1>

        <motion.div variants={FADE_UP} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 sm:mb-12">
          <Trans
            i18nKey="hero:description"
            values={{ years: calcYearsOfExperience(jobs) }}
            components={{ strong: <span className="text-foreground font-medium" /> }}
          />
        </motion.div>

        <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/gabrielfranca42/" target="_blank" rel="noopener noreferrer" className="cursor-pointer p-2.5 sm:p-2 rounded-full border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/gabrielfranca42" target="_blank" rel="noopener noreferrer" className="cursor-pointer p-2.5 sm:p-2 rounded-full border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Github className="w-5 h-5" />
            </a>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block mx-2" />
          <div className="flex flex-wrap items-center gap-2">
            <TechBadge icon={<FaJava className="w-3.5 h-3.5 text-[#ED8B00]" />} label="Java" prime />
            <TechBadge icon={<SiSpringboot className="w-3.5 h-3.5 text-[#6DB33F]" />} label="Spring Boot" prime />
            <TechBadge icon={<SiMysql className="w-3.5 h-3.5 text-[#4479A1]" />} label="MySQL" />

            <TechBadge icon={<SiApachekafka className="w-3.5 h-3.5 text-[#231F20]" />} label="Kafka" />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium cursor-default hover:bg-muted transition-colors">
                  {t("hero:more")}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card border border-border text-foreground px-3 py-2.5 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-2 max-w-[280px]">
                  <TechBadge icon={<FaAws className="w-3.5 h-3.5 text-[#FF9900]" />} label="AWS" />

                  <TechBadge icon={<Boxes className="w-3.5 h-3.5 text-[#FF9900]" />} label="Serverless" />
                  <TechBadge icon={<SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />} label="PostgreSQL" />
                  <TechBadge icon={<SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />} label="Docker" />
                  <TechBadge icon={<Boxes className="w-3.5 h-3.5 text-[#22c55e]" />} label="Microservices" />
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute right-0 top-12 opacity-5 select-none pointer-events-none hidden lg:block">
        <span className="text-[400px] font-bold leading-none font-serif tracking-tighter">G</span>
      </div>
    </section>
  );
}

function TechBadge({ icon, label, prime }: { icon: React.ReactNode; label: string; prime?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
      prime
        ? "border border-primary/40 bg-primary/10 text-foreground"
        : "border border-border bg-card"
    }`}>
      {icon} {label}
    </div>
  );
}
