const navigationItems = [
  { label: "Home", href: "#overview" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const linkClasses =
  "rounded-sm transition-colors hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Navbar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <a
          href="#overview"
          className={`shrink-0 text-xl font-bold tracking-tight text-green-400 ${linkClasses}`}
        >
          ResumeOps
        </a>
        <ul className="flex min-w-0 items-center gap-3 overflow-x-auto text-xs text-gray-400 [scrollbar-width:none] sm:gap-6 sm:text-sm [&::-webkit-scrollbar]:hidden">
          {navigationItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a href={item.href} className={linkClasses}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
