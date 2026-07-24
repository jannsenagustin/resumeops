import Link from "next/link";
import { currentlyBuildingItems } from "../data/currentlyBuilding";
import { heroContent } from "../data/hero";
import StatusBadge from "./StatusBadge";

const actionClasses =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Hero() {
  const currentProject = currentlyBuildingItems.find(
    (item) => item.id === heroContent.currentProject.projectId,
  );
  const nextFocus = currentlyBuildingItems.find(
    (item) => item.id === heroContent.currentProject.nextFocusId,
  );

  if (!currentProject || !nextFocus) {
    throw new Error("Hero roadmap references must match currentlyBuildingItems.");
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-black px-6 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-start lg:gap-14">
          <div className="max-w-3xl">
            <StatusBadge status="active" label={heroContent.status} />

            <h1
              id="hero-heading"
              className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl"
            >
              {heroContent.name}
            </h1>

            <p className="mt-6 text-xl font-semibold text-green-300 sm:text-2xl">
              {heroContent.primaryIdentity}
            </p>
            <p
              className="mt-3 text-base text-gray-400 sm:text-lg"
              aria-label={heroContent.capabilities.join(", ")}
            >
              {heroContent.capabilities.join(" • ")}
            </p>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              <span className="block font-semibold text-white">
                {heroContent.tagline}
              </span>
              <span className="mt-3 block">{heroContent.summary}</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#case-studies"
                className={`${actionClasses} border-green-400/40 bg-green-400/10 text-green-300 transition-colors hover:border-green-400 hover:bg-green-400/15`}
              >
                Explore Case Studies
              </Link>
              <button
                type="button"
                disabled
                aria-describedby="resume-unavailable"
                className={`${actionClasses} cursor-not-allowed border-white/10 text-gray-500`}
              >
                Download Résumé
              </button>
              <span id="resume-unavailable" className="sr-only">
                A downloadable résumé is not available yet.
              </span>
            </div>
          </div>

          <aside
            aria-labelledby="hero-currently-building"
            className="rounded-2xl border border-green-400/25 bg-zinc-950 p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
              Currently Building
            </p>
            <h2
              id="hero-currently-building"
              className="mt-4 text-2xl font-bold tracking-tight text-white"
            >
              {currentProject.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              {heroContent.currentProject.description}
            </p>

            <dl className="mt-7 space-y-5 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <dt className="text-sm text-gray-500">Roadmap status</dt>
                <dd>
                  <StatusBadge
                    status="planned"
                    label={currentProject.status}
                  />
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Next planned focus</dt>
                <dd className="mt-2 font-semibold text-gray-200">
                  {nextFocus.title}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
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
