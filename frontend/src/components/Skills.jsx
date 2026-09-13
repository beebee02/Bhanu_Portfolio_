import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../mock';

const SkillRow = ({ skill, active, onEnter, onLeave, onMove }) => {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      data-cursor="hover"
      className="group relative block cursor-none py-1 md:py-2"
    >
      {/* Rolling text: two stacked copies clipped to one line height */}
      <div className="relative overflow-hidden h-[9vw] md:h-[6.5vw] leading-none">
        <div
          className={`display-font tracking-tight text-[9vw] md:text-[6.5vw] leading-none transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            active ? '-translate-y-1/2' : 'translate-y-0'
          }`}
        >
          <div
            className={`${active ? 'text-white' : 'text-white/25'} transition-colors duration-300 h-[9vw] md:h-[6.5vw] flex items-center`}
          >
            {skill.title}
          </div>
          <div className="text-white h-[9vw] md:h-[6.5vw] flex items-center">
            {skill.title}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative px-6 md:px-16 py-24 md:py-40 border-t border-white/10 overflow-hidden"
    >
      <div className="flex items-baseline justify-between flex-wrap gap-6 mb-14 md:mb-20">
        <div className="mono text-xs tracking-[0.3em] text-white/50">WHAT I CAN DO</div>
        <div className="mono text-xs tracking-[0.3em] text-white/40 hidden md:block">
          HOVER TO PREVIEW
        </div>
      </div>

      <div className="relative">
        <ul className="space-y-1 md:space-y-2">
          {SKILLS.map((s, i) => (
            <li key={s.title}>
              <SkillRow
                skill={s}
                active={active === i}
                onEnter={() => setActive(i)}
                onLeave={() => setActive(null)}
                onMove={onMove}
              />
            </li>
          ))}
        </ul>

        {/* Floating preview image */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                left: Math.min(pos.x + 60, (containerRef.current?.clientWidth || 1200) - 460),
                top: Math.max(pos.y - 180, 0),
              }}
              className="pointer-events-none absolute z-10 w-[38vw] max-w-[440px] aspect-[4/3] overflow-hidden rounded-md shadow-2xl hidden md:block"
            >
              <img
                src={SKILLS[active].image}
                alt={SKILLS[active].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
