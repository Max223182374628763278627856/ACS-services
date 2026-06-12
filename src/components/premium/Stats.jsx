import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

const STATS = [
  { n: '500+', label: 'Familles\naccompagnées', color: '#0ea5e9' },
  { n: '98%',  label: 'Taux de\nsatisfaction',  color: '#22c55e' },
  { n: '15',   label: 'Années\nd\'expertise',    color: '#8b5cf6' },
  { n: '7j/7', label: 'Disponibilité\ncomplète', color: '#f97316' },
]

export default function Stats() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '112px 0', background: '#fff',
      borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
      <div ref={ref} style={C}>

        {/* Label centré */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16,
            marginBottom: 80, justifyContent: 'center' }}>
          <span style={{ flex: 1, height: 1, background: '#f3f4f6', display: 'block' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem',
            fontWeight: 600, color: '#d1d5db', letterSpacing: '0.24em',
            textTransform: 'uppercase', whiteSpace: 'nowrap' }}>En chiffres</span>
          <span style={{ flex: 1, height: 1, background: '#f3f4f6', display: 'block' }} />
        </motion.div>

        {/* Grille stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map(({ n, label, color }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', padding: '0 40px',
                borderRight: i < 3 ? '1px solid #f3f4f6' : 'none' }}>

              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3.2rem, 5vw, 5.2rem)',
                fontWeight: 700, color: '#0d1117',
                lineHeight: 1, letterSpacing: '-0.045em',
              }}>
                {n.replace(/[+%j/7]/g, '')}
                <span style={{ color, fontSize: '55%', letterSpacing: '-0.02em' }}>
                  {n.match(/[+%]/) ? n.slice(-1) : n.includes('j/7') ? 'j/7' : ''}
                </span>
              </div>

              <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.45 + i * 0.08 }}
                style={{ width: 28, height: 1.5, background: color,
                  margin: '20px auto', borderRadius: 1, transformOrigin: 'left' }} />

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                fontWeight: 400, color: '#9ca3af', lineHeight: 1.75,
                whiteSpace: 'pre-line', letterSpacing: '0.01em' }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Avantages */}
        <motion.div initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: 88, display: 'flex', gap: 40,
            justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'Agréé Service à la Personne',
            'Intervenants diplômés & formés',
            'Crédit d\'impôt 50 %',
            'Continuité de service garantie',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                fontWeight: 400, color: '#6b7280', letterSpacing: '0.01em' }}>{item}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
