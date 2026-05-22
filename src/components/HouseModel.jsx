import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function HouseModel({ color = '#005596', hovered = false, clicked = false }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.06
    groupRef.current.rotation.y = hovered ? Math.sin(t * 2) * 0.1 : 0
    const scale = hovered ? 1.12 : 1
    groupRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1)
  })

  const wallColor = hovered ? '#ffffff' : color
  const roofColor = hovered ? '#82C341' : '#003d6b'
  const doorColor = '#82C341'
  const windowColor = '#a8d8ff'

  return (
    <group ref={groupRef}>
      {/* Base / Walls */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.7]} />
        <meshStandardMaterial color={wallColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Roof (prism via scaled rotated box trick) */}
      <mesh position={[0, 0.62, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.64, 0.64, 0.75]} />
        <meshStandardMaterial color={roofColor} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.22, 0.82, 0]} castShadow>
        <boxGeometry args={[0.1, 0.22, 0.1]} />
        <meshStandardMaterial color={roofColor} roughness={0.5} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.08, 0.355]}>
        <boxGeometry args={[0.18, 0.28, 0.02]} />
        <meshStandardMaterial color={doorColor} roughness={0.3} />
      </mesh>

      {/* Window left */}
      <mesh position={[-0.25, 0.26, 0.355]}>
        <boxGeometry args={[0.16, 0.14, 0.02]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.8} />
      </mesh>

      {/* Window right */}
      <mesh position={[0.25, 0.26, 0.355]}>
        <boxGeometry args={[0.16, 0.14, 0.02]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.3} transparent opacity={0.8} />
      </mesh>

      {/* Emissive glow when hovered */}
      {hovered && (
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.92, 0.52, 0.72]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.05} emissive="#82C341" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  )
}
