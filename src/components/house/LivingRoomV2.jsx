import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const SOFA_C   = '#8B7355'
const SOFA_D   = '#6B5440'
const CUSHION  = '#C4A882'
const WOOD_C   = '#7A5030'
const WOOD_L   = '#A0703A'
const RUG_R    = '#8B2020'
const GOLD     = '#C9A84C'
const SKIN     = '#F2C9B8'
const BLUSH    = '#E8A090'

/* ── Allocation-free quaternion helper ── */
const _mat  = new THREE.Matrix4()
const _quat = new THREE.Quaternion()
const _up   = new THREE.Vector3(0, 1, 0)

/* ════════════════════════════════════════
   Elderly person — soft RoundedBox body
   ════════════════════════════════════════ */
function ElderlyPerson({ position }) {
  const armRef  = useRef()
  const headRef = useRef()
  const scroll  = useScroll()

  useFrame(({ clock }) => {
    const t      = scroll.offset
    const inRoom = t > 0.22 && t < 0.68

    /* Arm wave */
    if (armRef.current) {
      const target = inRoom
        ? -Math.PI * 0.72 + Math.sin(clock.elapsedTime * 2.4) * 0.14
        : 0.1
      armRef.current.rotation.z = THREE.MathUtils.lerp(
        armRef.current.rotation.z, target, 0.04
      )
    }

    /* Gentle head nod */
    if (headRef.current) {
      headRef.current.rotation.y = inRoom
        ? Math.sin(clock.elapsedTime * 0.7) * 0.06
        : 0
    }
  })

  return (
    <group position={position}>
      {/* Legs */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0.06]} rotation={[0.32, 0, 0]}>
          <capsuleGeometry args={[0.062, 0.26, 6, 10]} />
          <meshStandardMaterial color="#4A4A6A" roughness={0.88} />
        </mesh>
      ))}
      {/* Shoes */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 0.15]} rotation={[0.18, 0, 0]}>
          <RoundedBox args={[0.1, 0.065, 0.2]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#2A1A0E" roughness={0.5} metalness={0.05} />
          </RoundedBox>
        </mesh>
      ))}

      {/* Torso — RoundedBox cardigan */}
      <mesh position={[0, 0.68, 0]}>
        <RoundedBox args={[0.34, 0.44, 0.24]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
        </RoundedBox>
      </mesh>
      {/* Cardigan collar */}
      <mesh position={[0, 0.88, 0.04]}>
        <torusGeometry args={[0.09, 0.022, 6, 14, Math.PI]} />
        <meshStandardMaterial color="#F5F0E8" roughness={0.9} />
      </mesh>
      {/* Buttons */}
      {[-0.09, 0.0, 0.09].map((y, i) => (
        <mesh key={i} position={[0, y + 0.64, 0.125]}>
          <sphereGeometry args={[0.016, 7, 7]} />
          <meshStandardMaterial color="#DDD8CC" roughness={0.6} />
        </mesh>
      ))}

      {/* Neck */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.052, 0.058, 0.1, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.16, 0]}>
        <mesh>
          <sphereGeometry args={[0.135, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.72} />
        </mesh>
        {/* Cheeks */}
        {[-1, 1].map((s, i) => (
          <mesh key={i} position={[s * 0.078, -0.022, 0.108]}>
            <sphereGeometry args={[0.034, 8, 8]} />
            <meshStandardMaterial color={BLUSH} roughness={0.95} transparent opacity={0.55} />
          </mesh>
        ))}
        {/* Smile wrinkles — tiny bumps */}
        {[-1, 1].map((s, i) => (
          <mesh key={i} position={[s * 0.065, -0.04, 0.128]} rotation={[0, 0, s * 0.3]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial color={BLUSH} roughness={0.9} transparent opacity={0.4} />
          </mesh>
        ))}
        {/* White hair — volumetric */}
        <mesh position={[0, 0.1, 0]} scale={[1, 0.65, 1]}>
          <sphereGeometry args={[0.142, 12, 12]} />
          <meshStandardMaterial color="#E8E4E0" roughness={0.95} />
        </mesh>
        <mesh position={[0.04, 0.145, -0.05]}>
          <sphereGeometry args={[0.068, 8, 8]} />
          <meshStandardMaterial color="#DEDAD6" roughness={0.95} />
        </mesh>
        {/* Glasses */}
        {[-0.053, 0.053].map((x, i) => (
          <mesh key={i} position={[x, -0.006, 0.127]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.033, 0.007, 6, 14]} />
            <meshStandardMaterial color="#8B7355" metalness={0.55} roughness={0.35} />
          </mesh>
        ))}
        {/* Glasses bridge */}
        <mesh position={[0, -0.006, 0.13]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.038, 6]} />
          <meshStandardMaterial color="#8B7355" metalness={0.55} roughness={0.35} />
        </mesh>
      </group>

      {/* Left arm (resting on lap) */}
      <mesh position={[-0.21, 0.7, 0.06]} rotation={[0.28, 0, 0.22]}>
        <capsuleGeometry args={[0.05, 0.3, 6, 10]} />
        <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
      </mesh>
      <mesh position={[-0.23, 0.5, 0.14]}>
        <sphereGeometry args={[0.052, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>

      {/* Right arm — WAVES */}
      <group ref={armRef} position={[0.21, 0.88, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.05, 0.3, 6, 10]} />
          <meshStandardMaterial color="#7A9B8A" roughness={0.92} />
        </mesh>
        <mesh position={[0.04, 0.2, 0.02]}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>
      </group>
    </group>
  )
}

