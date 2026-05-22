import { useState, useRef, useCallback, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'

import Entrance    from './Entrance'
import LivingRoomV2 from './LivingRoomV2'
import GardenView  from './GardenView'
import Office      from './Office'
import HUD         from './HUD'
import InfoPanel   from './InfoPanel'
import ServicePage from './ServicePage'

/* ══════════════════════════════════════════
   CAMERA TRAJECTORY
   Two CatmullRom splines sampled at t=scroll.offset
   ══════════════════════════════════════════ */
const CAM_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0.00, 1.65,  7.0),  // 0 — just outside
  new THREE.Vector3( 0.08, 1.65,  1.2),  // 0.14 — entrance
  new THREE.Vector3( 0.00, 1.65, -4.0),  // 0.28 — E→L transition
  new THREE.Vector3(-0.18, 1.65, -8.0),  // 0.42 — living room
  new THREE.Vector3( 0.00, 1.65,-12.0),  // 0.56 — L→G transition
  new THREE.Vector3( 0.28, 1.65,-16.0),  // 0.70 — garden
  new THREE.Vector3( 0.10, 1.65,-20.0),  // 0.84 — G→O transition
  new THREE.Vector3( 0.00, 1.65,-24.0),  // 0.92 — office
  new THREE.Vector3( 0.00, 1.65,-26.0),  // 1.00 — end
])
CAM_CURVE.tension = 0.45

/* LookAt spline — same t, independent from position */
const LOOK_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0.00, 1.40,  4.0),   // entrance: ahead at door
  new THREE.Vector3( 1.15, 1.52,  0.0),   // entrance: frame right wall
  new THREE.Vector3(-0.35, 1.30, -5.5),   // turning left
  new THREE.Vector3(-1.50, 1.08, -7.5),   // living: elderly person
  new THREE.Vector3( 0.50, 1.30,-13.0),   // turning right
  new THREE.Vector3( 2.80, 1.50,-16.5),   // garden: bay window
  new THREE.Vector3( 0.50, 1.30,-21.0),   // turning back
  new THREE.Vector3( 0.30, 0.85,-24.2),   // office: desk
  new THREE.Vector3( 0.30, 0.85,-24.2),   // end
])
LOOK_CURVE.tension = 0.45

/* ══════════════════════════════════════════
   HOUSE STRUCTURE
   ══════════════════════════════════════════ */
const FLOOR_C = '#A08040'
const CEIL_C  = '#ECE8DC'
const WALL_C  = '#EAE5D8'
const TRIM_C  = '#5C3A1E'
const ROOM_W  = 6
const ROOM_H  = 3

function RoomDivider({ z }) {
  const dW = 1.25, dH = 2.25
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
      <mesh position={[0, dH + 0.048, 0]}>
        <boxGeometry args={[dW + 0.14, 0.095, 0.14]} />
        <meshStandardMaterial color={TRIM_C} roughness={0.52} />
      </mesh>
      {[-(dW / 2 + 0.048), dW / 2 + 0.048].map((x, i) => (
        <mesh key={i} position={[x, dH / 2, 0]}>
          <boxGeometry args={[0.095, dH, 0.14]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.52} />
        </mesh>
      ))}
    </group>
  )
}

function HouseStructure() {
  const mid     = -10
  const halfLen = 19

  return (
    <group>
      {/* Polished parquet — low roughness for subtle reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={FLOOR_C} roughness={0.16} metalness={0.05} />
      </mesh>
      {/* Plank joints */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-2.4 + i * 1.2, 0.0012, mid]}>
          <planeGeometry args={[0.028, halfLen * 2]} />
          <meshStandardMaterial color="#6B4820" roughness={0.22} />
        </mesh>
      ))}

      {/* Ceiling — mat plaster */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={CEIL_C} roughness={0.94} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, mid]}>
        <boxGeometry args={[0.07, ROOM_H, halfLen * 2]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Right wall — two segments (gap z -13 to -19 for garden window) */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -2.0]}>
        <boxGeometry args={[0.07, ROOM_H, 16]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -23.5]}>
        <boxGeometry args={[0.07, ROOM_H, 9]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM_H / 2, -28.0]}>
        <boxGeometry args={[ROOM_W, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.88} />
      </mesh>

      {/* Plinthes (baseboards) — both sides */}
      {[-ROOM_W / 2 + 0.034, ROOM_W / 2 - 0.034].map((x, i) => (
        <mesh key={i} position={[x, 0.075, mid]}>
          <boxGeometry args={[0.068, 0.15, halfLen * 2]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.52} />
        </mesh>
      ))}

      {/* Room arch dividers */}
      <RoomDivider z={-4}  />
      <RoomDivider z={-12} />
      <RoomDivider z={-20} />

      {/* Global floor shadow */}
      <ContactShadows
        position={[0, 0.002, mid]} width={ROOM_W} height={halfLen * 2}
        far={2.2} resolution={256} color="#1A0800" opacity={0.25} blur={2.5}
      />
    </group>
  )
}

/* ══════════════════════════════════════════
   CAMERA RIG — trajectory + zoom
   ══════════════════════════════════════════ */
/* Pre-allocated to avoid GC pressure every frame */
const _camTarget  = new THREE.Vector3(0, 1.65, 7)
const _lookTarget = new THREE.Vector3(0, 1.4, 4)
const _camPt      = new THREE.Vector3()
const _lookPt     = new THREE.Vector3()
const _mat4       = new THREE.Matrix4()
const _quat       = new THREE.Quaternion()
const _up         = new THREE.Vector3(0, 1, 0)

