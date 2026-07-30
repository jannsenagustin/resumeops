export type ProjectNavItem = {
  label: string;
  href: `#${string}`;
};

type ProjectNavProps = {
  items: ProjectNavItem[];
};

export default function ProjectNav({ items }: ProjectNavProps) {
  return (
    <nav aria-label="Project sections">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        On this page
      </p>
      <ol className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item, index) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="flex rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-green-400/40 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              <span className="mr-2 text-gray-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
