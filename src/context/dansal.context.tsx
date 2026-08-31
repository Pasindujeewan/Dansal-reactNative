import type { dansalShort } from "@/types/dansalType";
import { createContext, ReactNode, useState } from "react";
import { useRef } from "react";
import { Region } from "react-native-maps";
import { getDansal, SyncedMapTile } from "@/api/getDansal";

type dansalContextType = {
  searchDansal: dansalShort[];
  allDansal: dansalShort[];
  mode: "search" | "all";
  setSearchDansal: React.Dispatch<React.SetStateAction<dansalShort[]>>;
  setAllDansal: React.Dispatch<React.SetStateAction<dansalShort[]>>;
  setMode: React.Dispatch<React.SetStateAction<"search" | "all">>;
  fetchDansal: (region: Region) => void;
};
export const DansalContext = createContext<dansalContextType | null>(null);
export function DansalContexProvider({ children }: { children: ReactNode }) {
  const [searchDansal, setSearchDansal] = useState<dansalShort[]>([]);
  const [allDansal, setAllDansal] = useState<dansalShort[]>([]);
  const [mode, setMode] = useState<"search" | "all">("all");

  const lastRegionRef = useRef<Region | null>(null);
  const tileSyncRef = useRef<Record<string, string>>({});

  async function fetchDansal(region: Region) {
    try {
      if (!lastRegionRef.current) {
        lastRegionRef.current = region;
        const res = await getDansal(region, tileSyncRef.current);
        saveSyncedTiles(res.syncedTiles);
        setAllDansal(res.dansals);
        console.log("Fetched dansals:", res.dansals);
        return;
      }
      const latDiff = Math.abs(
        region.latitude - lastRegionRef.current.latitude,
      );

      const lngDiff = Math.abs(
        region.longitude - lastRegionRef.current.longitude,
      );
      const latDeltaDiff = Math.abs(
        region.latitudeDelta - lastRegionRef.current.latitudeDelta,
      );
      const lngDeltaDiff = Math.abs(
        region.longitudeDelta - lastRegionRef.current.longitudeDelta,
      );

      if (
        latDiff > 0.01 ||
        lngDiff > 0.01 ||
        latDeltaDiff > 0.01 ||
        lngDeltaDiff > 0.01
      ) {
        lastRegionRef.current = region;
        const res = await getDansal(region, tileSyncRef.current);
        saveSyncedTiles(res.syncedTiles);
        setAllDansal((currentDansal) =>
          mergeDansalMarkers(currentDansal, res.dansals),
        );
      }
    } catch (error) {
      console.error("Error fetching dansals:", error);
    }

    function saveSyncedTiles(syncedTiles: SyncedMapTile[] = []) {
      syncedTiles.forEach(({ tileKey, syncedAt }) => {
        tileSyncRef.current[tileKey] = syncedAt;
      });
    }
    function mergeDansalMarkers(
      currentMarkers: dansalShort[],
      newMarkers: dansalShort[],
    ) {
      const markersById = new Map(
        currentMarkers.map((marker) => [marker.id, marker]),
      );

      newMarkers.forEach((marker) => {
        markersById.set(marker.id, marker);
      });

      return Array.from(markersById.values());
    }
  }

  return (
    <DansalContext.Provider
      value={{
        searchDansal,
        setSearchDansal,
        allDansal,
        setAllDansal,
        mode,
        setMode,
        fetchDansal,
      }}
    >
      {children}
    </DansalContext.Provider>
  );
}
