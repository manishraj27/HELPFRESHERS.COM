import React from 'react';

const ColorTest = () => {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Color Test Component</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-primary text-primary-foreground rounded-lg">
          Primary Color
        </div>
        
        <div className="p-6 bg-secondary text-secondary-foreground rounded-lg">
          Secondary Color
        </div>
        
        <div className="p-6 bg-accent text-accent-foreground rounded-lg">
          Accent Color
        </div>
        
        <div className="p-6 bg-muted text-muted-foreground rounded-lg">
          Muted Color
        </div>
        
        <div className="p-6 bg-card text-card-foreground rounded-lg border border-border">
          Card Color
        </div>
        
        <div className="p-6 bg-destructive text-primary-foreground rounded-lg">
          Destructive Color
        </div>
      </div>
      
      <div className="mt-8">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg mr-4">
          Primary Button
        </button>
        
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg">
          Secondary Button
        </button>
      </div>
    </div>
  );
};

export default ColorTest;