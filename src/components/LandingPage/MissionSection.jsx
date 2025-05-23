import React from 'react';
import SectionHeading from '../ui/section-heading';
import { motion } from 'motion/react';
import { Shield, GraduationCap, Users, AlertTriangle, BookOpen, BriefcaseIcon } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all group"
  >
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-foreground/70 leading-relaxed">{description}</p>
  </motion.div>
);

const MissionSection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Education First",
      description: "Comprehensive skill development programs covering soft skills, technical knowledge, and career readiness.",
      delay: 0.2
    },
    {
      icon: BriefcaseIcon,
      title: "Verified Opportunities",
      description: "Curated and verified job listings to ensure every opportunity is legitimate and valuable for freshers.",
      delay: 0.3
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "One-on-one guidance from industry professionals to help navigate your early career decisions.",
      delay: 0.4
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "A protected platform where freshers can explore opportunities without worrying about scams or fraud.",
      delay: 0.5
    },
    {
      icon: AlertTriangle,
      title: "Scam Awareness",
      description: "Educational resources and real-time alerts to help identify and avoid job scams targeting freshers.",
      delay: 0.6
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Comprehensive library of guides, templates, and tools for interview preparation and career development.",
      delay: 0.7
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <SectionHeading 
        title="Empowering Fresh Graduates"
        subtitle="We're on a mission to create a safe, supportive environment where every fresher can launch their career with confidence. Through verified opportunities, expert mentorship, and comprehensive resources, we're building a bridge between education and employment."
        label="Our Mission"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

    </div>
  );
};

export default MissionSection;