import React, { useRef, useEffect } from 'react';

function randomColor() {
  const r = Math.random();
  if (r < 0.5) return '#fff';
  if (r < 0.75) return '#00FFFF';
  return '#FF00FF';
}

export default function StarfieldBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    let stars = [];
    const STAR_COUNT = isMobile ? 60 : 120;
    // Initialize stars
    function initStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 1,
        size: Math.random() * 1.2 + 0.6,
        color: randomColor(),
        speed: Math.random() * 0.15 + 0.05,
      }));
    }
    initStars();

    // Handle resize
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse move for parallax
    function handleMouse(e) {
      mouse.current.x = e.clientX / width;
      mouse.current.y = e.clientY / height;
    }
    if (!isMobile) window.addEventListener('mousemove', handleMouse);

    // Animate
    function animate() {
      ctx.clearRect(0, 0, width, height);
      // Parallax/tilt
      const px = (mouse.current.x - 0.5) * 60;
      const py = (mouse.current.y - 0.5) * 40;
      for (let star of stars) {
        // Move star
        star.y += star.speed * star.z;
        if (star.y > height + 10) {
          star.x = Math.random() * width;
          star.y = -10;
          star.z = Math.random() * 2 + 1;
          star.size = Math.random() * 1.2 + 0.6;
          star.color = randomColor();
        }
        // Draw star
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(
          star.x + px * star.z,
          star.y + py * star.z,
          star.size * star.z,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-[#0A0F2C]/90 pointer-events-none z-10" aria-hidden />
    </div>
  );
} 