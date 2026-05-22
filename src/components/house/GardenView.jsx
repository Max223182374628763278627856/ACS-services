import * as THREE from 'three'

/* ── Simple tree ── */
function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 1, 6]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.45, 10, 10]} />
        <meshStandardMaterial color="#3A7D44" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 1.15, 0.1]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#2D6A3A" roughness={0.8} />
      </mesh>
    </group>
  )
}

/* ── Flower ── */
function Flower({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.24, 4]} />
        <meshStandardMaterial color="#4A7C59" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

/* ── Watering can ── */
function WateringCan({ position, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('jardinage') }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Body */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.28, 10]} />
        <meshStandardMaterial color="#5B8C5A" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Spout */}
      <mesh position={[0.14, 0.18, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.025, 0.04, 0.22, 8]} />
        <meshStandardMaterial color="#4A7A49" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[-0.06, 0.26, 0]} rotation={[0, 0, 0.6]}>
        <torusGeometry args={[0.08, 0.018, 6, 10, Math.PI]} />
        <meshStandardMaterial color="#3D6B3C" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* ── Bay window ── */
function BayWindow({ position }) {
  const glassColor = '#A8D8EA'
  return (
    <group position={position}>
      {/* Frame top */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.6} />
      </mesh>
      {/* Frame bottom */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.6} />
      </mesh>
      {/* Frame left */}
      <mesh position={[-1.15, 0.3, 0]}>
        <boxGeometry args={[0.1, 2.1, 0.1]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.6} />
      </mesh>
      {/* Frame right */}
      <mesh position={[1.15, 0.3, 0]}>
        <boxGeometry args={[0.1, 2.1, 0.1]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.6} />
      </mesh>
      {/* Center mullion */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.06, 2.1, 0.08]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.6} />
      </mesh>
      {/* Glass panes */}
      <mesh position={[-0.55, 0.3, 0]}>
        <planeGeometry args={[1.0, 2.0]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.25} roughness={0} metalness={0.1} />
      </mesh>
      <mesh position={[0.55, 0.3, 0]}>
        <planeGeometry args={[1.0, 2.0]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.25} roughness={0} metalness={0.1} />
      </mesh>
    </group>
  )
}

export default function GardenView({ onSelect }) {
  const Z = -16

  return (
    <group>
      {/* Bay window opening — replaces right wall segment */}
      <BayWindow position={[3.05, 1.5, Z - 0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* Garden outside (x > 3) */}
      <group position={[4.2, 0, Z - 0.5]}>
        {/* Ground patch */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[3, 5]} />
          <meshStandardMaterial color="#6B9E4E" roughness={0.9} />
        </mesh>
        <Tree position={[0.4, 0, -1]} scale={1.1} />
        <Tree position={[-0.5, 0, 0.8]} scale={0.85} />
        <Tree position={[1.2, 0, 0.3]} scale={0.7} />
        {/* Flowers */}
        {[
          { p: [-0.3, 0, -0.2], c: '#FF6B9D' },
          { p: [0.2, 0, 0.4], c: '#FFD700' },
          { p: [0.6, 0, -0.5], c: '#FF8C00' },
          { p: [-0.7, 0, 0.6], c: '#DA70D6' },
          { p: [0.9, 0, 0.7], c: '#FF6347' },
        ].map(({ p, c }, i) => (
          <Flower key={i} position={p} color={c} />
        ))}
        {/* Garden light */}
        <pointLight position={[0, 2, 0]} intensity={1.8} color="#FFFACD" distance={6} decay={2} />
      </group>

      {/* Watering can near window */}
      <WateringCan position={[2.2, 0, Z + 0.8]} onSelect={onSelect} />

      {/* Bookshelf on left wall */}
      <group position={[-2.5, 0, Z - 1]}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.9, 1.8, 0.3]} />
          <meshStandardMaterial color="#6B4423" roughness={0.7} />
        </mesh>
        {/* Books */}
        {[0.5, 0.7, 0.9, 1.1, 1.3].map((y, i) => (
          <mesh key={i} position={[(i - 2) * 0.11, y, 0.08]}>
            <boxGeometry args={[0.09, 0.22, 0.15]} />
            <meshStandardMaterial color={['#C1440E', '#38bdf8', '#4ade80', '#fb923c', '#a78bfa'][i]} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Room light */}
      <pointLight position={[0, 2.7, Z]} intensity={1.3} color="#FFF8DC" distance={8} decay={2} />
      {/* Golden hour from outside */}
      <pointLight position={[5, 2, Z]} intensity={2} color="#FFD700" distance={8} decay={2} />
    </group>
  )
}
