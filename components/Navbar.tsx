export default function Navbar() {
  return (
    <Navbar className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <a
          href="#overview"
          className="text-xl font-bold tracking-tight text-green-400"
        >
          ResumeOps
        </a>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#overview" className="transition-colors hover:text-green-400">
            Overview
          </a>

          <a href="#projects" className="transition-colors hover:text-green-400">
            Projects
          </a>

          <a href="#experience" className="transition-colors hover:text-green-400">
            Experience
          </a>

          <a href="#contact" className="transition-colors hover:text-green-400">
            Contact
          </a>
        </div>
      </div>
    </Navbar>
  );
}