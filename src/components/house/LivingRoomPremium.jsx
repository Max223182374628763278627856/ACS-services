import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Palette ─── */
const SOFA      = '#7B6147'
const SOFA_DARK = '#5C4830'
const WOOD      = '#6B4226'
const WOOD_LIGHT= '#9B6E3A'
const FABRIC    = '#C4A882'
const RUG_A     = '#8B2020'
const RUG_B     = '#5A1010'
const WALL_C    = '#EDE8DC'
const GOLD      = '#C9A84C'

/* ─── Elderly person ─── */
function ElderlyPerson({ position }) {
  const armRef  = useRef()
  const bodyRef = useRef()
  const scroll  = useScroll()

  useFrame(({ clock }) => {
    const t = scroll.offset
    const inRoom = t > 0.22 && t < 0.65
    if (armRef.current) {
      const wave   = inRoom ? -Math.PI * 0.7 + Math.sin(clock.elapsedTime * 2.2) * 0.12 : 0.15
      armRef.current.rotation.z = THREE.MathUtils.lerp(armRef.current.rotation.z, wave, 0.04)
    }
    if (bodyRef.current) {
      const breathe = Math.sin(clock.elapsedTime * 0.9) * 0.004
      bodyRef.current.scale.y = 1 + breathe
    }
  })

  return (
    <group position={position}>
      {/* Legs / pants */}
      <mesh position={[-0.1, 0.22, 0.05]} rotation={[0.35, 0, 0]}>
        <capsuleGeometry args={[0.065, 0.28, 6, 10]} />
        <meshStandardMaterial color="#4A4A6A" roughness={0.85} />
      </mesh>
      <mesh position={[0.1, 0.22, 0.05]} rotation={[0.35, 0, 0]}>
        <capsuleGeometry args={[0.065, 0.28, 6, 10]} />
        <meshStandardMaterial color="#4A4A6A" roughness={0.85} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.1, 0.04, 0.14]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.18]} />
        <meshStandardMaterial color="#2A1A0E" roughness={0.5} />
      </mesh>
      <mesh position={[0.1, 0.04, 0.14]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.18]} />
        <meshStandardMaterial color="#2A1A0E" roughness={0.5} />
      </mesh>

      {/* Torso — cardigan */}
      <group ref={bodyRef} position={[0, 0.68, 0]}>
        <mesh>
          <capsuleGeometry args={[0.17, 0.36, 8, 14]} />
          <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
        </mesh>
        {/* Cardigan buttons */}
        {[-0.08, 0.0, 0.08].map((y, i) => (
          <mesh key={i} position={[0, y, 0.175]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <meshStandardMaterial color="#F5F0E8" roughness={0.6} />
          </mesh>
        ))}
        {/* Collar */}
        <mesh position={[0, 0.2, 0.02]}>
          <torusGeometry args={[0.09, 0.025, 6, 12, Math.PI]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.9} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.055, 0.06, 0.1, 10]} />
        <meshStandardMaterial color="#F2C9B8" roughness={0.75} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.16, 0]}>
        <sphereGeometry args={[0.135, 16, 16]} />
        <meshStandardMaterial color="#F2C9B8" roughness={0.72} />
      </mesh>
      {/* Cheeks flush */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[s * 0.08, 1.13, 0.11]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#E8A090" roughness={0.9} transparent opacity={0.55} />
        </mesh>
      ))}

      {/* White hair — fuller */}
      <mesh position={[0, 1.275, 0]} scale={[1, 0.62, 1]}>
        <sphereGeometry args={[0.142, 12, 12]} />
        <meshStandardMaterial color="#E8E4E0" roughness={0.95} />
      </mesh>
      <mesh position={[0.04, 1.3, -0.05]}>
        <sphereGeometry args={[0.072, 8, 8]} />
        <meshStandardMaterial color="#DEDAD6" roughness={0.95} />
      </mesh>

      {/* Glasses — two torus */}
      {[-0.055, 0.055].map((x, i) => (
        <mesh key={i} position={[x, 1.155, 0.128]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.035, 0.007, 6, 16]} />
          <meshStandardMaterial color="#8B7355" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Bridge */}
      <mesh position={[0, 1.155, 0.13]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.04, 6]} />
        <meshStandardMaterial color="#8B7355" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Left arm (resting) */}
      <mesh position={[-0.22, 0.72, 0.04]} rotation={[0.3, 0, 0.25]}>
        <capsuleGeometry args={[0.052, 0.3, 6, 10]} />
        <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.24, 0.52, 0.12]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshStandardMaterial color="#F2C9B8" roughness={0.75} />
      </mesh>

      {/* Right arm (waves) */}
      <group ref={armRef} position={[0.22, 0.86, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.052, 0.3, 6, 10]} />
          <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.04, 0.2, 0]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#F2C9B8" roughness={0.75} />
        </mesh>
      </group>
    </group>
  )
}

