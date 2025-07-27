import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function WaveGrid({ mouse }) {
  const group = useRef();
  const [points, setPoints] = useState([]);
  const ROWS = 18;
  const COLS = 32;
  const SPACING = 0.35;

  // Generate grid points
  useEffect(() => {
    const pts = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        pts.push({
          x: (j - COLS / 2) * SPACING,
          y: (i - ROWS / 2) * SPACING,
          z: 0,
          color:
            Math.random() > 0.66
              ? '#00FFFF'
              : Math.random() > 0.5
              ? '#FF00FF'
              : '#fff',
        });
      }
    }
    setPoints(pts);
  }, []);

  // Animate wave and mouse parallax
  useFrame(({ clock }) => {
    if (group.current) {
      // Parallax/tilt
      group.current.rotation.x = (mouse.y - 0.5) * 0.6;
      group.current.rotation.y = (mouse.x - 0.5) * 0.6;
      // Animate z for wave
      group.current.children.forEach((mesh, idx) => {
        const pt = points[idx];
        if (!pt) return;
        const t = clock.getElapsedTime();
        mesh.position.z =
          Math.sin(pt.x * 1.2 + t * 1.2) * 0.18 +
          Math.cos(pt.y * 1.2 + t * 1.1) * 0.18;
      });
    }
  });

  return (
    <group ref={group}>
      {points.map((pt, i) => (
        <mesh key={i} position={[pt.x, pt.y, pt.z]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color={pt.color} emissive={pt.color} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDLayer() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <WaveGrid mouse={mouse} />
      </Canvas>
    </div>
  );
} 