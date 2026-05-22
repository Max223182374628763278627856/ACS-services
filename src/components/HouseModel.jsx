import { RoundedBox } from '@react-three/drei'

export default function HouseModel({ color = '#38bdf8', dark = '#0284c7', hovered = false }) {
  const c = hovered ? '#ffffff' : color
  const d = hovered ? color : dark

  return (
    <group>
      {/* Base walls */}
      <RoundedBox args={[0.9, 0.55, 0.72]} radius={0.07} smoothness={4} position={[0, 0.27, 0]} castShadow>
        <meshStandardMaterial color={c} roughness={0.3} metalness={0.2} />
      </RoundedBox>

      {/* Roof — 4-sided cone */}
      <mesh position={[0, 0.68, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.62, 0.42, 4]} />
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.15} />
      </mesh>

      {/* Chimney */}
      <RoundedBox args={[0.09, 0.2, 0.09]} radius={0.02} smoothness={4} position={[0.22, 0.82, 0]} castShadow>
        <meshStandardMaterial color={d} roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Door */}
      <RoundedBox args={[0.17, 0.26, 0.04]} radius={0.04} smoothness={4} position={[0, 0.12, 0.38]}>
        <meshStandardMaterial color={d} roughness={0.25} metalness={0.1} />
      </RoundedBox>

      {/* Window left */}
      <RoundedBox args={[0.15, 0.13, 0.04]} radius={0.03} smoothness={4} position={[-0.24, 0.3, 0.38]}>
        <meshStandardMaterial color="#e0f2fe" roughness={0.1} metalness={0.1} transparent opacity={0.9} />
      </RoundedBox>

      {/* Window right */}
      <RoundedBox args={[0.15, 0.13, 0.04]} radius={0.03} smoothness={4} position={[0.24, 0.3, 0.38]}>
        <meshStandardMaterial color="#e0f2fe" roughness={0.1} metalness={0.1} transparent opacity={0.9} />
      </RoundedBox>
    </group>
  )
}
