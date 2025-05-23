import React from 'react';
import { BadgeCheck } from 'lucide-react';

const PersonalBranding = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BadgeCheck size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Personal Branding</h1>
        </div>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Building Your Brand</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Learn how to create and maintain your professional brand...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Online Presence</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Establish a strong online presence across platforms...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Networking</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Effective networking strategies for career growth...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PersonalBranding;