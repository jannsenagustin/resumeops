export type ParsedAtlasEvidenceArtifact = {
  id: string;
  filename: string;
  canonicalPath: string;
  relativePath: string;
  milestone: string;
  batch: string;
  atlTask: string;
  shortDescription: string;
  validationPurpose: string;
  reviewState: "Reviewed";
  component: string;
  sequence: number;
  order: number;
};

export function parseAtlasEvidenceIndex(root?: string): ParsedAtlasEvidenceArtifact[];
