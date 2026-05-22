import { useRef, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { gsap } from 'gsap'
import { Color } from 'three'
import BoardTile from './BoardTile'
import { SERVICES } from '../data/services'

/* ── Camera controller with GSAP zoom ────────────────────── */
function CameraController({ target, onDone }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (!controlsRef.current) return
    if (target) {
      const [tx, , tz] = target.position
      gsap.to(camera.position, {
        x: tx * 0.45, y: 2.2, z: tz * 0.45 + 4.2,
        duration: 1.1, ease: 'power3.inOut',
      })
      gsap.to(controlsRef.current.target, {
        x: tx * 0.3, y: 0.4, z: tz * 0.3,
        duration: 1.1, ease: 'power3.inOut',
        onUpdate: () => controlsRef.current?.update(),
        onComplete: onDone,
      })
    } else {
      gsap.to(camera.position, {
        x: 0, y: 3.2, z: 6.5,
        duration: 1.0, ease: 'power3.inOut',
      })
      gsap.to(controlsRef.current.target, {
        x: 0, y: 0.3, z: 0,
        duration: 1.0, ease: 'power3.inOut',
        onUpdate: () => controlsRef.current?.update(),
      })
    }
  }, [target])

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0.3, 0]}
      enablePan={false}
      minDistance={3.5}
      maxDistance={9}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 2.5}
    />
  )
}

/* ── Inner scene ──────────────────────────────────────────── */
function Scene({ onSelectService }) {
  const [zoomTarget, setZoomTarget] = useState(null)

  return (
    <>
      <CameraController
        target={zoomTarget}
        onDone={() => zoomTarget && onSelectService(zoomTarget)}
      />

      {/* IBL — realistic studio lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.6} />

      {/* Contact shadows on the white floor */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
        color="#94a3b8"
      />

      {SERVICES.map((service) => (
        <BoardTile
          key={service.id}
          service={service}
          onSelect={(s) => setZoomTarget(s)}
        />
      ))}
    </>
  )
}

/* ── Canvas ───────────────────────────────────────────────── */
export default function BoardScene({ onSelectService }) {
  return (
    <Canvas
      camera={{ position: [0, 3.2, 6.5], fov: 35 }}
      shadows
      frameloop="always"
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      onCreated={({ scene, gl }) => {
        scene.background = new Color('#f8fafc')
        gl.setClearColor('#f8fafc', 1)
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene onSelectService={onSelectService} />
    </Canvas>
  )
}
