import { useState, useEffect, Suspense } from 'react'
import HouseScene from './components/house/HouseScene'
import MobileView from './components/house/MobileView'
import Loader from './components/house/Loader'

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

  if (isMobile) {
    return <MobileView />
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#020617' }}>
      <Suspense fallback={<Loader />}>
        <HouseScene />
      </Suspense>
    </div>
  )
}
