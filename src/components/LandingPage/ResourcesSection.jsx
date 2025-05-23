import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Shield, Users, Heart, BookOpen } from 'lucide-react';
import SectionHeading from '../ui/section-heading';

const resources = [
  {
    icon: GraduationCap,
    title: "Education Hub",
    description: "Access comprehensive learning resources, skill development guides, and industry knowledge to enhance your career readiness.",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    link: "#education"
  },
  {
    icon: Briefcase,
    title: "Employment Resources",
    description: "Find verified job opportunities, resume building tools, and interview preparation resources to land your dream job.",
    color: "text-green-500",
    bgColor: "bg-green-100",
    link: "#employment"
  },
  {
    icon: Shield,
    title: "Scam Protection",
    description: "Learn to identify and avoid job scams with our comprehensive guide to fraudulent opportunities and warning signs.",
    color: "text-red-500",
    bgColor: "bg-red-100",
    link: "#scam-awareness"
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Connect with experienced professionals for personalized guidance and career development support.",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    link: "#mentorship"
  },
  {
    icon: Heart,
    title: "Volunteer Program",
    description: "Join our community of volunteers to make a difference in freshers' lives while developing leadership skills.",
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    link: "#volunteer"
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Follow structured learning paths tailored to your career goals and industry requirements.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    link: "#learning-paths"
  }
];

const ResourceCard = ({ icon: Icon, title, description, color, bgColor, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card hover:bg-accent/5 rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      
      <a 
        href={link}
        className={`inline-flex items-center text-sm font-medium ${color} hover:underline`}
      >
        Learn More
        <svg
          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </motion.div>
  );
};

const ResourcesSection = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        label="Our Resources"
        title="Everything You Need to Succeed"
        subtitle="Comprehensive tools and support for your career journey"
        className="text-center mb-16"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <ResourceCard key={resource.title} {...resource} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;