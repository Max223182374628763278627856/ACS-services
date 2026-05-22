import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import HouseModel from './HouseModel'
import BriefcaseModel from './BriefcaseModel'
import CarModel from './CarModel'
import LaptopModel from './LaptopModel'

const MODELS = {
  autonomie:      HouseModel,
  recrutement:    BriefcaseModel,
  accompagnement: CarModel,
  administratif:  LaptopModel,
}

/* Soft glow disk under each object */
function GlowDisk({ color, hovered }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 1.8) * 0.08
    ref.current.material.opacity = hovered ? 0.22 : 0.1 * pulse
    const s = hovered ? 1.15 : pulse
    ref.current.scale.set(s, 1, s)
  })
  return (
    <mesh ref={ref} position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.9, 40]} />
      <meshStandardMaterial color={color} transparent opacity={0.1} depthWrite={false} />
    </mesh>
  )
}

export default function BoardTile({ service, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const Model = MODELS[service.id]
  const [px, , pz] = service.position

  return (
    <group
      position={[px, 0, pz]}
      onClick={() => onSelect(service)}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
    >
      <GlowDisk color={service.color} hovered={hovered} />

      <Float
        speed={1.8}
        rotationIntensity={hovered ? 0.6 : 0.25}
        floatIntensity={hovered ? 0.7 : 0.4}
      >
        <group scale={hovered ? 1.08 : 1}>
          <Model
            color={service.color}
            dark={service.dark}
            hovered={hovered}
          />
        </group>
      </Float>
    </group>
  )
}
