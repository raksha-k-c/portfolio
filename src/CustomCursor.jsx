import { useEffect, useRef } from 'react'
import './CustomCursor.css'

/**
 * Minimal cursor: a single small glowing dot that follows the pointer
 * precisely and softly grows over interactive elements. No trailing ring.
 * Disabled on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    let visible = false

    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
      }
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
    }

    const interactive = 'a, button, input, textarea, .btn, .card, .filter-btn, .chip, .cg-stage, .social-link'
    const onOver = (e) => {
      if (e.target.closest(interactive)) dot.classList.add('cc-dot--grow')
    }
    const onOut = (e) => {
      if (e.target.closest(interactive)) dot.classList.remove('cc-dot--grow')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.body.classList.add('cc-active')

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('cc-active')
    }
  }, [])

  return <div className="cc-dot" ref={dotRef} aria-hidden="true" />
}
