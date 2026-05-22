const DARK_WOOD = '#5C3A1E'
const MID_WOOD = '#6B4423'

function Laptop({ position, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('contact') }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Base */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.38, 0.03, 0.26]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Screen */}
      <group position={[0, 0.15, -0.11]} rotation={[-0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.26, 0.02]} />
          <meshStandardMaterial color="#2D2D2D" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.33, 0.22]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} roughness={0} />
        </mesh>
        {/* ACS on screen */}
        {['A', 'C', 'S'].map((_, i) => (
          <mesh key={i} position={[-0.04 + i * 0.04, 0.01, 0.015]}>
            <boxGeometry args={[0.028, 0.04, 0.005]} />
            <meshStandardMaterial color={i === 1 ? '#4ade80' : '#fff'} emissive={i === 1 ? '#4ade80' : '#fff'} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
      {/* Screen light */}
      <pointLight position={[0, 0.3, -0.05]} intensity={0.5} color="#38bdf8" distance={1.5} decay={2} />
    </group>
  )
}

function Briefcase({ position, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('recrutement') }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Body */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.42, 0.3, 0.18]} />
        <meshStandardMaterial color="#4A3728" roughness={0.5} />
      </mesh>
      {/* Top edge */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.44, 0.04, 0.2]} />
        <meshStandardMaterial color="#3A2A1E" roughness={0.4} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[0.09, 0.018, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#8B7355" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Clasp */}
      <mesh position={[0, 0.25, 0.1]}>
        <boxGeometry args={[0.08, 0.05, 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function DeskPhone({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.22, 0.06, 0.18]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.4} />
      </mesh>
      {/* Handset */}
      <mesh position={[0.02, 0.1, 0]} rotation={[0, 0.3, -0.4]}>
        <capsuleGeometry args={[0.025, 0.16, 4, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      {/* Buttons */}
      {[[-0.04, 0, 0.04], [0, 0, 0.04], [0.04, 0, 0.04]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.065, p[2]]}>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 6]} />
          <meshStandardMaterial color="#555" roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Desk({ position }) {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.6, 0.06, 0.8]} />
        <meshStandardMaterial color={MID_WOOD} roughness={0.4} />
      </mesh>
      {/* Legs */}
      {[[-0.7, 0.37, -0.32], [0.7, 0.37, -0.32], [-0.7, 0.37, 0.32], [0.7, 0.37, 0.32]].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
          <meshStandardMaterial color={DARK_WOOD} roughness={0.5} />
        </mesh>
      ))}
      {/* Drawer unit */}
      <mesh position={[0.55, 0.35, 0]}>
        <boxGeometry args={[0.44, 0.7, 0.72]} />
        <meshStandardMaterial color="#7A5C3C" roughness={0.5} />
      </mesh>
    </group>
  )
}

function Chair({ position }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.52, 0.07, 0.52]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.6} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.78, 0.22]}>
        <boxGeometry args={[0.5, 0.55, 0.07]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.6} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.45, 8]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Base star */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 0.22, 0.03, Math.sin((i / 5) * Math.PI * 2) * 0.22]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 6]} />
          <meshStandardMaterial color="#555" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export default function Office({ onSelect }) {
  const Z = -24

  return (
    <group>
      {/* Desk */}
      <Desk position={[0.3, 0, Z + 1.2]} />

      {/* Laptop on desk */}
      <Laptop position={[-0.1, 0.78, Z + 1.05]} onSelect={onSelect} />

      {/* Phone on desk */}
      <DeskPhone position={[0.8, 0.78, Z + 1.0]} />

      {/* Briefcase on floor */}
      <Briefcase position={[1.0, 0, Z + 0.4]} onSelect={onSelect} />

      {/* Chair */}
      <Chair position={[0.3, 0, Z - 0.1]} />

      {/* Bookshelf on left wall */}
      <group position={[-2.4, 0, Z + 1.5]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.7, 2.2, 0.28]} />
          <meshStandardMaterial color={MID_WOOD} roughness={0.7} />
        </mesh>
        {[0.3, 0.7, 1.1, 1.5, 1.9].map((y, i) => (
          <mesh key={i} position={[(i % 2 === 0 ? -0.1 : 0.1), y, 0.09]}>
            <boxGeometry args={[0.44, 0.28, 0.12]} />
            <meshStandardMaterial color={['#C1440E', '#38bdf8', '#4ade80', '#fb923c', '#a78bfa'][i]} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Plant on corner */}
      <group position={[2.4, 0, Z + 1.8]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.28, 8]} />
          <meshStandardMaterial color="#C1440E" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#2D6A3A" roughness={0.8} />
        </mesh>
      </group>

      {/* Diploma / certificate frame on wall */}
      <mesh position={[2.7, 1.8, Z + 0.5]}>
        <boxGeometry args={[0.55, 0.42, 0.04]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.6} />
      </mesh>
      <mesh position={[2.71, 1.8, Z + 0.5]}>
        <boxGeometry args={[0.44, 0.32, 0.01]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.9} />
      </mesh>

      {/* Room light */}
      <pointLight position={[0, 2.7, Z + 1]} intensity={1.6} color="#FFB347" distance={8} decay={2} />
      {/* Desk lamp light */}
      <pointLight position={[0.3, 1.4, Z + 0.9]} intensity={1.2} color="#FFF3DC" distance={3} decay={2} />
    </group>
  )
}
