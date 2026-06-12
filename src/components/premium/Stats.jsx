import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { n: '500+', label: 'Familles\naccompagnées', color: '#0ea5e9' },
  { n: '98%',  label: 'Taux de\nsatisfaction', color: '#22c55e' },
  { n: '15',   label: 'Années\nd\'expertise', color: '#8b5cf6' },
  { n: '7j/7', label: 'Disponibilité\ncomplète', color: '#f97316' },
]

export default function Stats() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        {/* Filet + label */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 72, justifyContent: 'center' }}>
          <span style={{ flex: 1, height: 1, background: '#f3f4f6', maxWidth: 200, display: 'block' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600,
            color: '#9ca3af', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            En chiffres
          </span>
          <span style={{ flex: 1, height: 1, background: '#f3f4f6', maxWidth: 200, display: 'block' }} />
        </motion.div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map(({ n, label, color }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center', padding: '0 32px',
                borderRight: i < 3 ? '1px solid #f3f4f6' : 'none',
              }}>

              {/* Nombre */}
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700,
                color: '#0d1117', lineHeight: 1, letterSpacing: '-0.04em',
                marginBottom: 8,
              }}>
                {n.slice(0, -1) || n}
                <span style={{ color, fontSize: '60%' }}>
                  {n.slice(-1) !== n ? n.slice(-1) : ''}
                </span>
              </div>

              {/* Filet coloré */}
              <motion.div
                initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                style={{ width: 32, height: 2, background: color, margin: '16px auto', borderRadius: 1 }}
              />

              {/* Label */}
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                fontWeight: 400, color: '#9ca3af', lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bandeau avantages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: 80, display: 'flex', gap: 32, justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {[
            'Agréé Service à la Personne',
            'Intervenants diplômés & formés',
            'Crédit d\'impôt 50%',
            'Continuité de service garantie',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                fontWeight: 400, color: '#6b7280' }}>{item}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
