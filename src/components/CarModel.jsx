import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CarModel({ color = '#005596', hovered = false }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 1.1 + 2) * 0.06
    const scale = hovered ? 1.12 : 1
    groupRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1)
  })

  const bodyColor = hovered ? '#ffffff' : color
  const glassColor = '#a8d8ff'
  const wheelColor = '#1a1a2e'
  const rimColor = '#c0c0c0'

  return (
    <group ref={groupRef}>
      {/* Lower body */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[1.0, 0.22, 0.42]} />
        <meshStandardMaterial color={bodyColor} roughness={0.25} metalness={0.2} />
      </mesh>

      {/* Upper cabin */}
      <mesh position={[0.02, 0.2, 0]} castShadow>
        <boxGeometry args={[0.56, 0.22, 0.38]} />
        <meshStandardMaterial color={bodyColor} roughness={0.25} metalness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.22, 0.2, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.22, 0.2, 0.34]} />
        <meshStandardMaterial color={glassColor} roughness={0.05} metalness={0.1} transparent opacity={0.75} />
      </mesh>

      {/* Rear window */}
      <mesh position={[-0.2, 0.2, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.18, 0.18, 0.34]} />
        <meshStandardMaterial color={glassColor} roughness={0.05} metalness={0.1} transparent opacity={0.75} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.51, -0.02, 0.14]}>
        <boxGeometry args={[0.04, 0.06, 0.1]} />
        <meshStandardMaterial color="#fffde0" emissive="#fffde0" emissiveIntensity={hovered ? 1.5 : 0.5} />
      </mesh>
      <mesh position={[0.51, -0.02, -0.14]}>
        <boxGeometry args={[0.04, 0.06, 0.1]} />
        <meshStandardMaterial color="#fffde0" emissive="#fffde0" emissiveIntensity={hovered ? 1.5 : 0.5} />
      </mesh>

      {/* Wheels x4 */}
      {[[-0.32, -0.15, 0.24], [0.32, -0.15, 0.24], [-0.32, -0.15, -0.24], [0.32, -0.15, -0.24]].map((pos, i) => (
        <group key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
            <meshStandardMaterial color={wheelColor} roughness={0.8} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.09, 8]} />
            <meshStandardMaterial color={rimColor} roughness={0.2} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {hovered && (
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[1.03, 0.25, 0.45]} />
          <meshStandardMaterial color="#005596" transparent opacity={0.06} emissive="#005596" emissiveIntensity={0.7} />
        </mesh>
      )}
    </group>
  )
}
