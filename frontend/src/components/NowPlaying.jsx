import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NOW_PLAYING } from '../mock';

const NowPlaying = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExpanded(true), 2400);
    const t2 = setTimeout(() => setExpanded(false), 6200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="relative select-none pointer-events-auto"
      data-cursor="hover"
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full pl-3 pr-4 py-2 shadow-lg"
      >
        {/* Pulsing indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff5f19] opacity-60 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5f19]" />
        </span>

        <span className="mono text-[10px] tracking-[0.28em] text-white/80 uppercase">
          {NOW_PLAYING.status}
        </span>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expand"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden whitespace-nowrap flex items-center gap-2.5"
            >
              <span className="h-4 w-px bg-white/15" />
              <span className="text-xs text-white leading-none font-medium">{NOW_PLAYING.title}</span>
              <span className="mono text-[10px] tracking-[0.2em] text-[#ff5f19]">
                {NOW_PLAYING.hint}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default NowPlaying;