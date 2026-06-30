import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyCoach } from "@/components/sections/WhyCoach";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { StatsShowcase } from "@/components/sections/StatsShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyCoach />
      <ServicesOverview />
      <StatsShowcase />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
