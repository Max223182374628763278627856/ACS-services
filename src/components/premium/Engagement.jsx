import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VALEURS = [
  { n: '01', title: 'Bienveillance', desc: 'Chaque intervenant est sélectionné pour ses qualités humaines. La douceur et le respect sont non-négociables.', color: '#0ea5e9' },
  { n: '02', title: 'Excellence',   desc: '100 % de nos équipes sont diplômées et suivent des formations continues tout au long de l\'année.', color: '#22c55e' },
  { n: '03', title: 'Engagement',   desc: 'Nous construisons des relations durables — avec nos clients comme avec nos intervenants.', color: '#8b5cf6' },
]

const POSTES = [
  { icon: '🏠', title: 'Auxiliaire de vie',     type: 'CDI · Temps plein' },
  { icon: '✨', title: 'Aide ménager(ère)',       type: 'CDI · Temps partiel' },
  { icon: '🌿', title: 'Jardinier(ère)',          type: 'CDD · Saisonnier' },
  { icon: '🚗', title: 'Accompagnateur(trice)',   type: 'CDI · Flexible' },
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

export default function Engagement() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* ===== VALEURS ===== */}
      <section id="engagement" style={{ padding: '120px 0', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>

            {/* Colonne gauche — texte */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ width: 28, height: 1, background: '#22c55e', display: 'block' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600,
                  color: '#22c55e', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Notre engagement</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700,
                  color: '#0d1117', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
                Des personnes<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#9ca3af' }}>au service des personnes.</em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.16 }}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 300,
                  lineHeight: 1.8, color: '#9ca3af', maxWidth: 400, marginBottom: 52 }}>
                La qualité d'une prestation repose avant tout sur la qualité humaine de ceux qui l'assurent.
                C'est pourquoi nous recrutons, formons et fidélisons les meilleurs professionnels du secteur.
              </motion.p>

              {/* Valeurs numérotées */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {VALEURS.map(({ n, title, desc, color }, i) => (
                  <motion.div key={n}
                    initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.28 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.8rem',
                      fontWeight: 700, color: color, opacity: 0.5, minWidth: 24, paddingTop: 3 }}>
                      {n}
                    </span>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem',
                        fontWeight: 700, color: '#0d1117', marginBottom: 6 }}>{title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
                        fontWeight: 300, lineHeight: 1.7, color: '#9ca3af' }}>{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Colonne droite — image éditoriale */}
            <FadeUp delay={0.2} style={{ position: 'relative' }}>
              <div style={{ borderRadius: 28, overflow: 'hidden', aspectRatio: '4/5',
                background: 'linear-gradient(160deg, #f0fdf4 0%, #e0f2fe 50%, #faf5ff 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.05)' }}>

                {/* Illustration éditoriale */}
                <svg width="280" height="320" viewBox="0 0 280 320" fill="none">
                  {/* Silhouette aidant + senior */}
                  <circle cx="110" cy="100" r="36" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="2"/>
                  <path d="M110 136v60M94 158h32M110 196l-14 40M110 196l14 40" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="170" cy="108" r="28" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2"/>
                  <path d="M170 136v56M158 155h24M170 192l-10 36M170 192l10 36" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* lien entre eux */}
                  <path d="M122 148 Q140 138 158 148" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"/>
                  {/* coeur */}
                  <path d="M136 126 c0-4 4-7 7-4 l-7 10-7-10c3-3 7 0 7 4z" fill="#fb7185" opacity="0.6"/>
                  {/* Sol */}
                  <rect x="40" y="232" width="200" height="2" rx="1" fill="#e2e8f0"/>
                  {/* plante */}
                  <rect x="210" y="196" width="6" height="36" rx="2" fill="#d1fae5"/>
                  <circle cx="213" cy="190" r="18" fill="#d1fae5" stroke="#86efac" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Citation flottante */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.7 }}
                style={{ position: 'absolute', bottom: -20, right: -20,
                  background: 'white', borderRadius: 20, padding: '20px 24px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.05)', maxWidth: 220 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem',
                  fontStyle: 'italic', color: '#374151', lineHeight: 1.5, marginBottom: 10 }}>
                  "Elle connaît les habitudes de ma mère et la traite avec tant de respect."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fce7f3, #e0f2fe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    👩
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                      fontWeight: 600, color: '#111' }}>Marie-Claire D.</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem',
                      color: '#9ca3af' }}>Fille aidante · ★★★★★</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== RECRUTEMENT ===== */}
      <section id="recrutement" style={{ padding: '120px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

          <FadeUp style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, justifyContent: 'center' }}>
              <span style={{ width: 28, height: 1, background: '#8b5cf6', display: 'block' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600,
                color: '#8b5cf6', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Rejoignez-nous</span>
              <span style={{ width: 28, height: 1, background: '#8b5cf6', display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700,
              color: '#0d1117', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Construisez votre carrière{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#9ca3af' }}>avec ACS.</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 300,
              lineHeight: 1.75, color: '#9ca3af' }}>
              Nous recrutons des personnes passionnées par l'aide à autrui.
              Planning flexible, formations assurées, équipe bienveillante.
            </p>
          </FadeUp>

          {/* Grille postes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
            {POSTES.map(({ icon, title, type }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.22 }}
                  style={{ padding: '28px 24px', borderRadius: 24, background: '#fafafa',
                    border: '1px solid #f3f4f6', cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 16 }}>{icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem',
                    fontWeight: 700, color: '#0d1117', marginBottom: 4 }}>{title}</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                    color: '#9ca3af', marginBottom: 16 }}>{type}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                    fontWeight: 500, color: '#8b5cf6' }}>
                    Voir le poste
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="#8b5cf6" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* CTA bande */}
          <FadeUp delay={0.3}>
            <div style={{ borderRadius: 28, padding: '56px 64px',
              background: 'linear-gradient(135deg, #0d1117 0%, #1e293b 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 32, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600,
                  color: '#8b5cf6', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Candidature spontanée
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.8rem', fontWeight: 700, color: 'white',
                  letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Votre profil nous intéresse.
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 300,
                  color: '#64748b', marginTop: 8 }}>
                  Nous cherchons avant tout des personnes engagées et bienveillantes.
                </p>
              </div>
              <motion.a href="#contact"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
                  padding: '14px 30px', borderRadius: 999, background: 'white',
                  color: '#0d1117', textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(255,255,255,0.1)' }}>
                Postuler maintenant
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="#0d1117" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
