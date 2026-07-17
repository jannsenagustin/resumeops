export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
     <nav className="flex w-full items-center justify-between px-8 py-5">
  <h1 className="text-xl font-bold text-green-400">
    ResumeOps
  </h1>

  <div className="flex items-center space-x-6 text-sm text-gray-400">
    <a href="#" className="transition hover:text-green-400">Overview</a>
    <a href="#" className="transition hover:text-green-400">Projects</a>
    <a href="#" className="transition hover:text-green-400">Experience</a>
    <a href="#" className="transition hover:text-green-400">Contact</a>
  </div>
</nav>
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center text-center">
        <div>
        <p className="mb-8 text-3xl text-green-400">
          I love Splunking

        </p>

        <h1 className="text-7xl font-bold text-white italic">Jannsen Agustin</h1>

        <p className="mt-9 text-xl text-gray-400">
          Splunk Administrator • Developer • Architect
        </p>
        </div>
      </div>
    </main>
  );
}