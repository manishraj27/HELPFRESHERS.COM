import React from 'react';
import { MessageSquare } from 'lucide-react';

const SoftSkills = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Soft Skills</h1>
        </div>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Communication Skills</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Learn effective communication techniques for professional settings...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Time Management</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Master the art of managing your time efficiently...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Interview Etiquette</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Essential interview etiquette and best practices...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;