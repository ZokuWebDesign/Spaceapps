
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesWithImage from "@/components/FeaturesWithImage";
import FeaturesWithCard from "@/components/FeaturesWithCard";
import FeatureImageOne from "@/components/FeatureImageOne";
import FeatureImageTwo from "@/components/FeatureImageTwo";
import ComoFunciona from "@/components/ComoFunciona";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CTA />
      <ComoFunciona />
      <FeaturesWithImage />
      <FeaturesWithCard />
      <FeatureImageOne />
      <FeatureImageTwo />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
