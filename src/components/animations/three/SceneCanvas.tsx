import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, type ReactNode } from 'react'

interface SceneCanvasProps {
  children: ReactNode
  autoRotate?: boolean
  camera?: [number, number, number]
}

export function SceneCanvas({
  children,
  autoRotate = false,
  camera = [5, 4, 7],
}: SceneCanvasProps) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.75]} camera={{ position: camera, fov: 42 }}>
        <color attach="background" args={['#050810']} />
        <fog attach="fog" args={['#050810', 10, 28]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 8, 5]} intensity={1.4} color="#c4b5fd" />
        <pointLight position={[-5, 2, 6]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[0, -4, 3]} intensity={0.35} color="#f472b6" />
        <OrbitControls
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.35}
          minDistance={4}
          maxDistance={16}
          maxPolarAngle={Math.PI / 1.85}
        />
        <gridHelper args={[12, 12, '#1e293b', '#111827']} position={[0, -2.2, 0]} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
