import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ value, duration = 1.4 }) => {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    // Parse numeric portion, animate that, keep prefix/suffix
    const match = String(value).match(/^(-?)([0-9]+\.?[0-9]*)(.*)$/);
    if (!match) return;
    const sign = match[1];
    const num = parseFloat(match[2]);
    const suffix = match[3] || '';
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = num * eased;
      const formatted = num % 1 === 0 ? Math.round(cur).toString() : cur.toFixed(1);
      setDisplay(`${sign}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

// Fake but plausible bar data per project - each bar animates its width
const getBars = (project) => {
  const map = {
    'marketplace-pulse': [
      { label: 'SUPPLY HEALTH', v: 92 },
      { label: 'CX SLA', v: 88 },
      { label: 'INCENTIVE ROI', v: 76 },
      { label: 'DEMAND MIX', v: 84 },
      { label: 'CHURN SIGNAL', v: 71 },
    ],
    'counter-economics': [
      { label: 'GROSS MARGIN', v: 68 },
      { label: 'SELL-THROUGH', v: 82 },
      { label: 'FORECAST ACC.', v: 89 },
      { label: 'STOCKOUT RATE', v: 22 },
      { label: 'CASH RUNWAY', v: 74 },
    ],
    'one-screen-city-ops': [
      { label: 'DASHBOARDS', v: 25 },
      { label: 'OPS LEADS', v: 78 },
      { label: 'ANSWER TIME', v: 40 },
      { label: 'DATA TRUST', v: 91 },
      { label: 'REVIEW SPEED', v: 65 },
    ],
    'zero-touch-reporting': [
      { label: 'PIPELINE UPTIME', v: 99 },
      { label: 'ERRORS AFTER GO-LIVE', v: 2 },
      { label: 'ANALYST HOURS SAVED', v: 76 },
      { label: 'MONDAY PREP', v: 12 },
      { label: 'REFRESH LATENCY', v: 8 },
    ],
  };
  return map[project.slug] || [];
};

const ChartReveal = ({ project }) => {
  const bars = getBars(project);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="px-6 md:px-16 pt-12 md:pt-16 pb-4 md:pb-8"
      aria-label="At a glance"
    >
      <div className="mono text-xs tracking-[0.3em] text-[#ff5f19] mb-8">AT A GLANCE</div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-start">
        {/* KPI numbers on the left */}
        <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-8">
          {project.results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
            >
              <div className="display-font text-5xl md:text-7xl leading-none text-white">
                {inView ? <Counter value={r.metric} /> : r.metric}
              </div>
              <div className="mt-3 mono text-[10px] md:text-[11px] tracking-[0.25em] text-white/50">
                {r.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated horizontal bar chart on the right */}
        <div className="md:col-span-8">
          <div className="rounded-md border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="mono text-[10px] tracking-[0.28em] text-white/50">SIGNAL BOARD</div>
              <div className="flex items-center gap-2 mono text-[10px] tracking-[0.25em] text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f19] animate-pulse" /> LIVE
              </div>
            </div>
            <ul className="space-y-4">
              {bars.map((b, i) => (
                <li key={b.label} className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-4 md:col-span-3 mono text-[10px] tracking-[0.2em] text-white/60">
                    {b.label}
                  </div>
                  <div className="col-span-6 md:col-span-8 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.v}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#ff8a3d] to-[#ff5f19]"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 mono text-xs text-white text-right tabular-nums">
                    {inView ? <Counter value={`${b.v}`} /> : b.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartReveal;
