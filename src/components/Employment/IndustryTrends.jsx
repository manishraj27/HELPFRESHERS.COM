import React from 'react';
import { LineChart } from 'lucide-react';

const IndustryTrends = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LineChart size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Industry Trends</h1>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>Stay updated with the latest job market trends and insights...</p>
        </div>
      </div>
    </div>
  );
};

export default IndustryTrends;