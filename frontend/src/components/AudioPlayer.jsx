import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = `${process.env.PUBLIC_URL || '/Bhanu_Portfolio_'}/ambient.mp3`;

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
          console.error('Audio playback failed:', err);
        });
    }
  };

  // Optional: listen for preloader event if triggered on initial user interaction
  useEffect(() => {
    const handleStartAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('start-ambient-audio', handleStartAudio);
    return () => window.removeEventListener('start-ambient-audio', handleStartAudio);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        className="w-12 h-12 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 shadow-xl"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#1DB954]" />
        ) : (
          <VolumeX className="w-5 h-5 text-neutral-400" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;