import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref}
      style={{ minHeight: '100vh', background: '#fafafa', position: 'relative',
        display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* ---- fond filigrane typographique ---- */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(120px, 18vw, 220px)',
        fontWeight: 700, color: 'rgba(0,0,0,0.025)',
        whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        ACS
      </div>

      <div className="relative max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-20 items-center"
        style={{ paddingTop: 120, paddingBottom: 100 }}>

        {/* ---- TEXTE ---- */}
        <motion.div style={{ y: textY, opacity }}>

          {/* label */}
          <motion.div {...FADE(0.1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 32 }}>
            <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
              fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.18em',
              textTransform: 'uppercase' }}>
              Services à la personne · Nantes
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 {...FADE(0.18)}
            style={{ fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3rem, 6vw, 5.2rem)', fontWeight: 700,
              lineHeight: 1.08, color: '#0d1117', letterSpacing: '-0.03em',
              marginBottom: 28 }}>
            La vie à domicile,<br />
            <em style={{ fontStyle: 'italic', color: '#0ea5e9' }}>belle et&nbsp;sereine.</em>
          </motion.h1>

          {/* sous-titre */}
          <motion.p {...FADE(0.26)}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem',
              fontWeight: 300, lineHeight: 1.8, color: '#6b7280',
              maxWidth: 440, marginBottom: 44 }}>
            Des intervenants qualifiés et bienveillants pour accompagner vos proches
            au quotidien — ménage, jardinage, maintien à domicile.
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE(0.34)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.a href="#contact"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(14,165,233,0.26)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 30px', borderRadius: 999, background: '#111',
                color: '#fff', textDecoration: 'none',
                fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 500,
                boxShadow: '0 4px 20px rgba(0,0,0,0.16)', letterSpacing: '0.01em' }}>
              Devis gratuit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.a>

            <motion.a href="#services"
              whileHover={{ gap: 12 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                fontSize: '0.88rem', fontWeight: 500, color: '#9ca3af',
                transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>
              Nos services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ---- IMAGE avec parallaxe ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', height: 560, borderRadius: 32, overflow: 'hidden' }}
          className="hidden md:block">

          {/* placeholder image éditorial */}
          <motion.div style={{ y: imgY, height: '115%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #e0f2fe 0%, #f0fdf4 40%, #f5f3ff 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 16,
            }}>
              {/* Illustration éditoriale minimaliste */}
              <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Maison */}
                <rect x="60" y="110" width="120" height="90" rx="6" fill="white" stroke="#e0e7ff" strokeWidth="2"/>
                <path d="M48 116L120 58l72 58" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Porte */}
                <rect x="100" y="148" width="40" height="52" rx="4" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5"/>
                {/* Fenêtres */}
                <rect x="70" y="128" width="28" height="24" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
                <rect x="142" y="128" width="28" height="24" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
                {/* Soleil */}
                <circle cx="188" cy="72" r="18" fill="#fef9c3" stroke="#fde047" strokeWidth="2"/>
                {/* Rayons */}
                {[0,45,90,135,180,225,270,315].map((deg, i) => (
                  <line key={i}
                    x1={188 + Math.cos(deg*Math.PI/180)*22}
                    y1={72 + Math.sin(deg*Math.PI/180)*22}
                    x2={188 + Math.cos(deg*Math.PI/180)*28}
                    y2={72 + Math.sin(deg*Math.PI/180)*28}
                    stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
                ))}
                {/* Arbre */}
                <rect x="192" y="158" width="6" height="32" rx="2" fill="#d1fae5"/>
                <circle cx="195" cy="148" r="22" fill="#d1fae5" stroke="#86efac" strokeWidth="1.5"/>
                {/* Chemin */}
                <path d="M100 200 Q120 195 140 200" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round"/>
                {/* Personne senior stylisée */}
                <circle cx="50" cy="140" r="10" fill="#fce7f3" stroke="#fbcfe8" strokeWidth="1.5"/>
                <path d="M50 150v24M42 160h16M50 174l-6 16M50 174l6 16" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
              </svg>

              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem',
                color: '#94a3b8', fontStyle: 'italic' }}>
                Votre chez-vous, notre engagement.
              </span>
            </div>
          </motion.div>

          {/* Filet décoratif */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 32,
            border: '1px solid rgba(0,0,0,0.06)', pointerEvents: 'none',
          }} />

          {/* Badge flottant */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              position: 'absolute', bottom: 28, left: 28,
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
              borderRadius: 16, padding: '14px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
            <div style={{ width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem' }}>
              ✓
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
                fontWeight: 600, color: '#111' }}>Agréé SAP</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
                color: '#9ca3af', marginTop: 2 }}>Service à la Personne</div>
            </div>
          </motion.div>

          {/* Badge 2 */}
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            style={{
              position: 'absolute', top: 28, right: 28,
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
              borderRadius: 16, padding: '10px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
            <span style={{ fontSize: '1rem' }}>⭐</span>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
                fontWeight: 700, color: '#111' }}>4.9 / 5</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
                color: '#9ca3af' }}>500+ avis clients</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d1d5db' }}>
          Défiler
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <svg width="1" height="48" viewBox="0 0 1 48">
            <line x1="0.5" y1="0" x2="0.5" y2="48" stroke="#d1d5db" strokeWidth="1"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
