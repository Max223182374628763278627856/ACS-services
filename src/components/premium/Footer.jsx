import { Link } from 'react-router-dom'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

export default function Footer() {
  return (
    <footer style={{ background: '#fafafa', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ ...C, paddingTop: 32, paddingBottom: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, borderRadius: 9,
            background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2.5 11c0-1.2 1.8-2 4.5-2s4.5.8 4.5 2"
                stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem',
            color: '#4b5563', fontWeight: 500 }}>ACS Services</span>
        </Link>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#d1d5db' }}>
          © 2025 ACS Services · Nantes, Loire-Atlantique
        </p>

        <div style={{ display: 'flex', gap: 28 }}>
          {['Mentions légales', 'Confidentialité', 'Plan du site'].map(l => (
            <a key={l} href="#"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#4b5563'}
              onMouseLeave={e => e.target.style.color = '#d1d5db'}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
