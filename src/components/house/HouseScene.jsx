import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'

import Entrance from './Entrance'
import LivingRoom from './LivingRoom'
import GardenView from './GardenView'
import Office from './Office'
import HUD from './HUD'
import InfoPanel from './InfoPanel'

/* ── Constants ── */
const START_Z = 6
const END_Z = -26
const ROOM_W = 6
const ROOM_H = 3
const TOTAL_L = 36

const FLOOR_COLOR = '#9B6E3A'
const CEIL_COLOR = '#F0EBE0'
const WALL_COLOR = '#EDE8DC'
const WALL_DARK = '#5C3A1E'

/* ── House structure: floor, ceiling, continuous walls, room dividers ── */
function HouseStructure() {
  const mid = START_Z / 2 + END_Z / 2  // ≈ -10
  const halfLen = (START_Z - END_Z) / 2 + 2

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.75} />
      </mesh>
      {/* Floor planks (visual strips) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-2.4 + i * 1.2, 0.001, mid]}>
          <planeGeometry args={[0.04, halfLen * 2]} />
          <meshStandardMaterial color="#7A5430" roughness={0.8} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={CEIL_COLOR} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, mid]}>
        <boxGeometry args={[0.08, ROOM_H, halfLen * 2]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>

      {/* Right wall — two segments with gap for garden window (z=-14 to z=-18) */}
      {/* Front segment: z from +8 to -13 */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -2.5]}>
        <boxGeometry args={[0.08, ROOM_H, 17]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>
      {/* Back segment: z from -19 to -28 */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -23.5]}>
        <boxGeometry args={[0.08, ROOM_H, 9]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>

      {/* Room divider: Entrance → Living Room (z = -4), with doorway */}
      <RoomDivider z={-4} />

      {/* Room divider: Living Room → Garden View (z = -12) */}
      <RoomDivider z={-12} />

      {/* Room divider: Garden View → Office (z = -20) */}
      <RoomDivider z={-20} />

      {/* Back wall (end of office) */}
      <mesh position={[0, ROOM_H / 2, -28]}>
        <boxGeometry args={[ROOM_W, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>

      {/* Baseboard trim — continuous */}
      <mesh position={[-ROOM_W / 2 + 0.04, 0.07, mid]}>
        <boxGeometry args={[0.08, 0.14, halfLen * 2]} />
        <meshStandardMaterial color={WALL_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[ROOM_W / 2 - 0.04, 0.07, mid]}>
        <boxGeometry args={[0.08, 0.14, halfLen * 2]} />
        <meshStandardMaterial color={WALL_DARK} roughness={0.6} />
      </mesh>
    </group>
  )
}

/* ── Doorway divider: wall panel with central opening ── */
function RoomDivider({ z }) {
  const doorW = 1.2
  const doorH = 2.2
  const wallH = ROOM_H
  const wallW = ROOM_W

  return (
    <group position={[0, 0, z]}>
      {/* Left panel */}
      <mesh position={[-(wallW / 2 + doorW / 2) / 2, wallH / 2, 0]}>
        <boxGeometry args={[(wallW - doorW) / 2, wallH, 0.12]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>
      {/* Right panel */}
      <mesh position={[(wallW / 2 + doorW / 2) / 2, wallH / 2, 0]}>
        <boxGeometry args={[(wallW - doorW) / 2, wallH, 0.12]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>
      {/* Top panel (above door) */}
      <mesh position={[0, doorH + (wallH - doorH) / 2, 0]}>
        <boxGeometry args={[doorW, wallH - doorH, 0.12]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>
      {/* Door arch trim */}
      <mesh position={[0, doorH + 0.04, 0]}>
        <boxGeometry args={[doorW + 0.14, 0.1, 0.14]} />
        <meshStandardMaterial color={WALL_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[-(doorW / 2 + 0.05), doorH / 2, 0]}>
        <boxGeometry args={[0.1, doorH, 0.14]} />
        <meshStandardMaterial color={WALL_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[doorW / 2 + 0.05, doorH / 2, 0]}>
        <boxGeometry args={[0.1, doorH, 0.14]} />
        <meshStandardMaterial color={WALL_DARK} roughness={0.6} />
      </mesh>
    </group>
  )
}

/* ── Camera rig — smooth scroll-driven movement ── */
function CameraRig({ onSelect }) {
  const scroll = useScroll()

  useFrame((state) => {
    const t = scroll.offset
    const targetZ = START_Z + t * (END_Z - START_Z)
    const targetY = 1.6

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.055)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.055)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.055)

    // Look slightly ahead and downward for a natural walking feel
    state.camera.lookAt(0, 1.25, state.camera.position.z - 5)
  })

  return (
    <>
      {/* Global ambient — warm golden hour */}
      <ambientLight intensity={0.35} color="#FFF3DC" />

      {/* Entrance spotlight */}
      <spotLight
        position={[0, 2.8, 2]}
        target-position={[0, 0, 0]}
        intensity={30}
        angle={0.45}
        penumbra={0.5}
        color="#FFD580"
        castShadow
      />

      {/* Mid-house fill */}
      <pointLight position={[0, 2.8, -8]} intensity={0.8} color="#FFB347" distance={10} decay={2} />
      <pointLight position={[0, 2.8, -16]} intensity={0.8} color="#FFF8DC" distance={10} decay={2} />
      <pointLight position={[0, 2.8, -24]} intensity={0.8} color="#FFB347" distance={10} decay={2} />

      {/* Rooms */}
      <HouseStructure />
      <Entrance onSelect={onSelect} />
      <LivingRoom onSelect={onSelect} />
      <GardenView onSelect={onSelect} />
      <Office onSelect={onSelect} />
    </>
  )
}

/* ── Main export ── */
export default function HouseScene() {
  const [activePanel, setActivePanel] = useState(null)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* HUD stays fixed */}
      <HUD />

      {/* Info panel overlay */}
      {activePanel && (
        <InfoPanel serviceId={activePanel} onClose={() => setActivePanel(null)} />
      )}

      <Canvas
        camera={{ position: [0, 1.6, START_Z], fov: 62 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        {/* ScrollControls: 4 pages, HTML scroll trapped inside canvas */}
        <ScrollControls pages={4} damping={0.12} distance={1}>
          <CameraRig onSelect={setActivePanel} />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
