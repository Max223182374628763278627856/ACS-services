import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos   = useRef({ x: -100, y: -100 })
  const smooth = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)
  const rafId  = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const checkCursor = () => {
      const tag = document.elementFromPoint(pos.current.x, pos.current.y)
      if (!tag) return false
      const cur = window.getComputedStyle(tag).cursor
      return cur === 'pointer' || cur === 'grab' || cur === 'grabbing'
    }

    const loop = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12

      const isHov = checkCursor()
      if (isHov !== hovered.current) {
        hovered.current = isHov
        el.style.width  = isHov ? '40px' : '16px'
        el.style.height = isHov ? '40px' : '16px'
        el.style.opacity = isHov ? '0.5' : '0.85'
        el.style.border = isHov
          ? '1.5px solid rgba(56,189,248,0.9)'
          : '1.5px solid rgba(255,255,255,0.9)'
        el.style.background = isHov ? 'transparent' : 'rgba(255,255,255,0.15)'
      }

      el.style.transform = `translate(${smooth.current.x - (isHov ? 20 : 8)}px, ${smooth.current.y - (isHov ? 20 : 8)}px)`
      rafId.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 16, height: 16,
        borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.9)',
        background: 'rgba(255,255,255,0.15)',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        backdropFilter: 'blur(2px)',
        mixBlendMode: 'difference',
      }}
    />
  )
}
