import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified animated sphere component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the sphere continuously
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial 
        color="#4B0082" 
        roughness={0.1}
        metalness={0.8}
        emissive="#4B0082"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

// Simplified floating particles
function Particles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}
      >
        <sphereGeometry args={[0.02]} />
        <meshBasicMaterial color="#00CED1" />
      </mesh>
    );
  }

  return <group ref={particlesRef}>{particles}</group>;
}

// Main 3D scene component
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />
        
        {/* 3D elements */}
        <AnimatedSphere />
        <Particles />
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}