import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PERSONAL } from '../mock';
import NowPlaying from './NowPlaying';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile split BHANUTEJA into two lines
  const lines = isMobile ? [PERSONAL.name.slice(0, 5), PERSONAL.name.slice(5)] : [PERSONAL.name];

  const { scrollY } = useScroll();

  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const progress = useTransform(scrollY, [0, vh * 0.9], [0, 1]);
  const smooth = useSpring(progress, { stiffness: 120, damping: 22, mass: 0.4 });

  const scale = useTransform(smooth, [0, 1], [1, 0.11]);
  const xShift = useTransform(smooth, [0, 1], ['0vw', '-42vw']);
  const yShift = useTransform(smooth, [0, 1], ['0vh', '-38vh']);
  const glowOpacity = useTransform(smooth, [0, 0.6, 1], [1, 0.25, 0]);
  const bgOpacity = useTransform(smooth, [0, 1], [1, 0]);

  return (
    <section
      id="top"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 orange-radial" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent"
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />

      {/* Positioned comfortably below the clock (top-28 on desktop, top-24 on mobile) */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-24 right-6 md:top-28 md:right-12 z-30 pointer-events-auto flex justify-end"
      >
        <NowPlaying />
      </motion.div>

      {/* Centered giant name */}
      <div className="relative z-20 w-full px-2 md:px-4 pointer-events-none">
        <motion.h1
          style={{ scale, x: xShift, y: yShift }}
          className="big-name name-glow text-white text-[26vw] md:text-[22vw] leading-[0.9] text-center select-none origin-center will-change-transform"
        >
          {lines.map((line, li) => (
            <div key={li} className="block text-white">
              {line.split('').map((l, i) => (
                <motion.span
                  key={`${li}-${i}`}
                  initial={{ y: 140, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 * (li * 5 + i),
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-white"
                >
                  {l}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: glowOpacity }}
        className="absolute bottom-8 right-8 z-30 mono text-[10px] tracking-[0.3em] text-white/70 hidden md:block"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
};

export default Hero;