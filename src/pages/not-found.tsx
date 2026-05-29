import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter text-primary mb-4">{t("notFound.title")}</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-center">
        {t("notFound.message")}
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("notFound.back")}
      </a>
    </div>
  );
}