/* ─── Cat (non-uniform coloring, smooth walk) ─── */
function Cat() {
  const catRef   = useRef()
  const tailRef  = useRef()
  const legFL    = useRef()
  const legBR    = useRef()
  const scroll   = useScroll()

  useFrame(({ clock }) => {
    const t        = scroll.offset
    const progress = THREE.MathUtils.clamp((t - 0.26) / 0.25, 0, 1)
    const moving   = progress > 0 && progress < 1

    if (catRef.current) {
      catRef.current.position.x = THREE.MathUtils.lerp(catRef.current.position.x, -2.8 + progress * 5.6, 0.04)
      const facingRight = progress > 0.02
      catRef.current.rotation.y = THREE.MathUtils.lerp(
        catRef.current.rotation.y,
        facingRight ? -Math.PI / 2 : Math.PI / 2,
        0.08
      )
      // Slight body bob
      if (moving) {
        catRef.current.position.y = 0.19 + Math.abs(Math.sin(clock.elapsedTime * 8)) * 0.014
      }
    }
    if (tailRef.current && moving) {
      tailRef.current.rotation.z = Math.sin(clock.elapsedTime * 5) * 0.55
    }
    if (legFL.current && moving) {
      legFL.current.rotation.x = Math.sin(clock.elapsedTime * 9) * 0.45
    }
    if (legBR.current && moving) {
      legBR.current.rotation.x = -Math.sin(clock.elapsedTime * 9) * 0.45
    }
  })

  return (
    <group ref={catRef} position={[-2.8, 0.19, -8.6]}>
      {/* Main body — tabby orange */}
      <mesh>
        <capsuleGeometry args={[0.1, 0.3, 6, 12]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4822A" roughness={0.85} />
      </mesh>

      {/* White belly patch */}
      <mesh position={[0, -0.055, 0.06]}>
        <capsuleGeometry args={[0.065, 0.2, 6, 10]} />
        <meshStandardMaterial color="#F5EAD8" roughness={0.88} />
      </mesh>

      {/* Tabby stripe */}
      {[-0.08, 0.0, 0.08].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.101, 0.101, 0.025, 10]} />
          <meshStandardMaterial color="#A85B10" roughness={0.85} />
        </mesh>
      ))}

      {/* Head */}
      <mesh position={[0.24, 0.06, 0]}>
        <sphereGeometry args={[0.095, 12, 12]} />
        <meshStandardMaterial color="#D4822A" roughness={0.83} />
      </mesh>
      {/* White muzzle */}
      <mesh position={[0.32, 0.03, 0]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#F5EAD8" roughness={0.88} />
      </mesh>
      {/* Nose */}
      <mesh position={[0.336, 0.048, 0]}>
        <sphereGeometry args={[0.013, 6, 6]} />
        <meshStandardMaterial color="#E07070" roughness={0.5} />
      </mesh>
      {/* Ears */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[0.22, 0.14, s * 0.055]} rotation={[0, s * 0.25, s * 0.35]}>
          <coneGeometry args={[0.036, 0.072, 4]} />
          <meshStandardMaterial color="#C06820" roughness={0.85} />
        </mesh>
      ))}

      {/* Tail */}
      <group ref={tailRef} position={[-0.24, 0.06, 0]}>
        <mesh position={[0, 0.14, 0]}>
          <capsuleGeometry args={[0.028, 0.22, 6, 8]} />
          <meshStandardMaterial color="#BA7020" roughness={0.85} />
        </mesh>
        {/* Tip */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.032, 8, 8]} />
          <meshStandardMaterial color="#E8C090" roughness={0.85} />
        </mesh>
      </group>

      {/* Legs — animated pairs */}
      <group ref={legFL} position={[0.12, -0.1, 0.07]}>
        <mesh>
          <capsuleGeometry args={[0.026, 0.12, 4, 8]} />
          <meshStandardMaterial color="#D4822A" roughness={0.85} />
        </mesh>
      </group>
      <mesh position={[-0.1, -0.1, 0.07]}>
        <capsuleGeometry args={[0.026, 0.12, 4, 8]} />
        <meshStandardMaterial color="#D4822A" roughness={0.85} />
      </mesh>
      <group ref={legBR} position={[-0.1, -0.1, -0.07]}>
        <mesh>
          <capsuleGeometry args={[0.026, 0.12, 4, 8]} />
          <meshStandardMaterial color="#D4822A" roughness={0.85} />
        </mesh>
      </group>
      <mesh position={[0.12, -0.1, -0.07]}>
        <capsuleGeometry args={[0.026, 0.12, 4, 8]} />
        <meshStandardMaterial color="#D4822A" roughness={0.85} />
      </mesh>
    </group>
  )
}