/* ════════════════════════════════════════
   Cat — tabby, 4-leg walk animation
   ════════════════════════════════════════ */
function Cat() {
  const rootRef = useRef()
  const tailRef = useRef()
  const legA    = useRef()
  const legB    = useRef()
  const scroll  = useScroll()

  useFrame(({ clock }) => {
    const t   = scroll.offset
    const p   = THREE.MathUtils.clamp((t - 0.27) / 0.24, 0, 1)
    const mov = p > 0.01 && p < 0.99

    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.lerp(
        rootRef.current.position.x, -2.8 + p * 5.6, 0.04
      )
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y, p > 0.02 ? -Math.PI / 2 : Math.PI / 2, 0.08
      )
      if (mov) rootRef.current.position.y = 0.19 + Math.abs(Math.sin(clock.elapsedTime * 9)) * 0.013
    }
    if (tailRef.current && mov) tailRef.current.rotation.z = Math.sin(clock.elapsedTime * 5.5) * 0.6
    if (legA.current && mov) legA.current.rotation.x = Math.sin(clock.elapsedTime * 9.5) * 0.48
    if (legB.current && mov) legB.current.rotation.x = -Math.sin(clock.elapsedTime * 9.5) * 0.48
  })

  return (
    <group ref={rootRef} position={[-2.8, 0.19, -8.8]}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.1, 0.28, 6, 12]} />
        <meshStandardMaterial color="#D4822A" roughness={0.84} />
      </mesh>
      {/* White belly */}
      <mesh position={[0, -0.055, 0.065]}>
        <capsuleGeometry args={[0.065, 0.18, 6, 10]} />
        <meshStandardMaterial color="#F5EAD8" roughness={0.88} />
      </mesh>
      {/* Stripes */}
      {[-0.09, 0, 0.09].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.101, 0.101, 0.025, 10]} />
          <meshStandardMaterial color="#A85B10" roughness={0.84} />
        </mesh>
      ))}
      {/* Head */}
      <mesh position={[0.23, 0.07, 0]}>
        <sphereGeometry args={[0.093, 12, 12]} />
        <meshStandardMaterial color="#D4822A" roughness={0.82} />
      </mesh>
      {/* White muzzle */}
      <mesh position={[0.31, 0.035, 0]}>
        <sphereGeometry args={[0.044, 8, 8]} />
        <meshStandardMaterial color="#F5EAD8" roughness={0.88} />
      </mesh>
      {/* Nose */}
      <mesh position={[0.334, 0.048, 0]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#E07070" roughness={0.5} />
      </mesh>
      {/* Ears */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[0.21, 0.14, s * 0.054]} rotation={[0, s * 0.25, s * 0.35]}>
          <coneGeometry args={[0.034, 0.07, 4]} />
          <meshStandardMaterial color="#C06820" roughness={0.85} />
        </mesh>
      ))}
      {/* Eyes */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[0.315, 0.075, s * 0.038]}>
          <sphereGeometry args={[0.016, 7, 7]} />
          <meshStandardMaterial color="#2A1A00" roughness={0.1} />
        </mesh>
      ))}
      {/* Tail */}
      <group ref={tailRef} position={[-0.23, 0.07, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <capsuleGeometry args={[0.027, 0.22, 6, 8]} />
          <meshStandardMaterial color="#BA7020" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.285, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#E8C090" roughness={0.85} />
        </mesh>
      </group>
      {/* Front legs */}
      <group ref={legA} position={[0.1, -0.1, 0.07]}>
        <mesh><capsuleGeometry args={[0.025, 0.12, 4, 8]} /><meshStandardMaterial color="#D4822A" roughness={0.85} /></mesh>
      </group>
      <mesh position={[-0.1, -0.1, 0.07]}><capsuleGeometry args={[0.025, 0.12, 4, 8]} /><meshStandardMaterial color="#D4822A" roughness={0.85} /></mesh>
      {/* Back legs */}
      <group ref={legB} position={[-0.1, -0.1, -0.07]}>
        <mesh><capsuleGeometry args={[0.025, 0.12, 4, 8]} /><meshStandardMaterial color="#D4822A" roughness={0.85} /></mesh>
      </group>
      <mesh position={[0.1, -0.1, -0.07]}><capsuleGeometry args={[0.025, 0.12, 4, 8]} /><meshStandardMaterial color="#D4822A" roughness={0.85} /></mesh>
    </group>
  )
}

