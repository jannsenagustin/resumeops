import { currentlyBuildingItems } from "../data/currentlyBuilding";
import SectionHeader from "./SectionHeader";
import StatusBadge from "./StatusBadge";
import TechBadge from "./TechBadge";

export default function CurrentlyBuilding() {
  return (
    <section
      id="building"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Planned engineering work"
          title="Currently Building"
          description="A transparent roadmap of Splunk engineering labs and case studies that are being planned, researched, or designed."
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {currentlyBuildingItems.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-white/10 bg-black p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <StatusBadge status="planned" label={item.status} />
              </div>
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label={`${item.title} technologies`}
              >
                {item.technologies.map((technology) => (
                  <li key={technology}>
                    <TechBadge technology={technology} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
