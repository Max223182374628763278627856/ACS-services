import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'

import Facade       from './Facade'
import Entrance     from './Entrance'
import LivingRoomV2 from './LivingRoomV2'
import GardenView   from './GardenView'
import Office       from './Office'
import HUD          from './HUD'
import InfoPanel    from './InfoPanel'
import ServicePage  from './ServicePage'
import Loader       from './Loader'
import StoryText    from './StoryText'
import CustomCursor from './CustomCursor'
import scrollStore  from './scrollStore'

/* ══════════════════════════════════════════
   CAMERA TRAJECTORY  (pages=5)
   t=0 : outside facing facade
   t=0.15 : stepping through the door
   t=0.25 : entrance interior
   t=0.45 : living room
   t=0.65 : garden view
   t=0.85 : office
   t=1.00 : end
   ══════════════════════════════════════════ */
const CAM_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0.00, 1.65, 14.0),  // outside — facing facade
  new THREE.Vector3( 0.00, 1.65,  9.5),  // approaching front door
  new THREE.Vector3( 0.00, 1.65,  5.8),  // just before the door
  new THREE.Vector3( 0.08, 1.65,  1.2),  // through the door — entrance
  new THREE.Vector3( 0.00, 1.65, -4.0),  // E→L transition
  new THREE.Vector3(-0.18, 1.65, -8.0),  // living room
  new THREE.Vector3( 0.00, 1.65,-12.0),  // L→G transition
  new THREE.Vector3( 0.28, 1.65,-16.0),  // garden
  new THREE.Vector3( 0.10, 1.65,-20.0),  // G→O transition
  new THREE.Vector3( 0.00, 1.65,-24.0),  // office
  new THREE.Vector3( 0.00, 1.65,-26.0),  // end
])
CAM_CURVE.tension = 0.42

/* LookAt spline — the "head turning" */
const LOOK_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0.00, 1.55,  8.0),   // outside: looking at facade/door
  new THREE.Vector3( 0.00, 1.52,  4.5),   // approaching: looking at door handle
  new THREE.Vector3( 0.00, 1.48,  2.0),   // entering: straight ahead
  new THREE.Vector3( 1.15, 1.52,  0.0),   // entrance: glance right at frame
  new THREE.Vector3(-0.35, 1.30, -5.5),   // turning left toward living
  new THREE.Vector3(-1.50, 1.08, -7.5),   // living: looking at elderly person
  new THREE.Vector3( 0.50, 1.30,-13.0),   // turning right toward garden
  new THREE.Vector3( 2.80, 1.50,-16.5),   // garden: bay window
  new THREE.Vector3( 0.50, 1.30,-21.0),   // turning back to center
  new THREE.Vector3( 0.30, 0.85,-24.2),   // office: desk/laptop
  new THREE.Vector3( 0.30, 0.85,-24.2),   // end
])
LOOK_CURVE.tension = 0.42

/* ══════════════════════════════════════════
   HOUSE STRUCTURE — dark cinematic palette
   ══════════════════════════════════════════ */
const FLOOR_C = '#1A1208'   // near-black with warm tint — MeshPhysicalMaterial set below
const CEIL_C  = '#0D1220'   // very dark navy ceiling
const WALL_C  = '#0F1826'   // deep navy wall
const TRIM_C  = '#2A1A08'   // dark wood trim
const ROOM_W  = 6
const ROOM_H  = 3

