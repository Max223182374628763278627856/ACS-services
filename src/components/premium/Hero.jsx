import { useRef, useCallback, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GlassOrb = lazy(() => import('./GlassOrb'))

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 })
  const containerRef = useRef()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
  }, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f9ff 50%, #f8f7ff 100%)' }}
    >
      {/* Gradient lumières d'ambiance */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55vw', height: '55vw', maxWidth: 800,
          background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '40vw', height: '40vw', maxWidth: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">

        {/* Texte */}
        <motion.div style={{ y: textY, opacity }} className="relative z-10">
          <motion.div
            variants={FADE_UP} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium tracking-wide"
            style={{ background: 'rgba(14,165,233,0.08)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.18)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" style={{ animation: 'pulse 2s infinite' }} />
            Services à la personne · Nantes
          </motion.div>

          <motion.h1
            variants={FADE_UP} initial="hidden" animate="show" custom={1}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.15, color: '#0f172a', letterSpacing: '-0.02em' }}
          >
            La vie à domicile,<br />
            <span style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              belle et sereine.
            </span>
          </motion.h1>

          <motion.p
            variants={FADE_UP} initial="hidden" animate="show" custom={2}
            className="mt-6 text-lg leading-relaxed"
            style={{ color: '#475569', maxWidth: 480, fontWeight: 300 }}
          >
            Des intervenants qualifiés et bienveillants pour accompagner vos proches au quotidien.
            Maintien à domicile, ménage, jardinage — avec soin et élégance.
          </motion.p>

          <motion.div
            variants={FADE_UP} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(14,165,233,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-medium no-underline"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', boxShadow: '0 4px 24px rgba(14,165,233,0.28)', fontSize: '0.95rem' }}
            >
              Obtenir un devis gratuit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ color: '#0ea5e9' }}
              className="inline-flex items-center gap-2 text-sm font-medium no-underline transition-colors"
              style={{ color: '#64748b' }}
            >
              Découvrir nos services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2l5 5-5 5M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="show" custom={4}
            className="mt-12 flex gap-10 pt-8"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            {[
              { n: '500+', l: 'Familles\naccompagnées' },
              { n: '98%', l: 'Satisfaction\nclient' },
              { n: '7j/7', l: 'Disponibilité\ncomplète' },
            ].map(({ n, l }) => (
              <div key={n}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 600, color: '#0f172a', lineHeight: 1 }}>{n}</div>
                <div className="mt-1 text-xs leading-relaxed" style={{ color: '#94a3b8', whiteSpace: 'pre-line' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden md:block"
          style={{ height: '560px' }}
        >
          <Suspense fallback={null}>
            <GlassOrb mousePos={mousePos} />
          </Suspense>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#94a3b8' }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontSize: '0.65rem' }}>Défiler</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <rect x="1" y="1" width="14" height="20" rx="7" stroke="currentColor" strokeWidth="1.2"/>
            <motion.rect x="6.5" y="5" width="3" height="5" rx="1.5" fill="currentColor"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </section>
  )
}
