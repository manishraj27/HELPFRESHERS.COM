import React from 'react';
import { Briefcase } from 'lucide-react';

const JobBoard = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Job Board</h1>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>Find verified job opportunities tailored for freshers...</p>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;