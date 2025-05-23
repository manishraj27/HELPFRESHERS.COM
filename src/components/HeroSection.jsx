import React from 'react';


const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/10 rounded-tr-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Help Freshers Launch Their Careers
            </h1>
            <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-2xl">
              Your ultimate resource for freshers entering the job market. Get career guidance, interview tips, resume help, and connect with top employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Get Started
              </button>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 bg-card p-2 rounded-lg shadow-xl">
              <div className="aspect-video rounded-md overflow-hidden border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative elements for the image */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-accent/30 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/30 rounded-lg -z-10"></div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl font-bold mb-2">10,000+</div>
            <div className="text-card-foreground">Students Helped</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl font-bold mb-2">500+</div>
            <div className="text-card-foreground">Partner Companies</div>
          </div>
          <div className="bg-card border border-border p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl font-bold mb-2">95%</div>
            <div className="text-card-foreground">Placement Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;