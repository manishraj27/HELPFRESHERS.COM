import React from 'react';
import { motion } from 'framer-motion';
import { Users, PenTool, Monitor, Heart, CheckCircle } from 'lucide-react';
import SectionHeading from '../ui/section-heading';

const roles = [
  {
    icon: Users,
    title: "Become a Mentor",
    description: "Guide students and recent graduates through their career journey. Share your industry insights and professional advice.",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    requirements: ["1-2 hours per week", "Virtual meetings", "Flexible schedule"]
  },
  {
    icon: PenTool,
    title: "Content Creator",
    description: "Help create educational content, write articles, develop resources, or create videos for our platform.",
    color: "text-green-500",
    bgColor: "bg-green-100",
    requirements: ["Project-based commitment", "Remote work", "Use your expertise"]
  },
  {
    icon: Monitor,
    title: "Tech Volunteer",
    description: "Help us improve our platform with your technical skills in web development, design, or data analysis.",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    requirements: ["Flexible time commitment", "Remote collaboration", "Build your portfolio"]
  }
];

const benefits = [
  {
    icon: Users,
    title: "Make a Difference",
    description: "Help students and graduates navigate their career journey"
  },
  {
    icon: Heart,
    title: "Develop Skills",
    description: "Enhance your leadership and communication abilities"
  },
  {
    icon: Users,
    title: "Expand Network",
    description: "Connect with like-minded professionals across industries"
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Share your knowledge and experience with those who need it"
  }
];

const RoleCard = ({ icon: Icon, title, description, color, bgColor, requirements, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-card rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
  >
    <div className="p-6">
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2 mb-6">
        {requirements.map((req, idx) => (
          <li key={idx} className="flex items-center space-x-2 text-muted-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>{req}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg transition-colors">
        Apply Now
      </button>
    </div>
  </motion.div>
);

const BenefitItem = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-start space-x-3"
  >
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const Volunteer = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        label="Join Us"
        title="Volunteer With Us"
        subtitle="Share your knowledge and experience to help the next generation succeed"
        className="text-center mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {roles.map((role, index) => (
          <RoleCard key={role.title} {...role} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-card rounded-xl shadow-lg p-8"
      >
        <div className="md:flex items-center">
          <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Why Volunteer With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitItem key={benefit.title} {...benefit} index={index} />
              ))}
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-muted p-6 rounded-xl">
              <h4 className="text-lg font-bold mb-4 text-foreground">Volunteer Testimonial</h4>
              <p className="text-muted-foreground italic mb-4">
                "Volunteering with HelpFreshers has been incredibly rewarding. Seeing the impact of my guidance on students' careers gives me a sense of purpose beyond my day job."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">AD</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Anita Desai</p>
                  <p className="text-sm text-muted-foreground">Senior Developer, Volunteering since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Volunteer;