import React from 'react';
import { BookOpen } from 'lucide-react';

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={32} className="text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Educational Resources</h1>
        </div>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Articles</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Curated articles to enhance your knowledge...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Videos</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Educational videos and tutorials...</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Downloads</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Downloadable resources and templates...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;