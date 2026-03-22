"use client";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/app/(public)/features/Features";
import TestimonialSection from "@/components/Testimonial/TestimonialSection";
import ClubsSection from "@/app/(public)/clubs/ClubsSection";
import CTASection from "@/components/CTA/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialSection />
        <ClubsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
