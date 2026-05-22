import { RoundedBox } from '@react-three/drei'

export default function CarModel({ color = '#fb923c', dark = '#ea580c', hovered = false }) {
  const c = hovered ? '#ffffff' : color
  const d = hovered ? color : dark

  const wheelPositions = [
    [-0.33, -0.05, 0.28],
    [ 0.33, -0.05, 0.28],
    [-0.33, -0.05, -0.28],
    [ 0.33, -0.05, -0.28],
  ]

  return (
    <group>
      {/* Lower body */}
      <RoundedBox args={[1.0, 0.24, 0.52]} radius={0.07} smoothness={4} position={[0, 0.12, 0]} castShadow>
        <meshStandardMaterial color={c} roughness={0.3} metalness={0.2} />
      </RoundedBox>

      {/* Upper cabin */}
      <RoundedBox args={[0.58, 0.24, 0.46]} radius={0.09} smoothness={4} position={[0.02, 0.35, 0]} castShadow>
        <meshStandardMaterial color={c} roughness={0.3} metalness={0.2} />
      </RoundedBox>

      {/* Windshield */}
      <RoundedBox args={[0.18, 0.18, 0.42]} radius={0.04} smoothness={4} position={[0.24, 0.35, 0]}>
        <meshStandardMaterial color="#bae6fd" roughness={0.05} metalness={0.1} transparent opacity={0.8} />
      </RoundedBox>

      {/* Rear window */}
      <RoundedBox args={[0.14, 0.16, 0.4]} radius={0.04} smoothness={4} position={[-0.22, 0.35, 0]}>
        <meshStandardMaterial color="#bae6fd" roughness={0.05} metalness={0.1} transparent opacity={0.8} />
      </RoundedBox>

      {/* Headlights */}
      <RoundedBox args={[0.04, 0.06, 0.1]} radius={0.01} smoothness={4} position={[0.52, 0.1, 0.16]}>
        <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={hovered ? 2 : 0.6} />
      </RoundedBox>
      <RoundedBox args={[0.04, 0.06, 0.1]} radius={0.01} smoothness={4} position={[0.52, 0.1, -0.16]}>
        <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={hovered ? 2 : 0.6} />
      </RoundedBox>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.115, 0.115, 0.07, 20]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.068, 0.068, 0.075, 8]} />
            <meshStandardMaterial color={d} roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
