"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  CheckCheck,
  ChevronDown,
  X,
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { SeoContent } from "@/components/SeoContent";
import { useToast } from "@/components/ToastContext";
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
  const [cardCopied, setCardCopied] = useState(false);
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
      addToast("Нусхалаш учун матн йўқ", "info");
      return;
    }
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      addToast("Нусха олинди", "success", 1500);
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast("Кўчиришда хато", "error");
    }
  }, [output, addToast]);

  const handleDownload = useCallback(() => {
    if (!output.trim()) {
      addToast("Юклаб олиш учун матн йўқ", "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${base}_converted.txt`);
  }, [output, fileName, addToast]);

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
      addToast("Тозаланди", "info", {
        duration: 6000,
        action: {
          label: "Бекор қилиш",
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
  ]);

  const handleFileSelected = (text: string, file: File) => {
    setFileName(file.name);
    setSourceFile(file);
    setSourceText(text);
    setFileConverted(null);
    setDirection(detectDirection(text));
    addToast(`"${file.name}" юкланди`, "success", 1500);
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
          err instanceof Error ? err.message : "Файлни юклашда хато",
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
        className={`sticky top-0 z-10 smooth-transition border-b ${
          scrolled
            ? "border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
            : "border-transparent bg-white dark:bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <a href="/" className="flex flex-shrink-0 items-baseline gap-2 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kiril <span className="text-primary-600 dark:text-primary-400" aria-hidden="true">↔</span> Lotin
            </h1>
            <span className="text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500">
              kirillotin.uz
            </span>
          </a>
          <nav
            aria-label="Сайт навигацияси"
            className="flex min-w-0 items-center justify-center sm:justify-end gap-1 text-xs sm:text-sm overflow-x-auto -mx-2 px-2 sm:overflow-visible"
          >
            <a
              href="#about"
              className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Сайт ҳақида
            </a>
            <a
              href="#features"
              className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Имкониятлар
            </a>
            <a
              href="#faq"
              className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Саволлар
            </a>
            <a
              href="/blog"
              className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Блог
            </a>

            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1 flex-shrink-0" />

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="IT хизматлари учун боғланинг"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Боғланиш
            </button>

            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
              💛 Донат
            </button>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">

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
                ? "Kiril → Lotin"
                : "Lotin → Kiril"
              : undefined
          }
        />

        {/* Two-panel converter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">

          {/* LEFT — Input */}
          <div className="flex flex-col bg-white dark:bg-gray-900">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-400 dark:text-gray-500">
                Матн киритинг
              </span>
              <button
                onClick={handleClear}
                title="Тозалаш (Ctrl+K)"
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Кирил ёки Лотин матнини киритинг..."
              className="flex-1 w-full px-4 py-3 bg-transparent text-base text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 resize-none outline-none min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
              <span className="text-[11px] text-gray-300 dark:text-gray-600 tabular-nums">
                {input.length > 0 ? `${input.length.toLocaleString()} белги` : ""}
              </span>
            </div>
          </div>

          {/* RIGHT — Output */}
          <div className="flex flex-col bg-gray-50/60 dark:bg-gray-900/60">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-400 dark:text-gray-500">
                Натижа
              </span>
              <div className="flex items-center gap-1">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  title="Нусхалаш (Ctrl+Enter)"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    copied
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                  <span className="hidden sm:inline">{copied ? "Нусхаланди" : "Нусхалаш"}</span>
                </button>
                {/* Download */}
                <button
                  onClick={handleDownload}
                  title="Юклаб олиш"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Юклаб олиш</span>
                </button>
              </div>
            </div>
            {/* Textarea */}
            <textarea
              value={output}
              readOnly
              placeholder="Конвертация натижаси..."
              className="flex-1 w-full px-4 py-3 bg-transparent text-base text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 resize-none outline-none cursor-default min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
              <span className="text-[11px] text-gray-300 dark:text-gray-600 tabular-nums">
                {output.length > 0 ? `${output.length.toLocaleString()} белги` : ""}
              </span>
            </div>
          </div>

        </div>
      </main>
      </div>

      <section
        aria-labelledby="about-heading"
        className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 sm:space-y-14">
          {/* About */}
          <div id="about" className="max-w-3xl mx-auto text-center space-y-4 scroll-mt-20">
            <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
              Сайт ҳақида
            </span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Kiril ↔ Lotin Konvertor
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              O'zbek tilidagi matnlarni Kiril alifbosidan Lotin alifbosiga va teskari,
              Lotindan Kirilga bir zumda o'girish uchun bepul onlayn vosita.
              Sayt <strong className="text-gray-800 dark:text-gray-200">matn</strong>,{" "}
              <strong className="text-gray-800 dark:text-gray-200">.txt</strong> va{" "}
              <strong className="text-gray-800 dark:text-gray-200">.docx</strong> fayllarni qo'llab-quvvatlaydi.
              Docx formatlash to'liq saqlanib qoladi. Barcha amallar faqat sizning
              brauzeringizda amalga oshiriladi, matn serverga yuborilmaydi.
            </p>
          </div>

          {/* Features — three unequally-weighted blocks, not a grid */}
          <div id="features" className="scroll-mt-20">
            <div className="max-w-3xl mx-auto stagger space-y-10 sm:space-y-12">
              {/* Block 1 — the moat */}
              <article className="space-y-3">
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  Maxfiylik
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Matnингиз serverga yuborilmaydi
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Barcha konvertatsiya jarayoni sizning brauzeringizda amalga oshiriladi.
                  Biz ham, boshqa hech kim ham yozganingizni ko'rmaydi. Bir marta ochildandan
                  keyin sayt internetsiz ham ishlayveradi.
                </p>
              </article>

              {/* Block 2 — the functional differentiator */}
              <article className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  .docx formatlash saqlanib qoladi
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Word hujjatlaridagi shrift, jadvallar, rangli matnlar va boshqa formatlash
                  o'z joyida qoladi. Faqat harflar almashadi.
                </p>
              </article>

              {/* Block 3 — footnote */}
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Bepul. Ro'yxatdan o'tish yo'q. Reklama yo'q.
              </p>
            </div>
          </div>

          {/* SEO content: alphabet table, rules, history */}
          <SeoContent />

          {/* FAQ */}
          <div id="faq" className="space-y-6 scroll-mt-20">
            <div className="text-center space-y-2">
              <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                Savollar
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Tez-tez beriladigan savollar
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2">
              {[
                {
                  q: "Saytdan foydalanish bepulmi?",
                  a: "Ha, sayt to'liq bepul. Ro'yxatdan o'tish, email yoki telefon raqami kerak emas. Cheklovlar, obuna va reklama yo'q.",
                },
                {
                  q: "Matn yoki fayl serverga yuboriladi?",
                  a: "Yo'q, barcha konvertatsiya faqat brauzeringizda amalga oshiriladi. Biz ham, boshqa hech kim ham matnингizni ko'rmaydi. Sayt bir marta ochildandan keyin internetsiz ham ishlaydi.",
                },
                {
                  q: "Qanday fayllarni yuklash mumkin?",
                  a: ".txt va .docx formatidagi fayllar, maksimum 5 MB hajmda.",
                },
                {
                  q: ".docx faylining formatlash saqlanadimi?",
                  a: "Ha. Shrift, rang, jadvallar, ro'yxatlar va boshqa formatlash elementlari to'liq saqlanib qoladi. Faqat harflar almashadi.",
                },
                {
                  q: "Konvertatsiya qanchalik aniq?",
                  a: "Algoritm hozirgi rasmiy o'zbek lotin alifbosi (2019 yil o'zgartirishlari) asosida ishlaydi. Ye/E, apostrof, Ts, X/H kabi nozik holatlar hisobga olingan. Aniqlik 99%dan yuqori.",
                },
                {
                  q: "Yo'nalishni sayt o'zi aniqlaydimi?",
                  a: "Ha. Matn kiritganingizda sayt uning kirilda yoki lotinda ekanligini aniqlab, tegishli yo'nalishni tanlaydi. Qo'lda almashtirish ham mumkin.",
                },
                {
                  q: "Mobil telefonida ishlaydi?",
                  a: "Ha, sayt Android, iPhone va planshetlar uchun to'liq moslashtirilgan. Alohida ilova o'rnatish shart emas.",
                },
                {
                  q: "Biror so'z noto'g'ri o'girilsa nima qilish kerak?",
                  a: "Telegram orqali razrabotchi bilan bog'laning (@Shohruz_Isroilov). Muammo tezda tuzatiladi.",
                },
              ].map((item) => {
                const isOpen = openFaq === item.q;
                return (
                  <div
                    key={item.q}
                    data-open={isOpen}
                    className="faq-item border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left select-none hover:bg-gray-100/60 dark:hover:bg-gray-800/60 smooth-transition"
                    >
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                        {item.q}
                      </h3>
                      <ChevronDown
                        size={18}
                        className="faq-chevron flex-shrink-0 text-gray-400"
                      />
                    </button>
                    <div className="faq-body">
                      <div>
                        <div className="px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Боғланиш</h2>
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
                    IT хизматлари
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Веб-сайт, мобил илова, дастур ёки бошқа IT лойиҳа буюртмаси учун
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
                    Муаммо ёки таклиф
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Сайтда хато топдингизми ёки яхшилаш учун таклифингиз борми?
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Лойиҳани қўллаб-қувватланг</h2>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                Сайт бепул ва рекламасиз ишлайди. Агар фойдали бўлса — донат қилинг.
              </p>
            </div>
            <button
              type="button"
              onClick={async () => {
                const ok = await copyToClipboard("9860190110799466");
                if (ok) {
                  setCardCopied(true);
                  addToast("Карта рақами нусхаланди", "success", 1500);
                  setTimeout(() => setCardCopied(false), 2000);
                }
              }}
              className="group w-full inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
              title="Нусхалаш"
            >
              <span className="font-mono font-bold text-lg text-gray-800 dark:text-gray-200 tracking-widest">
                9860 1901 1079 9466
              </span>
              {cardCopied
                ? <CheckCheck size={16} className="text-emerald-500 flex-shrink-0" />
                : <Copy size={16} className="opacity-40 group-hover:opacity-100 transition-opacity text-primary-600 dark:text-primary-400 flex-shrink-0" />
              }
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500">Shohruz Isroilov · Humo karta</p>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-100 dark:border-gray-800"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
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
              Блог
            </a>
            <a
              href="#faq"
              className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            >
              FAQ
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