function CameraRig({ zoomState, onSimpleSelect, onZoom }) {
  const scroll      = useScroll()
  const isZoomed    = useRef(false)
  const isAnimating = useRef(false)

  useEffect(() => {
    if (zoomState) {
      isZoomed.current    = true
      isAnimating.current = true
      const [px, py, pz] = zoomState.cameraPos
      const [lx, ly, lz] = zoomState.cameraLook
      gsap.killTweensOf([_camTarget, _lookTarget])
      gsap.to(_camTarget, {
        x: px, y: py, z: pz,
        duration: 1.2, ease: 'power3.inOut',
        onComplete: () => { isAnimating.current = false },
      })
      gsap.to(_lookTarget, { x: lx, y: ly, z: lz, duration: 1.1, ease: 'power3.inOut' })
    } else if (isZoomed.current) {
      isAnimating.current = true
      const t = scroll.offset
      CAM_CURVE.getPoint(t, _camPt)
      LOOK_CURVE.getPoint(t, _lookPt)
      gsap.killTweensOf([_camTarget, _lookTarget])
      gsap.to(_camTarget, {
        x: _camPt.x, y: _camPt.y, z: _camPt.z,
        duration: 1.1, ease: 'power2.inOut',
        onComplete: () => { isZoomed.current = false; isAnimating.current = false },
      })
      gsap.to(_lookTarget, { x: _lookPt.x, y: _lookPt.y, z: _lookPt.z, duration: 1.0, ease: 'power2.inOut' })
    }
  }, [zoomState])

  useFrame((state) => {
    if (!isZoomed.current && !isAnimating.current) {
      /* ── Scroll-driven trajectory ── */
      const t = Math.max(0, Math.min(1, scroll.offset))
      CAM_CURVE.getPoint(t, _camPt)
      LOOK_CURVE.getPoint(t, _lookPt)
      _camTarget.lerp(_camPt, 0.06)
      _lookTarget.lerp(_lookPt, 0.045)
    }

    /* Apply position */
    state.camera.position.copy(_camTarget)

    /* Apply lookAt via quaternion slerp — NO snapping */
    _mat4.lookAt(_camTarget, _lookTarget, _up)
    _quat.setFromRotationMatrix(_mat4)
    state.camera.quaternion.slerp(_quat, 0.07)
  })

  return (
    <>
      {/* Ambient — warm base */}
      <ambientLight intensity={0.22} color="#FFF5E0" />

      {/* Entry spot */}
      <spotLight
        position={[0.5, 2.9, 2.5]} target-position={[0, 0, 0]}
        angle={0.5} penumbra={0.7} intensity={35} color="#FFD880"
      />

      {/* Sun from garden window — warm directional */}
      <directionalLight
        position={[6, 4, -15]} intensity={2.8} color="#FFF8DC"
      />

      <HouseStructure />
      <Entrance    onSelect={onSimpleSelect} />
      <LivingRoomV2 onZoom={onZoom} />
      <GardenView  onSelect={onSimpleSelect} />
      <Office      onSelect={onSimpleSelect} />
    </>
  )
}

/* ══════════════════════════════════════════
   POST FX
   ══════════════════════════════════════════ */
function PostFX({ isZoomed }) {
  return (
    <EffectComposer multisampling={2}>
      {isZoomed
        ? <DepthOfField focusDistance={0.013} focalLength={0.028} bokehScale={5.5} />
        : <></>
      }
      <Bloom
        intensity={0.20} luminanceThreshold={0.70}
        luminanceSmoothing={0.90} blendFunction={BlendFunction.ADD}
      />
      <Noise opacity={0.024} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  )
}

/* ══════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════ */
export default function HouseScene() {
  const [simplePanel, setSimplePanel] = useState(null)
  const [zoomState,   setZoomState]   = useState(null)
  const [pageVisible, setPageVisible] = useState(false)
  const pageTimerRef = useRef(null)

  const handleZoom = useCallback((target) => {
    setZoomState(target)
    clearTimeout(pageTimerRef.current)
    pageTimerRef.current = setTimeout(() => setPageVisible(true), 750)
  }, [])

  const handleBack = useCallback(() => {
    setPageVisible(false)
    clearTimeout(pageTimerRef.current)
    pageTimerRef.current = setTimeout(() => setZoomState(null), 380)
  }, [])

  const isZoomed = zoomState !== null

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <HUD />

      {/* Full-screen service page */}
      <AnimatePresence>
        {pageVisible && zoomState && (
          <ServicePage serviceId={zoomState.serviceId} onClose={handleBack} />
        )}
      </AnimatePresence>

      {/* Simple info panel for entrance / small objects */}
      <AnimatePresence>
        {simplePanel && !isZoomed && (
          <InfoPanel serviceId={simplePanel} onClose={() => setSimplePanel(null)} />
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [0, 1.65, 7], fov: 64 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Environment preset="apartment" />

        <ScrollControls pages={4} damping={0.09} distance={1} enabled={!isZoomed}>
          <CameraRig
            zoomState={zoomState}
            onSimpleSelect={setSimplePanel}
            onZoom={handleZoom}
          />
        </ScrollControls>

        <PostFX isZoomed={isZoomed} />
      </Canvas>
    </div>
  )
}
