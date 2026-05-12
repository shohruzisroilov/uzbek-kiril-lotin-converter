"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Copy,
  Download,
  Trash2,
  ArrowLeftRight,
  History,
  Keyboard,
  CheckCheck,
  Zap,
  ChevronDown,
  ChevronUp,
  Wand2,
  Loader2,
} from "lucide-react";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { FileUploader } from "@/components/FileUploader";
import { useToast } from "@/components/ToastContext";
import {
  cyrillicToLatin,
  latinToCyrillic,
  isCyrillic,
  autoConvert,
  getCharacterCount,
} from "@/lib/converter";
import {
  copyToClipboard,
  downloadAsTextFile,
  downloadConvertedDocx,
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/lib/utils";

type Direction = "cyrillic-to-latin" | "latin-to-cyrillic";

interface ConversionHistoryItem {
  id: string;
  input: string;
  output: string;
  direction: Direction;
  timestamp: number;
}

const LARGE_TEXT_THRESHOLD = 50_000;

function getWordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function detectDirection(text: string): Direction {
  return isCyrillic(text) ? "cyrillic-to-latin" : "latin-to-cyrillic";
}

export function ConverterPage() {
  const { addToast } = useToast();

  const [input, setInput]               = useState("");
  const [output, setOutput]             = useState("");
  const [direction, setDirection]       = useState<Direction>("cyrillic-to-latin");
  const [realTime, setRealTime]         = useState(false);
  const [history, setHistory]           = useState<ConversionHistoryItem[]>([]);
  const [fileName, setFileName]         = useState("");
  const [sourceFile, setSourceFile]     = useState<File | null>(null);
  const [sourceText, setSourceText]     = useState("");
  const [fileConverted, setFileConverted] = useState<{
    name: string;
    text: string;
    direction: Direction;
  } | null>(null);
  const [fileConverting, setFileConverting] = useState(false);
  const [showHistory, setShowHistory]   = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [copied, setCopied]             = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Persist input / output ── */
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

  useEffect(() => { saveToLocalStorage("converter-input", input); },   [input]);
  useEffect(() => { saveToLocalStorage("converter-output", output); }, [output]);
  useEffect(() => { saveToLocalStorage("converter-direction", direction); }, [direction]);

  /* ── Persist history ── */
  useEffect(() => {
    const saved = getFromLocalStorage("converter-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("converter-history", JSON.stringify(history));
  }, [history]);

  /* ── Core convert ── */
  const convert = useCallback(
    (text: string, dir: Direction): string => {
      if (!text.trim()) return "";
      return dir === "cyrillic-to-latin"
        ? cyrillicToLatin(text)
        : latinToCyrillic(text);
    },
    [],
  );

  const addToHistory = useCallback(
    (inp: string, out: string, dir: Direction) => {
      if (!inp.trim() || !out.trim()) return;
      setHistory((prev) => {
        if (prev[0] && prev[0].input === inp && prev[0].direction === dir) return prev;
        const item: ConversionHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          input: inp,
          output: out,
          direction: dir,
          timestamp: Date.now(),
        };
        return [item, ...prev].slice(0, 15);
      });
    },
    [],
  );

  /* ── Real-time: re-convert when input OR direction changes ── */
  useEffect(() => {
    if (!realTime) return;
    if (!input.trim()) {
      setOutput("");
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsConverting(true);
    debounceRef.current = setTimeout(() => {
      setOutput(convert(input, direction));
      setIsConverting(false);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, direction, realTime, convert]);

  /* ── When direction changes (real-time off), invalidate stale output ── */
  const prevDirRef = useRef(direction);
  useEffect(() => {
    if (prevDirRef.current !== direction) {
      prevDirRef.current = direction;
      if (!realTime) setOutput("");
    }
  }, [direction, realTime]);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) setOutput("");
  };

  /* ── Manual convert (synchronous; shows loader for large text) ── */
  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      addToast("Илтимос, матн киритинг", "info");
      return;
    }
    const run = () => {
      const result = convert(input, direction);
      setOutput(result);
      addToHistory(input, result, direction);
      setIsConverting(false);
    };
    if (input.length > LARGE_TEXT_THRESHOLD) {
      setIsConverting(true);
      setTimeout(run, 0);
    } else {
      run();
    }
  }, [input, direction, convert, addToHistory, addToast]);

  /* ── Swap (only swaps direction + content; no toast) ── */
  const handleSwap = useCallback(() => {
    setDirection((d) => (d === "cyrillic-to-latin" ? "latin-to-cyrillic" : "cyrillic-to-latin"));
    setInput(output);
    setOutput(input);
  }, [input, output]);

  /* ── Auto-detect & convert ── */
  const handleAutoConvert = useCallback(() => {
    if (!input.trim()) {
      addToast("Илтимос, матн киритинг", "info");
      return;
    }
    const detectedDir = detectDirection(input);
    setDirection(detectedDir);
    const result = autoConvert(input);
    setOutput(result);
    addToHistory(input, result, detectedDir);
  }, [input, addToHistory, addToast]);

  /* ── Copy ── */
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

  /* ── Download ── */
  const handleDownload = useCallback(() => {
    if (!output.trim()) {
      addToast("Юклаб олиш учун матн йўқ", "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${base}_converted.txt`);
  }, [output, fileName, addToast]);

  /* ── Clear ── */
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

  /* ── File: convert in background, offer download (don't touch textareas) ── */
  const handleFileSelected = (text: string, file: File) => {
    setFileName(file.name);
    setSourceFile(file);
    setSourceText(text);
    setFileConverted(null);
    const detectedDir = detectDirection(text);
    setDirection(detectedDir);
    addToast(`"${file.name}" юкланди`, "success", 1500);
  };

  /* Convert (or re-convert) the loaded file whenever direction changes. */
  useEffect(() => {
    if (!sourceText) return;
    setFileConverting(true);
    const run = () => {
      const result = convert(sourceText, direction);
      setFileConverted({ name: fileName, text: result, direction });
      setFileConverting(false);
    };
    if (sourceText.length > LARGE_TEXT_THRESHOLD) {
      const t = setTimeout(run, 0);
      return () => clearTimeout(t);
    }
    run();
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

  /* ── History ── */
  const handleHistoryClick = (item: ConversionHistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    setDirection(item.direction);
  };

  const handleHistoryClear = () => setHistory([]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      } else if (mod && e.altKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        handleCopy();
      } else if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleConvert, handleCopy, handleClear]);

  /* ── Stats ── */
  const inputCharCount  = getCharacterCount(input);
  const outputCharCount = getCharacterCount(output);
  const inputWordCount  = getWordCount(input);
  const outputWordCount = getWordCount(output);

  const detectedDir = useMemo(
    () => (input.trim() ? detectDirection(input) : null),
    [input],
  );

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Кирил <span className="text-gradient">↔</span> Лотин
            </h1>
            <p className="max-w-xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              Ўзбек матни ва файлларни икки ёзув ўртасида бир зумда конвертация қилинг.
              Матн киритинг ёки файл юкланг — натижани дарҳол кўринг.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
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

        {/* ── Direction + Real-time ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 card">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Йўналиш:
            </span>
            <div role="group" aria-label="Конвертация йўналиши" className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-sm font-medium">
              {(["cyrillic-to-latin", "latin-to-cyrillic"] as Direction[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  aria-pressed={direction === d}
                  className={`px-3 py-1.5 transition-colors ${
                    direction === d
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {d === "cyrillic-to-latin" ? "Кирил → Лотин" : "Лотин → Кирил"}
                </button>
              ))}
            </div>
            {detectedDir && detectedDir !== direction && (
              <button
                onClick={() => setDirection(detectedDir)}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                title="Аниқланган йўналишни қўллаш"
              >
                Аниқланди: {detectedDir === "cyrillic-to-latin" ? "Кирил" : "Лотин"} →
              </button>
            )}
          </div>

          <ToggleSwitch
            checked={realTime}
            onChange={setRealTime}
            label="Реал вақтда"
            description="Ёзганингизда автоматик конвертация"
          />
        </div>

        {/* ── Text Areas ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4">
            <TextArea
              label="Кириш матни"
              badge={direction === "cyrillic-to-latin" ? "Кирил" : "Лотин"}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                direction === "cyrillic-to-latin"
                  ? "Кирил матнини киритинг..."
                  : "Лотин матнини киритинг..."
              }
              characterCount={inputCharCount}
              wordCount={inputWordCount}
            />
          </div>

          <div className="card p-4 relative">
            <TextArea
              label="Чиқиш матни"
              badge={direction === "cyrillic-to-latin" ? "Лотин" : "Кирил"}
              value={output}
              readOnly
              placeholder="Конвертация натижаси шу ерда кўринади..."
              characterCount={outputCharCount}
              wordCount={outputWordCount}
            />
            {isConverting && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg pointer-events-none">
                <Loader2 size={28} className="animate-spin text-primary-600 dark:text-primary-400" />
              </div>
            )}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {/* Primary group */}
          <div className="flex flex-wrap gap-2 sm:contents">
            <Button
              onClick={handleConvert}
              variant="primary"
              size="md"
              disabled={isConverting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isConverting ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
              {direction === "cyrillic-to-latin" ? "Кирил → Лотин" : "Лотин → Кирил"}
            </Button>

            <Button
              onClick={handleAutoConvert}
              variant="secondary"
              size="md"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
              title="Ёзувни автоматик аниқлаш ва конвертация"
            >
              <Wand2 size={16} />
              Автоматик
            </Button>

            <Button
              onClick={handleSwap}
              variant="secondary"
              size="md"
              className="inline-flex items-center justify-center gap-2"
              title="Кириш ва чиқишни алмаштириш"
            >
              <ArrowLeftRight size={16} />
              Алмаштириш
            </Button>
          </div>

          <div className="hidden sm:block sm:flex-1" />

          {/* Secondary group */}
          <div className="flex flex-wrap gap-2 sm:contents">
            <Button
              onClick={handleCopy}
              variant="success"
              size="md"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
            >
              {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              {copied ? "Нусхаланди!" : "Нусхалаш"}
            </Button>

            <Button
              onClick={handleDownload}
              variant="success"
              size="md"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Юклаб олиш
            </Button>

            <Button
              onClick={handleClear}
              variant="danger"
              size="md"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Тозалаш
            </Button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Кириш белгилари", value: inputCharCount.toLocaleString() },
            { label: "Кириш сўзлари",  value: inputWordCount.toLocaleString() },
            { label: "Чиқиш белгилари", value: outputCharCount.toLocaleString() },
            { label: "Чиқиш сўзлари",  value: outputWordCount.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── History ── */}
        {history.length > 0 && (
          <div className="card overflow-hidden">
            <div className="flex items-center">
              <button
                onClick={() => setShowHistory((v) => !v)}
                aria-expanded={showHistory}
                className="flex-1 flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <History size={16} />
                  Сўнгги конвертациялар
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
                    {history.length}
                  </span>
                </div>
                {showHistory ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
              {showHistory && (
                <button
                  onClick={handleHistoryClear}
                  aria-label="Тарихни тозалаш"
                  className="px-3 py-2 mr-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Тозалаш
                </button>
              )}
            </div>

            {showHistory && (
              <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-800 max-h-72 overflow-y-auto">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleHistoryClick(item)}
                    aria-label={`Тарихни юклаш: ${item.input.slice(0, 40)}`}
                    className="w-full text-left px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                        {item.direction === "cyrillic-to-latin" ? "Кирил → Лотин" : "Лотин → Кирил"}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString("uz-UZ", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{item.input}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 truncate">→ {item.output}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Shortcuts ── */}
        <div className="card overflow-hidden">
          <button
            onClick={() => setShowShortcuts((v) => !v)}
            aria-expanded={showShortcuts}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Keyboard size={16} />
              Клавиатура ёрлиқлари
            </div>
            {showShortcuts ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>

          {showShortcuts && (
            <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { keys: "Ctrl + Enter",   desc: "Конвертация қилиш" },
                  { keys: "Ctrl + Alt + C", desc: "Натижани нусхалаш" },
                  { keys: "Ctrl + K",       desc: "Ҳаммасини тозалаш" },
                ].map((s) => (
                  <div
                    key={s.keys}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <kbd className="px-2 py-1 text-xs font-mono font-semibold bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {s.keys}
                    </kbd>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>© {year} Кирил ↔ Лотин Конвертор</span>
          <span>Ўзбек ёзуви · MIT Лицензия</span>
        </div>
      </footer>
    </div>
  );
}
