import React from "react";
import { Link } from "react-router-dom";
import HelpFreshersLogo from "../../assets/Logo/HelpFreshersLogo";

// Import social media icons from Lucide
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Top section - Logo and description */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <div className="max-w-md">
            <Link to="/" className="inline-block mb-6">
              <HelpFreshersLogo width={180} height={48} />
            </Link>
            <p className="text-foreground/80 mb-6">
              Your ultimate resource for freshers entering the job market. 
              We connect students with opportunities, mentors, and resources 
              to launch successful careers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/helpfreshers" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-border hover:bg-accent/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com/company/helpfreshers" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-border hover:bg-accent/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://instagram.com/helpfreshers" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-border hover:bg-accent/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://github.com/helpfreshers" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-border hover:bg-accent/10 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="max-w-md">
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-foreground/80 mb-4">
              Subscribe to our newsletter for the latest opportunities and career tips.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 bg-muted border border-border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Email address"
              />
              <button 
                type="button"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Middle section - Site map */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-4">Education</h3>
            <ul className="space-y-3">
              <li><Link to="/education/soft-skills" className="text-foreground/80 hover:text-primary transition-colors">Soft Skills</Link></li>
              <li><Link to="/education/smart-skills" className="text-foreground/80 hover:text-primary transition-colors">Smart Skills</Link></li>
              <li><Link to="/education/resources" className="text-foreground/80 hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/education/personal-branding" className="text-foreground/80 hover:text-primary transition-colors">Personal Branding</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Employment</h3>
            <ul className="space-y-3">
              <li><Link to="/employment/job-board" className="text-foreground/80 hover:text-primary transition-colors">Job Board</Link></li>
              <li><Link to="/employment/internships" className="text-foreground/80 hover:text-primary transition-colors">Internships</Link></li>
              <li><Link to="/employment/industry-trends" className="text-foreground/80 hover:text-primary transition-colors">Industry Trends</Link></li>
              <li><Link to="/employment/interview-guides" className="text-foreground/80 hover:text-primary transition-colors">Interview Guides</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Scam Awareness</h3>
            <ul className="space-y-3">
              <li><Link to="/scam-awareness/report" className="text-foreground/80 hover:text-primary transition-colors">Report Fake Job</Link></li>
              <li><Link to="/scam-awareness/red-flags" className="text-foreground/80 hover:text-primary transition-colors">Red Flags</Link></li>
              <li><Link to="/scam-awareness/verified-influencers" className="text-foreground/80 hover:text-primary transition-colors">Verified Influencers</Link></li>
              <li><Link to="/scam-awareness/case-studies" className="text-foreground/80 hover:text-primary transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Mentorship</h3>
            <ul className="space-y-3">
              <li><Link to="/mentorship/company" className="text-foreground/80 hover:text-primary transition-colors">Company-wise</Link></li>
              <li><Link to="/mentorship/subject" className="text-foreground/80 hover:text-primary transition-colors">Subject-wise</Link></li>
              <li><Link to="/mentorship/book" className="text-foreground/80 hover:text-primary transition-colors">Book a Session</Link></li>
              <li><Link to="/mentorship/become-mentor" className="text-foreground/80 hover:text-primary transition-colors">Become a Mentor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link to="/about/mission" className="text-foreground/80 hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link to="/about/team" className="text-foreground/80 hover:text-primary transition-colors">Meet the Team</Link></li>
              <li><Link to="/about/contact" className="text-foreground/80 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/about/faq" className="text-foreground/80 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Featured section */}
        <div className="mb-16">
          <h3 className="text-lg font-medium mb-6">Featured Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/initiatives/mentor-matching" 
              className="group block bg-muted/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-medium">Mentor Matching</h4>
                <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="text-foreground/80">Connect with industry professionals for personalized career guidance.</p>
            </Link>
            
            <Link 
              to="/initiatives/job-verification" 
              className="group block bg-muted/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-medium">Job Verification</h4>
                <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="text-foreground/80">We verify every job posted on our platform to ensure it's legitimate.</p>
            </Link>
            
            <Link 
              to="/initiatives/skill-workshops" 
              className="group block bg-muted/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-medium">Skill Workshops</h4>
                <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="text-foreground/80">Free online workshops to help freshers build essential career skills.</p>
            </Link>
          </div>
        </div>
        
        {/* Bottom section - Copyright and legal links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="text-foreground/70 mb-4 md:mb-0">
            © {currentYear} HelpFreshers. All rights reserved.
          </div>
           
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link to="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="text-foreground/70 hover:text-primary transition-colors">Terms of Use</Link>
            <Link to="/accessibility" className="text-foreground/70 hover:text-primary transition-colors">Accessibility</Link>
            {/* <Link to="/sitemap" className="text-foreground/70 hover:text-primary transition-colors">Sitemap</Link> */}
           <span className="flex text-sm">
             Website by&nbsp;
              <a 
                href="https://manishraj.netlify.app" 
                target="_blank" 
                rel="noreferrer" 
                className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                this guy
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;