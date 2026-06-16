/**
 * File: src/types/dansalType.ts
 * Purpose: Type definitions for `dansal` and `dansalShort` used by the app.
 */
import type { user } from "./userType";

export type dansal = {
  id: string;
  type: string;
  description: string;
  createdBy: user["id"];
  queueLength: number;
  imgUrl: string;
  location: [number, number];
};

export type dansalShort = Pick<dansal, "id" | "type" | "location">;
