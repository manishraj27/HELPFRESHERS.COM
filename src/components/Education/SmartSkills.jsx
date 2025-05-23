import React from 'react';
import { FileText } from 'lucide-react';

const SmartSkills = () => {
  return (
    <div className=" container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Smart Skills</h1>
        </div>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Resume Building</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Create an impactful resume that stands out...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">LinkedIn Optimization</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Optimize your LinkedIn profile for maximum visibility...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SmartSkills;