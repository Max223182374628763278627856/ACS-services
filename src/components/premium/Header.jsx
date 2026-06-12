import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV = ['Services', 'Engagement', 'Recrutement', 'Contact']

export default function Header() {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)

  useEffect(() => scrollY.on('change', v => setPast(v > 40)), [scrollY])

  const py     = useTransform(scrollY, [0, 80], [20, 10])
  const blur   = useTransform(scrollY, [0, 80], [0, 18])
  const bgAlpha= useTransform(scrollY, [0, 80], [0, 0.88])

  return (
    <motion.header
      style={{ paddingTop: py, paddingBottom: py }}
      className="fixed top-0 left-0 right-0 z-50 px-8"
    >
      {/* glassmorphism layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: useTransform(blur, v => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, v => `blur(${v}px)`),
          backgroundColor: useTransform(bgAlpha, v => `rgba(250,250,250,${v})`),
          borderBottom: past ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 no-underline"
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM4 14c0-1.5 2.2-2.5 5-2.5s5 1 5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600, fontSize: '1.1rem', color: '#111',
            letterSpacing: '-0.01em',
          }}>
            ACS <span style={{ color: '#0ea5e9' }}>Services</span>
          </span>
        </motion.a>

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden md:flex items-center gap-10"
        >
          {NAV.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                fontWeight: 500, color: '#6b7280', textDecoration: 'none',
                letterSpacing: '0.03em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = '#6b7280'}
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* CTA */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(14,165,233,0.28)' }}
          whileTap={{ scale: 0.97 }}
          className="no-underline"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', borderRadius: 999,
            background: '#111', color: '#fff',
            fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
            fontWeight: 500, letterSpacing: '0.02em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.14)',
            transition: 'box-shadow 0.2s',
          }}
        >
          Demander un devis
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>
    </motion.header>
  )
}
