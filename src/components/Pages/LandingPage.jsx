import React from 'react';
import HeroSection from '../LandingPage/HeroSection';
import MissionSection from '../LandingPage/MissionSection';
import ServicesSection from '../LandingPage/ServicesSection';
import ResourcesSection from '../LandingPage/ResourcesSection';
import ScamAwareness from '../LandingPage/ScamAwareness';
import Mentorship from '../LandingPage/Mentorship';
import Volunteer from '../LandingPage/Volunteer';

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      {/* Mission Statement Section */}
      <section className="py-20 bg-background">
        <MissionSection />
      </section>

      {/* Key Services Section */}
      <section className="py-20 bg-muted/50">
        <ServicesSection />
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-background">
        <ResourcesSection />
      </section>

      {/* Scam Awareness Section */}
      <section className="py-20 bg-muted/50">
        <ScamAwareness />
      </section>

      {/* Mentorship Section */}
      <section className="py-20 bg-background">
        <Mentorship />
      </section>

      {/* Volunteer Section */}
      <section className="py-20 bg-muted/50">
        <Volunteer />
      </section>
    </div>
  );
};

export default LandingPage;
