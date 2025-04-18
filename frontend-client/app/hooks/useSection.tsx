import { useContext } from "react";
import { SectionContext } from "@/app/contexts/SectionContext";

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};
