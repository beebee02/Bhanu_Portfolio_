import React, { useEffect, useState } from 'react';
import { PERSONAL } from '../mock';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Nav = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const day = days[now.getDay()];
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-start justify-between pointer-events-none">
      <div className="pointer-events-auto">
        <a href="#top" className="mono text-xs md:text-sm tracking-widest text-white/80 hover:text-[#ff5f19] transition-colors">
          {PERSONAL.name}
        </a>
      </div>

      <nav className="hidden md:flex items-center gap-8 mono text-xs tracking-[0.2em] text-white/80 pointer-events-auto">
        <a href="#about" className="link-underline hover:text-white">//BOUT ME</a>
        <a href="#projects" className="link-underline hover:text-white">PROJECTS</a>
        <span className="opacity-40">SIDE QUESTS <span className="text-[#ff5f19]">SOON</span></span>
      </nav>

      <div className="pointer-events-auto text-right mono text-[10px] md:text-xs text-white/70 leading-tight">
        <div>{day}:</div>
        <div className="text-white">{hh}:{mm}</div>
        <div className="opacity-60">{PERSONAL.timezone}</div>
      </div>
    </header>
  );
};

export default Nav;
