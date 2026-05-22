import { motion, AnimatePresence } from 'framer-motion'

const INFO = {
  about: {
    title: 'Qui sommes-nous ?',
    subtitle: 'ACS Services — à vos côtés depuis 2010',
    description: 'Nous sommes une agence de services à la personne implantée localement, engagée pour le bien-être et l\'autonomie de nos bénéficiaires. Notre équipe qualifiée intervient chaque jour avec bienveillance.',
    prestations: ['Équipe locale & engagée', 'Intervenants qualifiés & formés', 'Agrément qualité reconnu', 'Disponibles 7j/7'],
    color: '#38bdf8',
    icon: '🏡',
  },
  menage: {
    title: 'Ménage & Entretien',
    subtitle: 'Votre maison, toujours impeccable',
    description: 'Nos aides ménagères interviennent à domicile pour l\'entretien courant de votre logement : nettoyage, repassage, rangement. Un service sur-mesure adapté à vos besoins.',
    prestations: ['Nettoyage & dépoussiérage', 'Repassage & linge', 'Entretien cuisine & salle de bain', 'Aide au rangement'],
    color: '#38bdf8',
    icon: '🧹',
  },
  jardinage: {
    title: 'Jardinage & Espaces Verts',
    subtitle: 'Votre jardin, notre passion',
    description: 'De la tonte à la taille en passant par la plantation, nos jardiniers entretiennent vos espaces verts avec soin. Profitez d\'un jardin fleuri sans effort.',
    prestations: ['Tonte de pelouse', 'Taille de haies & arbustes', 'Désherbage & plantation', 'Entretien potager'],
    color: '#4ade80',
    icon: '🌿',
  },
  recrutement: {
    title: 'Pôle Recrutement',
    subtitle: 'Intérim · CDD · CDI · Placement',
    description: 'Notre agence de recrutement vous aide à trouver les bons profils dans les métiers du service à la personne, de la santé et du médico-social.',
    prestations: ['Recrutement en intérim & CDD/CDI', 'Placement de personnel qualifié', 'Évaluation & mise en compétences', 'Conseil RH & parcours d\'insertion'],
    color: '#4ade80',
    icon: '💼',
  },
  contact: {
    title: 'Nous Contacter',
    subtitle: 'Répondons à vos questions',
    description: 'Notre équipe est disponible du lundi au vendredi de 8h à 18h, et le samedi de 9h à 12h. N\'hésitez pas à nous appeler ou à remplir notre formulaire de contact.',
    prestations: ['📞 03 XX XX XX XX', '✉️ contact@acs-services.fr', '📍 12 Rue des Lilas, 59000 Lille', 'Devis gratuit & sans engagement'],
    color: '#a78bfa',
    icon: '💻',
  },
}

export default function InfoPanel({ serviceId, onClose }) {
  const info = INFO[serviceId]
  if (!info) return null

  return (
    <AnimatePresence>
      <motion.div
        key={serviceId}
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 60, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          position: 'fixed',
          top: '50%',
          right: 32,
          transform: 'translateY(-50%)',
          width: 340,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.07)',
          padding: 28,
          zIndex: 100,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 20, color: '#94a3b8', lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ fontSize: 36, marginBottom: 10 }}>{info.icon}</div>

        <div
          style={{
            display: 'inline-block', padding: '2px 10px', borderRadius: 99,
            background: info.color + '22', color: info.color,
            fontSize: 11, fontWeight: 600, marginBottom: 8,
          }}
        >
          {info.subtitle}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>
          {info.title}
        </h2>

        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 16 }}>
          {info.description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {info.prestations.map((p) => (
            <li
              key={p}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0', borderBottom: '1px solid #f1f5f9',
                fontSize: 13, color: '#334155',
              }}
            >
              <span style={{ color: info.color, fontWeight: 700 }}>✓</span>
              {p}
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 20, width: '100%', padding: '11px 0',
            borderRadius: 12, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
            color: '#fff', fontWeight: 700, fontSize: 14,
            boxShadow: `0 6px 20px ${info.color}44`,
          }}
        >
          Demander un devis gratuit
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
