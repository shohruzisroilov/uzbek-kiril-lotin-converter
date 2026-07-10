"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, FileText, X, Download, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import {
  isValidFileType,
  isValidFileSize,
  extractTextFromTxt,
  extractTextFromDocx,
} from "@/lib/utils";

interface FileUploaderProps {
  onFileSelected: (text: string, file: File) => void;
  onFileClear?: () => void;
  onDownload?: () => void;
  loading?: boolean;
  currentFileName?: string;
  converting?: boolean;
  ready?: boolean;
  directionLabel?: string;
}

export function FileUploader({
  onFileSelected,
  onFileClear,
  onDownload,
  loading = false,
  currentFileName,
  converting = false,
  ready = false,
  directionLabel,
}: FileUploaderProps) {
  const { t } = useLanguage();
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
        setError(t("uploaderErrFormat"));
        return;
      }

      if (!isValidFileSize(file)) {
        setError(t("uploaderErrSize"));
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
        setError(t("uploaderErrUnknown"));
        return;
      }

      if (!text.trim()) {
        setError(t("uploaderErrEmpty"));
        return;
      }

      onFileSelected(text, file);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("uploaderErrRead"));
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
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300 truncate">
              {currentFileName}
            </p>
            {converting && (
              <p className="text-xs text-primary-500 dark:text-primary-400 flex items-center gap-1 mt-0.5">
                <Loader2 size={11} className="animate-spin" />
                {t("uploaderConverting")}{directionLabel ? ` (${directionLabel})` : ""}…
              </p>
            )}
            {ready && !converting && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={11} />
                {t("uploaderReady")}{directionLabel ? ` · ${directionLabel}` : ""}
              </p>
            )}
          </div>

          {ready && !converting && onDownload && (
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Download size={14} />
              {t("uploaderDownload")}
            </button>
          )}

          <button
            onClick={() => {
              onFileClear?.();
              setError("");
            }}
            className="text-primary-400 hover:text-primary-600 dark:hover:text-primary-200 transition-colors flex-shrink-0"
            aria-label={t("uploaderRemove")}
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
                ? t("uploaderProcessing")
                : t("uploaderDropzone")}
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
