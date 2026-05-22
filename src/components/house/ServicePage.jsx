import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = {
  about: {
    color: '#F59E0B', grad: 'linear-gradient(135deg,#F59E0B,#D97706)',
    icon: '🏡', badge: 'Notre histoire',
    title: 'Qui sommes-nous ?',
    hero: 'ACS Services — Présents à vos côtés depuis 2010',
    desc: "Née d'une conviction simple — chacun mérite de vieillir chez soi dans la dignité — ACS Services est une agence locale, humaine et engagée. Nos équipes interviennent chaque jour auprès de familles et de personnes fragilisées pour leur apporter confort, sécurité et lien social.",
    items: [
      { icon: '📍', text: 'Agence de proximité, ancrée localement' },
      { icon: '🏅', text: 'Agrément qualité & organismes sociaux agréés' },
      { icon: '👥', text: '+120 intervenants qualifiés & formés' },
      { icon: '🕐', text: 'Disponibles 7j/7, week-ends & jours fériés' },
    ],
    cta: 'Découvrir notre équipe',
  },
  menage: {
    color: '#38bdf8', grad: 'linear-gradient(135deg,#38bdf8,#0284c7)',
    icon: '🧹', badge: 'Pôle Autonomie & Maison',
    title: 'Ménage & Entretien',
    hero: 'Un intérieur impeccable, chaque semaine',
    desc: "Nos aide-ménagères interviennent à votre domicile pour l'entretien régulier ou ponctuel de votre logement. Formées aux produits adaptés, elles s'occupent du ménage, du repassage et du rangement avec soin et discrétion.",
    items: [
      { icon: '🫧', text: 'Nettoyage complet : sols, surfaces, sanitaires' },
      { icon: '👔', text: 'Repassage & entretien du linge' },
      { icon: '🏠', text: 'Rangement, dépoussiérage, vitrerie' },
      { icon: '🌿', text: 'Produits éco-responsables sur demande' },
    ],
    cta: 'Demander un devis ménage',
  },
  aide: {
    color: '#EC4899', grad: 'linear-gradient(135deg,#EC4899,#BE185D)',
    icon: '🤝', badge: 'Pôle Autonomie',
    title: 'Auxiliaire de Vie',
    hero: 'Votre autonomie, notre priorité quotidienne',
    desc: "Nos auxiliaires de vie accompagnent les personnes âgées et en situation de handicap dans tous les actes essentiels du quotidien. Un soutien bienveillant et professionnel pour vivre chez soi en toute sérénité.",
    items: [
      { icon: '🍽️', text: 'Aide à la toilette & à l\'habillage' },
      { icon: '🥗', text: 'Préparation et aide aux repas' },
      { icon: '💊', text: 'Rappel et aide à la prise de médicaments' },
      { icon: '💬', text: 'Accompagnement & stimulation sociale' },
    ],
    cta: 'Évaluer mes besoins',
  },
  jardinage: {
    color: '#4ade80', grad: 'linear-gradient(135deg,#4ade80,#16a34a)',
    icon: '🌿', badge: 'Pôle Autonomie & Maison',
    title: 'Jardinage & Espaces Verts',
    hero: 'Un jardin fleuri, sans effort',
    desc: "De la tonte à la plantation en passant par l'élagage, nos jardiniers passionnés entretiennent vos espaces verts avec expertise. Retrouvez la fierté d'un beau jardin sans la contrainte physique.",
    items: [
      { icon: '🌱', text: 'Tonte, scarification & aération de pelouse' },
      { icon: '✂️', text: 'Taille haies, arbustes & petits arbres' },
      { icon: '🌸', text: 'Plantation, désherbage & engrais naturels' },
      { icon: '🥕', text: 'Entretien potager & arrosage' },
    ],
    cta: 'Demander un devis jardinage',
  },
  recrutement: {
    color: '#8B5CF6', grad: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
    icon: '💼', badge: 'Pôle Recrutement',
    title: 'Pôle Recrutement',
    hero: 'Les bons profils, au bon moment',
    desc: "Notre agence de recrutement spécialisée dans les métiers du service à la personne, de la santé et du médico-social. Nous accompagnons candidats et entreprises à chaque étape avec expertise et bienveillance.",
    items: [
      { icon: '📋', text: 'Recrutement intérim, CDD & CDI' },
      { icon: '🎯', text: 'Sélection rigoureuse & vérification des références' },
      { icon: '📚', text: 'Formation continue & montée en compétences' },
      { icon: '🤝', text: 'Conseil RH & accompagnement insertion' },
    ],
    cta: 'Déposer une offre d\'emploi',
  },
  contact: {
    color: '#06B6D4', grad: 'linear-gradient(135deg,#06B6D4,#0891B2)',
    icon: '📞', badge: 'Contact & Devis',
    title: 'Nous Contacter',
    hero: 'Une réponse sous 24h, toujours',
    desc: "Notre équipe est disponible du lundi au vendredi de 8h à 18h et le samedi de 9h à 12h. Devis gratuit et sans engagement, établi à domicile. Nous nous déplaçons pour évaluer vos besoins.",
    items: [
      { icon: '📞', text: '03 XX XX XX XX — Lun–Ven 8h–18h' },
      { icon: '✉️', text: 'contact@acs-services.fr' },
      { icon: '📍', text: '12 Rue des Lilas, 59000 Lille' },
      { icon: '🚗', text: 'Déplacement gratuit pour évaluation' },
    ],
    cta: 'Envoyer un message',
  },
}

