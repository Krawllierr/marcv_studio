import Hero from "@/components/Hero";
import ProofSocial from "@/components/ProofSocial";
import BentoGrid from "@/components/BentoGrid";
import WhatIs from "@/components/WhatIs";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhoIsFor from "@/components/WhoIsFor";
import Packages from "@/components/Packages";
import Cases from "@/components/Cases";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofSocial />
      <BentoGrid />
      <WhatIs />
      <HowItWorks />
      <Features />
      <WhoIsFor />
      <Packages />
      <Cases />
      <FAQ />
      <LeadForm />
    </>
  );
}
