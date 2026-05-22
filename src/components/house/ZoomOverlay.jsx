import { motion, AnimatePresence } from 'framer-motion'

const INFO = {
  menage: {
    title: 'Ménage & Entretien',
    subtitle: 'Un intérieur impeccable, chaque jour',
    description: 'Nos aides à domicile interviennent avec soin et discrétion pour entretenir votre logement. Repassage, nettoyage, rangement — tout est pris en charge.',
    prestations: ['Nettoyage complet du logement', 'Repassage & soin du linge', 'Entretien cuisine & salle de bain', 'Aide au rangement & organisation'],
    color: '#38bdf8',
    accent: '#0ea5e9',
    icon: '🧹',
    badge: 'Pôle Autonomie & Maison',
  },
  jardinage: {
    title: 'Jardinage & Espaces Verts',
    subtitle: 'Votre jardin, notre passion quotidienne',
    description: 'De la tonte à la plantation, nos jardiniers entretiennent vos espaces verts avec expertise et passion. Un jardin fleuri sans contrainte.',
    prestations: ['Tonte & scarification de pelouse', 'Taille haies, arbustes & arbres', 'Plantation & aménagement floral', 'Entretien potager & compostage'],
    color: '#4ade80',
    accent: '#22c55e',
    icon: '🌿',
    badge: 'Pôle Autonomie & Maison',
  },
  recrutement: {
    title: 'Pôle Recrutement',
    subtitle: 'Les bons profils, au bon moment',
    description: 'Notre agence spécialisée dans les métiers du service à la personne vous accompagne dans chaque étape du recrutement, de la recherche au placement.',
    prestations: ['Recrutement intérim, CDD & CDI', 'Placement de personnel qualifié', 'Évaluation & mise en compétences', 'Conseil RH & parcours d\'insertion'],
    color: '#4ade80',
    accent: '#16a34a',
    icon: '💼',
    badge: 'Pôle Recrutement',
  },
  contact: {
    title: 'Nous Contacter',
    subtitle: 'Une équipe à votre écoute',
    description: 'Notre équipe est disponible du lundi au vendredi 8h-18h et le samedi 9h-12h. Devis gratuit et sans engagement sous 24h.',
    prestations: ['📞 03 XX XX XX XX', '✉️ contact@acs-services.fr', '📍 12 Rue des Lilas, 59000 Lille', 'Devis gratuit & sans engagement'],
    color: '#a78bfa',
    accent: '#7c3aed',
    icon: '💻',
    badge: 'Contact',
  },
  about: {
    title: 'Qui sommes-nous ?',
    subtitle: 'ACS Services — à vos côtés depuis 2010',
    description: 'Agence de services à la personne implantée localement, nous aidons chaque jour des familles à maintenir leur qualité de vie à domicile avec bienveillance.',
    prestations: ['Équipe locale & engagée', 'Intervenants qualifiés & formés', 'Agrément qualité reconnu', 'Disponibles 7j/7'],
    color: '#fb923c',
    accent: '#ea580c',
    icon: '🏡',
    badge: 'À propos d\'ACS',
  },
}

export default function ZoomOverlay({ serviceId, onBack }) {
  const info = INFO[serviceId]
  if (!info) return null

  return (
    <AnimatePresence>
      <motion.div
        key={serviceId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%)',
            pointerEvents: 'all',
          }}
          onClick={onBack}
        />

        {/* Panel */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.15 }}
          style={{
            position: 'relative',
            width: 380,
            height: '100vh',
            background: '#fff',
            display: 'flex', flexDirection: 'column',
            pointerEvents: 'all',
            boxShadow: '-32px 0 80px rgba(0,0,0,0.25)',
          }}
        >
          {/* Color header band */}
          <div style={{
            height: 6,
            background: `linear-gradient(90deg, ${info.color}, ${info.accent})`,
          }} />

          {/* Retour button */}
          <motion.button
            whileHover={{ x: -3 }}
            onClick={onBack}
            style={{
              position: 'absolute', top: 24, left: 24,
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: 13, fontWeight: 500,
            }}
          >
            ← Retour à la visite
          </motion.button>

          {/* Icon hero */}
          <div style={{
            height: 200,
            background: `linear-gradient(145deg, ${info.color}18, ${info.accent}10)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{ fontSize: 72, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
            >
              {info.icon}
            </motion.div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
            {/* Badge */}
            <span style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: 99,
              background: info.color + '18', color: info.accent,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              {info.badge}
            </span>

            <h2 style={{
              fontSize: 26, fontWeight: 800, color: '#0f172a',
              lineHeight: 1.2, marginBottom: 6,
            }}>
              {info.title}
            </h2>
            <p style={{
              fontSize: 14, color: info.accent, fontWeight: 600, marginBottom: 16,
            }}>
              {info.subtitle}
            </p>
            <p style={{
              fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 24,
            }}>
              {info.description}
            </p>

            {/* Prestations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {info.prestations.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 0',
                    borderBottom: i < info.prestations.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${info.color}, ${info.accent})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 13.5, color: '#334155', fontWeight: 500 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA footer */}
          <div style={{ padding: '20px 32px 32px', borderTop: '1px solid #f1f5f9' }}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 12px 32px ${info.color}55` }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '15px 0', borderRadius: 14,
                border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${info.color}, ${info.accent})`,
                color: '#fff', fontWeight: 700, fontSize: 15,
                boxShadow: `0 6px 20px ${info.color}44`,
                letterSpacing: '0.02em',
              }}
            >
              Demander un devis gratuit
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
