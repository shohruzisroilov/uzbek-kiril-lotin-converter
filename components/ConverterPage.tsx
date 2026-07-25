"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  CheckCheck,
  ChevronDown,
  X,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { SeoContent } from "@/components/SeoContent";
import { useToast } from "@/components/ToastContext";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import {
  cyrillicToLatin,
  latinToCyrillic,
  isCyrillic,
} from "@/lib/converter";
import {
  copyToClipboard,
  downloadAsTextFile,
  downloadConvertedDocx,
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/lib/utils";

type Direction = "cyrillic-to-latin" | "latin-to-cyrillic";

function detectDirection(text: string): Direction {
  return isCyrillic(text) ? "cyrillic-to-latin" : "latin-to-cyrillic";
}

export function ConverterPage() {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = t("metaTitle");
    }
  }, [locale, mounted, t]);

  const [input, setInput]           = useState("");
  const [output, setOutput]         = useState("");
  const [direction, setDirection]   = useState<Direction>("cyrillic-to-latin");
  const [fileName, setFileName]     = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState("");
  const [fileConverted, setFileConverted] = useState<{
    name: string;
    text: string;
    direction: Direction;
  } | null>(null);
  const [fileConverting, setFileConverting] = useState(false);
  const [copied, setCopied]         = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [donateOpen, setDonateOpen]   = useState(false);

  /* ── Persist ── */
  useEffect(() => {
    const savedIn  = getFromLocalStorage("converter-input");
    const savedOut = getFromLocalStorage("converter-output");
    const savedDir = getFromLocalStorage("converter-direction") as Direction | null;
    if (savedIn)  setInput(savedIn);
    if (savedOut) setOutput(savedOut);
    if (savedDir === "cyrillic-to-latin" || savedDir === "latin-to-cyrillic") {
      setDirection(savedDir);
    }
  }, []);

  useEffect(() => { saveToLocalStorage("converter-input", input); },         [input]);
  useEffect(() => { saveToLocalStorage("converter-output", output); },       [output]);
  useEffect(() => { saveToLocalStorage("converter-direction", direction); }, [direction]);

  const convert = useCallback((text: string, dir: Direction): string => {
    if (!text.trim()) return "";
    return dir === "cyrillic-to-latin"
      ? cyrillicToLatin(text)
      : latinToCyrillic(text);
  }, []);

  /* Auto-detect direction when input changes */
  const handleInputChange = useCallback((text: string) => {
    setInput(text);
    if (text.trim()) {
      setDirection(detectDirection(text));
    }
  }, []);

  /* Auto-convert whenever input or direction changes */
  useEffect(() => {
    setOutput(convert(input, direction));
  }, [input, direction, convert]);

  const handleCopy = useCallback(async () => {
    if (!output.trim()) {
      addToast(t("toastNoTextToCopy"), "info");
      return;
    }
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      addToast(t("toastCopied"), "success", 1500);
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast(t("toastCopyError"), "error");
    }
  }, [output, addToast, t]);

  const handleDownload = useCallback(() => {
    if (!output.trim()) {
      addToast(t("toastNoTextToDownload"), "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${base}_converted.txt`);
  }, [output, fileName, addToast, t]);

  const handleClear = useCallback(() => {
    const hadContent =
      input.trim() || output.trim() || fileName || sourceText;

    const snapshot = {
      input,
      output,
      direction,
      fileName,
      sourceFile,
      sourceText,
      fileConverted,
    };

    setInput("");
    setOutput("");
    setFileName("");
    setSourceFile(null);
    setSourceText("");
    setFileConverted(null);
    setFileConverting(false);
    saveToLocalStorage("converter-input", "");
    saveToLocalStorage("converter-output", "");

    if (hadContent) {
      addToast(t("toastCleared"), "info", {
        duration: 6000,
        action: {
          label: t("toastUndo"),
          onClick: () => {
            setInput(snapshot.input);
            setOutput(snapshot.output);
            setDirection(snapshot.direction);
            setFileName(snapshot.fileName);
            setSourceFile(snapshot.sourceFile);
            setSourceText(snapshot.sourceText);
            setFileConverted(snapshot.fileConverted);
            saveToLocalStorage("converter-input", snapshot.input);
            saveToLocalStorage("converter-output", snapshot.output);
          },
        },
      });
    }
  }, [
    input,
    output,
    direction,
    fileName,
    sourceFile,
    sourceText,
    fileConverted,
    addToast,
    t,
  ]);

  const handleFileSelected = (text: string, file: File) => {
    setFileName(file.name);
    setSourceFile(file);
    setSourceText(text);
    setFileConverted(null);
    setDirection(detectDirection(text));
    addToast(t("toastFileLoaded").replace("{name}", file.name), "success", 1500);
  };

  useEffect(() => {
    if (!sourceText) return;
    setFileConverting(true);
    const result = convert(sourceText, direction);
    setFileConverted({ name: fileName, text: result, direction });
    setFileConverting(false);
  }, [sourceText, direction, fileName, convert]);

  const handleFileClear = () => {
    setFileName("");
    setSourceFile(null);
    setSourceText("");
    setFileConverted(null);
    setFileConverting(false);
  };

  const handleFileDownload = async () => {
    if (!fileConverted) return;
    const base = fileConverted.name.replace(/\.[^/.]+$/, "");
    const isDocx =
      sourceFile?.name.toLowerCase().endsWith(".docx") ||
      sourceFile?.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (isDocx && sourceFile) {
      const dir = fileConverted.direction;
      setFileConverting(true);
      try {
        await downloadConvertedDocx(
          sourceFile,
          (t) => (dir === "cyrillic-to-latin" ? cyrillicToLatin(t) : latinToCyrillic(t)),
          `${base}_converted.docx`,
        );
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : t("toastFileLoadError"),
          "error",
        );
      } finally {
        setFileConverting(false);
      }
    } else {
      downloadAsTextFile(fileConverted.text, `${base}_converted.txt`);
    }
  };

  /* Keyboard shortcuts: Ctrl/⌘+K clear, Ctrl/⌘+Enter copy */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        handleClear();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleCopy();
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear, handleCopy]);

  const year = new Date().getFullYear();

  /* Scroll-aware header */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* FAQ open state */
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="min-h-[100dvh] flex flex-col">
      <header
        className={`sticky top-0 z-30 smooth-transition border-b ${
          scrolled
            ? "border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
            : "border-transparent bg-white dark:bg-gray-900"
        }`}
      >
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleClear();
            }}
            className="flex items-center gap-2 select-none group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg py-1"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div className="hidden sm:flex flex-col items-start leading-none">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                Kiril <span className="text-primary-600 dark:text-primary-400" aria-hidden="true">↔</span> Lotin
              </h1>
              <span className="hidden sm:inline text-[9px] sm:text-xs font-medium text-gray-400 dark:text-gray-500">
                kirillotin.uz
              </span>
            </div>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Navigation Links */}
            <nav
              aria-label="Сайт навигацияси"
              className="hidden md:flex items-center gap-1 text-sm mr-2"
            >
              <a
                href="#about"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navAbout")}
              </a>
              <a
                href="#features"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navFeatures")}
              </a>
              <a
                href="#faq"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navFaq")}
              </a>
              <a
                href="/blog"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navBlog")}
              </a>

              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1 flex-shrink-0" />

              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={t("contactTooltip")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                {t("navContact")}
              </button>
            </nav>

            {/* Donate Button - Always visible */}
            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="inline-flex whitespace-nowrap items-center gap-1 px-2.5 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              {t("navDonate")}
            </button>

            {mounted && (
              <div className="flex items-center gap-1.5">
                {/* Language Selector Dropdown */}
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() => setLangOpen(!langOpen)}
                    className="whitespace-nowrap inline-flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs font-bold transition-colors focus:outline-none"
                  >
                    <span>
                      {locale === "uz-cyr"
                        ? "🇺🇿 Ўзб"
                        : locale === "uz-lat"
                        ? "🇺🇿 O'zb"
                        : locale === "ru"
                        ? "🇷🇺 RU"
                        : "🇬🇧 EN"}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`opacity-60 transition-transform duration-200 ${
                        langOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {langOpen && (
                    <>
                      {/* Backdrop for closing */}
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setLangOpen(false)}
                      />
                      
                      {/* Dropdown options */}
                      <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black/5 dark:ring-white/10 py-1 z-40 focus:outline-none">
                        <button
                          onClick={() => {
                            setLocale("uz-cyr");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "uz-cyr"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇺🇿</span>
                          <span>Ўзб (Кирил)</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("uz-lat");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "uz-lat"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇺🇿</span>
                          <span>O'zb (Lotin)</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("ru");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "ru"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇷🇺</span>
                          <span>Русский</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("en");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "en"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇬🇧</span>
                          <span>English</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Theme Switcher Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                  title={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                  className="whitespace-nowrap inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                </button>
              </div>
            )}

            {/* Mobile Hamburguer Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none"
              aria-label="Menyuni ochish"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3 px-4 flex flex-col gap-1.5 animate-fade-in">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navAbout")}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navFeatures")}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navFaq")}
            </a>
            <a
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navBlog")}
            </a>
            <button
              onClick={() => {
                setContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navContact")}
            </button>
          </div>
        )}
      </header>

      <main id="main" className="flex-1 flex flex-col justify-center w-full max-w-full px-4 sm:px-8 lg:px-12 py-6 space-y-4">

        {/* File uploader — yupqa banner */}
        <FileUploader
          onFileSelected={handleFileSelected}
          onFileClear={handleFileClear}
          onDownload={handleFileDownload}
          currentFileName={fileName}
          converting={fileConverting}
          ready={!!fileConverted}
          directionLabel={
            fileConverted
              ? fileConverted.direction === "cyrillic-to-latin"
                ? locale === "ru"
                  ? "Кириллица → Латиница"
                  : locale === "en"
                  ? "Cyrillic → Latin"
                  : locale === "uz-cyr"
                  ? "Кирил → Лотин"
                  : "Kiril → Lotin"
                : locale === "ru"
                ? "Латиница → Кириллица"
                : locale === "en"
                ? "Latin → Cyrillic"
                : locale === "uz-cyr"
                ? "Лотин → Кирил"
                : "Lotin → Kiril"
              : undefined
          }
        />

        {/* Two-panel converter */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-gray-600">

          {/* LEFT — Input */}
          <div className="flex flex-col bg-white dark:bg-gray-900">
            {/* Panel header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
                {t("panelInputHeader")}
              </span>
              <button
                onClick={handleClear}
                title={`${t("panelInputClear")} (Ctrl+K)`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">{t("panelInputClear")}</span>
              </button>
            </div>
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t("panelInputPlaceholder")}
              className="flex-1 w-full px-4 py-3 bg-transparent text-base sm:text-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2.5 border-t border-gray-300 dark:border-gray-700 flex items-center justify-end">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                {input.length > 0 ? `${input.length.toLocaleString()} ${t("panelCharCount")}` : ""}
              </span>
            </div>
          </div>

          {/* RIGHT — Output */}
          <div className="flex flex-col bg-gray-50/60 dark:bg-gray-900/60">
            {/* Panel header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
                {t("panelOutputHeader")}
              </span>
              <div className="flex items-center gap-1.5">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  title={`${t("panelOutputCopy")} (Ctrl+Enter)`}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                    copied
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                  <span className="hidden sm:inline">{copied ? t("panelOutputCopied") : t("panelOutputCopy")}</span>
                </button>
                {/* Download */}
                <button
                  onClick={handleDownload}
                  title={t("panelOutputDownload")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">{t("panelOutputDownload")}</span>
                </button>
              </div>
            </div>
            {/* Textarea */}
            <textarea
              value={output}
              readOnly
              placeholder={t("panelOutputPlaceholder")}
              className="flex-1 w-full px-4 py-3 bg-transparent text-base sm:text-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none cursor-default min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2.5 border-t border-gray-300 dark:border-gray-700 flex items-center justify-end">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                {output.length > 0 ? `${output.length.toLocaleString()} ${t("panelCharCount")}` : ""}
              </span>
            </div>
          </div>

        </div>
      </main>
      </div>

      <section
        aria-labelledby="about-heading"
        className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-10 sm:space-y-14">
          {/* About */}
          <div id="about" className="max-w-3xl mx-auto text-center space-y-4 scroll-mt-20">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
              {t("aboutEyebrow")}
            </span>
            <h2 id="about-heading" className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t("aboutTitle")}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose">
              {t("aboutDesc1")}
            </p>
          </div>

          {/* Features — three unequally-weighted blocks, not a grid */}
          <div id="features" className="scroll-mt-20">
            <div className="max-w-3xl mx-auto stagger space-y-10 sm:space-y-12">
              {/* Block 1 — the privacy */}
              <article className="space-y-3">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  {t("featuresPrivacyEyebrow")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t("featuresPrivacyTitle")}
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("featuresPrivacyDesc")}
                </p>
              </article>

              {/* Block 2 — Word formats */}
              <article className="space-y-2">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  {t("featuresWordEyebrow")}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t("featuresWordTitle")}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("featuresWordDesc")}
                </p>
              </article>

              {/* Block 3 — footnote */}
              <p className="text-base font-bold text-gray-600 dark:text-gray-400">
                {t("featuresFootnote")}
              </p>
            </div>
          </div>

          {/* SEO content: alphabet table, rules, history */}
          <SeoContent />

          {/* FAQ */}
          <div id="faq" className="space-y-6 scroll-mt-20">
            <div className="text-center space-y-2">
              <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                {t("faqEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t("faqTitle")}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2.5">
              {[
                { q: t("faqQ1"), a: t("faqA1") },
                { q: t("faqQ2"), a: t("faqA2") },
                { q: t("faqQ3"), a: t("faqA3") },
                { q: t("faqQ4"), a: t("faqA4") },
                { q: t("faqQ5"), a: t("faqA5") },
                { q: t("faqQ6"), a: t("faqA6") },
                { q: t("faqQ7"), a: t("faqA7") },
                { q: t("faqQ8"), a: t("faqA8") },
              ].map((item) => {
                const isOpen = openFaq === item.q;
                return (
                  <div
                    key={item.q}
                    data-open={isOpen}
                    className="faq-item border border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left select-none hover:bg-gray-100/60 dark:hover:bg-gray-800/60 smooth-transition"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-50">
                        {item.q}
                      </h3>
                      <ChevronDown
                        size={20}
                        className="faq-chevron flex-shrink-0 text-gray-500 dark:text-gray-400"
                      />
                    </button>
                    <div className="faq-body">
                      <div>
                        <div className="px-4 pb-4 pt-1.5 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">{t("modalContactTitle")}</h2>
              <button
                onClick={() => setContactOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {/* IT xizmatlari */}
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/40 dark:hover:bg-primary-900/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-600 dark:text-primary-400">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {t("modalContactItServices")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {t("modalContactItDesc")}
                  </p>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>

              {/* Muammo / taklif */}
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/40 dark:hover:bg-primary-900/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💬</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {t("modalContactSuggest")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {t("modalContactSuggestDesc")}
                  </p>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setDonateOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDonateOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="text-4xl">💛</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("modalDonateTitle")}</h2>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                {t("modalDonateDesc")}
              </p>
            </div>
            <a
              href="https://tirikchilik.uz/shohruzisroilov"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDonateOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-md transition-colors"
            >
              <span>{t("modalDonateButton")}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <p className="text-xs text-gray-400 dark:text-gray-500">{t("modalDonateHolder")}</p>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>
              © {year}{" "}
              <a
                href="https://kirillotin.uz"
                className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
              >
                kirillotin.uz
              </a>
            </span>
            <a
              href="/blog"
              className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            >
              {t("navBlog")}
            </a>
            <a
              href="#faq"
              className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            >
              {t("faqEyebrow")}
            </a>
          </span>
          <span>
            Designed &amp; Developed by{" "}
            <a
              href="https://t.me/Shohruz_Isroilov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              Shohruzdev
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
