export type ArchitectureNode = {
  label: string;
  planned?: boolean;
  children?: ArchitectureNode[];
};

type ArchitectureDiagramProps = {
  title: string;
  root: ArchitectureNode;
};

function DiagramBranch({ nodes }: { nodes: ArchitectureNode[] }) {
  return (
    <ul className="ml-4 space-y-3 border-l border-white/15 pl-4 sm:ml-6 sm:pl-6">
      {nodes.map((node) => (
        <li key={node.label}>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-black px-4 py-3">
            <span className="font-mono text-sm text-gray-200">{node.label}</span>
            {node.planned && (
              <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-0.5 text-xs text-slate-300">
                Planned
              </span>
            )}
          </div>
          {node.children && (
            <div className="mt-3">
              <DiagramBranch nodes={node.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ArchitectureDiagram({
  title,
  root,
}: ArchitectureDiagramProps) {
  return (
    <figure className="rounded-xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
      <figcaption className="mb-5 text-sm font-semibold text-white">
        {title}
      </figcaption>
      <div className="rounded-lg border border-green-400/30 bg-green-400/5 px-4 py-3 font-mono text-sm font-semibold text-green-300">
        {root.label}
      </div>
      {root.children && (
        <div className="mt-3">
          <DiagramBranch nodes={root.children} />
        </div>
      )}
    </figure>
  );
}
