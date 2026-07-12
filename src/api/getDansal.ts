import { Region } from "react-native-maps";
import { apiFetch } from "./apiFetch";
import type { dansalShort } from "@/types/dansalType";

const MAP_TILE_SIZE_DEGREES = 0.02;

type TileSyncMap = Record<string, string>;

export type SyncedMapTile = {
  tileKey: string;
  syncedAt: string;
};

type GetDansalResponse = {
  dansals: dansalShort[];
  syncedTiles: SyncedMapTile[];
};

function getTileIndex(longitude: number, latitude: number) {
  const x = Math.floor((longitude + 180) / MAP_TILE_SIZE_DEGREES);
  const y = Math.floor((latitude + 90) / MAP_TILE_SIZE_DEGREES);

  return { x, y };
}

function getVisibleTileKeys(region: Region) {
  const north = region.latitude + region.latitudeDelta / 2;
  const south = region.latitude - region.latitudeDelta / 2;
  const east = region.longitude + region.longitudeDelta / 2;
  const west = region.longitude - region.longitudeDelta / 2;
  const southWestTile = getTileIndex(west, south);
  const northEastTile = getTileIndex(east, north);
  const tileKeys: string[] = [];

  for (let x = southWestTile.x; x <= northEastTile.x; x += 1) {
    for (let y = southWestTile.y; y <= northEastTile.y; y += 1) {
      tileKeys.push(`${x}:${y}`);
    }
  }

  return tileKeys;
}

export async function getDansal(
  region: Region,
  tileSyncMap: TileSyncMap = {},
): Promise<GetDansalResponse> {
  const visibleTileKeys = getVisibleTileKeys(region);
  const north = region.latitude + region.latitudeDelta / 2;
  const south = region.latitude - region.latitudeDelta / 2;
  const east = region.longitude + region.longitudeDelta / 2;
  const west = region.longitude - region.longitudeDelta / 2;

  const searchParams = new URLSearchParams({
    north: north.toString(),
    south: south.toString(),
    east: east.toString(),
    west: west.toString(),
  });

  if (visibleTileKeys.length > 0) {
    searchParams.set("tiles", visibleTileKeys.join(","));
  }

  const syncedVisibleTiles = visibleTileKeys.filter(
    (tileKey) => tileSyncMap[tileKey],
  );

  if (syncedVisibleTiles.length > 0) {
    searchParams.set(
      "tileSync",
      syncedVisibleTiles
        .map((tileKey) => `${tileKey}|${tileSyncMap[tileKey]}`)
        .join(","),
    );
  }

  try {
    const res = await apiFetch(
      `http://10.0.2.2:3000/api/dansals/get?${searchParams.toString()}`,
    );
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch dansals");
    }
    return data.data as GetDansalResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error occur when get dansal", error.message);
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
