import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

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

export default function RecrutementPage() {
  return (
    <section style={{ padding: '160px 0 128px', background: '#fff' }}>
      <div style={C}>

        <FadeUp style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 22, justifyContent: 'center' }}>
            <span style={{ width: 28, height: 1, background: '#8b5cf6', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600,
              color: '#8b5cf6', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Rejoignez-nous</span>
            <span style={{ width: 28, height: 1, background: '#8b5cf6', display: 'block' }} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700,
            color: '#0d1117', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18 }}>
            Construisez votre carrière{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4b5563' }}>avec ACS.</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 400,
            lineHeight: 1.85, color: '#4b5563' }}>
            Nous recrutons des personnes passionnées par l'aide à autrui.
            Planning flexible, formations assurées, équipe bienveillante.
          </p>
        </FadeUp>

        {/* Avantages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 72 }}>
          {[
            { icon: '📅', title: 'Planning flexible', desc: 'Adaptez votre emploi du temps à votre vie personnelle.' },
            { icon: '🎓', title: 'Formations assurées', desc: 'Montez en compétences grâce à nos programmes de formation continue.' },
            { icon: '🤝', title: 'Équipe bienveillante', desc: 'Rejoignez une équipe soudée, portée par des valeurs humaines fortes.' },
          ].map(({ icon, title, desc }) => (
            <FadeUp key={title}>
              <div style={{ background: '#fafafa', borderRadius: 20, padding: '36px 32px',
                border: '1px solid #f3f4f6', height: '100%' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
                  fontWeight: 700, color: '#0d1117', marginBottom: 10, letterSpacing: '-0.015em' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                  lineHeight: 1.8, color: '#4b5563' }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA bande sombre */}
        <FadeUp delay={0.2}>
          <div style={{ borderRadius: 28, padding: '60px 72px',
            background: 'linear-gradient(135deg, #0d1117 0%, #1e293b 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600,
                color: '#8b5cf6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
                Candidature spontanée
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem', fontWeight: 700, color: 'white',
                letterSpacing: '-0.025em', lineHeight: 1.15 }}>
                Votre profil nous intéresse.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                color: '#64748b', marginTop: 10, lineHeight: 1.7 }}>
                Nous cherchons avant tout des personnes engagées et bienveillantes.
              </p>
            </div>
            <motion.a href="/contact"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
                padding: '16px 36px', borderRadius: 999, background: 'white',
                color: '#0d1117', textDecoration: 'none',
                fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
              Postuler maintenant
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="#0d1117" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.a>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
