import { useEffect, useRef } from "react";
import { animate } from "animejs";
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
  const gRef = useRef<HTMLSpanElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gRef.current) {
      animate(gRef.current, {
        translateY: [0, -20, 0, 20, 0],
        loop: true,
        ease: 'inOutSine',
        duration: 6000
      });
    }

    if (badgesRef.current) {
      const badges = badgesRef.current.querySelectorAll('.anime-badge');
      animate(badges, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: (el: any, i = 0) => i * 100 + 400,
        ease: 'outElastic(1, .6)',
        duration: 1000
      });
    }

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.split-word');
      animate(words, {
        opacity: [0, 1],
        translateY: [40, 0],
        rotateZ: [5, 0],
        delay: (el: any, i = 0) => i * 80 + 100,
        ease: 'outQuint',
        duration: 800
      });
    }

    if (gridRef.current) {
      const dots = Array.from(gridRef.current.querySelectorAll('.grid-dot'));
      // Each dot gets its own infinite loop with a staggered delay offset
      // so the wave repeats seamlessly with no visible restart
      dots.forEach((dot, i) => {
        animate(dot, {
          scale: [0.4, 1.1, 0.4],
          opacity: [0.05, 0.45, 0.05],
          ease: 'inOutSine',
          loop: true,
          duration: 3000 + (i % 5) * 400,
          delay: (i % 10) * 300
        });
      });
    }
  }, []);

  return (
    <section id="about" className="relative pt-8 sm:pt-12 md:pt-24 overflow-hidden">
      {/* Background Grid */}
      <div ref={gridRef} className="absolute inset-0 z-0 overflow-hidden opacity-30 flex flex-wrap pointer-events-none justify-center items-center" style={{ gap: '3rem' }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="grid-dot w-2 h-2 rounded-full bg-primary/30 opacity-0" />
        ))}
      </div>

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
          ref={headingRef}
          variants={FADE_UP}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6 sm:mb-8"
        >
          <SplitText text={t("hero:heading1") as string} /><br />
          <span className="text-muted-foreground/60"><SplitText text={t("hero:heading2") as string} /></span><br />
          <SplitText text={t("hero:heading3") as string} />
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
          <div ref={badgesRef} className="flex flex-wrap items-center gap-2">
            <TechBadge animate icon={<FaJava className="w-3.5 h-3.5 text-[#ED8B00]" />} label="Java" prime />
            <TechBadge animate icon={<SiSpringboot className="w-3.5 h-3.5 text-[#6DB33F]" />} label="Spring Boot" prime />
            <TechBadge animate icon={<SiMysql className="w-3.5 h-3.5 text-[#4479A1]" />} label="MySQL" />

            <TechBadge animate icon={<SiApachekafka className="w-3.5 h-3.5 text-[#231F20]" />} label="Kafka" />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="anime-badge opacity-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium cursor-default hover:bg-muted transition-colors">
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
        <span ref={gRef} className="text-[400px] font-bold leading-none font-serif tracking-tighter inline-block">G</span>
      </div>
    </section>
  );
}

function TechBadge({ icon, label, prime, animate }: { icon: React.ReactNode; label: string; prime?: boolean; animate?: boolean }) {
  return (
    <div className={`${animate ? 'anime-badge opacity-0 ' : ''}flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
      prime
        ? "border border-primary/40 bg-primary/10 text-foreground"
        : "border border-border bg-card"
    }`}>
      {icon} {label}
    </div>
  );
}

function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block split-word opacity-0 mr-[0.25em]">
          {word}
        </span>
      ))}
    </>
  );
}
