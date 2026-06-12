import Header from './components/premium/Header'
import Hero from './components/premium/Hero'
import BentoGrid from './components/premium/BentoGrid'
import Engagement from './components/premium/Engagement'
import PremiumFooter from './components/premium/PremiumFooter'

export default function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero />
        <BentoGrid />
        <Engagement />
      </main>
      <PremiumFooter />
    </div>
  )
}
