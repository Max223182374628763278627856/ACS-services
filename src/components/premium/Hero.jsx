import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Container global partagé
export const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} style={{
      minHeight: '100vh', background: '#fafafa',
      position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>

      {/* Filigrane très discret */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(140px, 22vw, 260px)',
        fontWeight: 700, color: 'rgba(0,0,0,0.012)',   /* ← plus discret */
        whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        ACS
      </div>

      <div style={{ ...C, width: '100%', position: 'relative',
        paddingTop: 140, paddingBottom: 120,
        display: 'grid', gridTemplateColumns: '52% 1fr',
        gap: 80, alignItems: 'center' }}>

        {/* ——— TEXTE (≤ 52 % de la largeur) ——— */}
        <motion.div style={{ y: textY }}>

          {/* Label */}
          <motion.div {...FADE(0.1)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36,
          }}>
            <span style={{ width: 32, height: 1, background: '#0ea5e9', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
              fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.2em',
              textTransform: 'uppercase' }}>
              Services à la personne · Nantes
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 {...FADE(0.18)} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(3.2rem, 5.5vw, 5.6rem)',
            fontWeight: 700, lineHeight: 1.06,
            color: '#0d1117', letterSpacing: '-0.035em',  /* éditorial serré */
            marginBottom: 32,
          }}>
            La vie à domicile,<br />
            <em style={{ fontStyle: 'italic', color: '#0ea5e9' }}>belle et&nbsp;sereine.</em>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p {...FADE(0.26)} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.1rem', fontWeight: 400,
            lineHeight: 1.9,               /* très aéré */
            color: '#374151', maxWidth: 460, marginBottom: 52,
            letterSpacing: '0.005em',
          }}>
            Des intervenants qualifiés et bienveillants pour accompagner vos proches
            au quotidien — ménage, jardinage, maintien à domicile.
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE(0.34)} style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <motion.a href="#contact"
              whileHover={{ scale: 1.03, boxShadow: '0 14px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 34px', borderRadius: 999, background: '#111',
                color: '#fff', textDecoration: 'none',
                fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 500,
                letterSpacing: '0.01em', boxShadow: '0 4px 22px rgba(0,0,0,0.16)' }}>
              Devis gratuit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.a>

            <a href="#services"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem', fontWeight: 400, color: '#4b5563',
                transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
              Nos services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ——— ILLUSTRATION (reste de la grille) ——— */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', borderRadius: 32, overflow: 'hidden',
            aspectRatio: '4/5' }}
          className="hidden md:block">

          <motion.div style={{ y: imgY, height: '115%', width: '100%',
            position: 'absolute', top: 0, left: 0 }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #e0f2fe 0%, #f0fdf4 45%, #f5f3ff 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 20,
            }}>
              <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
                <rect x="55" y="110" width="120" height="90" rx="6" fill="white" stroke="#e0e7ff" strokeWidth="1.5"/>
                <path d="M43 116L115 58l72 58" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="95" y="148" width="40" height="52" rx="4" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.2"/>
                <rect x="64" y="126" width="26" height="22" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.2"/>
                <rect x="138" y="126" width="26" height="22" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.2"/>
                <circle cx="196" cy="70" r="17" fill="#fef9c3" stroke="#fde047" strokeWidth="1.5"/>
                {[0,60,120,180,240,300].map((deg, i) => (
                  <line key={i}
                    x1={196 + Math.cos(deg*Math.PI/180)*21} y1={70 + Math.sin(deg*Math.PI/180)*21}
                    x2={196 + Math.cos(deg*Math.PI/180)*27} y2={70 + Math.sin(deg*Math.PI/180)*27}
                    stroke="#fde047" strokeWidth="1.5" strokeLinecap="round"/>
                ))}
                <rect x="196" y="160" width="5" height="30" rx="2" fill="#d1fae5"/>
                <circle cx="198" cy="150" r="20" fill="#d1fae5" stroke="#86efac" strokeWidth="1.2"/>
                <circle cx="48" cy="140" r="9" fill="#fce7f3" stroke="#fbcfe8" strokeWidth="1.2"/>
                <path d="M48 149v22M40 160h16M48 171l-5 15M48 171l5 15" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.82rem',
                color: '#94a3b8', fontStyle: 'italic', letterSpacing: '0.01em' }}>
                Votre chez-vous, notre engagement.
              </span>
            </div>
          </motion.div>

          {/* Filet overlay */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 32,
            border: '1px solid rgba(0,0,0,0.05)', pointerEvents: 'none' }} />

          {/* Badge bas gauche */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            style={{ position: 'absolute', bottom: 28, left: 28,
              background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(14px)',
              borderRadius: 18, padding: '14px 22px', border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
              display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>✓</div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
                fontWeight: 600, color: '#111', lineHeight: 1 }}>Agréé SAP</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
                color: '#4b5563', marginTop: 3 }}>Service à la Personne</div>
            </div>
          </motion.div>

          {/* Badge haut droit */}
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            style={{ position: 'absolute', top: 28, right: 28,
              background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(14px)',
              borderRadius: 16, padding: '10px 18px', border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1rem' }}>⭐</span>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                fontWeight: 700, color: '#111' }}>4.9 / 5</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.66rem',
                color: '#4b5563' }}>500+ avis clients</div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d1d5db' }}>Défiler</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <svg width="1" height="48" viewBox="0 0 1 48">
            <line x1="0.5" y1="0" x2="0.5" y2="48" stroke="#d1d5db" strokeWidth="1"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
