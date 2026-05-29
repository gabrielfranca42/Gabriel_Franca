import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Job {
  role: string;
  company: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  points: string[];
}

export function Experience() {
  const { t } = useTranslation(["experience", "data"]);
  const jobs = t("data:experience", { returnObjects: true }) as Job[];
  const monthNames = t("experience:months", { returnObjects: true }) as string[];

  function formatDate(date: string | null): string {
    if (!date) return t("experience:present");
    const [year, month] = date.split("-").map(Number);
    return `${monthNames[month - 1]} ${year}`;
  }

  function calcTotalYears(): number {
    const now = new Date();
    let totalMonths = 0;
    for (const job of jobs) {
      const [sy, sm] = job.startDate.split("-").map(Number);
      const [ey, em] = job.endDate
        ? job.endDate.split("-").map(Number)
        : [now.getFullYear(), now.getMonth() + 1];
      totalMonths += (ey - sy) * 12 + (em - sm);
    }
    return Math.ceil(totalMonths / 12);
  }

  function calcDuration(start: string, end: string | null): string {
    const [sy, sm] = start.split("-").map(Number);
    const now = end ? end.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
    const [ey, em] = now as [number, number];

    let totalMonths = (ey - sy) * 12 + (em - sm);
    if (!end) totalMonths += 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) return `${years} ${t("experience:yr")} ${months} ${t("experience:mos")}`;
    if (years > 0) return `${years} ${t("experience:yr")}`;
    return `${months} ${t("experience:mos")}`;
  }
  return (
    <section id="experience">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER_CONTAINER}
      >
        <motion.h2 variants={FADE_UP} className="text-2xl font-semibold mb-10 tracking-tight flex items-center gap-3">
          {t("experience:title")}
          <span className="px-2.5 py-1 rounded-full bg-muted/50 border border-border text-xs font-normal text-muted-foreground">
            {calcTotalYears()}+ {t("experience:yr")}
          </span>
        </motion.h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              variants={FADE_UP}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] flex flex-col p-5 sm:p-6 rounded-2xl border border-card-border bg-card hover:bg-muted/30 transition-all relative overflow-hidden">
                <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mb-2 block">
                  @ {job.company}
                </span>
                <div className="flex items-start gap-3 mb-1">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight">{job.role}</h3>
                  {!job.endDate && (
                    <span className="relative flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      {t("experience:present")}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-xs mb-4">{job.location} · {job.type}</p>
                <div className="mt-auto flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-background border border-border whitespace-nowrap">
                    {formatDate(job.startDate)} — {formatDate(job.endDate)}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-background border border-border whitespace-nowrap">
                    {calcDuration(job.startDate, job.endDate)}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs font-medium px-2.5 py-1 rounded bg-background border border-border cursor-default hover:bg-muted transition-colors">
                        {t("experience:details")}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start" className="bg-card border border-border text-foreground px-4 py-3 rounded-xl shadow-lg max-w-sm">
                      <ul className="space-y-2 text-xs">
                        {job.points.map((point, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary mt-0.5 shrink-0">•</span>
                            <span className="leading-relaxed text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
