import SectionHeader from "./SectionHeader";

export default function Contact() {
  const linkClasses =
    "rounded-md border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400";

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s talk observability"
          description="For roles and conversations involving Splunk, observability, platform operations, or data engineering, connect with me through GitHub or LinkedIn."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://www.linkedin.com/in/jannsen-agustin/" target="_blank" rel="noopener noreferrer" className={`${linkClasses} border-green-400/30 text-green-300 hover:border-green-400 hover:bg-green-400/10`}>
            LinkedIn
          </a>
          <a href="https://github.com/jannsenagustin" target="_blank" rel="noopener noreferrer" className={`${linkClasses} border-white/15 text-gray-300 hover:border-green-400/60 hover:text-green-300`}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
