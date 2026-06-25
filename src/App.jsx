import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/premium/Header'
import Footer from './components/premium/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AssociationPage from './pages/AssociationPage'
import EngagementPage from './pages/EngagementPage'
import RecrutementPage from './pages/RecrutementPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <HashRouter>
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/services"    element={<ServicesPage />} />
            <Route path="/association" element={<AssociationPage />} />
            <Route path="/engagement"  element={<EngagementPage />} />
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/contact"     element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
