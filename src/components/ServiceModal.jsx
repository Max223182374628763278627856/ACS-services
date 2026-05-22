import { motion, AnimatePresence } from 'framer-motion'

export default function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Modal */}
        <motion.div
          className="frosted-glass-dark relative z-10 rounded-2xl p-8 max-w-lg w-full"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Accent stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${service.color}, ${service.accent})` }}
          />

          {/* Icon */}
          <div className="text-5xl mb-4">{service.icon}</div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1">{service.title}</h2>
          <p className="text-sm font-medium mb-4" style={{ color: service.accent }}>
            {service.subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{service.description}</p>

          {/* Prestations */}
          <ul className="space-y-2 mb-8">
            {service.prestations.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-200 text-sm">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: service.accent }}
                />
                {p}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${service.color}, ${service.accent})` }}
            >
              Demander un devis
            </button>
            <button
              className="py-3 px-5 rounded-xl text-gray-300 text-sm border border-white/20 hover:bg-white/10 transition-all duration-200"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
