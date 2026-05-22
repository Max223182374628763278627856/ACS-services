import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function LaptopModel({ color = '#82C341', hovered = false }) {
  const groupRef = useRef()
  const lidRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 1.3 + 3) * 0.06
    if (lidRef.current) {
      lidRef.current.rotation.x = hovered
        ? -0.55 + Math.sin(t * 2) * 0.05
        : -0.65
    }
    const scale = hovered ? 1.12 : 1
    groupRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1)
  })

  const bodyColor = hovered ? '#ffffff' : color
  const screenColor = '#0a1628'

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.85, 0.06, 0.58]} />
        <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, 0.035, 0.02]}>
        <boxGeometry args={[0.7, 0.01, 0.42]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>

      {/* Touchpad */}
      <mesh position={[0, 0.035, 0.19]}>
        <boxGeometry args={[0.22, 0.01, 0.12]} />
        <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Screen lid */}
      <group ref={lidRef} position={[0, 0.03, -0.25]} rotation={[-0.65, 0, 0]}>
        {/* Lid back */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[0.85, 0.54, 0.05]} />
          <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.26, 0.026]}>
          <boxGeometry args={[0.72, 0.44, 0.01]} />
          <meshStandardMaterial color={screenColor} roughness={0.05} emissive="#005596" emissiveIntensity={hovered ? 0.8 : 0.3} />
        </mesh>
        {/* ACS logo on screen */}
        <mesh position={[0, 0.26, 0.032]}>
          <boxGeometry args={[0.1, 0.06, 0.01]} />
          <meshStandardMaterial color="#82C341" emissive="#82C341" emissiveIntensity={1.2} transparent opacity={0.9} />
        </mesh>
        {/* Camera dot */}
        <mesh position={[0, 0.48, 0.027]}>
          <circleGeometry args={[0.015, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {hovered && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.09, 0.61]} />
          <meshStandardMaterial color="#82C341" transparent opacity={0.06} emissive="#82C341" emissiveIntensity={0.6} />
        </mesh>
      )}
    </group>
  )
}
