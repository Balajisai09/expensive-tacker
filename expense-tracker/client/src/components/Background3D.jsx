import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import rupeeNote from '../assets/500-rupee.png';

const CashNote = ({ position, rotationSpeed, floatSpeed, texture }) => {
  const mesh = useRef();

  // Random starting phase
  const randomPhase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    // Falling movement
    mesh.current.position.y -= floatSpeed * delta;

    // Reset if too low
    if (mesh.current.position.y < -15) {
      mesh.current.position.y = 15;
      mesh.current.position.x = (Math.random() - 0.5) * 30;
      mesh.current.position.z = (Math.random() - 0.5) * 10 - 5;
    }

    // Gentle swaying and spinning
    mesh.current.rotation.x += rotationSpeed[0] * delta;
    mesh.current.rotation.y += rotationSpeed[1] * delta;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime + randomPhase) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[2, 1]} /> {/* Aspect ratio of a note roughly 2:1 */}
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

const CashParticleSystem = () => {
  const texture = useLoader(THREE.TextureLoader, rupeeNote);

  const notes = useMemo(() => Array.from({ length: 40 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 30, // x spread
      (Math.random() - 0.5) * 30, // y spread
      (Math.random() - 0.5) * 10 - 5 // z spread
    ],
    rotationSpeed: [
      Math.random() * 0.5,
      Math.random() * 0.5
    ],
    floatSpeed: Math.random() * 0.5 + 0.2
  })), []);

  return (
    <>
      {notes.map((props, i) => (
        <CashNote key={i} {...props} texture={texture} />
      ))}
    </>
  );
};

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'radial-gradient(circle at center, #1a202c 0%, #000000 100%)' // Dark premium background
    }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 20, 10]} angle={0.3} penumbra={1} intensity={1} />
        <CashParticleSystem />
        <fog attach="fog" args={['#000000', 10, 40]} />
      </Canvas>
    </div>
  );
};

export default Background3D;
