import { RoundedBox } from '@react-three/drei'

export default function BriefcaseModel({ color = '#4ade80', dark = '#16a34a', hovered = false }) {
  const c = hovered ? '#ffffff' : color
  const d = hovered ? color : dark

  return (
    <group>
      {/* Main body */}
      <RoundedBox args={[0.88, 0.62, 0.32]} radius={0.08} smoothness={4} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color={c} roughness={0.3} metalness={0.2} />
      </RoundedBox>

      {/* Centre divider strip */}
      <RoundedBox args={[0.9, 0.04, 0.34]} radius={0.02} smoothness={4} position={[0, 0.02, 0]}>
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.3} />
      </RoundedBox>

      {/* Handle — torus arc */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.19, 0.035, 8, 20, Math.PI]} />
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Handle base left */}
      <RoundedBox args={[0.06, 0.08, 0.06]} radius={0.02} smoothness={4} position={[-0.19, 0.31, 0]}>
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.4} />
      </RoundedBox>

      {/* Handle base right */}
      <RoundedBox args={[0.06, 0.08, 0.06]} radius={0.02} smoothness={4} position={[0.19, 0.31, 0]}>
        <meshStandardMaterial color={d} roughness={0.2} metalness={0.4} />
      </RoundedBox>

      {/* Clasp center */}
      <RoundedBox args={[0.12, 0.07, 0.05]} radius={0.02} smoothness={4} position={[0, 0.02, 0.18]}>
        <meshStandardMaterial color={d} roughness={0.1} metalness={0.6} />
      </RoundedBox>
    </group>
  )
}
