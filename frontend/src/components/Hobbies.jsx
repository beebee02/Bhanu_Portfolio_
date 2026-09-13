import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOBBIES } from '../mock';
import { Camera, Coffee, Dumbbell, Car, Mountain, Scissors } from 'lucide-react';
import PlaylistCard from './PlaylistCard';

const iconMap = { Camera, Coffee, Dumbbell, Car, Mountain, Scissors };

const HobbyCard = ({ h, i, active, setActive }) => {
  const Icon = iconMap[h.icon] || Coffee;
  const isActive = active === i;
  return (
    <motion.button
      type="button"
      onMouseEnter={() => setActive(i)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(i)}
      onBlur={() => setActive(null)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
      className="group relative text-left overflow-hidden rounded-md border border-white/10 bg-[#0d0d0d] p-6 md:p-8 h-[220px] md:h-[280px] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: h.accent }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${h.accent}22 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div
          className="h-11 w-11 rounded-full flex items-center justify-center border border-white/15"
          style={{ color: h.accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="mono text-[10px] tracking-[0.3em] text-white/40">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10">
        <div className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
          {h.title}
        </div>

        {/* Rolling stat: default (hint) rolls up to reveal the stat on hover */}
        <div className="relative overflow-hidden h-6 mt-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isActive ? 'stat' : 'hint'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mono text-[11px] tracking-[0.22em]"
              style={{ color: isActive ? h.accent : 'rgba(255,255,255,0.55)' }}
            >
              {isActive ? h.stat : h.hint}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
};

const Hobbies = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="hobbies" className="relative px-6 md:px-16 py-24 md:py-32 border-t border-white/10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
        <div>
          <div className="mono text-xs tracking-[0.3em] text-white/50">OFF THE CLOCK</div>
          <h2 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight text-white">
            When the laptop closes
          </h2>
        </div>
        <div className="mono text-[11px] tracking-[0.3em] text-white/40 hidden md:block">
          HOVER → REVEAL
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {HOBBIES.map((h, i) => (
          <HobbyCard key={h.title} h={h} i={i} active={active} setActive={setActive} />
        ))}
      </div>

      {/* Spotify-style Now Playing card - the soundtrack of the "Late drives" hobby */}
      <div className="mt-6 md:mt-8">
        <PlaylistCard />
      </div>
    </section>
  );
};

export default Hobbies;