"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

export type Language = "chinese" | "english";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const DEFAULT_LANGUAGE: Language = "chinese";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const userLocale = navigator.language;
    if (userLocale.startsWith("zh")) {
      setLanguage("chinese");
    } else if (userLocale.startsWith("en")) {
      setLanguage("english");
    } else {
      setLanguage(DEFAULT_LANGUAGE);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
