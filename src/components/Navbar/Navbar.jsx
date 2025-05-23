import React, { useState, useEffect, useRef } from "react";
import { Menu, MenuItem, HoveredLink } from "../ui/navbar-menu";
import HelpFreshersLogo from "../../assets/Logo/HelpFreshersLogo";
import { Link } from "react-router-dom";

// Import icons
import { 
  BookOpen, 
  Briefcase, 
  FileSpreadsheet, 
  BadgeCheck, 
  Users, 
  LineChart, 
  MessageSquare, 
  UserCheck, 
  FileWarning, 
  ShieldAlert, 
  UserCheck2, 
  FileText, 
  Building, 
  Lightbulb, 
  GraduationCap, 
  Headphones 
} from "lucide-react";

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

// New IconProductItem component to replace ProductItem
const IconProductItem = ({ title, description, href, icon: Icon }) => {
  return (
    <Link to={href} className="flex items-start gap-3 p-3 rounded-lg group hover:bg-accent/10 transition-colors">
      <div className="mt-1 p-2 rounded-md bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-base font-medium mb-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm max-w-[14rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const mobileMenuRef = useRef(null);

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <HelpFreshersLogo width={150} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Education">
                <div className="grid grid-cols-2 gap-2 p-5 w-[520px] z-50">
                  <IconProductItem
                    title="Soft Skills"
                    description="Communication, Time Management, Interview Etiquette"
                    href="/education/soft-skills"
                    icon={MessageSquare}
                  />
                  <IconProductItem
                    title="Smart Skills"
                    description="Resume building, LinkedIn optimization"
                    href="/education/smart-skills"
                    icon={FileText}
                  />
                  <IconProductItem
                    title="Resources"
                    description="Articles, videos, and downloadable resources"
                    href="/education/resources"
                    icon={BookOpen}
                  />
                  <IconProductItem
                    title="Personal Branding"
                    description="Build your professional identity"
                    href="/education/personal-branding"
                    icon={BadgeCheck}
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Employment">
                <div className="grid grid-cols-2 gap-2 p-5 w-[520px]">
                  <IconProductItem
                    title="Job Board"
                    description="Verified job opportunities for freshers"
                    href="/employment/job-board"
                    icon={Briefcase}
                  />
                  <IconProductItem
                    title="Internships"
                    description="Find internships to kick-start your career"
                    href="/employment/internships"
                    icon={GraduationCap}
                  />
                  <IconProductItem
                    title="Industry Trends"
                    description="Stay updated with job market trends"
                    href="/employment/industry-trends"
                    icon={LineChart}
                  />
                  <IconProductItem
                    title="Interview Guides"
                    description="Prepare for your next interview"
                    href="/employment/interview-guides"
                    icon={FileSpreadsheet}
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Scam Awareness">
                <div className="grid grid-cols-1 gap-2 p-5 w-[320px]">
                  <HoveredLink href="/scam-awareness/report" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <FileWarning size={16} className="text-primary" />
                      <span>Report Fake Job</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/scam-awareness/red-flags" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={16} className="text-primary" />
                      <span>Red Flags to Watch For</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/scam-awareness/verified-influencers" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <UserCheck2 size={16} className="text-primary" />
                      <span>Verified Influencer List</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/scam-awareness/case-studies" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <span>Case Studies</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/scam-awareness/resources" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      <span>Awareness Resources</span>
                    </div>
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Mentorship">
                <div className="grid grid-cols-1 gap-2 p-5 w-[320px]">
                  <HoveredLink href="/mentorship/company" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-primary" />
                      <span>Company-wise Mentors</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/mentorship/subject" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <Lightbulb size={16} className="text-primary" />
                      <span>Subject-wise Mentors</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/mentorship/book" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <Headphones size={16} className="text-primary" />
                      <span>Book a Session</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/mentorship/become-mentor" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <UserCheck size={16} className="text-primary" />
                      <span>Become a Mentor</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/mentorship/success-stories" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>Success Stories</span>
                    </div>
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="About">
                <div className="grid grid-cols-1 gap-2 p-5 w-[300px]">
                  <HoveredLink href="/about/mission" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      <span>Our Mission</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/about/team" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>Meet the Team</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/about/contact" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-primary" />
                      <span>Contact Us</span>
                    </div>
                  </HoveredLink>
                  <HoveredLink href="/about/faq" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <span>FAQ</span>
                    </div>
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Resourse">
                <div className="grid grid-cols-1 gap-2 p-5 w-[320px]">
                  <HoveredLink href="/resources/blogs" className="flex items-center justify-between w-full py-1">
                    <div className="flex items-center gap-2">
                      <FileWarning size={16} className="text-primary" />
                      <span>Blogs</span>
                    </div>
                  </HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-4">
         

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

            <ThemeToggle />
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
              <Link to="/education/soft-skills" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                <span>Soft Skills</span>
              </Link>
              <Link to="/education/smart-skills" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <span>Smart Skills</span>
              </Link>
              <Link to="/education/resources" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span>Resources</span>
              </Link>
              <Link to="/education/personal-branding" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <BadgeCheck size={16} className="text-primary" />
                <span>Personal Branding</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Employment</h3>
              <Link to="/employment/job-board" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <Briefcase size={16} className="text-primary" />
                <span>Job Board</span>
              </Link>
              <Link to="/employment/internships" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <GraduationCap size={16} className="text-primary" />
                <span>Internships</span>
              </Link>
              <Link to="/employment/industry-trends" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <LineChart size={16} className="text-primary" />
                <span>Industry Trends</span>
              </Link>
              <Link to="/employment/interview-guides" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-primary" />
                <span>Interview Guides</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Scam Awareness</h3>
              <Link to="/scam-awareness/report" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <FileWarning size={16} className="text-primary" />
                <span>Report Fake Job</span>
              </Link>
              <Link to="/scam-awareness/red-flags" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <ShieldAlert size={16} className="text-primary" />
                <span>Red Flags to Watch For</span>
              </Link>
              <Link to="/scam-awareness/verified-influencers" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <UserCheck2 size={16} className="text-primary" />
                <span>Verified Influencers</span>
              </Link>
              <Link to="/scam-awareness/case-studies" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <span>Case Studies</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">Mentorship</h3>
              <Link to="/mentorship/company" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <Building size={16} className="text-primary" />
                <span>Company-wise Mentors</span>
              </Link>
              <Link to="/mentorship/subject" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <Lightbulb size={16} className="text-primary" />
                <span>Subject-wise Mentors</span>
              </Link>
              <Link to="/mentorship/book" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <Headphones size={16} className="text-primary" />
                <span>Book a Session</span>
              </Link>
              <Link to="/mentorship/become-mentor" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <UserCheck size={16} className="text-primary" />
                <span>Become a Mentor</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">About</h3>
              <Link to="/about/mission" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span>Our Mission</span>
              </Link>
              <Link to="/about/team" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <Users size={16} className="text-primary" />
                <span>Meet the Team</span>
              </Link>
              <Link to="/about/contact" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                <span>Contact Us</span>
              </Link>
              <Link to="/about/faq" className="px-2 py-1.5 hover:bg-accent/10 rounded-md flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <span>FAQ</span>
              </Link>
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