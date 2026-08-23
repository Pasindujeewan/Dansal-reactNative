import { DansalContext } from "@/context/dansal.context";
import { useContext } from "react";

export function useDansalContext() {
  const dansalcontext = useContext(DansalContext);
  if (!dansalcontext) {
    throw new Error(
      "useDansalContext must be used within a DansalContexProvider",
    );
  }
  return dansalcontext;
}
