import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Orb({ mousePos }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    // Réaction subtile à la souris
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mousePos.current.y * 0.3 + Math.sin(t * 0.4) * 0.1,
      0.04
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mousePos.current.x * 0.4 + t * 0.12,
      0.04
    )
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1}>
        <icosahedronGeometry args={[1.35, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.6}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={0.5}
          iridescenceIOR={1.2}
          iridescenceThicknessRange={[0, 1400]}
          color="#f0f9ff"
          transmission={0.97}
          roughness={0.08}
          metalness={0}
        />
      </mesh>
    </Float>
  )
}

function SmallOrb({ position, scale = 0.45, delay = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.18
    ref.current.rotation.y = t * 0.5
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshTransmissionMaterial
        samples={4}
        thickness={0.4}
        transmission={0.95}
        roughness={0.05}
        color="#e0f2fe"
        chromaticAberration={0.03}
        iridescence={0.8}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[0, 800]}
      />
    </mesh>
  )
}

export default function GlassOrb({ mousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Environment preset="dawn" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#e0f2fe" />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#c7d2fe" />

      <Orb mousePos={mousePos} />
      <SmallOrb position={[-2.2, 0.8, -1]} scale={0.38} delay={0} />
      <SmallOrb position={[2.0, -0.6, -0.5]} scale={0.28} delay={2} />
      <SmallOrb position={[1.4, 1.4, -0.8]} scale={0.22} delay={4} />
    </Canvas>
  )
}
