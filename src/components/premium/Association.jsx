import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import photoRoger    from '../../assets/roger-ferrandez.jpg'
import photoJocya    from '../../assets/jocya-almor.png'
import photoIsabelle from '../../assets/isabelle-foure.png'

const C = { maxWidth: 1360, margin: '0 auto', padding: '0 80px' }

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}>
      {children}
    </motion.div>
  )
}


function Avatar({ photo, nom, initiales, color = '#0ea5e9', size = 160 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: size, height: size, borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '3px solid white',
        background: photo ? 'transparent' : `linear-gradient(135deg, ${color}22, ${color}44)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {photo
          ? <img src={photo} alt={nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: size * 0.28,
              fontWeight: 700, color, opacity: 0.7
            }}>{initiales}</span>
        }
      </div>
      <span style={{
        fontFamily: "'Playfair Display', serif", fontSize: '0.95rem',
        fontWeight: 700, color: '#0d1117', textAlign: 'center',
      }}>{nom}</span>
    </div>
  )
}

const HISTOIRE = [
  "Jocya ALMOR et Isabelle FOURE, sensibilisées par la détresse des personnes âgées lors de la canicule de 2003, ont eu l'idée, après avoir visité des lieux de vie hors de l'hexagone, de fonder une association d'Habitat partagé entre seniors. Le 24 décembre 2008, les statuts étaient déposés.",
  "Très vite, la nécessité de proposer un plan d'accompagnement personnalisé au quotidien et d'un suivi individuel basé sur le concept de « faire avec et non à la place » a été mis en œuvre en créant l'ASSOCIATION COLOCATION SENIORS SERVICES, début 2009.",
  "Au travers de cette structure, une aide à domicile sociale, quotidienne, culturelle et un suivi des dossiers d'aide personnalisée ont été mis en place. L'association Colocation Seniors Services est une Association LOI 1901 à but non lucratif.",
  "Cette Association n'a cessé de s'affirmer au sein du tissu d'aide à domicile. Le partenariat avec divers partenaires de santé, d'administrations publiques et le bouche-à-oreille permettent à l'heure actuelle d'employer 20 personnes et de satisfaire 198 clients permanents.",
  "Désireux de rester à l'échelle humaine, le fonctionnement permet une proximité des dirigeants avec les personnes dans le besoin et leurs proches.",
]

export default function Association() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="association" style={{ padding: '128px 0', background: '#fff' }}>
      <div style={C}>

        {/* ——— EN-TÊTE ——— */}
        <div ref={ref} style={{ maxWidth: 640, marginBottom: 96 }}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: '#0ea5e9', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
              color: '#0ea5e9', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              L'Association
            </span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700,
              color: '#0d1117', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18 }}>
            Qui sommes-nous ?
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 400,
              lineHeight: 1.85, color: '#4b5563' }}>
            Une association fondée avec passion, animée par l'humain et portée par des valeurs
            de proximité, de bienveillance et de respect.
          </motion.p>
        </div>

        {/* ——— PRÉSIDENT ——— */}
        <FadeUp style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <span style={{ width: 20, height: 1, background: '#e5e7eb', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
              color: '#9ca3af', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Le Président
            </span>
            <span style={{ flex: 1, height: 1, background: '#f3f4f6', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
            <Avatar
              photo={photoRoger}
              nom="Roger FERRANDEZ"
              initiales="RF"
              color="#0ea5e9"
              size={180}
            />
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem',
                fontWeight: 700, color: '#0d1117', letterSpacing: '-0.02em', marginBottom: 12 }}>
                Roger Ferrandez
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 400,
                lineHeight: 1.85, color: '#4b5563' }}>
                Président de l'association ACS Services, Roger Ferrandez s'engage au quotidien
                pour maintenir une structure humaine, accessible et ancrée dans le territoire nantais.
                Son implication garantit une gouvernance proche des réalités du terrain.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Filet séparateur */}
        <div style={{ height: 1, background: '#f3f4f6', marginBottom: 80 }} />

        {/* ——— FONDATRICES ——— */}
        <FadeUp style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <span style={{ width: 20, height: 1, background: '#e5e7eb', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
              color: '#9ca3af', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Les Fondatrices
            </span>
            <span style={{ flex: 1, height: 1, background: '#f3f4f6', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {[
              { photo: photoJocya,    nom: 'Jocya ALMOR',    initiales: 'JA', color: '#22c55e' },
              { photo: photoIsabelle, nom: 'Isabelle FOURE',  initiales: 'IF', color: '#8b5cf6' },
            ].map(({ photo, nom, initiales, color }, i) => (
              <motion.div key={nom}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                <Avatar photo={photo} nom={nom} initiales={initiales} color={color} size={140} />
                <div style={{ paddingTop: 8 }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem',
                    fontWeight: 700, color: '#0d1117', letterSpacing: '-0.015em', marginBottom: 8 }}>
                    {nom}
                  </h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
                    fontWeight: 400, lineHeight: 1.8, color: '#4b5563' }}>
                    {i === 0
                      ? "Co-fondatrice de l'association, sensibilisée par la détresse des personnes âgées lors de la canicule de 2003. Porteuse du projet initial d'habitat partagé pour seniors."
                      : "Co-fondatrice de l'association. Avec Jocya, elle a posé les bases d'un accompagnement humain et personnalisé, respectueux de l'autonomie de chacun."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Filet séparateur */}
        <div style={{ height: 1, background: '#f3f4f6', marginBottom: 80 }} />

        {/* ——— HISTOIRE ——— */}
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <span style={{ width: 20, height: 1, background: '#e5e7eb', display: 'block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600,
              color: '#9ca3af', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Notre histoire
            </span>
            <span style={{ flex: 1, height: 1, background: '#f3f4f6', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Timeline texte */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { year: '2003', text: "La canicule révèle la détresse des personnes âgées isolées. Jocya ALMOR et Isabelle FOURE prennent conscience de l'urgence d'agir." },
                { year: '2008', text: "Le 24 décembre, les statuts de l'association sont déposés. L'habitat partagé entre seniors devient une réalité." },
                { year: '2009', text: "Création de l'ASSOCIATION COLOCATION SENIORS SERVICES. Un accompagnement personnalisé basé sur le principe « faire avec et non à la place »." },
                { year: 'Aujourd\'hui', text: "20 intervenants, 198 clients permanents. Une association LOI 1901 à but non lucratif, ancrée dans son territoire.", accent: true },
              ].map(({ year, text, accent }, i) => (
                <motion.div key={year}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 24, paddingBottom: 36, position: 'relative' }}>
                  {/* Ligne verticale */}
                  {i < 3 && (
                    <div style={{ position: 'absolute', left: 19, top: 32,
                      width: 1, height: 'calc(100% - 8px)', background: '#f3f4f6' }} />
                  )}
                  {/* Point */}
                  <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: accent ? 'linear-gradient(135deg, #0ea5e9, #22c55e)' : 'white',
                    border: accent ? 'none' : '2px solid #e5e7eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1, boxShadow: accent ? '0 4px 16px rgba(14,165,233,0.25)' : 'none' }}>
                    {accent
                      ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3 3 7-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9', opacity: 0.5 }} />
                    }
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem',
                      fontWeight: 700, color: accent ? '#0ea5e9' : '#9ca3af',
                      marginBottom: 6, letterSpacing: '0.02em' }}>{year}</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
                      fontWeight: 400, lineHeight: 1.8, color: '#4b5563' }}>{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Citation + chiffres clés */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Bloc citation */}
              <div style={{ background: '#fafafa', borderRadius: 24, padding: 40,
                border: '1px solid #f3f4f6', borderLeft: '4px solid #0ea5e9' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem',
                  fontStyle: 'italic', color: '#0d1117', lineHeight: 1.7, marginBottom: 20 }}>
                  "Désireux de rester à l'échelle humaine, notre fonctionnement permet
                  une proximité des dirigeants avec les personnes dans le besoin et leurs proches."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 1, height: 32, background: '#0ea5e9', opacity: 0.4 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
                    fontWeight: 500, color: '#9ca3af' }}>ACS Services — Depuis 2008</span>
                </div>
              </div>

              {/* Chiffres */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { n: '20', label: 'Intervenants\nqualifiés', color: '#0ea5e9' },
                  { n: '198', label: 'Clients\npermanents', color: '#22c55e' },
                  { n: '2008', label: 'Année de\nfondation', color: '#8b5cf6' },
                  { n: 'LOI\n1901', label: 'Statut\nassociatif', color: '#f97316' },
                ].map(({ n, label, color }) => (
                  <div key={n} style={{ background: 'white', borderRadius: 16, padding: '20px 20px',
                    border: '1px solid #f3f4f6', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif",
                      fontSize: '1.6rem', fontWeight: 700, color: '#0d1117',
                      lineHeight: 1, letterSpacing: '-0.03em', whiteSpace: 'pre-line' }}>{n}</div>
                    <div style={{ width: 20, height: 1.5, background: color,
                      margin: '10px auto', borderRadius: 1 }} />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
                      color: '#9ca3af', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
