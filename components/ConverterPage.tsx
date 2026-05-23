"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  ArrowLeftRight,
  CheckCheck,
  Check,
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
    setInput("");
    setOutput("");
    setFileName("");
    setSourceFile(null);
    setSourceText("");
    setFileConverted(null);
    setFileConverting(false);
    saveToLocalStorage("converter-input", "");
    saveToLocalStorage("converter-output", "");
  }, []);

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

  /* Keyboard shortcut: clear */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear]);

  const year = new Date().getFullYear();

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <a href="/" className="flex items-baseline gap-2 text-center sm:text-left">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Кирил <span className="text-gradient">↔</span> Лотин
            </h1>
            <span className="text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500">
              kirillotin.uz
            </span>
          </a>
          <nav
            aria-label="Сайт навигацияси"
            className="flex items-center justify-center sm:justify-end gap-1 text-xs sm:text-sm overflow-x-auto -mx-2 px-2 sm:overflow-visible"
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

      <main className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
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
          <div className="card p-4">
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
          </div>

          <div className="card p-4">
            <TextArea
              label="Натижа"
              value={output}
              readOnly
              placeholder="Конвертация натижаси..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <Button
            onClick={handleSwap}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            title="Кириш ва натижани алмаштириш"
          >
            <ArrowLeftRight size={16} />
            Алмаштириш
          </Button>

          <div className="hidden sm:block sm:flex-1" />

          <Button
            onClick={handleCopy}
            variant="success"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
            {copied ? "Нусхаланди" : "Нусхалаш"}
          </Button>

          <Button
            onClick={handleDownload}
            variant="success"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Юклаб олиш
          </Button>

          <Button
            onClick={handleClear}
            variant="danger"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
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
              <strong className="text-gray-800 dark:text-gray-200">.docx</strong> файлларни қўллаб-қувватлайди —
              docx форматланиши тўлиқ сақланиб қолади. Барча амаллар фақат сизнинг
              браузерингизда амалга оширилади, матн серверга юборилмайди.
            </p>
          </div>

          {/* Features */}
          <div id="features" className="space-y-6 scroll-mt-20">
            <div className="text-center space-y-2">
              <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                Имкониятлар
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Нима таклиф қилади
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Кирил → Лотин конвертация",
                "Лотин → Кирил конвертация",
                "Реал вақтда автоматик ўгириш",
                ".txt ва .docx файлларни юклаш",
                "Docx форматлашни сақлаб қолиш",
                "Натижани нусхалаш ва юклаб олиш",
                "Қоронғу режим (Dark Mode)",
                "Тўлиқ бепул, рўйхатдан ўтиш шарт эмас",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feat}</span>
                </li>
              ))}
            </ul>
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
                  q: "Кирил ↔ Лотин конвертация бепулми?",
                  a: "Ҳа, сайтдан фойдаланиш тўлиқ бепул. Чекловлар, обуна ёки рекламалар йўқ. Истаганча матн ва файл ўгиришингиз мумкин.",
                },
                {
                  q: "Қандай файлларни юклаш мумкин?",
                  a: "Ҳозирда .txt ва .docx форматидаги файлларни юклаш мумкин. Файлнинг максимал ҳажми 5 МБ. Яқин келажакда .pdf ва бошқа форматлар қўшилади.",
                },
                {
                  q: "Конвертация натижаси сақланадими ёки серверга юборилади?",
                  a: "Йўқ, барча конвертация фақат сизнинг браузерингизда амалга оширилади. Матн ёки файл серверга юборилмайди, ҳеч ким (биз ҳам) уни кўра олмайди. Махфийлик 100% таъминланган.",
                },
                {
                  q: "Docx файлининг форматланиши сақланадими?",
                  a: "Ҳа, .docx файлни ўгирганингизда шрифт, ранг, шакл, жадваллар, рўйхатлар ва бошқа форматлаш элементлари тўлиқ сақланиб қолади. Фақат матн алмашади.",
                },
                {
                  q: "Кириллатин конвертация қанчалик аниқ?",
                  a: "Конвертация алгоритми ҳозирги расмий ўзбек лотин алифбоси (2019 йил ўзгартиришлари) асосида ишлайди. Махсус ҳолатлар — Е/Ye, апостроф, Ц, Х/Ҳ — ҳаммаси тўғри ҳисобга олинган. Аниқлик 99%дан юқори.",
                },
                {
                  q: "Қайси йўналишда ўгириш кераклигини сайт ўзи аниқлайдими?",
                  a: "Ҳа, матн киритганингизда сайт автоматик равишда унинг кирилда ёки лотинда эканлигини аниқлайди ва тегишли йўналишни танлайди. Истасангиз, тугма орқали қўлда алмаштиришингиз мумкин.",
                },
                {
                  q: "Натижани қандай сақлаб олиш мумкин?",
                  a: "Конвертация натижасини иккита усулда олиш мумкин: 'Нусхалаш' тугмаси орқали clipboard'га нусхалаш, ёки 'Юклаб олиш' тугмаси орқали .txt ёки .docx файл сифатида компьютерингизга юклаб олиш.",
                },
                {
                  q: "Рўйхатдан ўтиш керакми?",
                  a: "Йўқ, ҳеч қандай рўйхатдан ўтиш, email ёки телефон рақами кераксиз. Сайтга кириш биланоқ ишлатиш мумкин.",
                },
                {
                  q: "Мобил телефонда ишлайдими?",
                  a: "Ҳа, сайт тўлиқ мобил қурилмалар учун мослаштирилган. Android, iPhone ва планшетларда браузер орқали бемалол ишлатиш мумкин. Алоҳида илова ўрнатиш шарт эмас.",
                },
                {
                  q: "Интернет узилса ҳам ишлайдими?",
                  a: "Сайт биринчи марта очилгандан кейин барча конвертация жараёни оффлайн ҳолда ҳам давом этади, чунки барча амаллар браузерингизда бажарилади. Фақат янги матн ёки файл юклаш учун интернет керак эмас.",
                },
                {
                  q: "Қайси кирил алифбосини қўллаб-қувватлайди?",
                  a: "Сайт ҳозирги ўзбек кирил алифбосини (Ў, Қ, Ғ, Ҳ ҳарфлари билан) қўллаб-қувватлайди. Шунингдек, рус тилида учрайдиган Ц, Ы, Э ҳарфлари ҳам тўғри ўгирилади.",
                },
                {
                  q: "Апостроф (') нима учун ишлатилади?",
                  a: "Ўзбек лотин ёзувида апостроф иккита вазифани бажаради: 1) O' ва G' ҳарфларининг бир қисми сифатида (Ўзбек → O'zbek, Ғоя → G'oya); 2) Маъно фарқлайдиган бўғин чегарасида (Маъно → Ma'no).",
                },
                {
                  q: "Х ва Ҳ ҳарфларининг фарқи нима?",
                  a: "Кирил Х ҳарфи лотинда X билан (Хайр → Xayr), Ҳ эса H билан (Ҳаво → Havo) ёзилади. Бу икки ҳарф жуда тез-тез адаштирилади — сайтимиз буни автоматик равишда тўғри ўгиради.",
                },
                {
                  q: "Кирилда битта Ш кирилда, лотинда Sh — катта матнда муаммо бўлмайдими?",
                  a: "Йўқ, алгоритм катта-кичик ҳарфларни ҳам тўғри ўгиради. Масалан, ШАҲАР → SHAHAR (бош ҳарф ҳолатида), Шаҳар → Shahar (фақат биринчи ҳарф бош ҳолатида).",
                },
                {
                  q: "Сайтда хато учрасам нима қилишим керак?",
                  a: "Агар бирор сўз нотўғри ўгирилса ёки бошқа муаммо учраса, разработчи билан Telegram орқали (@Shohruz_Isroilov) боғланиб, муаммони билдиришингиз мумкин. Тезда тузатилади.",
                },
                {
                  q: "Сайт коди очиқми?",
                  a: "Сайт ўзбек тилидаги интернет жамоасига фойдали бўлсин деб ишлаб чиқилган бепул лойиҳа. Хусусиятларни такомиллаштириш бўйича таклифларингизни қабул қиламиз.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none select-none hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-colors">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                      {item.q}
                    </h3>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
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
