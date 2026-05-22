import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import { gsap } from 'gsap'
import { Color } from 'three'
import BoardTile from './BoardTile'
import { SERVICES } from '../data/services'

/* ── Board ground ─────────────────────────────────────────── */
function BoardGround() {
  return (
    <group>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[7.5, 0.12, 5.5]} />
        <meshStandardMaterial color="#0d2445" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Border accent lines */}
      <mesh position={[0, -0.04, 2.75]}>
        <boxGeometry args={[7.5, 0.01, 0.06]} />
        <meshStandardMaterial color="#82C341" />
      </mesh>
      <mesh position={[0, -0.04, -2.75]}>
        <boxGeometry args={[7.5, 0.01, 0.06]} />
        <meshStandardMaterial color="#82C341" />
      </mesh>
      <mesh position={[3.77, -0.04, 0]}>
        <boxGeometry args={[0.06, 0.01, 5.5]} />
        <meshStandardMaterial color="#82C341" />
      </mesh>
      <mesh position={[-3.77, -0.04, 0]}>
        <boxGeometry args={[0.06, 0.01, 5.5]} />
        <meshStandardMaterial color="#82C341" />
      </mesh>
      {/* Center circle */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#005596" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* ── Center ACS label (non-Text fallback) ─────────────────── */
function CenterLogo() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03
  })
  return (
    <group ref={ref}>
      {/* A */}
      <mesh position={[-0.22, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshStandardMaterial color="#ffffff" emissive="#005596" emissiveIntensity={0.4} />
      </mesh>
      {/* C */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshStandardMaterial color="#82C341" emissive="#82C341" emissiveIntensity={0.4} />
      </mesh>
      {/* S */}
      <mesh position={[0.22, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshStandardMaterial color="#ffffff" emissive="#005596" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

/* ── Ambient particles ────────────────────────────────────── */
function FloatingParticles() {
  const points = useRef()
  const count = 60

  const posArray = useRef((() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = Math.random() * 3
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  })())

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={posArray.current}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#82C341" size={0.03} transparent opacity={0.5} />
    </points>
  )
}

/* ── Camera controller with GSAP zoom ────────────────────── */
function CameraController({ target, onDone }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (!controlsRef.current) return
    if (target) {
      const [tx, , tz] = target.position
      gsap.to(camera.position, {
        x: tx * 0.55, y: 2.8, z: tz * 0.55 + 2.4,
        duration: 1.1, ease: 'power3.inOut',
      })
      gsap.to(controlsRef.current.target, {
        x: tx * 0.35, y: 0, z: tz * 0.35,
        duration: 1.1, ease: 'power3.inOut',
        onUpdate: () => controlsRef.current?.update(),
        onComplete: onDone,
      })
    } else {
      gsap.to(camera.position, {
        x: 0, y: 6, z: 4.5,
        duration: 1.0, ease: 'power3.inOut',
      })
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0, y: 0, z: 0,
          duration: 1.0, ease: 'power3.inOut',
          onUpdate: () => controlsRef.current?.update(),
        })
      }
    }
  }, [target])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={3}
      maxDistance={10}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
    />
  )
}

/* ── Inner scene ──────────────────────────────────────────── */
function Scene({ onSelectService }) {
  const [zoomTarget, setZoomTarget] = useState(null)

  return (
    <>
      <CameraController target={zoomTarget} onDone={() => zoomTarget && onSelectService(zoomTarget)} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <pointLight position={[-4, 4, -3]} intensity={0.8} color="#005596" />
      <pointLight position={[4, 4, 3]} intensity={0.7} color="#82C341" />

      <FloatingParticles />
      <BoardGround />
      <CenterLogo />

      {SERVICES.map((service) => (
        <BoardTile key={service.id} service={service} onSelect={(s) => setZoomTarget(s)} />
      ))}
    </>
  )
}

/* ── Canvas export ────────────────────────────────────────── */
export default function BoardScene({ onSelectService }) {
  return (
    <Canvas
      camera={{ position: [0, 6, 4.5], fov: 45 }}
      shadows
      frameloop="always"
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      onCreated={({ scene, gl }) => {
        scene.background = new Color('#04091a')
        gl.setClearColor('#04091a', 1)
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene onSelectService={onSelectService} />
    </Canvas>
  )
}
