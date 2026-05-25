"use client";

import React, { createContext, useContext, useCallback, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: ToastAction;
}

export interface AddToastOptions {
  duration?: number;
  action?: ToastAction;
}

interface ToastContextType {
  addToast: (
    message: string,
    type?: ToastType,
    durationOrOptions?: number | AddToastOptions,
  ) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (
      message: string,
      type: ToastType = "info",
      durationOrOptions: number | AddToastOptions = 3000,
    ) => {
      const opts: AddToastOptions =
        typeof durationOrOptions === "number"
          ? { duration: durationOrOptions }
          : durationOrOptions;
      const duration = opts.duration ?? 3000;
      const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
      const newToast: Toast = { id, message, type, duration, action: opts.action };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
