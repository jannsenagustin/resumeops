import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import EnterpriseExperience from "../components/EnterpriseExperience";
import Skills from "../components/Skills";
import CareerJourney from "../components/CareerJourney";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main id="overview" className="min-h-screen scroll-mt-24 bg-black text-white">
      <Navbar />
      <Hero />
      <Projects />
      <EnterpriseExperience />
      <Skills />
      <CareerJourney />
      <Contact />
    </main>
  );
}