/* ════════════════════════════════════════
   Sofa — RoundedBox premium
   ════════════════════════════════════════ */
function Sofa({ position, onZoom }) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onZoom({
          cameraPos:  [position[0] + 1.8, position[1] + 0.75, position[2] + 0.9],
          cameraLook: [position[0] - 0.1, position[1] + 0.7, position[2]],
          serviceId: 'aide',
        })
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut  ={() => (document.body.style.cursor = 'default')}
    >
      {/* Seat */}
      <RoundedBox args={[2.1, 0.52, 1.0]} radius={0.07} smoothness={4} position={[0, 0.28, 0]}>
        <meshStandardMaterial color={SOFA_C} roughness={0.85} />
      </RoundedBox>
      {/* Back */}
      <RoundedBox args={[2.1, 0.72, 0.22]} radius={0.07} smoothness={4} position={[0, 0.73, 0.41]}>
        <meshStandardMaterial color={SOFA_C} roughness={0.85} />
      </RoundedBox>
      {/* Arms */}
      {[-1, 1].map((s, i) => (
        <RoundedBox key={i} args={[0.2, 0.42, 1.0]} radius={0.06} smoothness={4} position={[s * 0.96, 0.52, 0]}>
          <meshStandardMaterial color={SOFA_D} roughness={0.82} />
        </RoundedBox>
      ))}
      {/* Seat cushions */}
      {[-0.5, 0.5].map((x, i) => (
        <RoundedBox key={i} args={[0.9, 0.24, 0.86]} radius={0.08} smoothness={4} position={[x, 0.58, -0.04]}>
          <meshStandardMaterial color={CUSHION} roughness={0.78} />
        </RoundedBox>
      ))}
      {/* Back cushion */}
      <RoundedBox args={[1.85, 0.58, 0.18]} radius={0.07} smoothness={4} position={[0, 0.73, 0.22]}>
        <meshStandardMaterial color={CUSHION} roughness={0.8} />
      </RoundedBox>
      {/* Throw pillow */}
      <RoundedBox args={[0.28, 0.26, 0.12]} radius={0.06} smoothness={4} position={[0.55, 0.74, -0.05]} rotation={[0, 0.22, 0.1]}>
        <meshStandardMaterial color="#8FA8C1" roughness={0.78} />
      </RoundedBox>
      {/* Wood legs */}
      {[[-0.88,-0.38],[ 0.88,-0.38],[-0.88,0.38],[0.88,0.38]].map(([x,z],i)=>(
        <mesh key={i} position={[x, 0.07, z]}>
          <cylinderGeometry args={[0.028, 0.028, 0.14, 8]} />
          <meshStandardMaterial color={WOOD_C} roughness={0.38} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

/* ════════════════════════════════════════
   Coffee table — RoundedBox
   ════════════════════════════════════════ */
function CoffeeTable({ position }) {
  return (
    <group position={position}>
      <RoundedBox args={[1.0, 0.055, 0.58]} radius={0.025} smoothness={3} position={[0, 0.35, 0]}>
        <meshStandardMaterial color={WOOD_L} roughness={0.28} metalness={0.06} />
      </RoundedBox>
      {[[-0.4,0.17,-0.21],[0.4,0.17,-0.21],[-0.4,0.17,0.21],[0.4,0.17,0.21]].map((p,i)=>(
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.022, 0.022, 0.34, 8]} />
          <meshStandardMaterial color={WOOD_C} roughness={0.38} metalness={0.1} />
        </mesh>
      ))}
      {/* Decorative bowl */}
      <mesh position={[-0.2, 0.39, 0.04]} scale={[1, 0.52, 1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#C1440E" roughness={0.7} side={2} />
      </mesh>
      {/* Books stack */}
      {[0,1,2].map((i)=>(
        <RoundedBox key={i} args={[0.2, 0.03, 0.14]} radius={0.006} smoothness={2} position={[0.22, 0.372 + i * 0.032, 0.02]} rotation={[0, i * 0.08 - 0.05, 0]}>
          <meshStandardMaterial color={['#C1440E','#38bdf8','#4ade80'][i]} roughness={0.88} />
        </RoundedBox>
      ))}
    </group>
  )
}

/* ════════════════════════════════════════
   Floor lamp
   ════════════════════════════════════════ */
function FloorLamp({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.26, 0]}>
        <cylinderGeometry args={[0.017, 0.02, 2.52, 8]} />
        <meshStandardMaterial color="#8B7D6B" metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.44, 0]}>
        <coneGeometry args={[0.3, 0.4, 14, 1, true]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.82} side={2} />
      </mesh>
      <mesh position={[0, 2.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 14]} />
        <meshStandardMaterial color="#FFF3DC" emissive="#FFE090" emissiveIntensity={2.2} roughness={0} />
      </mesh>
      <pointLight position={[0, 2.2, 0]} intensity={2.6} color="#FFD580" distance={5} decay={2} />
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.1, 10]} />
        <meshStandardMaterial color="#6B5A4A" roughness={0.38} />
      </mesh>
    </group>
  )
}

