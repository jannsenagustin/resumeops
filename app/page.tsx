import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyIBuild from "../components/WhyIBuild";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero
        name="Jannsen Agustin"
        title="Splunk Administrator • Developer • Architect"
        email="jannsenagustin.can@gmail.com"
      />
      <WhyIBuild />
      <Projects />
    </main>
  );
}
