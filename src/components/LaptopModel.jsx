import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

export default function LaptopModel({ color = '#a78bfa', dark = '#7c3aed', hovered = false }) {
  const lidRef = useRef()

  useFrame((state) => {
    if (!lidRef.current) return
    const target = hovered ? -0.52 : -0.62
    lidRef.current.rotation.x += (target - lidRef.current.rotation.x) * 0.08
  })

  const c = hovered ? '#ffffff' : color
  const d = hovered ? color : dark

  return (
    <group>
      {/* Base */}
      <RoundedBox args={[0.88, 0.06, 0.6]} radius={0.04} smoothness={4} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color={c} roughness={0.25} metalness={0.25} />
      </RoundedBox>

      {/* Keyboard deck */}
      <RoundedBox args={[0.72, 0.015, 0.44]} radius={0.02} smoothness={4} position={[0, 0.038, 0.02]}>
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.05} />
      </RoundedBox>

      {/* Touchpad */}
      <RoundedBox args={[0.22, 0.01, 0.14]} radius={0.02} smoothness={4} position={[0, 0.038, 0.19]}>
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.2} transparent opacity={0.8} />
      </RoundedBox>

      {/* Screen lid */}
      <group ref={lidRef} position={[0, 0.03, -0.27]} rotation={[-0.62, 0, 0]}>
        {/* Lid back */}
        <RoundedBox args={[0.88, 0.56, 0.05]} radius={0.04} smoothness={4} position={[0, 0.28, 0]} castShadow>
          <meshStandardMaterial color={c} roughness={0.25} metalness={0.25} />
        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox args={[0.76, 0.46, 0.015]} radius={0.03} smoothness={4} position={[0, 0.28, 0.028]}>
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.1} />
        </RoundedBox>

        {/* Screen content */}
        <RoundedBox args={[0.68, 0.38, 0.01]} radius={0.02} smoothness={4} position={[0, 0.28, 0.033]}>
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.05}
            metalness={0.0}
            emissive={d}
            emissiveIntensity={hovered ? 0.9 : 0.35}
          />
        </RoundedBox>

        {/* ACS badge on screen */}
        <RoundedBox args={[0.12, 0.06, 0.005]} radius={0.01} smoothness={4} position={[0, 0.28, 0.036]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} transparent opacity={0.9} />
        </RoundedBox>

        {/* Camera dot */}
        <mesh position={[0, 0.495, 0.03]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
