import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyIBuild from "../components/WhyIBuild";
import Projects from "../components/Projects";
import EnterpriseExperience from "../components/EnterpriseExperience";
import CareerJourney from "../components/CareerJourney";
import CurrentlyBuilding from "../components/CurrentlyBuilding";

export default function Home() {
  return (
    <main id="overview" className="min-h-screen scroll-mt-24 bg-black text-white">
      <Navbar />
      <Hero />
      <WhyIBuild />
      <Projects />
      <EnterpriseExperience />
      <CareerJourney />
      <CurrentlyBuilding />
    </main>
  );
}
