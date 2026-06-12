import { useRef, Suspense, lazy } from 'react'
import { motion, useInView } from 'framer-motion'

const GlassOrb = lazy(() => import('./GlassOrb'))

const VALEURS = [
  {
    emoji: '🤝',
    title: 'Bienveillance',
    desc: 'Chaque intervenant est sélectionné pour ses compétences humaines autant que professionnelles.',
    color: '#0ea5e9',
  },
  {
    emoji: '🎓',
    title: 'Excellence',
    desc: '100% de nos équipes sont diplômées et suivent des formations continues tout au long de l\'année.',
    color: '#8b5cf6',
  },
  {
    emoji: '🌱',
    title: 'Engagement',
    desc: 'Nous construisons des relations durables — avec nos clients comme avec nos intervenants.',
    color: '#22c55e',
  },
]

const POSTES = [
  { title: 'Auxiliaire de vie', type: 'CDI · Temps plein', icon: '🏠' },
  { title: 'Aide ménager(ère)', type: 'CDI · Temps partiel', icon: '✨' },
  { title: 'Jardinier(ère)', type: 'CDD · Saisonnier', icon: '🌿' },
  { title: 'Accompagnateur(trice)', type: 'CDI · Flexible', icon: '🚗' },
]

export default function Engagement() {
  const ref = useRef()
  const mousePos = useRef({ x: 0, y: 0 })
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* === SECTION VALEURS === */}
      <section id="engagement" className="py-32 px-6 overflow-hidden" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <div ref={ref}>
              <motion.p
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color: '#22c55e' }}
              >
                Notre engagement
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08 }}
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}
              >
                Des personnes<br />
                <span style={{ color: '#94a3b8', fontWeight: 400 }}>au service des personnes.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 text-base leading-relaxed"
                style={{ color: '#64748b', fontWeight: 300, maxWidth: 440 }}
              >
                Chez ACS Services, nous croyons que la qualité d'une prestation repose avant tout
                sur la qualité humaine de ceux qui l'assurent. C'est pourquoi nous recrutons,
                formons et fidélisons les meilleurs professionnels du secteur.
              </motion.p>

              <div className="mt-10 space-y-5">
                {VALEURS.map(({ emoji, title, desc, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: `${color}12` }}>
                      {emoji}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>{title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3D orb décoratif */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden md:block relative"
              style={{ height: 480 }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                mousePos.current = {
                  x: ((e.clientX - r.left) / r.width - 0.5) * 2,
                  y: -((e.clientY - r.top) / r.height - 0.5) * 2,
                }
              }}
            >
              <Suspense fallback={null}>
                <GlassOrb mousePos={mousePos} />
              </Suspense>
            </motion.div>

          </div>
        </div>
      </section>

      {/* === SECTION RECRUTEMENT === */}
      <section id="recrutement" className="py-28 px-6" style={{ background: 'linear-gradient(160deg, #f8f7ff 0%, #f0f9ff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: '#8b5cf6' }}
            >
              Rejoignez-nous
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              Construisez votre carrière<br />
              <span style={{ color: '#94a3b8', fontWeight: 400 }}>avec ACS.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-4 text-base"
              style={{ color: '#64748b', fontWeight: 300 }}
            >
              Nous recrutons des personnes passionnées par l'aide à autrui.
              Formations assurées, planning flexible, équipe bienveillante.
            </motion.p>
          </div>

          {/* Grille postes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {POSTES.map(({ title, type, icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl cursor-pointer group"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div className="text-2xl mb-4">{icon}</div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>{title}</h4>
                <p className="text-xs" style={{ color: '#94a3b8' }}>{type}</p>
                <div
                  className="mt-4 text-xs font-medium flex items-center gap-1 transition-all duration-200"
                  style={{ color: '#8b5cf6' }}
                >
                  Voir le poste
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Recrutement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
              boxShadow: '0 20px 60px rgba(14,165,233,0.2)',
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 600, color: 'white', marginBottom: 12 }}>
              Votre profil ne correspond pas exactement ?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28, fontWeight: 300 }}>
              Envoyez-nous votre candidature spontanée — nous cherchons avant tout des personnes engagées.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm no-underline"
              style={{ background: 'white', color: '#6366f1' }}
            >
              Candidature spontanée
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.a>
          </motion.div>

        </div>
      </section>
    </>
  )
}