/* ════════════════════════════════════════
   Duster — clickable
   ════════════════════════════════════════ */
function Duster({ position, onZoom }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.04
  })
  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onZoom({
          cameraPos:  [position[0] + 0.9, position[1] + 0.75, position[2] + 1.4],
          cameraLook: [position[0], position[1] + 0.12, position[2]],
          serviceId: 'menage',
        })
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut  ={() => (document.body.style.cursor = 'default')}
    >
      <mesh rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.017, 0.017, 0.58, 8]} />
        <meshStandardMaterial color={WOOD_C} roughness={0.55} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.052, 0.31, Math.sin(a) * 0.052]} rotation={[0, a, 0.52]}>
            <coneGeometry args={[0.036, 0.19, 4]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#FF6BA8' : i % 3 === 1 ? '#FFB6D4' : '#FFDBEA'} roughness={0.92} />
          </mesh>
        )
      })}
    </group>
  )
}

/* ════════════════════════════════════════
   Gold-framed picture
   ════════════════════════════════════════ */
function GoldFrame({ position, rotation = [0, 0, 0], paintColor = '#6B8FA8' }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[0.64, 0.5, 0.045]} radius={0.012} smoothness={3}>
        <meshStandardMaterial color={GOLD} metalness={0.78} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0, 0.026]}>
        <boxGeometry args={[0.52, 0.38, 0.01]} />
        <meshStandardMaterial color="#F8F4EE" roughness={1} />
      </mesh>
      <mesh position={[0, 0, 0.033]}>
        <boxGeometry args={[0.46, 0.32, 0.006]} />
        <meshStandardMaterial color={paintColor} roughness={0.88} />
      </mesh>
    </group>
  )
}

/* ════════════════════════════════════════
   Plant
   ════════════════════════════════════════ */
