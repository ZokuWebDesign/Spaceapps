import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import CrawlingBanner from "@/components/sections/CrawlingBanner";
import Companies from "@/components/sections/Companies";
import AboutUs from "@/components/sections/AboutUs";
import ComoFunciona from "@/components/sections/Mission";
import FeatureImageTwo from "@/components/sections/Checklist";
import CTA from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/Team";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(111deg, #363279 18.46%, #15153D 83.59%)'}}>
      <Header />
      <Hero />
      <CrawlingBanner />
      <Companies />
      <AboutUs />
      <ComoFunciona />
      <FeatureImageTwo />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
