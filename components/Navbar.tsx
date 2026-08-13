const navigationItems = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const linkClasses =
  "motion-nav-link rounded-sm hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Navbar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="site-header sticky top-0 z-50 border-b border-white/10 bg-black"
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <a
          href="#overview"
          className={`site-wordmark shrink-0 text-base font-semibold tracking-tight text-white ${linkClasses}`}
        >
          RESUMEOPS <span>/ J.A.</span>
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
        <Link href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false} download className="site-resume-link hidden shrink-0 text-xs font-semibold sm:inline-flex">RESUME ↓</Link>
      </div>
    </nav>
  );
}
import Link from "next/link";
