import React from 'react';
import { PROJECTS } from '../mock';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="relative px-6 md:px-16 py-20">
      <div className="mono text-xs tracking-[0.3em] text-[#ff5f19] mb-12">FEATURED WORK // 02</div>

      <div className="space-y-28">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-2xl bg-neutral-950/80 border border-white/10 p-6 md:p-10 shadow-2xl hover:border-white/25 transition-colors duration-300 transform-gpu"
          >
            {/* Project Image Box */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-8 bg-neutral-900">
              <img
                src={proj.image}
                alt={proj.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform-gpu group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="mono text-[10px] tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15">
                  {proj.company}
                </span>
                <span className="mono text-[10px] tracking-wider px-3 py-1 rounded-full bg-[#ff5f19]/90 text-black font-semibold">
                  {proj.badge}
                </span>
              </div>
            </div>

            {/* Project Content Description Under Image */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7 space-y-4">
                <div className="mono text-xs tracking-widest text-[#ff5f19] uppercase">
                  {proj.role} · {proj.duration}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                  {proj.title}
                  <ArrowUpRight className="h-6 w-6 text-neutral-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                  {proj.caption}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="mono text-[11px] px-3 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Metrics Box */}
              <div className="md:col-span-5 grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-6">
                {proj.results.map((res, rIdx) => (
                  <div key={rIdx} className={rIdx === 0 ? 'col-span-2' : ''}>
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {res.metric}
                    </div>
                    <div className="text-xs mono text-neutral-400 mt-1">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;