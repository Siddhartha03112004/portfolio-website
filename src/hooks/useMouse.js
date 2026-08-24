import { useContext } from "react";
import { MouseContext } from "../context/MouseProvider";

export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error("useMouse must be used within a MouseProvider");
  return ctx;
}