function RoomDivider({ z }) {
  const dW = 1.25, dH = 2.25
  const side = (ROOM_W - dW) / 2
  return (
    <group position={[0, 0, z]}>
      <mesh position={[-(dW / 2 + side / 2), ROOM_H / 2, 0]}>
        <boxGeometry args={[side, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>
      <mesh position={[(dW / 2 + side / 2), ROOM_H / 2, 0]}>
        <boxGeometry args={[side, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>
      <mesh position={[0, dH + (ROOM_H - dH) / 2, 0]}>
        <boxGeometry args={[dW, ROOM_H - dH, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
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
      {/* Dark reflective parquet — MeshPhysicalMaterial */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshPhysicalMaterial
          color="#120D06"
          roughness={0.1}
          metalness={0.8}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
      {/* Subtle plank joints — barely visible in dark */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-2.4 + i * 1.2, 0.0015, mid]}>
          <planeGeometry args={[0.02, halfLen * 2]} />
          <meshStandardMaterial color="#0A0806" roughness={0.15} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, mid]}>
        <planeGeometry args={[ROOM_W, halfLen * 2]} />
        <meshStandardMaterial color={CEIL_C} roughness={0.96} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_W / 2, ROOM_H / 2, mid]}>
        <boxGeometry args={[0.07, ROOM_H, halfLen * 2]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>

      {/* Right wall — two segments (gap z -13 to -19 for garden window) */}
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -2.0]}>
        <boxGeometry args={[0.07, ROOM_H, 16]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>
      <mesh position={[ROOM_W / 2, ROOM_H / 2, -23.5]}>
        <boxGeometry args={[0.07, ROOM_H, 9]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM_H / 2, -28.0]}>
        <boxGeometry args={[ROOM_W, ROOM_H, 0.1]} />
        <meshStandardMaterial color={WALL_C} roughness={0.92} />
      </mesh>

      {/* Baseboards */}
      {[-ROOM_W / 2 + 0.034, ROOM_W / 2 - 0.034].map((x, i) => (
        <mesh key={i} position={[x, 0.075, mid]}>
          <boxGeometry args={[0.068, 0.15, halfLen * 2]} />
          <meshStandardMaterial color={TRIM_C} roughness={0.52} metalness={0.1} />
        </mesh>
      ))}

      {/* Room arch dividers */}
      <RoomDivider z={-4}  />
      <RoomDivider z={-12} />
      <RoomDivider z={-20} />

      {/* Floor shadow — subtle on dark floor */}
      <ContactShadows
        position={[0, 0.002, mid]} width={ROOM_W} height={halfLen * 2}
        far={2.2} resolution={256} color="#000000" opacity={0.6} blur={2.8}
      />
    </group>
  )
}

/* ══════════════════════════════════════════
   CAMERA RIG
   ══════════════════════════════════════════ */
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
    /* Update shared scroll store for HTML components */
    scrollStore.offset = scroll.offset

    if (!isZoomed.current && !isAnimating.current) {
      const t = Math.max(0, Math.min(1, scroll.offset))
      CAM_CURVE.getPoint(t, _camPt)
      LOOK_CURVE.getPoint(t, _lookPt)
      _camTarget.lerp(_camPt, 0.06)
      _lookTarget.lerp(_lookPt, 0.045)
    }

    state.camera.position.copy(_camTarget)
    _mat4.lookAt(_camTarget, _lookTarget, _up)
    _quat.setFromRotationMatrix(_mat4)
    state.camera.quaternion.slerp(_quat, 0.07)
  })

  return (
    <>
      {/* Ambient — cool, low, cinematic */}
      <ambientLight intensity={0.08} color="#1E2A4A" />

      {/* Sun — warm through windows */}
      <directionalLight position={[4, 10, 18]} intensity={2.2} color="#FFD9A0" />

      {/* Interior warm fill */}
      <directionalLight position={[6, 4, -15]} intensity={1.4} color="#FFE0B0" />

      {/* Entry spot — warm cone */}
      <spotLight
        position={[0.5, 2.9, 2.5]} target-position={[0, 0, 0]}
        angle={0.5} penumbra={0.7} intensity={18} color="#FFD880"
      />

      {/* Living room warm fill */}
      <pointLight position={[0, 2.5, -8]} intensity={8} color="#FF9040" distance={6} decay={2} />

      {/* Garden backlight */}
      <pointLight position={[3, 2, -16]} intensity={12} color="#A0D8FF" distance={8} decay={2} />

      {/* Office desk lamp */}
      <pointLight position={[0.5, 1.2, -24]} intensity={10} color="#FFE8B0" distance={4} decay={2} />

      <Facade />
      <HouseStructure />
      <Entrance    onSelect={onSimpleSelect} />
      <LivingRoomV2 onZoom={onZoom} />
      <GardenView  onSelect={onSimpleSelect} />
      <Office      onSelect={onSimpleSelect} />
    </>
  )
}

/* ══════════════════════════════════════════
   POST FX — cinematic grade
   ══════════════════════════════════════════ */
function PostFX({ isZoomed }) {
  return (
    <EffectComposer multisampling={2}>
      {isZoomed
        ? <DepthOfField focusDistance={0.013} focalLength={0.028} bokehScale={5.5} />
        : <></>
      }
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.85}
        kernelSize={KernelSize.LARGE}
        blendFunction={BlendFunction.ADD}
      />
      <Noise opacity={0.032} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette eskil={false} offset={0.3} darkness={0.85} blendFunction={BlendFunction.NORMAL} />
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
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020617', cursor: 'none' }}>
      <CustomCursor />
      <HUD />
      <StoryText />

      {/* Full-screen service page */}
      <AnimatePresence>
        {pageVisible && zoomState && (
          <ServicePage serviceId={zoomState.serviceId} onClose={handleBack} />
        )}
      </AnimatePresence>

      {/* Simple info panel */}
      <AnimatePresence>
        {simplePanel && !isZoomed && (
          <InfoPanel serviceId={simplePanel} onClose={() => setSimplePanel(null)} />
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [0, 1.65, 14], fov: 64 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, powerPreference: 'high-performance', toneMappingExposure: 0.7 }}
        onCreated={({ gl }) => { gl.toneMapping = 4 /* ACESFilmic */ }}
      >
        {/* Deep navy sky */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 22, 48]} />

        <Environment preset="night" />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.09} distance={1} enabled={!isZoomed}>
            <CameraRig
              zoomState={zoomState}
              onSimpleSelect={setSimplePanel}
              onZoom={handleZoom}
            />
          </ScrollControls>
        </Suspense>

        <PostFX isZoomed={isZoomed} />
      </Canvas>
    </div>
  )
}
