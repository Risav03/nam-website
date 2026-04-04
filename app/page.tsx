import Navbar from "./components/Navbar";

import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Tokenomics from "./components/Tokenomics";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <Features /> */}
        <HowItWorks />
        <Tokenomics />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
