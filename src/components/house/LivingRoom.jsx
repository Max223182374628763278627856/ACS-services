import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const SOFA_COLOR = '#8B7355'
const RUG_COLOR = '#C1440E'

/* ── Elderly person (primitives) ── */
function ElderlyPerson({ position }) {
  const armRef = useRef()
  const scroll = useScroll()

  useFrame(() => {
    if (!armRef.current) return
    const t = scroll.offset
    // Wave arm when camera is in living-room range (offset 0.25–0.6)
    const inRange = t > 0.25 && t < 0.6
    const targetRot = inRange ? -Math.PI * 0.65 + Math.sin(Date.now() * 0.004) * 0.15 : 0
    armRef.current.rotation.z = THREE.MathUtils.lerp(armRef.current.rotation.z, targetRot, 0.04)
  })

  return (
    <group position={position}>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.32, 0.45, 0.2]} />
        <meshStandardMaterial color="#6B8E9F" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.07, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#FDBCB4" roughness={0.7} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.18, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#D8D8D8" roughness={0.9} />
      </mesh>
      {/* Left arm (static) */}
      <mesh position={[-0.22, 0.72, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.05, 0.28, 4, 8]} />
        <meshStandardMaterial color="#6B8E9F" roughness={0.8} />
      </mesh>
      {/* Right arm (waves) */}
      <group ref={armRef} position={[0.22, 0.88, 0]}>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.05, 0.28, 4, 8]} />
          <meshStandardMaterial color="#6B8E9F" roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#FDBCB4" roughness={0.7} />
        </mesh>
      </group>
      {/* Legs */}
      <mesh position={[-0.09, 0.22, 0]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.06, 0.28, 4, 8]} />
        <meshStandardMaterial color="#5A5A7A" roughness={0.8} />
      </mesh>
      <mesh position={[0.09, 0.22, 0]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.06, 0.28, 4, 8]} />
        <meshStandardMaterial color="#5A5A7A" roughness={0.8} />
      </mesh>
    </group>
  )
}

/* ── Cat (primitives) ── */
function Cat() {
  const catRef = useRef()
  const scroll = useScroll()

  useFrame(() => {
    if (!catRef.current) return
    const t = scroll.offset
    // Walk from left to right when in living-room range
    const progress = THREE.MathUtils.clamp((t - 0.28) / 0.22, 0, 1)
    catRef.current.position.x = THREE.MathUtils.lerp(-2.6, 2.6, progress)
    catRef.current.rotation.y = progress < 0.5 ? -Math.PI / 2 : Math.PI / 2
  })

  return (
    <group ref={catRef} position={[-2.6, 0.18, -9]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.32, 0.18, 0.14]} />
        <meshStandardMaterial color="#E8C77A" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#E8C77A" roughness={0.8} />
      </mesh>
      {/* Ears */}
      <mesh position={[0.22, 0.19, 0.04]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.04, 0.08, 4]} />
        <meshStandardMaterial color="#E8C77A" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 0.19, -0.04]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.04, 0.08, 4]} />
        <meshStandardMaterial color="#E8C77A" roughness={0.8} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.22, 0.12, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.025, 0.04, 0.28, 6]} />
        <meshStandardMaterial color="#D4A85A" roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[[-0.1, -0.12, 0.06], [0.1, -0.12, 0.06], [-0.1, -0.12, -0.06], [0.1, -0.12, -0.06]].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.025, 0.025, 0.14, 6]} />
          <meshStandardMaterial color="#D4A85A" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Duster (Plumeau) ── */
function Duster({ position, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('menage') }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Handle */}
      <mesh rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Feathers */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.06, 0.34, Math.sin(angle) * 0.06]} rotation={[0, angle, 0.5]}>
            <coneGeometry args={[0.04, 0.18, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#FF69B4' : '#FFB6C1'} roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function LivingRoom({ onSelect }) {
  const Z = -8

  return (
    <group>
      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, Z]}>
        <planeGeometry args={[4, 3.5]} />
        <meshStandardMaterial color={RUG_COLOR} roughness={0.9} />
      </mesh>
      {/* Rug pattern strips */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.003, Z]}>
          <planeGeometry args={[0.08, 3.4]} />
          <meshStandardMaterial color="#8B1A0A" roughness={0.9} />
        </mesh>
      ))}

      {/* Sofa */}
      <group position={[-1.6, 0, Z + 1.5]}>
        {/* Base */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.8, 0.5, 0.9]} />
          <meshStandardMaterial color={SOFA_COLOR} roughness={0.8} />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.65, 0.35]}>
          <boxGeometry args={[1.8, 0.65, 0.18]} />
          <meshStandardMaterial color={SOFA_COLOR} roughness={0.8} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.85, 0.5, 0]}>
          <boxGeometry args={[0.18, 0.38, 0.9]} />
          <meshStandardMaterial color="#7A6145" roughness={0.8} />
        </mesh>
        <mesh position={[0.85, 0.5, 0]}>
          <boxGeometry args={[0.18, 0.38, 0.9]} />
          <meshStandardMaterial color="#7A6145" roughness={0.8} />
        </mesh>
        {/* Cushions */}
        {[-0.45, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.55, -0.06]}>
            <boxGeometry args={[0.78, 0.25, 0.7]} />
            <meshStandardMaterial color="#9B8B6E" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Elderly person on sofa */}
      <ElderlyPerson position={[0, 0.55, Z + 1.5]} />

      {/* Cat */}
      <Cat />

      {/* Floor lamp */}
      <group position={[2.2, 0, Z + 0.5]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
          <meshStandardMaterial color="#8B7355" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Shade */}
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.28, 0.35, 12, 1, true]} />
          <meshStandardMaterial color="#F5DEB3" roughness={0.8} side={2} />
        </mesh>
        <pointLight position={[0, 2.1, 0]} intensity={1.4} color="#FFD580" distance={4} decay={2} />
      </group>

      {/* Coffee table */}
      <group position={[0.5, 0, Z - 0.6]}>
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color="#6B4423" roughness={0.5} />
        </mesh>
        {[[-0.3, 0.16, -0.18], [0.3, 0.16, -0.18], [-0.3, 0.16, 0.18], [0.3, 0.16, 0.18]].map((p, i) => (
          <mesh key={i} position={p}>
            <cylinderGeometry args={[0.025, 0.025, 0.32, 6]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.5} />
          </mesh>
        ))}
        {/* Duster on table */}
        <Duster position={[0.1, 0.38, 0.05]} onSelect={onSelect} />
      </group>

      {/* Room light */}
      <pointLight position={[0, 2.7, Z]} intensity={1.5} color="#FFB347" distance={8} decay={2} />
    </group>
  )
}
