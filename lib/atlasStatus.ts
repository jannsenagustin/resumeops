export type AtlasStatusTone = "validated" | "complete" | "in-progress" | "review" | "partial" | "future" | "neutral";

export function getAtlasStatusTone(value: string): AtlasStatusTone {
  const state = value.trim().toLowerCase();

  if (state === "validated" || state.includes("complete / validated")) return "validated";
  if (state === "complete") return "complete";
  if (state.includes("partially validated") || state.includes("partial")) return "partial";
  if (state === "in progress" || state === "active") return "in-progress";
  if (state === "review" || state.includes("pending review")) return "review";
  if (state === "planned" || state === "future" || state === "not validated") return "future";
  return "neutral";
}
