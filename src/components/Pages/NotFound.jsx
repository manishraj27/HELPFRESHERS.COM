import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-24 min-h-[100vh] flex items-center justify-center bg-background">
      <div className="max-w-2xl px-8 py-16 text-center">
        <h1 className="mb-8 text-9xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Oops! Page Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
          Don't worry, you can find plenty of other things on our homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <Link 
            to="/" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-accent/10 rounded-lg transition-colors text-foreground"
          >
            <ArrowLeft size={18} />
            Go Back
          </Link>
          
          {/* <Link 
            to="/search" 
            className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-accent/10 rounded-lg transition-colors text-foreground"
          >
            <Search size={18} />
            Search Site
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;