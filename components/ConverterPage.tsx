"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  saveToLocalStorage,
  getFromLocalStorage,
  debounce,
} from "@/lib/utils";

type Direction = "cyrillic-to-latin" | "latin-to-cyrillic";

interface ConversionHistoryItem {
  input: string;
  output: string;
  direction: Direction;
  timestamp: number;
}

function getWordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function ConverterPage() {
  const { addToast } = useToast();

  const [input, setInput]               = useState("");
  const [output, setOutput]             = useState("");
  const [direction, setDirection]       = useState<Direction>("cyrillic-to-latin");
  const [realTime, setRealTime]         = useState(false);
  const [history, setHistory]           = useState<ConversionHistoryItem[]>([]);
  const [fileName, setFileName]         = useState("");
  const [showHistory, setShowHistory]   = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [copied, setCopied]             = useState(false);

  const outputRef = useRef<HTMLTextAreaElement>(null);

  /* ── Persist input ── */
  useEffect(() => {
    const saved = getFromLocalStorage("converter-input");
    if (saved) setInput(saved);
  }, []);

  useEffect(() => {
    saveToLocalStorage("converter-input", input);
  }, [input]);

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
      setHistory((prev) =>
        [{ input: inp, output: out, direction: dir, timestamp: Date.now() }, ...prev].slice(0, 15),
      );
    },
    [],
  );

  /* ── Real-time debounced ── */
  const debouncedConvert = useCallback(
    debounce((text: string, dir: Direction) => {
      const result = convert(text, dir);
      setOutput(result);
      if (result) addToHistory(text, result, dir);
    }, 300),
    [convert, addToHistory],
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    if (realTime && value.trim()) {
      debouncedConvert(value, direction);
    } else if (!value.trim()) {
      setOutput("");
    }
  };

  /* ── Manual convert ── */
  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      addToast("Iltimos, matn kiriting", "info");
      return;
    }
    const result = convert(input, direction);
    setOutput(result);
    addToHistory(input, result, direction);
    addToast(
      direction === "cyrillic-to-latin"
        ? "Kirildan Lotinga o'zgartirildi"
        : "Lotindan Kirilga o'zgartirildi",
      "success",
      2000,
    );
  }, [input, direction, convert, addToHistory, addToast]);

  /* ── Swap direction ── */
  const handleSwap = () => {
    const newDir: Direction =
      direction === "cyrillic-to-latin" ? "latin-to-cyrillic" : "cyrillic-to-latin";
    setDirection(newDir);
    // Also swap text content
    const newInput = output;
    const newOutput = input;
    setInput(newInput);
    setOutput(newOutput);
    addToast("Yo'nalish almashtirildi", "info", 1500);
  };

  /* ── Auto-detect & convert ── */
  const handleAutoConvert = useCallback(() => {
    if (!input.trim()) {
      addToast("Iltimos, matn kiriting", "info");
      return;
    }
    const detectedDir: Direction = isCyrillic(input)
      ? "cyrillic-to-latin"
      : "latin-to-cyrillic";
    setDirection(detectedDir);
    const result = autoConvert(input);
    setOutput(result);
    addToHistory(input, result, detectedDir);
    addToast("Avtomatik aniqlandi va o'zgartirildi", "success", 2000);
  }, [input, addToHistory, addToast]);

  /* ── Copy ── */
  const handleCopy = async () => {
    if (!output.trim()) {
      addToast("Nusxalash uchun matn yo'q", "info");
      return;
    }
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      addToast("Nusxa olindi", "success", 2000);
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast("Ko'chirishda xato", "error");
    }
  };

  /* ── Download ── */
  const handleDownload = () => {
    if (!output.trim()) {
      addToast("Yuklab olish uchun matn yo'q", "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${base}_converted.txt`);
    addToast("Fayl yuklab olindi", "success", 2000);
  };

  /* ── Clear ── */
  const handleClear = () => {
    setInput("");
    setOutput("");
    setFileName("");
    addToast("Tozalandi", "info", 1500);
  };

  /* ── File ── */
  const handleFileSelected = (text: string, name: string) => {
    setInput(text);
    setFileName(name);
    addToast(`"${name}" yuklandi`, "success", 2500);
    if (realTime) {
      const result = convert(text, direction);
      setOutput(result);
    }
  };

  const handleFileClear = () => {
    setFileName("");
  };

  /* ── History click ── */
  const handleHistoryClick = (item: ConversionHistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    setDirection(item.direction);
    addToast("Tarix yuklandi", "success", 1500);
  };

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      }
      if (mod && e.shiftKey && e.key === "C") {
        e.preventDefault();
        handleCopy();
      }
      if (mod && e.key === "k") {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleConvert]);

  /* ── Stats ── */
  const inputCharCount  = getCharacterCount(input);
  const outputCharCount = getCharacterCount(output);
  const inputWordCount  = getWordCount(input);
  const outputWordCount = getWordCount(output);

  const dirLabel =
    direction === "cyrillic-to-latin" ? "Kiril → Lotin" : "Lotin → Kiril";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero Header ── */}
      <header className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase">
              <Zap size={12} />
              O'zbek yozuvi konvertori
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Kiril{" "}
              <span className="text-gradient">↔</span>{" "}
              Lotin
            </h1>
            <p className="max-w-xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              O'zbek matni va fayllarni ikki yozuv o'rtasida bir zumda konvertatsiya qiling.
              Matn kiriting yoki fayl yuklang — natijani darhol ko'ring.
            </p>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* ── File Uploader ── */}
        <FileUploader
          onFileSelected={handleFileSelected}
          onFileClear={handleFileClear}
          currentFileName={fileName}
        />

        {/* ── Direction + Real-time row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
          p-4 card">
          {/* Direction selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Yo'nalish:
            </span>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-sm font-medium">
              {(["cyrillic-to-latin", "latin-to-cyrillic"] as Direction[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`px-3 py-1.5 transition-colors ${
                    direction === d
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {d === "cyrillic-to-latin" ? "Kiril → Lotin" : "Lotin → Kiril"}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time toggle */}
          <ToggleSwitch
            checked={realTime}
            onChange={setRealTime}
            label="Real vaqtda"
            description="Yozganingizda avtomatik konvertatsiya"
          />
        </div>

        {/* ── Text Areas ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="card p-4">
            <TextArea
              label="Kirish matni"
              badge={direction === "cyrillic-to-latin" ? "Kiril" : "Lotin"}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                direction === "cyrillic-to-latin"
                  ? "Kiril matnini kiriting..."
                  : "Lotin matnini kiriting..."
              }
              characterCount={inputCharCount}
              wordCount={inputWordCount}
            />
          </div>

          {/* Swap button (center, visible on lg) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center" style={{ marginTop: "calc(4rem + 16px)" }}>
          </div>

          {/* Output */}
          <div className="card p-4">
            <TextArea
              label="Chiqish matni"
              badge={direction === "cyrillic-to-latin" ? "Lotin" : "Kiril"}
              value={output}
              readOnly
              placeholder="Konvertatsiya natijasi shu yerda ko'rinadi..."
              characterCount={outputCharCount}
              wordCount={outputWordCount}
            />
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap gap-3">
          {/* Convert */}
          <Button
            onClick={handleConvert}
            variant="primary"
            size="md"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-w-[140px]"
          >
            <Zap size={16} />
            {dirLabel}
          </Button>

          {/* Auto-detect */}
          <Button
            onClick={handleAutoConvert}
            variant="secondary"
            size="md"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
          >
            <ArrowLeftRight size={16} />
            Avtomatik
          </Button>

          {/* Swap */}
          <Button
            onClick={handleSwap}
            variant="secondary"
            size="md"
            className="inline-flex items-center justify-center gap-2"
            title="Kirish va chiqishni almashtirish"
          >
            <ArrowLeftRight size={16} />
            Almashtirish
          </Button>

          <div className="flex-1 hidden sm:block" />

          {/* Copy */}
          <Button
            onClick={handleCopy}
            variant="success"
            size="md"
            className="inline-flex items-center justify-center gap-2"
          >
            {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
            {copied ? "Nusxalandi!" : "Nusxalash"}
          </Button>

          {/* Download */}
          <Button
            onClick={handleDownload}
            variant="success"
            size="md"
            className="inline-flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Yuklab olish
          </Button>

          {/* Clear */}
          <Button
            onClick={handleClear}
            variant="danger"
            size="md"
            className="inline-flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Tozalash
          </Button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Kirish belgilari", value: inputCharCount.toLocaleString() },
            { label: "Kirish so'zlari",  value: inputWordCount.toLocaleString() },
            { label: "Chiqish belgilari", value: outputCharCount.toLocaleString() },
            { label: "Chiqish so'zlari",  value: outputWordCount.toLocaleString() },
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
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <History size={16} />
                So'nggi konvertatsiyalar
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
                  {history.length}
                </span>
              </div>
              {showHistory ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>

            {showHistory && (
              <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-800 max-h-72 overflow-y-auto">
                {history.map((item) => (
                  <button
                    key={item.timestamp}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full text-left px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                        {item.direction === "cyrillic-to-latin" ? "Kiril → Lotin" : "Lotin → Kiril"}
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

        {/* ── Keyboard Shortcuts ── */}
        <div className="card overflow-hidden">
          <button
            onClick={() => setShowShortcuts((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Keyboard size={16} />
              Klaviatura yorliqlari
            </div>
            {showShortcuts ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>

          {showShortcuts && (
            <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { keys: "Ctrl + Enter", desc: "Konvertatsiya qilish" },
                  { keys: "Ctrl + Shift + C", desc: "Natijani nusxalash" },
                  { keys: "Ctrl + K", desc: "Hammasini tozalash" },
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

      {/* ── Footer ── */}
      <footer className="mt-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>© 2025 Kiril ↔ Lotin Konvertor</span>
          <span>O'zbek yozuvi · MIT Litsenziya</span>
        </div>
      </footer>
    </div>
  );
}
