"use client";

import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast } from "./ToastContext";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            animate-slide-in
            pointer-events-auto
            flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
            border
            ${
              toast.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800"
                : toast.type === "error"
                ? "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800"
                : "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
            }
          `}
        >
          <span className="flex-shrink-0 mt-0.5">
            {toast.type === "success" && <CheckCircle2 size={16} className="text-emerald-500" />}
            {toast.type === "error"   && <XCircle      size={16} className="text-red-500" />}
            {toast.type === "info"    && <Info         size={16} className="text-blue-500" />}
          </span>
          <span className="flex-1 leading-snug">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
            aria-label="Yopish"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
