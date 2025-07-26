// components/Footer.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation for active link styling
import { SocialIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './icons.tsx';

const Footer = () => {
  const location = useLocation(); // Get current location to potentially style active links if needed

  // IMPORTANT: Replace '#' with your actual social media profile URLs
  const socialLinks = {
    facebook: '#', // Replace with your Facebook URL
    twitter: '#',  // Replace with your X (Twitter) URL
    instagram: '#', // Replace with your Instagram URL
    // Add other platforms if relevant (e.g., YouTube, LinkedIn)
    // youtube: '#', 
    // linkedin: '#',
  };

  return (
    <footer className="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Added aria-label for accessibility */}
            <span className="text-slate-500 text-center sm:text-left">Copyright © {new Date().getFullYear()} TimeCraft. All rights reserved.</span>
            <div className="flex items-center gap-4">
                {/* Updated aria-labels */}
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit TimeCraft on Facebook">
                    <SocialIcon><FacebookIcon /></SocialIcon>
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit TimeCraft on X (Twitter)">
                    <SocialIcon><TwitterIcon /></SocialIcon>
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit TimeCraft on Instagram">
                    <SocialIcon><InstagramIcon /></SocialIcon>
                </a>
                {/* Add links for other platforms if defined in socialLinks */}
            </div>
        </div>

        <div className="flex space-x-4">
          {/* Added 'font-medium' for consistency and hover effects */}
          <Link to="/privacy" 
                className={`text-slate-500 hover:text-[var(--link-hover-color)] hover:underline ${location.pathname === '/privacy' ? 'font-medium border-b border-[var(--link-hover-color)]' : 'font-normal'}`}>
            Privacy Policy
          </Link>
          <Link to="/terms" 
                className={`text-slate-500 hover:text-[var(--link-hover-color)] hover:underline ${location.pathname === '/terms' ? 'font-medium border-b border-[var(--link-hover-color)]' : 'font-normal'}`}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;