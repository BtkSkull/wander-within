import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import SupportAreas from "@/components/home/SupportAreas";
import Testimonials from "@/components/home/Testimonials";
import TherapistPreview from "@/components/home/TherapistPreview";
import WhyChoose from "@/components/home/WhyChoose";
import CTASection from "@/components/home/CTASection";
import HowTherapyWorks from "@/components/home/HowTherapyWorks";


export default function Home(){

return(

<main>

<Hero />

<TherapistPreview />

<Services />

<SupportAreas />

<HowTherapyWorks />

<WhyChoose />

<Testimonials />

<CTASection />

</main>

)

}