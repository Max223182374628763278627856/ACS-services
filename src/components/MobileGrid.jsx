import { motion } from 'framer-motion'
import { SERVICES } from '../data/services'

export default function MobileGrid({ onSelect }) {
  return (
    <div className="min-h-screen overflow-y-auto pb-24" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="text-center pt-14 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {['A', 'C', 'S'].map((letter, i) => (
              <div
                key={letter}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md"
                style={{ background: i === 1 ? '#4ade80' : '#38bdf8' }}
              >
                {letter}
              </div>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">ACS Services</h1>
          <p className="text-slate-400 text-sm">Votre quotidien simplifié</p>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 max-w-md mx-auto">
        {SERVICES.map((service, i) => (
          <motion.button
            key={service.id}
            className="relative rounded-2xl p-5 text-left overflow-hidden border border-white shadow-sm"
            style={{ background: service.light }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(service)}
          >
            <div className="text-3xl mb-3">{service.icon}</div>
            <h3 className="font-semibold text-sm leading-snug whitespace-pre-line"
                style={{ color: service.dark }}>
              {service.label}
            </h3>
            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
              style={{ background: service.color }}
            />
          </motion.button>
        ))}
      </div>

      {/* Quote CTA */}
      <motion.div
        className="mt-8 px-4 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          className="w-full py-4 rounded-2xl font-semibold text-white text-base shadow-md"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #4ade80)' }}
        >
          Demander un devis gratuit
        </button>
      </motion.div>
    </div>
  )
}