export default function ServicePage({ serviceId, onClose }) {
  const s = SERVICES[serviceId]
  if (!s) return null

  return (
    <motion.div
      key={serviceId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', alignItems: 'stretch',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Left: 3D blurred bg hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          flex: '1',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ← Retour à la visite
        </motion.div>
      </motion.div>

      {/* Right: Service page panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
        style={{
          width: 520,
          background: '#fff',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          boxShadow: '-40px 0 120px rgba(0,0,0,0.35)',
        }}
      >
        {/* Hero */}
        <div style={{
          background: s.grad,
          padding: '48px 40px 36px',
          position: 'relative',
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ fontSize: 52, marginBottom: 16, display: 'inline-block' }}
          >
            {s.icon}
          </motion.div>

          <div style={{
            display: 'inline-block', padding: '3px 12px',
            background: 'rgba(255,255,255,0.22)', borderRadius: 99,
            color: 'rgba(255,255,255,0.95)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {s.badge}
          </div>

          <h1 style={{
            fontSize: 30, fontWeight: 800, color: '#fff',
            lineHeight: 1.15, margin: '8px 0',
          }}>
            {s.title}
          </h1>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.85)',
            fontWeight: 500, margin: 0,
          }}>
            {s.hero}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '36px 40px', flex: 1 }}>
          <p style={{
            fontSize: 15, lineHeight: 1.75, color: '#475569',
            marginBottom: 32,
          }}>
            {s.desc}
          </p>

          <h3 style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
            color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Nos prestations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 36 }}>
            {s.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  background: i % 2 === 0 ? '#f8fafc' : 'transparent',
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 28 }} />

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            {['Devis gratuit', 'Sans engagement', 'Réponse sous 24h'].map((b) => (
              <span key={b} style={{
                padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                background: '#f1f5f9', color: '#64748b',
              }}>
                ✓ {b}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: `0 16px 40px ${s.color}55` }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '17px 0', borderRadius: 14,
              border: 'none', cursor: 'pointer',
              background: s.grad,
              color: '#fff', fontWeight: 800, fontSize: 16,
              letterSpacing: '0.02em',
              boxShadow: `0 8px 24px ${s.color}40`,
            }}
          >
            {s.cta}
          </motion.button>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 40px', borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['A','C','S'].map((l, i) => (
              <span key={l} style={{
                width: 22, height: 22, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 10, fontWeight: 700,
                background: i === 1 ? '#4ade80' : '#38bdf8',
              }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>ACS Services — La Maison de la Sérénité</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
