import React from 'react';
import { motion } from 'motion/react';

const SectionHeading = ({ 
  title, 
  subtitle, 
  align = 'center',
  label = 'Featured' // Default label text
}) => {
  return (
    <div className={`max-w-4xl mx-auto mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={`inline-flex flex-col items-${align}`}>
          {/* Decorative elements */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-primary/50" />
            <div className="text-primary/80 uppercase text-sm font-medium tracking-[0.2em]">{label}</div>
            <div className="h-[2px] w-12 bg-primary/50" />
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent inline-block">
            {title}
          </h2>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl text-foreground/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionHeading;