import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const { progress } = useProgress()
  const pct = Math.round(progress)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#020617',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 32,
    }}>
      {/* ACS letter cubes */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['A', 'C', 'S'].map((l, i) => (
          <motion.div
            key={l}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.22, ease: 'easeInOut' }}
            style={{
              width: 48, height: 48, borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 20, fontWeight: 800,
              background: i === 1
                ? 'linear-gradient(135deg,#4ade80,#22d3ee)'
                : 'linear-gradient(135deg,#38bdf8,#818cf8)',
              boxShadow: i === 1
                ? '0 0 24px rgba(74,222,128,0.5)'
                : '0 0 24px rgba(56,189,248,0.4)',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {l}
          </motion.div>
        ))}
      </div>

      {/* Company name */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          color: 'rgba(148,163,184,0.8)',
          fontSize: 13, letterSpacing: '0.25em',
          fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        La Maison de la Sérénité
      </motion.p>

      {/* Progress bar */}
      <div style={{
        width: 200, height: 2,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg,#38bdf8,#4ade80)',
            borderRadius: 2,
            width: `${pct}%`,
          }}
          transition={{ ease: 'easeOut' }}
        />
      </div>

      <span style={{
        color: 'rgba(100,116,139,0.7)',
        fontSize: 11,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: '0.1em',
      }}>
        {pct}%
      </span>
    </div>
  )
}
