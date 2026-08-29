import { execFileSync } from "node:child_process";

export function getLatestCommit() {
  const environmentSha = process.env.GITHUB_SHA?.trim();
  const full = environmentSha || execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: process.cwd(),
    encoding: "utf8",
  }).trim();

  return {
    full,
    short: full.slice(0, 7),
    url: `https://github.com/jannsenagustin/resumeops/commit/${full}`,
  };
}
