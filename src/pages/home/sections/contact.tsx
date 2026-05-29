import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FADE_UP } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import { openContactModal } from "./navbar";

export function Contact() {
  const { t } = useTranslation("contact");

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={FADE_UP}
        className="flex flex-col items-center text-center p-6 sm:p-12 md:p-24 rounded-2xl sm:rounded-3xl border border-card-border bg-card overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 relative z-10">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-md relative z-10">
          {t("description")}
        </p>
        <button onClick={openContactModal} className="cursor-pointer bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 relative z-10 text-sm sm:text-base">
          {t("cta")}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
