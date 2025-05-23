import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle } from 'lucide-react';
import SectionHeading from './ui/section-heading';

const mentors = [
  {
    name: "Priya Sharma",
    role: "Senior Software Engineer",
    company: "TechCorp",
    expertise: ["Web Development", "Career Guidance", "Interview Prep"],
    image: "/mentors/priya.jpg"
  },
  {
    name: "Rahul Verma",
    role: "Marketing Manager",
    company: "BrandX",
    expertise: ["Digital Marketing", "Personal Branding", "Resume Building"],
    image: "/mentors/rahul.jpg"
  },
  {
    name: "Ananya Patel",
    role: "HR Specialist",
    company: "Global Solutions",
    expertise: ["HR Practices", "Job Search Strategy", "Workplace Skills"],
    image: "/mentors/ananya.jpg"
  }
];

const steps = [
  {
    number: 1,
    title: "Request a Mentor",
    description: "Fill out a simple form telling us about your goals and needs"
  },
  {
    number: 2,
    title: "Get Matched",
    description: "We'll connect you with a mentor who matches your career interests"
  },
  {
    number: 3,
    title: "Schedule Sessions",
    description: "Arrange one-on-one virtual meetings with your mentor"
  },
  {
    number: 4,
    title: "Grow Together",
    description: "Receive guidance, feedback, and support on your career journey"
  }
];

const MentorCard = ({ name, role, company, expertise, image, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-card rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mr-4">
          <span className="text-xl font-semibold text-primary">{name[0]}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-muted-foreground">{role}</p>
          <p className="text-sm text-muted-foreground/80">{company}</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">EXPERTISE</h4>
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, idx) => (
            <span
              key={idx}
              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2 rounded-lg transition-colors">
        Request Mentorship
      </button>
    </div>
  </motion.div>
);

const StepItem = ({ number, title, description, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-start space-x-3"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
      {number}
    </div>
    <div>
      <strong className="block text-foreground">{title}</strong>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.li>
);

const Mentorship = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        label="Expert Guidance"
        title="Mentorship Program"
        subtitle="Connect with experienced professionals who volunteer their time to guide freshers and job seekers"
        className="text-center mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {mentors.map((mentor, index) => (
          <MentorCard key={mentor.name} {...mentor} index={index} />
        ))}
      </div>

      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="md:flex items-start justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 md:w-2/3">
              <div className="flex items-center space-x-2 text-primary mb-6">
                <Users className="w-6 h-6" />
                <h3 className="text-2xl font-bold">How Our Mentorship Works</h3>
              </div>
              <ol className="space-y-6">
                {steps.map((step, index) => (
                  <StepItem key={step.number} {...step} index={index} />
                ))}
              </ol>
            </div>
            <div className="md:w-1/3">
              <div className="bg-muted p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-4">Become a Mentor</h4>
                <p className="text-muted-foreground mb-4">
                  Want to give back to the community? Share your expertise and help guide the next generation of professionals.
                </p>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg transition-colors">
                  Volunteer as Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;