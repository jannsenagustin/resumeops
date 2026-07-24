import { careerJourney } from "../data/experience";
import SectionHeader from "./SectionHeader";

export default function CareerJourney() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 bg-black px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Engineering journey"
          title="Career Journey"
          description="A focused account of enterprise experience, relocation, resilience, and continued technical growth."
        />

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {careerJourney.map((item, index) => (
            <li
              key={item.id}
              className="rounded-xl border border-white/10 bg-zinc-950 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-green-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                  {item.context}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
