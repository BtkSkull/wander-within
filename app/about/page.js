import AboutHero from "@/components/about/AboutHero";
import Therapist from "@/components/about/Therapist";
import OurStory from "@/components/about/OurStory";
import Qualifications from "@/components/about/Qualifications";
import TherapyApproach from "@/components/about/TherapyApproach";
import WhoWeHelp from "@/components/about/WhoWeHelp";
import WhyChoose from "@/components/about/WhyChoose";
import CoreValues from "@/components/about/CoreValues";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Therapist />
      <OurStory />
      <Qualifications />
      <TherapyApproach />
      <WhoWeHelp />
      <WhyChoose />
      <CoreValues />
      <AboutFAQ />
      <AboutCTA />
    </>
  );
}