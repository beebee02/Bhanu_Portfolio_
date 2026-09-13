import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import LetsWork from './components/LetsWork';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [loading, setLoading] = useState(true);

  // Force scroll back to top on page reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen relative selection:bg-[#ff5f19] selection:text-black">
      {/* Full-screen multilingual preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />

      {/* Top navigation deck */}
      {!loading && <Nav />}

      <main>
        <Hero />
        <Intro />
        <Projects />
        <Experience />
        <Skills />
        <Hobbies />
        <LetsWork />
      </main>

      <Footer />

      {/* Floating Ambient Sound Controller */}
      <AudioPlayer />
    </div>
  );
}

export default App;