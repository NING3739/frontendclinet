import { useContext } from "react";
import { LanguageContext } from "@/app/contexts/LanguageContext";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage 必须在 LanguageProvider 中使用");
  }
  return context;
};
