import Link from "next/link";
import { heroContent } from "../data/hero";

const actionClasses =
  "motion-button inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-black px-6 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start lg:gap-14">
          <div className="max-w-3xl">
            <h1
              id="hero-heading"
              className="hero-enter text-5xl font-bold tracking-tight text-white sm:text-6xl"
            >
              {heroContent.name}
            </h1>
            <p className="hero-enter hero-enter-delay-1 mt-6 text-xl font-semibold text-green-300 sm:text-2xl">
              {heroContent.primaryIdentity}
            </p>
            <p className="hero-enter hero-enter-delay-2 mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              <span className="block font-semibold text-white">
                {heroContent.tagline}
              </span>
              <span className="mt-3 block">{heroContent.summary}</span>
            </p>
            <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects/atlas/"
                className={`${actionClasses} border-green-400/40 bg-green-400/10 text-green-300 transition-colors hover:border-green-400 hover:bg-green-400/15`}
              >
                Explore Atlas
              </Link>
              <Link
                href="/resume/Jannsen-Agustin-Resume.pdf"
                download="Jannsen-Agustin-Resume.pdf"
                prefetch={false}
                className={`${actionClasses} border-white/15 text-gray-300 transition-colors hover:border-green-400/60 hover:text-green-300`}
              >
                Download Professional Resume
              </Link>
              <a
                href="https://github.com/jannsenagustin/resumeops"
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionClasses} border-white/15 text-gray-300 transition-colors hover:border-green-400/60 hover:text-green-300`}
              >
                View GitHub
              </a>
              <a
                href="#experience"
                className={`${actionClasses} border-white/10 text-gray-400 transition-colors hover:border-white/30 hover:text-white`}
              >
                View Experience
              </a>
            </div>
          </div>
          <aside
            aria-labelledby="hero-featured-project"
            className="motion-card motion-card-featured hero-enter hero-enter-delay-2 rounded-2xl border border-green-400/25 bg-zinc-950 p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
              Flagship Project
            </p>
            <h2
              id="hero-featured-project"
              className="mt-4 text-2xl font-bold tracking-tight text-white"
            >
              Atlas
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              A containerized Splunk lab with a validated operational Indexer.
              Search Head, Deployment Server, and distributed workflows remain
              on the roadmap.
            </p>
            <Link
              href="/projects/atlas/"
              className="motion-link mt-7 inline-flex text-sm font-semibold text-green-300 hover:text-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              See architecture and evidence →
            </Link>
          </aside>
        </div>
        <dl className="hero-enter hero-enter-delay-3 mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {heroContent.metadata.map((item) => (
            <div key={item.id} className="bg-zinc-950 p-5">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                {item.label}
              </dt>
              <dd className="mt-2 font-semibold text-white">{item.value}</dd>
              <dd className="mt-1 text-xs leading-5 text-gray-400">
                {item.supportingText}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
