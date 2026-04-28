"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, FileText, X } from "lucide-react";
import { Button } from "./Button";
import {
  isValidFileType,
  isValidFileSize,
  extractTextFromTxt,
  extractTextFromDocx,
} from "@/lib/utils";

interface FileUploaderProps {
  onFileSelected: (text: string, filename: string) => void;
  onFileClear?: () => void;
  loading?: boolean;
  currentFileName?: string;
}

export function FileUploader({
  onFileSelected,
  onFileClear,
  loading = false,
  currentFileName,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setIsProcessing(true);

    try {
      if (!isValidFileType(file)) {
        setError(".txt yoki .docx faylini yuklang");
        return;
      }

      if (!isValidFileSize(file)) {
        setError("Fayl hajmi 5MB dan kam bo'lishi kerak");
        return;
      }

      let text: string;
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        text = await extractTextFromTxt(file);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
      ) {
        text = await extractTextFromDocx(file);
      } else {
        setError("Noma'lum fayl turi");
        return;
      }

      if (!text.trim()) {
        setError("Fayl bo'sh yoki o'qib bo'lmadi");
        return;
      }

      onFileSelected(text, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Faylni o'qishda xatolik yuz berdi");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(fakeEvent);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.docx"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading || isProcessing}
      />

      {currentFileName ? (
        <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
          <FileText size={18} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300 flex-1 truncate">
            {currentFileName}
          </span>
          <button
            onClick={() => {
              onFileClear?.();
              setError("");
            }}
            className="text-primary-400 hover:text-primary-600 dark:hover:text-primary-200 transition-colors flex-shrink-0"
            aria-label="Faylni olib tashlash"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-colors cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex items-center justify-center gap-3">
            {isProcessing ? (
              <Loader2 size={18} className="animate-spin text-primary-500" />
            ) : (
              <Upload size={18} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {isProcessing
                ? "Yuklanmoqda..."
                : "Fayl yuklash yoki bu yerga tashlang (.txt, .docx · max 5MB)"}
            </span>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
