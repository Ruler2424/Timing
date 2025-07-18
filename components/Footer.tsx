import React from 'react';
import { SocialIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './icons.tsx';

const Footer = () => {
  return (
    <footer className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">Copyright</span>
        <div className="flex items-center gap-4">
          <SocialIcon><FacebookIcon /></SocialIcon>
          <SocialIcon><TwitterIcon /></SocialIcon>
          <SocialIcon><InstagramIcon /></SocialIcon>
        </div>
      </div>
    </footer>
  );
};

export default Footer;