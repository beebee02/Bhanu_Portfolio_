import React from 'react';
import { motion } from 'framer-motion';
import { NOW_PLAYING_TRACK } from '../mock';
import { ExternalLink } from 'lucide-react';

const EQ = () => {
  const bars = [0.4, 0.9, 0.6, 1.0, 0.55, 0.85, 0.45];
  return (
    <div className="flex items-end gap-[3px] h-5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0.3 }}
          animate={{ scaleY: [0.3, h, 0.35, h * 0.7, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.1 + i * 0.12, ease: 'easeInOut' }}
          className="w-[3px] rounded-sm bg-[#1DB954] origin-bottom"
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
};

const PlaylistCard = () => {
  const t = NOW_PLAYING_TRACK;

  return (
    <motion.a
      href={t.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden rounded-md border border-white/10 bg-[#0d0d0d] hover:border-[#1DB954]/40 transition-colors duration-500"
    >
      {/* Background glow */}
      <div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(29,185,84,0.55) 0%, rgba(29,185,84,0) 65%)',
        }}
      />

      <div className="relative z-10 grid md:grid-cols-12 gap-6 p-6 md:p-8 items-center">
        {/* Album / Lyric Cover (No play button overlay) */}
        <div className="md:col-span-3 flex items-center gap-4">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-md overflow-hidden ring-1 ring-white/10 flex-shrink-0">
            <img 
              src={t.cover} 
              alt={`${t.track} cover art`} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="md:hidden">
            <div className="mono text-[10px] tracking-[0.3em] text-[#1DB954] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
              NOW PLAYING
            </div>
            <div className="mt-2 text-lg font-semibold text-white leading-tight">{t.track}</div>
            <div className="text-white/60 text-sm">{t.artist}</div>
          </div>
        </div>

        {/* Track meta */}
        <div className="md:col-span-6 hidden md:block">
          <div className="mono text-[10px] tracking-[0.3em] text-[#1DB954] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
            NOW POWERING LATE DRIVES
          </div>
          <div className="mt-3 text-2xl md:text-3xl font-semibold text-white leading-tight tracking-tight">
            {t.track}
          </div>
          <div className="mt-1 text-white/60 text-base">
            {t.artist} <span className="opacity-40 mx-2">·</span>
            <span className="opacity-60">{t.album}</span>
          </div>

          {/* Progress bar */}
          <div className="mt-5 flex items-center gap-3">
            <span className="mono text-[10px] text-white/50 tabular-nums w-9">{t.elapsed}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${t.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#1DB954]"
              />
            </div>
            <span className="mono text-[10px] text-white/50 tabular-nums w-9 text-right">
              {t.total}
            </span>
          </div>
        </div>

        {/* Equalizer & Spotify Link */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6">
          <EQ />
          <div className="flex items-center gap-3 mono text-[10px] tracking-[0.3em] text-white/60 group-hover:text-[#1DB954] transition-colors">
            <span className="hidden md:inline">SPOTIFY</span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden px-6 pb-6">
        <div className="flex items-center gap-3">
          <span className="mono text-[10px] text-white/50 tabular-nums w-9">{t.elapsed}</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#1DB954]" style={{ width: `${t.progress}%` }} />
          </div>
          <span className="mono text-[10px] text-white/50 tabular-nums w-9 text-right">
            {t.total}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default PlaylistCard;