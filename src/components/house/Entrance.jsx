import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const WOOD = '#8B5E3C'
const CREAM = '#F5F0E8'
const DARK_WOOD = '#5C3A1E'
const GOLD = '#D4AF37'

function Door({ position }) {
  return (
    <group position={position}>
      {/* Frame top */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[1.5, 0.15, 0.12]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.7} />
      </mesh>
      {/* Frame left */}
      <mesh position={[-0.68, 1.1, 0]}>
        <boxGeometry args={[0.14, 2.1, 0.12]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.7} />
      </mesh>
      {/* Frame right */}
      <mesh position={[0.68, 1.1, 0]}>
        <boxGeometry args={[0.14, 2.1, 0.12]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.7} />
      </mesh>
      {/* Door panel (slightly open) */}
      <group position={[-0.55, 1.05, -0.05]} rotation={[0, -0.5, 0]}>
        <mesh>
          <boxGeometry args={[1.1, 2.1, 0.07]} />
          <meshStandardMaterial color="#A0522D" roughness={0.6} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.42, 0, 0.06]}>
          <cylinderGeometry args={[0.025, 0.025, 0.18, 8]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

function PhotoFrame({ position, onSelect }) {
  const meshRef = useRef()
  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('about') }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Frame */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.7, 0.6, 0.05]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.6} />
      </mesh>
      {/* Inner white mat */}
      <mesh position={[0, 0, 0.028]}>
        <boxGeometry args={[0.56, 0.46, 0.01]} />
        <meshStandardMaterial color="#fff" roughness={1} />
      </mesh>
      {/* ACS letters */}
      {['A', 'C', 'S'].map((_, i) => (
        <mesh key={i} position={[-0.09 + i * 0.09, 0.02, 0.04]}>
          <boxGeometry args={[0.06, 0.1, 0.02]} />
          <meshStandardMaterial color={i === 1 ? '#4ade80' : '#38bdf8'} roughness={0.5} />
        </mesh>
      ))}
      {/* Hover glow (thin outline) */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.76, 0.66, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.3} emissive={GOLD} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Doormat({ position }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.9, 0.45]} />
      <meshStandardMaterial color="#8B7355" roughness={1} />
    </mesh>
  )
}

export default function Entrance({ onSelect }) {
  const Z = 0

  return (
    <group>
      {/* Door at the start */}
      <Door position={[0, 0, Z + 3.8]} />

      {/* Doormat */}
      <Doormat position={[0, 0.001, Z + 2.2]} />

      {/* Photo frame on right wall */}
      <PhotoFrame position={[2.85, 1.6, Z + 1.5]} onSelect={onSelect} />

      {/* Small overhead light */}
      <pointLight position={[0, 2.7, Z + 1]} intensity={1.2} color="#FFF3DC" distance={6} decay={2} />

      {/* Wall lantern decoration */}
      <mesh position={[2.85, 2.4, Z + 0.5]}>
        <boxGeometry args={[0.15, 0.3, 0.12]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.7} />
      </mesh>
      <pointLight position={[2.5, 2.3, Z + 0.5]} intensity={0.6} color="#FFD700" distance={3} decay={2} />
    </group>
  )
}
