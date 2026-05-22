import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function BriefcaseModel({ color = '#82C341', hovered = false }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 1.4 + 1) * 0.06
    const scale = hovered ? 1.12 : 1
    groupRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1)
  })

  const bodyColor = hovered ? '#ffffff' : color
  const handleColor = hovered ? '#82C341' : '#005596'

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.85, 0.58, 0.3]} />
        <meshStandardMaterial color={bodyColor} roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <torusGeometry args={[0.18, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color={handleColor} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Clasp left */}
      <mesh position={[-0.18, 0.01, 0.17]}>
        <boxGeometry args={[0.08, 0.08, 0.04]} />
        <meshStandardMaterial color={handleColor} roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Clasp right */}
      <mesh position={[0.18, 0.01, 0.17]}>
        <boxGeometry args={[0.08, 0.08, 0.04]} />
        <meshStandardMaterial color={handleColor} roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Center divider line */}
      <mesh position={[0, 0, 0.155]}>
        <boxGeometry args={[0.86, 0.01, 0.01]} />
        <meshStandardMaterial color={handleColor} />
      </mesh>

      {hovered && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.61, 0.33]} />
          <meshStandardMaterial color="#82C341" transparent opacity={0.08} emissive="#82C341" emissiveIntensity={0.6} />
        </mesh>
      )}
    </group>
  )
}
