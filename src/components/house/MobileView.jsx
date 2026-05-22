import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    id: 'aide',
    icon: '🤝',
    color: '#38bdf8',
    title: 'Aide à la personne',
    sub: 'Présence & accompagnement',
    desc: 'Assistance au quotidien, toilette, repas, mobilité. Nos auxiliaires de vie forment un lien de confiance durable avec vos proches.',
  },
  {
    id: 'menage',
    icon: '✨',
    color: '#4ade80',
    title: 'Ménage & entretien',
    sub: 'Un intérieur impeccable',
    desc: 'Nettoyage soigné, repassage, rangement. Nous prenons soin de votre espace de vie pour que vous vous y sentiez pleinement chez vous.',
  },
  {
    id: 'jardinage',
    icon: '🌿',
    color: '#a3e635',
    title: 'Jardinage',
    sub: 'Extérieur préservé',
    desc: 'Tonte, taille, désherbage, entretien saisonnier. Votre jardin reste un espace de sérénité en toutes saisons.',
  },
  {
    id: 'recrutement',
    icon: '🌟',
    color: '#f472b6',
    title: 'Recrutement',
    sub: 'Rejoignez nos équipes',
    desc: 'ACS Services recrute des auxiliaires de vie passionné·e·s. CDI, formations, accompagnement — construisons votre avenir ensemble.',
  },
]

function ServiceCard({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(15,23,42,0.85)',
        border: `1px solid ${s.color}22`,
        borderRadius: 20,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: `${s.color}18`,
          border: `1px solid ${s.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {s.icon}
        </div>
        <div>
          <h3 style={{
            margin: 0, fontSize: 17, fontWeight: 700,
            color: '#e2e8f0',
            fontFamily: 'system-ui, sans-serif',
          }}>{s.title}</h3>
          <p style={{
            margin: '3px 0 0', fontSize: 12, fontWeight: 500,
            color: s.color, letterSpacing: '0.08em', textTransform: 'uppercase',
            fontFamily: 'system-ui, sans-serif',
          }}>{s.sub}</p>
        </div>
      </div>

      <p style={{
        margin: 0, fontSize: 14, lineHeight: 1.65,
        color: 'rgba(148,163,184,0.85)',
        fontFamily: 'system-ui, sans-serif',
      }}>{s.desc}</p>
    </motion.div>
  )
}

export default function MobileView() {
  return (
    <div style={{
      minHeight: '100svh',
      background: '#020617',
      overflowY: 'auto',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Hero */}
      <div style={{
        padding: '60px 24px 48px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%)',
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}
        >
          {['A', 'C', 'S'].map((l, i) => (
            <div key={l} style={{
              width: 44, height: 44, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18, fontWeight: 800,
              background: i === 1
                ? 'linear-gradient(135deg,#4ade80,#22d3ee)'
                : 'linear-gradient(135deg,#38bdf8,#818cf8)',
              boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
            }}>{l}</div>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            margin: 0, fontSize: 'clamp(24px, 6vw, 36px)',
            fontWeight: 300, lineHeight: 1.25,
            color: '#f1f5f9',
          }}
        >
          La Maison<br />
          <span style={{ fontWeight: 700, background: 'linear-gradient(135deg,#38bdf8,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            de la Sérénité
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{
            margin: '16px 0 32px',
            fontSize: 15, lineHeight: 1.6,
            color: 'rgba(148,163,184,0.85)',
            maxWidth: 340, marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          Services à domicile haut de gamme pour votre famille.
        </motion.p>

        <motion.a
          href="tel:+33000000000"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'inline-block',
            padding: '14px 32px', borderRadius: 14,
            background: 'linear-gradient(135deg,#38bdf8,#4ade80)',
            color: '#fff', fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(56,189,248,0.35)',
          }}
        >
          Demander un devis
        </motion.a>
      </div>

      {/* Divider */}
      <div style={{
        margin: '0 24px 40px',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)',
      }} />

      {/* Cards */}
      <div style={{
        padding: '0 16px 80px',
        display: 'flex', flexDirection: 'column', gap: 16,
        maxWidth: 500, margin: '0 auto',
      }}>
        <p style={{
          margin: '0 0 8px 8px', fontSize: 12,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(100,116,139,0.7)',
        }}>
          Nos services
        </p>
        {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px 24px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          margin: 0, fontSize: 12,
          color: 'rgba(100,116,139,0.5)',
        }}>
          © 2025 ACS Services · Tous droits réservés
        </p>
        <p style={{
          margin: '4px 0 0', fontSize: 11,
          color: 'rgba(100,116,139,0.35)',
          letterSpacing: '0.06em',
        }}>
          Pour vivre l'expérience immersive complète, visitez sur ordinateur.
        </p>
      </div>
    </div>
  )
}
