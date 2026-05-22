import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import HouseModel from './HouseModel'
import BriefcaseModel from './BriefcaseModel'
import CarModel from './CarModel'
import LaptopModel from './LaptopModel'

const MODELS = {
  autonomie: HouseModel,
  recrutement: BriefcaseModel,
  accompagnement: CarModel,
  administratif: LaptopModel,
}

function PulseRing({ color }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
    ref.current.scale.set(s, 1, s)
    ref.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.78, 0.85, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.15} />
    </mesh>
  )
}

export default function BoardTile({ service, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const tileRef = useRef()

  useFrame(() => {
    if (!tileRef.current) return
    const target = hovered ? 0.12 : 0.08
    tileRef.current.scale.y += (target - tileRef.current.scale.y) * 0.1
  })

  const Model = MODELS[service.id]
  const [px, , pz] = service.position

  return (
    <group position={[px, 0, pz]}>
      {/* Tile platform */}
      <mesh
        ref={tileRef}
        position={[0, 0.04, 0]}
        receiveShadow
        onClick={() => onSelect(service)}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <cylinderGeometry args={[0.75, 0.75, 0.08, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : service.color}
          roughness={0.3}
          metalness={0.15}
          emissive={hovered ? service.accent : '#000000'}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
      </mesh>

      {/* Accent ring */}
      <mesh position={[0, 0.03, 0]}>
        <torusGeometry args={[0.77, 0.03, 8, 32]} />
        <meshStandardMaterial color={service.accent} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* 3D Model */}
      <group position={[0, 0.08, 0]}>
        <Model color={service.color} hovered={hovered} />
      </group>

      {!hovered && <PulseRing color={service.accent} />}
    </group>
  )
}
