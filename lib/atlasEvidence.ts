import { atlasEvidenceImages } from "./atlasEvidenceImages.generated";
import { parseAtlasEvidenceIndex } from "./atlasEvidenceIndex.mjs";
import type { AtlasEvidenceArtifact } from "./atlasMilestoneTypes";

export function getAtlasEvidenceArtifacts(): AtlasEvidenceArtifact[] {
  return parseAtlasEvidenceIndex().map((artifact) => {
    const image = atlasEvidenceImages[artifact.canonicalPath];
    if (!image) throw new Error(`Published evidence is missing from the static image registry: ${artifact.canonicalPath}`);
    return { ...artifact, reviewState: "Reviewed" as const, image };
  });
}
