import Navbar from "../components/Navbar";
import ResumeOpsHome from "../components/ResumeOpsHome";
import HomeEngineeringRecord from "../components/HomeEngineeringRecord";

export default function Home() {
  return (
    <main id="overview" className="min-h-screen scroll-mt-24 bg-black text-white">
      <Navbar />
      <ResumeOpsHome />
      <HomeEngineeringRecord />
    </main>
  );
}
