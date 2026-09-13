import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PERSONAL } from '../mock';
import Nav from '../components/Nav';
import ChartReveal from '../components/ChartReveal';

const ProjectDetail = () => {
  const { slug } = useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? PROJECTS[idx] : null;
  const next = project ? PROJECTS[(idx + 1) % PROJECTS.length] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="mono text-xs tracking-[0.3em] text-white/50">404</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium">Project not found</h1>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 mono text-xs tracking-[0.3em] text-white/70 hover:text-[#ff5f19]"
          >
            <ArrowLeft className="h-4 w-4" /> BACK HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* Header */}
      <header className="relative px-6 md:px-16 pt-32 md:pt-40 pb-12">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 mono text-xs tracking-[0.3em] text-white/60 hover:text-[#ff5f19] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> ALL PROJECTS
        </Link>

        <div className="mt-10 flex items-center gap-3 mono text-[11px] tracking-[0.3em] text-white/50">
          <span>{project.role}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>{project.company}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>{project.year}</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 display-font text-6xl md:text-9xl leading-[0.9] tracking-tight"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-xl md:text-3xl text-white/75 leading-snug max-w-4xl"
        >
          {project.caption}
        </motion.p>
      </header>

      {/* Cover image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="px-6 md:px-16"
      >
        <div className="relative overflow-hidden rounded-md border border-white/5">
          <img src={project.image} alt={project.title} className="w-full object-cover" />
        </div>
      </motion.div>

      {/* Animated KPI + chart reveal */}
      <ChartReveal project={project} />

      {/* Meta strip */}
      <section className="px-6 md:px-16 py-16 md:py-20 grid md:grid-cols-4 gap-8 border-b border-white/10">
        <div>
          <div className="mono text-[10px] tracking-[0.3em] text-white/40">YEAR</div>
          <div className="mt-2 text-lg text-white">{project.year}</div>
        </div>
        <div>
          <div className="mono text-[10px] tracking-[0.3em] text-white/40">DURATION</div>
          <div className="mt-2 text-lg text-white">{project.duration}</div>
        </div>
        <div>
          <div className="mono text-[10px] tracking-[0.3em] text-white/40">ROLE</div>
          <div className="mt-2 text-lg text-white">{project.role}</div>
        </div>
        <div>
          <div className="mono text-[10px] tracking-[0.3em] text-white/40">STACK</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="mono text-[11px] tracking-[0.15em] px-2.5 py-1 border border-white/15 rounded-full text-white/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="mono text-xs tracking-[0.3em] text-[#ff5f19]">01 / CONTEXT</div>
        </div>
        <div className="md:col-span-9">
          <p className="text-2xl md:text-3xl text-white leading-snug font-medium">{project.context}</p>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-12 gap-10 border-t border-white/10">
        <div className="md:col-span-3">
          <div className="mono text-xs tracking-[0.3em] text-[#ff5f19]">02 / THE PROBLEM</div>
        </div>
        <div className="md:col-span-9">
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">{project.problem}</p>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-12 gap-10 border-t border-white/10">
        <div className="md:col-span-3">
          <div className="mono text-xs tracking-[0.3em] text-[#ff5f19]">03 / APPROACH</div>
        </div>
        <ul className="md:col-span-9 space-y-6">
          {project.approach.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex gap-5 text-lg md:text-xl text-white/85 leading-relaxed"
            >
              <span className="mono text-xs tracking-[0.25em] text-[#ff5f19] flex-shrink-0 mt-2">
                0{i + 1}
              </span>
              <span>{a}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Results */}
      <section className="px-6 md:px-16 py-16 md:py-24 border-t border-white/10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="mono text-xs tracking-[0.3em] text-[#ff5f19]">04 / RESULTS</div>
          </div>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-6 rounded-md border border-white/10 bg-[#0d0d0d]"
              >
                <div className="display-font text-5xl md:text-6xl text-[#ff5f19] leading-none">
                  {r.metric}
                </div>
                <div className="mt-4 text-sm md:text-base text-white/70">{r.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Takeaway */}
      <section className="px-6 md:px-16 py-20 md:py-28 border-t border-white/10">
        <div className="mono text-xs tracking-[0.3em] text-white/50 mb-6">05 / TAKEAWAY</div>
        <p className="text-3xl md:text-5xl leading-tight font-medium text-white max-w-5xl">
          “{project.takeaway}”
        </p>
      </section>

      {/* Next project */}
      {next && (
        <section className="px-6 md:px-16 py-20 md:py-28 border-t border-white/10">
          <div className="mono text-xs tracking-[0.3em] text-white/50">NEXT PROJECT</div>
          <Link
            to={`/projects/${next.slug}`}
            data-cursor="hover"
            className="group mt-4 inline-flex items-center gap-6 flex-wrap"
          >
            <span className="display-font text-5xl md:text-8xl text-white group-hover:text-[#ff5f19] transition-colors leading-tight">
              {next.title}
            </span>
            <ArrowUpRight className="h-8 w-8 md:h-12 md:w-12 text-white group-hover:text-[#ff5f19] group-hover:rotate-45 transition-all" />
          </Link>
        </section>
      )}

      <footer className="px-6 md:px-16 py-10 border-t border-white/10">
        <div className="mono text-xs tracking-[0.25em] text-white/50">
          © {new Date().getFullYear()} — {PERSONAL.firstName} Teja.
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
