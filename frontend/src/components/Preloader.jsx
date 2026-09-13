import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HELLO_LANGS } from '../mock';

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === HELLO_LANGS.length - 1) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('start-ambient-audio'));
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 180);

    return () => clearTimeout(interval);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
    >
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.12 }}
        className="display-font text-5xl md:text-7xl text-white tracking-tight text-center px-4"
      >
        {HELLO_LANGS[index]}
      </motion.p>
    </motion.div>
  );
};

export default Preloader;