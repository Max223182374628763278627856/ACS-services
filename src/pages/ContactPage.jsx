import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

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

export default function ContactPage() {
  return (
    <section style={{ padding: '160px 0 100px', background: '#fafafa' }}>
      <div style={{ ...C }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' }}>

          {/* Infos */}
          <div>
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600,
                  color: '#0ea5e9', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Contact</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700,
                color: '#0d1117', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18 }}>
                Parlons de<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4b5563' }}>votre projet.</em>
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 400,
                lineHeight: 1.9, color: '#4b5563', marginBottom: 56, maxWidth: 380 }}>
                Devis gratuit, sans engagement. Un conseiller vous rappelle sous 2h.
              </p>
            </FadeUp>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { icon: '📞', label: '07 64 45 07 78 / 06 18 35 42 75', sub: 'Lun–Dim · 7h–21h' },
                { icon: '✉️', label: 'acsservices44@yahoo.fr',           sub: 'Réponse sous 24h' },
                { icon: '📍', label: 'Nantes, Loire-Atlantique',          sub: "Et toute l'agglomération" },
              ].map(({ icon, label, sub }, i) => (
                <FadeUp key={label} delay={0.1 + i * 0.08}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.2rem' }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem',
                        fontWeight: 500, color: '#0d1117' }}>{label}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                        color: '#4b5563', marginTop: 3 }}>{sub}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <FadeUp delay={0.2}>
            <div style={{ background: 'white', borderRadius: 28, padding: 48,
              boxShadow: '0 8px 48px rgba(0,0,0,0.07)', border: '1px solid #f3f4f6' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem',
                fontWeight: 700, color: '#0d1117', marginBottom: 32, letterSpacing: '-0.02em' }}>
                Devis en 3 étapes
              </h2>
              <form onSubmit={e => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['Prénom', 'text', 'Marie'], ['Téléphone', 'tel', '06 XX XX XX XX']].map(([label, type, ph]) => (
                    <div key={label}>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                        fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: 8,
                        letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {label}
                      </label>
                      <input type={type} placeholder={ph}
                        style={{ width: '100%', padding: '13px 17px', borderRadius: 12,
                          border: '1.5px solid #f3f4f6', fontFamily: "'Inter', sans-serif",
                          fontSize: '0.95rem', color: '#0d1117', background: '#fafafa',
                          outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e => e.target.style.borderColor = '#f3f4f6'}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                    fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: 8,
                    letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Service souhaité
                  </label>
                  <select style={{ width: '100%', padding: '13px 17px', borderRadius: 12,
                    border: '1.5px solid #f3f4f6', fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem', color: '#374151', background: '#fafafa',
                    outline: 'none', cursor: 'pointer', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23d1d5db' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 17px center' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#f3f4f6'}>
                    <option value="">Choisir un service…</option>
                    <option>Maintien à domicile senior</option>
                    <option>Ménage & repassage</option>
                    <option>Jardinage</option>
                    <option>Petit bricolage</option>
                    <option>Accompagnement & transport</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                    fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: 8,
                    letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Message (optionnel)
                  </label>
                  <textarea rows={3} placeholder="Décrivez votre situation…"
                    style={{ width: '100%', padding: '13px 17px', borderRadius: 12,
                      border: '1.5px solid #f3f4f6', fontFamily: "'Inter', sans-serif",
                      fontSize: '0.95rem', color: '#0d1117', background: '#fafafa',
                      outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#f3f4f6'}
                  />
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.16)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '16px', borderRadius: 999,
                    background: '#0d1117', color: 'white', border: 'none',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', fontWeight: 500,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 9,
                    boxShadow: '0 4px 18px rgba(0,0,0,0.14)' }}>
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
    </section>
  )
}
