"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { sectionService } from "@/app/services/sectionService";
import type { Section } from "@/app/types/sectionType";

interface SectionContextType {
  sections: Section[];
  loading: boolean;
  error: string | null;
  refreshSections: () => Promise<void>;
}

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined
);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSections = async () => {
    setLoading(true);
    try {
      const response = await sectionService.sectionLists();
      setSections(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSections();
  }, []);

  return (
    <SectionContext.Provider
      value={{ sections, loading, error, refreshSections }}
    >
      {children}
    </SectionContext.Provider>
  );
};
