import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import scrollStore from './scrollStore'

const ZONES = [
  {
    id: 'entree',
    range: [0.12, 0.32],
    title: 'L\'entrée',
    text: 'L\'excellence du service,\nla chaleur d\'une présence.',
  },
  {
    id: 'salon',
    range: [0.32, 0.52],
    title: 'Le salon',
    text: 'Parce que rester chez soi est essentiel.\nNous veillons sur vos proches avec bienveillance.',
  },
  {
    id: 'jardin',
    range: [0.52, 0.72],
    title: 'Le jardin',
    text: 'Un intérieur soigné, un extérieur préservé.\nLibérez-vous des contraintes.',
  },
  {
    id: 'bureau',
    range: [0.72, 0.96],
    title: 'Le bureau',
    text: 'Plus qu\'un métier, une vocation.\nConstruisons ensemble votre futur professionnel.',
  },
]

function getZone(offset) {
  for (const z of ZONES) {
    if (offset >= z.range[0] && offset < z.range[1]) return z
  }
  return null
}

export default function StoryText() {
  const [zone, setZone] = useState(null)

  useEffect(() => {
    let id
    const poll = () => {
      const z = getZone(scrollStore.offset)
      setZone(prev => {
        if (!z && !prev) return prev
        if (!z || !prev) return z ?? null
        if (z.id === prev.id) return prev
        return z
      })
      id = requestAnimationFrame(poll)
    }
    id = requestAnimationFrame(poll)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 72, left: 0, right: 0,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 40,
    }}>
      <AnimatePresence mode="wait">
        {zone && (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textAlign: 'center',
              maxWidth: 600,
              padding: '0 24px',
            }}
          >
            <motion.span
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.28em',
                color: '#38bdf8',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {zone.title}
            </motion.span>
            <p style={{
              margin: 0,
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              fontWeight: 300,
              color: 'rgba(226,232,240,0.92)',
              lineHeight: 1.55,
              whiteSpace: 'pre-line',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.01em',
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}>
              {zone.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
