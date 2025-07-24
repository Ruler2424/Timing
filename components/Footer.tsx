// components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './icons.tsx';

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-slate-500 text-center sm:text-left">Copyright © {new Date().getFullYear()} Timing-Five. All rights reserved.</span>
            <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <SocialIcon><FacebookIcon /></SocialIcon>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <SocialIcon><TwitterIcon /></SocialIcon>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <SocialIcon><InstagramIcon /></SocialIcon>
                </a>
            </div>
        </div>

        <div className="flex space-x-4">
          <Link to="/privacy" className="text-slate-500 hover:text-[var(--link-hover-color)] hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-slate-500 hover:text-[var(--link-hover-color)] hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;