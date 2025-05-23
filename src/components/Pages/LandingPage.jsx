import React from 'react';
import HeroSection from '../HeroSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      {/* You can add more sections below the hero section */}
      {/* For example:
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection /> 
      */}
    </div>
  );
};

export default LandingPage;
