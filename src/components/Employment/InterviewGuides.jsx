import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

const InterviewGuides = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileSpreadsheet size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Interview Guides</h1>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>Comprehensive guides to help you ace your interviews...</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewGuides;