import React from 'react';

const words = ['SQL', 'PYTHON', 'TABLEAU', 'FORECASTING', 'KPI FRAMEWORKS', 'AUTOMATION', 'STORYTELLING', 'DASHBOARDS'];

const Marquee = () => {
  const line = [...words, ...words];
  return (
    <section className="relative border-y border-white/10 bg-[#0a0a0a] overflow-hidden py-8">
      <div className="flex marquee-track whitespace-nowrap">
        {line.map((w, i) => (
          <span
            key={i}
            className="display-font text-5xl md:text-7xl px-8 text-white/90 flex items-center gap-8"
          >
            {w}
            <span className="h-3 w-3 rounded-full bg-[#ff5f19] inline-block" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
