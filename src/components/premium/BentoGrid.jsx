import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

const CARDS = [
  {
    size: 'large',
    color: '#0ea5e9', bg: '#f0f9ff',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 3C9.5 3 5 7.5 5 13c0 3.3 1.6 6.2 4.2 8L8 27h14l-1.2-6C23.4 19.2 25 16.3 25 13 25 7.5 20.5 3 15 3z"
          fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="15" cy="13" r="3" fill="#0ea5e9" opacity="0.55"/>
      </svg>
    ),
    title: 'Maintien à domicile',
    subtitle: 'Seniors & Autonomie',
    desc: 'Auxiliaire de vie, aide à la toilette, repas, courses, sorties — vos proches restent chez eux en toute sécurité.',
    tags: ['Auxiliaire de vie', 'Ménage', 'Jardinage', 'Bricolage'],
    cta: true,
  },
  {
    size: 'small',
    color: '#22c55e', bg: '#f0fdf4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="16" rx="3" fill="#bbf7d0" stroke="#22c55e" strokeWidth="1.4"/>
        <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="16" r="2.5" fill="#22c55e"/>
      </svg>
    ),
    title: 'Recrutement',
    subtitle: 'Intérim · CDD · CDI',
    desc: 'Placement de personnel qualifié dans les métiers du service à la personne.',
  },
  {
    size: 'small',
    color: '#f97316', bg: '#fff7ed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" fill="#fed7aa" stroke="#f97316" strokeWidth="1.4"/>
        <path d="M14 9v5l3.5 3.5" stroke="#f97316" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Accompagnement',
    subtitle: 'Transport · Démarches',
    desc: 'Rendez-vous médicaux, courses, sorties culturelles — nous assurons la mobilité.',
  },
  {
    size: 'wide',
    color: '#8b5cf6', bg: '#faf5ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.4"/>
        <path d="M9 11h10M9 15h6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pôle Administratif',
    subtitle: 'APA · MDPH · Conseil · Suivi',
    desc: "Nous guidons vos démarches administratives : demande d'APA, dossiers MDPH, montage des dossiers d'aides.",
    tags: ['APA', 'MDPH', 'Crédit d\'impôt', 'CESU'],
  },
]

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}>
      {children}
    </motion.div>
  )
}

function Card({ card, delay }) {
  const isLarge = card.size === 'large'
  const isWide  = card.size === 'wide'
  const gridStyle = isLarge ? { gridColumn: 'span 2', gridRow: 'span 2' }
                  : isWide  ? { gridColumn: 'span 3' } : {}

  return (
    <FadeUp delay={delay} style={gridStyle}>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(0,0,0,0.09)' }}
        transition={{ duration: 0.22 }}
        style={{
          height: '100%', borderRadius: 28, background: card.bg,
          padding: isLarge ? 44 : 32,
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column', gap: isLarge ? 18 : 14,
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
        }}>

        {/* Cercle décoratif fond */}
        <div style={{ position: 'absolute', bottom: -36, right: -36,
          width: 110, height: 110, borderRadius: '50%',
          background: card.color, opacity: 0.06, pointerEvents: 'none' }} />

        {/* Icône */}
        <div style={{ width: 54, height: 54, borderRadius: 15, background: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
          {card.icon}
        </div>

        {/* Texte */}
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
            color: card.color, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
            {card.subtitle}
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isLarge ? '1.75rem' : '1.15rem', fontWeight: 700,
            color: '#0d1117', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
            {card.title}
          </h3>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
          fontWeight: 300, lineHeight: 1.8, color: '#6b7280',
          maxWidth: isLarge ? 360 : '100%' }}>
          {card.desc}
        </p>

        {card.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 2 }}>
            {card.tags.map(t => (
              <span key={t} style={{ padding: '5px 14px', borderRadius: 999,
                background: 'white', border: `1px solid ${card.color}28`,
                fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                fontWeight: 500, color: card.color }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {card.cta && (
          <motion.a href="#contact"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 26px', borderRadius: 999, background: card.color, color: 'white',
              textDecoration: 'none', alignSelf: 'flex-start',
              fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 500,
              boxShadow: `0 6px 22px ${card.color}35` }}>
            En savoir plus
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </motion.a>
        )}
      </motion.div>
    </FadeUp>
  )
}

export default function BentoGrid() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" style={{ padding: '128px 0', background: '#fafafa' }}>
      <div style={C}>

        {/* Header */}
        <div ref={ref} style={{ marginBottom: 72, maxWidth: 580 }}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
              color: '#0ea5e9', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Nos services</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700,
              color: '#0d1117', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18 }}>
            Tout ce dont vous avez besoin,{' '}
            <em style={{ fontStyle: 'italic', color: '#9ca3af', fontWeight: 400 }}>sous un même toit.</em>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem',
              fontWeight: 300, lineHeight: 1.85, color: '#9ca3af' }}>
            De la garde de seniors à la gestion administrative, nous couvrons l'ensemble
            de vos besoins avec la même exigence de qualité.
          </motion.p>
        </div>

        {/* Bento 3 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto', gap: 22 }}>
          {CARDS.map((card, i) => <Card key={card.title} card={card} delay={i * 0.07} />)}
        </div>

      </div>
    </section>
  )
}
