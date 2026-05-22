import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const WALL_C   = '#D8C9A8'   // exterior warm beige
const TRIM_C   = '#7A5030'   // dark wood trim
const DOOR_C   = '#8B4513'   // door panel
const GOLD_C   = '#C9A040'
const STONE_C  = '#B0A088'

/* ── Potted plant ── */
function PottedPlant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.14, 0.11, 0.3, 10]} />
        <meshStandardMaterial color="#C1440E" roughness={0.85} />
      </mesh>
      {[
        [0, 0.55, 0, 0.22],
        [0.12, 0.45, 0.06, 0.16],
        [-0.1, 0.47, -0.05, 0.15],
        [0.06, 0.64, -0.07, 0.13],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 9, 9]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#2D6E3A' : '#3A8A4A'} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Main Facade ── */
export default function Facade() {
  const doorRef  = useRef()
  const scroll   = useScroll()

  useFrame(() => {
    if (!doorRef.current) return
    const t    = scroll.offset
    // Door opens during first 12% of scroll (page 1 of 5)
    const open = THREE.MathUtils.smoothstep(t, 0, 0.12)
    doorRef.current.rotation.y = -open * Math.PI * 0.68
  })

  const Z = 7   // facade front face z-position
  const W = 10  // facade total width

  return (
    <group>
      {/* ── SKY ── */}
      <mesh position={[0, 6, Z + 18]} rotation={[0.04, 0, 0]}>
        <planeGeometry args={[60, 24]} />
        <meshStandardMaterial color="#B8D8F0" roughness={1} />
      </mesh>
      {/* Horizon fade */}
      <mesh position={[0, 1.5, Z + 22]}>
        <planeGeometry args={[60, 5]} />
        <meshStandardMaterial color="#D4E8F5" roughness={1} transparent opacity={0.85} />
      </mesh>

      {/* ── EXTERIOR GROUND ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, Z + 7]}>
        <planeGeometry args={[20, 18]} />
        <meshStandardMaterial color="#9A8C70" roughness={0.92} />
      </mesh>
      {/* Path tiles */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, Z + 4]}>
          <planeGeometry args={[0.28, 6]} />
          <meshStandardMaterial color="#B0A088" roughness={0.88} />
        </mesh>
      ))}
      {/* Grass left / right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4, -0.005, Z + 4]}>
        <planeGeometry args={[6, 12]} />
        <meshStandardMaterial color="#5A8A3A" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, -0.005, Z + 4]}>
        <planeGeometry args={[6, 12]} />
        <meshStandardMaterial color="#5A8A3A" roughness={0.95} />
      </mesh>

      {/* ── FACADE WALL ── */}
      {/* Left wing */}
      <mesh position={[-(W / 2 - 1.55) / 2 - 0.62, 1.5, Z]}>
        <boxGeometry args={[(W / 2 - 1.55), 3, 0.28]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      {/* Right wing */}
      <mesh position={[(W / 2 - 1.55) / 2 + 0.62, 1.5, Z]}>
        <boxGeometry args={[(W / 2 - 1.55), 3, 0.28]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      {/* Top pediment (above door) */}
      <mesh position={[0, 2.62, Z]}>
        <boxGeometry args={[1.7, 0.52, 0.28]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      {/* Roof line */}
      <mesh position={[0, 3.06, Z]}>
        <boxGeometry args={[W + 0.5, 0.18, 0.34]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.55} />
      </mesh>
      {/* Cornice decoration */}
      <mesh position={[0, 2.98, Z + 0.1]}>
        <boxGeometry args={[W + 0.3, 0.06, 0.12]} />
        <meshStandardMaterial color="#C4B490" roughness={0.7} />
      </mesh>

      {/* ── WINDOW LEFT ── */}
      <group position={[-3.0, 1.7, Z + 0.01]}>
        <RoundedBox args={[1.1, 1.3, 0.06]} radius={0.04} smoothness={3}>
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.9, 1.1, 0.02]} />
          <meshStandardMaterial color="#A8D8EA" roughness={0} metalness={0.05} transparent opacity={0.35} />
        </mesh>
        {/* Cross mullion */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.92, 0.04, 0.015]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.12, 0.04, 0.015]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </mesh>
      </group>

      {/* ── WINDOW RIGHT ── */}
      <group position={[3.0, 1.7, Z + 0.01]}>
        <RoundedBox args={[1.1, 1.3, 0.06]} radius={0.04} smoothness={3}>
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.9, 1.1, 0.02]} />
          <meshStandardMaterial color="#A8D8EA" roughness={0} metalness={0.05} transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.92, 0.04, 0.015]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.12, 0.04, 0.015]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </mesh>
      </group>

      {/* ── DOOR FRAME ── */}
      {/* Top */}
      <mesh position={[0, 2.35, Z + 0.02]}>
        <boxGeometry args={[1.52, 0.14, 0.32]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.55} />
      </mesh>
      {/* Left jamb */}
      <mesh position={[-0.69, 1.14, Z + 0.02]}>
        <boxGeometry args={[0.14, 2.28, 0.32]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.55} />
      </mesh>
      {/* Right jamb */}
      <mesh position={[0.69, 1.14, Z + 0.02]}>
        <boxGeometry args={[0.14, 2.28, 0.32]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.55} />
      </mesh>

      {/* ── ANIMATED DOOR ── pivot at left edge (x = -0.56) ── */}
      <group position={[-0.56, 1.14, Z - 0.04]}>
        <group ref={doorRef}>
          {/* Door panel */}
          <mesh position={[0.56, 0, 0]}>
            <boxGeometry args={[1.12, 2.28, 0.072]} />
            <meshStandardMaterial color={DOOR_C} roughness={0.52} />
          </mesh>
          {/* Panel insets (4 decorative rectangles) */}
          {[
            [-0.14, 0.58], [0.14, 0.58],
            [-0.14, -0.18], [0.14, -0.18],
          ].map(([px, py], i) => (
            <mesh key={i} position={[px + 0.56, py, 0.04]}>
              <boxGeometry args={[0.36, 0.62, 0.022]} />
              <meshStandardMaterial color="#7A3C0E" roughness={0.6} />
            </mesh>
          ))}
          {/* Door knob */}
          <mesh position={[1.0, 0.05, 0.058]}>
            <sphereGeometry args={[0.042, 10, 10]} />
            <meshStandardMaterial color={GOLD_C} metalness={0.82} roughness={0.18} />
          </mesh>
          {/* Knob stem */}
          <mesh position={[1.0, 0.0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
            <meshStandardMaterial color={GOLD_C} metalness={0.82} roughness={0.18} />
          </mesh>
          {/* Keyhole */}
          <mesh position={[1.0, -0.1, 0.058]}>
            <cylinderGeometry args={[0.016, 0.016, 0.01, 8]} />
            <meshStandardMaterial color="#2A1A00" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      </group>

      {/* ── PORCH STEP ── */}
      <mesh position={[0, 0.055, Z + 1.0]}>
        <boxGeometry args={[2.8, 0.11, 1.4]} />
        <meshStandardMaterial color={STONE_C} roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.02, Z + 1.8]}>
        <boxGeometry args={[3.4, 0.04, 0.6]} />
        <meshStandardMaterial color={STONE_C} roughness={0.85} />
      </mesh>

      {/* ── POTTED PLANTS ── */}
      <PottedPlant position={[-1.0, 0.11, Z + 0.9]} />
      <PottedPlant position={[ 1.0, 0.11, Z + 0.9]} />

      {/* ── HOUSE NUMBER PLATE ── */}
      <mesh position={[0.85, 2.1, Z + 0.15]}>
        <boxGeometry args={[0.28, 0.16, 0.04]} />
        <meshStandardMaterial color={GOLD_C} metalness={0.7} roughness={0.25} />
      </mesh>

      {/* ── DOORBELL ── */}
      <mesh position={[0.78, 1.55, Z + 0.16]}>
        <cylinderGeometry args={[0.028, 0.028, 0.04, 10]} />
        <meshStandardMaterial color="#C0B090" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ── ACS SIGN above door ── */}
      <RoundedBox args={[0.72, 0.2, 0.05]} radius={0.04} smoothness={3} position={[0, 2.75, Z + 0.15]}>
        <meshStandardMaterial color={TRIM_C} roughness={0.5} />
      </RoundedBox>
      {['A','C','S'].map((_, i) => (
        <mesh key={i} position={[-0.14 + i * 0.14, 2.75, Z + 0.19]}>
          <boxGeometry args={[0.07, 0.1, 0.02]} />
          <meshStandardMaterial
            color={i === 1 ? '#4ade80' : '#38bdf8'}
            emissive={i === 1 ? '#4ade80' : '#38bdf8'}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* ── OUTDOOR LIGHTS (wall sconces) ── */}
      {[-1, 1].map((s, i) => (
        <group key={i} position={[s * 0.95, 2.08, Z + 0.18]}>
          <mesh>
            <boxGeometry args={[0.1, 0.22, 0.16]} />
            <meshStandardMaterial color={TRIM_C} roughness={0.55} />
          </mesh>
          <pointLight
            position={[0, -0.08, 0.12]}
            intensity={1.6} color="#FFD580" distance={3} decay={2}
          />
        </group>
      ))}

      {/* ── HEDGES either side ── */}
      {[-1, 1].map((s, i) => (
        <group key={i} position={[s * 3.8, 0, Z + 2.5]}>
          {[0, -1, -2].map((dz, j) => (
            <mesh key={j} position={[0, 0.4, dz * 0.9]}>
              <boxGeometry args={[0.9, 0.8, 0.8]} />
              <meshStandardMaterial color="#2A6030" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
