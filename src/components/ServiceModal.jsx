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
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="modal-light relative z-10 rounded-3xl p-8 max-w-lg w-full overflow-hidden"
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${service.color}, ${service.dark})` }}
          />

          {/* Icon bubble */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
            style={{ background: service.light }}
          >
            {service.icon}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{service.title}</h2>
          <p className="text-sm font-semibold mb-5" style={{ color: service.dark }}>
            {service.subtitle}
          </p>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>

          {/* Prestations */}
          <ul className="space-y-2 mb-8">
            {service.prestations.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: service.color }}
                />
                {p}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-5 rounded-2xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md"
              style={{ background: `linear-gradient(135deg, ${service.color}, ${service.dark})` }}
            >
              Demander un devis
            </button>
            <button
              className="py-3 px-5 rounded-2xl text-slate-500 text-sm bg-slate-100 hover:bg-slate-200 transition-all duration-200"
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
