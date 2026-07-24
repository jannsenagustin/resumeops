export default function WhyIBuild() {
  return (
    <section
      aria-labelledby="why-i-build-heading"
      className="border-y border-green-400/20 bg-zinc-950 px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 h-px w-12 bg-green-400" />

        <h2
          id="why-i-build-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Why I Build
        </h2>

        <div className="mt-8 space-y-6 text-base leading-8 text-gray-300 sm:text-lg">
          <p>
            I enjoy turning complex systems into something observable,
            understandable, and reliable. Whether I&apos;m building Splunk
            dashboards, designing detections, documenting a home lab, or
            developing ResumeOps, my goal is to solve practical problems and
            make the work easier for others to understand.
          </p>

          <p>
            For me, engineering is more than writing code. It&apos;s about
            understanding how systems work, documenting decisions, learning
            continuously, and building solutions that can be maintained and
            improved over time.
          </p>
        </div>
      </div>
    </section>
  );
}
