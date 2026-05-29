import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enHero from "./locales/en/hero.json";
import enExperience from "./locales/en/experience.json";
import enProjects from "./locales/en/projects.json";
import enContact from "./locales/en/contact.json";
import enData from "./locales/en/data.json";

import ptCommon from "./locales/pt/common.json";
import ptHero from "./locales/pt/hero.json";
import ptExperience from "./locales/pt/experience.json";
import ptProjects from "./locales/pt/projects.json";
import ptContact from "./locales/pt/contact.json";
import ptData from "./locales/pt/data.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        hero: enHero,
        experience: enExperience,
        projects: enProjects,
        contact: enContact,
        data: enData,
      },
      pt: {
        common: ptCommon,
        hero: ptHero,
        experience: ptExperience,
        projects: ptProjects,
        contact: ptContact,
        data: ptData,
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "pt"],
    ns: ["common", "hero", "experience", "projects", "contact", "data"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
      caches: [],
    },
  });

export default i18n;