function Plant({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.1, 0.085, 0.24, 10]} />
        <meshStandardMaterial color="#C1440E" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.225, 0]}>
        <cylinderGeometry args={[0.096, 0.096, 0.02, 10]} />
        <meshStandardMaterial color="#3D2510" roughness={1} />
      </mesh>
      {[
        [0, 0.48, 0, 0.21],[-0.11,0.4, 0.06,0.15],[0.1,0.42,-0.05,0.14],
        [0.06,0.56,-0.08,0.13],[-0.07,0.53,0.1,0.13],
      ].map(([x,y,z,r],i) => (
        <mesh key={i} position={[x,y,z]}>
          <sphereGeometry args={[r, 10, 10]} />
          <meshStandardMaterial color={i%2===0 ? '#2D6E3A' : '#3A8A4A'} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

/* ════════════════════════════════════════
   Rug with border
   ════════════════════════════════════════ */
function Rug({ z }) {
  return (
    <>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.0025,z]}>
        <planeGeometry args={[4.5,4.0]} />
        <meshStandardMaterial color={RUG_R} roughness={0.96} />
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.003,z]}>
        <planeGeometry args={[4.2,3.7]} />
        <meshStandardMaterial color="#6B1010" roughness={0.96} />
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.0035,z]}>
        <planeGeometry args={[3.8,3.3]} />
        <meshStandardMaterial color={RUG_R} roughness={0.96} />
      </mesh>
      {[-1.3,-0.65,0,0.65,1.3].map((x,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[x,0.004,z]}>
          <planeGeometry args={[0.05,3.2]} />
          <meshStandardMaterial color="#8B1010" roughness={0.96} />
        </mesh>
      ))}
    </>
  )
}

/* ════════════════════════════════════════
   Living Room V2 — export
   ════════════════════════════════════════ */
export default function LivingRoomV2({ onZoom }) {
  const Z = -8

  return (
    <group>
      <Rug z={Z} />
      <Sofa position={[-1.5, 0, Z + 1.7]} onZoom={onZoom} />
      <ElderlyPerson position={[0.08, 0.56, Z + 1.68]} />
      <Cat />
      <CoffeeTable position={[0.4, 0, Z - 0.55]} />
      <Duster position={[0.2, 0.365, Z - 0.4]} onZoom={onZoom} />
      <FloorLamp position={[2.32, 0, Z + 0.35]} />

      {/* Plants */}
      <Plant position={[2.55, 0, Z - 1.25]} scale={0.94} />
      <Plant position={[-2.55, 0, Z + 2.1]} scale={0.74} />

      {/* Gold frames */}
      <GoldFrame position={[-2.93, 1.78, Z + 0.3]}  rotation={[0, Math.PI/2, 0]} paintColor="#7A9FAA" />
      <GoldFrame position={[-2.93, 1.78, Z - 1.0]}  rotation={[0, Math.PI/2, 0]} paintColor="#AA8F6A" />

      {/* Side table with tea */}
      <group position={[-2.32, 0, Z + 0.5]}>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 14]} />
          <meshStandardMaterial color={WOOD_L} roughness={0.3} metalness={0.06} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.42, 8]} />
          <meshStandardMaterial color={WOOD_C} roughness={0.38} />
        </mesh>
        <mesh position={[0.06, 0.46, 0]} scale={[1, 0.68, 1]}>
          <cylinderGeometry args={[0.044, 0.038, 0.068, 10]} />
          <meshStandardMaterial color="#F8F4EE" roughness={0.55} />
        </mesh>
        <mesh position={[0.06, 0.498, 0]}>
          <cylinderGeometry args={[0.039, 0.039, 0.01, 10]} />
          <meshStandardMaterial color="#D4A070" roughness={0.5} />
        </mesh>
      </group>

      {/* Contact shadows */}
      <ContactShadows
        position={[0, 0.002, Z]} width={6} height={5}
        far={1.8} resolution={512}
        color="#1A0800" opacity={0.48} blur={2}
      />

      {/* Room warm fill */}
      <pointLight position={[0, 2.85, Z]} intensity={1.4} color="#FFB347" distance={9} decay={2} />
    </group>
  )
}
