import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const dragOriginRef = useRef({ x: 0, y: 0 });

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio playback error:', err);
        });
    }
  };

  const handlePointerDown = (e) => {
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    // Calculate distance moved between press down and release
    const deltaX = Math.abs(e.clientX - dragOriginRef.current.x);
    const deltaY = Math.abs(e.clientY - dragOriginRef.current.y);
    const totalDistance = Math.hypot(deltaX, deltaY);

    // If movement is under 6px, treat as a clean tap/click
    if (totalDistance < 6) {
      togglePlay();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/ambient.mp3" loop preload="auto" />

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        initial={{ x: 0, y: 0 }}
        data-cursor="hover"
        className="fixed bottom-6 right-6 z-50 select-none cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          type="button"
          aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-[#ff5f19] hover:text-[#ff5f19] transition-colors pointer-events-none"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse text-[#ff5f19]" />
          ) : (
            <VolumeX className="w-5 h-5 text-neutral-400" />
          )}
        </button>
      </motion.div>
    </>
  );
};

export default AudioPlayer;