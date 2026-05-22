import { motion } from 'framer-motion'
import { SERVICES } from '../data/services'

export default function MobileGrid({ onSelect }) {
  return (
    <div className="min-h-screen overflow-y-auto pb-24" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2445 100%)' }}>
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#005596' }}>A</div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#82C341' }}>C</div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#005596' }}>S</div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ACS Services</h1>
          <p className="text-gray-400 text-sm">Votre quotidien simplifié</p>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 max-w-md mx-auto">
        {SERVICES.map((service, i) => (
          <motion.button
            key={service.id}
            className="relative rounded-2xl p-5 text-left overflow-hidden border border-white/10"
            style={{ background: `linear-gradient(135deg, ${service.color}cc, ${service.color}88)` }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(service)}
          >
            {/* Glow */}
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30 blur-xl"
              style={{ background: service.accent }}
            />
            <div className="relative z-10">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-white font-semibold text-sm leading-snug whitespace-pre-line">
                {service.label}
              </h3>
            </div>
            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: service.accent }}
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
          className="w-full py-4 rounded-2xl font-semibold text-white text-base transition-all"
          style={{ background: 'linear-gradient(135deg, #005596, #82C341)' }}
        >
          Demander un devis gratuit
        </button>
      </motion.div>
    </div>
  )
}
