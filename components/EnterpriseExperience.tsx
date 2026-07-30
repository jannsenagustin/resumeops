import { enterpriseExperience } from "../data/experience";
import SectionHeader from "./SectionHeader";
import TechBadge from "./TechBadge";

export default function EnterpriseExperience() {
  const experience = enterpriseExperience;

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Production Experience"
          title="Enterprise Experience"
          description="Enterprise delivery across Splunk engineering, observability, platform operations, dashboard development, application support, cloud enablement, and technical leadership."
        />

        <article className="mt-10 rounded-2xl border border-green-400/25 bg-black p-7 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-400">
                {experience.company}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {experience.role}
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                {experience.location} · {experience.period}
              </p>
            </div>
            <p className="w-fit rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
              {experience.splunkExperienceLabel}
            </p>
          </div>
          <p className="mt-7 max-w-4xl text-base leading-8 text-gray-300 sm:text-lg">
            {experience.summary}
          </p>
        </article>

        <section className="mt-14" aria-labelledby="engineering-domains">
          <h3
            id="engineering-domains"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Engineering Domains
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {experience.engineeringDomains.map((domain) => (
              <article
                key={domain.id}
                className="rounded-xl border border-white/10 bg-black p-6"
              >
                <h4 className="text-lg font-semibold text-white">
                  {domain.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {domain.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="technical-focus">
          <h3
            id="technical-focus"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Technical Focus
          </h3>
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Technical focus areas"
          >
            {experience.technicalFocus.map((focusArea) => (
              <li key={focusArea}>
                <TechBadge technology={focusArea} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="enterprise-delivery">
          <h3
            id="enterprise-delivery"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Enterprise Delivery
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            Selected client environments supported through Accenture.
          </p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {experience.deliveryExperience.map((delivery) => (
              <li key={delivery.id}>
                <article className="h-full rounded-xl border border-white/10 bg-black p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h4 className="text-lg font-semibold text-white">
                      {delivery.organization}
                    </h4>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {delivery.region}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    {delivery.focus}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="leadership-enablement">
          <h3
            id="leadership-enablement"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Leadership and Enablement
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {experience.leadershipContributions.map((contribution) => (
              <article
                key={contribution.id}
                className="rounded-xl border border-white/10 bg-black p-6"
              >
                <h4 className="text-lg font-semibold text-white">
                  {contribution.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {contribution.description}
                </p>
              </article>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}
