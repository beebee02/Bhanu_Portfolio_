import React, { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      setEnabled(false);
      return;
    }

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const onOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      const hit = target.closest('a, button, input, textarea, [data-cursor="hover"]');
      setHovering(!!hit);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    let raf;
    const tick = () => {
      // dot follows cursor 1:1
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      // ring trails with easing
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[300] rounded-full border transition-[width,height,background-color,border-color,opacity] duration-200 ease-out mix-blend-difference ${
          hovering
            ? 'w-14 h-14 border-[#ff5f19] bg-[#ff5f19]/20'
            : 'w-9 h-9 border-white/70'
        }`}
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[301] h-1.5 w-1.5 rounded-full bg-[#ff5f19]"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
    </>
  );
};

export default Cursor;
