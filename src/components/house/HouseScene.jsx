import { useState, useRef, useCallback, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'

import Entrance        from './Entrance'
import LivingRoomPremium from './LivingRoomPremium'
import GardenView      from './GardenView'
import Office          from './Office'
import HUD             from './HUD'
import InfoPanel       from './InfoPanel'
import ZoomOverlay     from './ZoomOverlay'

/* ── Constants ── */
const START_Z  = 6
const END_Z    = -26
const ROOM_W   = 6
const ROOM_H   = 3

/* ── Colors ── */
const FLOOR_C = '#A8834A'
const CEIL_C  = '#EDE8DC'
const WALL_C  = '#EAE5D8'
const TRIM_C  = '#5C3A1E'

/* ── Room divider with archway ── */
function RoomDivider({ z }) {
  const dW = 1.2, dH = 2.2
  const side = (ROOM_W - dW) / 2
  return (
    <group position={[0, 0, z]}>
      <mesh position={[-(dW / 2 + side / 2), ROOM_H / 2, 0]}>
        <boxGeometry args={[side, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      <mesh position={[(dW / 2 + side / 2), ROOM_H / 2, 0]}>
        <boxGeometry args={[side, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      <mesh position={[0, dH + (ROOM_H - dH) / 2, 0]}>
        <boxGeometry args={[dW, ROOM_H - dH, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      {/* Arch trim */}
      <mesh position={[0, dH + 0.045, 0]}>
        <boxGeometry args={[dW + 0.12, 0.09, 0.13]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.55} />
      </mesh>
      {[-(dW / 2 + 0.045), dW / 2 + 0.045].map((x, i) => (
        <mesh key={i} position={[x, dH / 2, 0]}>
          <boxGeometry args={[0.09, dH, 0.13]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.55} />
        </mesh>
      ))}
    </group>
  )
}

/* ── House structure ── */
function HouseStructure() {
  const mid     = (START_Z + END_Z) / 2
  const halfLen = (START_Z - END_Z) / 2 + 2

  return (
    <group>
      {/* Polished parquet floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={FLOOR_C} roughness={0.18} metalness={0.06} />
      </mesh>
      {/* Plank lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-2.4 + i * 1.2, 0.0015, mid]}>
          <planeGeometry args={[0.03, halfLen * 2]} />
          <meshStandardMaterial color="#6B4820" roughness={0.25} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={CEIL_C} roughness={0.92} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, mid]}>
        <boxGeometry args={[0.07, ROOM_H, halfLen * 2]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Right wall — gap for garden window (z -13 to -19) */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -2.0]}>
        <boxGeometry args={[0.07, ROOM_H, 16]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -23.0]}>
        <boxGeometry args={[0.07, ROOM_H, 10]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM_H / 2, -28]}>
        <boxGeometry args={[ROOM_W, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Plinthes (baseboards) */}
      {[-ROOM_W / 2 + 0.035, ROOM_W / 2 - 0.035].map((x, i) => (
        <mesh key={i} position={[x, 0.075, mid]}>
          <boxGeometry args={[0.07, 0.15, halfLen * 2]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.52} />
        </mesh>
      ))}

      {/* Room dividers */}
      <RoomDivider z={-4}  />
      <RoomDivider z={-12} />
      <RoomDivider z={-20} />

      {/* Global floor ContactShadow */}
      <ContactShadows
        position={[0, 0.002, mid]}
        width={ROOM_W} height={halfLen * 2}
        far={2.5} resolution={256}
        color="#1A0800" opacity={0.28} blur={2.2}
      />
    </group>
  )
}

/* ── Camera rig — scroll + GSAP zoom ── */
function CameraRig({ zoomState, onSelect, onZoom }) {
  const scroll    = useScroll()
  const camPos    = useRef({ x: 0, y: 1.6, z: START_Z })
  const camLook   = useRef({ x: 0, y: 1.25, z: START_Z - 5 })
  const isZooming = useRef(false)
  const zoomed    = useRef(false)

  useEffect(() => {
    if (zoomState) {
      zoomed.current    = true
      isZooming.current = true
      const [px, py, pz] = zoomState.cameraPos
      const [lx, ly, lz] = zoomState.cameraLook
      gsap.killTweensOf([camPos.current, camLook.current])
      gsap.to(camPos.current, { x: px, y: py, z: pz, duration: 1.3, ease: 'power3.inOut', onComplete: () => { isZooming.current = false } })
      gsap.to(camLook.current, { x: lx, y: ly, z: lz, duration: 1.3, ease: 'power3.inOut' })
    } else {
      const t       = scroll.offset
      const returnZ = START_Z + t * (END_Z - START_Z)
      isZooming.current = true
      gsap.killTweensOf([camPos.current, camLook.current])
      gsap.to(camPos.current, { x: 0, y: 1.6, z: returnZ, duration: 1.1, ease: 'power2.inOut', onComplete: () => { zoomed.current = false; isZooming.current = false } })
      gsap.to(camLook.current, { x: 0, y: 1.25, z: returnZ - 5, duration: 1.1, ease: 'power2.inOut' })
    }
  }, [zoomState])

  useFrame((state) => {
    if (!zoomed.current && !isZooming.current) {
      // Normal scroll movement
      const t       = scroll.offset
      const targetZ = START_Z + t * (END_Z - START_Z)
      camPos.current.x  = THREE.MathUtils.lerp(camPos.current.x,  0,        0.055)
      camPos.current.y  = THREE.MathUtils.lerp(camPos.current.y,  1.6,      0.055)
      camPos.current.z  = THREE.MathUtils.lerp(camPos.current.z,  targetZ,  0.055)
      camLook.current.x = THREE.MathUtils.lerp(camLook.current.x, 0,        0.055)
      camLook.current.y = THREE.MathUtils.lerp(camLook.current.y, 1.25,     0.055)
      camLook.current.z = THREE.MathUtils.lerp(camLook.current.z, targetZ - 5, 0.055)
    }
    state.camera.position.set(camPos.current.x, camPos.current.y, camPos.current.z)
    state.camera.lookAt(camLook.current.x, camLook.current.y, camLook.current.z)
  })

  return (
    <>
      <ambientLight intensity={0.18} color="#FFF3DC" />
      {/* Entry spot */}
      <spotLight position={[0, 2.9, 1]} angle={0.5} penumbra={0.7} intensity={28} color="#FFD580" castShadow={false} />

      <HouseStructure />
      <Entrance     onSelect={onSelect} />
      <LivingRoomPremium onZoom={onZoom} />
      <GardenView   onSelect={onSelect} />
      <Office       onSelect={onSelect} />
    </>
  )
}

/* ── Post-processing — conditional DOF on zoom ── */
function PostFX({ isZoomed }) {
  return (
    <EffectComposer multisampling={2}>
      {isZoomed
        ? <DepthOfField focusDistance={0.014} focalLength={0.032} bokehScale={5} />
        : <></>
      }
      <Bloom
        intensity={0.22}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.88}
        blendFunction={BlendFunction.ADD}
      />
      <Noise opacity={0.025} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  )
}

/* ── Main export ── */
export default function HouseScene() {
  const [simplePanel, setSimplePanel] = useState(null)  // for entrance / office items
  const [zoomState,   setZoomState]   = useState(null)  // { cameraPos, cameraLook, serviceId }

  const handleZoom = useCallback((target) => {
    setZoomState(target)
  }, [])

  const handleZoomBack = useCallback(() => {
    setZoomState(null)
  }, [])

  const isZoomed = zoomState !== null

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <HUD />

      {/* Luxury zoom overlay (living room / garden / office) */}
      {isZoomed && (
        <ZoomOverlay serviceId={zoomState.serviceId} onBack={handleZoomBack} />
      )}

      {/* Simple info panel (entrance, small items) */}
      {simplePanel && !isZoomed && (
        <InfoPanel serviceId={simplePanel} onClose={() => setSimplePanel(null)} />
      )}

      <Canvas
        camera={{ position: [0, 1.6, START_Z], fov: 62 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Environment preset="apartment" />

        <ScrollControls pages={4} damping={0.12} distance={1} enabled={!isZoomed}>
          <CameraRig
            zoomState={zoomState}
            onSelect={setSimplePanel}
            onZoom={handleZoom}
          />
        </ScrollControls>

        <PostFX isZoomed={isZoomed} />
      </Canvas>
    </div>
  )
}
