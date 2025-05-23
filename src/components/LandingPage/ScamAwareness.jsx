import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import SectionHeading from '../ui/section-heading';

const warningItems = [
  {
    title: "Too Good To Be True",
    description: "Unusually high salary for minimal qualifications or experience"
  },
  {
    title: "Unprofessional Communication",
    description: "Emails with poor grammar, spelling errors, or generic greetings"
  },
  {
    title: "Requests for Payment",
    description: "Asking for money for training, equipment, or background checks"
  },
  {
    title: "Personal Information",
    description: "Early requests for bank details, SSN, or other sensitive information"
  }
];

const safetyTips = [
  {
    title: "Research the Company",
    description: "Verify the company exists with a legitimate online presence"
  },
  {
    title: "Use Official Channels",
    description: "Apply through official company websites or trusted job boards"
  },
  {
    title: "Guard Personal Information",
    description: "Never provide sensitive details until you've verified the job is legitimate"
  },
  {
    title: "Report Suspicious Activity",
    description: "Report scams to our platform and appropriate authorities"
  }
];

const WarningItem = ({ title, description, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-start space-x-3"
  >
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
      <span className="text-destructive font-bold">!</span>
    </div>
    <div>
      <strong className="block text-foreground">{title}</strong>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.li>
);

const SafetyTip = ({ title, description, index }) => (
  <motion.li
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-start space-x-3"
  >
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
      <ShieldCheck className="w-4 h-4 text-primary" />
    </div>
    <div>
      <strong className="block text-foreground">{title}</strong>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.li>
);

const ScamAwareness = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        label="Stay Safe"
        title="Scam Awareness"
        subtitle="Learn how to identify and avoid fake job postings, scams, and fraudulent opportunities"
        className="text-center mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 text-destructive mb-6">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-xl font-bold">Warning Signs</h3>
          </div>
          <ul className="space-y-6">
            {warningItems.map((item, index) => (
              <WarningItem key={item.title} {...item} index={index} />
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 text-primary mb-6">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-bold">Safety Tips</h3>
          </div>
          <ul className="space-y-6">
            {safetyTips.map((tip, index) => (
              <SafetyTip key={tip.title} {...tip} index={index} />
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-muted rounded-xl p-8 text-center"
      >
        <h3 className="text-xl font-bold mb-4">Spotted a Scam?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Help protect the community by reporting suspicious job postings, recruiters, or companies.
          Your report will be reviewed by our team and added to our database of known scams.
        </p>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-colors">
          Report a Scam
        </button>
      </motion.div>
    </div>
  );
};

export default ScamAwareness;