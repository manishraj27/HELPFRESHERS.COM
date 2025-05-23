import React, { useState, useEffect } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "../ui/navbar-menu";
import HelpFreshersLogo from "../../assets/Logo/HelpFreshersLogo";
import { Link } from "react-router-dom";

// Theme toggle component
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent/10"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
};

const Navbar = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="relative w-full z-50">
      <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <HelpFreshersLogo width={150} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="grid grid-cols-2 gap-6 p-4 w-[500px] z-50">
                  <ProductItem
                    title="Resume Builder"
                    description="Create professional resumes in minutes"
                    href="/resume-builder"
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Interview Prep"
                    description="Prepare for technical interviews"
                    href="/interview-prep"
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Job Matching"
                    description="Find jobs that match your skills"
                    href="/job-matching"
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Career Guidance"
                    description="Get personalized career advice"
                    href="/career-guidance"
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Resources">
                <div className="grid grid-cols-1 gap-4 p-4 w-[300px]">
                  <HoveredLink href="/blog">Blog</HoveredLink>
                  <HoveredLink href="/tutorials">Tutorials</HoveredLink>
                  <HoveredLink href="/webinars">Webinars</HoveredLink>
                  <HoveredLink href="/ebooks">E-Books</HoveredLink>
                  <HoveredLink href="/templates">Templates</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="About">
                <div className="grid grid-cols-1 gap-4 p-4 w-[300px]">
                  <HoveredLink href="/about-us">About Us</HoveredLink>
                  <HoveredLink href="/team">Our Team</HoveredLink>
                  <HoveredLink href="/testimonials">Testimonials</HoveredLink>
                  <HoveredLink href="/partners">Partners</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Contact">
                <div className="grid grid-cols-1 gap-4 p-4 w-[300px]">
                  <HoveredLink href="/contact">Contact Us</HoveredLink>
                  <HoveredLink href="/support">Support</HoveredLink>
                  <HoveredLink href="/faq">FAQ</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Right side - Auth buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* implement later */}
          {/* <div className="hidden sm:flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-foreground hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div> */}
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md hover:bg-accent/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;