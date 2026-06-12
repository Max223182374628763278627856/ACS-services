import { motion } from 'framer-motion'

export default function PremiumFooter() {
  return (
    <footer id="contact" style={{ background: '#0f172a' }}>

      {/* Contact band */}
      <div className="py-24 px-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#0ea5e9' }}>
              Contact
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 600, color: 'white', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Parlons de votre projet.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>
              Devis gratuit, sans engagement. Un conseiller vous rappelle sous 2h.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: '📞', label: '02 XX XX XX XX', sub: 'Lun–Dim, 7h–21h' },
                { icon: '✉️', label: 'contact@acs-services.fr', sub: 'Réponse sous 24h' },
                { icon: '📍', label: 'Nantes, Loire-Atlantique', sub: 'Et toute l\'agglomération' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</div>
                    <div className="text-xs" style={{ color: '#475569' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire simplifié */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl p-8"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="font-semibold mb-6 text-base" style={{ color: 'white' }}>Devis en 3 étapes</h3>
            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#64748b' }}>Prénom</label>
                  <input type="text" placeholder="Marie"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#64748b' }}>Téléphone</label>
                  <input type="tel" placeholder="06 XX XX XX XX"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: '#64748b' }}>Service souhaité</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
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
                <label className="block text-xs mb-1.5" style={{ color: '#64748b' }}>Message (optionnel)</label>
                <textarea rows={3} placeholder="Décrivez votre situation en quelques mots…"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(14,165,233,0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-full text-white font-medium text-sm"
                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' }}
              >
                Envoyer ma demande →
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Footer bottom */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
              <span style={{ fontSize: '0.75rem' }}>✦</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
              ACS Services
            </span>
          </div>
          <p style={{ color: '#334155', fontSize: '0.78rem' }}>© 2025 ACS Services · Nantes</p>
          <div className="flex gap-6">
            {['Mentions légales', 'Confidentialité'].map(l => (
              <a key={l} href="#" style={{ color: '#334155', fontSize: '0.78rem', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#64748b'}
                onMouseLeave={e => e.target.style.color = '#334155'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
