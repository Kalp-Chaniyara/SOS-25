import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

// Custom hook for mouse position (throttled to 60fps)
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    let ticking = false;
    const handle = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPos({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);
  return pos;
}

// Helper: create a blob path from control points
function createBlobPath(points) {
  const size = points.length;
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < size; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % size];
    d += ` Q ${(p1.x + p2.x) / 2},${(p1.y + p2.y) / 2} ${p2.x},${p2.y}`;
  }
  d += ' Z';
  return d;
}

export default function LiquidBlobInteractive() {
  // Responsive: detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse position (centered if mobile)
  const mouse = useMousePosition();
  const mouseX = isMobile ? 0.5 : mouse.x;
  const mouseY = isMobile ? 0.5 : mouse.y;

  // Blob config
  const POINTS = 8;
  const RADIUS = 260;
  const CENTER = { x: 480, y: 340 };
  const [baseAngles] = useState(
    Array.from({ length: POINTS }, (_, i) => (i / POINTS) * Math.PI * 2)
  );
  // Animated control points
  const [points, setPoints] = useState(
    baseAngles.map((a) => ({ x: CENTER.x + Math.cos(a) * RADIUS, y: CENTER.y + Math.sin(a) * RADIUS }))
  );

  // Animate blob morphing
  useEffect(() => {
    let frame;
    function animateBlob() {
      setPoints((prev) =>
        prev.map((pt, i) => {
          // Base angle for this point
          const angle = baseAngles[i];
          // Morph: oscillate radius
          const t = Date.now() * 0.001;
          let r = RADIUS + Math.sin(t * 1.2 + i) * 32 + Math.cos(t * 0.7 + i * 1.7) * 18;
          // Mouse/cursor repulsion
          const dx = pt.x - mouseX * 960;
          const dy = pt.y - mouseY * 680;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (!isMobile && dist < 180) {
            r += (180 - dist) * 0.7;
          }
          // Animate to new position
          return {
            x: CENTER.x + Math.cos(angle) * r,
            y: CENTER.y + Math.sin(angle) * r,
          };
        })
      );
      frame = requestAnimationFrame(animateBlob);
    }
    animateBlob();
    return () => cancelAnimationFrame(frame);
  }, [baseAngles, mouseX, mouseY, isMobile]);

  // Gradient hue shift based on mouse X
  const hue = 45 + (mouseX - 0.5) * 30; // 45 = yellow, 60 = orange
  const gradientId = 'liquid-blob-gradient';

  // Glow/blur effect
  const glowOpacity = isMobile ? 0.18 : 0.22 + Math.abs(mouseX - 0.5) * 0.18;

  // SVG path for blob
  const path = createBlobPath(points);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 960 680"
        className="absolute inset-0 w-full h-full"
        style={{ background: '#2C1F0A' }}
        aria-hidden
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${hue + 80}, 80%, 70%)`} />
          </radialGradient>
        </defs>
        {/* Glow/blur behind blob */}
        <motion.path
          d={path}
          fill={`url(#${gradientId})`}
          style={{ filter: `blur(32px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: glowOpacity }}
          transition={{ duration: 0.5 }}
        />
        {/* Main blob */}
        <motion.path
          d={path}
          fill={`url(#${gradientId})`}
          style={{ filter: 'blur(2.5px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      {/* Optional: overlay for readability */}
      <div className="absolute inset-0 bg-[#2C1F0A]/80 pointer-events-none z-10" aria-hidden />
    </div>
  );
} 