import type { Metadata } from "next";
import AtlasProjectExplorer from "../../../components/AtlasProjectExplorer";
import AtlasEvidenceBrowser from "../../../components/AtlasEvidenceBrowser";
import { getAtlasProjectState } from "../../../lib/atlasProjectState";

export const metadata: Metadata = {
  title: "Engineering Record",
  description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  openGraph: {
    title: "Engineering Record | Project Atlas",
    description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  },
  twitter: {
    title: "Engineering Record | Project Atlas",
    description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  },
};

export default function AtlasProjectPage() {
  const projectState = getAtlasProjectState();
  const evidence = <AtlasEvidenceBrowser artifacts={projectState.evidenceArtifacts} currentMilestone={projectState.currentMilestone.id} milestones={projectState.milestones} />;
  return <AtlasProjectExplorer projectState={projectState} evidence={evidence} />;
}