/* ─── Decorative plant ─── */
function Plant({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 10]} />
        <meshStandardMaterial color="#C1440E" roughness={0.85} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.02, 10]} />
        <meshStandardMaterial color="#3D2510" roughness={1} />
      </mesh>
      {/* Leaf clusters */}
      {[
        [0, 0.46, 0, 0.22],
        [0.12, 0.38, 0.06, 0.16],
        [-0.1, 0.4, -0.05, 0.15],
        [0.06, 0.55, -0.08, 0.13],
        [-0.08, 0.52, 0.1, 0.14],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 10, 10]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#2D6E3A' : '#3A8A4A'}
            roughness={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Gold-framed picture ─── */
function GoldFrame({ position, rotation = [0, 0, 0], color = '#6B8FA8' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Gold frame */}
      <mesh>
        <boxGeometry args={[0.62, 0.48, 0.04]} />
        <meshStandardMaterial color={GOLD} metalness={0.75} roughness={0.3} />
      </mesh>
      {/* Inner mat */}
      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[0.50, 0.36, 0.01]} />
        <meshStandardMaterial color="#F8F4EE" roughness={1} />
      </mesh>
      {/* Painting */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.44, 0.30, 0.005]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  )
}

/* ─── Duster (interactive) ─── */
function Duster({ position, onZoom }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onZoom({
      cameraPos:  [position[0] + 0.9, position[1] + 0.7, position[2] + 1.6],
      cameraLook: [position[0], position[1] + 0.1, position[2]],
      serviceId:  'menage',
    })
  }
  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      <mesh rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
        <meshStandardMaterial color={WOOD} roughness={0.55} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.055, 0.3, Math.sin(a) * 0.055]} rotation={[0, a, 0.55]}>
            <coneGeometry args={[0.038, 0.2, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#FF6BA8' : '#FFB6D4'} roughness={0.92} />
          </mesh>
        )
      })}
    </group>
  )
}

/* ─── Sofa (interactive — fauteuil) ─── */
function Sofa({ position, onZoom }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onZoom({
      cameraPos:  [position[0] + 1.8, position[1] + 0.6, position[2] + 0.6],
      cameraLook: [position[0], position[1] + 0.7, position[2]],
      serviceId:  'about',
    })
  }
  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Base seat */}
      <mesh position={[0, 0.27, 0]}>
        <boxGeometry args={[2.0, 0.52, 0.95]} />
        <meshStandardMaterial color={SOFA} roughness={0.86} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.7, 0.4]}>
        <boxGeometry args={[2.0, 0.68, 0.2]} />
        <meshStandardMaterial color={SOFA} roughness={0.86} />
      </mesh>
      {/* Arms */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[s * 0.94, 0.52, 0]}>
          <boxGeometry args={[0.19, 0.42, 0.95]} />
          <meshStandardMaterial color={SOFA_DARK} roughness={0.82} />
        </mesh>
      ))}
      {/* Seat cushions */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.57, -0.04]}>
          <boxGeometry args={[0.88, 0.27, 0.82]} />
          <meshStandardMaterial color={FABRIC} roughness={0.78} />
        </mesh>
      ))}
      {/* Back cushion */}
      <mesh position={[0, 0.7, 0.22]}>
        <boxGeometry args={[1.8, 0.6, 0.16]} />
        <meshStandardMaterial color={FABRIC} roughness={0.8} />
      </mesh>
      {/* Decorative throw pillow */}
      <mesh position={[0.6, 0.72, -0.05]} rotation={[0, 0.25, 0.1]}>
        <boxGeometry args={[0.3, 0.28, 0.1]} />
        <meshStandardMaterial color="#8FA8C1" roughness={0.8} />
      </mesh>
      {/* Wooden legs */}
      {[[-0.85, -0.4], [0.85, -0.4], [-0.85, 0.4], [0.85, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.12, 8]} />
          <meshStandardMaterial color={WOOD} roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Floor lamp ─── */
function FloorLamp({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.018, 0.022, 2.5, 8]} />
        <meshStandardMaterial color="#8B7D6B" metalness={0.45} roughness={0.4} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 2.42, 0]}>
        <coneGeometry args={[0.3, 0.38, 14, 1, true]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} side={2} />
      </mesh>
      {/* Inner glow disc */}
      <mesh position={[0, 2.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 12]} />
        <meshStandardMaterial color="#FFF3DC" emissive="#FFE4A0" emissiveIntensity={1.5} roughness={0} />
      </mesh>
      <pointLight position={[0, 2.2, 0]} intensity={2.2} color="#FFD580" distance={4.5} decay={2} />
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.1, 10]} />
        <meshStandardMaterial color="#6B5A4A" roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ─── Coffee table ─── */
