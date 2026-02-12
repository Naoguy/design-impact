'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import { Suspense } from 'react';

interface Model3DViewerProps {
  modelUrl?: string;
}

function BoxModel() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4ade80" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-500">Loading 3D model...</div>
    </div>
  );
}

export default function Model3DViewer({ modelUrl }: Model3DViewerProps) {
  return (
    <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <BoxModel />
          </Stage>
          <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
