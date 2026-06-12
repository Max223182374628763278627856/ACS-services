import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICES } from '../../data/services'

const BENTO = [
  {
    id: 'autonomie',
    span: 'col-span-2 row-span-2',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    accent: '#0ea5e9',
    accentLight: '#e0f2fe',
    emoji: '🏠',
    title: 'Maintien à domicile',
    subtitle: 'Auxiliaire de vie · Ménage · Jardinage · Bricolage',
    featured: true,
  },
  {
    id: 'recrutement',
    span: 'col-span-1 row-span-1',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: '#22c55e',
    accentLight: '#dcfce7',
    emoji: '💼',
    title: 'Recrutement',
    subtitle: 'Intérim · CDD · CDI',
  },
  {
    id: 'accompagnement',
    span: 'col-span-1 row-span-1',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
    accent: '#f97316',
    accentLight: '#fed7aa',
    emoji: '🚗',
    title: 'Accompagnement',
    subtitle: 'Transport · Démarches',
  },
  {
    id: 'administratif',
    span: 'col-span-2 row-span-1',
    bg: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)',
    accent: '#8b5cf6',
    accentLight: '#ede9fe',
    emoji: '📋',
    title: 'Pôle Administratif',
    subtitle: 'APA · MDPH · Conseil · Suivi de vos dossiers d\'aides',
    wide: true,
  },
]

const AVANTAGES = [
  { icon: '✓', text: 'Agréé Service à la Personne' },
  { icon: '✓', text: 'Intervenants diplômés & formés' },
  { icon: '✓', text: 'Crédit d\'impôt 50%' },
  { icon: '✓', text: 'Continuité de service garantie' },
]

function BentoCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const service = SERVICES.find(s => s.id === item.id)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`${item.span} relative rounded-3xl p-8 overflow-hidden cursor-pointer group`}
      style={{ background: item.bg, border: '1px solid rgba(0,0,0,0.05)' }}
    >
      {/* Cercle décoratif de fond */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20"
        style={{ background: item.accent }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
        style={{ background: 'rgba(255,255,255,0.7)', color: item.accent, backdropFilter: 'blur(8px)' }}
      >
        <span>{item.emoji}</span>
        <span style={{ color: item.accent }}>ACS Services</span>
      </div>

      <h3
        className="font-semibold mb-2 relative z-10"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: item.featured ? '1.6rem' : '1.15rem',
          color: '#0f172a',
          lineHeight: 1.2,
        }}
      >
        {item.title}
      </h3>

      <p className="text-sm relative z-10" style={{ color: '#64748b', lineHeight: 1.6 }}>
        {item.subtitle}
      </p>

      {item.featured && service && (
        <ul className="mt-5 space-y-2 relative z-10">
          {service.prestations.map(p => (
            <li key={p} className="flex items-center gap-2 text-sm" style={{ color: '#475569' }}>
              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: item.accent, opacity: 0.85 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>
      )}

      {item.featured && (
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium no-underline relative z-10"
          style={{ background: item.accent, boxShadow: `0 4px 20px ${item.accent}40` }}
        >
          En savoir plus
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </motion.a>
      )}

      {/* Flèche hover pour les petites cartes */}
      {!item.featured && (
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute bottom-6 right-6"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: item.accent }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function BentoGrid() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-32 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="max-w-xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: '#0ea5e9' }}
          >
            Nos Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}
          >
            Tout ce dont vous avez besoin,<br />
            <span style={{ color: '#94a3b8', fontWeight: 400 }}>sous un même toit.</span>
          </motion.h2>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-3 grid-rows-3 gap-5"
          style={{ gridTemplateRows: 'auto auto auto' }}>
          {BENTO.map((item, i) => (
            <BentoCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Avantages strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {AVANTAGES.map(({ icon, text }) => (
            <div key={text}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5l3 3 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium" style={{ color: '#374151' }}>{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
