import React from 'react';
import { PERSONAL } from '../mock';
import { Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const y = new Date().getFullYear();
  return (
    <footer className="relative px-6 md:px-16 py-10 border-t border-white/10 bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="mono text-xs tracking-[0.25em] text-white/50">
          © {y} — {PERSONAL.firstName} Teja. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#ff5f19] hover:border-[#ff5f19] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#ff5f19] hover:border-[#ff5f19] transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <div className="mono text-xs tracking-[0.25em] text-white/50">
          BUILT WITH INTENT — {PERSONAL.location}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
