"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  ArrowLeftRight,
  CheckCheck,
} from "lucide-react";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { FileUploader } from "@/components/FileUploader";
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Кирил <span className="text-gradient">↔</span> Лотин
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
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

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSwap}
            variant="secondary"
            size="md"
            className="inline-flex items-center justify-center gap-2"
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
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
          >
            {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
            {copied ? "Нусхаланди" : "Нусхалаш"}
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
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>© {year} Кирил ↔ Лотин Конвертор. Барча ҳуқуқлар ҳимояланган.</span>
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
