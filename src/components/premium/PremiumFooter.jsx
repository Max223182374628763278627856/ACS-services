import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}>
      {children}
    </motion.div>
  )
}

export default function PremiumFooter() {
  return (
    <footer id="contact" style={{ background: '#fafafa', borderTop: '1px solid #f3f4f6' }}>

      {/* Contact */}
      <div style={{ padding: '120px 0 80px', maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>

          {/* Colonne info */}
          <div>
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600,
                  color: '#0ea5e9', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Contact</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700,
                color: '#0d1117', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
                Parlons de<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#9ca3af' }}>votre projet.</em>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 300,
                lineHeight: 1.75, color: '#9ca3af', marginBottom: 52, maxWidth: 380 }}>
                Devis gratuit, sans engagement. Un conseiller vous rappelle sous 2h.
              </p>
            </FadeUp>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '📞', label: '02 XX XX XX XX', sub: 'Lun–Dim · 7h–21h', color: '#0ea5e9' },
                { icon: '✉️', label: 'contact@acs-services.fr', sub: 'Réponse sous 24h', color: '#22c55e' },
                { icon: '📍', label: 'Nantes, Loire-Atlantique', sub: 'Et toute l\'agglomération', color: '#8b5cf6' },
              ].map(({ icon, label, sub, color }, i) => (
                <FadeUp key={label} delay={0.1 + i * 0.08}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.1rem' }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
                        fontWeight: 500, color: '#0d1117' }}>{label}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                        color: '#9ca3af', marginTop: 2 }}>{sub}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <FadeUp delay={0.2}>
            <div style={{ background: 'white', borderRadius: 28, padding: 40,
              boxShadow: '0 8px 40px rgba(0,0,0,0.07)', border: '1px solid #f3f4f6' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem',
                fontWeight: 700, color: '#0d1117', marginBottom: 28, letterSpacing: '-0.02em' }}>
                Devis en 3 étapes
              </h3>
              <form onSubmit={e => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[['Prénom', 'text', 'Marie'], ['Téléphone', 'tel', '06 XX XX XX XX']].map(([label, type, ph]) => (
                    <div key={label}>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                        fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 6,
                        letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        {label}
                      </label>
                      <input type={type} placeholder={ph}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12,
                          border: '1.5px solid #e5e7eb', fontFamily: "'Inter', sans-serif",
                          fontSize: '0.88rem', color: '#0d1117', background: '#fafafa',
                          outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                    fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 6,
                    letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Service souhaité
                  </label>
                  <select style={{ width: '100%', padding: '12px 16px', borderRadius: 12,
                    border: '1.5px solid #e5e7eb', fontFamily: "'Inter', sans-serif",
                    fontSize: '0.88rem', color: '#6b7280', background: '#fafafa',
                    outline: 'none', cursor: 'pointer', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="">Choisir un service…</option>
                    <option>Maintien à domicile senior</option>
                    <option>Ménage & repassage</option>
                    <option>Jardinage</option>
                    <option>Petit bricolage</option>
                    <option>Accompagnement & transport</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                    fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 6,
                    letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Message (optionnel)
                  </label>
                  <textarea rows={3} placeholder="Décrivez votre situation…"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12,
                      border: '1.5px solid #e5e7eb', fontFamily: "'Inter', sans-serif",
                      fontSize: '0.88rem', color: '#0d1117', background: '#fafafa',
                      outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.16)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '14px', borderRadius: 999,
                    background: '#0d1117', color: 'white', border: 'none',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 500,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.14)' }}>
                  Envoyer ma demande
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </form>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: '28px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
                <path d="M7 4v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem',
              color: '#6b7280', fontWeight: 500 }}>ACS Services</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#d1d5db' }}>
            © 2025 ACS Services · Nantes, Loire-Atlantique
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Mentions légales', 'Confidentialité', 'Plan du site'].map(l => (
              <a key={l} href="#"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                  color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#6b7280'}
                onMouseLeave={e => e.target.style.color = '#d1d5db'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