function CoffeeTable({ position }) {
  return (
    <group position={position}>
      {/* Top */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.95, 0.055, 0.55]} />
        <meshStandardMaterial color="#7A5030" roughness={0.32} metalness={0.08} />
      </mesh>
      {/* X legs */}
      {[[-0.38, 0.16, -0.2], [0.38, 0.16, -0.2], [-0.38, 0.16, 0.2], [0.38, 0.16, 0.2]].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.022, 0.022, 0.34, 8]} />
          <meshStandardMaterial color={WOOD} roughness={0.38} metalness={0.1} />
        </mesh>
      ))}
      {/* Decorative bowl */}
      <mesh position={[-0.22, 0.38, 0]} scale={[1, 0.55, 1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#C1440E" roughness={0.7} side={2} />
      </mesh>
    </group>
  )
}

/* ─── Rug ─── */
function Rug({ z }) {
  return (
    <group>
      {/* Main rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, z]}>
        <planeGeometry args={[4.4, 3.8]} />
        <meshStandardMaterial color={RUG_A} roughness={0.95} />
      </mesh>
      {/* Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0035, z]}>
        <planeGeometry args={[4.6, 4.0]} />
        <meshStandardMaterial color={RUG_B} roughness={0.95} />
      </mesh>
      {/* Inner pattern lines */}
      {[-1.4, -0.7, 0, 0.7, 1.4].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.004, z]}>
          <planeGeometry args={[0.06, 3.7]} />
          <meshStandardMaterial color="#6B1010" roughness={0.95} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Living Room Premium ─── */
export default function LivingRoomPremium({ onZoom }) {
  const Z = -8

  return (
    <group>
      {/* Rug */}
      <Rug z={Z} />

      {/* Sofa (clickable) */}
      <Sofa position={[-1.5, 0, Z + 1.6]} onZoom={onZoom} />

      {/* Elderly person seated */}
      <ElderlyPerson position={[0.05, 0.56, Z + 1.55]} />

      {/* Cat */}
      <Cat />

      {/* Coffee table + duster */}
      <CoffeeTable position={[0.4, 0, Z - 0.55]} />
      <Duster position={[0.22, 0.365, Z - 0.42]} onZoom={onZoom} />

      {/* Floor lamp */}
      <FloorLamp position={[2.3, 0, Z + 0.4]} />

      {/* Decorative plants */}
      <Plant position={[2.55, 0, Z - 1.2]} scale={0.95} />
      <Plant position={[-2.55, 0, Z + 2.0]} scale={0.75} />

      {/* Gold-framed pictures on left wall */}
      <GoldFrame
        position={[-2.92, 1.75, Z + 0.3]}
        rotation={[0, Math.PI / 2, 0]}
        color="#7A9FAA"
      />
      <GoldFrame
        position={[-2.92, 1.75, Z - 1.0]}
        rotation={[0, Math.PI / 2, 0]}
        color="#AA8F6A"
      />

      {/* Small side table */}
      <group position={[-2.3, 0, Z + 0.5]}>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 14]} />
          <meshStandardMaterial color={WOOD_LIGHT} roughness={0.35} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.42, 8]} />
          <meshStandardMaterial color={WOOD} roughness={0.4} />
        </mesh>
        {/* Tea cup */}
        <mesh position={[0.06, 0.46, 0]} scale={[1, 0.7, 1]}>
          <cylinderGeometry args={[0.045, 0.038, 0.07, 10]} />
          <meshStandardMaterial color="#F8F4EE" roughness={0.6} />
        </mesh>
        <mesh position={[0.06, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 10]} />
          <meshStandardMaterial color="#E8D0B0" roughness={0.5} />
        </mesh>
      </group>

      {/* Contact shadows — living room zone */}
      <ContactShadows
        position={[0, 0.002, Z]}
        width={6} height={5}
        far={1.8}
        resolution={512}
        color="#1A0A00"
        opacity={0.45}
        blur={1.8}
      />

      {/* Room fill light */}
      <pointLight position={[0, 2.8, Z]} intensity={1.2} color="#FFB347" distance={9} decay={2} />
    </group>
  )
}
