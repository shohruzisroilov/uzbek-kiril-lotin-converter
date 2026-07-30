"use client";

import { useEffect, useState } from "react";
import { WifiOff, Download, X, Smartphone } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useToast } from "./ToastContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PWAHandler() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [isOffline, setIsOffline] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // 1. Initial network status check
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
    }

    // 2. Service Worker registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("ServiceWorker registered successfully with scope:", registration.scope);
        })
        .catch((error) => {
          console.warn("ServiceWorker registration failed:", error);
        });
    }

    // 3. Online/Offline Event Listeners
    const handleOnline = () => {
      setIsOffline(false);
      addToast(t("onlineToast"), "success", 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      addToast(t("offlineToast"), "info", 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 4. PWA Installation Prompt Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      const isDismissed = sessionStorage.getItem("pwa-install-dismissed");
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [addToast, t]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setShowInstallBanner(false);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      addToast(t("pwaInstallTitle") + " — OK!", "success");
    }
    setDeferredPrompt(null);
  };

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  return (
    <>
      {/* Offline Status Badge */}
      {isOffline && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 bg-amber-500 text-white rounded-full shadow-lg text-xs font-semibold animate-pulse transition-all">
          <WifiOff className="w-4 h-4" />
          <span>{t("pwaBadgeOffline")}</span>
        </div>
      )}

      {/* PWA Installation Banner */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold leading-snug">{t("pwaInstallTitle")}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {t("pwaInstallDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("pwaInstallBtn")}</span>
            </button>
            <button
              onClick={handleDismissBanner}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t("pwaInstallDismiss")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
