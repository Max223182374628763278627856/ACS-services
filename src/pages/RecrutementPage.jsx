import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

const inputStyle = {
  width: '100%', padding: '13px 17px', borderRadius: 12,
  border: '1.5px solid #f3f4f6', fontFamily: "'Inter', sans-serif",
  fontSize: '0.95rem', color: '#0d1117', background: '#fafafa',
  outline: 'none', transition: 'border-color 0.2s',
}

const labelStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 500,
  color: '#4b5563', display: 'block', marginBottom: 8,
  letterSpacing: '0.06em', textTransform: 'uppercase',
}

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

        {/* En-tête */}
        <FadeUp style={{ maxWidth: 640, marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: '#8b5cf6', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600,
              color: '#8b5cf6', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Rejoignez-nous</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700,
            color: '#0d1117', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18 }}>
            Construisez votre carrière{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4b5563' }}>avec ACS.</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem',
            lineHeight: 1.85, color: '#4b5563' }}>
            Nous recrutons des personnes passionnées par l'aide à autrui.
            Planning flexible, formations assurées, équipe bienveillante.
          </p>
        </FadeUp>

        {/* Avantages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginBottom: 96 }}>
          {[
            { icon: '📅', title: 'Planning flexible',   desc: 'Adaptez votre emploi du temps à votre vie personnelle.' },
            { icon: '🎓', title: 'Formations assurées', desc: 'Montez en compétences grâce à nos programmes de formation continue.' },
            { icon: '🤝', title: 'Équipe bienveillante', desc: 'Rejoignez une équipe soudée, portée par des valeurs humaines fortes.' },
          ].map(({ icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div style={{ background: '#fafafa', borderRadius: 20, padding: '36px 32px',
                border: '1px solid #f3f4f6', height: '100%' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
                  fontWeight: 700, color: '#0d1117', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                  lineHeight: 1.8, color: '#4b5563' }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Formulaire de candidature */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' }}>

          {/* Texte */}
          <FadeUp>
            <h2 style={{ fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', fontWeight: 700,
              color: '#0d1117', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 18 }}>
              Votre profil<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4b5563' }}>nous intéresse.</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem',
              lineHeight: 1.85, color: '#4b5563', marginBottom: 40 }}>
              Nous cherchons avant tout des personnes engagées et bienveillantes.
              Envoyez-nous votre candidature spontanée — nous vous répondons rapidement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: '📞', text: '07 64 45 07 78 / 06 18 35 42 75' },
                { icon: '✉️', text: 'acsservices44@yahoo.fr' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: '#fafafa', border: '1px solid #f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    {icon}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                    color: '#0d1117', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Formulaire */}
          <FadeUp delay={0.15}>
            <div style={{ background: '#fafafa', borderRadius: 28, padding: 48,
              border: '1px solid #f3f4f6', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem',
                fontWeight: 700, color: '#0d1117', marginBottom: 8 }}>
                Candidature spontanée
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
                color: '#9ca3af', marginBottom: 28 }}>
                Tous les profils sont étudiés avec attention.
              </p>

              <form onSubmit={e => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Prénom</label>
                    <input type="text" placeholder="Marie" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                      onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input type="text" placeholder="Dupont" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                      onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input type="tel" placeholder="06 XX XX XX XX" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                </div>

                <div>
                  <label style={labelStyle}>Poste souhaité</label>
                  <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23d1d5db' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 17px center' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={e => e.target.style.borderColor = '#f3f4f6'}>
                    <option value="">Choisir un poste…</option>
                    <option>Auxiliaire de vie</option>
                    <option>Aide à domicile</option>
                    <option>Agent d'entretien</option>
                    <option>Jardinier</option>
                    <option>Accompagnateur / Chauffeur</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message / Motivation</label>
                  <textarea rows={4} placeholder="Présentez-vous en quelques mots…"
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(139,92,246,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '16px', borderRadius: 999,
                    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white',
                    border: 'none', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
                    fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 9, boxShadow: '0 4px 18px rgba(139,92,246,0.3)' }}>
                  Envoyer ma candidature
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
