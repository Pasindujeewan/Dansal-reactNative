import type { dansalShort } from "@/types/dansalType";
import { createContext, ReactNode, useState } from "react";

type dansalContextType = {
  searchDansal: dansalShort[];
  allDansal: dansalShort[];
  mode: "search" | "all";
  setSearchDansal: React.Dispatch<React.SetStateAction<dansalShort[]>>;
  setAllDansal: React.Dispatch<React.SetStateAction<dansalShort[]>>;
  setMode: React.Dispatch<React.SetStateAction<"search" | "all">>;
};
export const DansalContext = createContext<dansalContextType | null>(null);
export function DansalContexProvider({ children }: { children: ReactNode }) {
  const [searchDansal, setSearchDansal] = useState<dansalShort[]>([]);
  const [allDansal, setAllDansal] = useState<dansalShort[]>([]);
  const [mode, setMode] = useState<"search" | "all">("search");
  return (
    <DansalContext.Provider
      value={{
        searchDansal,
        setSearchDansal,
        allDansal,
        setAllDansal,
        mode,
        setMode,
      }}
    >
      {children}
    </DansalContext.Provider>
  );
}
