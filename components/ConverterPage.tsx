"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  ArrowLeftRight,
  CheckCheck,
  ChevronDown,
} from "lucide-react";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
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

  /* Auto-convert whenever input or direction changes */
  useEffect(() => {
    setOutput(convert(input, direction));
  }, [input, direction, convert]);

  const handleSwap = useCallback(() => {
    setDirection((d) => (d === "cyrillic-to-latin" ? "latin-to-cyrillic" : "cyrillic-to-latin"));
    setInput(output);
    setOutput(input);
  }, [input, output]);

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

  /* Keyboard shortcuts: Ctrl/⌘+K clear, Ctrl/⌘+Shift+S swap, Ctrl/⌘+Enter copy */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        handleClear();
        return;
      }

      if (e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        handleSwap();
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
  }, [handleClear, handleSwap, handleCopy]);

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
              Кирил <span className="text-primary-600 dark:text-primary-400" aria-hidden="true">↔</span> Лотин
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
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
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

        <div role="group" aria-label="Конвертация йўналиши" className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-sm font-medium w-full sm:w-auto">
          {(["cyrillic-to-latin", "latin-to-cyrillic"] as Direction[]).map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              aria-pressed={direction === d}
              className={`flex-1 sm:flex-none px-4 py-2 transition-colors ${
                direction === d
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {d === "cyrillic-to-latin" ? "Кирил → Лотин" : "Лотин → Кирил"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextArea
            label="Кириш"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              direction === "cyrillic-to-latin"
                ? "Кирил матнини киритинг..."
                : "Лотин матнини киритинг..."
            }
          />

          <TextArea
            label="Натижа"
            value={output}
            readOnly
            placeholder="Конвертация натижаси..."
          />
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <Button
            onClick={handleSwap}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            title="Кириш ва натижани алмаштириш (Ctrl+Shift+S)"
          >
            <ArrowLeftRight size={16} />
            Алмаштириш
          </Button>

          <div className="hidden sm:block sm:flex-1" />

          <Button
            onClick={handleCopy}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-w-[10ch]"
            title="Натижани нусхалаш (Ctrl+Enter)"
          >
            <span className="inline-flex items-center gap-2">
              {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              <span>{copied ? "Нусхаланди" : "Нусхалаш"}</span>
            </span>
          </Button>

          <Button
            onClick={handleDownload}
            variant="primary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Юклаб олиш
          </Button>

          <Button
            onClick={handleClear}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            title="Барча матнни тозалаш (Ctrl+K)"
          >
            <Trash2 size={16} />
            Тозалаш
          </Button>
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
              Кирил ↔ Лотин Конвертор
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Ўзбек тилидаги матнларни Кирил алифбосидан Лотин алифбосига ва тескариси,
              Лотиндан Кирилга бир зумда ўгириш учун бепул онлайн восита.
              Сайт <strong className="text-gray-800 dark:text-gray-200">матн</strong>,{" "}
              <strong className="text-gray-800 dark:text-gray-200">.txt</strong> ва{" "}
              <strong className="text-gray-800 dark:text-gray-200">.docx</strong> файлларни қўллаб-қувватлайди.
              Docx форматланиши тўлиқ сақланиб қолади. Барча амаллар фақат сизнинг
              браузерингизда амалга оширилади, матн серверга юборилмайди.
            </p>
          </div>

          {/* Features — three unequally-weighted blocks, not a grid */}
          <div id="features" className="scroll-mt-20">
            <div className="max-w-3xl mx-auto stagger space-y-10 sm:space-y-12">
              {/* Block 1 — the moat */}
              <article className="space-y-3">
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  Махфийлик
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Матнингиз серверга юборилмайди
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Барча конвертация жараёни сизнинг браузерингизда амалга оширилади.
                  Биз ҳам, бошқа ҳеч ким ҳам ёзганингизни кўрмайди. Бир марта очилгандан
                  кейин сайт интернетсиз ҳам ишлайверади.
                </p>
              </article>

              {/* Block 2 — the functional differentiator */}
              <article className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  .docx форматланиши сақланиб қолади
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Word ҳужжатларидаги шрифт, жадваллар, рангли матнлар ва бошқа форматлаш
                  ўз жойида қолади. Фақат ҳарфлар алмашади.
                </p>
              </article>

              {/* Block 3 — footnote */}
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Бепул. Рўйхатдан ўтиш йўқ. Реклама йўқ.
              </p>
            </div>
          </div>

          {/* SEO content: alphabet table, rules, history */}
          <SeoContent />

          {/* FAQ */}
          <div id="faq" className="space-y-6 scroll-mt-20">
            <div className="text-center space-y-2">
              <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                Саволлар
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Тез-тез бериладиган саволлар
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2">
              {[
                {
                  q: "Сайтдан фойдаланиш бепулми?",
                  a: "Ҳа, сайт тўлиқ бепул. Рўйхатдан ўтиш, email ёки телефон рақами кераксиз. Чекловлар, обуна ва реклама йўқ.",
                },
                {
                  q: "Матн ёки файл серверга юборилади?",
                  a: "Йўқ, барча конвертация фақат браузерингизда амалга оширилади. Биз ҳам, бошқа ҳеч ким ҳам матнингизни кўрмайди. Сайт бир марта очилгандан кейин интернетсиз ҳам ишлайди.",
                },
                {
                  q: "Қандай файлларни юклаш мумкин?",
                  a: ".txt ва .docx форматидаги файллар, максимум 5 МБ ҳажмда.",
                },
                {
                  q: ".docx файлининг форматланиши сақланадими?",
                  a: "Ҳа. Шрифт, ранг, жадваллар, рўйхатлар ва бошқа форматлаш элементлари тўлиқ сақланиб қолади. Фақат ҳарфлар алмашади.",
                },
                {
                  q: "Конвертация қанчалик аниқ?",
                  a: "Алгоритм ҳозирги расмий ўзбек лотин алифбоси (2019 йил ўзгартиришлари) асосида ишлайди. Е/Ye, апостроф, Ц, Х/Ҳ каби нозик ҳолатлар ҳисобга олинган. Аниқлик 99%дан юқори.",
                },
                {
                  q: "Йўналишни сайт ўзи аниқлайдими?",
                  a: "Ҳа. Матн киритганингизда сайт унинг кирилда ёки лотинда эканлигини аниқлайди ва тегишли йўналишни танлайди. Қўлда алмаштириш ҳам мумкин.",
                },
                {
                  q: "Мобил телефонда ишлайдими?",
                  a: "Ҳа, сайт Android, iPhone ва планшетлар учун тўлиқ мослаштирилган. Алоҳида илова ўрнатиш шарт эмас.",
                },
                {
                  q: "Бирор сўз нотўғри ўгирилса нима қилиш керак?",
                  a: "Telegram орқали разработчи билан боғланинг (@Shohruz_Isroilov). Муаммо тезда тузатилади.",
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

      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
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
