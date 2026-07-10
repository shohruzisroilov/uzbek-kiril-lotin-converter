"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Locale, TranslationDict, translations } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof TranslationDict) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz-cyr");

  useEffect(() => {
    const savedLocale = localStorage.getItem("converter-locale") as Locale | null;
    if (savedLocale && (savedLocale === "uz-cyr" || savedLocale === "uz-lat" || savedLocale === "ru" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("converter-locale", newLocale);
  };

  const t = (key: keyof TranslationDict): string => {
    return translations[locale][key] || translations["uz-cyr"][key] || "";
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
