import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    size: 'large',  // col-span-2 row-span-2
    color: '#0ea5e9',
    bg: '#f0f9ff',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C10.5 4 6 8.5 6 14c0 3.5 1.8 6.6 4.5 8.4L9 28h14l-1.5-5.6C24.2 20.6 26 17.5 26 14c0-5.5-4.5-10-10-10z" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="16" cy="14" r="3" fill="#0ea5e9" opacity="0.6"/>
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
    color: '#22c55e',
    bg: '#f0fdf4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="16" rx="3" fill="#bbf7d0" stroke="#22c55e" strokeWidth="1.5"/>
        <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="16" r="2.5" fill="#22c55e"/>
      </svg>
    ),
    title: 'Recrutement',
    subtitle: 'Intérim · CDD · CDI',
    desc: 'Placement de personnel qualifié dans les métiers du service à la personne.',
  },
  {
    size: 'small',
    color: '#f97316',
    bg: '#fff7ed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M14 9v5l3.5 3.5" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Accompagnement',
    subtitle: 'Transport · Démarches',
    desc: 'Rendez-vous médicaux, courses, sorties culturelles — nous assurons la mobilité.',
  },
  {
    size: 'wide',  // col-span-3 row-span-1
    color: '#8b5cf6',
    bg: '#faf5ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M9 11h10M9 15h6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pôle Administratif',
    subtitle: 'APA · MDPH · Conseil · Suivi',
    desc: "Nous guidons vos démarches administratives : demande d'APA, dossiers MDPH, montage des dossiers d'aides.",
    tags: ['APA', 'MDPH', 'Crédit d\'impôt', 'CESU'],
  },
]

const FadeUp = ({ children, delay = 0, className = '', style = {} }) => {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  )
}

function Card({ card, delay }) {
  const isLarge = card.size === 'large'
  const isWide  = card.size === 'wide'

  const gridStyle = isLarge
    ? { gridColumn: 'span 2', gridRow: 'span 2' }
    : isWide
    ? { gridColumn: 'span 3' }
    : {}

  return (
    <FadeUp delay={delay} style={gridStyle}>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.09)' }}
        transition={{ duration: 0.25 }}
        style={{
          height: '100%', borderRadius: 28,
          background: card.bg, padding: isLarge ? 40 : 28,
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column', gap: isLarge ? 16 : 12,
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* cercle décoratif */}
        <div style={{
          position: 'absolute', bottom: -32, right: -32,
          width: 100, height: 100, borderRadius: '50%',
          background: card.color, opacity: 0.07,
          transition: 'all 0.4s',
        }} />

        {/* icône */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'white', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
          {card.icon}
        </div>

        {/* texte */}
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
            fontWeight: 600, color: card.color, letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 4 }}>
            {card.subtitle}
          </p>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isLarge ? '1.7rem' : '1.15rem', fontWeight: 700,
            color: '#0d1117', lineHeight: 1.2, letterSpacing: '-0.02em',
          }}>
            {card.title}
          </h3>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
          fontWeight: 300, lineHeight: 1.7, color: '#6b7280',
          maxWidth: isLarge ? 380 : '100%' }}>
          {card.desc}
        </p>

        {card.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {card.tags.map(t => (
              <span key={t} style={{
                padding: '4px 12px', borderRadius: 999,
                background: 'white', border: `1px solid ${card.color}30`,
                fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                fontWeight: 500, color: card.color,
              }}>{t}</span>
            ))}
          </div>
        )}

        {card.cta && (
          <motion.a href="#contact"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 999, background: card.color,
              color: 'white', textDecoration: 'none', alignSelf: 'flex-start',
              fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 500,
              boxShadow: `0 6px 20px ${card.color}35`,
            }}>
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
    <section id="services" style={{ padding: '120px 0', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        {/* Header section */}
        <div ref={ref} style={{ marginBottom: 64, maxWidth: 560 }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
              fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.18em',
              textTransform: 'uppercase' }}>Nos services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700,
              color: '#0d1117', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Tout ce dont vous avez besoin,{' '}
            <em style={{ fontStyle: 'italic', color: '#9ca3af', fontWeight: 400 }}>sous un même toit.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem',
              fontWeight: 300, lineHeight: 1.75, color: '#9ca3af' }}>
            De la garde de seniors à la gestion administrative, nous couvrons l'ensemble
            de vos besoins avec la même exigence de qualité.
          </motion.p>
        </div>

        {/* Bento grid 3 colonnes */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto', gap: 20,
        }}>
          {CARDS.map((card, i) => (
            <Card key={card.title} card={card} delay={i * 0.07} />
          ))}
        </div>

      </div>
    </section>
  )
}
