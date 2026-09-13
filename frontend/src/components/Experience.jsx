import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="relative px-6 md:px-16 py-24 md:py-32 border-t border-white/5">
      <div className="mono text-xs tracking-[0.3em] text-white/50 mb-6">EXPERIENCE</div>
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-16">Where I've built things</h2>

      <div className="space-y-14">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="grid md:grid-cols-12 gap-6 md:gap-10 pb-14 border-b border-white/10"
          >
            <div className="md:col-span-4">
              <div className="mono text-xs tracking-[0.25em] text-[#ff5f19]">{e.period}</div>
              <h3 className="text-2xl md:text-4xl font-semibold text-white mt-3">{e.company}</h3>
              <div className="mono text-sm text-white/60 mt-2">{e.role}</div>
            </div>
            <ul className="md:col-span-8 space-y-4">
              {e.bullets.map((b, j) => (
                <li key={j} className="flex gap-4 text-white/75 text-base md:text-lg leading-relaxed">
                  <span className="mono text-xs text-[#ff5f19] mt-2 flex-shrink-0">0{j + 1}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
