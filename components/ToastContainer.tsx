"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useToast } from "./ToastContext";
import type { Toast } from "./ToastContext";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [visible, setVisible] = useState<Toast[]>([]);
  const exitingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setVisible((prev) => {
      const incomingIds = new Set(toasts.map((t) => t.id));
      const merged = [...toasts];
      prev.forEach((p) => {
        if (!incomingIds.has(p.id)) {
          exitingRef.current.add(p.id);
          merged.push(p);
        }
      });
      return merged;
    });
  }, [toasts]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {visible.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          isExiting={exitingRef.current.has(toast.id)}
          onClosed={() => {
            exitingRef.current.delete(toast.id);
            setVisible((prev) => prev.filter((t) => t.id !== toast.id));
            removeToast(toast.id);
          }}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  isExiting,
  onClosed,
}: {
  toast: Toast;
  isExiting: boolean;
  onClosed: () => void;
}) {
  const [state, setState] = useState<"open" | "closed">(isExiting ? "closed" : "open");

  useEffect(() => {
    if (isExiting) setState("closed");
  }, [isExiting]);

  const stripe =
    toast.type === "success"
      ? "border-l-emerald-500"
      : toast.type === "error"
      ? "border-l-red-500"
      : "border-l-primary-600";

  return (
    <div
      data-state={state}
      onTransitionEnd={(e) => {
        if (state === "closed" && e.propertyName === "opacity") onClosed();
      }}
      className={`toast pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-md text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 border-l-2 ${stripe}`}
    >
      <span className="flex-1 leading-snug">{toast.message}</span>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            setState("closed");
          }}
          className="flex-shrink-0 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline-offset-2 hover:underline px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {toast.action.label}
        </button>
      )}
      <button
        onClick={() => setState("closed")}
        className="flex-shrink-0 opacity-50 hover:opacity-100 active:scale-90 mt-0.5"
        style={{
          transition:
            "opacity 140ms var(--ease-out-strong), transform 140ms var(--ease-out-strong)",
        }}
        aria-label="Yopish"
      >
        <X size={14} />
      </button>
    </div>
  );
}
