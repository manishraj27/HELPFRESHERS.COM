import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ShieldCheck, Users } from 'lucide-react';
import SectionHeading from '../ui/section-heading';

const services = [
  {
    icon: GraduationCap,
    title: "Education Resources",
    description: "Access comprehensive study materials, course recommendations, and exam preparation guides tailored for freshers.",
    color: "text-primary"
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Discover verified internships and job openings from top companies, perfectly suited for fresh graduates.",
    color: "text-secondary"
  },
  {
    icon: ShieldCheck,
    title: "Scam Protection",
    description: "Stay informed about common job scams and learn how to identify legitimate opportunities with our verification system.",
    color: "text-destructive"
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Connect with experienced professionals for personalized guidance and career development support.",
    color: "text-accent"
  }
];

const ServiceCard = ({ icon: Icon, title, description, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`${color} mb-4`}>
        <Icon size={32} className="transition-transform group-hover:scale-110" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        label="Our Services"
        title="Empowering Your Journey"
        subtitle="Comprehensive support for your career growth"
        className="text-center mb-16"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;