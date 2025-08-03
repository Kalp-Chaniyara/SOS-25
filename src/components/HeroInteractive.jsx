import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility: Throttle function
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Parallax background layers
function ParallaxLayers({ mouse, isMobile }) {
  // Layer configs: speed, color, size, opacity
  const layers = [
    { speed: 0.02, color: 'from-yellow-900 to-amber-900', opacity: 1, blur: 'blur-0', z: 0 },
    { speed: 0.06, color: 'from-[#FFD700]/30 to-[#FFA500]/20', opacity: 0.7, blur: 'blur-2xl', z: 1 },
    { speed: 0.12, color: 'from-[#FFA500]/20 to-[#FFD700]/10', opacity: 0.5, blur: 'blur-3xl', z: 2 },
  ];
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {layers.map((layer, i) => {
        // Parallax offset
        const x = isMobile ? 0 : (mouse.x - 0.5) * 100 * layer.speed;
        const y = isMobile ? 0 : (mouse.y - 0.5) * 100 * layer.speed;
        return (
          <motion.div
            key={i}
            className={`absolute w-[140vw] h-[140vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${layer.color} ${layer.blur}`}
            style={{
              opacity: layer.opacity,
              zIndex: layer.z,
              x,
              y,
              filter: `blur(${i * 12}px)`
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

// Particle trail
function ParticleTrail({ mouse, isMobile }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (!mouse.active) return;
    // Add new particle at mouse position
    setParticles((prev) => [
      ...prev,
      {
        x: mouse.clientX,
        y: mouse.clientY,
        id: Math.random(),
        color: Math.random() > 0.5 ? '#FFD700' : '#FFA500',
      },
    ]);
    // Remove old particles
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timeout);
  }, [mouse.clientX, mouse.clientY, mouse.active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            left: p.x - 8,
            top: p.y - 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 24px 8px ${p.color}80`,
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />
      ))}
    </div>
  );
}

// Ripple effect on click
function Ripple({ ripple, setRipple }) {
  return (
    <AnimatePresence>
      {ripple && (
        <motion.span
          className="pointer-events-none fixed z-40 rounded-full"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            background: 'radial-gradient(circle, #FFD70080 0%, #FFA50000 80%)',
            opacity: 0.7,
          }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 1.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => setRipple(null)}
        />
      )}
    </AnimatePresence>
  );
}

// Central hero card/logo with tilt and glow
function HeroCard({ mouse, isMobile }) {
  // Calculate tilt based on mouse position
  const tiltX = isMobile ? 0 : (mouse.y - 0.5) * 20;
  const tiltY = isMobile ? 0 : (mouse.x - 0.5) * 20;
  return (
    <motion.div
      className="relative w-80 h-80 mx-auto flex items-center justify-center rounded-3xl bg-black/60 shadow-2xl border-4 border-[#FFD700]/30"
      style={{
        boxShadow: '0 0 40px #FFD70080, 0 0 80px #FFA50040',
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }}
      tabIndex={0}
      aria-label="IEEE Summer School Hero Card"
      whileHover={{ scale: 1.04, boxShadow: '0 0 60px #FFD700, 0 0 120px #FFA50060' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Neon logo or abstract SVG */}
      {/* <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" stroke="#FFD700" strokeWidth="6" filter="url(#glow)" />
        <circle cx="60" cy="60" r="30" stroke="#FFA500" strokeWidth="4" />
        <text x="60" y="68" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#fff" style={{ fontFamily: 'Inter, sans-serif' }}>IEEE</text>
        <defs>
          <filter id="glow" x="-20" y="-20" width="160" height="160">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg> */}
    </motion.div>
  );
}

// Main HeroInteractive component
export default function HeroInteractive() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, clientX: 0, clientY: 0, active: false });
  const [isMobile, setIsMobile] = useState(false);
  const [ripple, setRipple] = useState(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move handler (throttled)
  useEffect(() => {
    if (isMobile) return;
    const handleMove = throttle((e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse((m) => ({ ...m, x, y, clientX: e.clientX, clientY: e.clientY, active: true }));
    }, 16);
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  // Touch move for mobile (particle trail only)
  useEffect(() => {
    if (!isMobile) return;
    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        setMouse((m) => ({ ...m, clientX: t.clientX, clientY: t.clientY, active: true }));
      }
    };
    window.addEventListener('touchmove', handleTouch);
    return () => window.removeEventListener('touchmove', handleTouch);
  }, [isMobile]);

  // Ripple effect on click/tap
  useEffect(() => {
    const handleClick = (e) => {
      setRipple({ x: e.clientX, y: e.clientY, size: 180 + Math.random() * 60 });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Scroll to #main-content on button click
  const handleEnter = () => {
    const el = document.getElementById('main-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-900 via-[#8B4513] to-amber-900"
      aria-label="Interactive Hero Section"
    >
      {/* Parallax background */}
      <ParallaxLayers mouse={mouse} isMobile={isMobile} />
      {/* Particle/cursor trail */}
      <ParticleTrail mouse={mouse} isMobile={isMobile} />
      {/* Ripple click effect */}
      <Ripple ripple={ripple} setRipple={setRipple} />
      {/* Centered hero card/logo */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <HeroCard mouse={mouse} isMobile={isMobile} />
      </div>
      {/* Enter Site button */}
      {/* <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
        <motion.button
          className="px-10 py-5 rounded-full bg-black/70 text-white font-extrabold text-2xl shadow-lg border-2 border-[#FFD700] focus:outline-none focus:ring-4 focus:ring-[#FFD700]"
          whileHover={{ scale: 1.1, boxShadow: '0 0 40px #FFD700, 0 0 80px #FFA50060' }}
          animate={{ scale: [1, 1.05, 1], boxShadow: [
            '0 0 40px #FFD70080, 0 0 80px #FFA50040',
            '0 0 60px #FFD700, 0 0 120px #FFA50060',
            '0 0 40px #FFD70080, 0 0 80px #FFA50040',
          ] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleEnter}
          tabIndex={0}
          aria-label="Enter Site"
        >
          Enter Site
        </motion.button>
      </div> */}
      {/* Optional: overlay for readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" aria-hidden />
    </section>
  );
} 