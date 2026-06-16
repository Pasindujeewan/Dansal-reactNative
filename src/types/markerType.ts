/**
 * File: src/types/markerType.ts
 * Purpose: Type for map markers.
 */
export type MarkerType = {
  id: string;
  type: string;
  location: number[]; // longitude, latitude
};
