import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import HouseScene from './components/house/HouseScene'
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

  if (isMobile) {
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ background: '#f8fafc' }}>
        <MobileGrid onSelect={setSelectedService} />
        <AnimatePresence>
          {selectedService && (
            <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
          )}
        </AnimatePresence>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#1a0f00' }}>
      <HouseScene />
    </div>
  )
}
