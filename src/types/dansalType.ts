/**
 * File: src/types/dansalType.ts
 * Purpose: Type definitions for `dansal` and `dansalShort` used by the app.
 */
import type { user } from "./userType";

export type dansal = {
  id: string;
  label: string;
  value: string;
  description: string;
  createdBy: user["id"];
  queueLength: number;
  imgUrl: string;
  location: [number, number];
  updatedAt: string;
};

export type dansalShort = Pick<
  dansal,
  "id" | "label" | "value" | "location" | "updatedAt"
>;
