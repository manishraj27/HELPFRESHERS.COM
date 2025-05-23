import React, { useState, useEffect, useRef } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

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
              <MenuItem setActive={setActive} active={active} item="Education">
                <div className="grid grid-cols-2 gap-6 p-4 w-[500px] z-50">
                  <ProductItem
                    title="Soft Skills"
                    description="Communication, Time Management, Interview Etiquette"
                    href="/education/soft-skills"
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Smart Skills"
                    description="Resume building, LinkedIn optimization"
                    href="/education/smart-skills"
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Resources"
                    description="Articles, videos, and downloads"
                    href="/education/resources"
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Personal Branding"
                    description="Build your professional identity"
                    href="/education/personal-branding"
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2069&auto=format&fit=crop"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Employment">
                <div className="grid grid-cols-2 gap-6 p-4 w-[500px]">
                  <ProductItem
                    title="Job Board"
                    description="Verified job opportunities for freshers"
                    href="/employment/job-board"
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Internships"
                    description="Find internships to kick-start your career"
                    href="/employment/internships"
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2069&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Industry Trends"
                    description="Stay updated with job market trends"
                    href="/employment/industry-trends"
                    src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"
                  />
                  <ProductItem
                    title="Interview Guides"
                    description="Prepare for your next interview"
                    href="/employment/interview-guides"
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Scam Awareness">
                <div className="grid grid-cols-1 gap-4 p-4 w-[350px]">
                  <HoveredLink href="/scam-awareness/report">Report Fake Job</HoveredLink>
                  <HoveredLink href="/scam-awareness/red-flags">Red Flags to Watch For</HoveredLink>
                  <HoveredLink href="/scam-awareness/verified-influencers">Verified Influencer List</HoveredLink>
                  <HoveredLink href="/scam-awareness/case-studies">Case Studies</HoveredLink>
                  <HoveredLink href="/scam-awareness/resources">Awareness Resources</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Mentorship">
                <div className="grid grid-cols-1 gap-4 p-4 w-[350px]">
                  <HoveredLink href="/mentorship/company">Company-wise Mentors</HoveredLink>
                  <HoveredLink href="/mentorship/subject">Subject-wise Mentors</HoveredLink>
                  <HoveredLink href="/mentorship/book">Book a Session</HoveredLink>
                  <HoveredLink href="/mentorship/become-mentor">Become a Mentor</HoveredLink>
                  <HoveredLink href="/mentorship/success-stories">Success Stories</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="About">
                <div className="grid grid-cols-1 gap-4 p-4 w-[300px]">
                  <HoveredLink href="/about/mission">Our Mission</HoveredLink>
                  <HoveredLink href="/about/team">Meet the Team</HoveredLink>
                  <HoveredLink href="/about/contact">Contact Us</HoveredLink>
                  <HoveredLink href="/about/faq">FAQ</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-4">
            <Link 
              to="/mentorship/book" 
              className="px-4 py-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              Get Mentorship
            </Link>
            <Link 
              to="/volunteer" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Volunteer
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-md hover:bg-accent/10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          {/* Mobile header with logo and close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-background/80">
            <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <HelpFreshersLogo width={130} height={35} />
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-2 rounded-md hover:bg-accent/10"
              aria-label="Close mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="container mx-auto px-4 py-6 flex flex-col gap-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Education</h3>
              <Link to="/education/soft-skills" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Soft Skills</Link>
              <Link to="/education/smart-skills" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Smart Skills</Link>
              <Link to="/education/resources" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Resources</Link>
              <Link to="/education/personal-branding" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Personal Branding</Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Employment</h3>
              <Link to="/employment/job-board" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Job Board</Link>
              <Link to="/employment/internships" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Internships</Link>
              <Link to="/employment/industry-trends" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Industry Trends</Link>
              <Link to="/employment/interview-guides" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Interview Guides</Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Scam Awareness</h3>
              <Link to="/scam-awareness/report" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Report Fake Job</Link>
              <Link to="/scam-awareness/red-flags" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Red Flags to Watch For</Link>
              <Link to="/scam-awareness/verified-influencers" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Verified Influencers</Link>
              <Link to="/scam-awareness/case-studies" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Case Studies</Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Mentorship</h3>
              <Link to="/mentorship/company" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Company-wise Mentors</Link>
              <Link to="/mentorship/subject" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Subject-wise Mentors</Link>
              <Link to="/mentorship/book" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Book a Session</Link>
              <Link to="/mentorship/become-mentor" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Become a Mentor</Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">About</h3>
              <Link to="/about/mission" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Our Mission</Link>
              <Link to="/about/team" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Meet the Team</Link>
              <Link to="/about/contact" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">Contact Us</Link>
              <Link to="/about/faq" className="px-2 py-1.5 hover:bg-accent/10 rounded-md">FAQ</Link>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <Link 
                to="/mentorship/book" 
                className="w-full px-4 py-3 bg-accent/20 text-center rounded-lg hover:bg-accent/30 transition-colors"
              >
                Get Mentorship
              </Link>
              <Link 
                to="/volunteer" 
                className="w-full px-4 py-3 bg-primary text-primary-foreground text-center rounded-lg hover:bg-primary/90 transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;