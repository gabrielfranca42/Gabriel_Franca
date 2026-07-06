import { useState, useEffect, useCallback, useRef } from "react";
import { animate } from "animejs";
import { ArrowUpRight, Menu, X, Mail, Linkedin, Github, Copy, Check, ExternalLink, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EMAIL = "gabrielfranca172@gmail.com";

export function openContactModal() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

const CONTACT_LINKS = [
  {
    key: "whatsapp",
    icon: FaWhatsapp,
    href: "https://wa.me/5581996878213",
    color: "hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400",
  },
  {
    key: "linkedin",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gabriel-fran%C3%A7a-2190a1300/",
    color: "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400",
  },
  {
    key: "github",
    icon: Github,
    href: "https://github.com/gabrielfranca42",
    color: "hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  const resumeUrl = import.meta.env.BASE_URL + "downloads/Gabriel_Franca_Curriculo_Oficial.doc";

  useEffect(() => {
    if (showContact && modalRef.current) {
      animate(modalRef.current, {
        scale: [0.8, 1],
        opacity: [0, 1],
        ease: 'outElastic(1, .6)',
        duration: 800
      });
      
      const links = modalRef.current.querySelectorAll('.contact-link');
      animate(links, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: (el: any, i = 0) => i * 100 + 150,
        ease: 'outBack',
        duration: 600
      });
    }
  }, [showContact]);

  const closeContact = useCallback(() => {
    setShowContact(false);
    setCopied(false);
  }, []);

  useEffect(() => {
    if (!showContact) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showContact, closeContact]);

  useEffect(() => {
    const handleOpen = () => setShowContact(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  const NAV_LINKS = [
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#work", label: t("nav.work") },
    { href: "#personal-projects", label: t("nav.personalProjects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <>
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="font-medium tracking-tight">Gabriel França</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="cursor-pointer hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={resumeUrl}
            download
            className="cursor-pointer text-sm font-medium px-4 py-2 rounded-full hover:bg-muted transition-colors hidden sm:flex items-center gap-2"
          >
            {t("nav.resume")}
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setShowContact(true)}
            className="cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors hidden sm:flex items-center gap-2"
          >
            {t("nav.letsTalk")}
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border/40 mt-2 pt-3 flex flex-col gap-2">
              <a
                href={resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="cursor-pointer text-sm font-medium px-4 py-3 rounded-full hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                {t("nav.resume")}
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => { setOpen(false); setShowContact(true); }}
                className="cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {t("nav.letsTalk")}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>

    {/* Contact modal */}
    {showContact && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        onClick={closeContact}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          ref={modalRef}
          className="relative w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl opacity-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeContact}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label={t("nav.closeMenu")}
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-lg font-semibold tracking-tight mb-1">
            {t("contactModal.title")}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t("contactModal.subtitle")}
          </p>

          <div className="contact-link flex items-center gap-3 p-3 rounded-xl border border-border bg-card mb-4 opacity-0">
            <Mail className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-sm text-muted-foreground truncate flex-1">{EMAIL}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="cursor-pointer p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
              title={t("contactModal.emailCopy")}
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
              title={t("contactModal.emailSend")}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-link opacity-0 flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card text-muted-foreground transition-all ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{t(`contactModal.${link.key}`)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
