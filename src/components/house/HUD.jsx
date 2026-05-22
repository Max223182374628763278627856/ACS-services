import { motion } from 'framer-motion'

export default function HUD() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }}>
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          pointerEvents: 'all',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['A', 'C', 'S'].map((l, i) => (
              <span
                key={l}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700,
                  background: i === 1 ? '#4ade80' : '#38bdf8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              >
                {l}
              </span>
            ))}
          </div>
          <span style={{ color: '#334155', fontWeight: 600, fontSize: 14 }}>
            La Maison de la Sérénité
          </span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(56,189,248,0.4)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: '9px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #38bdf8, #4ade80)',
            color: '#fff', fontWeight: 700, fontSize: 13,
            boxShadow: '0 4px 16px rgba(56,189,248,0.3)',
          }}
        >
          Demander un devis
        </motion.button>
      </motion.header>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(100,116,139,0.8)', letterSpacing: '0.05em' }}>
          Scrollez pour avancer dans la maison
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{ fontSize: 18, opacity: 0.6 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  )
}
