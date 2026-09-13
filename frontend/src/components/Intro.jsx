import React from 'react';
import { motion } from 'framer-motion';
import { INTRO, PERSONAL } from '../mock';
import { FileText, ArrowUpRight, Camera } from 'lucide-react';

const Intro = () => {
  return (
    <section id="about" className="relative px-6 md:px-16 pt-28 md:pt-40 pb-10 md:pb-16">
      <div className="mono text-xs tracking-[0.3em] text-white/50 mb-10">ABOUT // 01</div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold tracking-tight text-white max-w-[1100px]"
          >
            {INTRO.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-8 text-xl md:text-2xl text-neutral-400 font-mono leading-relaxed max-w-[900px]"
          >
            {INTRO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 md:mt-12 flex flex-wrap items-center gap-4"
          >
            {/* View Resume Button */}
            <a
              href={`${process.env.PUBLIC_URL || '/Bhanu-Teja'}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#ff5f19] text-black font-semibold hover:bg-white transition-colors duration-300"
            >
              <FileText className="h-4 w-4" />
              <span>View resume</span>
            </a>

            {/* VSCO Gallery Pill */}
            <a
              href={PERSONAL.vsco || 'https://vsco.co/worldofbee'}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 hover:border-[#ff5f19] hover:bg-[#ff5f19]/10 transition-all duration-300 bg-white/5 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4 text-[#ff5f19] transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium text-white">VSCO Gallery</span>
              <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </motion.div>

          {/* Signature name tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 md:mt-12 flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-white/20">
              <img
                src={INTRO.photo}
                alt={PERSONAL.firstName}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mono text-xs tracking-[0.3em] text-white/70 uppercase">
              {PERSONAL.firstName} Teja
            </div>
          </motion.div>
        </div>
      </div>

      {/* Selected Works banner */}
      <div className="relative mt-28 md:mt-40">
        <motion.h3
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-font text-white leading-[0.85] tracking-tight text-[18vw] md:text-[15vw]"
        >
          SELECTED WORKS
        </motion.h3>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-2 mono text-[11px] tracking-[0.3em] text-white/60">
          <span>ANALYTICS</span>
          <span>DASHBOARDS</span>
          <span>FORECASTING</span>
          <span>AUTOMATION</span>
        </div>
      </div>
    </section>
  );
};

export default Intro;