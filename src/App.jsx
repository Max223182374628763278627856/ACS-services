import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BoardScene from './components/BoardScene'
import ServiceModal from './components/ServiceModal'
import MobileGrid from './components/MobileGrid'
import Footer from './components/Footer'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function App() {
  const isMobile = useIsMobile()
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Header */}
      <motion.header
        className="frosted-glass absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#005596' }}>A</span>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#82C341' }}>C</span>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#005596' }}>S</span>
          </div>
          <span className="text-white font-semibold text-sm hidden sm:block">ACS Services</span>
        </div>

        <motion.button
          className="px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg"
          style={{ background: 'linear-gradient(135deg, #005596, #82C341)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Demander un devis
        </motion.button>
      </motion.header>

      {/* Hint */}
      {!isMobile && (
        <motion.p
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-gray-500 text-xs pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5 }}
        >
          Cliquez sur un objet pour découvrir nos services
        </motion.p>
      )}

      {/* Main */}
      {isMobile ? (
        <MobileGrid onSelect={setSelectedService} />
      ) : (
        <div className="w-full h-full">
          <BoardScene onSelectService={setSelectedService} />
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      {!isMobile && <Footer />}
    </div>
  )
}
